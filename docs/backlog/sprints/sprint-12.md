# Sprint 12 — Parité whiteboard — Objets typés & connecteurs

**Branches :** une branche par US — `feat/{us-id}-{slug}` (voir [§Règles d'utilisation](./README.md#règles-dutilisation))
**Scope :** 8 items de **parité complète** whiteboard — les 6 types de carte (texte, étiquette,
forme, image, lien+aperçu, tableau) et les connecteurs, suite à la décision mainteneur du
2026-07-13 d'absorber tout le spec de référence `Détails tableau blanc backlog.md` (POC PouetPouet)
dans le Socle E08 (lève le verrou phase-3, zone d'ombre #11). `Phase: Socle`, module whiteboard.
**Jalon d'entrée :** dépend du modèle `Card` typé (EN08.4, Sprint 11) — les objets typés de ce
sprint sont des `Card` de type `TEXT`/`LABEL`/`SHAPE`/`IMAGE`/`LINK`/`TABLE` et des connecteurs.

## Contexte

Suite de la fondation posée au Sprint 11 (EN08.4, modèle `Card` typé). Ce sprint livre les
**objets typés** du board — les 6 types de carte du spec de référence PouetPouet — et les
**connecteurs** reliant les cartes. Il absorbe les Features benchmark US30.1.2/.3/.5/.11 (objets)
et US30.1.3 (connecteurs).

| Item | Titre | Priority | Size | 🤖 Dev |
|------|-------|----------|------|--------|
| [US08.6.1](../EPIC-collaboration/FEATURES/objets-types/us-carte-texte.md) | Pense-bête texte (TEXT) | High | M | 🔎 code livré — recette |
| [US08.6.2](../EPIC-collaboration/FEATURES/objets-types/us-carte-etiquette.md) | Étiquette (LABEL) | Medium | S | 🔎 code livré — recette |
| [US08.6.3](../EPIC-collaboration/FEATURES/objets-types/us-carte-forme.md) | Forme (SHAPE) | Medium | M | 🔎 code livré — recette |
| [US08.6.4](../EPIC-collaboration/FEATURES/objets-types/us-carte-image.md) | Image (IMAGE) | Medium | M | 🔎 code livré — recette |
| [US08.6.5](../EPIC-collaboration/FEATURES/objets-types/us-carte-lien-apercu.md) | Carte lien (LINK) + aperçu OpenGraph | High | L | 🔎 code livré — recette |
| [US08.6.6](../EPIC-collaboration/FEATURES/objets-types/us-carte-tableau.md) | Tableau (TABLE) + collage tableur | Medium | L | 🔎 code livré — recette |
| [US08.7.1](../EPIC-collaboration/FEATURES/connecteurs/us-creer-connecteur.md) | Créer / supprimer un connecteur | High | M | ✅ |
| [US08.7.2](../EPIC-collaboration/FEATURES/connecteurs/us-styler-connecteur.md) | Styler un connecteur | Medium | S | 🔎 code livré — recette |
| [US08.1.9](../EPIC-collaboration/FEATURES/crud-tableaux/us-chargement-tableau.md) | Chargement d'un tableau & présence agrégée (§2.2) | Medium | M | 🔎 code livré — recette |

## État réel (constaté dans le code le 2026-07-20)

> ⚠️ **Désync backlog↔code**, même schéma que Sprint 13 : les 9 items de ce sprint sont
> code-complets côté backend **et** frontend dans `pivot-core`/`pivot-ui` (repo actuel post-bascule
> Spring Modulith, ADR-030) mais n'ont jamais été réconciliés depuis la création de ce fichier
> (2026-07-13). `Stage` reste `⬜` jusqu'à recette mainteneur.

| Item | Preuve backend | Preuve frontend |
|------|-----------------|------------------|
| US08.6.1/.2 (TEXT/LABEL) | `CardType.TEXT`/`.LABEL` | `card-format.ts` (`LabelFmt`/`TextFmt`), rendu dans `board-card.component.ts` |
| US08.6.3 (SHAPE) | `canvas/ShapeStyleSanitizer.java` | `whiteboard/model/shape.ts` + spec |
| US08.6.4 (IMAGE) | `canvas/ImageCardContentValidator.java` | `whiteboard/model/image-card.ts` + spec |
| US08.6.5 (LINK + OpenGraph) | `canvas/opengraph/{OpenGraphFetcher,OpenGraphMeta,OpenGraphEnrichmentListener}.java` | `whiteboard/model/link-preview.ts` + spec |
| US08.6.6 (TABLE + collage) | `canvas/table/TableCardContentSanitizer.java` | `whiteboard/model/{table,table-clipboard}.ts` + specs |
| US08.7.2 (styler connecteur) | migration `V6__connector_line_style_caps.sql` (line_style/start_cap/end_cap) | `connection-line.component.ts` (rendu dasharray + caps SVG), contrôles dans `selection-toolbar.component.ts` |
| US08.1.9 (chargement + présence agrégée) | `board:state` snapshot (join/reconnect) | `board.store.ts` — signal `presence: PresenceUser[]` peuplé au join/leave |

## Notes de séquencement

- Les 6 types de carte (US08.6.1 à US08.6.6) sont **parallélisables entre agents** : branches
  séparées, chacun une variante de type sur le modèle `Card` d'EN08.4 (fichiers disjoints par type).
- Les connecteurs (US08.7.1 puis US08.7.2) dépendent de l'existence d'au moins un type de carte à
  relier — US08.7.1 (créer/supprimer) précède US08.7.2 (styler).
- Gate 1 (PO Agent, DoR) à effectuer au démarrage de chaque item.

## Dépendances

- Dépend de : **Sprint 11 (EN08.4)** — modèle `Card` typé + contrats WS. Bloquant pour tous les
  items de ce sprint. **Levée.**
- Repo cible : bascule Spring Modulith (ADR-030, 2026-07-17) — le code vit désormais dans
  `pivot-core` (module `fr.pivot.collaboratif.whiteboard`) et `pivot-ui`
  (`projects/collaboratif-ui`) ; `pivot-collaboratif-core`/`pivot-collaboratif-ui` sont archivés.
- **Bloque :** Sprint 14 (objets à manipuler pour le canvas UX & présence) et Sprint 16 (l'import
  Klaxoon crée des cartes typées).

---
*Créé le 2026-07-13, suite à la décision mainteneur d'absorber le spec de référence
`Détails tableau blanc backlog.md` (POC PouetPouet) dans le Socle E08 — parité complète, Sprints
38-43.*
