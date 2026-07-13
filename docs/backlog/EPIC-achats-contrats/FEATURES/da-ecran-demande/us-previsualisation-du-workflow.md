# US25.4.20 — Prévisualisation du Workflow

**En tant que** acheteur informatique (prescripteur)
**Je veux** prévisualiser les étapes du workflow calculé à partir des paramètres de la DA
**Afin de** vérifier le circuit de validation avant de lancer la demande

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une DA à la création sans paramètres suffisants, when j'affiche la prévisualisation, then elle indique « Aucun workflow n'est configuré avec ces paramètres » et le lancement est impossible | ⬜ |
| Given les paramètres nécessaires renseignés, when ils sont saisis, then la prévisualisation se met à jour et le prescripteur peut visualiser les étapes | ⬜ |
| Given le calcul du workflow, when la DA est en « Brouillon », then il est recalculé ; quand elle passe « En cours » il est figé ; en cas de retour en Brouillon il est recalculé | ⬜ |
| Given le bloc de prévisualisation, when il s'affiche, then un bouton refresh figure à côté du titre pour forcer le recalcul | ⬜ |
| Error : given des paramètres insuffisants, system empêche le lancement du workflow tant qu'aucun workflow n'est configuré | ⬜ |
| Security/Gouvernance : consultation ouverte à P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'exécution du workflow (US « Lancer le workflow », « Approuver », « Refuser »).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), bloc Prévisualisation du Workflow avec bouton refresh à côté du titre.
- Message initial : « Aucun workflow n'est configuré avec ces paramètres ». Calcul au statut Brouillon, figé « En cours », recalculé au retour en Brouillon.

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
