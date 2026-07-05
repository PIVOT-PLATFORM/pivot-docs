# US21.1.6 — Entité Risk au catalogue

**En tant que** Dev, PMO
**Je veux** « Entité Risk au catalogue »
**Afin de** adapter l'analyse de risque à la nature du projet

## Contexte

Déclarer l'entité Risk (YAML versionnable) rattachée à Project, Portfolio, Vendor, Contract, Decision.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le schéma d'entités du module risque, when un Dev déclare l'entité `Risk` au catalogue (fichier YAML versionné), then l'entité expose ses relations vers `Project` (via `project_ref`, bus PIVOT), `Portfolio`, `Vendor`, `Contract` et `Decision`, et est visible dans le catalogue d'entités PIVOT | ⬜ |
| Given l'entité Risk déclarée, when un PMO consulte le catalogue, then les champs structurants du risque (famille, typologie d'origine, statut, rattachement projet) apparaissent avec leur type et leur relation documentée | ⬜ |
| Error : given une déclaration YAML référençant une relation vers une entité inexistante au catalogue ou utilisant une FK directe interdite entre modules, system rejette la déclaration au moment de la validation/build du catalogue et retourne l'erreur de schéma | ⬜ |
| Security : la déclaration ou modification de l'entité Risk au catalogue est réservée aux rôles Dev et admin (impact structurant sur le schéma partagé) ; le catalogue documente si le risque référence des données sensibles (ex. données perso via profil projet) sans les exposer directement | ⬜ |

## Hors périmètre
- Le contenu métier détaillé du risque (score, gravité, statut de cycle de vie, plans de traitement) — couvert par les US de scoring (F21.2) et de cycle de vie (F21.3).
- La création du schéma Flyway et des entités JPA sous-jacentes — couverte par EN21.1, dont cette US dépend pour la cohérence du modèle physique.
- Les jonctions effectives vers Vendor/Contract dans la boucle vivante (déclenchement d'événements, synchronisation) — couvertes par US21.4.5 ; ici seule la relation au catalogue est déclarée.

## Notes d'implémentation
- L'entité `Risk` (cf. EN21.1 — schéma Flyway `risk`) se corrèle à `Project` par `project_ref` via le bus PIVOT, jamais par FK inter-modules (ADR-006) ; les relations vers `Portfolio`, `Vendor`, `Contract`, `Decision` suivent le même principe de composabilité (ADR-008).
- Le rattachement à une famille de la taxonomie universelle (US21.1.3) est un champ obligatoire de l'entité, garantissant la comparabilité inter-projets dès la déclaration.
- Le YAML de déclaration doit rester versionnable dans le dépôt (revue de schéma via PR), conformément à la convention catalogue PIVOT des autres modules.

---
Item Type: US · Parent: F21.1 · Module: risk · Phase: phase-3 · Size: M · Priority: Critical
Stage: Backlog
Dépendances: US21.1.3
