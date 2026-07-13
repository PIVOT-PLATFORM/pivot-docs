# EN18.16 — Anonymiser les environnements hors production

**Type d'enabler** : sécurité

**Objectif technique** : anonymiser les données des environnements hors production (RECETTE et DEV) afin qu'aucune donnée réelle identifiante n'y soit exposée.

**Justification** : les environnements RECETTE et DEV manipulent des copies de données de production ; l'anonymisation est nécessaire pour respecter la protection des données et limiter l'exposition en cas d'accès élargi à ces environnements.

**Critères de complétion** :
- [ ] Les données identifiantes des environnements RECETTE et DEV sont anonymisées.
- [ ] Le processus d'anonymisation est reproductible à chaque rafraîchissement de ces environnements.

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given l'environnement RECETTE ou DEV, when je consulte les données, then aucune donnée réelle identifiante n'est présente en clair.
- [ ] Error case: given un rafraîchissement des données depuis la production, when le processus s'exécute, then l'anonymisation est appliquée avant toute mise à disposition des données.
- [ ] Security: aucune donnée personnelle réelle n'est accessible dans les environnements hors production.

---
Item Type: Enabler · Parent: E18 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Source: Backlog OPPA (reconstitution v1–v2.1) — EN-1105
Dépendances: —
