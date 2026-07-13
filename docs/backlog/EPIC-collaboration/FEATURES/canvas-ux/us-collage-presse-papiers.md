# US08.11.3 — Collage presse-papiers (image / tableur / texte)

**En tant que** utilisateur-final
**Je veux** coller directement sur le canvas une image, un tableau tableur ou du texte depuis le presse-papiers du système d'exploitation
**Afin de** importer du contenu externe en une seule action, sans passer par un menu d'insertion

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une cellule d'une carte `TABLE` a le focus et le contenu collé est reconnu comme tabulaire (`>1` ligne **ou** `>1` colonne), when je colle (Ctrl/Cmd+V), then le contenu **remplit la grille de la carte existante** (priorité 1) — pas de nouvelle carte créée | ⬜ |
| Given le focus est dans un champ éditable **hors** cas cellule `TABLE` tabulaire, when je colle, then **rien ne se passe** (`if (inEditable) return`, priorité 2) — le collage natif du champ reste géré par le navigateur, aucune carte créée | ⬜ |
| Given le presse-papiers contient un fichier image (`item.kind==='file'`, `type` commençant par `image/`, **ou** extension `/\.(png\|jpe?g\|gif\|webp\|bmp)$/i` en repli si le fichier n'a pas de MIME, ex. copie depuis l'explorateur OS), when je colle, then une carte `IMAGE` est créée (priorité 3), redimensionnée à `min(700/naturalW, 600/naturalH, 1)` — bornée à **700 × 600** px, ratio conservé | ⬜ |
| Given le presse-papiers contient un tableau (Excel/Sheets/HTML), when je colle (priorité 4 : `text/html` avec `<table>` d'abord, sinon TSV `text/plain` contenant au moins une tabulation), then si **une seule** carte `TABLE` est sélectionnée elle est remplie, sinon une carte `TABLE` est créée dimensionnée `w = clamp(cols*120, 180, 720)`, `h = clamp(16 + rows*30, ·, 600)` | ⬜ |
| Given le presse-papiers ne contient que du texte brut (aucun cas précédent), when je colle, then une carte `TEXT` est créée avec le texte **trimé** (priorité 5, fallback) | ⬜ |
| Given un `text/plain` sans aucune tabulation, when je colle hors cellule TABLE, then il est traité comme texte simple (carte `TEXT`) et non comme un TSV (le TSV exige au moins une tabulation, sinon rejeté comme texte) | ⬜ |
| Given le collage crée ou remplit un objet, when l'objet est validé, then la mutation correspondante (`card:create` typé, ou remplissage de cellules) est émise sur `/topic/board/{boardId}` et diffusée aux autres participants, cohérente avec le contrat `card:*` d'EN08.4 | ⬜ |
| Error : given un fichier image collé illisible/corrompu (échec de décodage `naturalW/naturalH`), when le collage est tenté, then aucune carte n'est créée + toast `role="alert"` — pas de carte `IMAGE` à dimensions nulles ni de division par zéro dans le calcul de ratio | ⬜ |
| Error : given un utilisateur `VIEWER` (lecture seule), when il tente un collage créant un objet, then no-op silencieux (garde `canWrite` côté serveur — VIEWER ne peut pas muter, §3.4/§3.12) ; le collage dans un champ non éditable reste sans effet | ⬜ |
| Security : le contenu collé (texte, HTML de tableau, nom de fichier) est traité comme **donnée**, jamais interprété comme HTML/CSS/script — texte rendu via `textContent`/`fillText` jamais `innerHTML`, le `<table>` HTML est **parsé pour en extraire cellules/lignes** (pas ré-injecté), prévention XSS par collage | ⬜ |
| Security : l'image collée est portée en `data:` URL / binaire validée `image/*` — la borne 700 × 600 et le contrôle de type empêchent l'injection d'un SVG script-porteur ou d'un payload non-image déguisé ; tenantId/userId de la mutation résolus depuis le SecurityContext, jamais du payload collé | ⬜ |
| A11y : le collage est déclenché au clavier (Ctrl/Cmd+V) sans dépendre de la souris ; la carte créée reçoit le focus/sélection et est annoncée par son type (image / tableau / texte), cohérent avec la création de carte d'US08.3.2a | ⬜ |
| Tests TI : `card:create` typé émis à la création d'une carte collée (IMAGE/TABLE/TEXT) ; VIEWER collant un objet → refus silencieux (0 mutation) ; remplissage de cellules TABLE via mutation dédiée | ⬜ |
| Tests Vitest : ordre de priorité exact (§4.8) — cellule TABLE tabulaire → champ éditable no-op → image 700×600 → tableau → texte trimé ; dimensionnement image `min(700/w,600/h,1)` ; dimensions TABLE `clamp(cols*120,180,720)` / `clamp(16+rows*30,·,600)` ; TSV exigeant une tabulation ; a11y (axe-core) | ⬜ |

## Hors périmètre

- **Presse-papiers interne à l'application** (`klx_clipboard`, Ctrl+C/Ctrl+V d'objets canvas, one-shot vidé après collage) : porté par **US08.3.2a** — cette US **étend** ce mécanisme au **presse-papiers OS** (contenu externe : image/tableur/texte). Le presse-papiers interne et le presse-papiers système restent **deux canaux distincts** (le collage OS ne consomme pas `klx_clipboard`).
- Collage entre boards différents : hors scope Socle (déjà exclu par US08.3.2a).
- Aperçu OpenGraph d'un lien collé (carte `LINK` avec `meta`) : relève du comportement `LINK`/OpenGraph (US08.6.5), pas du parsing presse-papiers ici — un texte contenant une URL reste une carte `TEXT` (l'enrichissement `meta` est asynchrone et hors de cette US).
- Collage multi-fichiers / dossier entier : hors scope — un collage traite le contenu prioritaire unique selon l'ordre §4.8.

## Notes d'implémentation

- **Ordre de priorité exact (§4.8)** : (1) cellule `TABLE` focalisée + contenu tabulaire → remplit la grille existante ; (2) focus champ éditable → `return` (rien) ; (3) fichier image → carte `IMAGE` bornée `MAX_W=700, MAX_H=600`, ratio `min(700/naturalW, 600/naturalH, 1)` ; (4) tableau (`text/html` `<table>` puis TSV `text/plain` à ≥1 tabulation) → remplit la carte `TABLE` sélectionnée unique sinon crée `w=clamp(cols*120,180,720)`, `h=clamp(16+rows*30,·,600)` ; (5) texte brut → carte `TEXT` trimé.
- **Détection image** : `item.kind==='file'` + `type` `image/*` **ou** repli extension `/\.(png|jpe?g|gif|webp|bmp)$/i` (couvre la copie depuis l'explorateur OS sans MIME).
- **Distinction TSV/texte** : `text/plain` n'est traité en tableau que s'il contient au moins une tabulation, sinon fallback carte `TEXT`.
- **Séparation des presse-papiers** : ce collage lit le presse-papiers **OS** (`ClipboardEvent`/`DataTransfer`), distinct de `klx_clipboard` (presse-papiers interne d'US08.3.2a). Les deux ne partagent pas d'état.
- **Stack** : composant `pivot-collaboratif-ui` (gestionnaire de collage du canvas d'US08.3.2a). Chaque objet créé émet une mutation `card:create` typée (EN08.4) sur STOMP `/topic/board/{boardId}` sous garde `canWrite` (backend Spring) ; le remplissage de cellules TABLE émet la mutation dédiée à la carte. HTML de tableau **parsé** (extraction cellules), jamais ré-injecté dans le DOM.
- Dépend d'EN08.4 (modèle Card typé — types `IMAGE`/`TABLE`/`TEXT`, `card:create`) et d'US08.3.2a (canvas local, presse-papiers interne étendu ici à l'OS).

---
Item Type: US · Parent: F08.11 · Module: whiteboard · Phase: Socle · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §4.8, §7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: EN08.4 (modèle Card typé, types IMAGE/TABLE/TEXT + card:create) + US08.3.2a (canvas local, presse-papiers interne klx_clipboard étendu à l'OS)
