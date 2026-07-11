# US22.2.6 — Hybride cascade/agile

**En tant que** PMO
**Je veux** consolider dans un même portefeuille de santé des projets waterfall et des projets agiles (sprints, objectifs)
**Afin de** piloter des méthodes hétérogènes sans cloisonner le portefeuille

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des projets waterfall et agiles, when le PMO consulte le portefeuille, then leur santé est consolidée dans une vue unique | ⬜ |
| Les projets agiles exposent sprints et objectifs, remontés en indicateurs de santé homogènes | ⬜ |
| Error : given un projet sans méthode définie, system le signale comme non catégorisé | ⬜ |
| Security : le PMO ne voit dans le portefeuille consolidé que les projets sur lesquels il a un droit de lecture (pas de fuite d'indicateurs d'un projet hors périmètre) | ⬜ |
| A11y : la vue consolidée est conforme RGAA 4 / WCAG 2.1 AA | ⬜ |

## Hors périmètre

- La gestion des sprints elle-même (création, contenu, cérémonies) : portée par le module Scrum Poker / Daily existant, cette US ne fait que remonter des indicateurs
- L'affichage des sprints superposés à la timeline roadmap (US22.8.1) : cette US porte la consolidation de santé de portefeuille, pas l'affichage temporel des sprints
- La définition détaillée des indicateurs de santé (formule, seuils) au-delà de leur homogénéisation waterfall/agile : à préciser avec le module Risques/Reporting si besoin
- La planification Gantt détaillée des projets waterfall : couverte par F22.4, cette US ne fait que consolider leur statut de santé

## Notes d'implémentation

- La consolidation doit s'appuyer sur le graphe temporel unique (EN22.1) pour les projets waterfall, et sur les événements du bus PIVOT (sprints/objectifs, cf. US22.8.1) pour les projets agiles — pas de double saisie de la méthode dans deux systèmes distincts
- Le champ « méthode du projet » (waterfall/agile) doit être porté par l'entité Projet elle-même pour permettre le filtrage/catégorisation exigé par l'AC Error
- Réservé aux profils Grand groupe et État (cf. frontmatter Profils) : la consolidation multi-méthodes n'a de sens qu'à l'échelle d'un portefeuille conséquent

---
Item Type: US · Parent: F22.2 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Rôle: officier-responsable-pmo
Source: PP-039 · MoSCoW: Could · Lot: Lot 3 · Origine: Sciforma + MS
Profils: Grand groupe, État
Justification: Dossier §5.2
Dépendances: —
