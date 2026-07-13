# EN18.14 — Gestion des habilitations par groupe AD

**Type d'enabler** : sécurité

**Objectif technique** : conditionner l'accès aux fonctions d'administration à l'appartenance à un groupe Active Directory (AD), avec visibilité conditionnelle du menu d'administration selon les groupes de l'utilisateur.

**Justification** : l'accès aux fonctions sensibles (gestion des groupes, listes de référence) doit être gouverné par les groupes AD de l'organisation, avec un contrôle côté serveur et non un simple masquage d'interface.

**Critères de complétion** :
- [ ] L'appartenance aux groupes AD de l'utilisateur est récupérée et exploitée à l'ouverture de session.
- [ ] Le menu d'administration est affiché uniquement aux membres du groupe habilité (ex. DIVNUM-LISTE-ADMIN-OPPA).
- [ ] Les accès aux fonctions d'administration sont contrôlés côté serveur, indépendamment de l'affichage UI.

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un utilisateur membre du groupe d'administration, when il ouvre l'application, then le menu d'administration lui est visible et accessible.
- [ ] Error case: given un utilisateur non membre, when il tente d'atteindre une URL d'administration, then l'accès est refusé côté serveur (pas seulement masqué).
- [ ] Security: aucune fonction d'administration n'est atteignable sans appartenance au groupe AD requis, quelle que soit la manipulation de l'interface.

---
Item Type: Enabler · Parent: E18 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Source: Backlog OPPA (reconstitution v1–v2.1) — EN-802
Dépendances: —
