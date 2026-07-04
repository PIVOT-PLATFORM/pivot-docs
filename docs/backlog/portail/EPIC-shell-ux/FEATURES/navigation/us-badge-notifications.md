# US16.1.3 — Badge notifications dans la navigation

**En tant que** utilisateur
**Je veux** voir un badge dans la navigation indiquant le nombre de notifications non lues
**Afin de** savoir rapidement si j'ai des alertes en attente

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| Badge numérique sur l'icône cloche dans la navbar | ⬜ |
| GET /api/notifications/unread-count retourne le nombre | ⬜ |
| Badge masqué si 0 notifications | ⬜ |
| Mise à jour en temps réel via WebSocket ou polling 30s | ⬜ |
| Badge accessible (aria-label "X notifications non lues") | ⬜ |
| BLOQUÉ : dépend de EN-notifications (enabler infrastructure notifications in-app — à créer). US non implémentable avant création de cet enabler | ⬜ |
| Quand le nombre dépasse 99, le badge affiche "99+" et aria-label indique le nombre exact ("127 notifications non lues") | ⬜ |
| Les mises à jour du badge sont annoncées via aria-live="polite" sur une région hors-écran dédiée — pas sur le badge lui-même (évite les annonces répétées) | ⬜ |
| Si GET /api/notifications/unread-count échoue, le badge n'est pas affiché. Réessai automatique avec backoff exponentiel (max 3 tentatives) | ⬜ |
| Le aria-label du badge est internalisé ("X notifications non lues" / "X unread notifications") | ⬜ |

---
Item Type: US · Parent: F16.1 · Module: core · Phase: MVP · Size: S · Priority: Medium
Stage: Backlog
