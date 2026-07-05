# EN43.12 — Modèle de menace (threat model)

**Type d'enabler** : gouvernance · documentation

**Contexte** : Registre vivant des menaces et contre-mesures du portail, tenu à jour à chaque évolution architecturale majeure (nouvel adaptateur, nouvelle zone, nouveau flux).

**Critères de complétion** :
- [ ] Table menace → où → contre-mesure principale documentée et versionnée (vol de token, SSRF, injection, exfiltration classe C, chaîne d'approvisionnement, sur-privilège, défaillance en cascade, fuite de credential)
- [ ] Revue du modèle de menace à chaque ADR Sécurité accepté ou nouveau domaine d'adaptateur ouvert
- [ ] Traçabilité menace ↔ enabler de contre-mesure (renvoi vers EN43.1-11)

**Dépendances** : aucune (document transverse)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: gouvernance · Module: securite · Phase: phase-3
Stage: Backlog · Priority: Medium
