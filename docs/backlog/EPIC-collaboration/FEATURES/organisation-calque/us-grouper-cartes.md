# US08.9.1 — Grouper / dégrouper / couleur de groupe

**En tant que** utilisateur d'un tableau blanc
**Je veux** grouper une multi-sélection de cartes, dégrouper un groupe existant, et attribuer une couleur de contour à un groupe
**Afin de** organiser visuellement mes cartes en ensembles cohérents et les manipuler comme un tout

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given je suis OWNER ou EDITOR et j'ai sélectionné ≥ 2 cartes, when j'active « Grouper », then un nouvel identifiant de groupe (`groupId = UUID`) est attribué à toutes les cartes sélectionnées et un message STOMP `cards:grouped {cardIds, groupId}` est diffusé à toute la room `/topic/board/{boardId}` (émetteur inclus) | ⬜ |
| Given une sélection dont certaines cartes appartiennent déjà à un groupe préexistant, when je « Grouper », then le nouveau `groupId` écrase l'ancien sans vérification (dernier groupage gagne), et le broadcast `cards:grouped` est émis **inconditionnellement** (même si le groupe résultant est identique) | ⬜ |
| Given un groupe existant, when j'active « Dégrouper » sur ce `groupId`, then le `groupId` de toutes ses cartes est remis à `null` (`updateMany({groupId:null})`) et `cards:ungrouped {groupId}` est diffusé inconditionnellement à toute la room | ⬜ |
| Given un groupe existant, when j'attribue une couleur de contour de groupe (`groupColor`), then la couleur est persistée sur les cartes du groupe et `cards:group-colored {groupId, color}` est diffusé inconditionnellement à toute la room ; cette action **n'est pas** bloquée par le verrou individuel des cartes (elle agit sur le groupe entier, §4.6) | ⬜ |
| Given un groupe de 2 cartes A et B, when la carte A est supprimée (via `card:delete`, US08.6.x) laissant le groupe à exactement 1 membre restant, then le `groupId` de B est automatiquement remis à `null` et un événement `cards:ungrouped {groupId}` (ancien `groupId`) est émis à toute la room (dissolution automatique, §5.7) | ⬜ |
| Given un groupe de 3 cartes ou plus, when une carte est supprimée laissant ≥ 2 membres, then les cartes restantes conservent leur `groupId` inchangé et **aucun** événement `cards:ungrouped` n'est émis (dissolution seulement à exactement 1 membre restant) | ⬜ |
| Error : given une dissolution automatique concurrente d'une suppression du membre survivant lui-même (course), when la mise à jour de dissolution de B coïncide avec la suppression concurrente de B, then l'échec de cette mise à jour est toléré silencieusement (P2025 via `ignoreMissing`, pas d'exception remontée) | ⬜ |
| Error : given un `boardId` inexistant ou cross-tenant, when un message `cards:group` / `cards:ungroup` / `cards:group-color` est reçu, then le serveur refuse silencieusement (aucune mutation, aucun broadcast) — cohérent avec la convention « rien ne se passe » du canal temps réel (§3.12) | ⬜ |
| Security : le rôle est résolu exclusivement depuis le SecurityContext / la room STOMP (`canWrite` = OWNER ou EDITOR) — un VIEWER émettant `cards:group`/`cards:ungroup`/`cards:group-color` est refusé silencieusement, aucune mutation ni broadcast | ⬜ |
| Security : `boardId`, `tenantId` et `userId` ne sont jamais lus depuis le payload client pour l'autorisation — ils proviennent du SecurityContext ; les `cardIds`/`groupId` sont scopés par `boardId` (`where:{..., boardId}`) pour empêcher un groupage cross-board | ⬜ |
| A11y : les commandes « Grouper » / « Dégrouper » / « Couleur de groupe » sont des boutons natifs, focusables au clavier (Tab, Enter/Espace), avec `aria-label` explicite ; l'état groupé est annoncé (les cartes d'un groupe partagent un contour visuel + une relation ARIA de groupe, pas uniquement une couleur) | ⬜ |
| Tests TI : group ≥ 2 cartes (OWNER/EDITOR → `groupId` posé + broadcast ; VIEWER → refus silencieux) ; ungroup (`groupId` → null + broadcast) ; group-color non bloqué par `locked` ; dissolution auto à 1 membre restant ; pas de dissolution à ≥ 2 membres ; cross-tenant → refus silencieux | ⬜ |
| Tests Vitest : sélection multi-cartes → « Grouper » émet le message, réordonne l'UI ; réception `cards:grouped`/`cards:ungrouped`/`cards:group-colored` met à jour le rendu du groupe ; dissolution auto à réception de `cards:ungrouped` déclenchée par une suppression distante | ⬜ |

## Hors périmètre

- Groupes imbriqués (un groupe contenant un autre groupe) — le modèle est plat : une carte porte au plus un `groupId`
- Déplacement / redimensionnement homothétique du groupe (suivi de groupe) — couvert par les US de manipulation de cartes (US08.6.x / redimensionnement multi-sélection) ; cette US ne porte que la constitution, la dissolution et la couleur du groupe
- Verrouillage d'un groupe entier en une action — le verrou reste par carte (US08.9.2)
- Persistance d'un ordre ou d'un nom de groupe — un groupe n'a ni titre ni ordre, uniquement `groupId` + `groupColor`

## Notes d'implémentation

- Backend `pivot-collaboratif-core` : sur l'entité `Card` (EN08.4), champs `groupId` (nullable) et `groupColor` (nullable). Handlers STOMP :
  - `cards:group` `{cardIds}` → `groupId = UUID.randomUUID()`, `updateMany({id in cardIds, boardId})` set `groupId` ; broadcast **inconditionnel** `cards:grouped {cardIds, groupId}` (`io.to(room)`, émetteur inclus)
  - `cards:ungroup` `{groupId}` → `updateMany({groupId, boardId}, set groupId=null)` ; broadcast inconditionnel `cards:ungrouped {groupId}`
  - `cards:group-color` `{groupId, color}` → set `groupColor` sur les cartes du groupe ; broadcast inconditionnel `cards:group-colored {groupId, color}` — **pas de filtre `locked`** (agit sur le groupe entier)
- **Dissolution automatique (§5.7)** : intégrée au handler `card:delete` (US08.6.x) — après suppression, si la carte supprimée portait un `groupId`, compter les cartes restantes de ce groupe ; si `remaining == 1` → set `groupId=null` sur le survivant + émettre `cards:ungrouped {groupId}` ; si `remaining >= 2` → ne rien faire. La mise à jour du survivant tolère P2025 (`ignoreMissing`) pour la course (§5.7 scénario 3)
- Absorbe **US30.1.6 (partie groupage)** : la fonctionnalité de groupage/couleur de groupe issue du POC est intégrée au Socle E08 plutôt que reportée en F30.x
- Garde `canWrite` (OWNER+EDITOR) sur les 3 mutations ; refus silencieux pour VIEWER et pour tout board non résolu (cohérent §3.12)
- i18n : clés `whiteboard.board.group.*` (grouper, dégrouper, couleur de groupe) — fr.json / en.json
- Source : parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §3.5, §5.7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08

---
Item Type: US · Parent: F08.9 · Module: whiteboard · Phase: Socle · Size: M · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §3.5, §5.7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08 (absorbe US30.1.6 partie groupage)
Dépendances: EN08.4 (modèle Card typé + contrats WebSocket) + EN08.1 (isolation WS room)
