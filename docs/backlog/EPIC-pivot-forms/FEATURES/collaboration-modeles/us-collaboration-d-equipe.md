# US42.9.2 — Collaboration d'équipe

**En tant que** concepteur de formulaire
**Je veux** inviter des collaborateurs à éditer et commenter un formulaire, sans coût additionnel par siège
**Afin de** co-construire un formulaire en équipe, comme les autres modules collaboratifs PIVOT

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un formulaire en édition, when un collaborateur déclaré le modifie en parallèle, then les changements convergent sans écrasement silencieux (verrouillage de section ou fusion, selon le modèle retenu par EN42.1) | ⬜ |
| Given un commentaire laissé sur un champ, when un autre collaborateur ouvre le formulaire, then le commentaire est visible et rattaché au bon champ | ⬜ |
| Error : given deux collaborateurs modifiant simultanément le même champ, when le conflit ne peut pas être fusionné automatiquement, then chacun est informé explicitement plutôt que de perdre une modification sans préavis | ⬜ |
| Security : un collaborateur ne peut être ajouté que par un propriétaire du formulaire (US42.7.1) ; ses droits (édition/commentaire seul) sont explicites et révocables | ⬜ |

## Hors périmètre

- Édition collaborative en temps réel caractère par caractère (à la manière d'un éditeur de texte partagé) — hors périmètre, la co-édition peut rester asynchrone ou par verrouillage de section

## Notes d'implémentation

- « Sans surcoût de siège » signifie que l'ajout de collaborateurs n'est pas soumis à une licence par utilisateur distincte de la licence PIVOT déjà en place pour le tenant

---
Item Type: US · Parent: F42.9 · Module: forms · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Source: FRM-902 · MoSCoW: Should · Origine: Formbricks (seats illimités), Tally
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
