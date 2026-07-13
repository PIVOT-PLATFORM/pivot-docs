# US08.11.6 — Raccourcis clavier & nudge (parité §4.7)

**En tant que** utilisateur-final éditant un tableau
**Je veux** une table exhaustive de raccourcis clavier conforme au POC de référence
**Afin de** manipuler rapidement le canvas (undo, copie, sélection, duplication, nudge, pan) sans la souris

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le listener clavier global (actif seulement si `!isReadonly`), when j'appuie `Ctrl/Cmd+Z` (undo), `Ctrl/Cmd+Y` ou `Ctrl/Cmd+Shift+Z` (redo), then l'action s'exécute **même si le focus est dans un champ éditable** (`<input>`/`<textarea>`) — seule exception à la règle « hors champ éditable » | ⬜ |
| Given le listener global, when j'appuie `Ctrl/Cmd+C`, then la sélection courante est copiée vers `localStorage['klx_clipboard']` (presse-papiers interne, sans exigence de focus particulier) | ⬜ |
| Given le focus **hors** d'un champ éditable, when j'appuie `Ctrl/Cmd+A`, then tout est sélectionné ; si le focus est dans un champ éditable, le raccourci est ignoré (sélection native du texte du champ préservée) | ⬜ |
| Given une sélection et le focus hors champ éditable, when j'appuie `Ctrl/Cmd+D`, then la sélection est dupliquée avec un **offset `+24, +24`** px, la copie devenant la nouvelle sélection | ⬜ |
| Given une sélection (`selectedIds.size > 0`) et le focus hors champ éditable, when j'appuie une flèche, then la sélection est déplacée (**nudge**) de **1 px** ; avec **Shift**, de **20 px** | ⬜ |
| Given une sélection et le focus hors champ éditable, when j'appuie `Delete` ou `Backspace`, then la sélection est supprimée | ⬜ |
| Given l'état courant, when j'appuie `Escape`, then l'outil repasse en `select`, la sélection est vidée et **tous les panneaux sont fermés** ; en mode « relier » `Escape` annule la source sélectionnée ou quitte le mode ; dans le popover URL `Escape` annule (et `Entrée` confirme) | ⬜ |
| Given le focus hors champ éditable, when j'appuie `v` ou `V` (sans Ctrl/Cmd), then l'outil sélection est forcé | ⬜ |
| Given le focus hors champ éditable, when je **maintiens `Espace`**, then le pan temporaire est actif tant que la touche est tenue (ignoré si un champ a le focus, reset au `blur` de la fenêtre) | ⬜ |
| Given un contenu dans le presse-papiers interne, when j'appuie `Ctrl/Cmd+V`, then le collage interne s'effectue **à la position courante de la souris** (hors listener global, comportement dédié) | ⬜ |
| Given cette US, when elle définit l'offset de duplication, then elle **supersède / raffine la valeur de la legacy US08.3.2a** : elle remplace l'offset de duplication **`+16, +16`** px d'US08.3.2a par **`+24, +24`** px conforme au spec §4.7/§7 — la valeur +16 d'US08.3.2a est superseded | ⬜ |
| Given le listener clavier, when le board est en lecture seule (`isReadonly`), then **le listener global n'est pas actif** — aucun raccourci de mutation (duplication, nudge, suppression) n'est atteignable | ⬜ |
| Error : given un raccourci de mutation (`Ctrl/Cmd+D`, flèches, `Delete`) sans sélection active, when il est déclenché, then no-op silencieux ; given `Ctrl/Cmd+V` sans contenu dans `klx_clipboard`, then no-op silencieux (pas d'exception) | ⬜ |
| Security : le contenu lu depuis `localStorage['klx_clipboard']` est désérialisé en objets typés validés (jamais évalué ni injecté dans le DOM en HTML brut) ; une clé forgée/corrompue est rejetée silencieusement, pas d'injection via le presse-papiers interne ; `userId`/`tenantId` jamais dérivés du payload collé | ⬜ |
| A11y : le canvas est focusable (`tabindex="0"`, `role="application"`), les raccourcis sont documentés dans un dialog `role="dialog"` (touche `?`) à focus trap ; les raccourcis de mutation exigent le focus hors champ éditable pour ne pas piéger la navigation clavier dans les formulaires (sauf undo/redo, exception assumée) ; aucun raccourci ne repose uniquement sur la souris | ⬜ |
| Tests TI : collage interne (`Ctrl/Cmd+V`) et duplication (`Ctrl/Cmd+D`) émettent les mutations `card:*` attendues avec l'offset serveur cohérent ; en lecture seule (`viewer`) aucune mutation n'est acceptée (403 STOMP) | ⬜ |
| Tests Vitest : undo/redo actifs en champ éditable, `Ctrl/Cmd+A`/`D`/flèches/`Delete` ignorés en champ éditable, offset duplication `+24,+24`, nudge `1px`/`20px` (Shift), `Ctrl/Cmd+V` à la position souris, `Espace` maintenu = pan (ignoré si champ focus, reset au blur), `Escape` (select + désélection + fermeture panneaux ; annulation mode relier ; annulation popover URL), `v`/`V` force select, listener inactif si `isReadonly`, a11y dialog `?` (axe-core) | ⬜ |

## Hors périmètre

- Les raccourcis d'outils de dessin hérités d'US08.3.2a (`P`/`T`/`E`/`R`, `Ctrl+G`/`Ctrl+Shift+G`) : hors périmètre de cette US de parité §4.7 (qui couvre la table de navigation/édition), non redéfinis ici.
- La logique interne de la pile undo/redo (profondeur, actions couvertes, sémantique de conflit) : portée par US08.11.5 — cette US ne câble que les raccourcis clavier vers cette logique.
- Le presse-papiers **système** (Clipboard API OS) et le collage cross-board : hors scope — `klx_clipboard` est interne à la session, one-shot (§4.8).
- La logique fine de détection de contenu au collage système (image/tableau/texte, §4.8) : portée par US08.11 « collage presse-papiers », pas par cette US.

## Notes d'implémentation

- **Listener global (§4.7)** : monté au niveau page, actif **seulement si `!isReadonly`**. Table exhaustive reprise littéralement du spec — voir AC.
- **Constantes (§4.7/§7)** : offset duplication `+24, +24` ; nudge `1 px` (sans modif.) / `20 px` (Shift). Presse-papiers interne = `localStorage['klx_clipboard']`.
- **Focus** : la plupart des raccourcis exigent le focus **hors champ éditable** ; **exception** : `Ctrl/Cmd+Z`/`Y`/`Shift+Z` (undo/redo) fonctionnent même en champ éditable (cf. US08.11.5). `Ctrl/Cmd+C` sans exigence de focus particulier.
- **Hors listener global** : `Espace` maintenu = pan temporaire (ignoré si focus champ, reset au `blur` fenêtre) ; `Ctrl/Cmd+V` = collage interne à la position souris courante ; `Escape` en mode « relier » annule la source ou quitte le mode ; `Escape` avec connexion sélectionnée désélectionne (ignoré si focus champ) ; `Entrée`/`Escape` dans le popover URL confirment/annulent.
- **Supersession de la legacy** : cette US **remplace l'offset de duplication `+16, +16` d'US08.3.2a** (valeur superseded) par `+24, +24` conforme au spec §4.7/§7. US08.3.2a encodait une valeur périmée ; cette US devient la référence Socle pour les raccourcis clavier & nudge.
- **Stack** : `pivot-collaboratif-ui` (listener page-level + canvas d'US08.3.2a). Les mutations (`card:move` nudge, duplication, suppression, collage) passent par le canal STOMP existant (US08.3.1), gardes de rôle serveur inchangées.
- Dépend d'EN08.4 (modèle Card typé), d'US08.11.5 (undo/redo cible des raccourcis) et supersède US08.3.2a (offset +16 → +24).

---
Item Type: US · Parent: F08.11 · Module: whiteboard · Phase: Socle · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §4.7, §4.8, §7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: EN08.4 (modèle Card typé) + US08.11.5 (undo/redo) + US08.3.2a (legacy supersédée : offset duplication +16 remplacé par +24 conforme §4.7)
