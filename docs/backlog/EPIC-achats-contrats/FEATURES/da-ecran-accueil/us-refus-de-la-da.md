# US25.3.6 — Refus de la demande d'achat

**En tant que** responsable des marchés (vérificateur / valideur)
**Je veux** refuser une demande d'achat à l'étape dont je suis responsable
**Afin de** la renvoyer au prescripteur pour correction

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une DA en attente de mon action, when je clique sur le bouton « Refuser », then une pop-up s'affiche avec un champ commentaire obligatoire | ⬜ |
| Given la pop-up de refus renseignée, when je confirme le refus, then la DA repasse au statut « Brouillon » | ⬜ |
| Error : given un commentaire de refus vide, when je confirme, then l'action est bloquée (commentaire obligatoire) | ⬜ |
| Security/Gouvernance : refus disponible pour P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La correction puis le relancement du workflow après refus sont couverts par les US Modification / Statut.

## Notes d'implémentation
- Écran d'accueil / sous-onglet « Demandes à valider » (module WRAP/OPDN), bouton « Refuser ».
- Pop-up avec commentaire obligatoire ; retour au statut « Brouillon » après refus.

---
Item Type: US · Parent: F25.3 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: responsable-des-marches
Source: SPEC_OPDN — B.3 Demandes d'achats — écran d'accueil
Dépendances: —
