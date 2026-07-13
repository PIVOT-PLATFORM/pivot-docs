# US08.13.1 — Import Klaxoon + annulation

**En tant que** owner ou éditeur d'un tableau
**Je veux** importer une archive Klaxoon (cartes, cadres, connexions, champs) dans mon tableau puis pouvoir annuler cet import
**Afin de** réutiliser un contenu existant sans écraser ce que le tableau contient déjà et sans risque en cas d'erreur

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given je suis OWNER ou EDITOR d'un tableau, when je poste une archive Klaxoon sur `POST /api/collaboratif/whiteboard/boards/{boardId}/import/klaxoon` (corps : `cards[]`, `connections[]`, `frames?[]`, `fields?[]`), then les cartes, cadres, connexions et champs sont créés dans le tableau et un message STOMP `board:imported` est diffusé sur `/topic/board/{boardId}` avec les objets complets créés | ⬜ |
| Given un tableau non vide (bas réel des cartes+cadres existants = `bottom = max(posY + height)`) et un import non vide (`importTop = min(posY)` sur cartes ET cadres du payload), when l'import est appliqué, then `offsetY = round(bottom + 120 - importTop)` (marge fixe **120**) est ajouté au `posY` de chaque carte/cadre importé, sans aucun décalage en X | ⬜ |
| Given un tableau vide, when j'importe, then `offsetY = 0` (les cartes/cadres importés conservent exactement leur `posY` d'origine) | ⬜ |
| Given un import contenant une carte à `posY=40` et un existant à `posY=40, height=96` (bottom=136), when l'import est appliqué, then l'offset vaut `round(136 + 120 - 40) = 216` et la carte importée se retrouve à `posY=256` | ⬜ |
| Given des cartes importées avec des identifiants Klaxoon (`klxId`), when elles sont créées séquentiellement, then chaque carte reçoit un id serveur réel, un `idMap` (klxId → id serveur) est construit, et les connexions sont conservées seulement si `idMap` contient à la fois leur `fromKlxId` et leur `toKlxId` (les autres sont ignorées silencieusement) | ⬜ |
| Given des cartes importées partageant une même `groupKey` Klaxoon, when elles sont créées, then un nouveau `groupId` (UUID) est généré par `groupKey` distinct, jamais fusionné avec un groupe existant du tableau | ⬜ |
| Given un champ importé dont le nom correspond (insensible à la casse : `name.toLowerCase()`) à un `BoardField` existant du tableau, when l'import est appliqué, then aucun nouveau `BoardField` n'est créé, le champ existant est réutilisé et les valeurs importées lui sont rattachées ; sinon un nouveau champ est créé avec `order = nombre de champs existants` | ⬜ |
| Given un import réussi, when le serveur répond, then il renvoie **201** avec les comptes (`cards`, `connections`, `frames`) et les trois listes d'ids créés (`cardIds`, `connectionIds`, `frameIds`) — ce sont ces listes qui font foi pour l'annulation (aucune table d'historique d'import persistée) | ⬜ |
| Given le client a mémorisé les trois listes d'ids d'un import, when il poste `POST /api/collaboratif/whiteboard/boards/{boardId}/import/undo` avec `{cardIds[], connectionIds[], frameIds[]}`, then les cartes/connexions/cadres correspondants sont supprimés dans une transaction, scopés par `id IN (...) AND boardId = {boardId}`, et le serveur répond **200** avec les comptes réellement supprimés | ⬜ |
| Given un import a créé des `BoardField`, when j'annule cet import, then les `BoardField` créés par l'import ne sont **jamais** supprimés par l'undo (conservation intentionnelle), seuls cartes/connexions/cadres le sont | ⬜ |
| Given un undo, when la suppression des cartes cascade sur leurs connexions, then le `deleteMany` explicite sur `connectionIds` peut compter 0 (déjà supprimées par cascade) sans erreur, et un message STOMP `board:import-undone` est diffusé avec les ids **demandés** (pas les ids effectivement supprimés) | ⬜ |
| Error : given un corps d'import dépassant **50 Mo** (`50 * 1024 * 1024` octets, limite serveur active indépendamment de l'environnement), when la requête est postée, then le serveur répond **413** avant tout traitement | ⬜ |
| Error : given une liste d'undo dépassant les caps `cardIds` **10 000** / `connectionIds` **10 000** / `frameIds` **1 000**, when la requête est validée, then elle est rejetée en **400** (validation) | ⬜ |
| Error : given une liste d'undo contenant des ids appartenant à un autre tableau, when l'undo est appelé sur `{boardId}`, then aucun de ces objets n'est supprimé (scoping strict `boardId`) et la réponse renvoie des comptes à 0 sans erreur | ⬜ |
| Error : given un `boardId` inexistant ou hors du tenant courant, when import ou undo est appelé, then 404 (convention anti-énumération, cohérente avec les autres endpoints CRUD tableaux) | ⬜ |
| Security : tenantId et userId résolus exclusivement depuis le SecurityContext (token opaque) — jamais depuis le path ou le body ; import et undo requièrent le rôle OWNER ou EDITOR sur le tableau, un VIEWER reçoit **403** | ⬜ |
| Security : l'undo fait confiance à la liste d'ids fournie par le client mais **uniquement** sous le scoping `boardId` — aucun id hors du tableau ciblé ne peut être supprimé même s'il est fourni (garde IDOR sur le boardId du path) | ⬜ |
| Security : le corps d'import est validé strictement (types de carte importables limités à `TEXT/LABEL/DRAW/IMAGE/SHAPE`, longueurs de champ bornées `name ≤ 120`, `value ≤ 2000`, `option ≤ 200`) avant toute écriture | ⬜ |
| A11y : le déclencheur d'import est un bouton natif focusable avec `aria-label` explicite ; une fois l'import terminé, un `role="status"` annonce le nombre d'éléments importés, et l'action "Annuler l'import" reste accessible au clavier tant qu'elle est proposée | ⬜ |
| Tests TI : import sur board vide (offset 0), sur board occupé (offset = round(bottom+120-importTop)), réutilisation de champ insensible à la casse, filtrage des connexions orphelines, undo scopé par boardId (ids d'un autre board → 0 supprimé), champs préservés par l'undo, VIEWER → 403, corps > 50 Mo → 413 | ⬜ |
| Tests Vitest : mémorisation des trois listes d'ids retournées par l'import, bouton "Annuler l'import" rejouant l'undo avec ces listes, annonce `role="status"` du résultat | ⬜ |

## Hors périmètre

- Notification `notify()` aux autres membres du tableau lors d'un import : le POC ne l'émet pas (le type `BOARD_IMPORTED` existe dans l'enum de notification mais n'est pas branché sur ce flux, §6 constat 14) — décision de parité : ne pas notifier
- Parseur de format `.klx` brut côté serveur : cette US suppose un corps JSON déjà structuré (`cards/connections/frames/fields`) ; l'extraction/parsing du binaire Klaxoon vers ce JSON est réalisée côté client (import) et hors périmètre serveur
- Import des types de carte `LINK` et `TABLE` : le schéma Klaxoon d'origine ne les accepte pas (`type ∈ {TEXT, LABEL, DRAW, IMAGE, SHAPE}`) — reproduit tel quel
- Rejeu multi-niveaux de l'undo (pile d'imports) : l'undo porte sur les ids d'un seul import donné, pas d'historique d'imports empilés côté serveur

## Notes d'implémentation

- Backend `pivot-collaboratif-core` (schéma `collaboratif`) :
  - `POST /api/collaboratif/whiteboard/boards/{boardId}/import/klaxoon` — `bodyLimit` **50 Mo** (`50*1024*1024`) appliqué au niveau du framework HTTP (Spring), 413 au dépassement, indépendamment du profil ; rôle OWNER/EDITOR requis
  - Corps validé (équivalent zod → Bean Validation) : `cards[{ klxId, type ∈ {TEXT,LABEL,DRAW,IMAGE,SHAPE}, content, color, posX/posY/width/height/zIndex, locked, groupKey?, fieldValues?[{ field(≤120), value(≤2000) }] }]`, `connections[{ fromKlxId, toKlxId, shape, color, arrow, label, width, dashed }]`, `frames?[{ title, posX/posY/width/height }]`, `fields?[{ name(≤120), type ∈ {TEXT,SELECT}, options(String≤200)[]|null }]`
  - Anti-collision : `bottom = max(card.posY+card.height, frame.posY+frame.height)` sur l'existant ; `importTop = min(posY)` sur cartes+cadres du payload ; `offsetY = round(bottom + 120 - importTop)` si board non vide ET import non vide, sinon 0 ; appliqué au seul `posY` (aucun décalage X)
  - Remapping : cartes insérées une par une pour récupérer les ids serveur → `idMap` (klxId → id) ; connexions filtrées par présence des deux extrémités dans `idMap` ; groupes : un `groupId` UUID par `groupKey` distinct ; champs réutilisés par nom `toLowerCase()` sinon créés avec `order = fields.length++` ; valeurs de champs insérées en `insert … skipDuplicates`
  - Réponse 201 : `{ cards, connections, frames } (counts) + { cardIds, connectionIds, frameIds } (String[])`
  - `POST /api/collaboratif/whiteboard/boards/{boardId}/import/undo` — corps `{ cardIds(max 10000)[], connectionIds(max 10000)[], frameIds(max 1000)[] }` ; trois `deleteMany` dans une transaction, scopés `id IN (...) AND boardId = {boardId}` ; les `BoardField` ne sont jamais supprimés ; réponse **200** (pas 204) avec les comptes réellement supprimés ; message STOMP `board:import-undone` avec les ids demandés
- Realtime : `board:imported` (objets complets) et `board:import-undone` (ids demandés) diffusés sur `/topic/board/{boardId}` (canal STOMP EN08.1), tous les participants connectés reçoivent la mise à jour
- Frontend `pivot-collaboratif-ui` : composant d'import (sélection du fichier `.klx`, parsing client vers le JSON de corps), mémorisation des trois listes d'ids retournées par l'import pour câbler le bouton "Annuler l'import" sur `/import/undo`
- i18n : clés `whiteboard.board.import.*` (fr.json / en.json)
- Rate-limit d'import (5/minute) : à porter côté gateway/filtre applicatif ; noté comme actif en production uniquement dans le POC (§2.1/§6 constat 16), à confirmer comme garde permanente côté Socle
- Absorbe **EN30.13** (import Klaxoon, initialement hors Socle) dans le Socle E08 — décision mainteneur d'absorption intégrale du spec de référence

---
Item Type: US · Parent: F08.13 · Module: whiteboard · Phase: Socle · Size: L · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §2.4, §5.1, §7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: EN08.4 (modèle `Card` typé + contrats WS, prérequis bloquant), EN08.1 (isolation WS room, canal STOMP), F08.10 (champs personnalisés `BoardField`), F08.8 (cadres), F08.7 (connexions)
