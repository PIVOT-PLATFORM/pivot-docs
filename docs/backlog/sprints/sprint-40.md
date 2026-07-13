# Sprint 40 — Parité whiteboard — Cadres, organisation, champs

**Branches :** une branche par US — `feat/{us-id}-{slug}` (voir [§Règles d'utilisation](./README.md#règles-dutilisation))
**Scope :** 7 items de **parité complète** whiteboard — cadres (frames), organisation/calque
(groupe, verrou, z-order) et champs personnalisés de board, suite à la décision mainteneur du
2026-07-13 d'absorber tout le spec de référence `Détails tableau blanc backlog.md` (POC PouetPouet)
dans le Socle E08 (lève le verrou phase-3, zone d'ombre #11). `Phase: Socle`, module whiteboard.
**Jalon d'entrée :** dépend du modèle `Card` typé (EN08.4, Sprint 38) — cadres, groupes et champs
s'appliquent à des cartes typées.

## Contexte

Suite de la fondation posée au Sprint 38 (EN08.4, modèle `Card` typé). Ce sprint livre les
capacités d'**organisation** du board : cadres (frames) pour sectionner le canevas,
groupement/verrouillage/z-order des cartes, et champs personnalisés attachés au board et à ses
cartes. Il absorbe les Features benchmark US30.1.7 (cadres) et US30.1.6 (organisation des objets).

| Item | Titre | Priority | Size | 🤖 Dev |
|------|-------|----------|------|--------|
| [US08.8.1](../EPIC-collaboration/FEATURES/cadres/us-creer-cadre.md) | Créer / supprimer un cadre | High | M | ⬜ |
| [US08.8.2](../EPIC-collaboration/FEATURES/cadres/us-manipuler-cadre.md) | Déplacer / redimensionner / renommer / calque d'un cadre | High | M | ⬜ |
| [US08.9.1](../EPIC-collaboration/FEATURES/organisation-calque/us-grouper-cartes.md) | Grouper / dégrouper / couleur de groupe | High | M | ⬜ |
| [US08.9.2](../EPIC-collaboration/FEATURES/organisation-calque/us-verrouiller-cartes.md) | Verrouiller / déverrouiller des cartes (matrice complète) | High | M | ⬜ |
| [US08.9.3](../EPIC-collaboration/FEATURES/organisation-calque/us-calque-z-order.md) | Calque / z-order (premier plan / arrière-plan) | Medium | S | ⬜ |
| [US08.10.1](../EPIC-collaboration/FEATURES/champs-personnalises/us-definir-champs.md) | Définir des champs personnalisés de board (`BoardField` CRUD) | Medium | M | ⬜ |
| [US08.10.2](../EPIC-collaboration/FEATURES/champs-personnalises/us-valeurs-champs.md) | Renseigner / effacer une valeur de champ sur une carte (`CardFieldValue`) | Medium | S | ⬜ |

## Notes de séquencement

- **US08.8.1** (créer/supprimer un cadre) précède **US08.8.2** (manipuler) — même famille frame.
- **US08.9.1/.2/.3** (groupe, verrou, z-order) sont parallélisables entre agents (aspects disjoints
  de l'organisation des cartes).
- **US08.10.1** (définir `BoardField`) précède **US08.10.2** (renseigner `CardFieldValue`) — la
  valeur suppose la définition du champ.
- Les trois familles (cadres, organisation, champs) sont parallélisables entre elles.
- Gate 1 (PO Agent, DoR) à effectuer au démarrage de chaque item.

## Dépendances

- Dépend de : **Sprint 38 (EN08.4)** — modèle `Card` typé + contrats WS. Bloquant pour tous les
  items de ce sprint.
- Repo cible inchangé (`pivot-collaboratif-core`/`pivot-collaboratif-ui`).

---
*Créé le 2026-07-13, suite à la décision mainteneur d'absorber le spec de référence
`Détails tableau blanc backlog.md` (POC PouetPouet) dans le Socle E08 — parité complète, Sprints
38-43.*
