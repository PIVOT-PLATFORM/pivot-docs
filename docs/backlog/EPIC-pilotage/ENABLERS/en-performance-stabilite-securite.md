# EN18.18 — Performance, stabilité et sécurité (NFR transverse)

**Type d'enabler** : architecture

**Objectif technique** : garantir de façon transverse la performance, la stabilité et la sécurité de l'application (exigence non fonctionnelle applicable à l'ensemble du module).

**Justification** : au-delà des fonctionnalités, l'application doit tenir des exigences non fonctionnelles de performance, de stabilité et de sécurité ; ces propriétés transverses doivent être outillées, mesurées et vérifiées en continu.

**Critères de complétion** :
- [ ] Des objectifs mesurables de performance et de stabilité sont définis et suivis.
- [ ] Les contrôles de sécurité transverses (authentification, habilitations, protection des données) sont vérifiés.
- [ ] Les régressions de performance, de stabilité ou de sécurité sont détectables avant mise en production.

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given une charge d'utilisation représentative, when l'application est sollicitée, then les temps de réponse et la stabilité respectent les objectifs définis.
- [ ] Error case: given un incident (surcharge, dépendance en échec), when il survient, then l'application dégrade proprement sans perte de données ni faille d'accès.
- [ ] Security: les propriétés de sécurité transverses (authentification, habilitations, confidentialité des données) restent garanties sous charge et en cas d'erreur.

---
Item Type: Enabler · Parent: E18 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Source: Backlog OPPA (reconstitution v1–v2.1) — EN-1107
Dépendances: —
