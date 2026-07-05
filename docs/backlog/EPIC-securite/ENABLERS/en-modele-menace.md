# EN43.12 — Modèle de menace (threat model)

**Type d'enabler** : gouvernance · documentation

**Objectif technique** : Registre vivant des menaces et contre-mesures du portail, tenu à jour à chaque évolution architecturale majeure (nouvel adaptateur, nouvelle zone, nouveau flux).

**Justification** : Sans registre à jour, chaque enabler de sécurité (EN43.1-11) dérive indépendamment de la menace qu'il est censé couvrir — le modèle de menace est ce qui garde la topologie de sécurité alignée sur les risques réels plutôt que sur des contrôles génériques.

**Critères de complétion** :
- [ ] Table menace → où → contre-mesure principale documentée et versionnée (vol de token, SSRF, injection, exfiltration classe C, chaîne d'approvisionnement, sur-privilège, défaillance en cascade, fuite de credential)
- [ ] Revue du modèle de menace à chaque ADR Sécurité accepté ou nouveau domaine d'adaptateur ouvert
- [ ] Traçabilité menace ↔ enabler de contre-mesure (renvoi vers EN43.1-11)

**Dépendances** : aucune (document transverse)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: gouvernance · Module: securite · Phase: phase-3 · Size: S
Stage: Backlog · Priority: Medium
