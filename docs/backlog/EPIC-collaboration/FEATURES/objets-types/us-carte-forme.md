# US08.6.3 — Forme (SHAPE)

**En tant que** utilisateur-final (OWNER ou EDITOR) d'un tableau blanc
**Je veux** créer, déplacer, redimensionner, recolorer et supprimer des formes géométriques (type `SHAPE`) avec couleur de remplissage et de contour
**Afin de** structurer visuellement le canvas (zones, encadrés, diagrammes simples), à parité complète avec le POC PouetPouet

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un tableau où je suis OWNER/EDITOR, when j'envoie `card:create` avec `type=SHAPE` et `{content, posX, posY}`, then une carte de type `SHAPE` est créée avec les défauts du modèle `Card` (`width=192`, `height=128`, `color=#FFEB3B`, `layer=1`, `locked=false`) et `card:created` (objet complet) est diffusé à toute la room `/topic/board/{boardId}` (émetteur inclus) | ⬜ |
| Given une forme à créer avec des dimensions ou une couleur explicites, when le `card:create` porte `{type=SHAPE, width, height, color, layer}`, then ces valeurs sont respectées à la création (sinon défauts modèle) | ⬜ |
| Given le variant de forme (rectangle/ellipse/…) et les attributs de style de contour/remplissage, when la forme est créée ou mise à jour, then ces attributs sont portés par le `content` (structure applicative JSON, ex. `{variant, fill, stroke}`) — **aucune colonne dédiée** au variant ni enum de forme en base (cohérent avec l'absence d'enum de forme dans le modèle de référence) ; la couleur principale reste `Card.color` | ⬜ |
| Given une forme existante non verrouillée, when j'envoie `card:move {id, posX, posY}` ou `card:resize {id, width, height}`, then la mutation applique la garde `locked=false` dans le `WHERE` et diffuse `card:moved`/`card:resized` à la room **sauf l'émetteur** si au moins une ligne affectée, sinon refus silencieux | ⬜ |
| Given une forme non verrouillée, when j'envoie `card:recolor {id, color}`, then la couleur de remplissage principale (`Card.color`) est mise à jour (garde `locked=false`) et `card:recolored` diffusé à toute la room si au moins une ligne affectée | ⬜ |
| Given une forme non verrouillée, when j'envoie `card:update {id, content}` avec un nouveau JSON de style (variant/fill/stroke), then le `content` est mis à jour (garde `locked=false`) et `card:updated` (objet complet) est diffusé à **toute la room** (émetteur inclus) si au moins une ligne affectée | ⬜ |
| Given une forme, when j'envoie `card:delete {id}`, then le serveur lit `locked` explicitement (refus silencieux si verrouillée), sinon supprime (tolérant à l'absence) et diffuse `card:deleted` (id brut) à toute la room | ⬜ |
| Error : given un `card:create` avec un `type` hors enum (ex. faute de frappe sur `SHAPE`), when la carte est créée, then le champ `type` est retiré et la carte retombe sur `TEXT` — **jamais d'exception** (cohérent EN08.4) ; la forme n'est créée que si `type=SHAPE` exactement | ⬜ |
| Error : given une mutation ciblant une forme inexistante ou d'un autre board, when elle est tentée, then 0 ligne affectée, aucun broadcast (refus silencieux, `boardId` toujours dans le `WHERE`) — pas de fuite cross-board | ⬜ |
| Security : `tenantId`, `userId` et rôle résolus exclusivement depuis le `SecurityContext` (token opaque) — jamais depuis le path/body/payload STOMP | ⬜ |
| Security : toute mutation `card:*` sur une SHAPE exige `canWrite` (OWNER ou EDITOR) ; un VIEWER est refusé silencieusement (aucun broadcast, aucune erreur dédiée) | ⬜ |
| Security : le `content` JSON de style (variant/fill/stroke) est **validé/assaini côté serveur** contre un jeu de valeurs applicatives connu avant persistance — le POC de référence laisse `shape`/`arrow` en `String` libre (§6.4) ; PIVOT **corrige ce défaut** en bornant les valeurs de style acceptées (variant ∈ ensemble fini, couleurs au format hex validé), pour empêcher l'injection de contenu arbitraire dans le rendu | ⬜ |
| A11y : la forme rendue expose un `role="img"` avec un `aria-label` décrivant sa nature (« Forme : rectangle », etc.) et son texte éventuel ; le contraste contour/remplissage vs fond du canvas respecte WCAG 2.1 AA ; les poignées de redimensionnement sont atteignables au clavier et masquées si la forme est verrouillée | ⬜ |
| Tests TI (`pivot-collaboratif-core`) : create `type=SHAPE` → carte SHAPE + défauts ; type mal orthographié → TEXT ; move/resize/recolor/update sur SHAPE verrouillée → 0 mutation ; VIEWER → refus silencieux ; validation serveur d'un `content` de style hors jeu autorisé → rejet/assainissement (correctif §6.4) | ⬜ |
| Tests Vitest (`pivot-collaboratif-ui`) : rendu SHAPE (rectangle/ellipse), sélection couleur remplissage + contour, redimensionnement optimiste, distinction visuelle vs TEXT/LABEL | ⬜ |

## Hors périmètre

- Dessin à main levée (type `DRAW`) — traité par le canvas Socle existant (US08.3.2a) et distinct de SHAPE ; hors de cette US
- Connecteurs / connexions entre cartes (`connection:*`, avec `shape`/`arrow`) — F08.7 connecteurs, distinct des formes SHAPE
- Types TEXT/LABEL/IMAGE/LINK/TABLE — US08.6.1/.2/.4/.5/.6
- Bibliothèque de formes avancées (flèches complexes, schémas UML) — hors Socle, non présent dans le modèle de référence
- Verrouillage en masse, calque, groupes — F08.7/F08.8/F08.9 (contrats posés par EN08.4)

## Notes d'implémentation

- **Backend `pivot-collaboratif-core`** : `SHAPE` est une valeur de l'enum `CardType` (EN08.4) sur le modèle `Card` commun. Le **variant de forme et le style contour/remplissage** sont sérialisés dans `Card.content` (JSON applicatif), la **couleur principale** dans `Card.color`. Aucune colonne ni enum de forme dédié — cohérent avec le modèle de référence qui ne définit pas d'enum de forme (l'enum `CardType` ne distingue que `SHAPE`).
- **Réutilisation des contrats** : `card:create/move/resize/update/recolor/delete` d'EN08.4/US08.6.1, appliqués au type `SHAPE`.
- **Correctif §6.4 (décision de fix, non simple reproduction)** : le POC de référence laisse les attributs de style (`shape`/`arrow` des connexions) en `String` libre non contraint en base. Pour les formes SHAPE, PIVOT **borne le jeu de valeurs de style** (variant dans un ensemble fini, couleurs validées en hex) côté serveur avant persistance — flaggé et corrigé dans l'AC Security, pas laissé ouvert. Ceci évite l'injection de contenu arbitraire dans le rendu SVG/canvas.
- **Rendu client `pivot-collaboratif-ui`** : composant paramétré par `type=SHAPE` + variant lu dans `content` ; deux sélecteurs de couleur (remplissage `Card.color`, contour dans `content`).
- **Décision §6 (parité)** : reproduction fidèle des mécaniques `card:*` (refus silencieux, asymétrie de broadcast, garde verrou par `WHERE`) ; seul le point §6.4 fait l'objet d'un correctif explicite.
- i18n : clés `whiteboard.card.shape.*` (fr.json / en.json).

---
Item Type: US · Parent: F08.6 · Module: whiteboard · Phase: Socle · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.5, §1.10, §3.4, §6, §7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08 ; absorbe la part « forme » de US30.1.3 (formes/connecteurs/texte)
Dépendances: EN08.4 (modèle Card typé, enum `CardType.SHAPE` + contrats WebSocket `card:*`) + EN08.1 (isolation WS room) + US08.6.1 (contrats `card:*` mutualisés)
