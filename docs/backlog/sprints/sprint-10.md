# Sprint 10 — Parité whiteboard visible (remédiation Socle)

**Branches :** une branche par US — `feat/{us-id}-{slug}` (voir [§Règles d'utilisation](./README.md#règles-dutilisation))
**Scope :** 4 items de parité **visible** du noyau whiteboard (F08.x) vs le POC de référence
PouetPouet, décidés par le mainteneur suite à
[`docs/audits/audit-recette-fonctionnelle.md`](pathname:///pivot-docs/audits/audit-recette-fonctionnelle)
(§Écarts de parité vs POC, 2026-07-13) — extension du périmètre F08.x « noyau + parité visible »,
`Phase: Socle` (non verrouillé, même statut que le reste du noyau F08.x/EN08.x).
**Jalon d'entrée :** aucune dépendance nouvelle — s'appuie sur le noyau F08.1/F08.2/F08.3 déjà
`Stage: ✅ Done` (Sprint 5, Vague 1+).

## Contexte

L'audit de recette fonctionnelle (2026-07-13) a confirmé que le noyau whiteboard livré (CRUD
tableaux, canvas temps réel, présence, undo/redo, templates) est conforme au périmètre annoncé, et
que l'écart de parité vs PouetPouet (Vote, Timer, Session, favoris, corbeille, recherche, etc.) est
`⬜ Backlog` sous F30.x — **pas un KO**. Le mainteneur a cependant décidé d'étendre le périmètre
Socle à **4 capacités de parité visible** jugées suffisamment structurantes pour l'expérience
utilisateur de la liste/gestion de tableaux pour ne pas attendre le déverrouillage phase-3 complet
d'E30 :

1. Favoris de tableaux (étoile + tri client)
2. Corbeille / suppression douce + restauration
3. Recherche de tableaux (filtre client)
4. Paramètres de tableau (modal OWNER : nom/description, toggles activités, enregistrer comme
   template) + câblage du bouton Reset board

| Item | Titre | Priority | Size | 🤖 Dev |
|------|-------|----------|------|--------|
| [US08.1.6](../EPIC-collaboration/FEATURES/crud-tableaux/us-favoris-tableau.md) | Favoris de tableaux | Medium | S | ✅ |
| [US08.1.7](../EPIC-collaboration/FEATURES/crud-tableaux/us-corbeille-tableau.md) | Corbeille et restauration d'un tableau | Medium | M | ✅ |
| [US08.1.8](../EPIC-collaboration/FEATURES/crud-tableaux/us-recherche-tableau.md) | Recherche de tableaux | Medium | XS | ✅ |
| [US08.2.4](../EPIC-collaboration/FEATURES/partage-roles/us-parametres-tableau.md) | Paramètres de tableau (modal OWNER) + câblage Reset board | Medium | M | ✅ |

## Statut détaillé (2026-07-14)

Les 4 US ont été livrées ensemble : une seule PR backend, une seule PR frontend (fichiers
disjoints par item, mais découpage en PR séparées jugé inutile en pratique par les Dev Agents).

- **Backend** fusionné et publié — [`pivot-collaboratif-core#66`](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/66)
  (Gate 4 final **98/100**, contre-vérifié indépendamment — voir commentaire PR), release `v0.2.1`.
- **Frontend** fusionné et publié — [`pivot-collaboratif-ui#95`](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/95)
  (Gate 4 final **99/100**, 12/12 specs E2E réelles contre le backend déployé), release `v0.4.0`.
- **3 bugs réels trouvés et corrigés** en vérifiant la livraison contre le vrai backend (jamais
  détectés par les tests unitaires/mocks existants) — détail dans
  [`docs/audits/audit-recette-fonctionnelle.md`](pathname:///pivot-docs/audits/audit-recette-fonctionnelle)
  §v2 : casse du champ `role` (S1, `pivot-collaboratif-core#70`), titre du board jamais affiché sur
  la page canvas (S2, corrigé dans `#95`), notification temps réel du reset board sur le mauvais
  nom wire (S3, `pivot-collaboratif-core#72`).
- **Recette humaine restante** — `Stage` frontmatter des 4 US reste `⬜` jusqu'à validation par le
  mainteneur (`docs/backlog/README.md`, jamais modifié par un agent).

## Notes de séquencement

- **US08.1.7** (corbeille) révise la décision hard-delete d'US08.1.5 (`Done`) — le soft-delete
  remplace la cascade physique ; aucune donnée de production n'est concernée (Socle non encore en
  usage réel), pas de migration de données à prévoir au-delà du schéma.
- **US08.1.8** (recherche) et le tri favoris d'US08.1.6 révisent la note Hors périmètre d'US08.1.3
  (`Done`) — front-only, pas de nouvel endpoint de recherche côté backend.
- **US08.2.4** dépend techniquement d'US08.1.4 (contrat PATCH réutilisé) et d'US08.4.1 (templates)
  déjà `Done` — pas de blocage de séquencement, les 4 items de ce sprint sont parallélisables entre
  agents (branches séparées, fichiers backend/frontend disjoints par item).
- Gate 1 (PO Agent, DoR) à effectuer au démarrage de chaque item comme pour tout sprint — ce fichier
  ne préjuge pas d'un Gate 1 déjà passé au niveau sprint.

## Dépendances

- Aucune dépendance externe nouvelle — repo cible inchangé (`pivot-collaboratif-core`/
  `pivot-collaboratif-ui`), mêmes conventions d'accès (tenantId via SecurityContext, 404
  anti-énumération, OWNER-only sur les actions de gestion) que le reste de F08.x.

---
*Créé le 2026-07-13, suite à la décision mainteneur d'extension du périmètre Socle F08.x (audit de
recette fonctionnelle, parité visible vs POC PouetPouet).*
