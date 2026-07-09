# US23.2.9 — Livrables d'instance générés

**En tant que** PMO
**Je veux** générer depuis le portefeuille les documents normés (rapports d'orientation budgétaire, annexes PPI, délibérations types, rapports d'activité)
**Afin de** produire automatiquement les livrables réglementaires des instances

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le portefeuille, when le PMO génère un document normé, then rapport d'orientation budgétaire, annexe PPI, délibération type ou rapport d'activité est produit à partir des données | ⬜ |
| Les documents générés respectent les formats normés attendus | ⬜ |
| Error : given des données insuffisantes pour un document, system indique les sections manquantes | ⬜ |
| Security/Gouvernance : la génération d'un document réglementaire n'est accessible qu'au PMO (ou rôle habilité) du tenant concerné ; les documents générés sont horodatés et rattachés au portefeuille source | ⬜ |
| A11y : les documents générés (versions consultables) respectent les exigences d'accessibilité RGAA | ⬜ |

## Hors périmètre
- La définition réglementaire exacte de chaque type de document (rapport d'orientation budgétaire, annexe PPI, délibération type, rapport d'activité) suit les gabarits normés existants du secteur public ; cette US ne couvre pas leur évolution réglementaire future.
- La signature électronique ou la validation formelle du document généré n'est pas couverte.
- Les indicateurs de valeur publique intégrés dans ces documents proviennent de US23.2.10 ; cette US ne les calcule pas.

## Notes d'implémentation
- Profils cibles : Publique, État (secteur public spécifiquement) — les gabarits de documents doivent suivre les formats normés attendus par ces profils (cf. Dossier §7-B4).
- La génération s'appuie sur les données déjà consolidées par le portefeuille (US23.2.1) et si pertinent les indicateurs de valeur publique (US23.2.10).
- Backend `pivot-pilotage-core` pour l'agrégation des données, génération du document (PDF ou équivalent) côté `pivot-pilotage-ui` ou service dédié.

---
Item Type: US · Parent: F23.2 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Low
Stage: ⬜
Source: PP-056 · MoSCoW: Could · Lot: Lot 4 · Origine: Bonus B4
Profils: Publique, État
Justification: Dossier §7-B4
Dépendances: —
