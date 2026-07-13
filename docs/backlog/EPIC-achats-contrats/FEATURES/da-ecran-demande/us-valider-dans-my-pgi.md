# US25.4.25 — Bouton « Valider dans My PGI »

**En tant que** responsable des marchés (vérificateur / valideur)
**Je veux** ouvrir la page PGI de validation via le bouton « Valider dans My PGI »
**Afin de** finaliser la validation de la DA directement dans le PGI

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'étape appropriée du workflow, when je clique sur « Valider dans My PGI », then la page PGI de validation s'ouvre dans une nouvelle fenêtre | ⬜ |
| Given une DA hors contrat ou sur contrat, when j'atteins la dernière étape du workflow, then le bouton « Valider dans My PGI » s'affiche | ⬜ |
| Given une DA de création/modification de contrat, when j'atteins l'avant-dernière étape du workflow, then le bouton « Valider dans My PGI » s'affiche | ⬜ |
| Error : given une étape ne correspondant pas aux règles d'affichage, system n'affiche pas le bouton « Valider dans My PGI » | ⬜ |
| Security/Gouvernance : action ouverte au vérificateur/valideur (V) et à l'administrateur (A), non ouverte au prescripteur (P) ni au contract manager (CM) — matrice P/V/CM/A = NON/OUI/NON/OUI | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le déroulé de la validation côté PGI lui-même.
- L'action « Approuver » du workflow (US dédiée).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), bouton « Valider dans My PGI » ouvrant la page PGI de validation dans une nouvelle fenêtre.
- Règles d'affichage : DA hors contrat et sur contrat → dernière étape ; DA création/modification de contrat → avant-dernière étape.

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: responsable-des-marches
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
