# US18.18.19 — Comparaison des photos financières

**En tant que** contrôleur de gestion SI (profil GPP-CGO)
**Je veux** afficher une seconde photo financière sous la première pour les comparer
**Afin de** analyser les écarts entre photos d'une même activité ou d'activités liées

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'onglet Photos financières, when j'affiche une photo, then je peux afficher en dessous une autre photo financière de la même activité (idéalement 2 photos comparées) | ⬜ |
| Given une activité de type GRP/TRA, when je compare, then je peux afficher les photos financières des activités liées | ⬜ |
| Given la comparaison sur activités liées, when je sélectionne, then je choisis entre les données PDS ou PMT | ⬜ |
| Error : given une activité sans seconde photo disponible, system n'affiche pas de comparaison sans erreur | ⬜ |
| Security/Gouvernance : la comparaison est en lecture seule et respecte les droits de consultation, l'écriture restant réservée aux profils GPP-CGO | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La comparaison des photos financières est post-MVP.

## Notes d'implémentation
- Module pilotage (OPDN), écran Budget, onglet Photos financières, comparaison (post-MVP).
- Affichage d'une autre photo financière de la même activité en dessous (idéalement 2) ; pour GRP/TRA, photos des activités liées avec choix PDS ou PMT.

---
Item Type: US · Parent: F18.18 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Low
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: SPEC_OPDN — B.15 Activité — écran Budget
Dépendances: —
