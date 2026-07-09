# US21.3.3 — Plan d'action

**En tant que** Chef de projet
**Je veux** définir des actions de mitigation avec suivi d'avancement et échéances pour un risque
**Afin de** traiter et suivre chaque risque jusqu'à sa clôture

## Contexte

Actions de mitigation avec suivi d'avancement et échéances.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un risque doté d'une stratégie `Traiter`, when le Chef de projet ajoute une action de mitigation avec un responsable et une échéance, then l'action apparaît dans le plan d'action du risque avec un statut initial `à faire` | ⬜ |
| Given une action dont l'échéance est dépassée sans clôture, when le système évalue le plan d'action, then l'action est signalée en retard (indicateur visuel + éligible à un événement `risk.mitigation.due`) | ⬜ |
| Error : given une tentative de clôture d'une action sans commentaire de complétion, system rejette la requête avec un statut 400 | ⬜ |
| Security : seul le responsable de l'action ou le Chef de projet du risque peut modifier son statut ou la clôturer ; chaque changement de statut d'action est tracé (auteur, horodatage) dans l'audit trail | ⬜ |
| A11y : la liste des actions et leur formulaire d'édition (statut, échéance, responsable) respectent la navigation clavier et les libellés associés aux champs (WCAG 2.1 AA) | ⬜ |

## Hors périmètre
- Le choix de la stratégie de traitement qui déclenche la création d'un plan d'action — cf. US21.3.2
- Le plan de repli en cas d'échec du plan d'action — cf. US21.3.4 (Plan de contingence)
- La transformation d'une action en tâche delivery externe (Scrum/Kanban) — cf. F21.4 US21.4.3 (Actions → tâches delivery)

## Notes d'implémentation
- Une action de mitigation est rattachée à un risque ayant la stratégie `Traiter` (US21.3.2) ; plusieurs actions peuvent coexister sur un même risque
- Le passage d'une action en retard doit pouvoir émettre l'événement `risk.mitigation.due` sur le bus PIVOT (cf. EN21.3), sans dépendance directe vers les modules delivery
- Le statut d'action (à faire / en cours / fait / en retard) est indépendant du statut de cycle de vie du risque (US21.3.1), mais la clôture de toutes les actions peut être un signal d'entrée en revue (US21.3.5)

---
Item Type: US · Parent: F21.3 · Module: risk · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Dépendances: US21.3.2
