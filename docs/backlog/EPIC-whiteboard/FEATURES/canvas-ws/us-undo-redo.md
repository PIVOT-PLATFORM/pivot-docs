# US08.3.3 — Undo / Redo sur le canvas

**En tant que** utilisateur éditant un tableau
**Je veux** pouvoir annuler et rétablir mes actions sur le canvas
**Afin de** corriger mes erreurs sans perdre mon travail

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| Ctrl+Z annule la dernière action de l'utilisateur courant (undo local — n'annule pas les actions des autres participants) | ⬜ | ⬜ |
| Ctrl+Y ou Ctrl+Shift+Z rétablit l'action annulée | ⬜ | ⬜ |
| Stack undo : côté client uniquement (MVP). Chaque participant gère sa propre stack — stratégie collaborative (undo partagé) hors scope MVP | ⬜ | ⬜ |
| Stack undo limitée à 50 opérations par session (au-delà, les plus anciennes sont retirées) | ⬜ | ⬜ |
| Message STOMP UNDO { userId, eventId } diffusé à tous les participants pour synchronisation visuelle | ⬜ | ⬜ |
| Stack undo réinitialisée à la déconnexion (pas de persistance entre sessions) | ⬜ | ⬜ |
| Boutons Undo/Redo dans la toolbar : <button aria-label="Annuler (Ctrl+Z)" aria-disabled="true" si stack vide> | ⬜ | ⬜ |
| Boutons désactivés (aria-disabled="true") quand stack vide (undo) ou stack redo vide (redo) | ⬜ | ⬜ |
| Viewer (role: viewer) ne peut pas envoyer de UNDO (backend rejette avec 403 STOMP ERROR) | ⬜ | ⬜ |
| Tests Vitest UndoRedoService (push, undo, redo, limit 50, reset on disconnect) | ⬜ | ⬜ |
| Labels et raccourcis internalisés dans whiteboard.canvas.undo.* (fr.json / en.json) | ⬜ | ⬜ |

---
Item Type: US · Parent: F08.3 · Module: whiteboard · Phase: MVP · Size: M · Priority: High
Human Gate: needs-human-valid · Stage: Backlog
