# US25.5.3 — Suppression d'un contrat

**En tant que** contract manager
**Je veux** supprimer un contrat depuis le mode modification après confirmation
**Afin de** retirer un contrat obsolète et les droits CM devenus inutiles

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un contrat ouvert en modification, when j'affiche la barre d'actions, then le bouton « supprimer » est accessible (il n'est pas accessible hors du mode modification) | ⬜ |
| Given un clic sur « supprimer », when la confirmation s'affiche, then le message « Etes vous sur de vouloir supprimer le contrat ? » est présenté avant toute suppression | ⬜ |
| Given une suppression confirmée, when le contrat est supprimé, then les droits CM sont retirés aux CM attachés à ce contrat qui ne sont pas CM sur d'autres contrats de même niveau | ⬜ |
| Error : given un contrat en visualisation (hors modification), system n'expose pas le bouton « supprimer » | ⬜ |
| Security/Gouvernance : seuls les contract managers (CM) et les administrateurs (A) peuvent supprimer un contrat, sur les niveaux où ils ont les droits (NON/NON/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le passage en mode modification est couvert par l'US Modification d'un contrat.
- La révocation détaillée des rôles au niveau organisationnel relève du module Administration.

## Notes d'implémentation
- Écran d'accueil des contrats (module OPDN, B.5), bouton « supprimer » actif uniquement en modification.
- Message de confirmation exact : « Etes vous sur de vouloir supprimer le contrat ? ».
- Effet de bord : révocation des droits CM des CM non rattachés à d'autres contrats de même niveau.

---
Item Type: US · Parent: F25.5 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: contract-manager
Source: SPEC_OPDN — B.5 Contrats — écran d'accueil
Dépendances: —
