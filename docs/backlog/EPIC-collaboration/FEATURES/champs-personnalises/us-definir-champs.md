# US08.10.1 — Définir des champs personnalisés de board (`BoardField` CRUD)

**En tant que** utilisateur d'un tableau blanc
**Je veux** créer, modifier et supprimer des champs personnalisés nommés (avec emoji, type et options) au niveau du board
**Afin de** structurer les métadonnées attachables aux cartes (porteur, statut, échéance, catégorie…)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given je suis OWNER ou EDITOR, when je crée un champ (`boardfield:create {name, emoji?, type, options?, order?}`), then un `BoardField` est persisté (`boardId`, `name`, `emoji` nullable, `type`, `options` nullable, `order` défaut 0) et un message STOMP `boardfield:created` est diffusé à la room `/topic/board/{boardId}` | ⬜ |
| Given je crée un champ, when je fournis un `type` appartenant à l'enum `FieldType` = `{TEXT, NUMBER, DATE, SELECT}`, then le champ est créé avec ce type ; le type est **validé contre l'enum côté serveur avant persistance** | ⬜ |
| Given je crée un champ de type `SELECT`, when je fournis une liste `options` (valeurs autorisées), then les options sont persistées et servent de domaine de valeurs pour ce champ (utilisées par US08.10.2 pour renseigner une valeur) | ⬜ |
| Given un champ existant, when je le modifie (`boardfield:update {id, name, emoji?, options?}`), then `name` est réécrit (pas de patch partiel réel sur le nom) et `emoji`/`options` mis à jour ; **le `type` n'est pas modifiable** par cet event ; `boardfield:updated` est diffusé à la room | ⬜ |
| Given un champ existant, when je le supprime (`boardfield:delete {id}`), then le `BoardField` est supprimé et **toutes les `CardFieldValue` associées sont supprimées en cascade** (`onDelete: Cascade` sur `fieldId`) ; `boardfield:deleted {id}` est diffusé à la room | ⬜ |
| Given plusieurs champs, when ils sont créés/affichés, then l'ordre d'affichage respecte le champ `order` (entier), permettant un rangement déterministe des champs du board | ⬜ |
| Error : given un `type` invalide (hors `{TEXT, NUMBER, DATE, SELECT}`) à la création, when `boardfield:create` est reçu, then le serveur **valide le type contre l'enum et refuse proprement la création (aucune persistance, pas de crash du handler)** — correction du défaut §6.6 du POC (où un type invalide `as never` levait une exception Prisma non catchée) | ⬜ |
| Error : given un `boardId` inexistant ou cross-tenant, when `boardfield:create`/`update`/`delete` est reçu, then le serveur refuse silencieusement (aucune mutation, aucun broadcast) — convention « rien ne se passe » du canal temps réel (§3.12) | ⬜ |
| Security : le rôle est résolu depuis le SecurityContext / la room STOMP (`canWrite` = OWNER ou EDITOR) — un VIEWER émettant un event `boardfield:*` est refusé silencieusement ; `boardId`/`tenantId`/`userId` ne sont jamais lus du payload pour l'autorisation ; l'`id` du champ est scopé par `boardId` pour empêcher toute mutation cross-board | ⬜ |
| A11y : le formulaire de définition de champ expose des libellés `<label>` explicites pour nom, emoji, type (`<select>` natif listant les 4 types) et options (pour `SELECT`) ; les boutons créer/modifier/supprimer sont focusables (Tab, Enter/Espace) avec `aria-label` explicite ; la suppression demande une confirmation (perte des valeurs en cascade) | ⬜ |
| Tests TI : create (OWNER/EDITOR → champ + broadcast ; VIEWER → refus silencieux) pour chaque type `{TEXT, NUMBER, DATE, SELECT}` ; **type invalide → refus propre, aucune persistance, handler ne crashe pas (fix §6.6)** ; update (name réécrit, type non modifiable) ; delete → cascade `CardFieldValue` ; cross-tenant → refus silencieux | ⬜ |
| Tests Vitest : formulaire de création champ émet `boardfield:create` ; sélecteur de type limité aux 4 valeurs ; champ `options` visible seulement pour `SELECT` ; réception `boardfield:created`/`updated`/`deleted` met à jour la liste des champs ; confirmation avant suppression | ⬜ |

## Hors périmètre

- Renseigner / effacer une **valeur** de champ sur une carte (`CardFieldValue`) — couvert par US08.10.2 ; cette US ne porte que la **définition** des champs au niveau board
- Modification du **type** d'un champ existant après création — non supportée par le contrat (`boardfield:update` ne touche pas `type`), hors scope ; changer de type impose supprimer + recréer
- Validation métier de la valeur contre le type (ex. une valeur `NUMBER` doit être numérique) — la valeur est stockée en `String` (US08.10.2), la validation applicative éventuelle est hors scope de cette US
- Réordonnancement des champs par glisser-déposer — `order` est un entier posé à la création, le drag & drop de réordonnancement est hors scope
- Émission d'un événement dédié pour les `CardFieldValue` orphelines supprimées en cascade — seul `boardfield:deleted` est émis (le client purge les valeurs du champ localement à réception)

## Notes d'implémentation

- Backend `pivot-collaboratif-core` : entité `BoardField` (`id`, `boardId` FK `onDelete: Cascade`, `name`, `emoji` nullable, `type` enum `FieldType`, `options` JSON nullable, `order` défaut 0). Enum **`FieldType` = `{TEXT, NUMBER, DATE, SELECT}`** (nom exact `FieldType`, pas `BoardFieldType`, §1.10). Cascade `onDelete` sur `CardFieldValue` via `fieldId` (§1.7)
- Handlers STOMP :
  - `boardfield:create {name, emoji?, type, options?, order?}` → **valider `type ∈ FieldType` avant persistance** (correction §6.6 : le POC faisait `as never` sans validation, un type invalide levait une exception Prisma non catchée — ici on valide et on refuse proprement, sans crash) ; broadcast `boardfield:created`
  - `boardfield:update {id, name, emoji?, options?}` → `name` toujours réécrit, `type` **non modifiable** ; broadcast `boardfield:updated`
  - `boardfield:delete {id}` → cascade Prisma sur `CardFieldValue` ; broadcast `boardfield:deleted {id}` (aucun event dédié pour les valeurs orphelines, §3.9)
- Garde `canWrite` (OWNER+EDITOR) sur les 3 handlers ; refus silencieux pour VIEWER et board non résolu (§3.12)
- **Fix défaut §6.6** : à signaler explicitement dans la PR — la validation du type contre l'enum corrige le seul point du module (hors `vote:stop`) où un type invalide faisait planter le handler
- i18n : clés `whiteboard.board.field.*` (nom, emoji, type, options, créer, modifier, supprimer) — fr.json / en.json
- Source : parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.7, §1.10, §3.9, §6.6) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08

---
Item Type: US · Parent: F08.10 · Module: whiteboard · Phase: Socle · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.7, §1.10, §3.9, §6.6) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08 (fix §6.6 : validation du type de champ)
Dépendances: EN08.4 (modèle Card typé + contrats WebSocket) + EN08.1 (isolation WS room)
