# US22.4.5 — Calendriers ouvrés & exceptions

**En tant que** chef de projet
**Je veux** définir des calendriers (projet, tâche, ressource) avec jours ouvrés, horaires et exceptions (fériés, fermetures)
**Afin de** planifier sur le temps réellement travaillé

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un calendrier projet, when une tâche est planifiée, then elle n'occupe que des jours/heures ouvrés | ⬜ |
| Given une exception (férié), when elle tombe dans une tâche, then la durée s'étend en conséquence | ⬜ |
| Given une ressource avec son propre calendrier, when elle est affectée, then son calendrier prime pour son travail | ⬜ |

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Rôle: chef-de-projet
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
