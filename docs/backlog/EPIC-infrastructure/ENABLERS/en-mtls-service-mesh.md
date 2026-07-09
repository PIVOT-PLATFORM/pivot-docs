# EN07.11 — mTLS interne & intégration Service Mesh

**Type d'enabler** : infrastructure · sécurité

**Objectif technique** : Étend EN07.7 (TLS interne nginx↔core) vers un maillage complet — mTLS systématique entre tous les services internes, avec identité de charge (workload identity), pour servir de socle infrastructure au Service Mesh applicatif ([E43 EN43.3](../../EPIC-securite/ENABLERS/en-service-mesh.md)).

**Critères de complétion** :
- [ ] Certificats mTLS émis et renouvelés automatiquement pour chaque service interne
- [ ] Le Service Mesh (EN43.3) peut s'appuyer sur cette infrastructure sans configuration TLS manuelle par service
- [ ] Rotation de certificats testée sans interruption de service

**Dépendances** : EN07.7 (TLS interne nginx↔core)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E07 · Type: infrastructure · Module: core · Phase: phase-3
Stage: ⬜ · Priority: High
