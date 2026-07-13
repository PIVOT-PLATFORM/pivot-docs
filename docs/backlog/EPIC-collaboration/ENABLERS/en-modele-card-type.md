# EN08.4 — Modèle `Card` typé + contrats WebSocket temps réel

**Type d'enabler** : architecture

**Objectif technique** : Remplacer le modèle d'objet canvas générique `DRAW` (US08.3.2a) par un
modèle **`Card` typé** aligné sur le tableau blanc de référence (POC PouetPouet,
`Détails tableau blanc backlog.md` §1.5), et normaliser les **contrats WebSocket** de synchronisation
des objets (`board:join`/`board:state`, `card:*`). C'est le **prérequis bloquant** de tout le
périmètre de parité objets (F08.6 objets typés, F08.7 connecteurs, F08.8 cadres, F08.9 organisation,
F08.10 champs personnalisés, F08.12 facilitation).

**Justification** : Le canvas Socle livré porte les objets via un type unique `DRAW` avec un
sous-champ (`stroke`/`shape`/`erase`/`move`/`resize`/`text`) et des attributs de style génériques
(`strokeColor`/`fillColor`/`groupId`) dans un `payload`. Ce modèle ne peut pas représenter les
cartes typées du tableau blanc de référence (pense-bêtes, images, liens à aperçu, tableaux, formes,
étiquettes), leurs comportements par type (aperçu OpenGraph sur `LINK`, cellules sur `TABLE`), ni
les champs structurés (`layer`, `locked`, `meta`, `width/height`) que les US de parité manipulent.
Poser ce modèle et ses contrats WS **une seule fois**, ici, évite que chaque US de parité
réinvente son propre schéma d'objet et garantit un contrat stable côté `pivot-collaboratif-core`
(backend) et `pivot-collaboratif-ui` (frontend).

**Modèle de données cible** (schéma `collaboratif`, source §1.5/§1.6/§1.8/§1.10) :

- Entité **`Card`** : `type` (enum `CardType`), `content` (String), `meta` (JSON nullable),
  `posX`/`posY` (défaut **0**), `width` (défaut **192**), `height` (défaut **128**), `color`
  (défaut **`#FFEB3B`**), `groupId`/`groupColor` (nullable), `locked` (défaut **false**), `layer`
  (défaut **1**), `createdAt`/`updatedAt`, FK `boardId` avec `onDelete: Cascade`.
- Enum **`CardType`** exhaustif : `TEXT · IMAGE · LINK · SHAPE · DRAW · LABEL · TABLE` (§1.10) —
  un `type` inconnu à la création est **retiré et retombe sur le défaut `TEXT`** (§3.4), jamais une
  erreur.
- `meta` (JSON) : cache OpenGraph (`title`/`description`/`image`/`siteName`), rempli en asynchrone
  après création/mise à jour (voir US08.6.5).

**Critères de complétion** :
- [ ] Table `card` créée avec tous les champs et valeurs par défaut exacts ci-dessus (dimensions
      **192 × 128**, couleur **`#FFEB3B`**, `layer` **1**, `locked` **false**)
- [ ] Enum `CardType` = `{TEXT, IMAGE, LINK, SHAPE, DRAW, LABEL, TABLE}` — persisté en base, migration
      des objets `DRAW` existants (le sous-type `text` → `TEXT`, `stroke`/`erase` → `DRAW`, `shape`
      → `SHAPE`) documentée (aucune donnée de prod concernée, Socle non encore en usage réel)
- [ ] `card:create` accepte `{content, posX, posY, color?, type?, width?, height?, layer?, clientTag?}` ;
      `type` hors enum → retiré → défaut `TEXT` (jamais d'exception) ; `clientTag` ré-attaché dans
      `card:created` mais **non persisté**
- [ ] `card:move` / `card:resize` : `updateMany({where:{id, boardId, locked:false}})` — la garde
      verrou est **dans le `where`**, `count=0` → refus silencieux, broadcast **uniquement si `count>0`**,
      room **sauf émetteur**
- [ ] `card:update` (contenu) : même garde verrou dans le `where`, broadcast `card:updated` **room
      entière** (asymétrie assumée vs move/resize, cf. §6.11 du spec — décision : reproduire)
- [ ] `card:recolor` : `updateMany(...locked:false)`, broadcast si `count>0`, room entière
- [ ] `card:delete` : lecture préalable de `locked` (garde explicite), `delete` tolérant P2025
- [ ] `card:layer` : `update` sans garde `locked` (le calque n'est pas protégé par le verrou, §4.6),
      broadcast `card:layered` room entière
- [ ] `board:join` → `board:state {cards, connections, frames, fields, role}` à l'émetteur seul ;
      rôle résolu serveur (owner/BoardShare) ; sans rôle → `board:error` (`Accès refusé` /
      `Board introuvable`) — s'appuie sur l'isolation d'EN08.1
- [ ] Broadcast : convention `io.to(room)` (émetteur inclus) vs `socket.to(room)` (sauf émetteur)
      documentée et respectée par famille d'événements
- [ ] Toute mutation `card:*` requiert la garde `canWrite` (OWNER ou EDITOR) ; VIEWER → refus
      silencieux (pas d'erreur dédiée, comportement attendu §3.12)
- [ ] Tests TI : création avec type invalide → carte `TEXT` ; move sur carte verrouillée → 0 mutation,
      pas de broadcast ; join sans rôle → `board:error`
- [ ] Tests contract WS : payload de `board:state` inclut bien `cards/connections/frames/fields/role`

**Statut** : ⬜ Backlog

---
Item Type: Enabler · Parent: E08 · Type: architecture · Module: whiteboard · Phase: Socle · Size: L
Stage: ⬜ · Priority: Critical
Dépendances: EN08.1 (isolation WS room, réutilisée), US08.3.2a (canvas local existant, modèle DRAW remplacé)
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.5/§3.1/§3.4) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
