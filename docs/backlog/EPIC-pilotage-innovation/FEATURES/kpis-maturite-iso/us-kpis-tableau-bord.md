# US38.9.1 — KPIs & tableau de bord de l'innovation

**En tant que** responsable innovation / PMO
**Je veux** suivre les **KPIs d'innovation** (nb d'idées, taux de conversion par étape, time-to-market, % CA issu du nouveau, ROI) sur un tableau de bord
**Afin de** piloter la performance du SMI par la mesure (ISO 56008)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le SMI, when j'ouvre le tableau de bord, then les KPIs clés (funnel de conversion, délais, valeur générée) sont affichés | ⬜ |
| Given une période, when je compare, then l'évolution des indicateurs est visible | ⬜ |
| Error : given une période sans données disponibles (aucune idée/projet sur l'intervalle), when le tableau de bord est ouvert, then un état vide explicite est affiché plutôt qu'une erreur ou des valeurs incohérentes | ⬜ |
| Security : le tableau de bord et ses KPIs (dont % CA issu du nouveau, ROI) ne sont visibles que par les rôles habilités (responsable innovation, PMO, COMEX) ; pas d'exposition de données financières sensibles aux autres rôles | ⬜ |
| A11y : les graphiques du tableau de bord (funnel, courbes d'évolution) sont doublés d'une restitution textuelle/tabulaire des valeurs, navigable au clavier et compatible lecteur d'écran | ⬜ |

## Hors périmètre
- Le calcul détaillé du ROI financier consolidé (rapprochement comptable) : le KPI est affiché à partir de données déclarées/estimées, pas d'intégration comptable complète
- L'export ou le partage externe du tableau de bord (PDF, BI externe) : hors périmètre de cette US, focus sur l'affichage in-app
- La définition du référentiel de maturité ISO 56004 : couverte par US38.9.2, cette US se limite aux KPIs de performance (ISO 56008)

## Notes d'implémentation
- S'appuie sur EN38.1 (moteur entonnoir + KPIs ISO 56008) pour le calcul du funnel de conversion, des délais et de la valeur générée
- Le % CA issu du nouveau et le ROI nécessitent une donnée d'entrée (déclarative ou reliée au portefeuille E23) — préciser la source lors de l'implémentation
- La comparaison de périodes doit réutiliser un même mode de calcul que le funnel instantané pour rester cohérente dans le temps

---
Item Type: US · Parent: F38.9 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 (modèle SMI & moteur)
