# US51.1.3 — Card Santé de l'instance

**En tant que** administrateur de la plateforme
**Je veux** une card « Santé de l'instance » en tête de cockpit
**Afin de** répondre en 3 secondes à « est-ce que tout va bien ? »

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un admin consulte son cockpit, when la card se charge, then elle affiche l'état de santé global (UP/DOWN) issu des healthchecks (`/actuator/health`, liveness/readiness) | ⬜ |
| Given l'instance est saine, when la card s'affiche, then l'état « OK » est **aussi lisible** que l'état « alerte » (pas seulement un rouge visible) — règle des 3 s | ⬜ |
| Given un contributeur de santé est dégradé (ex. `flyway`, base), when la card s'affiche, then le sous-état dégradé est signalé avec drill-down | ⬜ |
| Given des métriques techniques existent, when la card le permet, then un indicateur de dimensionnement/dispo est affiché (source Prometheus/actuator) | ⬜ |
| Loading : given le chargement, then un skeleton s'affiche (`aria-busy`) | ⬜ |
| Error : given la source santé est injoignable, then l'état `error` s'affiche — ne jamais afficher « OK » par défaut en cas d'échec | ⬜ |
| A11y : l'état de santé n'est pas transmis par la seule couleur (icône + texte), contrastes AA | ⬜ |

## Hors périmètre

- Le calcul de SLA sur une période (card distincte, dépend d'une source Prometheus branchée) —
  ici on affiche l'état **instantané** de santé.

## Notes d'implémentation

- Source confirmée : actuator sur le port de management `:8081` (`health`, `health/liveness`,
  `health/readiness`, contributeur `flyway`) — `pivot-core`, E04 livré. Métriques via Micrometer /
  registry Prometheus.
- La card lit une **projection** de santé exposée à l'app (le port `:8081` n'est pas `/api`) — un
  petit relais interne peut être nécessaire ; à cadrer au Gate 1.

---
Item Type: US · Parent: F51.1 · Module: core · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Dépendances: EN51.1, EN51.2, EN51.4, E04
