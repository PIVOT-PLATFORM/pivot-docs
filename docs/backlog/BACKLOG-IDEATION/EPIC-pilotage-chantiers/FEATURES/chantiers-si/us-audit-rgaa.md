# US39.1.10 — Audit RGAA

**En tant que** DSI
**Je veux** faire auditer la conformité RGAA de l'outil retenu et publier la déclaration d'accessibilité
**Afin de** respecter l'obligation légale d'accessibilité du secteur public (prolonge PP-012)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'outil retenu, when l'audit est réalisé, then la conformité RGAA 4 / WCAG 2.1 AA est évaluée et un rapport est produit | ⬜ |
| La déclaration d'accessibilité est publiée et accessible | ⬜ |
| Error : given des non-conformités RGAA, un plan de remédiation est exigé et suivi | ⬜ |
| A11y : l'audit couvre navigation clavier, lecteurs d'écran et contrastes (RGAA 4 / WCAG 2.1 AA) | ⬜ |

## Hors périmètre
- L'US ne couvre pas la mise en conformité elle-même (développement des correctifs RGAA) : elle couvre l'audit, le rapport et la publication de la déclaration d'accessibilité, ainsi que le suivi du plan de remédiation — pas son exécution technique.
- Le choix de l'outil audité n'est pas fait ici (dépend de la consultation SI, cf. US39.1.2/US39.1.4/US39.1.5) : cette US porte sur l'audit RGAA de l'outil une fois retenu.
- L'audit RGAA des autres modules Pivot (hors chantiers SI) n'est pas traité ici — chaque module applicatif porte son propre audit d'accessibilité le cas échéant.

## Notes d'implémentation
- Cette US est un artefact de gouvernance/conformité (audit + déclaration + plan de remédiation), pas une fonctionnalité applicative : le livrable attendu est un rapport d'audit RGAA 4, la déclaration d'accessibilité publiée (schéma officiel DINUM), et un plan de remédiation suivi dans le temps.
- La déclaration d'accessibilité doit rester accessible publiquement et à jour (référentiel RGAA 4 / WCAG 2.1 AA) : prévoir sa republication à chaque évolution significative de l'outil.
- Prolonge PP-012 (déjà traité ailleurs dans le backlog) — vérifier la cohérence avec cette US mère lors du Gate 1 pour éviter la duplication d'AC.

---
Item Type: US · Parent: F39.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: directeur-des-systemes-d-information
Source: PP-070 · MoSCoW: Must (conditionnel) · Lot: Lot 2 · Origine: Contexte public FR
Profils: Privée sous droit public, Publique, État
Justification: Obligation légale ; prolonge PP-012
Dépendances: —
