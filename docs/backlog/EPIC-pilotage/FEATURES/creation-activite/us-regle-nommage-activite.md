# US18.15.2 — Règle de nommage à la création d'une activité

**En tant que** chef de projet
**Je veux** que le nom d'activité respecte des règles d'unicité et de format à la création
**Afin de** éviter les doublons et les noms mal formés dans le référentiel

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un nom déjà porté par une activité du même Type, when je le saisis, then le message « Nom d'activité déjà existant » s'affiche et le bouton Enregistrer/Suivant reste grisé | ⬜ |
| Given l'unicité par Type d'activité, when je crée « BLD-TEST » puis « RUN-TEST », then les deux noms sont autorisés car de types différents | ⬜ |
| Given une comparaison insensible à la casse, when je saisis « testOGN » alors que « TestOGN » existe, then le nom est considéré comme déjà existant | ⬜ |
| Given un nom commençant par un espace, when je le saisis, then le message « Espace(s) en début de nom interdit » s'affiche ; un espace en fin déclenche « Espace(s) en fin de nom interdit » | ⬜ |
| Given l'édition d'une activité existante, when je remets le nom initial, then aucune erreur d'unicité n'est déclenchée | ⬜ |
| Error : given un nom uniquement composé d'espaces, system bloque et grise le bouton Enregistrer/Suivant | ⬜ |
| Security/Gouvernance : seul un chef de projet peut nommer une activité, dans le respect des règles d'unicité par type | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La sélection du type d'activité est couverte par l'US Débuter la création d'une nouvelle activité.

## Notes d'implémentation
- Module pilotage (OPDN), champ Nom de l'onglet Informations générales.
- Unicité vérifiée par couple (Nom, Type d'activité), comparaison insensible à la casse.
- Interdiction des espaces en début/fin et des noms uniquement composés d'espaces ; bouton Enregistrer/Suivant grisé tant que le nom est invalide.

---
Item Type: US · Parent: F18.15 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.11 Création d'une activité
Dépendances: —
