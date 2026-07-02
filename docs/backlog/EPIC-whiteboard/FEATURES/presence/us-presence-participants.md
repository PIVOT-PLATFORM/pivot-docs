# US08.5.1 — Présence des participants sur le canvas

**En tant que** utilisateur connecté à un tableau
**Je veux** voir qui est en train d'éditer le tableau en même temps que moi
**Afin de** savoir avec qui je collabore en temps réel

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| Panneau de présence affiché en haut du canvas : avatars (ou initiales) des participants connectés | ⬜ |
| À chaque JOIN/LEAVE, message PARTICIPANTS_UPDATE émis sur /topic/whiteboard/{boardId}/presence avec liste complète des connectés | ⬜ |
| Chaque participant a une couleur unique attribuée par le serveur au JOIN (parmi une palette de 12 couleurs distinctes) | ⬜ |
| La couleur du participant est cohérente entre son curseur et son avatar dans le panneau de présence | ⬜ |
| Limite d'affichage : les 5 premiers avatars sont visibles, le reste affiché en "+N" avec tooltip listant les noms | ⬜ |
| Un utilisateur rejoignant un board non vide reçoit le PARTICIPANTS_UPDATE initial avec la liste courante | ⬜ |
| Timeout de déconnexion silencieuse : participant sans heartbeat depuis 30s marqué comme déconnecté | ⬜ |
| Viewer (role: viewer) apparaît dans la liste de présence avec label "Lecteur" | ⬜ |
| Panneau de présence a aria-label="Participants en ligne" ; chaque avatar a aria-label="[displayName] — [rôle]" | ⬜ |
| Overflow "+N" a aria-label="Et [N] autres participants : [liste des noms]" | ⬜ |
| Labels "en ligne", "Lecteur", "Éditeur", tooltip noms internalisés dans whiteboard.presence.* (fr.json / en.json) | ⬜ |
| Tests TI : JOIN émis → PARTICIPANTS_UPDATE contient le nouvel user ; LEAVE émis → PARTICIPANTS_UPDATE le retire | ⬜ |
| Tests Vitest PresencePanelComponent (1 user, 5 users, overflow, déconnexion) | ⬜ |

---
Item Type: US · Parent: F08.3 · Module: whiteboard · Phase: MVP · Size: M · Priority: High
Stage: Backlog
