# US18.18.5 — Affichage de l'onglet Photo financière

**En tant que** contrôleur de gestion SI (profil GPP-CGO)
**Je veux** consulter l'onglet Photo financière et sélectionner une photo dans une liste déroulante
**Afin de** analyser les données figées d'une photo financière de l'activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'onglet Photo financière, when il s'affiche, then une liste déroulante permet de sélectionner la photo à afficher | ⬜ |
| Given la liste déroulante, when elle se remplit, then elle ne contient que les photos ayant des données | ⬜ |
| Given une photo (ex. pour 2026), when elle est disponible, then les rubriques proposées sont notamment PMT68, CAP26, Jalon A, Jalon B, Jalon C, Jalon D, R2-2026, R3-2026, R4-2026, PMT79 | ⬜ |
| Given aucune photo sélectionnée, when j'observe les boutons, then ils sont grisés tant qu'aucune photo n'est sélectionnée | ⬜ |
| Error : given une photo sans données, system ne la propose pas dans la liste déroulante | ⬜ |
| Security/Gouvernance : l'onglet est en lecture seule sauf pour les profils GPP-CGO | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'onglet Photo financière est post-MVP.
- La règle de filtrage précise des libellés de photos, couverte par l'US Liste déroulante de sélection des photos.

## Notes d'implémentation
- Module pilotage (OPDN), écran Budget, onglet Photo financière (post-MVP).
- Liste déroulante limitée aux photos avec données ; rubriques ex. 2026 : PMT68, CAP26, Jalon A/B/C/D, R2-2026, R3-2026, R4-2026, PMT79 ; boutons grisés sans sélection ; lecture seule sauf GPP-CGO.

---
Item Type: US · Parent: F18.18 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: SPEC_OPDN — B.15 Activité — écran Budget
Dépendances: —
