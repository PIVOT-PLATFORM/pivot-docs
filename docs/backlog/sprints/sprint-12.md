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
| [US08.6.1](../EPIC-collaboration/FEATURES/objets-types/us-carte-texte.md) | Pense-bête texte (TEXT) | High | M | 🔎 code livré (core #77/#78 · ui #110) — recette |
| [US08.6.2](../EPIC-collaboration/FEATURES/objets-types/us-carte-etiquette.md) | Étiquette (LABEL) | Medium | S | 🔎 code livré (core #74 · ui #107) — recette |
| [US08.6.3](../EPIC-collaboration/FEATURES/objets-types/us-carte-forme.md) | Forme (SHAPE) | Medium | M | 🔎 code livré (core #73 · ui #109) — recette |
| [US08.6.4](../EPIC-collaboration/FEATURES/objets-types/us-carte-image.md) | Image (IMAGE) | Medium | M | 🔎 code livré (core #80 · ui #106) — recette |
| [US08.6.5](../EPIC-collaboration/FEATURES/objets-types/us-carte-lien-apercu.md) | Carte lien (LINK) + aperçu OpenGraph | High | L | 🔎 code livré (core #78 · ui #112) — recette |
| [US08.6.6](../EPIC-collaboration/FEATURES/objets-types/us-carte-tableau.md) | Tableau (TABLE) + collage tableur | Medium | L | 🔎 code livré (core #75 · ui #105) — recette |
| [US08.7.1](../EPIC-collaboration/FEATURES/connecteurs/us-creer-connecteur.md) | Créer / supprimer un connecteur | High | M | ✅ |
| [US08.7.2](../EPIC-collaboration/FEATURES/connecteurs/us-styler-connecteur.md) | Styler un connecteur | Medium | S | 🔎 code livré (core #82 · ui #115) — recette |
| [US08.1.9](../EPIC-collaboration/FEATURES/crud-tableaux/us-chargement-tableau.md) | Chargement d'un tableau & présence agrégée (§2.2) | Medium | M | 🟡 partiel (core #76 · ui #111) — **AC L18 (clone template) non couvert** |

## État réel (constaté dans le code le 2026-07-16)

> ⚠️ **Désync backlog↔code + dette de traçabilité.** Comme les Sprints 10/11/13, la totalité de ce
> sprint a été **implémentée hors du cycle ACDD** (commits `feat(whiteboard): US08.x` directement sur
> `main`, sans Gate 1/2/4 tracés dans le backlog). Le tableau `🤖 Dev` ci-dessus reflète l'état réel
> **constaté dans le code**, pas un avancement ACDD. Le champ `Stage:` des fichiers US **reste `⬜`**
> jusqu'à la recette mainteneur. Vérification faite AC par AC contre `pivot-collaboratif-core` et
> `pivot-collaboratif-ui` (branche `main`).

| Item | État code | Détail (preuves) |
|------|-----------|------------------|
| **US08.6.1** TEXT | ✅ livré — recette | 6 types sur `CardType`, défauts + garde `locked` + broadcast room, enrichissement OpenGraph déclenché. IT `WhiteboardCardIT` (20+ tests), Vitest `board.store.text-card.spec` + `board-card.spec`. Réserve : pas d'IT backend asserte l'echo `clientTag` (couvert front). core #77/#78 · ui #110. |
| **US08.6.2** LABEL | ✅ livré — recette | `CardType.LABEL`, défauts 192×128/#FFEB3B, a11y `dblclick`+Enter/F2. IT `WhiteboardLabelCardIT` (12). Réserve : test OG spécifique LABEL absent (regex partagée avec TEXT). core #74 · ui #107. |
| **US08.6.3** SHAPE | ✅ livré — recette | `ShapeStyleSanitizer` (whitelist formes/hex), style dans `content`. IT `WhiteboardShapeCardIT` (9) + `ShapeStyleSanitizerTest` (15). Nuance doc : AC dit `fill = Card.color`, l'impl garde `fill` dans `content` (`Card.color` = stroke). core #73 · ui #109. |
| **US08.6.4** IMAGE | ✅ livré — recette | Validation serveur MIME (magic-number) + borne 5 MiB (`ImageCardContentValidator`), dimensionnement `min(700/w,600/h,1)`, collage + upload. IT `WhiteboardImageCardIT` (6) + Vitest dimensionnement (5 cas). core #80 · ui #106. |
| **US08.6.5** LINK | ✅ livré — recette | Enrichissement OpenGraph `@Async` `AFTER_COMMIT`, caps (100k / 5 redirections / 5000 ms), **protection SSRF** (`DefaultSsrfGuard` : loopback/link-local/RFC1918/fd00/IPv4-mapped, revalidation par saut). IT `WhiteboardLinkFetchIT`/`WhiteboardLinkSsrfIT` + `DefaultSsrfGuardTest`. Résiduel documenté : DNS-rebinding non épinglé. core #78 · ui #112. |
| **US08.6.6** TABLE | ✅ livré — recette | Collage tableur (html→TSV), `TableCardContentSanitizer` (strip balises), clamp dimensions, a11y `role=table`. IT `WhiteboardTableCardIT` (7) + `TableCardContentSanitizerTest` (7) + Vitest `table-clipboard.spec` (17). core #75 · ui #105. |
| **US08.7.2** Styler connecteur | ✅ livré — recette | Patch partiel `connection:update` (par champ présent), `label:null` efface, patch vide = no-op sans broadcast, whitelist formes/flèches applicative. IT `CardConnectionUpdateIT` (9) + `connection-line.spec` (26) + `connector-style-panel.spec` (10). Réserve : IT cross-**tenant** restyle absent (cross-**board** testé ; couvert structurellement par la requête `boardId`-scopée). core #82 · ui #115. |
| **US08.1.9** Chargement + présence | 🟡 **partiel** | Chargement board+cartes+`fieldValues`+rôle (200), présence agrégée dédupliquée par `userId` (`BoardPresenceService` sur `ParticipantMetaStore`), `shareCount`, garde 404 cross-tenant/non-membre. IT `BoardControllerIT` (matrice `ac08_1_9_*`) + Vitest. **Trou réel** : **AC L18** (clone de template avec remap des `cardId` + remap/filtrage des connecteurs) **non implémenté** — les templates sont modélisés comme des events `DRAW` rejoués (`WhiteboardTemplateService`), pas cards+connecteurs ; aucun code ni test de remap. core #76 · ui #111. |

**Findings à arbitrer par le mainteneur (aucun corrigé unilatéralement) :**

1. **US08.1.9 AC L18 — clone de template.** Désaccord d'architecture : l'AC a été écrite avant EN08.4
   (modèle `Card` typé) et suppose un template = cards + connecteurs à réassigner. L'implémentation
   réelle rejoue des events `DRAW` verbatim. → soit implémenter la réassignation cards/connecteurs, soit
   réviser l'AC pour acter le modèle `DRAW`-replay. **Décision produit requise.**
2. **Dérive de rédaction `/topic/board/` → `/topic/whiteboard/`.** Plusieurs AC (`objets-types/*`)
   citent encore le canal `/topic/board/{boardId}` dans leur prose alors que le vrai canal est
   `/topic/whiteboard/{boardId}` (déjà réaligné pour le contrat par la PR docs #261, mentions
   inline résiduelles). Nettoyage rédactionnel, sémantique wire identique.
3. **Exclusion émetteur au broadcast.** Les AC `move/resize` parlent de diffusion « sauf l'émetteur » ;
   l'impl diffuse à toute la room et le client déduplique via l'echo `senderSessionId` (contrat réel
   acté par EN08.4/#261). Comportement conforme, formulation d'AC à clarifier.
4. **Tests mineurs manquants** (non bloquants) : echo `clientTag` non asserté en IT backend (TEXT) ;
   test OG spécifique LABEL ; IT cross-tenant restyle (US08.7.2). À compléter lors d'une reprise ACDD.

## Notes de séquencement

- Les 6 types de carte (US08.6.1 à US08.6.6) sont **parallélisables entre agents** : branches
  séparées, chacun une variante de type sur le modèle `Card` d'EN08.4 (fichiers disjoints par type).
- Les connecteurs (US08.7.1 puis US08.7.2) dépendent de l'existence d'au moins un type de carte à
  relier — US08.7.1 (créer/supprimer) précède US08.7.2 (styler).
- Gate 1 (PO Agent, DoR) à effectuer au démarrage de chaque item.

## Dépendances

- Dépend de : **Sprint 11 (EN08.4)** — modèle `Card` typé + contrats WS. Bloquant pour tous les
  items de ce sprint.
- Repo cible inchangé (`pivot-collaboratif-core`/`pivot-collaboratif-ui`).
- **Bloque :** Sprint 14 (objets à manipuler pour le canvas UX & présence) et Sprint 16 (l'import
  Klaxoon crée des cartes typées).

---
*Créé le 2026-07-13, suite à la décision mainteneur d'absorber le spec de référence
`Détails tableau blanc backlog.md` (POC PouetPouet) dans le Socle E08 — parité complète, Sprints
38-43.*
