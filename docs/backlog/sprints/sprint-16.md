# Sprint 16 — Parité whiteboard — Cycle de vie & partage

**Branches :** une branche par US — `feat/{us-id}-{slug}` (voir [§Règles d'utilisation](./README.md#règles-dutilisation))
**Scope :** 4 items de **parité complète** whiteboard — cycle de vie du board (import Klaxoon,
brouillon de template, image de couverture) et partage étendu (inviter par email + gouvernance des
rôles), suite à la décision mainteneur du 2026-07-13 d'absorber tout le spec de référence
`Détails tableau blanc backlog.md` (POC PouetPouet) dans le Socle E08 (lève le verrou phase-3, zone
d'ombre #11). `Phase: Socle`, module whiteboard.
**Jalon d'entrée :** dépend du modèle `Card` typé (EN08.4, Sprint 11) et des objets typés (Sprint
39, l'import crée des cartes typées) ; s'appuie sur F08.4 Templates (déjà `✅ Done`).

## Contexte

Sprint de clôture du chantier de parité complète (Sprints 38-43). Il livre le **cycle de vie du
board** — import Klaxoon avec annulation, cycle de vie du brouillon de template, image de couverture
— et l'**extension du partage** (invitation par email + gouvernance des rôles). Il absorbe l'enabler
benchmark EN30.13 (import de tableaux Klaxoon).

| Item | Titre | Priority | Size | 🤖 Dev |
|------|-------|----------|------|--------|
| [US08.13.1](../EPIC-collaboration/FEATURES/cycle-vie-board/us-import-klaxoon.md) | Import Klaxoon + annulation | Medium | L | ⬜ |
| [US08.13.2](../EPIC-collaboration/FEATURES/cycle-vie-board/us-brouillon-template.md) | Cycle de vie du brouillon de template | Medium | M | ⬜ |
| [US08.13.3](../EPIC-collaboration/FEATURES/cycle-vie-board/us-image-couverture.md) | Image de couverture de tableau | Medium | S | ⬜ |
| [US08.13.4](../EPIC-collaboration/FEATURES/cycle-vie-board/us-reset-board.md) | Réinitialisation du canvas (§3.8, préservation champs/votes §6.10) | Medium | S | ⬜ |
| [US08.2.5](../EPIC-collaboration/FEATURES/partage-roles/us-inviter-email.md) | Inviter par email + gouvernance des rôles | High | M | ⬜ |
| [US08.2.6](../EPIC-collaboration/FEATURES/partage-roles/us-lien-partage-parite.md) | Lien de partage : lecture & gestion (§2.3) | Medium | M | ⬜ |

## Notes de séquencement

- **US08.13.1** (import Klaxoon) crée des cartes typées : dépend des objets typés du Sprint 12 —
  chaque objet Klaxoon importé se mappe sur un type de `Card` (TEXT/LABEL/SHAPE/IMAGE/…).
- **US08.13.2** (brouillon de template) s'appuie sur F08.4 Templates (`US08.4.1`, déjà `✅ Done`).
- **US08.13.3** (image de couverture) et **US08.2.5** (inviter par email) sont parallélisables avec
  les autres items (domaines disjoints).
- Gate 1 (PO Agent, DoR) à effectuer au démarrage de chaque item.

## Avancement (état interne — non persisté dans `Stage`)

- **US08.2.5** (inviter par email + gouvernance des rôles) — **en revue** :
  - Backend `pivot-collaboratif-core` PR [#108](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/108) — `ready`, label `security` (fix IDOR §6.1, revue humaine obligatoire, Breaking Point 2). CI verte, coverage 90,5 %.
  - Frontend `pivot-collaboratif-ui` PR [#169](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/169) — `ready`, Gate 4 90/100. Suite librairie 1026 tests verts.
  - Spec figée : [`docs/specs/EPIC-collaboration/us08-2-5-inviter-email.md`](../../specs/EPIC-collaboration/us08-2-5-inviter-email).
  - `Stage` frontmatter reste `⬜` (passe `✅` à la recette mainteneur uniquement).

## Dépendances

- Dépend de : **Sprint 11 (EN08.4)** — modèle `Card` typé — et **Sprint 12** (objets typés, car
  l'import Klaxoon crée des cartes typées).
- S'appuie sur **F08.4 Templates** (`US08.4.1`, déjà `✅ Done`) pour le cycle de vie du brouillon.
- Repo cible inchangé (`pivot-collaboratif-core`/`pivot-collaboratif-ui`).

---
*Créé le 2026-07-13, suite à la décision mainteneur d'absorber le spec de référence
`Détails tableau blanc backlog.md` (POC PouetPouet) dans le Socle E08 — parité complète, Sprints
38-43.*
