# US18.16.5 — Derniers faits marquants

**En tant que** chef de projet (pilote d'activité)
**Je veux** saisir les derniers faits marquants de l'activité, uniquement en modification
**Afin de** tracer les évènements récents avec leur date et heure de mise à jour

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une activité en modification, when j'accède au champ Derniers faits marquants, then je peux saisir jusqu'à 400 caractères | ⬜ |
| Given une nouvelle activité en création, when l'écran s'affiche, then le champ Derniers faits marquants est grisé (non saisissable) | ⬜ |
| Given je modifie les faits marquants, when j'enregistre, then le titre « Dernier fait marquant (date heure) » voit sa partie (date heure) mise à jour automatiquement | ⬜ |
| Error : given une saisie atteignant 400 caractères, when je continue à saisir, then le système empêche la saisie au-delà de la limite | ⬜ |
| Security/Gouvernance : seul le chef de projet pilote de l'activité (ou un administrateur habilité) peut modifier les faits marquants | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'historisation des versions successives des faits marquants n'est pas couverte ici.
- L'enregistrement global de l'écran est couvert par l'US Enregistrer informations générales.

## Notes d'implémentation
- Écran Activité — Informations générales (module pilotage), champ texte 400 caractères.
- Grisé à la création, saisissable seulement en modification.
- Titre « Dernier fait marquant (date heure) » : partie (date heure) rafraîchie automatiquement à chaque modification.

---
Item Type: US · Parent: F18.16 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.12 Activité — champs Informations générales
Dépendances: —
