# US08.10.2 — Renseigner / effacer une valeur de champ sur une carte (`CardFieldValue`)

**En tant que** utilisateur d'un tableau blanc
**Je veux** renseigner ou effacer la valeur d'un champ personnalisé sur une carte donnée
**Afin de** qualifier chaque carte avec les métadonnées définies au niveau du board (porteur, statut, échéance…)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given je suis OWNER ou EDITOR, when je renseigne une valeur (`cardfield:set {cardId, fieldId, value}`), then une `CardFieldValue` est **créée ou mise à jour (upsert) sur la clé composite `(cardId, fieldId)`** et un message STOMP `cardfield:set` est diffusé à la room `/topic/board/{boardId}` | ⬜ |
| Given une carte porte déjà une valeur pour un champ, when je renseigne une nouvelle valeur pour ce même `(cardId, fieldId)`, then la valeur existante est **remplacée** (upsert, pas de doublon) grâce à la contrainte unique `(cardId, fieldId)` (§1.7) | ⬜ |
| Given une carte porte une valeur pour un champ, when j'efface cette valeur (`cardfield:clear {cardId, fieldId}`), then la `CardFieldValue` correspondante est supprimée (`deleteMany`, sans check de `count`) et `cardfield:cleared` est diffusé **inconditionnellement** à la room | ⬜ |
| Given une valeur est renseignée pour un champ de type `SELECT`, when la valeur est posée, then elle est stockée telle quelle en `String` (le `value` est toujours une `String`, quel que soit le `FieldType` du champ) | ⬜ |
| Error : given la carte **ou** le champ a été supprimé entre-temps par un autre participant, when `cardfield:set` est reçu (violation de FK P2003), then l'erreur est **tolérée silencieusement (`ignoreMissing`)** — aucune exception remontée, l'upsert est simplement abandonné (§3.9) | ⬜ |
| Error : given la valeur n'existe pas (déjà effacée), when `cardfield:clear` est reçu, then l'opération est un no-op silencieux (`deleteMany` sans effet) et le broadcast `cardfield:cleared` est quand même émis inconditionnellement (§3.9) | ⬜ |
| Error : given un `boardId` inexistant ou cross-tenant, when `cardfield:set` / `cardfield:clear` est reçu, then le serveur refuse silencieusement (aucune mutation, aucun broadcast) — convention « rien ne se passe » du canal temps réel (§3.12) | ⬜ |
| Security : le rôle est résolu depuis le SecurityContext / la room STOMP (`canWrite` = OWNER ou EDITOR) — un VIEWER émettant `cardfield:set` / `cardfield:clear` est refusé silencieusement ; `boardId`/`tenantId`/`userId` ne sont jamais lus du payload pour l'autorisation ; `cardId`/`fieldId` scopés par `boardId` pour empêcher toute écriture cross-board | ⬜ |
| A11y : le contrôle de saisie de valeur expose un `<label>` explicite associé au champ (nom + emoji du `BoardField`) ; pour un champ `SELECT`, un `<select>` natif listant les `options` définies ; le bouton « effacer la valeur » est focusable (Tab, Enter/Espace) avec `aria-label` explicite incluant le nom du champ | ⬜ |
| Tests TI : set upsert sur `(cardId, fieldId)` (OWNER/EDITOR → valeur posée + broadcast ; re-set → remplacement sans doublon ; VIEWER → refus silencieux) ; **set avec carte/champ supprimé entre-temps → P2003 toléré, pas d'exception** ; clear (suppression + broadcast inconditionnel ; valeur absente → no-op + broadcast) ; cross-tenant → refus silencieux | ⬜ |
| Tests Vitest : saisie d'une valeur émet `cardfield:set` ; effacement émet `cardfield:clear` ; réception `cardfield:set`/`cardfield:cleared` met à jour l'affichage des métadonnées de la carte ; suppression distante d'un champ purge les valeurs affichées localement (via `boardfield:deleted`, US08.10.1) | ⬜ |

## Hors périmètre

- Définition des champs eux-mêmes (`BoardField` CRUD, type, options, order) — couvert par US08.10.1 ; cette US ne porte que la pose/effacement d'une **valeur** sur une carte
- Validation de la valeur contre le type du champ (ex. rejet d'une valeur non numérique pour un champ `NUMBER`) — la valeur est stockée en `String` sans validation de type côté serveur, hors scope
- Historique / audit des changements de valeur — pas de journal des valeurs, seule la valeur courante est persistée
- Undo/redo de la pose ou de l'effacement d'une valeur — les valeurs de champs ne sont **pas** couvertes par l'historique undo/redo (§4.5, §6.2) ; comportement du POC reproduit
- Émission d'un événement lors de la purge en cascade d'une valeur suite à la suppression du champ — géré côté US08.10.1 (`boardfield:deleted`), pas ici

## Notes d'implémentation

- Backend `pivot-collaboratif-core` : entité `CardFieldValue` (`id`, `cardId` FK `onDelete: Cascade`, `fieldId` FK `onDelete: Cascade`, `value` `String`), contrainte **`@@unique([cardId, fieldId])`** (§1.7). Le type Prisma exact du champ parent est `FieldType` (pas `BoardFieldType`)
- Handlers STOMP :
  - `cardfield:set {cardId, fieldId, value}` → **upsert** sur clé composite `(cardId, fieldId)` ; **tolère explicitement P2003** (violation de FK, ex. carte/champ supprimé entre-temps) via `ignoreMissing` — aucune exception remontée (§3.9) ; broadcast `cardfield:set`
  - `cardfield:clear {cardId, fieldId}` → `deleteMany` (pas de check de `count`) ; broadcast `cardfield:cleared` **inconditionnel** (§3.9)
- Garde `canWrite` (OWNER+EDITOR) sur les deux handlers ; refus silencieux pour VIEWER et board non résolu (§3.12)
- `value` est toujours une `String` en base, indépendamment du `FieldType` du champ (pas de typage fort de la valeur côté persistance)
- i18n : clés `whiteboard.board.fieldvalue.*` (renseigner, effacer) — fr.json / en.json
- Source : parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.7, §3.9) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08

---
Item Type: US · Parent: F08.10 · Module: whiteboard · Phase: Socle · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.7, §3.9) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: EN08.4 (modèle Card typé + contrats WebSocket) + EN08.1 (isolation WS room) + US08.10.1 (définition des champs `BoardField`)
