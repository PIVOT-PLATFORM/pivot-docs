# US51.1.2 — Card Activation des domaines

**En tant que** administrateur de la plateforme
**Je veux** une card « Activation des domaines » sur mon cockpit
**Afin de** voir quels domaines/modules sont activés pour mon tenant et agir dessus

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un admin authentifié, when la card se charge, then elle liste les modules et leur statut activé/désactivé (source `GET /modules`) | ⬜ |
| Given un module désactivé, when l'admin déclenche l'activation depuis la card, then l'action passe par `POST /admin/modules/{id}/activate` avec **confirmation explicite** (jamais en un clic) | ⬜ |
| Given une désactivation, when l'admin la demande, then une confirmation explicite est requise (action destructrice protégée) | ⬜ |
| Given un module fonctionnel encore WIP, when la card l'affiche, then il apparaît en état `module-wip` (activable mais signalé « en construction ») | ⬜ |
| Error : given l'API modules échoue après réessais, then l'état `error` s'affiche avec réessai | ⬜ |
| Security : given une identité externe pure, when le cockpit se compose, then l'action d'activation est retirée (lecture seule) — la liste peut rester `◐` agrégée selon l'engagement | ⬜ |
| A11y : statut de chaque module annoncé (activé/désactivé/WIP), contrôle clavier des actions, contrastes AA | ⬜ |

## Hors périmètre

- La logique d'activation elle-même (E03) et la facturation par plan (superadmin) — la card consomme
  l'API existante.

## Notes d'implémentation

- Source confirmée : `ModuleController` (`GET /modules`, `/modules/{id}/status`),
  `AdminModuleController` (`activate`/`deactivate`) — `pivot-core`, E03 livré.
- Seule card Socle **actionnable** : l'action reste interne, protégée par confirmation (cf. règle
  « actionnabilité protégée », spec cockpits-dsi.md).

---
Item Type: US · Parent: F51.1 · Module: core · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Dépendances: EN51.1, EN51.2, EN51.4, EN51.5, E03
