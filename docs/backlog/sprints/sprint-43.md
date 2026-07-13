# Sprint 43 — Parité whiteboard — Cycle de vie & partage

**Branches :** une branche par US — `feat/{us-id}-{slug}` (voir [§Règles d'utilisation](./README.md#règles-dutilisation))
**Scope :** 4 items de **parité complète** whiteboard — cycle de vie du board (import Klaxoon,
brouillon de template, image de couverture) et partage étendu (inviter par email + gouvernance des
rôles), suite à la décision mainteneur du 2026-07-13 d'absorber tout le spec de référence
`Détails tableau blanc backlog.md` (POC PouetPouet) dans le Socle E08 (lève le verrou phase-3, zone
d'ombre #11). `Phase: Socle`, module whiteboard.
**Jalon d'entrée :** dépend du modèle `Card` typé (EN08.4, Sprint 38) et des objets typés (Sprint
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

- **US08.13.1** (import Klaxoon) crée des cartes typées : dépend des objets typés du Sprint 39 —
  chaque objet Klaxoon importé se mappe sur un type de `Card` (TEXT/LABEL/SHAPE/IMAGE/…).
- **US08.13.2** (brouillon de template) s'appuie sur F08.4 Templates (`US08.4.1`, déjà `✅ Done`).
- **US08.13.3** (image de couverture) et **US08.2.5** (inviter par email) sont parallélisables avec
  les autres items (domaines disjoints).
- Gate 1 (PO Agent, DoR) à effectuer au démarrage de chaque item.

## Dépendances

- Dépend de : **Sprint 38 (EN08.4)** — modèle `Card` typé — et **Sprint 39** (objets typés, car
  l'import Klaxoon crée des cartes typées).
- S'appuie sur **F08.4 Templates** (`US08.4.1`, déjà `✅ Done`) pour le cycle de vie du brouillon.
- Repo cible inchangé (`pivot-collaboratif-core`/`pivot-collaboratif-ui`).

---
*Créé le 2026-07-13, suite à la décision mainteneur d'absorber le spec de référence
`Détails tableau blanc backlog.md` (POC PouetPouet) dans le Socle E08 — parité complète, Sprints
38-43.*
