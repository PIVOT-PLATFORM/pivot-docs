# EN43.3 — Service Mesh (est-ouest, mTLS)

**Type d'enabler** : architecture · sécurité

**Objectif technique** : Sécurise le trafic interne module ↔ module (« est-ouest ») par chiffrement mutuel (mTLS) et authentification d'identité de charge (workload identity, type SPIFFE/SPIRE), avec retries/circuit breakers/timeouts gérés par le maillage plutôt que par chaque module.

**Justification** : Avec des dizaines de modules qui s'appellent entre eux, faire confiance au réseau interne (« si c'est dans le VPC, c'est de confiance ») revient à annuler le Zero Trust dès la deuxième couche. Le maillage impose l'authentification mutuelle à chaque appel, sans exception réseau.

**Critères de complétion** :
- [ ] mTLS actif sur tous les appels inter-services internes
- [ ] Identité de charge (workload identity) distincte de l'identité utilisateur (cf. EN01.13)
- [ ] Un service ne peut appeler que ce que la politique du maillage autorise (deny-by-default)
- [ ] Retries/circuit breakers/timeouts délégués au maillage (cf. EN43.10)

**Dépendances** : EN07.11 (TLS interne infra)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: architecture · Module: securite · Phase: phase-3 · Size: XL
Stage: Backlog · Priority: High
