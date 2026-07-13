# EN18.19 — Canaux de retours utilisateurs

**Type d'enabler** : infrastructure

**Objectif technique** : mettre en place des canaux permettant aux utilisateurs de remonter leurs retours (demandes, anomalies, suggestions) depuis l'application.

**Justification** : disposer de canaux de retours structurés est nécessaire pour capter les remontées utilisateurs, prioriser les évolutions et suivre les anomalies de manière traçable.

**Critères de complétion** :
- [ ] Un ou plusieurs canaux de retours utilisateurs sont accessibles depuis l'application.
- [ ] Les retours soumis sont enregistrés et traçables pour traitement ultérieur.

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given l'application, when un utilisateur soumet un retour via le canal prévu, then le retour est enregistré et confirmé à l'utilisateur.
- [ ] Error case: given un canal de retour temporairement indisponible, when l'utilisateur tente de soumettre un retour, then un message explicite est affiché sans perte du contenu saisi.
- [ ] Security: les retours n'exposent pas de données au-delà des habilitations de l'utilisateur et sont stockés conformément aux règles de protection des données.

---
Item Type: Enabler · Parent: E18 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: administrateur-plateforme
Source: Backlog OPPA (reconstitution v1–v2.1) — EN-1108
Dépendances: —
