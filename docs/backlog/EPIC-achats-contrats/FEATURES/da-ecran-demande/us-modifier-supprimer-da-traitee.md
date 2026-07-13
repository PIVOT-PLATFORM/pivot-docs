# US25.4.18 — Modifier/supprimer une DA au statut « Traitée » (action administrateur)

**En tant que** administrateur de la plateforme
**Je veux** rouvrir une DA au statut « Traitée » via une action « Modifier »
**Afin de** la ramener en « Brouillon » pour qu'elle soit corrigée ou supprimée

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une DA au statut « Traitée », when l'administrateur l'ouvre, then il dispose d'une action « Modifier » | ⬜ |
| Given l'action « Modifier » sur une DA « Traitée », when l'administrateur l'exécute, then il doit préciser le motif dans la description et ajouter un commentaire administrateur | ⬜ |
| Given l'enregistrement de la modification, when il est validé, then la DA repasse au statut « Brouillon » et l'utilisateur peut alors la modifier (workflow relancé) ou la supprimer | ⬜ |
| Error : given un motif de description ou un commentaire administrateur manquant, system bloque l'enregistrement de l'action « Modifier » | ⬜ |
| Security/Gouvernance : action réservée à l'administrateur (A) uniquement — matrice P/V/CM/A = NON/NON/NON/OUI | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La modification d'une DA en cours de workflow par le prescripteur ou l'admin (US « Modifier (DA en cours de workflow) »).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), action administrateur « Modifier » sur une DA « Traitée ».
- Motif obligatoire (description) + commentaire admin ; après enregistrement la DA repasse « Brouillon » (modification workflow relancé, ou suppression possible).

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
