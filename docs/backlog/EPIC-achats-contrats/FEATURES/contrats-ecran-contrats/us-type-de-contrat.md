# US25.6.11 — Type de contrat

**En tant que** contract manager
**Je veux** sélectionner le type de contrat dans une liste définie en administration
**Afin de** déterminer le workflow applicable aux demandes d'achat sur ce contrat

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Type de contrat, when j'ouvre la liste, then elle propose les types définis en administration (onglet « type de contrat ») | ⬜ |
| Given une direction, division et unité renseignées sur le contrat, when j'ouvre la liste Type de contrat, then elle est filtrée selon ces direction/division/unité | ⬜ |
| Given un type de contrat sélectionné, when une DA sur contrat utilise ce contrat, then le workflow de la DA est défini à partir de ce type de contrat | ⬜ |
| Error : given un champ Type de contrat vide à l'enregistrement, system bloque (champ obligatoire, étoile rouge) | ⬜ |
| Security/Gouvernance : saisie réservée au contract manager et à l'administrateur ; les valeurs de la liste sont gérées en administration | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La gestion des types de contrat en administration (onglet « type de contrat »).
- La construction détaillée du workflow des DA sur contrat.

## Notes d'implémentation
- Écran des contrats (module OPDN), liste obligatoire alimentée par l'administration (onglet « type de contrat »).
- Types filtrés selon direction/division/unité du contrat ; le workflow de la DA sur contrat est défini à partir de cet élément.

---
Item Type: US · Parent: F25.6 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: contract-manager
Source: SPEC_OPDN — B.6 Contrats — écran des contrats
Dépendances: —
