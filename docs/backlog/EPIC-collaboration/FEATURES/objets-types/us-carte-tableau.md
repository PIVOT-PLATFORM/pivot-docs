# US08.6.6 — Tableau (TABLE) + collage tableur

**En tant que** utilisateur-final (OWNER ou EDITOR) d'un tableau blanc
**Je veux** créer des cartes tableau (type `TABLE`, grille de cellules) et coller des données depuis Excel/Google Sheets pour remplir ou créer un tableau dimensionné automatiquement
**Afin de** structurer des données tabulaires directement sur le canvas, à parité complète avec le POC PouetPouet

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un tableau où je suis OWNER/EDITOR, when j'envoie `card:create` avec `type=TABLE`, then une carte de type `TABLE` (grille de cellules sérialisée dans `content`) est créée et `card:created` (objet complet) est diffusé à toute la room `/topic/board/{boardId}` (émetteur inclus) | ⬜ |
| Given un contenu tableur collé (Excel/Sheets/HTML), when le presse-papiers est traité, then la source est détectée en **priorité `text/html`** (recherche d'un `<table>`), **puis en repli TSV** (`text/plain` contenant au moins une tabulation ; sinon rejeté comme texte simple), et les lignes/colonnes en sont extraites | ⬜ |
| Given une **unique** carte `TABLE` est sélectionnée, when je colle un contenu tabulaire reconnu (`>1` ligne ou `>1` colonne), then la grille de **cette carte existante est remplie** avec les données collées (pas de nouvelle carte créée), et `card:update` diffuse `card:updated` (objet complet) à toute la room | ⬜ |
| Given aucune carte TABLE sélectionnée (ou une sélection différente), when je colle un contenu tabulaire de `cols` colonnes × `rows` lignes, then une **nouvelle** carte `TABLE` est créée aux dimensions exactes `width = clamp(cols*120, 180, 720)` et `height = clamp(16 + rows*30, min, 600)` (§4.8) | ⬜ |
| Given une cellule d'une carte TABLE a le focus **et** le contenu collé est tabulaire (`>1` ligne ou `>1` colonne), when je colle, then la grille de la carte est remplie — ce cas est **prioritaire** (§4.8 rang 1) sur la garde « focus dans un champ éditable → no-op » (§4.8 rang 2) | ⬜ |
| Given une carte TABLE existante non verrouillée, when j'envoie `card:move`/`card:resize`/`card:update`/`card:delete`, then les gardes communes s'appliquent (garde `locked=false` dans le `WHERE` pour move/resize/update, lecture explicite de `locked` pour delete) et les broadcasts correspondants sont émis (move/resize sauf émetteur ; update/delete room entière) | ⬜ |
| Error : given un contenu collé `text/plain` **sans aucune tabulation** ni `<table>` HTML, when le presse-papiers est traité, then il n'est **pas** reconnu comme tableau et retombe sur le fallback texte (carte `TEXT` avec le texte trimé, US08.6.1) — aucune carte TABLE créée | ⬜ |
| Error : given une mutation `card:*` ciblant une carte TABLE inexistante ou d'un autre board, when elle est tentée, then 0 ligne affectée, aucun broadcast (refus silencieux, `boardId` toujours dans le `WHERE`) — pas de fuite cross-board | ⬜ |
| Security : `tenantId`, `userId` et rôle résolus exclusivement depuis le `SecurityContext` (token opaque) — jamais depuis le path/body/payload STOMP ; toute création/mutation TABLE exige `canWrite` (OWNER/EDITOR), VIEWER refusé silencieusement | ⬜ |
| Security : le contenu des cellules (issu d'un collage HTML/TSV externe) est **assaini** avant persistance et rendu (échappement HTML, pas d'exécution de balises/formules injectées via `text/html`) — le collage tableur ne doit jamais introduire de contenu actif dans le canvas | ⬜ |
| A11y : la carte TABLE rendue utilise une sémantique de tableau accessible (`role="table"`/`role="row"`/`role="cell"` ou `<table>` natif), navigable au clavier (flèches entre cellules, Entrée/F2 pour éditer une cellule), avec un `aria-label` sur la carte ; les en-têtes éventuels sont associés aux cellules | ⬜ |
| Tests TI (`pivot-collaboratif-core`) : create `type=TABLE` → carte TABLE ; move/resize/update sur TABLE verrouillée → 0 mutation ; VIEWER → refus silencieux ; assainissement du contenu de cellule collé | ⬜ |
| Tests Vitest (`pivot-collaboratif-ui`) : détection presse-papiers (priorité `text/html` `<table>` puis TSV ; `text/plain` sans tabulation → fallback texte) ; TABLE unique sélectionnée → remplissage ; sinon création dimensionnée `w=clamp(cols*120,180,720)` / `h=clamp(16+rows*30,·,600)` (cas cols petit → 180 min, cols grand → 720 max, rows grand → 600 max) ; priorité cellule TABLE focalisée vs no-op champ éditable | ⬜ |

## Hors périmètre

- Formules de calcul dans les cellules (somme, références inter-cellules) — hors Socle, non présent dans le modèle de référence
- Export du tableau vers Excel/CSV — hors Socle
- Redimensionnement colonne par colonne / fusion de cellules — hors Socle ; le dimensionnement est global (`width`/`height` de la carte selon §4.8)
- Reconnaissance d'encre → tableau (« ink-to-table ») — F30.x / IA, hors Socle et distinct du collage tableur
- Collage d'image ou de lien — US08.6.4 / US08.6.5 ; le fallback texte relève d'US08.6.1
- Types TEXT/LABEL/SHAPE/IMAGE/LINK — US08.6.1/.2/.3/.4/.5

## Notes d'implémentation

- **Backend `pivot-collaboratif-core`** : `TABLE` est une valeur de l'enum `CardType` (EN08.4). La grille (lignes × colonnes × contenu de cellules) est sérialisée dans `Card.content` (JSON applicatif). Aucune table relationnelle de cellules — cohérent avec le modèle de référence (le `TABLE` est une carte comme les autres, sa structure vit dans `content`).
- **Presse-papiers (§4.8, ordre exact)** — cette US couvre les rangs 1 et 4 de la priorité §4.8 :
  1. **(rang 1)** Cellule TABLE focalisée + contenu tabulaire (`>1` ligne ou `>1` colonne) → **remplit la grille** de la carte existante (prioritaire sur le no-op champ éditable du rang 2).
  2. **(rang 4)** Tableau (Excel/Sheets/HTML) : **priorité `text/html`** (recherche `<table>`) puis **TSV** (`text/plain` avec ≥ 1 tabulation, sinon rejeté). Si **une seule** carte TABLE sélectionnée → remplit cette carte ; sinon **crée** une carte TABLE dimensionnée.
- **Formules de dimensionnement (§4.8)** : `w = clamp(cols*120, 180, 720)`, `h = clamp(16 + rows*30, min, 600)`. Reprises telles quelles du POC (`board-canvas.tsx` / `lib/table-clipboard.ts`). La borne `min` de la hauteur suit l'implémentation de référence (plancher applicatif du `clamp`).
- **Réutilisation des contrats** : `card:create/move/resize/update/delete` d'EN08.4/US08.6.1 pour le type `TABLE`. Le remplissage d'une TABLE existante passe par `card:update` (nouveau JSON de grille dans `content`) → broadcast `card:updated` room entière.
- **Détection côté client** : parsing `text/html` (extraction du premier `<table>`) puis fallback TSV, cohérent §4.8 rang 4. Le contenu de cellule est assaini (échappement) avant d'être injecté dans `content` puis rendu.
- **Décision §6 (parité)** : mécaniques `card:*` reproduites fidèlement (refus silencieux, asymétrie de broadcast, garde verrou par `WHERE`) ; l'assainissement du contenu collé est un renforcement de sécurité explicite (le collage `text/html` externe ne doit pas introduire de contenu actif).
- i18n : clés `whiteboard.card.table.*` (fr.json / en.json).

---
Item Type: US · Parent: F08.6 · Module: whiteboard · Phase: Socle · Size: L · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.5, §3.4, §4.8, §7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08 ; type `TABLE` de l'enum `CardType` + collage tableur
Dépendances: EN08.4 (modèle Card typé, enum `CardType.TABLE` + contrats WebSocket `card:*`) + EN08.1 (isolation WS room) + US08.6.1 (contrats `card:*` mutualisés, fallback texte du presse-papiers) + US08.6.4 (ordre de priorité presse-papiers partagé, cas image)
