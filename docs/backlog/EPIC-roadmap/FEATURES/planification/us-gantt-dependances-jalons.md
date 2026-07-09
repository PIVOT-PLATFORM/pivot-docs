# US22.2.1 — Gantt, dépendances, jalons

**En tant que** chef de projet
**Je veux** planifier de façon interactive plusieurs projets avec WBS, dépendances, jalons et planification automatique
**Afin de** disposer d'une planification multi-projets fiable et ordonnancée

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet, when le chef de projet ajoute des tâches, then une WBS avec dépendances et jalons est construite sur une vue Gantt interactive | ⬜ |
| La planification automatique recalcule les dates en fonction des dépendances | ⬜ |
| Error : given une dépendance circulaire, system la détecte et refuse le lien | ⬜ |
| Security : la création/modification de tâches, dépendances et jalons est réservée aux utilisateurs ayant un rôle autorisé sur le projet (pas de modification par un simple lecteur) | ⬜ |
| A11y : la vue Gantt reste navigable au clavier et conforme RGAA 4 / WCAG 2.1 AA | ⬜ |

## Hors périmètre

- Le calcul et la mise en évidence du chemin critique : couverts par US22.2.2
- Les dépendances typées FS/SS/FF/SF avec retard/avance et les contraintes de date avancées (ASAP/ALAP/MSO/MFO…) : couvertes par US22.4.3/US22.4.4 dans le Gantt détaillé (parité MS Project complète)
- Les calendriers ouvrés/exceptions et les tâches périodiques : couverts par US22.4.5/US22.4.6
- Le nivellement et l'affectation de ressources : couverts par F22.5

## Notes d'implémentation

- Cette US porte le socle multi-projets de la planification (F22.2, benchmark PPM) — elle réutilise le modèle temporel unique (`Projet → Phase → Tâche → Jalon → Dépendance`, EN22.1) déjà posé par le socle F22.1, sans dupliquer le stockage des jalons
- La détection de dépendance circulaire doit s'exécuter avant la création du lien (validation synchrone), afin que le chemin critique (US22.2.2) puisse toujours s'appuyer sur un graphe acyclique
- La planification automatique doit rester cohérente avec le mode manuel introduit plus tard (US22.4.2) — prévoir un indicateur auto/manuel par tâche dès ce socle si le modèle EN22.1 l'exige

---
Item Type: US · Parent: F22.2 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Source: PP-001 · MoSCoW: Must · Lot: Lot 1 · Origine: Socle 3/3
Profils: Tous
Justification: Dossier §4 : présent chez les 3
Dépendances: —
