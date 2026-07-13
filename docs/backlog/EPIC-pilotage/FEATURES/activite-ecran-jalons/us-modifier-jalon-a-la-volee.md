# US18.19.11 — Modifier un jalon à la volée

**En tant que** chef de projet (pilote d'activité)
**Je veux** modifier directement dans la carte les jalons non grisés
**Afin d'** ajuster leurs champs sans étape de dévalidation

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un jalon non grisé, when je le modifie, then je peux éditer directement dans la carte les champs Date de passage, Date de sécurisation, Avis de sécurisation et Numéro de version | ⬜ |
| Given un jalon non grisé, when je tente d'éditer le champ « Type de jalon », then il n'est pas modifiable | ⬜ |
| Given des modifications à la volée, when je clique sur le bouton global « Enregistrer », then elles sont enregistrées sans pop-up | ⬜ |
| Error : given une valeur invalide dans un champ éditable (date, avis, numéro de version), system refuse la valeur | ⬜ |
| Security/Gouvernance : la modification à la volée reste soumise aux droits de l'utilisateur sur l'activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le dégrisage d'un jalon validé (bouton « Modifier ») est couvert par l'US « Modifier un jalon grisé ».

## Notes d'implémentation
- Édition à la volée des jalons non grisés (module pilotage, onglet Jalon) ; « Type de jalon » non modifiable ; champs éditables : Date de passage, Date de sécurisation, Avis de sécurisation, Numéro de version ; enregistrement via le bouton global sans pop-up.

---
Item Type: US · Parent: F18.19 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.16 Activité — écran Jalons
Dépendances: —
