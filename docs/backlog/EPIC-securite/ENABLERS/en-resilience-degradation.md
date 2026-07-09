# EN43.10 — Résilience & dégradation gracieuse

**Type d'enabler** : architecture · résilience

**Objectif technique** : Circuit breakers, retries, bulkheads et timeouts systématiques sur les appels inter-modules/externes, avec dégradation gracieuse — un module indisponible affiche une tuile « indisponible », le reste du portail continue de fonctionner.

**Justification** : Avec des dizaines de modules, quelque chose est toujours en panne. Sans isolation des pannes, la disponibilité du portail entier finirait par dépendre du module le plus fragile — un défaut d'un adaptateur OSS ne doit jamais devenir un incident plateforme.

**Critères de complétion** :
- [ ] Circuit breaker sur chaque appel inter-module/externe (coupe plutôt que d'attendre)
- [ ] Retry avec backoff + idempotence (rejouer sans doublon)
- [ ] Bulkhead : cloisonnement des ressources, un module ne monopolise pas tout
- [ ] Timeout systématique sur tous les appels
- [ ] Dégradation gracieuse : un module indisponible affiche une tuile « indisponible », le reste du portail continue de fonctionner (mode dégradé organisé / kill switch)

**Dépendances** : EN28.4 (bus d'événements, découplage asynchrone)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: architecture · Module: securite · Phase: phase-3 · Size: L
Stage: ⬜ · Priority: High
