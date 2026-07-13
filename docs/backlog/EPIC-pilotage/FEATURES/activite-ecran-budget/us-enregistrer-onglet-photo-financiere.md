# US18.18.16 — Enregistrer — onglet Photo financière

**En tant que** contrôleur de gestion SI (profil GPP-CGO)
**Je veux** enregistrer des modifications sur une photo financière avec une confirmation renforcée
**Afin de** mettre à jour des données de référence de manière contrôlée et tracée

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'onglet Photo financière, when une modification a été faite, then le bouton d'enregistrement est cliquable (sinon inactif) | ⬜ |
| Given le clic sur enregistrer, when la pop-up s'affiche, then elle indique « Vous allez enregistrer des modifications sur des données de référence. Êtes-vous sûr de vouloir continuer ? » | ⬜ |
| Given la pop-up d'enregistrement, when je la complète, then un commentaire est obligatoire (200 caractères) et les boutons Annuler/Confirmer sont proposés | ⬜ |
| Error : given un commentaire vide, system bloque la confirmation (commentaire obligatoire, 200 caractères) | ⬜ |
| Security/Gouvernance : seuls les profils GPP-CGO peuvent enregistrer des modifications sur les photos financières (données de référence) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'onglet Photo financière et son enregistrement sont post-MVP.

## Notes d'implémentation
- Module pilotage (OPDN), écran Budget, onglet Photo financière, enregistrement (post-MVP).
- Bouton cliquable seulement si modification ; pop-up « Vous allez enregistrer des modifications sur des données de référence. Êtes-vous sûr de vouloir continuer ? » ; commentaire obligatoire (200 car.) ; boutons Annuler/Confirmer.

---
Item Type: US · Parent: F18.18 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: SPEC_OPDN — B.15 Activité — écran Budget
Dépendances: —
