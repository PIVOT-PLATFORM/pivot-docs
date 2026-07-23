# US19.4.2 — Exporter les résultats d'une session terminée

## Contexte

- **US** : [`us-export-resultats.md`](pathname:///pivot-docs/backlog/EPIC-module-session/FEATURES/resultats/us-export-resultats) · Parent `F19.4` · Module `collaboratif` · Phase phase-3 · Sprint 22
- **PR** : `pivot-ui` [#284](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/284) — `Closes #283`
- **Commit figé** : `a4e22c5` (`feat(ui): export a completed session's results (US19.4.2)`) — figeage **pré-merge** (convergence Autoloop / CI verte).
- **Portée du figeage** : action d'export **frontend** (`pivot-ui`, lib `collaboratif-ui`) + contrat REST consommé. Producteur backend (`pivot-core`, `fr.pivot.collaboratif.session.*`) hors périmètre de session — contrat figé **tel que consommé**.
- **Gate 4 au figeage** : convergence Autoloop, CI verte. Recette humaine en attente.

## Spec fonctionnelle

### Ce que fait la fonctionnalité

Prolonge la vue résultats (US19.4.1) d'une action d'**export** pour l'animateur. Sur une session
`COMPLETED`, deux boutons — **Exporter JSON** et **Exporter CSV** — déclenchent le téléchargement du
fichier des résultats agrégés.

1. **Déclenchement** — clic sur un bouton d'export → `GET /sessions/{id}/results?format=json|csv`,
   réponse en **blob**, puis téléchargement navigateur (URL d'objet + ancre, révoquée après ;
   no-op là où l'API Blob URL est absente — ex. sous le runner de test).
2. **Gate d'affichage** — les contrôles d'export ne sont rendus que lorsque `status === 'COMPLETED'`
   (l'AC exige une session terminée ; une session en cours renverrait `409` côté backend).
3. **Erreur** — un échec (`409` session non terminée, `404` cross-tenant/non-propriétaire, erreur
   réseau) affiche `session.results.exportError`, sans téléchargement.

Le contenu formaté (JSON/CSV par type d'activité — QUIZ scores, POLL votes/%, WORDCLOUD fréquences,
BRAINSTORM post-its/catégories, Q&A questions/votes/statut) est produit **côté backend** ; le
frontend ne fait que déclencher et enregistrer le fichier.

### Sécurité & accessibilité

| Propriété | Mécanisme |
|-----------|-----------|
| Habilitation | Owner / `ROLE_ADMIN` **serveur** ; non-propriétaire ou cross-tenant → `404` (anti-énumération) |
| Isolation tenant | Backend depuis le token — aucun `tenantId`/`userId` transmis par le client |
| Pré-condition | Session `COMPLETED` requise — `409` sinon (le client masque de toute façon les contrôles hors `COMPLETED`) |
| A11y | Boutons natifs `<button>` libellés (i18n), désactivés pendant l'export en vol |

## Contrat technique final

| Verbe | Chemin | Rôle | Réponse |
|-------|--------|------|---------|
| `GET` | `/sessions/{id}/results?format={json\|csv}` | animateur (owner/admin) | corps **blob** (téléchargement) · `409` si non `COMPLETED` · `404` cross-tenant |

```ts
SessionResultsFormat = 'json' | 'csv'
exportResults(sessionId, format): Observable<Blob>   // responseType 'blob', param `format`
```

## Écarts vs ACs initiaux (outline Gate 1)

| AC outline | État | Note |
|-----------|------|------|
| `GET /results?format=json\|csv` retourne le format demandé | ✅ | blob téléchargé |
| Session `COMPLETED` requise (en cours → `409`) | ✅ | + contrôles masqués hors `COMPLETED` côté client |
| Export QUIZ / POLL / WORDCLOUD / BRAINSTORM / QA | ⚠️ backend | contenu formaté produit par `pivot-core` — hors surface frontend |
| Sécurité : owner / `ROLE_ADMIN` uniquement | ✅ | appliqué backend |
| Test : export autre tenant → `404` | ✅ | contrat backend (le client ne retry pas) |

**Précision d'implémentation** : le frontend n'assemble aucun contenu — il déclenche l'export et
enregistre le blob. Le rendu du contenu par type (colonnes CSV, structure JSON) est entièrement
backend.

## Gates

- **Gate 2** : 2 cas Vitest ajoutés (requête blob au bon format ; `exportError` sur échec `409`). Suite `collaboratif-ui` verte (1486 au figeage).
- **Gate 4** : convergence Autoloop, CI verte, aucune nouvelle alerte de budget SCSS issue de ce diff. Merge humain final en attente.
