# US18.19.6 — Structure du bloc Jalon CEN

**En tant que** chef de projet (pilote d'activité)
**Je veux** un bloc Jalon CEN avec sa date SECEN et son avis CEN
**Afin de** saisir la comitologie CEN de l'activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un bloc Jalon CEN, when il s'affiche, then il présente les champs « Type de jalon », « Date de passage », « Date SECEN » et « Avis CEN » (liste : KO, OK, OK avec réserves) | ⬜ |
| Given un bloc Jalon CEN, when j'agis dessus, then il propose un bouton « Supprimer » | ⬜ |
| Error : given un avis CEN hors liste (KO / OK / OK avec réserves), system refuse la valeur | ⬜ |
| Security/Gouvernance : les actions du bloc Jalon CEN restent soumises aux droits de l'utilisateur sur l'activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le Jalon CEN ne comporte pas de bouton « Valider » ni de copie de référence planning/budget.

## Notes d'implémentation
- Bloc Jalon CEN (module pilotage, onglet Jalon) : Type, Date de passage, Date SECEN, Avis CEN (KO / OK / OK avec réserves), bouton Supprimer.

---
Item Type: US · Parent: F18.19 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.16 Activité — écran Jalons
Dépendances: —
