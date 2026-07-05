# US23.2.3 — Revues et comités outillés

**En tant que** PMO
**Je veux** animer les instances avec des supports (revues structurées, diaporama du portefeuille) et produire des décisions et comptes rendus actionnables
**Afin de** structurer les comités et transformer les décisions en actions suivies

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une instance planifiée, when le PMO prépare la revue, then un support structuré / diaporama du portefeuille est généré | ⬜ |
| Les décisions et comptes rendus sont saisis et convertis en actions assignables | ⬜ |
| Error : given un compte rendu sans décision tracée, system le signale avant clôture de l'instance | ⬜ |
| Security/Gouvernance : décisions et comptes rendus sont horodatés et historisés (traçabilité des instances) ; seuls les membres de l'équipe rattachée à l'instance peuvent créer/modifier une décision | ⬜ |
| A11y : le support de revue et la liste des actions assignables sont conformes RGAA 4 / WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La visioconférence / animation temps réel de la réunion n'est pas couverte (support et compte rendu uniquement).
- Le suivi détaillé des actions assignées (avancement, relances) au-delà de leur création n'est pas couvert par cette US.
- La génération de documents réglementaires normés (rapports d'orientation budgétaire, etc.) relève de US23.2.9.

## Notes d'implémentation
- Le diaporama du portefeuille se génère à partir des données déjà consolidées par US23.2.1 (vue portefeuille) — pas de nouvelle source de données.
- Les actions issues des décisions doivent être assignables à un membre de l'équipe (FK `public.teams.id`).
- Frontend `pivot-pilotage-ui`, consomme `@pivot/ui-core` + `@pivot/design-system`.

---
Item Type: US · Parent: F23.2 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Source: PP-021 · MoSCoW: Must · Lot: Lot 2 · Origine: 2/3 (PM, Sciforma) + Insight I9
Profils: Grand groupe, Privée sous droit public, Publique, État
Justification: Dossier §5.1 + §8-I9
Dépendances: —
