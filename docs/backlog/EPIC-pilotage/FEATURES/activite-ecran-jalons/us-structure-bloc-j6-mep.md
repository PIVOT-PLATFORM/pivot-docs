# US18.19.8 — Structure du bloc J6 - Mise en Production (MEP)

**En tant que** chef de projet (pilote d'activité)
**Je veux** un bloc J6 - MEP portant le numéro de version mis en production
**Afin de** documenter la mise en production de l'activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un bloc J6 - Mise en Production (MEP), when il s'affiche, then il présente « Type de jalon », « Date de passage » et « Numéro de version » (texte, 50 caractères max) | ⬜ |
| Given le bloc J6 - MEP, when j'agis dessus, then il propose les boutons « Supprimer » et « Modifier » | ⬜ |
| Error : given un numéro de version dépassant 50 caractères, system empêche la saisie au-delà de la limite | ⬜ |
| Security/Gouvernance : les actions du bloc J6 - MEP restent soumises aux droits de l'utilisateur sur l'activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le lien entre le numéro de version J6 et la version décrite en J7 - MES n'est pas couvert par cette US.

## Notes d'implémentation
- Bloc J6 - Mise en Production (MEP) (module pilotage, onglet Jalon) : Type, Date de passage, Numéro de version (texte ≤ 50 car.), boutons Supprimer/Modifier.

---
Item Type: US · Parent: F18.19 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.16 Activité — écran Jalons
Dépendances: —
