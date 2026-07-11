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

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un adaptateur ayant besoin d'un credential externe, when il le demande à OpenBao à l'exécution, then il reçoit un secret dynamique à courte durée de vie, scopé à son module, sans jamais le stocker de façon persistante.
- [ ] Given un secret dynamique arrivé à échéance de son bail, when l'adaptateur tente de le réutiliser, then le secret est déjà révoqué et l'adaptateur doit en redemander un nouveau (pas de secret longue durée réutilisable).
- [ ] Given un secret suspecté compromis, when le mainteneur déclenche la révocation, then la clé est révoquée en une seule action et tout usage ultérieur est refusé.
- [ ] Error case: given OpenBao injoignable ou une demande de secret refusée (scope insuffisant), when l'adaptateur sollicite le secret, then l'opération échoue de façon fermée (fail-closed, pas de fallback vers un secret en dur) et l'échec est journalisé sans divulguer la valeur du secret.
- [ ] Security: un module ne peut lire que les secrets de sa propre portée — une demande de secret hors scope est refusée (`403`) ; aucun secret n'apparaît en clair dans les logs, les variables d'environnement persistées ou le code ; l'accès aux secrets d'un autre tenant/module est impossible (isolation par policy OpenBao).

**Dépendances** : EN07.2, EN07.11

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: gouvernance · Module: securite · Phase: phase-3 · Size: L
Stage: ⬜ · Priority: Critical
