# US08.11.5 — Undo / Redo (parité §4.5)

**En tant que** utilisateur-final éditant un tableau
**Je veux** annuler et rétablir mes actions avec une profondeur d'historique et un périmètre d'actions conformes au POC de référence
**Afin de** corriger mes erreurs de façon prévisible, y compris sur les actions structurantes du canvas

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une suite d'actions annulables, when l'historique dépasse `HISTORY_LIMIT = 30` entrées, then la pile est **tronquée en FIFO** (`[...stack.slice(-(30-1)), entry]`) — les entrées les plus anciennes sont retirées, jamais plus de 30 conservées | ⬜ |
| Given une entrée annulée puis une nouvelle action de l'utilisateur, when la nouvelle action est poussée dans `undoStack`, then le `redoStack` est **entièrement vidé** (toute nouvelle action invalide le redo en attente) | ⬜ |
| Given les actions **couvertes** par l'historique (§4.5), when l'une d'elles est exécutée, then elle pousse une entrée d'historique — liste exacte : `addCard`, `commitDragCard`, `commitResizeSelection`, `commitResizeCard`, `updateCard` (contenu), `deleteCard`, `recolorCard`, `recolorSelected`, `deleteSelected`, `groupSelected`, `ungroupById`, `recolorGroup`, `addConnection`, `deleteConnection`, `updateConnection`, `addFrame`, `commitDragFrame`, `commitResizeFrame`, `updateFrame` (titre), `setFrameActive`, `deleteFrame`, `resetBoard`, `setCardLayer`, `setFrameLayer`, `setLayerSelected`, `setCardPositions` (nudge/arrange), `lockCards`, `pasteCards` | ⬜ |
| Given les actions **non couvertes** (§4.5), when l'une d'elles est exécutée, then **aucune entrée d'historique n'est poussée** (`pushHistory` non appelé) — liste exacte : `createField`/`updateField`/`deleteField`, `setFieldValue`/`clearFieldValue`, tout le module vote (`startVote`/`castVote`/…), `startTimer`/`stopTimer`, `updateBoardInfo` (paramètres du board) | ⬜ |
| Given une entrée d'historique et une modification distante concurrente entre l'action et son undo, when `undo()`/`redo()` réémet l'état figé, then les **valeurs absolues figées** au moment de l'action **écrasent silencieusement** la modification distante — sémantique **dernier écrivain gagne**, aucune détection de conflit, pas d'OT ni de CRDT (chaque entrée est une closure sur des valeurs absolues, sans timestamp/version/merge) | ⬜ |
| Given une action de création (`addCard`/`addFrame`/`addConnection`/`pasteCards`) dont l'ID serveur réel diffère de l'ID optimiste local, when l'undo cible l'objet créé, then l'ID serveur est retracké via des queues FIFO dédiées (`pendingCardHistoryRef`, etc.) pour que l'undo vise le bon objet — ceci résout le problème d'**identité**, pas le conflit de contenu | ⬜ |
| Given le focus dans un `<input>`/`<textarea>`, when j'appuie `Ctrl/Cmd+Z` / `Ctrl/Cmd+Y` / `Ctrl/Cmd+Shift+Z`, then l'undo/redo **canvas ne se déclenche pas** : la combinaison est laissée au navigateur, qui exécute son undo **natif sur le texte saisi** (amendement 2026-07-21 — voir §Amendement) | ⬜ |
| Given cette US, when elle définit la profondeur d'historique, then elle **supersède / raffine la valeur de la legacy US08.3.3** : elle remplace la pile **50** opérations d'US08.3.3 par **`HISTORY_LIMIT = 30`** (troncature FIFO) conforme au spec §4.5/§7 — la valeur 50 d'US08.3.3 est superseded, ainsi que la sémantique de « snapshots » remplacée par des closures sur valeurs absolues figées (dernier écrivain gagne) | ⬜ |
| Given la pile undo/redo, when la connexion WS est perdue (mode lecture seule) ou à la déconnexion, then l'historique est réinitialisé / gelé (aucune mutation locale possible) — cohérent avec le comportement lecture seule d'US08.3.2b | ⬜ |
| Error : given un `undo()`/`redo()` déclenché alors que la pile correspondante est vide, when le raccourci ou le bouton est activé, then no-op silencieux (bouton `aria-disabled="true"`), aucune exception | ⬜ |
| Error : given une entrée d'historique ciblant un objet supprimé entre-temps (par soi ou par une action distante), when l'undo/redo s'applique, then l'opération est ignorée gracieusement pour cet objet (pas d'exception, pas de résurrection incohérente d'un objet dont le parent n'existe plus) | ⬜ |
| Security : `userId`/`tenantId` jamais lus depuis un payload undo/redo — les mutations réémises passent par les mêmes gardes de rôle/appartenance que l'action d'origine (US08.3.1) ; un `viewer` ne peut pas réémettre une mutation via undo (rejet 403 STOMP côté serveur, pas de logique d'autorisation dupliquée côté client) | ⬜ |
| A11y : boutons Undo/Redo = `<button>` natifs avec `aria-label="Annuler (Ctrl+Z)"` / `"Rétablir (Ctrl+Y)"` et `aria-disabled` quand la pile correspondante est vide ; les raccourcis fonctionnent au clavier hors champ éditable, sans dépendre du survol souris (en champ éditable, voir §Amendement) | ⬜ |
| Tests TI : réémission d'une mutation via undo par un `viewer` → 403 STOMP ; par un `editor`/`owner` → appliquée ; retracking d'ID serveur (création puis undo cible le bon objet) | ⬜ |
| Tests Vitest : troncature FIFO à 30 (pousser 31 → la plus ancienne retirée), vidage `redoStack` sur nouvelle action, appartenance de chaque action à la liste couverte / non couverte (§4.5), undo/redo actif dans un `<input>`/`<textarea>`, écrasement dernier-écrivain-gagne des valeurs figées, no-op sur pile vide, a11y `aria-disabled` (axe-core) | ⬜ |

## Hors périmètre

- Undo/redo **collaboratif** (annulation partagée, résolution de conflits sur l'historique commun) : hors scope Socle — pile strictement locale par utilisateur ; le comportement dernier-écrivain-gagne est **assumé** (pas d'OT/CRDT), conforme au POC de référence.
- Persistance de la pile entre sessions : hors scope — réinitialisée à la déconnexion.
- Historisation des actions **non couvertes** (§4.5 : champs, vote, timer, `updateBoardInfo`) : **explicitement hors périmètre** par conception, pas un manque — ces mutations ne poussent jamais d'entrée d'historique.

## Notes d'implémentation

- **Constante (§4.5/§7)** : `HISTORY_LIMIT = 30`, troncature FIFO `[...stack.slice(-(30-1)), entry]`. Toute nouvelle action pousse dans `undoStack` et **vide `redoStack`**.
- **Périmètre exact (§4.5)** : liste couverte et liste non couverte reprises littéralement du spec (voir AC). Aucun `pushHistory` sur `createField`/`updateField`/`deleteField`, `setFieldValue`/`clearFieldValue`, vote, `startTimer`/`stopTimer`, `updateBoardInfo`.
- **Sémantique de conflit** : chaque entrée est une **closure sur des valeurs absolues figées** (pas de timestamp/version/merge). `undo()`/`redo()` réémettent l'état figé tel quel → écrasent silencieusement toute modification distante (dernier écrivain gagne, pas d'OT/CRDT). Les créations retrackent l'ID serveur via queues FIFO (`pendingCardHistoryRef`, etc.) — résout l'identité, pas le conflit de contenu.
- **Raccourcis** : `Ctrl/Cmd+Z` (sans Shift) = undo ; `Ctrl/Cmd+Y` ou `Ctrl/Cmd+Shift+Z` = redo. **Ne se déclenchent pas** quand le focus est dans un `<input>`/`<textarea>` : la combinaison revient au navigateur (undo natif du texte). Même comportement que les autres raccourcis, cf. US08.11.6 — voir §Amendement pour le raisonnement.
- **Supersession de la legacy** : cette US **remplace la pile de 50 snapshots d'US08.3.3** (valeur superseded) par `HISTORY_LIMIT = 30` avec troncature FIFO conforme au spec §4.5/§7, et remplace la sémantique « snapshots » par des closures sur valeurs absolues figées (dernier écrivain gagne). US08.3.3 encodait une valeur et une mécanique périmées ; cette US devient la référence Socle de l'undo/redo.
- **Stack** : `pivot-collaboratif-ui` (`useBoard`-équivalent Angular), boutons/raccourcis câblés depuis la toolbar d'US08.3.2a. Émission réseau via le canal STOMP existant (US08.3.1/US08.3.2b), gardes de rôle serveur inchangées.
- Dépend d'EN08.4 (modèle typé Card/Frame/Connection) et supersède US08.3.3 (pile 50 → 30, snapshots → valeurs figées).

---
Item Type: US · Parent: F08.11 · Module: whiteboard · Phase: Socle · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §4.5, §7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: EN08.4 (modèle typé Card/Frame/Connection) + US08.3.3 (legacy supersédée : pile 50 opérations remplacée par HISTORY_LIMIT = 30 conforme §4.5)

---

## Amendement 2026-07-21 — `Ctrl+Z` en champ éditable

**Décision du mainteneur, en écart avec la rédaction initiale de cette US.**

La version d'origine exigeait que l'undo/redo canvas s'exécute **même** quand le focus est dans un
champ éditable. Une implémentation conforme a été livrée puis **retirée** le 2026-07-21 : pendant
une saisie dans un post-it, `Ctrl+Z` doit rester l'**undo natif du navigateur sur le texte tapé**.

**Raison.** Corriger une frappe est de très loin l'intention la plus fréquente à cet instant, et
c'est le réflexe le plus ancré. Router la combinaison vers l'historique du board revenait à retirer
silencieusement cette correction à l'utilisateur, sans aucun signal visible. L'undo du board reste
accessible dès que le focus quitte l'éditeur, ainsi que par le bouton dédié de la barre d'outils —
la fonctionnalité n'est donc jamais hors d'atteinte.

**Ce qui est implémenté** : `board-page.component.ts` sort du handler sans `preventDefault()` quand
la cible est un `<input>`/`<textarea>`/`contentEditable` — c'est précisément l'absence de
`preventDefault` qui rend l'événement au navigateur. Un test dédié verrouille ce comportement et
échouera si une évolution future se remet à router la touche vers le board.

**Une alternative reste ouverte** si le besoin se manifeste : laisser l'undo natif l'emporter tant
que la saisie n'est pas validée, puis router vers le board une fois l'édition committée. Elle
suppose un suivi d'état d'édition partagé entre `board-card` et `structured-canvas` — non retenu
faute de besoin avéré.
