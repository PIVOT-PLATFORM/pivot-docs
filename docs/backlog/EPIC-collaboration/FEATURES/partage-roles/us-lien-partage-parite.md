# US08.2.6 — Lien de partage — lecture & gestion (parité)

**En tant que** utilisateur-final habilité sur un tableau (OWNER, ou EDITOR pour la lecture)
**Je veux** lire l'état du lien de partage, le générer/régénérer, en changer le rôle par défaut, et le désactiver
**Afin de** administrer complètement le lien d'invitation d'un tableau conformément au contrat de référence, sans révoquer les accès déjà accordés

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given je suis OWNER ou EDITOR d'un tableau (`canManageShares`), when j'appelle `GET /api/collaboratif/whiteboard/boards/{id}/shares`, then la réponse 200 contient `{shares, shareToken, shareLinkRole}` (liste des membres partagés + token courant du lien + rôle par défaut du lien) | ⬜ |
| Given je suis VIEWER du tableau, when j'appelle `GET /{id}/shares`, then 403 (VIEWER exclu de la gestion des partages) | ⬜ |
| Given je suis le **propriétaire** du tableau (`isBoardOwner`, EDITOR exclu), when j'appelle `POST /{id}/shares/link` avec `{role}` (`role` ∈ `{VIEWER, EDITOR}`, `default VIEWER`), then un nouveau token de lien est **régénéré et écrase** l'ancien (l'ancien token cesse immédiatement d'être valide), et le rôle par défaut du lien est fixé au `role` fourni | ⬜ |
| Given un appelant EDITOR (non propriétaire), when il appelle `POST /{id}/shares/link`, then 403 — la (re)génération du lien est réservée au propriétaire strict, contrairement à la lecture `GET /{id}/shares` ouverte à l'EDITOR | ⬜ |
| Given `POST` ou `PATCH /{id}/shares/link` avec `role = OWNER`, when le body est validé, then 400 (l'enum du lien n'accepte que `VIEWER`/`EDITOR` ; `OWNER` est rejeté par la validation de schéma elle-même — un lien ne peut jamais conférer la propriété) | ⬜ |
| Given je suis le propriétaire, when j'appelle `PATCH /{id}/shares/link` avec `{role}` (`role` ∈ `{VIEWER, EDITOR}`, requis), then **seul** `shareLinkRole` change ; le `shareToken` reste **inchangé** (les liens déjà diffusés restent valides, avec le nouveau rôle par défaut) | ⬜ |
| Given je suis le propriétaire, when j'appelle `DELETE /{id}/shares/link`, then le lien est **désactivé** (`shareToken` mis à `null`) **sans révoquer les accès déjà accordés** (les membres ayant déjà rejoint conservent leur rôle), et la réponse est **204** No Content | ⬜ |
| Given le lien a été désactivé (`shareToken = null`), when un nouvel utilisateur tente de rejoindre avec l'ancien token, then la jointure échoue (404/410 selon US08.2.2) — mais aucun membre existant n'a perdu son accès du fait du `DELETE` | ⬜ |
| Error : given un `boardId` inexistant, hors du tenant courant, ou dont l'appelant n'est pas membre, when l'une des 4 routes de cette US est appelée, then 404 (convention anti-énumération), jamais une réponse permettant de distinguer « existe mais interdit » de « n'existe pas » pour un non-membre | ⬜ |
| Error : given un `role` absent (sur `PATCH`, requis) ou hors enum, when le body est validé, then 400 avant toute écriture | ⬜ |
| Security : `tenantId` et `userId` résolus exclusivement depuis le SecurityContext (token opaque) — jamais depuis le path/query/body ; les gardes `canManageShares` (OWNER/EDITOR) et `isBoardOwner` (propriétaire strict) sont évaluées côté serveur à partir du rôle réel de l'appelant, pas d'un rôle transmis par le client | ⬜ |
| Security : le token de lien régénéré est cryptographiquement imprévisible (SecureRandom), ne contient aucun identifiant de board en clair, et n'est jamais écrit dans les logs ; la (re)génération est réservée au propriétaire strict (pas d'escalade EDITOR → génération de lien) | ⬜ |
| A11y : le panneau de gestion du lien (US08.2.3) annonce via `role="status"` les changements d'état du lien (« Lien régénéré », « Rôle du lien : éditeur/lecteur », « Lien désactivé »), et le sélecteur de rôle du lien est associé à un `<label>` explicite | ⬜ |
| Tests TI : `GET /{id}/shares` (OWNER/EDITOR → 200 `{shares, shareToken, shareLinkRole}`, VIEWER → 403, non-membre → 404) ; `POST /{id}/shares/link` (owner → 200 + token régénéré/écrasé, EDITOR → 403, `role=OWNER` → 400) ; `PATCH /{id}/shares/link` (owner → 200, token inchangé, `role` requis) ; `DELETE /{id}/shares/link` (owner → 204, token null, membres existants conservent leur accès) | ⬜ |
| Tests Vitest : affichage de l'état du lien (token présent/absent, rôle par défaut), actions régénérer/changer-rôle/désactiver, désactivation des actions de (re)génération pour un EDITOR | ⬜ |

## Hors périmètre

- Invitation nominative par email et gestion fine des membres (`POST /{id}/shares/invite`, `PATCH`/`DELETE /{id}/shares/{shareId}`) — couvertes par US08.2.5 (invitation email) et US08.2.3 (UI membres/rôles)
- Jointure via token — couverte par US08.2.2 (`POST /boards/join`)
- Multi-liens actifs simultanés avec rôles distincts — le contrat de parité gère **un** lien par board (token unique overwritable) ; le modèle riche PIVOT (voir Notes) reste un superset non exposé ici
- Transfert de propriété (attribution du rôle OWNER) — hors scope

## Notes d'implémentation

- **RÉCONCILIATION avec US08.2.1/US08.2.2 (important — ne contredit pas US08.2.1) :**
  - US08.2.1/US08.2.2 implémentent déjà le partage par lien avec un modèle **plus riche** : table `board_share_token` (`tokenHash` SHA-256, `role`, `maxUses`, `useCount`, `expiresAt`, `revokedAt`, `createdBy`) — TTL, quota d'usage, révocation individuelle.
  - **PIVOT CONSERVE ce modèle riche.** Le contrat de parité du POC (`shareToken` unique + `shareLinkRole` sur le board, token hex simple écrasable, sans TTL ni maxUses) est le **minimum** ; le design existant en est un **superset**.
  - **Mapping** du POC sur le modèle PIVOT :
    - `board.shareToken` (POC, token unique par board) ⇒ le lien « courant » est le `board_share_token` actif le plus récent (non révoqué) ; `GET /{id}/shares.shareToken` expose ce token courant (ou `null` si désactivé).
    - `board.shareLinkRole` (POC) ⇒ le `role` par défaut du lien courant ; `PATCH /{id}/shares/link` met à jour ce `role` sans régénérer le token (équivaut à `UPDATE ... SET role` sur le token actif).
    - `POST /{id}/shares/link` « régénère & écrase » (POC) ⇒ PIVOT génère un nouveau `board_share_token` et invalide le précédent (`revokedAt = now`) — l'écrasement du token unique du POC est réalisé par révocation de l'ancien + création du nouveau, ce qui **respecte** la sémantique POC (l'ancien token cesse d'être valide) tout en gardant l'historique de révocation du modèle riche.
    - `DELETE /{id}/shares/link` « `shareToken = null`, sans révoquer les accès accordés » (POC) ⇒ PIVOT révoque le token de lien actif (`revokedAt = now`, plus de token courant exposé) **sans** toucher aux lignes `board_members`/`BoardShare` déjà créées — les membres déjà joints conservent leur rôle (identique à la sémantique POC).
    - `maxUses`/`expiresAt` restent disponibles côté PIVOT (superset) ; le contrat de parité ne les impose pas mais ne les interdit pas.
  - Aucune régression sur US08.2.1 : le point à trancher « TTL par défaut » d'US08.2.1 reste ouvert ; cette US n'y touche pas.
- Backend `pivot-collaboratif-core`, module whiteboard (schéma `collaboratif`) — routes de parité §2.3 (lignes 326-329 du spec de référence) : `GET /{id}/shares`, `POST /{id}/shares/link`, `PATCH /{id}/shares/link`, `DELETE /{id}/shares/link`
- Stack : Spring Boot + STOMP ; tenant/user depuis SecurityContext ; 404 anti-énumération ; rôles OWNER/EDITOR/VIEWER ; gardes `canManageShares` (OWNER/EDITOR) vs `isBoardOwner` (propriétaire strict)
- Frontend `pivot-collaboratif-ui` : intégré au `SharePanelComponent` (US08.2.3) — lecture de l'état du lien + actions régénérer/changer-rôle/désactiver
- i18n : clés `whiteboard.share.link.*` (fr.json / en.json)

---
Item Type: US · Parent: F08.2 · Module: whiteboard · Phase: Socle · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §2.3) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: US08.2.1 (lien de partage backend, modèle `board_share_token` riche conservé et mappé), US08.2.2 (jointure via token), US08.2.3 (UI partage & rôles)
