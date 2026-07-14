# US08.6.2 — Étiquette (LABEL)

**En tant que** utilisateur-final (OWNER ou EDITOR) d'un tableau blanc
**Je veux** créer de petites étiquettes texte persistantes (type `LABEL`) sur le canvas, distinctes des pense-bêtes
**Afin de** annoter et titrer des zones du tableau avec un objet texte léger et sans fond de post-it, à parité complète avec le POC PouetPouet

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un tableau où je suis OWNER/EDITOR, when j'envoie `card:create` avec `type=LABEL` et `{content, posX, posY}`, then une carte de type `LABEL` est créée et `card:created` (objet complet) est diffusé à toute la room `/topic/whiteboard/{boardId}` (émetteur inclus) | ⬜ |
| Given aucun `width`/`height`/`color`/`layer` fourni au `card:create` LABEL, when la carte est créée, then elle porte les défauts communs du modèle `Card` (`width=192`, `height=128`, `color=#FFEB3B`, `layer=1`, `locked=false`) ; le rendu « étiquette » (texte compact sans fond de post-it) est un traitement **client** par `type=LABEL`, la donnée serveur reste le modèle `Card` commun (EN08.4) | ⬜ |
| Given une étiquette existante non verrouillée, when j'envoie `card:move {id, posX, posY}` ou `card:resize {id, width, height}`, then la mutation applique la garde `locked=false` dans le `WHERE` et diffuse `card:moved`/`card:resized` à **toute la room** (émetteur inclus — pas d'exclusion, cf. US08.6.1) si au moins une ligne affectée, sinon refus silencieux | ⬜ |
| Given une étiquette non verrouillée, when j'envoie `card:update {id, content}`, then le texte est mis à jour (garde `locked=false` dans le `WHERE`) et `card:updated` (objet complet) est diffusé à **toute la room** (émetteur inclus) si au moins une ligne affectée | ⬜ |
| Given une étiquette non verrouillée, when j'envoie `card:recolor {id, color}`, then la couleur est mise à jour (garde `locked=false`) et `card:recolored` diffusé à toute la room si au moins une ligne affectée | ⬜ |
| Given une étiquette, when j'envoie `card:delete {id}`, then le serveur lit `locked` explicitement (refus silencieux si verrouillée), sinon supprime (tolérant à l'absence) et diffuse `card:deleted` (id brut) à toute la room | ⬜ |
| Given le contenu d'une étiquette contient une URL, when elle est créée/mise à jour, then — comme pour TEXT — un enrichissement OpenGraph asynchrone est déclenché (handoff US08.6.5) uniquement si le type déclenche la détection d'URL ; le LABEL suit la même règle de détection que TEXT (regex `https?://[^\s<>"']+`) | ⬜ |
| Error : given un `card:update` sur une étiquette avec un `content` vide, when la mise à jour est appliquée, then le contenu est persisté tel quel (pas de rejet serveur — aucune contrainte de longueur min/max côté serveur, cf. §6.17) ; le rendu d'une étiquette vide reste éditable au double-clic | ⬜ |
| Error : given une mutation ciblant une étiquette inexistante ou d'un autre board, when elle est tentée, then 0 ligne affectée, aucun broadcast (refus silencieux, `boardId` toujours dans le `WHERE`) — pas de fuite cross-board | ⬜ |
| Security : `tenantId`, `userId` et rôle résolus exclusivement depuis le `SecurityContext` (token opaque) — jamais depuis le path/body/payload STOMP | ⬜ |
| Security : toute mutation `card:*` sur un LABEL exige `canWrite` (OWNER ou EDITOR) ; un VIEWER est refusé silencieusement (aucun broadcast, aucune erreur dédiée) | ⬜ |
| A11y : l'étiquette rendue est focusable au clavier, éditable via double-clic **et** Entrée/F2, avec un `aria-label` explicite (« Étiquette ») ; le texte de l'étiquette respecte un contraste WCAG 2.1 AA (≥ 4.5:1) sur le fond du canvas, la couleur n'étant jamais le seul vecteur d'information | ⬜ |
| Tests TI (`pivot-collaboratif-core`) : create `type=LABEL` → carte LABEL persistée + défauts modèle ; move/resize/update/recolor sur LABEL verrouillé → 0 mutation ; VIEWER → refus silencieux ; portée broadcast (toute mutation acceptée diffuse à la room entière, émetteur inclus) | ⬜ |
| Tests Vitest (`pivot-collaboratif-ui`) : rendu spécifique LABEL (texte compact sans fond post-it), édition inline, déplacement/redimensionnement optimistes, distinction visuelle vs TEXT | ⬜ |

## Hors périmètre

- Type TEXT (pense-bête) — US08.6.1 ; le LABEL réutilise le même contrat `card:*` mais un rendu client distinct
- Types SHAPE/IMAGE/LINK/TABLE — US08.6.3 à US08.6.6
- Aperçu OpenGraph (fetch serveur, caps) — US08.6.5 ; cette US ne fait que déclencher la détection d'URL par cohérence avec TEXT
- Verrouillage en masse (`card:lock`), calque (`card:layer`), groupes, connexions, cadres — F08.7/F08.8/F08.9 (contrats posés par EN08.4)
- Styles typographiques avancés (police, taille, gras) — hors Socle, non présents dans le modèle `Card` de référence

## Notes d'implémentation

- **Backend `pivot-collaboratif-core`** : le `LABEL` **ne nécessite aucune colonne supplémentaire** — c'est une valeur de l'enum `CardType` (EN08.4) sur le modèle `Card` commun. La sémantique « petite étiquette persistante » est portée par le **rendu client** conditionné à `type=LABEL`, pas par un schéma distinct.
- **Réutilisation des contrats** : `card:create/move/resize/update/recolor/delete` sont exactement ceux d'EN08.4/US08.6.1 ; cette US valide leur bon fonctionnement pour la valeur d'enum `LABEL` (notamment que `type=LABEL` fourni au `card:create` est bien conservé — c'est un type **valide** de l'enum, il n'est pas retiré au profit de `TEXT`).
- **Rendu client `pivot-collaboratif-ui`** : composant de carte paramétré par `type` ; pour `LABEL`, affichage texte compact sans le fond jaune post-it, redimensionnement au contenu. Le modèle de données reste identique (192×128 par défaut, la carte s'adapte visuellement).
- **Détection d'URL** : identique à TEXT (regex `https?://[^\s<>"']+`), déclenche l'enrichissement OG d'US08.6.5. Reproduit le comportement de référence (le POC applique la détection d'URL au contenu texte, indépendamment du sous-rendu).
- **Décision §6 (parité)** : reproduction fidèle — aucune contrainte serveur de longueur de contenu (§6.17), refus silencieux. **Pas d'asymétrie de portée de broadcast** (corrigé, voir US08.6.1 — le helper `broadcast()` d'EN08.4 n'exclut jamais l'émetteur).
- i18n : clés `whiteboard.card.label.*` (fr.json / en.json).

---
Item Type: US · Parent: F08.6 · Module: whiteboard · Phase: Socle · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.5, §1.10, §3.4, §7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08 (type `LABEL` de l'enum `CardType`). **AC réalignées le 2026-07-14 (Gate 1 PO Agent)** contre le contrat WebSocket réel — voir US08.6.1 pour le détail (topic `/topic/whiteboard/{boardId}`, pas d'exclusion émetteur).
Dépendances: EN08.4 (modèle Card typé, enum `CardType.LABEL` + contrats WebSocket `card:*`) + EN08.1 (isolation WS room) + US08.6.1 (contrats `card:*` mutualisés) + US08.6.5 (enrichissement OpenGraph, handoff à la détection d'URL)
