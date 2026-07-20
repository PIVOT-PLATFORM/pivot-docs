# Sprint 13 — Parité whiteboard — Cadres, organisation, champs

**Branches :** une branche par US — `feat/{us-id}-{slug}` (voir [§Règles d'utilisation](./README.md#règles-dutilisation))
**Scope :** 7 items de **parité complète** whiteboard — cadres (frames), organisation/calque
(groupe, verrou, z-order) et champs personnalisés de board, suite à la décision mainteneur du
2026-07-13 d'absorber tout le spec de référence `Détails tableau blanc backlog.md` (POC PouetPouet)
dans le Socle E08 (lève le verrou phase-3, zone d'ombre #11). `Phase: Socle`, module whiteboard.
**Jalon d'entrée :** dépend du modèle `Card` typé (EN08.4, Sprint 11) — cadres, groupes et champs
s'appliquent à des cartes typées.

## Contexte

Suite de la fondation posée au Sprint 11 (EN08.4, modèle `Card` typé). Ce sprint livre les
capacités d'**organisation** du board : cadres (frames) pour sectionner le canevas,
groupement/verrouillage/z-order des cartes, et champs personnalisés attachés au board et à ses
cartes. Il absorbe les Features benchmark US30.1.7 (cadres) et US30.1.6 (organisation des objets).

| Item | Titre | Priority | Size | 🤖 Dev |
|------|-------|----------|------|--------|
| [US08.8.1](../EPIC-collaboration/FEATURES/cadres/us-creer-cadre.md) | Créer / supprimer un cadre | High | M | 🔎 code livré (core #85 / ui #120) — recette |
| [US08.8.2](../EPIC-collaboration/FEATURES/cadres/us-manipuler-cadre.md) | Déplacer / redimensionner / renommer / calque d'un cadre | High | M | 🔎 code livré (core #85 / ui #120) — recette |
| [US08.9.1](../EPIC-collaboration/FEATURES/organisation-calque/us-grouper-cartes.md) | Grouper / dégrouper / couleur de groupe | High | M | 🔎 backend dans `main` — UI en cours (branche `perf`) |
| [US08.9.2](../EPIC-collaboration/FEATURES/organisation-calque/us-verrouiller-cartes.md) | Verrouiller / déverrouiller des cartes (matrice complète) | High | M | 🔎 backend dans `main` — UI en cours (branche `perf`) |
| [US08.9.3](../EPIC-collaboration/FEATURES/organisation-calque/us-calque-z-order.md) | Calque / z-order (premier plan / arrière-plan) | Medium | S | 🔎 code livré (ui #133) — recette |
| [US08.10.1](../EPIC-collaboration/FEATURES/champs-personnalises/us-definir-champs.md) | Définir des champs personnalisés de board (`BoardField` CRUD) | Medium | M | 🔎 code livré (core #93 / ui #129) — recette |
| [US08.10.2](../EPIC-collaboration/FEATURES/champs-personnalises/us-valeurs-champs.md) | Renseigner / effacer une valeur de champ sur une carte (`CardFieldValue`) | Medium | S | 🔎 code livré (core #95 / ui #131) — recette |

## État réel (constaté dans le code le 2026-07-16)

> ⚠️ **Désync backlog↔code + dette de traçabilité.** Une partie de ce sprint a été **implémentée
> hors du cycle ACDD** (branches hors-convention, commits `feat(EN08)` au lieu de `US08.x`, pas de
> Gate 1/2/4 tracés). Le tableau `🤖 Dev` ci-dessus reflète l'état réel, **pas** l'avancement ACDD.
> Le champ `Stage:` des fichiers US **reste `⬜`** jusqu'à la recette mainteneur.

| Famille | État code | Détail |
|---------|-----------|--------|
| **Cadres** (US08.8.1/.2) | ✅ livré, **recette en attente** | Backend `pivot-collaboratif-core` #85 (`feat(EN08): Frames — STOMP + persistence`, mergé) ; frontend `pivot-collaboratif-ui` #120 (outil cadre toolbar, remplace #119, mergé). Branches hors-convention `feat/en08-frames-backend` / `feat/frames-frontend-toolbar`. |
| **Organisation — groupe/verrou** (US08.9.1/.2) | 🔎 backend dans `main`, UI en cours | Colonnes `group_id`/`group_color`/`locked` sur `card`, handlers STOMP `cards:group`/`ungroup`/`group-color` + `card:lock`, IT `WhiteboardGroupLockEditIT` déjà dans `main`. UI (lock via `selection-toolbar`, `groups-panel`) portée par les branches `perf/*` actives — **hors périmètre de la reprise ACDD** ci-dessous. |
| **Organisation — z-order** (US08.9.3) | 🔎 code livré (ui #133) — recette | Backend `card:layer`/`frame:layer` + inbound `card:layered`/`frame:layered` déjà dans `main` ; UI premier/arrière-plan (cartes + cadres) livrée. |
| **Champs** (US08.10.1/.2) | 🔎 code livré — recette | US08.10.1 : `BoardField`/`CardFieldValue`, enum `FieldType`, handlers `boardfield:*`, migration **V5**, fix §6.6, UI de définition (core #93 / ui #129). US08.10.2 : `cardfield:set/clear` (tolérance FK), `CardDto.fieldValues`, éditeur de valeur par carte (core #95 / ui #131). |

**Reprise ACDD réalisée** (branches conventionnelles `feat/{us-id}-{slug}`, cycle ACDD complet,
CI verte) : US08.10.1 → US08.10.2 (champs) + US08.9.3 (z-order) **mergés dans `main` le 2026-07-16**.
US08.9.1/US08.9.2 (groupe/verrou) restent sur les branches `perf/*` et seront réconciliées à leur
merge. Migration BDD champs = nouveau `V5`. `Stage:` des US reste `⬜` jusqu'à recette mainteneur.

## Notes de séquencement

- **US08.8.1** (créer/supprimer un cadre) précède **US08.8.2** (manipuler) — même famille frame.
- **US08.9.1/.2/.3** (groupe, verrou, z-order) sont parallélisables entre agents (aspects disjoints
  de l'organisation des cartes).
- **US08.10.1** (définir `BoardField`) précède **US08.10.2** (renseigner `CardFieldValue`) — la
  valeur suppose la définition du champ.
- Les trois familles (cadres, organisation, champs) sont parallélisables entre elles.
- Gate 1 (PO Agent, DoR) à effectuer au démarrage de chaque item.

## Dépendances

- Dépend de : **Sprint 11 (EN08.4)** — modèle `Card` typé + contrats WS. **Levée** : EN08.4 est
  déjà dans `pivot-core` main (entité `Card` typée avec `groupId`/`groupColor`/`locked`/
  `layer`, contrats `CARD_*`). *(Désync `README.md` réconciliée le 2026-07-20 — voir sprint-11.md.)*
- Repo cible : bascule Spring Modulith (ADR-030, 2026-07-17) — le code vit désormais dans
  `pivot-core` (module `fr.pivot.collaboratif.whiteboard`) et `pivot-ui`
  (`projects/collaboratif-ui`) ; `pivot-collaboratif-core`/`pivot-collaboratif-ui` sont archivés.

---
*Créé le 2026-07-13, suite à la décision mainteneur d'absorber le spec de référence
`Détails tableau blanc backlog.md` (POC PouetPouet) dans le Socle E08 — parité complète, Sprints
38-43.*
