# US18.19.4 — Structure du bloc Jalon B / C / D / ABC / BC

**En tant que** chef de projet (pilote d'activité)
**Je veux** un bloc jalon de sécurisation (B, C, D, ABC, BC) avec ses champs et son lien vers les CR
**Afin de** saisir la sécurisation du jalon et accéder à ses comptes rendus

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un bloc Jalon B, C, D, ABC ou BC, when il s'affiche, then il présente les champs « Type de jalon », « Date de passage », « Date de sécurisation » et « Avis de sécurisation » (liste REF_AVIS_SECU : OK, OK avec réserves, KO) | ⬜ |
| Given ce bloc, when il s'affiche, then il propose un lien « Consulter les CR de Sécurisation » (vers SharePoint) | ⬜ |
| Given ce bloc non grisé, when j'agis dessus, then je vois les boutons « Supprimer », « Modifier » et « Valider » selon la même logique que le Jalon A (Modifier dévalide et autorise les modifications à la volée) | ⬜ |
| Error : given un avis de sécurisation hors liste REF_AVIS_SECU, system refuse la valeur | ⬜ |
| Security/Gouvernance : l'accès aux CR de sécurisation reste soumis aux droits SharePoint de l'utilisateur | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les règles de copie planning/budget à la validation sont couvertes par l'US « Valider un jalon A/B/C/D ».

## Notes d'implémentation
- Bloc jalon de sécurisation B/C/D/ABC/BC (module pilotage, onglet Jalon) : Type, Date de passage, Date de sécurisation, Avis de sécurisation (REF_AVIS_SECU), lien SharePoint « Consulter les CR de Sécurisation », boutons Supprimer/Modifier/Valider.

---
Item Type: US · Parent: F18.19 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.16 Activité — écran Jalons
Dépendances: —
