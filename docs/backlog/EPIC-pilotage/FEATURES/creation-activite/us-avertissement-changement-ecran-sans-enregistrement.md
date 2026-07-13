# US18.15.10 — Message d'avertissement au changement d'écran/onglet sans enregistrement

**En tant que** chef de projet
**Je veux** être averti avant de quitter un onglet sans avoir enregistré mes modifications
**Afin de** éviter de perdre ma saisie par inadvertance

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des champs obligatoires remplis et non enregistrés (Cas 1), when je change d'onglet/écran, then une pop-up titrée « Modifications non sauvegardées » affiche « Vous vous apprêtez à quitter l'onglet sans sauvegarder vos modifications. Voulez-vous les enregistrer ? » avec les boutons « Continuer sans enregistrer » / « Enregistrer » et une croix | ⬜ |
| Given des champs obligatoires non remplis (Cas 2), when je change d'onglet/écran, then la pop-up affiche « L'ensemble des champs obligatoires ne sont pas remplis… Voulez-vous continuer ? » avec les boutons « Continuer sans enregistrer » / « Reprendre mes modifications » | ⬜ |
| Given l'onglet Budget, when je le quitte sans enregistrer, then le texte spécifique « … Êtes-vous sûr de vouloir continuer ? » est affiché | ⬜ |
| Given la pop-up d'avertissement, when je clique sur « Enregistrer » (Cas 1) ou « Reprendre mes modifications » (Cas 2), then mes modifications sont conservées ; « Continuer sans enregistrer » les abandonne | ⬜ |
| Error : given un clic sur la croix, system referme la pop-up sans quitter l'onglet ni perdre la saisie | ⬜ |
| Security/Gouvernance : l'avertissement s'applique à tout chef de projet éditant une activité pour prévenir la perte de données | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La logique d'enregistrement des données de chaque onglet est couverte par les US de saisie correspondantes.

## Notes d'implémentation
- Module pilotage (OPDN), pop-up d'avertissement au changement d'onglet/écran sans enregistrement.
- Cas 1 (obligatoires remplis) : titre « Modifications non sauvegardées », boutons « Continuer sans enregistrer » / « Enregistrer » + croix.
- Cas 2 (obligatoires non remplis) : boutons « Continuer sans enregistrer » / « Reprendre mes modifications » ; onglet Budget avec texte spécifique « … Êtes-vous sûr de vouloir continuer ? ».

---
Item Type: US · Parent: F18.15 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.11 Création d'une activité
Dépendances: —
