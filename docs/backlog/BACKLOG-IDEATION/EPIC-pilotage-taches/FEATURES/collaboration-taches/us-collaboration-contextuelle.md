# US33.1.1 — Collaboration contextuelle

**En tant que** chef de projet
**Je veux** rattacher les échanges aux tâches et projets (mentions, fils, notifications ciblées)
**Afin de** garder les discussions dans leur contexte et notifier les bonnes personnes

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une tâche ou un projet, when un utilisateur poste un message avec mention, then le fil est rattaché à l'objet et la personne mentionnée est notifiée | ⬜ |
| Les notifications sont ciblées sur les participants concernés par la tâche/projet | ⬜ |
| Error : given une mention d'un utilisateur sans accès à l'objet, system l'empêche ou avertit | ⬜ |
| Security : seuls les participants ayant accès à la tâche/au projet peuvent lire ou poster dans son fil de discussion ; une mention ne donne pas accès à l'objet mentionné | ⬜ |
| A11y : fils de discussion et notifications conformes RGAA 4 / WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La messagerie instantanée générale (hors contexte tâche/projet) et les canaux de discussion libres ne sont pas couverts par cette US
- L'édition ou la suppression de messages après envoi n'est pas traitée ici
- Les intégrations avec des outils de messagerie externes (Slack, Teams, etc.) sont hors périmètre

## Notes d'implémentation
- Le fil de discussion est rattaché à l'entité (tâche ou projet) du schéma `pilotage` ; les notifications ciblées s'appuient sur la liste des participants déjà associés à cette entité (pas de résolution d'audience ad hoc)
- La détection de mention (`@utilisateur`) doit vérifier l'appartenance de la personne mentionnée au périmètre de visibilité de l'objet avant de déclencher la notification (cf. AC Security)
- Prévoir l'émission d'un événement sur le bus (objet pivot) à la création d'un message, pour permettre aux autres modules (notifications, activité) de s'y abonner sans couplage direct

---
Item Type: US · Parent: F33.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Source: PP-009 · MoSCoW: Must · Lot: Lot 1 · Origine: Socle 3/3
Profils: Tous
Justification: Dossier §4
Dépendances: US33.1.4 (entité tâche du quotidien, objet du fil de discussion)
