# EN18.17 — Optimiser le lancement de l'application

**Type d'enabler** : infrastructure

**Objectif technique** : réduire les demandes de connexions au démarrage et accélérer le temps de lancement de l'application.

**Justification** : le démarrage actuel multiplie les demandes de connexions et ralentit l'accès à l'application, dégradant l'expérience utilisateur ; il faut réduire ces sollicitations et raccourcir le temps de mise à disposition.

**Critères de complétion** :
- [ ] Le nombre de demandes de connexions au lancement est réduit.
- [ ] Le temps de démarrage de l'application est mesurablement diminué par rapport à l'état initial.

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un lancement de l'application, when elle s'initialise, then le nombre de demandes de connexions est réduit par rapport à la situation de référence.
- [ ] Error case: given une ressource de démarrage temporairement indisponible, when l'application se lance, then elle dégrade proprement sans multiplier les tentatives de connexion.
- [ ] Security: la réduction des connexions ne contourne aucune étape d'authentification ni de contrôle d'accès.

---
Item Type: Enabler · Parent: E18 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: administrateur-plateforme
Source: Backlog OPPA (reconstitution v1–v2.1) — EN-1106
Dépendances: —
