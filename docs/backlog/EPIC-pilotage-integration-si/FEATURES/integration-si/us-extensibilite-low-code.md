# US36.1.4 — Extensibilité low-code

**En tant que** DSI
**Je veux** étendre le pilotage par une plateforme low-code (workflows, base de données, reporting décisionnel personnalisés)
**Afin d'** adapter l'outil aux processus internes sans développement lourd

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la plateforme low-code, when un administrateur crée un workflow ou un reporting, then il s'exécute sur les données de pilotage | ⬜ |
| Des bases de données et rapports personnalisés peuvent être ajoutés en low-code | ⬜ |
| Error : given une extension accédant à des données hors périmètre, system la bloque | ⬜ |
| Security/Gouvernance : les extensions low-code respectent les droits par périmètre et sont tracées | ⬜ |
| A11y : l'éditeur low-code (constructeur de workflow/reporting) est utilisable au clavier et conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La plateforme low-code ne couvre pas le développement de code custom (scripts, plugins compilés) : uniquement configuration par workflows et bases de données low-code.
- Les connecteurs BI et le datamart standard sont couverts par US36.1.2, pas ici : cette US porte sur les extensions propres à un organisme, pas sur l'offre décisionnelle de référence.
- La marketplace ou le partage d'extensions entre organisations n'est pas incluse (isolation par tenant stricte).

## Notes d'implémentation
- Les workflows et rapports low-code s'exécutent sur les données du schéma `pilotage` ; le contrôle d'accès aux données hors périmètre doit s'appuyer sur les mêmes règles d'autorisation par équipe/tenant que le reste du module (FK `public.teams.id`).
- La traçabilité des extensions (création, exécution) doit être journalisée pour audit, cohérent avec les exigences de gouvernance du domaine Pilotage.
- Frontend `pivot-pilotage-ui` pour l'éditeur low-code, en s'appuyant sur `@pivot/ui-core` + `@pivot/design-system` pour les composants d'interface.

---
Item Type: US · Parent: F36.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: Backlog
Source: PP-045 · MoSCoW: Could · Lot: Lot 4 · Origine: Différenciant MS (Power Platform)
Profils: Grand groupe, État
Justification: Dossier §6.3
Dépendances: —
