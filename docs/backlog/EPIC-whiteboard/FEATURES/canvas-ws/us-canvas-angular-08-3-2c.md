# US08.3.2c — Angular : canvas whiteboard — présence des participants (curseurs)

**En tant que** utilisateur
**Je veux** voir les curseurs des autres participants en temps réel sur le canvas
**Afin de** savoir où chacun travaille et éviter les conflits d'édition

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Chaque participant connecté a un curseur visible sur le canvas | ⬜ |
| Curseur affiche `displayName` du participant + couleur unique attribuée au JOIN | ⬜ |
| Couleur attribuée côté serveur (déterministe par `userId`) — pas côté client | ⬜ |
| Overlay curseurs en SVG au-dessus du `<canvas>` (`aria-hidden="true"` — décoratif) | ⬜ |
| Événement `CURSOR_MOVE` throttlé à **50ms minimum** avant envoi STOMP | ⬜ |
| Curseur disparaît après 5s sans activité du participant (timeout local) | ⬜ |
| Participant déconnecté → curseur retiré de l'overlay immédiatement | ⬜ |
| Liste participants connectés visible dans un panneau latéral (nom + indicateur actif/inactif) | ⬜ |
| Panneau participants : `role="list"`, chaque entrée `role="listitem"`, nom en `aria-label` | ⬜ |
| Tests Vitest `WhiteboardPresenceComponent` : rendu overlay SVG · throttle · timeout inactivité | ⬜ |
| Labels présence internalisés dans `whiteboard.presence.*` (fr.json / en.json) | ⬜ |

---
Item Type: US · Parent: F08.3 · Module: whiteboard · Phase: MVP · Size: S · Priority: Medium
Stage: Backlog
Dépendances: US08.3.2b (sync STOMP), US08.5.1 (présence backend)
