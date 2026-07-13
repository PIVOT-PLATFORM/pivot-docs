# US25.3.11 — Onglet « Toutes les demandes »

**En tant que** utilisateur de l'application Achats/Contrats
**Je veux** consulter l'onglet « Toutes les demandes »
**Afin de** accéder à l'ensemble des demandes d'achat relevant de mon périmètre

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'onglet « Toutes les demandes », when je l'ouvre, then je vois toutes les DA (ouvertes et fermées) accessibles selon mes droits par Direction / Division / Unité | ⬜ |
| Given la liste, when elle s'affiche, then elle est triée par date de début, avec les colonnes N° et Résumé, Acteur attendu, Prescripteur, Date début, Montant, Structure, Statut | ⬜ |
| Given un utilisateur habilité, when il consulte la liste, then il voit les DA de son unité d'affectation (hors externe) et de ses détachements, et celles de sa division/direction si le rôle est déclaré à ce niveau | ⬜ |
| Error : given un prescripteur externe, when il ouvre l'onglet, then il ne voit que ses propres DA | ⬜ |
| Security/Gouvernance : accès par Direction/Division/Unité selon les droits ; onglet disponible pour P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La définition des rattachements (unité d'affectation, détachements) est couverte par les US Profil / rattachement.

## Notes d'implémentation
- Écran d'accueil, sous-onglet « Toutes les demandes » (module WRAP/OPDN).
- Périmètre de visibilité : unité d'affectation hors externe + détachements ; division/direction si rôle déclaré ; prescripteur externe limité à ses propres DA. Tri par date de début.

---
Item Type: US · Parent: F25.3 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.3 Demandes d'achats — écran d'accueil
Dépendances: —
