# US42.2.4 — Thème PIVOT

**En tant que** DSI
**Je veux** que les formulaires héritent automatiquement des tokens du design-system PIVOT (couleurs, typographie, logo)
**Afin de** garantir une apparence cohérente avec le reste du portail, sans habillage manuel par formulaire

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un formulaire créé sans personnalisation explicite, when il est affiché (éditeur, diffusion, embed), then il applique les tokens `--pv-*` courants (couleurs, police, logo du tenant) | ⬜ |
| Given une mise à jour des tokens du design-system (ex. changement de palette du tenant), when un formulaire existant est rouvert, then il reflète la mise à jour sans republication manuelle | ⬜ |
| Error : given un token `--pv-*` manquant ou non résolu (ex. tenant sans thème personnalisé configuré), when le formulaire s'affiche, then il retombe sur le thème PIVOT par défaut plutôt que d'afficher un rendu cassé | ⬜ |
| A11y : l'héritage de thème préserve les contrastes minimums WCAG 2.1 AA même si le tenant personnalise sa palette (garde-fou de contraste, pas de contournement possible) | ⬜ |

## Hors périmètre

- Éditeur de thème dédié à Forms (au-delà de l'héritage automatique) — cf. Hors périmètre US42.1.1

## Notes d'implémentation

- Consomme la capacité « Thème » du contrat d'intégration PIVOT (six capacités, cf. ADR-009) — pas de jeu de tokens propre à Forms

---
Item Type: US · Parent: F42.2 · Module: forms · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Source: FRM-104 · MoSCoW: Should · Origine: Contrat d'intégration (capacité Thème)
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
