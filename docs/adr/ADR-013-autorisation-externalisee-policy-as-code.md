# ADR-013 — Autorisation externalisée (policy-as-code)

**Date :** 2026-07-05
**Statut :** Accepté
**Décideurs :** Architecte plateforme, RSSI, Responsable juridique
**Contexte technique :** organisation `PIVOT-PLATFORM`

---

## Contexte

Avec des dizaines de modules natifs et adaptateurs, coder la logique d'autorisation dans chaque module produit des règles divergentes, non auditables globalement, et un exercice « on ne sait pas qui peut faire quoi » à l'échelle de la plateforme.

## Décision

1. Les décisions d'accès ne sont **pas codées dans les modules** mais exprimées en politiques versionnées (OPA/Rego ou Cedar), évaluées à chaque appel par un moteur de politique centralisé.
2. Le moteur applique conjointement : le **RBAC** par rôle (taxonomie des rôles PIVOT), l'**ABAC** fin (par entité, par action), et la **classification de souveraineté** (ADR-015) — un appel est bloqué si la sensibilité de la donnée dépasse la classe du module cible.
3. Toute politique est versionnée en Git, revue comme du code.

## Conséquences

- **Positif :** un seul endroit pour auditer « qui peut faire quoi » ; les politiques évoluent sans redéployer les modules ; cohérent avec la taxonomie des rôles déjà posée au backlog.
- **Négatif :** latence additionnelle par appel (évaluation de politique) — à mesurer et mettre en cache si nécessaire ; courbe d'apprentissage du langage de politique (Rego/Cedar) pour l'équipe.
- **Interdit :** une logique d'autorisation codée en dur dans un adaptateur ou un module natif, en dehors des cas triviaux (garde de route front-end, qui reste un filet secondaire, jamais la source de vérité).

## Alternatives écartées

- Autorisation codée dans chaque module (`@PreAuthorize` généralisé sans moteur central) : source actuelle dans E01 pour l'authentification utilisateur, insuffisant à l'échelle inter-module — chaque module réinventerait sa propre logique, non auditable globalement.
- Pas de moteur de politique, contrôle uniquement au niveau réseau (Service Mesh) : le maillage (ADR-012) contrôle *qui peut appeler qui*, pas *quelle donnée métier est visible* — les deux couches sont complémentaires, pas substituables.

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-07-05 | Décision initiale |
