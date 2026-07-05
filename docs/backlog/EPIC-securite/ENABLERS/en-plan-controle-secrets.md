# EN43.6 — Plan de contrôle : Secrets (OpenBao)

**Type d'enabler** : gouvernance · sécurité

**Objectif technique** : Coffre-fort central pour tous les modules, avec secrets **dynamiques** (générés à la demande, courte durée de vie), rotation automatique et portée limitée par module — un adaptateur ne détient aucun secret longue durée, il le récupère à l'exécution, scoped, et le relâche. Étend EN07.2 (aujourd'hui limité à Docker secrets statiques).

**Justification** : Un secret statique longue durée codé en dur ou stocké sans rotation est la porte d'entrée la plus fréquente d'une compromission — et le point le plus dur à corriger a posteriori si tous les modules y ont accès de la même façon. Les secrets dynamiques et scopés limitent le dommage à un seul module en cas de fuite.

**Critères de complétion** :
- [ ] OpenBao déployé comme coffre-fort central
- [ ] Secrets dynamiques (générés à la demande) pour les adaptateurs, pas de secret statique longue durée
- [ ] Rotation automatique documentée et testée
- [ ] Une clé fuitée est révocable en une action
- [ ] Portée (scope) limitée par module — aucun accès croisé aux secrets d'un autre module

**Dépendances** : EN07.2, EN07.11

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: gouvernance · Module: securite · Phase: phase-3 · Size: L
Stage: Backlog · Priority: Critical
