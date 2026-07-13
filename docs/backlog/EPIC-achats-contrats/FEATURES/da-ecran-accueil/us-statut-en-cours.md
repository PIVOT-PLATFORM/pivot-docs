# US25.3.16 — Statut « En cours »

**En tant que** responsable des marchés (vérificateur / valideur)
**Je veux** disposer du statut « En cours » pendant le déroulé du workflow
**Afin de** identifier les demandes d'achat en cours de vérification et de validation

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une DA au statut « Brouillon », when le workflow est lancé, then la vérification démarre et le statut passe de « Brouillon » à « En cours » | ⬜ |
| Given une DA au statut « En cours », when elle n'a pas encore été approuvée par le valideur final, then elle reste au statut « En cours » | ⬜ |
| Error : given une DA « En cours », when elle est refusée ou modifiée, then elle repasse au statut « Brouillon » (elle ne reste pas « En cours ») | ⬜ |
| Security/Gouvernance : le statut « En cours » est visible pour P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le passage au statut « Validé » après approbation finale est couvert par l'US Validation d'une DA.
- Le retour au statut « Brouillon » est couvert par les US Refus / Modification.

## Notes d'implémentation
- Écran d'accueil / écran de la demande d'achat (module WRAP/OPDN), statut « En cours ».
- Vérification démarrée au lancement du WF (Brouillon → En cours) ; statut maintenu tant que le valideur final n'a pas approuvé.

---
Item Type: US · Parent: F25.3 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: responsable-des-marches
Source: SPEC_OPDN — B.3 Demandes d'achats — écran d'accueil
Dépendances: —
