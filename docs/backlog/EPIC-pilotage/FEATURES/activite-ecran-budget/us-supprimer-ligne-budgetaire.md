# US18.18.13 — Supprimer une ligne budgétaire

**En tant que** contrôleur de gestion SI (profil budget)
**Je veux** supprimer une ligne budgétaire depuis sa fenêtre d'édition, avec confirmation et motif
**Afin de** retirer une ligne obsolète en traçant l'opération

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la fenêtre d'édition d'une ligne, when je clique sur le bouton de suppression, then la pop-up « Suppression d'une ligne budgétaire » s'affiche | ⬜ |
| Given une ligne comportant des montants, when la pop-up s'affiche, then elle liste les couples année/montant et avertit de ne pas supprimer des données nécessaires au coût à terminaison | ⬜ |
| Given une ligne sans montant, when la pop-up s'affiche, then elle indique « Cette ligne ne contient pas de montants… » | ⬜ |
| Given la suppression, when je confirme, then un motif de suppression est obligatoire (200 caractères), un spinner s'affiche et une écriture unique est faite dans les Logs « Suppression LB - (nom) et couples année/montant suivants : … » | ⬜ |
| Error : given un motif de suppression vide, system bloque la confirmation (motif obligatoire, 200 caractères) | ⬜ |
| Security/Gouvernance : seuls les utilisateurs autorisés sur le budget peuvent supprimer une ligne, l'action étant journalisée | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'affichage détaillé de l'historique des logs, couvert par l'US Historique des modifications.

## Notes d'implémentation
- Module pilotage (OPDN), écran Budget, suppression d'une ligne depuis la fenêtre d'édition.
- Pop-up « Suppression d'une ligne budgétaire » ; message listant les couples année/montant + avertissement coût à terminaison, sinon « Cette ligne ne contient pas de montants… » ; motif obligatoire 200 car. ; Confirmer → spinner + log unique « Suppression LB - (nom) et couples année/montant suivants : … ».

---
Item Type: US · Parent: F18.18 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: SPEC_OPDN — B.15 Activité — écran Budget
Dépendances: —
