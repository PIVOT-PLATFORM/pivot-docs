# US28.11.1 — Scorecards de conformité et maturité par entité catalogue

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.
> Gap identifié par le benchmark plateforme développeur (`pivot-benchmarks/plateforme-developpeur/dossier-synthese-plateforme-developpeur.md` §6/B2, §7.2, §8.1 — pivot-benchmarks#1) : absent d'E28 avant cette US, alors que Backstage (Tech Insights), Port, Cortex, OpsLevel et Compass en font toutes un pilier non négociable de la catégorie « software catalog ».

**En tant que** DSI, architecte plateforme ou responsable d'une entité catalogue
**Je veux** définir des règles de conformité déclaratives évaluées automatiquement sur les entités du catalogue, agrégées en un niveau de maturité avec remédiation actionnable affichée
**Afin de** rendre mesurables et opposables des standards jusque-là seulement déclaratifs (sécurité, documentation, astreinte), sans bureaucratiser le suivi

**Note** : moteur de règles à privilégier ouvert et documenté (YAML, cohérent avec le reste d'E28) plutôt qu'un langage de requête propriétaire fermé (contre-exemple explicitement écarté : Cortex CQL, cf. dossier de synthèse §8.2.3) — posture souveraine PIVOT. S'appuie sur le contrat PivotAdapter (EN28.3) plutôt que sur un contrat parallèle.

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Une règle de scorecard déclarée en YAML s'évalue automatiquement sur une entité du catalogue (native ou déclarée par un adaptateur conforme EN28.3) | ⬜ |
| Le résultat d'une évaluation agrège les règles en un palier de maturité (ex. Bronze/Argent/Or ou équivalent), jamais un score brut sans indication de remédiation | ⬜ |
| Une règle en échec affiche une action corrective visible sur la fiche de l'entité concernée | ⬜ |
| Une règle de scorecard peut consommer la checklist d'admission de sécurité (E43 — Sécurité & Zero Trust, EN43.13) plutôt que de réinventer un système de règles isolé | ⬜ |
| Le mécanisme de scorecard s'applique indifféremment aux entités déclarées par un adaptateur OSS et aux modules natifs (cf. ADR-009, principe de coexistence) | ⬜ |

## Hors périmètre (stub)

- Évaluation de performance individuelle à partir d'un score de scorecard — exclu par principe (cohérence avec E11/E27, non-surveillance individuelle)
- Croisement multi-source avancé (CI/CD + sécurité + incidents dans une même règle) et diff visuel de campagnes de règles (EF-SCO-03/04 du cahier Backstage) — raffinés en Gate 1, hors socle minimal de cette US

---
Item Type: US · Parent: F28.11 · Module: plateforme-developpeur · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Dépendances: EN28.3, EN28.2
