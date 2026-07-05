# EN43.6 — Plan de contrôle : Secrets (OpenBao)

**Type d'enabler** : gouvernance · sécurité

**Contexte** : Coffre-fort central pour tous les modules. Secrets **dynamiques** (générés à la demande, courte durée de vie), rotation automatique, portée limitée par module. Un adaptateur ne détient aucun secret longue durée : il le récupère à l'exécution, scoped, et le relâche. Étend EN07.2 (aujourd'hui limité à Docker secrets statiques).

**Critères de complétion** :
- [ ] OpenBao déployé comme coffre-fort central
- [ ] Secrets dynamiques (générés à la demande) pour les adaptateurs, pas de secret statique longue durée
- [ ] Rotation automatique documentée et testée
- [ ] Une clé fuitée est révocable en une action
- [ ] Portée (scope) limitée par module — aucun accès croisé aux secrets d'un autre module

**Dépendances** : EN07.2, EN07.11

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: gouvernance · Module: securite · Phase: phase-3
Stage: Backlog · Priority: Highest
