# US08.8.1 — Créer / supprimer un cadre

**En tant que** utilisateur-final (owner ou éditeur d'un tableau)
**Je veux** créer un cadre (frame) sur le canvas pour regrouper visuellement des cartes, et supprimer un cadre existant
**Afin de** structurer le tableau blanc en zones nommées, en temps réel avec les autres participants

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given je suis OWNER ou EDITOR et que le board compte strictement moins de 2 cadres, when j'émets `frame:create {boardId, posX, posY, title?, color?, width?, height?}` via STOMP, then un `Frame` est créé avec les défauts `width=400`, `height=300`, `color="#E0E7FF"`, `title="Cadre"` (pour les champs non fournis) et l'objet complet est diffusé à toute la room (émetteur inclus) sur `/topic/board/{boardId}` en `frame:created` | ⬜ |
| Given le board compte déjà 2 cadres (`MAX_FRAMES_PER_BOARD = 2`), when j'émets `frame:create`, then aucun cadre n'est créé et rien n'est diffusé — **garde dure** appliquée serveur (`count(frames du board) >= 2` → refus silencieux, cohérent avec la convention « rien ne se passe » du POC, pas de message d'erreur STOMP dédié) | ⬜ |
| Given je crée un cadre en fournissant des valeurs explicites (`title`, `color`, `width`, `height`), when la création réussit, then les valeurs fournies écrasent les défauts et sont diffusées dans `frame:created` | ⬜ |
| Given un cadre existant d'id F, when j'émets `frame:delete {id:F, boardId}`, then le cadre est supprimé et son id brut est diffusé à toute la room en `frame:deleted` | ⬜ |
| Given un id de cadre inexistant ou déjà supprimé, when j'émets `frame:delete`, then l'opération est tolérante (pas d'exception non gérée) et aucun `frame:deleted` n'est diffusé pour un id qui n'existait pas | ⬜ |
| Given un cadre supprimé, when le board repasse sous 2 cadres, then une nouvelle création de cadre est de nouveau autorisée (la garde dure porte sur le compte courant, pas sur un compteur cumulatif) | ⬜ |
| Error : given une tentative de créer un 3ᵉ cadre (garde `MAX_FRAMES_PER_BOARD = 2`), when `frame:create` est reçu, then refus silencieux sans exception ni broadcast (comportement attendu et documenté, pas une erreur) | ⬜ |
| Error : given un boardId inexistant ou dont l'utilisateur n'est pas membre, when un événement `frame:create`/`frame:delete` est reçu, then aucune mutation n'est effectuée (garde de rôle échoue → refus silencieux, pas de fuite d'existence de board — cohérent anti-énumération 404) | ⬜ |
| Security : tenantId et userId résolus exclusivement depuis le SecurityContext (token opaque) — jamais depuis le payload ; le board ciblé est scopé par tenant, un cadre n'est créé/supprimé que sur un board accessible à l'utilisateur (pas d'opération cross-tenant) | ⬜ |
| Security : seul `canWrite` (OWNER ou EDITOR) peut créer ou supprimer un cadre ; un VIEWER émettant `frame:create`/`frame:delete` est refusé silencieusement (aucune mutation, aucun broadcast) | ⬜ |
| Security : la garde `MAX_FRAMES_PER_BOARD = 2` est appliquée **côté serveur** (pas seulement en UI) — un appel STOMP direct hors interface ne peut pas dépasser 2 cadres par board | ⬜ |
| A11y : le cadre rendu sur le canvas porte un rôle/`aria-label` reflétant son titre (ex. « cadre : {titre} »), le bouton de suppression du cadre est focusable et activable au clavier (Enter/Espace), et la création est déclenchable au clavier sans dépendre du survol souris | ⬜ |
| Tests TI (backend) : create nominal (défauts 400×300 / #E0E7FF / "Cadre" + broadcast room entière) ; create avec valeurs explicites ; 3ᵉ create refusé silencieusement (garde MAX=2) ; re-création autorisée après suppression sous le seuil ; delete tolérant d'un id absent ; VIEWER → refus ; cross-tenant → refus | ⬜ |
| Tests Vitest (frontend) : émission `frame:create`/`frame:delete`, application optimiste puis réconciliation sur `frame:created`/`frame:deleted`, rendu du cadre avec défauts, blocage UI de création au-delà de 2 cadres (bouton disabled) cohérent avec la garde serveur | ⬜ |

## Hors périmètre

- Déplacement, redimensionnement, renommage, activation et calque d'un cadre — couverts par US08.8.2 (`frame:move`/`frame:resize`/`frame:update`/`frame:layer`)
- Verrouillage d'un cadre — le modèle `Frame` **n'a aucun champ `locked`** (§1.6), un cadre n'est jamais verrouillable ; hors scope par construction
- Regroupement automatique des cartes contenues dans un cadre (appartenance logique carte→cadre) — hors scope, le cadre est purement visuel dans le POC (aucune relation carte↔cadre en base)
- Augmentation de `MAX_FRAMES_PER_BOARD` au-delà de 2 — la constante est figée à 2 (§7), reproduite telle quelle

## Notes d'implémentation

- **Traduction de stack** : le POC Node/Prisma/Socket.io (`frame:create`/`frame:delete` sur `board.sockets.ts`, §3.7) est porté sur Spring Boot + Angular + STOMP. Realtime sur `/topic/board/{boardId}` ; garde `canWrite` = OWNER+EDITOR depuis le SecurityContext ; mutation via STOMP uniquement (pas de route REST dédiée, comme le POC).
- Backend `pivot-collaboratif-core` : entité `frame` (schéma `collaboratif`) — colonnes `board_id`, `title` (défaut `"Cadre"`), `pos_x`/`pos_y` (défaut 0), `width` (défaut `400`), `height` (défaut `300`), `color` (défaut `"#E0E7FF"`), `active` (défaut `false`), `layer` (défaut 1), `created_at`, `updated_at`. FK `board_id` → `board` avec `onDelete: Cascade`. **Aucune colonne `locked`** (§1.6).
- **Garde dure `MAX_FRAMES_PER_BOARD = 2`** (§7, constante figée) : avant l'insertion, `count` des frames du board ; si `>= 2` → return silencieux (aucun `INSERT`, aucun broadcast). Garde appliquée serveur, l'UI ne fait que refléter (bouton disabled) sans en être la seule protection.
- Constantes exactes (§7) figées côté défauts entité : `width=400`, `height=300`, `color="#E0E7FF"`, `title="Cadre"`.
- `frame:delete` : suppression tolérante d'un id absent (comportement P2025 absorbé), diffusion `frame:deleted` de l'id brut uniquement si effectif.
- Absorbe US30.1.7 (cadres de regroupement visuel) dans le Socle E08.
- i18n : clés `whiteboard.frame.*` (fr.json / en.json), dont le titre par défaut `"Cadre"` / `"Frame"`.
- Source : parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.6, §3.7, §7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08.

---
Item Type: US · Parent: F08.8 · Module: whiteboard · Phase: Socle · Size: M · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.6/§3.7/§7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: EN08.4 (modèle Card typé + contrats WebSocket) + EN08.1 (isolation WS room, canal STOMP `/topic/board/{boardId}`)
