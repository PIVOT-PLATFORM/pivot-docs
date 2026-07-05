# EN43.1 — BFF (Backend for Frontend)

**Type d'enabler** : architecture · sécurité

**Contexte** : Couche entre le shell/portail et l'API Gateway. Agrège les appels pour le frontend et **ne stocke rien de sensible** — le frontend ne touche jamais un module directement.

**Critères de complétion** :
- [ ] BFF déployé, agrège les réponses de plusieurs modules pour une vue frontend
- [ ] Aucun secret ni donnée sensible persistée côté BFF
- [ ] Le BFF relaie l'identité utilisateur vers l'API Gateway (pas de compte de service générique)

**Dépendances** : EN43.2 (API Gateway)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: architecture · Module: securite · Phase: phase-3
Stage: Backlog · Priority: High
