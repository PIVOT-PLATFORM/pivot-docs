# EN25.2 — Guard Angular du module achats-contrats

**Type d'enabler** : sécurité

**Objectif technique** : Mettre en place un guard Angular dédié au module achats-contrats, associé à un moduleId propre, contrôlant l'accès au module et à ses onglets (Demandes d'achats, Contrats, Administration, Power BI) selon le rôle et le rattachement de l'utilisateur.

**Justification** : Le module comporte des onglets à visibilité restreinte (Administration réservé à l'administrateur, Power BI exclu pour le prescripteur et les externes). Un guard centralisé évite tout accès par URL directe et garantit l'application homogène de la matrice P/V/CM/A.

**Critères de complétion** :
- [ ] moduleId dédié `achats-contrats` déclaré et routé.
- [ ] Guard bloquant l'accès au module pour les utilisateurs non habilités et redirigeant proprement.
- [ ] Contrôle de visibilité/accès par onglet aligné sur la matrice P/V/CM/A.
- [ ] Tests unitaires du guard couvrant les cas autorisé/refusé pour chaque rôle.

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un utilisateur habilité, when il navigue vers le module achats-contrats, then le guard autorise l'accès et le routage aboutit.
- [ ] Error case: given un utilisateur non administrateur ciblant l'onglet Administration via une URL directe, when le guard s'exécute, then l'accès est refusé et l'utilisateur est redirigé.
- [ ] Security: le guard applique la matrice P/V/CM/A (Administration = A seul ; Power BI exclut le prescripteur et les externes) côté navigation.

---
Item Type: Enabler · Parent: E25 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Source: SPEC_OPDN — module Achats/Contrats (WRAP/OPDN)
Dépendances: —
