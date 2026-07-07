# US08.3.3 — Undo / Redo sur le canvas

**En tant que** utilisateur éditant un tableau
**Je veux** pouvoir annuler et rétablir mes actions sur le canvas
**Afin de** corriger mes erreurs sans perdre mon travail

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Ctrl+Z annule la dernière action de l'utilisateur courant (undo local — n'annule pas les actions des autres participants) | ⬜ |
| Ctrl+Y ou Ctrl+Shift+Z rétablit l'action annulée | ⬜ |
| Stack undo : côté client uniquement (Socle). Chaque participant gère sa propre stack — stratégie collaborative (undo partagé) hors scope Socle | ⬜ |
| Stack undo limitée à 50 opérations par session (au-delà, les plus anciennes sont retirées) | ⬜ |
| Message STOMP UNDO { userId, eventId } diffusé à tous les participants pour synchronisation visuelle | ⬜ |
| Stack undo réinitialisée à la déconnexion (pas de persistance entre sessions) | ⬜ |
| Boutons Undo/Redo dans la toolbar : <button aria-label="Annuler (Ctrl+Z)" aria-disabled="true" si stack vide> | ⬜ |
| Boutons désactivés (aria-disabled="true") quand stack vide (undo) ou stack redo vide (redo) | ⬜ |
| Viewer (role: viewer) ne peut pas envoyer de UNDO (backend rejette avec 403 STOMP ERROR) | ⬜ |
| Connexion WS perdue (mode lecture seule, cf. US08.3.2b) → Ctrl+Z/Ctrl+Y et boutons toolbar désactivés (`aria-disabled="true"`), aucune opération locale possible tant que la reconnexion n'a pas abouti | ⬜ |
| Tests Vitest UndoRedoService (push, undo, redo, limit 50, reset on disconnect) | ⬜ |
| Labels et raccourcis internalisés dans whiteboard.canvas.undo.* (fr.json / en.json) | ⬜ |

## Hors périmètre

- Undo/redo collaboratif (annulation partagée entre participants, résolution de conflits sur
  l'historique commun) : explicitement hors scope Socle — portée strictement locale/par
  utilisateur retenue pour cette phase (voir AC stack ci-dessus). Ce choix pourra être revisité en
  phase-3 si le besoin produit émerge.
- Persistance de la stack undo entre sessions (reprise après rechargement de page) : hors scope,
  la stack est réinitialisée à la déconnexion.
- Undo/redo "global board" (rejouer/annuler les actions d'un autre participant) : hors scope.

## Notes d'implémentation

- **Service** : `UndoRedoService` (Angular, `pivot-collaboratif-ui`), boutons/raccourcis câblés
  depuis la toolbar de US08.3.2a.
- **Modèle d'événements WebSocket (contrat partagé F08.3, cf. US08.3.1/US08.3.2b)** : `UNDO
  { userId, eventId }` publié sur `/app/whiteboard/{boardId}/action` et diffusé sur
  `/topic/whiteboard/{boardId}` — un message par action annulée (même granularité que `DRAW`), pas
  de rejeu de plusieurs actions en un seul message.
- Le rejet backend (403, rôle viewer) est un cas déjà couvert par la vérification d'appartenance
  générique de US08.3.1 — pas de logique d'autorisation dupliquée côté client.
- Dépend de US08.3.1 (message `UNDO`, whitelist des types), US08.3.2a (boutons toolbar) et
  US08.3.2b (service de synchronisation STOMP, état lecture seule).

---
Item Type: US · Parent: F08.3 · Module: whiteboard · Phase: Socle · Size: M · Priority: High
Stage: Ready
Dépendances: US08.3.1 (message UNDO), US08.3.2a (toolbar boutons), US08.3.2b (service de synchronisation STOMP)
Note post-implémentation US08.3.2a (2026-07-07) : `pivot-collaboratif-ui` PR
[#24](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/24) a déjà créé
`UndoRedoService` avec pile de 50 snapshots et signals — couvre vraisemblablement AC1-4/6-8/11-12
(mécanique locale, boutons, limite, i18n) mais **pas** AC5/9/10 (diffusion STOMP du message UNDO,
rejet viewer câblé côté client, état lecture seule sur perte de connexion) qui dépendent de
US08.3.2b, non démarrée. Ne pas recréer le service — étendre l'existant. Stage laissé à `Ready`
(non Review) tant que ces trois AC réseau ne sont pas couvertes. Issue de suivi :
`pivot-collaboratif-ui#28`.
