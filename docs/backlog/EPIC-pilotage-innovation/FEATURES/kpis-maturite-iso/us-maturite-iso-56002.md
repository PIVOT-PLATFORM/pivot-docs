# US38.9.2 — Évaluation de maturité (ISO 56002/56004)

**En tant que** responsable innovation
**Je veux** évaluer la **maturité du management de l'innovation** selon un référentiel (ISO 56002/56004) et suivre les plans de progrès
**Afin de** structurer l'amélioration continue du SMI et viser la conformité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le référentiel de maturité, when je réalise l'auto-évaluation, then un niveau par dimension et un radar sont produits | ⬜ |
| Given un écart, when il est identifié, then un plan d'amélioration est suivi (progression tracée) | ⬜ |
| Error : given une auto-évaluation incomplète (dimensions non renseignées), when je tente de générer le radar, then le système signale les dimensions manquantes plutôt que de produire un radar partiel silencieux | ⬜ |
| Security : seuls les rôles habilités (responsable innovation) peuvent lancer/modifier l'auto-évaluation de maturité et le plan d'amélioration associé ; l'historique des évaluations est conservé pour traçabilité de la progression | ⬜ |
| A11y : le radar de maturité par dimension est doublé d'une restitution textuelle/tabulaire (niveau par dimension) accessible au clavier et au lecteur d'écran | ⬜ |

## Hors périmètre
- La certification ISO 56002 officielle (audit externe) : cette US outille l'auto-évaluation interne, pas un processus de certification tierce
- La définition du contenu détaillé du référentiel de maturité (dimensions, échelle) : à documenter en amont comme donnée de configuration, pas développée comme fonctionnalité utilisateur ad hoc
- Le calcul des KPIs de performance (funnel, délais, ROI) : couvert par US38.9.1, cette US se limite à la maturité du management (ISO 56004)

## Notes d'implémentation
- S'appuie sur EN38.1 (auto-évaluation de maturité ISO 56004) pour le stockage des scores par dimension et du plan d'amélioration
- Le référentiel de maturité (dimensions, niveaux) est une donnée de configuration réutilisable d'une évaluation à l'autre, à ne pas coder en dur
- La progression du plan d'amélioration doit être tracée dans le temps pour permettre la comparaison entre évaluations successives

---
Item Type: US · Parent: F38.9 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Profils: Grand groupe, Publique, État
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 (modèle SMI & moteur)
