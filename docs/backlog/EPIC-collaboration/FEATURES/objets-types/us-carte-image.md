# US08.6.4 — Image (IMAGE)

**En tant que** utilisateur-final (OWNER ou EDITOR) d'un tableau blanc
**Je veux** insérer des cartes image (type `IMAGE`) sur le canvas par collage depuis le presse-papiers ou par upload, redimensionnées automatiquement en conservant le ratio
**Afin de** enrichir le tableau avec des visuels sans dépasser une taille d'affichage raisonnable, à parité complète avec le POC PouetPouet

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un tableau où je suis OWNER/EDITOR, when je colle une image depuis le presse-papiers (`item.kind==='file'`, `type` commençant par `image/`), then une carte de type `IMAGE` est créée à la position courante et `card:created` (objet complet) est diffusé à toute la room `/topic/whiteboard/{boardId}` (émetteur inclus) | ⬜ |
| Given une image collée dont le fichier n'a pas de type MIME (ex. copie depuis l'explorateur OS), when son nom correspond à la regex `\.(png\|jpe?g\|gif\|webp\|bmp)$` (insensible à la casse), then elle est traitée comme image en repli (fallback extension) et une carte `IMAGE` est créée | ⬜ |
| Given une image insérée par upload explicite (bouton d'insertion), when l'image est sélectionnée, then elle est insérée comme carte `IMAGE` avec la même logique de dimensionnement que le collage | ⬜ |
| Given une image de dimensions naturelles `naturalW × naturalH`, when la carte IMAGE est dimensionnée, then le facteur appliqué est **exactement** `min(700/naturalW, 600/naturalH, 1)` (jamais d'agrandissement au-delà de la taille native), donnant `width = naturalW × facteur`, `height = naturalH × facteur` — le ratio est conservé et la carte tient dans **700 × 600 px** max | ⬜ |
| Given une image existante non verrouillée, when j'envoie `card:move {id, posX, posY}` ou `card:resize {id, width, height}`, then la mutation applique la garde `locked=false` dans le `WHERE` et diffuse `card:moved`/`card:resized` à **toute la room** (émetteur inclus — pas d'exclusion, cf. US08.6.1) si au moins une ligne affectée, sinon refus silencieux | ⬜ |
| Given une carte IMAGE, when j'envoie `card:delete {id}`, then le serveur lit `locked` explicitement (refus silencieux si verrouillée), sinon supprime (tolérant à l'absence) et diffuse `card:deleted` (id brut) à toute la room | ⬜ |
| Given le focus est dans un champ éditable (hors cellule TABLE tabulaire), when je colle, then **rien ne se passe** (`if (inEditable) return`) — l'insertion d'image par collage ne se déclenche pas dans un champ texte, conformément à l'ordre de priorité presse-papiers §4.8 | ⬜ |
| Error : given un fichier collé ni image (MIME hors `image/*` et extension non reconnue) ni tableur, when il est collé hors champ éditable, then il retombe sur le fallback texte (carte `TEXT` avec le texte trimé), aucune carte `IMAGE` créée | ⬜ |
| Error : given une mutation `card:*` ciblant une image inexistante ou d'un autre board, when elle est tentée, then 0 ligne affectée, aucun broadcast (refus silencieux, `boardId` toujours dans le `WHERE`) — pas de fuite cross-board | ⬜ |
| Security : `tenantId`, `userId` et rôle résolus exclusivement depuis le `SecurityContext` (token opaque) — jamais depuis le path/body/payload STOMP | ⬜ |
| Security : toute création/mutation de carte IMAGE exige `canWrite` (OWNER ou EDITOR) ; un VIEWER est refusé silencieusement | ⬜ |
| Security : le contenu image est **validé côté serveur** avant persistance (type MIME réel vérifié, taille bornée) et stocké de façon sûre (data-URL base64 assainie ou référence de blob scopée au tenant) ; aucune image ne référence une ressource externe non contrôlée, et une image d'un tenant n'est jamais accessible à un autre (isolation tenant sur le stockage) | ⬜ |
| A11y : la carte IMAGE rendue porte un `alt`/`aria-label` (nom de fichier ou légende éditable, à défaut « Image ») ; les poignées de redimensionnement sont atteignables au clavier et masquées si l'image est verrouillée ; l'insertion par upload est accessible via un `<input type="file">` labellisé, pas uniquement par glisser-déposer | ⬜ |
| Tests TI (`pivot-collaboratif-core`) : create `type=IMAGE` → carte IMAGE ; validation MIME/taille serveur ; move/resize sur image verrouillée → 0 mutation ; VIEWER → refus silencieux ; isolation tenant du stockage image | ⬜ |
| Tests Vitest (`pivot-collaboratif-ui`) : dimensionnement `min(700/w, 600/h, 1)` (cas agrandissement plafonné à 1, cas réduction largeur, cas réduction hauteur, cas image déjà ≤ 700×600 → facteur 1) ; collage image vs collage dans champ éditable (no-op) ; fallback texte si fichier non-image ; upload explicite | ⬜ |

## Hors périmètre

- Collage de tableau (Excel/Sheets) — US08.6.6 (priorité presse-papiers §4.8 : cellule TABLE ciblée et tableau HTML/TSV passent avant le fallback image uniquement selon l'ordre exact du §4.8)
- Collage de lien/URL → carte LINK — US08.6.5
- Fallback texte brut — US08.6.1 (TEXT)
- Édition d'image (recadrage, filtres, annotations sur l'image) — hors Socle
- Types TEXT/LABEL/SHAPE/LINK/TABLE — US08.6.1/.2/.3/.5/.6
- Verrouillage en masse, calque, groupes — F08.7/F08.8/F08.9 (contrats posés par EN08.4)

## Notes d'implémentation

- **Backend `pivot-collaboratif-core`** : `IMAGE` est une valeur de l'enum `CardType` (EN08.4). Le contenu image est porté par `Card.content` (data-URL base64 assainie, ou référence de blob stocké côté serveur et scopé au tenant). Les dimensions calculées côté client (`width`/`height` post-facteur) sont persistées comme pour toute carte.
- **Dimensionnement (constante §7)** : facteur **`min(700/naturalW, 600/naturalH, 1)`**, `MAX_W=700`, `MAX_H=600`, ratio conservé, **jamais d'upscale** (borne haute à 1). Calcul côté client au moment de l'insertion, avant le `card:create`.
- **Presse-papiers (§4.8, ordre exact)** : (1) cellule TABLE focalisée + contenu tabulaire → remplit la grille ; (2) focus champ éditable → no-op ; (3) **fichier image** (MIME `image/*` ou extension `\.(png|jpe?g|gif|webp|bmp)$` en repli) → carte IMAGE dimensionnée ; (4) tableau HTML/TSV → carte TABLE (US08.6.6) ; (5) fallback texte → carte TEXT. Cette US couvre le cas (3).
- **Réutilisation des contrats** : `card:create/move/resize/delete` d'EN08.4/US08.6.1, appliqués au type `IMAGE`. La recoloration (`card:recolor`) n'a pas de sens métier sur une image mais reste tolérée par le contrat commun (pas de rejet dédié — parité).
- **Sécurité (renforcement)** : le POC de référence stocke le `coverImage` en data-URL base64 sans validation serveur forte (§2.7/§6.12). Pour les cartes IMAGE, PIVOT **valide le MIME réel et borne la taille côté serveur** et isole le stockage par tenant — flaggé dans l'AC Security.
- **Décision §6 (parité)** : mécaniques `card:*` reproduites fidèlement (refus silencieux) ; la validation image serveur est un renforcement explicite. **Pas d'asymétrie de portée de broadcast** (corrigé, voir US08.6.1).
- i18n : clés `whiteboard.card.image.*` (fr.json / en.json).

---
Item Type: US · Parent: F08.6 · Module: whiteboard · Phase: Socle · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.5, §3.4, §4.8, §7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08 ; absorbe US30.1.5 (insertion d'images et fichiers). **AC réalignées le 2026-07-14 (Gate 1 PO Agent)** contre le contrat WebSocket réel — voir US08.6.1 (topic `/topic/whiteboard/{boardId}`, pas d'exclusion émetteur).
Dépendances: EN08.4 (modèle Card typé, enum `CardType.IMAGE` + contrats WebSocket `card:*`) + EN08.1 (isolation WS room) + US08.6.1 (contrats `card:*` mutualisés)
