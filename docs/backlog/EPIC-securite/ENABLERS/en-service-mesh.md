# EN43.3 — Service Mesh (est-ouest, mTLS)

**Type d'enabler** : architecture · sécurité

**Contexte** : Sécurise le trafic interne module ↔ module (« est-ouest ») : chiffrement mutuel (mTLS) et authentification d'identité de charge (workload identity, type SPIFFE/SPIRE), avec retries/circuit breakers/timeouts gérés par le maillage plutôt que par chaque module.

**Critères de complétion** :
- [ ] mTLS actif sur tous les appels inter-services internes
- [ ] Identité de charge (workload identity) distincte de l'identité utilisateur (cf. EN01.13)
- [ ] Un service ne peut appeler que ce que la politique du maillage autorise (deny-by-default)
- [ ] Retries/circuit breakers/timeouts délégués au maillage (cf. EN43.10)

**Dépendances** : EN07.11 (TLS interne infra)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: architecture · Module: securite · Phase: phase-3
Stage: Backlog · Priority: High
