# US18.19.3 — Structure du bloc Jalon A

**En tant que** chef de projet (pilote d'activité)
**Je veux** un bloc Jalon A avec ses champs et boutons de gestion
**Afin de** saisir, valider et modifier le jalon A de l'activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un bloc Jalon A, when il s'affiche, then il présente les champs « Type de jalon » et « Date de passage » | ⬜ |
| Given un bloc Jalon A non grisé, when j'agis dessus, then je vois un bouton « Supprimer » (si non grisé), un bouton « Modifier » et un bouton « Valider » (visible tant que non/plus validé) | ⬜ |
| Given un Jalon A validé, when j'active « Modifier », then il se dévalide, autorise les modifications à la volée et réaffiche les boutons « Supprimer » et « Valider » | ⬜ |
| Given des modifications dans le bloc Jalon A, when je clique sur le bouton commun « Enregistrer », then elles sont enregistrées ; la validation, elle, enregistre en même temps qu'elle valide | ⬜ |
| Error : given une date de passage incohérente ou absente à la validation, system empêche la validation du jalon | ⬜ |
| Security/Gouvernance : les actions du bloc Jalon A restent soumises aux droits de l'utilisateur sur l'activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le contenu détaillé du pop-up de confirmation de validation est couvert par l'US « Valider un jalon A/B/C/D ».

## Notes d'implémentation
- Bloc Jalon A (module pilotage, onglet Jalon) : Type, Date de passage, boutons Supprimer/Modifier/Valider.
- Enregistrement via le bouton commun de l'écran, sauf la validation qui enregistre simultanément.

---
Item Type: US · Parent: F18.19 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.16 Activité — écran Jalons
Dépendances: —
