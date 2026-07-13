# US18.18.6 — Liste déroulante de sélection des photos financières

**En tant que** contrôleur de gestion SI (profil GPP-CGO)
**Je veux** disposer d'une liste déroulante filtrant les photos financières selon des libellés normés
**Afin de** ne sélectionner que des photos pertinentes pour l'année en cours

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la liste déroulante des photos, when elle se remplit, then elle propose les photos Jalon A, Jalon B, Jalon C, Jalon D | ⬜ |
| Given la liste déroulante, when elle se remplit, then elle propose les photos « R2- », « R3- », « R4- » suffixées de l'année en cours (ex. R2-2026) | ⬜ |
| Given la liste déroulante, when elle se remplit, then elle propose les photos « CAP » suffixées des 2 derniers chiffres de l'année (ex. CAP26) et les photos « PMT » (deux combinaisons de chiffres, ex. PMT68, PMT79) | ⬜ |
| Error : given une photo dont le libellé ne correspond à aucun de ces filtres, system ne l'affiche pas dans la liste | ⬜ |
| Security/Gouvernance : la liste est en lecture seule sauf pour les profils GPP-CGO | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'onglet Photo financière et cette liste sont post-MVP.

## Notes d'implémentation
- Module pilotage (OPDN), écran Budget, onglet Photo financière, liste déroulante de sélection (post-MVP).
- Filtres : Jalon A/B/C/D ; « R2- »/« R3- »/« R4- » + année en cours ; « CAP » + 2 derniers chiffres ; « PMT » (deux combinaisons de chiffres). Exemple fourni pour 2026 (CAP26, R2-2026, PMT68/PMT79).

---
Item Type: US · Parent: F18.18 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: SPEC_OPDN — B.15 Activité — écran Budget
Dépendances: —
