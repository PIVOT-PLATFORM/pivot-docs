# US18.19.13 — Modifier un jalon grisé

**En tant que** chef de projet (pilote d'activité)
**Je veux** dégriser un jalon grisé via le bouton « Modifier »
**Afin de** corriger un jalon validé sans perdre sa référence tant que je ne revalide pas

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un jalon grisé, when il s'affiche, then le bouton « Modifier » est visible (uniquement dans ce cas) | ⬜ |
| Given un jalon grisé, when j'active « Modifier », then il réaffiche les boutons « Supprimer » et « Valider » et redevient éditable | ⬜ |
| Given un jalon A/B/C/D dévalidé par « Modifier », when je le modifie sans revalider, then la référence planning/budget ne change pas | ⬜ |
| Given un jalon A/B/C/D modifié, when je le revalide, then la REF_Jalon_X (budget et planning) est écrasée | ⬜ |
| Error : given un jalon non grisé, when je cherche le bouton « Modifier » de dégrisage, then system ne l'affiche pas | ⬜ |
| Security/Gouvernance : la modification d'un jalon grisé reste soumise aux droits de l'utilisateur sur l'activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le contenu du pop-up de confirmation de revalidation est couvert par l'US « Valider un jalon A/B/C/D ».

## Notes d'implémentation
- Bouton « Modifier » visible seulement sur jalon grisé (module pilotage, onglet Jalon) ; dévalide A/B/C/D pour édition ; la REF_Jalon_X (budget + planning) n'est écrasée qu'à la revalidation.

---
Item Type: US · Parent: F18.19 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.16 Activité — écran Jalons
Dépendances: —
