# US38.4.1 — Scoring multicritère & grilles d'évaluation

**En tant que** évaluateur
**Je veux** évaluer les idées/concepts via des **grilles multicritères** configurables (valeur, effort, risque, alignement, faisabilité)
**Afin de** prioriser objectivement et comparer sur une base homogène

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une grille d'évaluation, when des évaluateurs notent, then un score agrégé (pondéré) est calculé par item | ⬜ |
| Given plusieurs évaluations, when elles divergent fortement, then l'écart est signalé pour discussion | ⬜ |
| Given des scores, when j'affiche la matrice valeur/effort, then les « quick wins » et « gros paris » ressortent | ⬜ |
| Error : given une notation avec une valeur hors de l'échelle définie par la grille, when elle est soumise, then elle est rejetée avec message précisant l'échelle attendue | ⬜ |
| Security : un évaluateur ne peut noter qu'une fois par item et par critère (pas de double notation) ; les notes individuelles ne sont visibles que par les évaluateurs habilités et le responsable innovation, pas par l'auteur de l'idée avant clôture de l'évaluation | ⬜ |
| A11y : la matrice valeur/effort encode la position des items par un canal autre que la seule couleur (libellé, position, forme) et la table de scores est navigable au clavier (WCAG 2.1 AA) | ⬜ |

## Hors périmètre
- La définition du business case détaillé (valeur/effort/risque narratifs) — couverte par US38.4.2 ; cette US porte le scoring chiffré multicritère, pas le narratif
- La conversion des scores en décision de gate (US38.3.2) — le scoring alimente la décision, il ne la prononce pas
- La création/édition de nouvelles grilles réutilisant le module Risque (E21) au-delà de la référence de pattern — pas de couplage fonctionnel direct requis ici

## Notes d'implémentation
- Les grilles multicritères et le calcul du score pondéré sont portés par le moteur EN38.1 (« scoring multicritère pondéré ») ; s'inspirer des grilles de scoring du module Risque (E21) pour la structure, sans dépendance technique directe
- La détection de divergence forte entre évaluateurs (écart-type ou étendue au-delà d'un seuil configurable) est un signal d'alerte, pas un blocage de workflow
- La matrice valeur/effort est une vue dérivée des scores agrégés par critère (valeur, effort) — pas une nouvelle saisie, uniquement une visualisation

---
Item Type: US · Parent: F38.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 (modèle SMI & moteur)
