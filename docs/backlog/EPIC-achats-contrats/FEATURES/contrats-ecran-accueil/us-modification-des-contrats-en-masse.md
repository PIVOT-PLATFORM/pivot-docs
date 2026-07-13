# US25.5.12 — Modification des contrats en masse

**En tant que** administrateur plateforme
**Je veux** modifier en masse plusieurs contrats sélectionnés
**Afin d'** appliquer une même mise à jour à un lot de contrats en une opération

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des contrats sélectionnés, when j'affiche l'action de modification en masse, then le bouton indique le nombre de contrats sélectionnés | ⬜ |
| Given un clic sur la modification en masse, when la pop-up s'ouvre, then un avertissement s'affiche et une liste déroulante propose : remplacer CM principal, remplacer suppléant (sélection multiple), remplacer fournisseur, modifier date de fin, coche contrat actif, modifier numéro de contrat | ⬜ |
| Given une modification choisie, when je renseigne le champ « nouvelle valeur », then les boutons « annuler » et « modifier » permettent d'abandonner ou d'appliquer la modification au lot | ⬜ |
| Error : given un utilisateur non administrateur, system n'expose pas le bouton de modification en masse | ⬜ |
| Security/Gouvernance : action accessible uniquement aux administrateurs local et global (A) ; ni P, ni V, ni CM (NON/NON/NON/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La sélection préalable des contrats par coches est couverte par l'US Coches pour la sélection multiple de contrats.

## Notes d'implémentation
- Écran d'accueil des contrats (module OPDN, B.5), bouton de modification en masse réservé aux administrateurs (local + global).
- Pop-up d'avertissement + liste déroulante : remplacer CM principal, remplacer suppléant (sélection multiple), remplacer fournisseur, modifier date de fin, coche contrat actif, modifier numéro de contrat.
- Champ « nouvelle valeur » ; boutons « annuler » / « modifier ».

---
Item Type: US · Parent: F25.5 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: administrateur-plateforme
Source: SPEC_OPDN — B.5 Contrats — écran d'accueil
Dépendances: —
