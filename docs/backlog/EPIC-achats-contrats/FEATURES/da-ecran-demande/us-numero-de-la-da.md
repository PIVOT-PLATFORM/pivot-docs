# US25.4.1 — Entrer le numéro de la DA

**En tant que** acheteur informatique (prescripteur)
**Je veux** saisir le numéro de la demande d'achat dans un champ texte de 10 caractères unique
**Afin de** identifier la DA de façon non ambiguë avant de lancer le workflow

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ « Numéro de DA », when je survole le champ, then l'info-bulle affiche « Le numéro de DA doit faire 10 caractères et être unique » | ⬜ |
| Given un numéro de 10 caractères non encore utilisé, when je le saisis, then il est accepté et la DA peut être lancée | ⬜ |
| Error : given un numéro déjà utilisé par une autre DA, system empêche le lancement de la DA (unicité obligatoire) | ⬜ |
| Error : given un champ Numéro de DA vide ou d'une longueur différente de 10 caractères, system bloque (champ obligatoire, étoile rouge) | ⬜ |
| Security/Gouvernance : saisie ouverte au prescripteur (P) et au contract manager (CM) et à l'administrateur (A) ; non ouverte au vérificateur/valideur (V) — matrice P/V/CM/A = OUI/NON/OUI/OUI | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La consultation de la DA dans MyPGI (US dédiée « Consulter dans MyPGI »).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), champ texte contraint à 10 caractères, contrôle d'unicité bloquant au lancement.
- Info-bulle exacte : « Le numéro de DA doit faire 10 caractères et être unique ».

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
