# US40.1.5 — Articulation capillarité + pilotage

**En tant que** DSI
**Je veux** orchestrer la suite collaborative (terrain) et le PPM (arbitrage) selon le profil, avec des interfaces entre les deux couches
**Afin de** relier l'alimentation terrain et le pilotage plutôt que de les opposer

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given les deux couches (terrain, pilotage), when le profil est appliqué, then leurs interfaces (remontée tâches→projets, décisions→terrain) sont configurées | ⬜ |
| Given une tâche terrain, when elle est reliée à un projet, then elle remonte au portefeuille sans double saisie | ⬜ |
| Error : given une tâche terrain sans projet de rattachement valide (Application/Projet inexistant ou supprimé), when la remontée est tentée, then elle échoue explicitement (pas de remontée orpheline silencieuse) et l'utilisateur en est informé | ⬜ |
| Security/Gouvernance : la remontée tâches→projets et décisions→terrain respecte l'isolation multi-tenant (FK `public.teams.id`) et la classe de souveraineté du profil (US40.1.3) — les interfaces ne sont configurées que pour des couches dont l'hébergement est mutuellement conforme | ⬜ |
| A11y : l'écran de configuration des interfaces capillarité/pilotage est navigable au clavier et conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La définition détaillée du modèle de données Application/Projet est traitée par EN18.9, pas ici — cette US consomme ce modèle.
- Le pack spécifique « double contrainte » (agilité + traçabilité opposable pour le profil Privée sous droit public) est couvert par US40.1.6, pas par cette articulation générique.
- Pas de synchronisation temps réel bidirectionnelle exigée dans cette US — la remontée tâches→projets et décisions→terrain peut être asynchrone (batch/événementielle).

## Notes d'implémentation
- S'appuie sur le bus d'événements modules (objets pivots) déjà en place dans l'architecture pour la remontée tâches→projets et la diffusion décisions→terrain, plutôt qu'un couplage direct entre modules.
- Backend `pivot-pilotage-core` (schéma Flyway `pilotage`) + couche capillarité (suite collaborative terrain, whiteboard/session) : le mapping tâche→projet s'appuie sur EN18.9 (modèle Application→Projet).
- Concerne tous les profils (cf. frontmatter `Profils: Tous`) mais la configuration des interfaces varie selon le niveau de rigueur attendu par le profil.
- Frontend `pivot-pilotage-ui`, consomme `@pivot/ui-core` + `@pivot/design-system` pour l'écran de configuration des interfaces.

---
Item Type: US · Parent: F40.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: directeur-des-systemes-d-information
Source: PP-A05 · MoSCoW: Should · Lot: Lot 2 · Origine: Synthèse v2
Profils: Tous
Justification: Synthèse v2 §4 + Insight I5 : schéma capillarité/pilotage explicite
Dépendances: EN18.9 (modèle Application→Projet)
