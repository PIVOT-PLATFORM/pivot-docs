# US08.7.2 — Styler un connecteur

**En tant que** utilisateur-final (owner ou éditeur d'un tableau)
**Je veux** modifier le style d'un connecteur existant (libellé, couleur, forme de ligne courbe/droite/orthogonale, style de trait plein/tiret/pointillé, forme d'extrémité — flèche ou autre — indépendante en tête et en queue, épaisseur), un ou plusieurs attributs à la fois
**Afin de** distinguer visuellement les différents types de liens entre cartes et annoter les relations sur le tableau blanc

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given je suis OWNER ou EDITOR et qu'un connecteur d'id C existe, when j'émets `connection:update {id:C, boardId, ...patch}` avec un sous-ensemble des champs `{label, color, shape, lineStyle, startCap, endCap, width}` (+ champs hérités `arrow`/`dashed`, cf. compatibilité), then seuls les champs fournis (`!== undefined`) sont mis à jour et l'objet connecteur complet est diffusé à toute la room (émetteur inclus) en `connection:updated` | ⬜ |
| Given un patch partiel (ex. `{shape:"orthogonal"}` seul), when il est appliqué, then les autres attributs du connecteur (label, color, lineStyle, startCap, endCap, width) restent inchangés — mise à jour strictement partielle, pas de réécriture des champs absents | ⬜ |
| Given un connecteur avec un label existant, when j'émets `connection:update {id, boardId, label:null}` (null explicite, présent dans le patch), then le label est effacé (mis à null) et l'objet mis à jour est diffusé — le null explicite est distingué de l'absence de champ | ⬜ |
| Given un patch vide (aucun champ de style fourni au-delà de `id`/`boardId`), when il est reçu, then aucune écriture n'est effectuée et rien n'est diffusé (refus silencieux, no-op — cohérent avec le comportement POC `connection:update` patch vide → return) | ⬜ |
| Given le champ `lineStyle` ∈ `{solid, dashed, dotted}` (style de trait), when une valeur est fournie, then le trait du connecteur est rendu en conséquence (plein / tirets / pointillés) ; `lineStyle` **remplace** le booléen hérité `dashed` (maintenu synchronisé : `dashed = lineStyle !== "solid"`) | ⬜ |
| Given les champs `startCap` et `endCap` ∈ `{none, arrow, triangle, circle, diamond}` (forme d'extrémité, **indépendante en tête et en queue**), when une valeur est fournie, then l'extrémité correspondante est rendue avec la forme demandée (aucune, flèche, triangle, cercle, losange) ; `startCap`/`endCap` **remplacent** le champ hérité `arrow` (none/start/end/both, maintenu synchronisé au mieux) | ⬜ |
| Given les valeurs de `shape` `{straight, curved, orthogonal}`, `lineStyle` `{solid, dashed, dotted}`, `startCap`/`endCap` `{none, arrow, triangle, circle, diamond}`, when une valeur hors du jeu autorisé est fournie, then elle est **ignorée** (champ non appliqué, convention applicative — aucun enum SQL, colonnes `String`) ; la validation du jeu de valeurs est portée côté application (client + validation d'entrée serveur), pas par une contrainte SQL | ⬜ |
| Error : given un id de connecteur inexistant ou déjà supprimé, when `connection:update` est reçu, then l'opération est tolérante (pas d'exception non gérée, comportement P2025 absorbé) et aucun `connection:updated` n'est diffusé | ⬜ |
| Error : given un boardId inexistant ou dont l'utilisateur n'est pas membre, when `connection:update` est reçu, then aucune mutation n'est effectuée (garde de rôle échoue → refus silencieux, pas de fuite d'existence — cohérent anti-énumération) | ⬜ |
| Security : tenantId et userId résolus exclusivement depuis le SecurityContext (token opaque) — jamais depuis le payload ; le connecteur ciblé est scopé par tenant et par board accessible (pas de restyle d'un connecteur d'un autre tenant/board via un id deviné) | ⬜ |
| Security : seul `canWrite` (OWNER ou EDITOR) peut styler un connecteur ; un VIEWER émettant `connection:update` est refusé silencieusement (aucune mutation, aucun broadcast) | ⬜ |
| A11y : le panneau de style du connecteur (sélecteurs forme, style de trait, forme d'extrémité tête, forme d'extrémité queue, couleur, épaisseur, champ label) est entièrement pilotable au clavier (Tab, contrôles natifs `<select>`/`<input>`), chaque contrôle porte un `<label>` explicite ; le connecteur rendu reflète son style dans son `aria-label` (ex. « connecteur en pointillés, flèche en queue, de A vers B ») | ⬜ |
| Tests TI (backend) : patch mono-champ (autres champs inchangés) ; patch multi-champs ; `lineStyle`/`startCap`/`endCap` appliqués indépendamment ; valeur hors jeu autorisé ignorée ; `dashed`/`arrow` hérités restent synchronisés ; `label:null` explicite efface le label ; patch vide → no-op sans broadcast ; id inexistant → tolérant sans exception ; VIEWER → refus ; cross-tenant → refus | ⬜ |
| Tests Vitest (frontend) : émission d'un patch partiel, réconciliation sur `connection:updated`, rendu des variantes forme×style-de-trait×forme-d'extrémité(tête/queue)×épaisseur, effacement du label via null | ⬜ |

## Hors périmètre

- Création et suppression d'un connecteur — couvertes par US08.7.1 (`connection:create`/`connection:delete`)
- Contrainte enum en base sur `shape`/`lineStyle`/`startCap`/`endCap` — restent des `String` libres (§1.8) ; le jeu de valeurs autorisé est une convention purement applicative, non contrainte SQL
- Historique undo/redo du restyle — le POC couvre `updateConnection` dans son historique client (§4.5) ; la mécanique undo/redo générale est traitée hors de cette US (US canvas-ux dédiée)
- Styles de connecteur au-delà de `{label, color, shape, lineStyle, startCap, endCap, width}` (ex. animation, dégradé, épaisseur variable) — hors scope Socle

## Notes d'implémentation

- **Traduction de stack** : le POC Node/Prisma/Socket.io (`connection:update` sur `board.sockets.ts`, §3.6) est porté sur Spring Boot + Angular + STOMP. Realtime sur `/topic/whiteboard/{boardId}` ; garde `canWrite` = OWNER+EDITOR depuis le SecurityContext ; mutation via STOMP uniquement (pas de route REST dédiée, comme le POC).
- Backend `pivot-collaboratif-core` : mise à jour partielle de l'entité `card_connection` (US08.7.1). Ne construire l'ensemble des colonnes à écrire qu'à partir des champs **présents** dans le payload (`!= null` au sens « clé présente ») — un `label` explicitement `null` **est** un champ présent (efface la valeur) ; un champ absent n'est pas touché. Patch résultant vide → aucun `UPDATE`, aucun broadcast.
- **Distinction null explicite vs absent** : au niveau du DTO d'entrée STOMP, distinguer « clé absente » de « valeur null » (ex. champ `Optional<...>` ou map de champs présents) pour reproduire le comportement POC où `label:null` efface et où l'absence préserve.
- Modèle de style étendu (2026-07-17) : `shape {straight,curved,orthogonal}` × `lineStyle {solid,dashed,dotted}` × `startCap`/`endCap {none,arrow,triangle,circle,diamond}`, stockés en `String`. Nouvelles colonnes `line_style`/`start_cap`/`end_cap` (migration additive) ; colonnes héritées `dashed`/`arrow` conservées et **maintenues synchronisées** en écriture pour compatibilité. Valider le jeu de valeurs à l'entrée (valeur hors jeu → champ ignoré) sans enum SQL, conformément à §1.8.
- Rendu : `lineStyle` → `stroke-dasharray` (solid=aucun, dashed, dotted) ; `startCap`/`endCap` → marqueur SVG par forme (flèche/triangle/cercle/losange) orienté sur la tangente de l'extrémité.
- i18n : clés `whiteboard.connector.style.*` (formes, style de trait, formes d'extrémité, épaisseur, label) — fr.json / en.json.
- Source : parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.8, §3.6) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08.

---
Item Type: US · Parent: F08.7 · Module: whiteboard · Phase: Socle · Size: L · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.8/§3.6) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08. **AC réalignées le 2026-07-14 (Gate 1 PO Agent)** contre le contrat WebSocket réel — voir US08.6.1 (topic `/topic/whiteboard/{boardId}`). **Extension de périmètre 2026-07-17 (décision mainteneur)** : le style de base livré (shape/color/width/label + booléen `dashed` + `arrow` none/start/end/both) est enrichi d'un `lineStyle` en enum (plein/tiret/pointillé) et de formes d'extrémité `startCap`/`endCap` indépendantes (flèche/triangle/cercle/losange) ; Size S→L.
Dépendances: EN08.4 (modèle Card typé + contrats WebSocket) + US08.7.1 (création du connecteur, entité `card_connection`)
