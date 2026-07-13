# US18.1.1 — Renseigner les informations générales d'une activité

**En tant que** chef de projet (pilote d'activité)
**Je veux** saisir la description, les gains estimés, la typologie de gains et un commentaire sur les gains
**Afin de** documenter la valeur attendue de l'activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le formulaire d'informations générales, when je le renseigne, then les champs Description, Gains estimés, Typologie de gains et Commentaire sur les gains sont disponibles et obligatoires | ⬜ |
| Given une valeur sélectionnée dans Typologie de gains, when j'observe le label, then un bouton de réinitialisation apparaît à droite du label uniquement lorsqu'une valeur est sélectionnée | ⬜ |
| Given une valeur sélectionnée dans Typologie de gains, when je clique sur le bouton de réinitialisation, then la sélection est vidée | ⬜ |
| Error : given un champ obligatoire vide (Description, Gains estimés, Typologie de gains ou Commentaire), system bloque l'enregistrement et signale le champ manquant | ⬜ |
| Security/Gouvernance : seul le chef de projet pilote de l'activité (ou un administrateur habilité) peut renseigner ces informations | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La saisie des informations structurelles (produit, domaine, capacité) est couverte par l'US Informations structurelles.

## Notes d'implémentation
- Écran Informations générales de l'activité (module pilotage).
- Bouton de réinitialisation contextuel : visible seulement si une valeur est sélectionnée dans Typologie de gains ; le clic vide la sélection.

---
Item Type: US · Parent: F18.1 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: Backlog OPPA (reconstitution v1–v2.1) — US-101
Dépendances: —
