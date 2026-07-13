# US25.6.1 — Texte de dernière modification

**En tant que** utilisateur final
**Je veux** voir la mention de dernière modification en haut de l'écran du contrat en visualisation
**Afin de** savoir qui a modifié le contrat en dernier et à quel moment

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un contrat consulté en mode visualisation, when l'écran s'affiche, then la mention « Dernière modification : nom et prénom de l'utilisateur - date et heure » est affichée | ⬜ |
| Given un contrat qui vient d'être modifié et enregistré, when je le rouvre en visualisation, then la mention reflète le nom, prénom, date et heure de la dernière modification | ⬜ |
| Error : given un contrat sans historique de modification exploitable, system affiche la mention sans valeur plutôt qu'une erreur | ⬜ |
| Security/Gouvernance : la mention est une information de visualisation, accessible à l'utilisateur final ayant le droit de consulter le contrat (aucune saisie) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'historique complet des modifications (versions successives) n'est pas couvert par cette US.

## Notes d'implémentation
- Écran des contrats (module OPDN), texte affiché en visualisation uniquement, non éditable.
- Format : « Dernière modification : nom et prénom de l'utilisateur - date et heure ».

---
Item Type: US · Parent: F25.6 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.6 Contrats — écran des contrats
Dépendances: —
