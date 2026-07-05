# US21.2.6 — Exposition et vélocité

**En tant que** Scrum, Chef de projet
**Je veux** que la criticité d'un risque soit modulée par sa proximité d'échéance (exposition) et sa vélocité d'évolution
**Afin de** prioriser les risques selon leur criticité

## Contexte

Moduler la criticité par proximité d'échéance et vélocité du risque.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un risque scoré dont l'échéance approche ou dont la vélocité (évolution de criticité entre deux revues) est élevée, when le classement des risques est recalculé, then ce risque remonte dans le classement par rapport à un risque de même score P × G mais sans proximité d'échéance ni évolution récente | ⬜ |
| Error : given un risque sans date d'échéance renseignée, system l'exclut du calcul d'exposition (sans faire planter le classement global) et l'affiche avec son score de criticité de base non ajusté | ⬜ |
| Security : la modulation par exposition/vélocité s'applique de façon uniforme selon une règle de calcul non modifiable par un simple contributeur (seul un rôle PMO/admin peut paramétrer la fenêtre de proximité d'échéance ou la formule de vélocité utilisée pour le classement) | ⬜ |
| A11y : dans le classement, l'indicateur de remontée (exposition/vélocité) est explicité par un texte ou une icône accompagnée d'un libellé, pas seulement par un déplacement visuel de position ou une couleur (WCAG 2.1 AA 1.4.1) | ⬜ |

## Hors périmètre
- Le calcul du score de criticité de base P × G reste porté par US21.2.1 ; cette US ne le recalcule pas, elle ajuste le classement/priorisation qui en dérive.
- L'historisation des changements de criticité au fil des revues (tendance et historique) relève de US21.5.5, pas de cette US qui ne fait qu'utiliser la vélocité pour le classement courant.
- Les stratégies de traitement déclenchées par la remontée d'un risque (plans d'action, contingence) relèvent de F21.3, pas de cette US.

## Notes d'implémentation
- Dépend de US21.2.1 pour la base du score P × G à moduler.
- La « vélocité » suppose un historique d'au moins deux mesures de criticité pour un même risque (ex. issues des revues de risques, US21.3.5) ; à défaut d'historique suffisant, le risque doit rester classé sur son seul score de base sans erreur.
- La proximité d'échéance doit se caler sur la date de traitement/échéance du risque portée par l'entité Risk (US21.1.6) ou son plan d'action (US21.3.3), à préciser lors du raffinement technique selon le champ effectivement disponible à ce stade.

---
Item Type: US · Parent: F21.2 · Module: risk · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Dépendances: US21.2.1
