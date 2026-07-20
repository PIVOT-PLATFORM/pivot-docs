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
| [US08.13.1](../EPIC-collaboration/FEATURES/cycle-vie-board/us-import-klaxoon.md) | Import Klaxoon + annulation | Medium | L | 🔎 code livré — recette |
| [US08.13.2](../EPIC-collaboration/FEATURES/cycle-vie-board/us-brouillon-template.md) | Cycle de vie du brouillon de template | Medium | M | ⬜ non commencé |
| [US08.13.3](../EPIC-collaboration/FEATURES/cycle-vie-board/us-image-couverture.md) | Image de couverture de tableau | Medium | S | 🔎 code livré — recette |
| [US08.13.4](../EPIC-collaboration/FEATURES/cycle-vie-board/us-reset-board.md) | Réinitialisation du canvas (§3.8, préservation champs/votes §6.10) | Medium | S | 🔎 code livré — recette |
| [US08.2.5](../EPIC-collaboration/FEATURES/partage-roles/us-inviter-email.md) | Inviter par email + gouvernance des rôles | High | M | ⚠️ régression de migration — voir État réel |
| [US08.2.6](../EPIC-collaboration/FEATURES/partage-roles/us-lien-partage-parite.md) | Lien de partage : lecture & gestion (§2.3) | Medium | M | 🔎 code livré — recette |

## État réel (constaté dans le code le 2026-07-20)

> ⚠️ **Cas particulier US08.2.5 : pas un simple retard, une régression de bascule modulith.**
> Le code (backend + frontend) était **codé, mergé et vérifié CI verte** sur les anciens repos
> pré-modulith (`pivot-collaboratif-core#108`, `pivot-collaboratif-ui#169`, mergés le 2026-07-17 —
> voir §Avancement ci-dessous), mais **absent du monolith actuel** (`pivot-core`/`pivot-ui`,
> ADR-030) : aucune trace de `BoardInviteController`/`BoardInviteService` côté backend, ni de code
> d'invitation par email côté frontend. La bascule Spring Modulith n'a apparemment pas repris ce
> contenu. À l'inverse d'un item "pas commencé", **le travail existe déjà** (voir les PR mergées) —
> il s'agit de le réimporter/rebrancher dans le monolith, pas de le réécrire depuis zéro.

| Item | État réel | Détail |
|------|-----------|--------|
| US08.13.1 (import Klaxoon) | Fait | `whiteboard/klx-import/{archive,converter}.ts` + `import-klaxoon-modal` (frontend) ; endpoints `/import/klaxoon` + `/import/undo` (backend) |
| US08.13.2 (brouillon de template) | **Absent** | Seul `templateDraftOf: null` existe comme placeholder passif sur `BoardDetail` — aucune méthode save-from-draft/discard-draft ni côté `board.service.ts` ni côté backend |
| US08.13.3 (image de couverture) | Fait | `coverImage` sur `Board`/`BoardSettingsPatch`, réservé OWNER |
| US08.13.4 (reset canvas) | Fait | `resetBoard()` → `board:reset` / écoute `board:resetted` dans `board.store.ts` |
| US08.2.5 (inviter par email) | **Régression de migration** — voir encart ci-dessus | — |
| US08.2.6 (lien de partage) | Fait | Backend `whiteboard/share/{BoardShareController,BoardShareService,BoardShareToken}.java` + frontend `share-panel.component.ts` (génération par rôle, gestion membres) |

## Notes de séquencement

- **US08.13.1** (import Klaxoon) crée des cartes typées : dépend des objets typés du Sprint 12 —
  chaque objet Klaxoon importé se mappe sur un type de `Card` (TEXT/LABEL/SHAPE/IMAGE/…).
- **US08.13.2** (brouillon de template) s'appuie sur F08.4 Templates (`US08.4.1`, déjà `✅ Done`).
- **US08.13.3** (image de couverture) et **US08.2.5** (inviter par email) sont parallélisables avec
  les autres items (domaines disjoints).
- Gate 1 (PO Agent, DoR) à effectuer au démarrage de chaque item.

## Avancement (état interne — non persisté dans `Stage`)

- **US08.2.5** (inviter par email + gouvernance des rôles) :
  - Backend `pivot-collaboratif-core` PR [#108](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/108) — **mergée le 2026-07-17**, label `security` (fix IDOR §6.1, revue humaine obligatoire, Breaking Point 2). CI verte, coverage 90,5 %.
  - Frontend `pivot-collaboratif-ui` PR [#169](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/169) — **mergée le 2026-07-17**, Gate 4 90/100. Suite librairie 1026 tests verts.
  - Spec figée : [`docs/specs/EPIC-collaboration/us08-2-5-inviter-email.md`](../../specs/EPIC-collaboration/us08-2-5-inviter-email).
  - ⚠️ **Ces deux PR ont mergé sur les repos pré-modulith, désormais archivés — le contenu n'a pas
    été repris dans `pivot-core`/`pivot-ui` lors de la bascule ADR-030 (2026-07-17).** Constaté
    absent du monolith le 2026-07-20 (voir §État réel). `Stage` frontmatter reste `⬜`.

## Dépendances

- Dépend de : **Sprint 11 (EN08.4)** — modèle `Card` typé — et **Sprint 12** (objets typés, car
  l'import Klaxoon crée des cartes typées). **Levées.**
- S'appuie sur **F08.4 Templates** (`US08.4.1`, déjà `✅ Done`) pour le cycle de vie du brouillon.
- Repo cible : bascule Spring Modulith (ADR-030, 2026-07-17) — le code vit désormais dans
  `pivot-core` (module `fr.pivot.collaboratif.whiteboard`) et `pivot-ui`
  (`projects/collaboratif-ui`) ; `pivot-collaboratif-core`/`pivot-collaboratif-ui` sont archivés.
  US08.2.5 est le cas où cette bascule a concrètement perdu du contenu (voir §État réel).

---
*Créé le 2026-07-13, suite à la décision mainteneur d'absorber le spec de référence
`Détails tableau blanc backlog.md` (POC PouetPouet) dans le Socle E08 — parité complète, Sprints
38-43.*
