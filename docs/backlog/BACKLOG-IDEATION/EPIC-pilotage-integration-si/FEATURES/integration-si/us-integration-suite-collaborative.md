# US36.1.3 — Intégration suite collaborative

**En tant que** chef de projet
**Je veux** des onglets et notifications dans la messagerie d'équipe, des tâches créées depuis les e-mails et des réunions outillées
**Afin d'** apporter la capillarité terrain sans quitter les outils du quotidien

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la messagerie d'équipe, when un projet y est épinglé, then onglets et notifications sont disponibles dans la messagerie | ⬜ |
| Une tâche peut être créée directement depuis un e-mail et rattachée au projet | ⬜ |
| Error : given une intégration non autorisée par la politique, system la bloque | ⬜ |
| Security/Gouvernance : la création de tâche depuis un e-mail et l'accès aux onglets projet respectent les droits d'accès de l'utilisateur au projet concerné | ⬜ |
| A11y : les surfaces intégrées restent conformes RGAA 4 / WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'intégration ne couvre que la messagerie d'équipe et les e-mails ; les autres canaux (visioconférence tierce, réseaux sociaux d'entreprise) ne sont pas dans le périmètre de cette US.
- Le contenu détaillé des « réunions outillées » (compte-rendu automatique, transcription) n'est pas spécifié ici au-delà de l'épinglage projet et des notifications.
- La configuration fine de la politique d'autorisation des intégrations (qui peut activer quel connecteur) relève de la gestion des tenants/admin, pas de cette US.

## Notes d'implémentation
- L'épinglage d'un projet dans la messagerie d'équipe et la création de tâche depuis un e-mail nécessitent un connecteur applicatif vers l'outil de messagerie cible ; le choix de l'outil (suite collaborative Pivot vs tiers) conditionne l'implémentation technique et reste à trancher avant développement.
- Les tâches créées depuis un e-mail doivent être rattachées à une entité `Project` existante du schéma `pilotage` (FK `public.teams.id` pour le scoping).
- Frontend `pivot-pilotage-ui` pour les onglets projet intégrés, consommant `@pivot/ui-core` + `@pivot/design-system`.

---
Item Type: US · Parent: F36.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: PP-044 · MoSCoW: Could · Lot: Lot 3 · Origine: Différenciant MS
Profils: TPE, PME, Grand groupe
Justification: Dossier §6.3 : capillarité terrain
Dépendances: —
