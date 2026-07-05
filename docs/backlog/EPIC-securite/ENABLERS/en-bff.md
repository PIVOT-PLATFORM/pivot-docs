# EN43.1 — BFF (Backend for Frontend)

**Type d'enabler** : architecture · sécurité

**Objectif technique** : Couche entre le shell/portail et l'API Gateway qui agrège les appels pour le frontend, sans jamais laisser le frontend toucher un module directement.

**Justification** : Un frontend qui appelle les modules directement disperse la logique d'agrégation et multiplie les points où une donnée sensible pourrait transiter ou être mise en cache côté client. Le BFF centralise cette responsabilité et garantit qu'il ne stocke rien de sensible.

**Critères de complétion** :
- [ ] BFF déployé, agrège les réponses de plusieurs modules pour une vue frontend
- [ ] Aucun secret ni donnée sensible persistée côté BFF
- [ ] Le BFF relaie l'identité utilisateur vers l'API Gateway (pas de compte de service générique)

**Dépendances** : EN43.2 (API Gateway)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: architecture · Module: securite · Phase: phase-3 · Size: M
Stage: Backlog · Priority: High
