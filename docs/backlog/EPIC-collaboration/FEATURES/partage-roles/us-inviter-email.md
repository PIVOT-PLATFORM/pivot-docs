# US08.2.5 — Inviter par email + gouvernance des rôles

**En tant que** owner ou éditeur d'un tableau
**Je veux** inviter un utilisateur nommé par son email avec un rôle, et gérer les rôles des membres existants
**Afin de** donner un accès direct sans passer par un lien public, dans le respect strict d'une hiérarchie de rôles où un éditeur ne peut jamais toucher à un propriétaire

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given je suis OWNER ou EDITOR d'un tableau, when je poste `POST /api/collaboratif/whiteboard/boards/{boardId}/shares/invite` (`{ email, role ∈ {VIEWER, EDITOR, OWNER} défaut VIEWER }`), then l'utilisateur ciblé par email est ajouté comme membre avec ce rôle (upsert sur `(boardId, userId)`), réponse **201** | ⬜ |
| Given un manager EDITOR, when il invite avec `role = OWNER`, then la requête échoue en **403** ("Un éditeur ne peut pas attribuer le rôle propriétaire") | ⬜ |
| Given un manager EDITOR, when il modifie (`PATCH /shares/{shareId}`) ou révoque (`DELETE /shares/{shareId}`) un partage dont la cible est **déjà OWNER**, then la requête échoue en **403** — le refus porte sur l'état ACTUEL de la cible (un EDITOR ne peut interagir avec une ligne OWNER dans aucun sens, ni la promouvoir, ni la rétrograder, ni la révoquer) | ⬜ |
| Given un manager EDITOR, when il modifie un partage vers `role = OWNER`, then **403** (ne peut pas attribuer OWNER, cohérent avec l'invite) | ⬜ |
| Given le créateur du tableau (`Board.ownerId`, qui n'a jamais de ligne `BoardShare`), when n'importe quel appelant tente une action de gestion des partages le ciblant, then aucune route ne peut l'atteindre ni le rétrograder (aucune fonction n'écrit sur `Board.ownerId` après création) | ⬜ |
| Given un manager, when il s'invite lui-même (son propre email), then **400** ("Vous ne pouvez pas vous inviter vous-même") | ⬜ |
| Given l'email du créateur du tableau, when un manager tente de l'inviter, then **400** ("Cet utilisateur est déjà propriétaire du board") | ⬜ |
| Given un email inconnu (aucun utilisateur), when le manager invite, then **404** | ⬜ |
| Given une invitation créant un nouveau partage, when elle réussit, then une notification `BOARD_SHARED` est émise à l'invité ; given une invitation modifiant le rôle d'un partage existant (rôle différent), then `ROLE_CHANGED` ; given une ré-invitation avec le **même** rôle, then aucune notification n'est émise (upsert no-op fonctionnel) | ⬜ |
| Given un manager modifie un rôle via `PATCH /shares/{shareId}`, when la modification réussit, then une notification `ROLE_CHANGED` est émise **systématiquement** (sans comparaison avec l'ancien rôle, contrairement à l'invite) | ⬜ |
| Given un manager révoque un partage via `DELETE /shares/{shareId}`, when la révocation réussit, then une notification `ACCESS_REVOKED` est émise à l'ancien membre, réponse **204** | ⬜ |
| Given un utilisateur déjà membre EDITOR, when il rejoint via un lien public configuré en VIEWER, then son rôle reste EDITOR (rejoindre via lien ne rétrograde jamais un membre déjà présent — upsert `update:{}`) | ⬜ |
| Error : given `PATCH /shares/{shareId}` ou `DELETE /shares/{shareId}`, when la ligne `{shareId}` n'appartient pas au board `{boardId}` du chemin, then **404** — la mutation de partage est scopée par `boardId` (`where { id: shareId, boardId }`), corrigeant le défaut §6.1 du POC où seul `role` de la ligne était lu | ⬜ |
| Error : given un `boardId` (ou `shareId`) inexistant, hors tenant, ou incohérent, when un des endpoints est appelé, then 404 (convention anti-énumération) | ⬜ |
| Security : tenantId et userId (manager) résolus exclusivement depuis le SecurityContext (token opaque) — jamais depuis le path ou le body ; toutes les mutations de partage requièrent OWNER ou EDITOR (`canManageShares`), un VIEWER → 403 | ⬜ |
| Security : un manager du tableau A ne peut jamais altérer un partage du tableau B même s'il en connaît l'id de ligne — le scoping `{ id: shareId, boardId }` est vérifié avant toute lecture/écriture du rôle (garde IDOR, fix §6.1) | ⬜ |
| Security : la vérification de gouvernance (EDITOR vs OWNER) porte sur le rôle **actuel** de la ligne cible relu en base, pas sur une valeur transmise par le client | ⬜ |
| Security : l'invitation par email ne peut cibler qu'un utilisateur du **même tenant** que le tableau ; un email d'un autre tenant est traité comme inconnu → 404 (pas de partage cross-tenant, pas d'énumération d'emails inter-tenant) | ⬜ |
| A11y : le formulaire d'invitation associe le champ email à un `<label>` explicite et le select de rôle à un `<label>` ; les erreurs (self-invite, créateur, email inconnu, rôle interdit) sont annoncées via `role="alert"` ; la confirmation de révocation est un `role="dialog"` `aria-modal="true"` avec piège à focus et retour du focus au déclencheur | ⬜ |
| Tests TI : invite (OWNER/EDITOR → 201, VIEWER → 403 ; EDITOR+role=OWNER → 403 ; self-invite → 400 ; email = créateur → 400 ; email inconnu → 404 ; cross-tenant → 404) ; notifications (`BOARD_SHARED` nouveau, `ROLE_CHANGED` rôle changé, aucune si même rôle) ; PATCH (EDITOR sur cible OWNER → 403, `ROLE_CHANGED` systématique) ; DELETE (EDITOR sur cible OWNER → 403, `ACCESS_REVOKED`) ; **scoping shareId↔boardId : shareId d'un autre board → 404** ; join via lien ne rétrograde pas un EDITOR existant | ⬜ |
| Tests Vitest : formulaire d'invitation, sélection de rôle bornée (EDITOR ne peut pas choisir OWNER), affichage des erreurs (self/créateur/inconnu), confirmation avant révocation, gestion des erreurs réseau | ⬜ |

## Hors périmètre

- Invitation par email à un utilisateur **sans compte** existant (onboarding self-service) : l'invite exige un utilisateur existant du même tenant → 404 sinon (voir US30.8.4 pour l'accès invité, hors socle F08.x)
- Envoi d'un email transactionnel réel à l'invité : cette US produit une **notification** in-app (`BOARD_SHARED`/`ROLE_CHANGED`/`ACCESS_REVOKED`), le canal email sortant est hors périmètre
- Génération / révocation du lien public de partage : couverte par US08.2.1 (backend) et US08.2.3 (UI) — cette US se limite à l'invitation nominale par email et à la gouvernance des rôles
- Transfert de propriété (attribution du rôle OWNER par un OWNER) au-delà de la matrice décrite : la promotion vers OWNER par un OWNER reste possible par le contrat, mais l'UI de transfert de propriété complète est hors scope (cohérent avec US08.2.3 "hors périmètre")
- Historique/audit visible dans l'UI des invitations et révocations : les événements sont notifiés/journalisés côté backend, sans vue dédiée ici

## Notes d'implémentation

- Backend `pivot-collaboratif-core` (schéma `collaboratif`), étend **F08.2** :
  - `POST /api/collaboratif/whiteboard/boards/{boardId}/shares/invite` — `{ email(valide), role ∈ {VIEWER, EDITOR, OWNER} défaut VIEWER }` ; garde `canManageShares` (OWNER ou EDITOR) ; ordre des refus : (1) EDITOR + `role=OWNER` → 403, (2) email inconnu → 404, (3) auto-invitation → 400, (4) email = créateur → 400 ; upsert `(boardId, userId)` ; notif `BOARD_SHARED` si nouveau partage, `ROLE_CHANGED` si rôle différent d'un partage existant, rien si même rôle → 201
  - `PATCH /boards/{boardId}/shares/{shareId}` — `{ role ∈ {VIEWER, EDITOR, OWNER} }` requis ; `canManageShares` ; EDITOR ne peut ni attribuer OWNER ni modifier une cible déjà OWNER (403) ; `ROLE_CHANGED` **systématique** ; **scoping `where { id: shareId, boardId }`** (fix §6.1) → 200
  - `DELETE /boards/{boardId}/shares/{shareId}` — `canManageShares` ; EDITOR ne peut pas révoquer une cible OWNER (403) ; **scoping `where { id: shareId, boardId }`** (fix §6.1) ; notif `ACCESS_REVOKED` → 204
  - `POST /boards/join` (`{ token }`) : si `ownerId === userId` → renvoie OWNER sans upsert ; sinon `upsert(create.role = board.shareLinkRole, update:{})` — ne rétrograde/promeut jamais un membre déjà présent
  - Modèle : `BoardShare { id, boardId, userId, role ∈ {VIEWER, EDITOR, OWNER}, createdAt }`, contrainte `@@unique(boardId, userId)` ; enum `BoardRole` inclut `OWNER` (co-propriétaire via partage ; `Board.ownerId` reste le créateur, non rétrogradable)
  - Le créateur du board n'a **jamais** de ligne `BoardShare` : aucune route ne peut donc le cibler
  - Labels FR des corps de notification : `{ VIEWER: 'lecteur', EDITOR: 'éditeur', OWNER: 'propriétaire' }`
- **Fix de sécurité §6.1** (défaut du POC à corriger et flaguer) : `PATCH`/`DELETE /shares/{shareId}` du POC ne vérifiaient jamais `targetShare.boardId === {boardId}` — le Socle **doit** ajouter le scoping `boardId` explicite au `where` pour empêcher un manager du board A d'altérer un partage du board B. À traiter avec le label `security` (Gate 4).
- Frontend `pivot-collaboratif-ui` : formulaire d'invitation par email + gestion des rôles dans `SharePanelComponent` (US08.2.3) ; select de rôle bornant les valeurs proposées selon le rôle du manager (EDITOR n'expose jamais OWNER)
- i18n : clés `whiteboard.share.invite.*` et messages d'erreur (`whiteboard.share.error.*`) (fr.json / en.json)
- Notifications réutilisent le mécanisme de notification in-app existant (types `BOARD_SHARED` / `ROLE_CHANGED` / `ACCESS_REVOKED`)

---
Item Type: US · Parent: F08.2 · Module: whiteboard · Phase: Socle · Size: M · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §2.3, §5.5, §6.1) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: US08.2.1 (lien public de partage), US08.2.2 (jointure via token), US08.2.3 (UI partage et rôles, `SharePanelComponent`), EN08.1 (isolation WS room)
