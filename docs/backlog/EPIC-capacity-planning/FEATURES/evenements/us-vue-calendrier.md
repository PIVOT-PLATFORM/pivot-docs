# US11.1.2 — Visualiser la capacité de l'équipe sur un calendrier

**En tant que** Scrum Master
**Je veux** voir la capacité disponible de mon équipe sur un calendrier
**Afin de** planifier le sprint en tenant compte des absences

**Gate 1 réalisé le 2026-07-22** — remplace le stub outline précédent. Prolonge US11.1.1.

**Architecture — capacité nette simplifiée, PAS le moteur F11.6 (Gate 1 — décision PO/Architecte)** :
le stub d'origine mentionnait une « capacité nette » sans préciser qu'elle recouvre en réalité
deux choses différentes dans l'EPIC (`EPIC-capacity-planning/README.md` §Modèle de calcul) : (1)
le **moteur complet** F11.6 — jours ouvrables réels par localité (`EN22.3`), facteur de
concentration, ajustement vélocité N-1, ajustement maturité agile, consolidation en cascade — et
(2) une figure beaucoup plus simple suffisante pour ce lot. **Décision retenue** : ce sprint
(F11.1→F11.4) calcule uniquement une **approximation provisoire**, explicitement étiquetée comme
telle dans l'API et l'UI (`isProvisional: true` dans la réponse) :

```text
joursOuvrés = jours calendaires lundi-vendredi de la période (weekends exclus, AUCUN jour férié
              exclu — la distinction jours ouvrables/ouvrés par localité est US11.6.1, Sprint 21)
capacitéNette (jours-personne) = Σ pour chaque membre non exclu :
    (joursOuvrés − joursAbsence(membre)) × (availabilityPercent(membre) / 100)
capacitéNette (points) = capacitéNette (jours) × pointsPerDay, si pointsPerDay renseigné sur
                          l'événement (US11.1.1), sinon null
```

Aucun `focusFactor`/`hoursPerDay`/ajustement vélocité ou maturité — ces axes sont F11.6 (Sprint 21)
et **remplaceront** cette formule provisoire, pas ne s'y additionneront. Un événement `PI_PLANNING`
(sans membres propres, voir US11.1.1) agrège la capacité de ses enfants — voir US11.3.1.

## Critères d'acceptation

### Résumé de capacité (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un événement accessible de type `SPRINT`/`RELEASE`/`CUSTOM`, when `GET /api/agilite/capacity/events/{id}/summary`, then 200 OK avec `{ durationDays, workingDays, memberCount, totalAbsenceDays, netCapacityDays, netCapacityPoints, isProvisional: true }` (voir §Architecture pour la formule) | ⬜ |
| Given un événement `PI_PLANNING` avec enfants, when `GET .../events/{id}/summary`, then 200 OK avec la capacité **agrégée** = somme des `netCapacityDays`/`netCapacityPoints` de chaque enfant (voir US11.3.1) | ⬜ |
| Given un événement `PI_PLANNING` sans enfant, when `GET .../events/{id}/summary`, then 200 OK avec `netCapacityDays: 0`, `netCapacityPoints: null` (pas d'erreur — état transitoire normal avant création des Sprints) | ⬜ |
| Given un membre exclu (`excluded: true`, voir US11.2.1), when le résumé est calculé, then il ne contribue pas à `memberCount`/`netCapacityDays` | ⬜ |

### Rendu calendrier (frontend `pivot-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| Given les événements accessibles d'une équipe sur une période, when la vue calendrier s'affiche, then chaque événement est positionné sur sa plage de dates avec un badge par type (icône/couleur, jamais la couleur seule) | ⬜ |
| Given un événement affiché, when ses membres ont des absences, then les zones d'absence sont visuellement distinguées sur la période (couleur + motif visuel, jamais la couleur seule pour l'accessibilité daltonienne) | ⬜ |
| Given un résumé de capacité `isProvisional: true`, when il est affiché, then un badge/tooltip explicite indique qu'il s'agit d'une estimation simplifiée (pas le calcul complet à venir en Sprint 21) — n'induit jamais l'utilisateur en erreur sur la précision de la figure | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given un `id` d'événement inexistant ou d'un autre tenant, when résumé, then 404 | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : given un appelant sans lien avec l'événement (voir US11.1.1), when résumé, then 404 (jamais 403) | ⬜ |
| Security : test TI obligatoire cross-tenant sur `GET .../events/{id}/summary` | ⬜ |

### A11y (frontend `pivot-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| A11y : le calendrier expose une alternative textuelle (liste des événements avec dates lisibles) pour les utilisateurs de lecteur d'écran, pas seulement la grille visuelle | ⬜ |
| A11y : tous les libellés (types, badge "estimation") externalisés via Transloco | ⬜ |

## Hors périmètre

- **Le moteur complet F11.6** (jours ouvrables/fériés par localité, facteur de concentration,
  ajustement vélocité N-1, ajustement maturité agile) — voir §Architecture, Sprint 21.
- **Export capacité en points par défaut** sans `pointsPerDay` configuré — reste `null`, pas de
  valeur par défaut inventée.

## Notes d'implémentation

- **Backend** : `CapacityEventService#getSummary` — calcul pur isolé dans une classe testable
  sans Spring/BDD (`CapacityCalculator` ou similaire, même approche que `PiIterationGenerator`),
  prend en entrée l'événement + ses membres + leurs absences, retourne le DTO résumé. Agrégation
  PI = somme des résumés enfants (récursion à 1 niveau seulement, profondeur max déjà garantie par
  US11.3.1). `CapacitySummaryController` (ou méthode de `CapacityEventController`).
- **Frontend** : composant `capacity-calendar` — grille calendrier (semaine/mois), badge par type
  d'événement, zones d'absence superposées. UX inspirée du POC de référence PouetPouet
  (`apps/web/src/app/(app)/capacity/[id]/page.tsx` pour l'affichage résumé — **son moteur de
  calcul `apps/web/src/lib/capacity.ts` n'est pas repris**, voir §Architecture) adaptée aux tokens
  `@pivot/design-system`.

---
Item Type: US · Parent: F11.1 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: scrum-master
Dépendances: US11.1.1, US11.2.2
