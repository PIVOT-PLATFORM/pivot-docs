# EN43.8 — Observabilité + SIEM

**Type d'enabler** : gouvernance · sécurité

**Objectif technique** : Traçabilité distribuée de bout en bout (OpenTelemetry), journal d'audit de chaque accès (qui, quoi, quand, quelle donnée), corrélation SIEM et détection d'anomalies.

**Justification** : « On ne peut protéger que ce qu'on voit. » Sans traçabilité de bout en bout ni corrélation SIEM, une compromission (vol de token, exfiltration) peut rester indétectée le temps que le dommage soit fait — l'observabilité est ce qui rend les autres enablers (EN43.1-7) vérifiables en continu, pas seulement au déploiement.

**Critères de complétion** :
- [ ] Traçabilité distribuée (traces) de bout en bout entre BFF, Gateway, Mesh et modules
- [ ] Journal d'audit : qui, quoi, quand, quelle donnée — pour chaque accès
- [ ] Corrélation SIEM en place, alertes sur anomalies
- [ ] Événements du bus (EN28.4) inclus dans la traçabilité

**Dépendances** : EN28.4 (bus d'événements)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: gouvernance · Module: securite · Phase: phase-3 · Size: L
Stage: ⬜ · Priority: High
