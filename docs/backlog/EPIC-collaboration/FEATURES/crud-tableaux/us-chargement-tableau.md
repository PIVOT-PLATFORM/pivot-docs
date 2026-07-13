# US08.1.9 — Chargement d'un tableau & présence agrégée

**En tant que** utilisateur-final membre d'un tableau
**Je veux** charger un tableau complet (métadonnées + cartes et leurs valeurs de champs + mon rôle), connaître le nombre de participants connectés à chacun de mes tableaux, et disposer d'un contrat de création de tableau complet (au-delà du titre seul)
**Afin de** ouvrir un tableau en une seule requête sans sur-charger le canvas, afficher un indicateur de présence dans la liste, et créer/cloner un tableau avec toutes ses options

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given je suis membre (OWNER/EDITOR/VIEWER) d'un tableau, when j'appelle `GET /api/collaboratif/whiteboard/boards/{id}`, then la réponse contient le board (métadonnées) + ses `cards` **avec leurs valeurs de champs** (`fieldValues` par carte) + mon `role` calculé inline, et un code 200 | ⬜ |
| Given le chargement du tableau, when `GET /boards/{id}` répond, then la réponse **ne charge délibérément PAS** `frames`, `connections` ni `fields` — ces collections sont chargées séparément (état canvas via WS `board:state` et/ou appels dédiés côté client), et ce découplage est un choix de contrat, pas un oubli (parité §2.2) | ⬜ |
| Given je suis membre, when j'appelle `GET /api/collaboratif/whiteboard/boards/presence`, then la réponse est un objet `{[boardId]: count}` donnant le nombre de participants **actuellement connectés** à chaque board, obtenu par introspection des sockets de la room `board:{id}` | ⬜ |
| Given plusieurs onglets/sockets ouverts par un même utilisateur sur un board, when la présence est calculée, then le comptage est **dédupliqué par `userId`** (un utilisateur connecté via N sockets compte pour 1) | ⬜ |
| Given le sous-système temps réel n'est pas initialisé (pas de serveur de présence disponible), when `GET /boards/presence` est appelé, then la réponse est un objet vide `{}` (jamais une erreur), et le 200 est renvoyé | ⬜ |
| Given j'appelle `GET /api/collaboratif/whiteboard/boards/` (liste), when la réponse est enrichie, then chaque board porte, en plus de `role` et `isFavorite` déjà couverts par US08.1.2/US08.1.6, un champ `shareCount` (entier ≥ 0) = nombre de partages actifs (membres hors owner) du board | ⬜ |
| Given je crée un tableau via `POST /api/collaboratif/whiteboard/boards/`, when le body fournit, en plus du `name` requis (US08.1.1), les champs optionnels `maxParticipants` (entier strictement positif, nullable), `enabledActivities` (tableau de chaînes, nullable) et `coverImage` (chaîne, nullable), then ces champs sont persistés sur le board créé et renvoyés dans la réponse 201 (contrat de création complété au-delà du titre seul d'US08.1.1) | ⬜ |
| Given `POST /boards/` avec `templateId` (clone de template, US08.4.1), when le clone est exécuté, then les identifiants de cartes sont **remappés séquentiellement** (table de correspondance ancien→nouveau `cardId`) et les connexions sont **remappées ET filtrées** pour ne conserver que celles dont les deux extrémités pointent vers une carte survivante du clone | ⬜ |
| Error : given un `boardId` inexistant, hors du tenant courant, ou dont l'utilisateur n'est pas membre, when `GET /boards/{id}` est appelé, then 404 (convention anti-énumération), jamais 403 permettant de distinguer « existe mais interdit » de « n'existe pas » pour un non-membre | ⬜ |
| Error : given `maxParticipants` ≤ 0 ou non entier, ou `enabledActivities` contenant un élément non-chaîne, when `POST /boards/` est validé, then 400 (validation de schéma) avant toute écriture en base | ⬜ |
| Error : given un `templateId` fourni qui n'appartient pas à l'appelant (ou introuvable), when le clone est tenté, then 404 `Template introuvable` (ou 403 selon la convention), et aucun board partiel n'est créé (opération atomique) | ⬜ |
| Security : `tenantId` et `userId` résolus exclusivement depuis le SecurityContext (token opaque) — jamais depuis le path, la query ou le body ; `GET /boards/presence` n'expose que le comptage (`count`) et **aucune identité** de participant (pas de userId, nom ni avatar) | ⬜ |
| Security : `GET /boards/presence` ne renvoie de comptage que pour les boards dont l'utilisateur courant est membre — pas de fuite de présence sur des boards non accessibles ni cross-tenant | ⬜ |
| A11y : l'indicateur de présence par board dans la liste (US08.1.3) expose un libellé accessible `aria-label="N participant(s) connecté(s)"` (avec pluriel correct et cas `0`), et n'est pas véhiculé uniquement par une pastille de couleur | ⬜ |
| Tests TI : `GET /boards/{id}` (membre owner/editor/viewer → 200 avec `cards`+`fieldValues`+`role` et SANS frames/connections/fields ; non-membre → 404 ; cross-tenant → 404) ; `GET /boards/presence` (dédup par userId ; `{}` si temps réel non initialisé ; pas de fuite cross-board) ; `POST /boards/` (champs `maxParticipants`/`enabledActivities`/`coverImage` persistés ; clone template = remap cartes + remap/filtre connexions ; validations 400) | ⬜ |
| Tests Vitest : affichage de l'indicateur de présence par board dans la liste (0, 1, N, pluriel), consommation du contrat `GET /boards/{id}` (canvas non chargé tant que l'état WS n'est pas reçu) | ⬜ |

## Hors périmètre

- Chargement des `frames`/`connections`/`fields` dans `GET /boards/{id}` — **délibérément exclu** de cette route ; assuré séparément par l'état canvas temps réel (US08.3.x / WS `board:state`) et/ou des appels dédiés
- Identité des participants connectés (qui est présent, curseurs, avatars) — hors scope de `GET /boards/presence`, qui n'expose qu'un comptage ; la présence nominative relève de la couche temps réel/curseurs (EN08.1 / F08 présence)
- Rafraîchissement temps réel push de la présence dans la liste (WebSocket) — `GET /boards/presence` est une lecture ponctuelle (polling/at-open) ; l'abonnement live n'est pas couvert ici
- Upload serveur de `coverImage` — `coverImage` transite en chaîne sans endpoint d'upload dédié (parité §2.7) ; la contrainte de taille reste hors scope backend ici

## Notes d'implémentation

- Backend `pivot-collaboratif-core`, module whiteboard (schéma `collaboratif`) :
  - `GET /api/collaboratif/whiteboard/boards/{id}` → charge `Board` + `cards` (avec `fieldValues`) + `role` calculé inline (owner → `OWNER`, sinon rôle du share) ; **ne fait pas de fetch** sur `frames`/`connections`/`fields` (parité §2.2, ligne 319 du spec de référence)
  - `GET /api/collaboratif/whiteboard/boards/presence` → introspection de la room temps réel `board:{id}` (équivalent `io.in('board:{id}').fetchSockets()` du POC), dédup par `userId`, `{}` si le sous-système temps réel n'est pas initialisé (parité §2.2, ligne 312)
  - `GET /api/collaboratif/whiteboard/boards/` (US08.1.2) enrichi de `shareCount` par board, en plus de `role`/`isFavorite` (US08.1.2/US08.1.6) — parité §2.2, ligne 311
  - `POST /api/collaboratif/whiteboard/boards/` : schéma de création complété — `name` requis (US08.1.1) + `maxParticipants:int().positive().nullable()`, `enabledActivities:array(string()).nullable()`, `coverImage:nullable()` ; clone template (`templateId`) = remap séquentiel des `cardId` via table de correspondance puis remap/filtre des connexions vers les cartes survivantes (parité §2.2, ligne 313)
- Ces routes **complètent** les US existantes sans les contredire : US08.1.1 (création, titre) et US08.4.1 (templates/clone) sont la base ; cette US en fixe le contrat complet côté parité
- Stack : Spring Boot + STOMP ; realtime room `/topic/board/{boardId}` ; tenant/user depuis SecurityContext ; 404 anti-énumération ; rôles OWNER/EDITOR/VIEWER
- i18n : clés `whiteboard.board.presence.*` (libellé accessible du compteur, pluriel fr/en)

---
Item Type: US · Parent: F08.1 · Module: whiteboard · Phase: Socle · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §2.2) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: US08.1.1 (création tableau, base complétée), US08.1.2 (liste + enrichissement role/isFavorite), US08.1.6 (favoris), US08.4.1 (templates/clone, base complétée), EN08.1 (isolation room WS, registre de présence)
