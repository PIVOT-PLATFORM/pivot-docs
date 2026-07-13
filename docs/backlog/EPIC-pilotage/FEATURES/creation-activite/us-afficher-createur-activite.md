# US18.15.5 — Afficher le créateur de l'activité

**En tant que** chef de projet
**Je veux** voir le créateur de l'activité dans la page Informations générales
**Afin de** identifier qui est à l'origine de l'activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une activité ouverte, when j'affiche la page Informations générales, then la mention « Créé par : nom du créateur » est visible | ⬜ |
| Given le créateur affiché, when je consulte l'information, then le nom correspond à l'utilisateur ayant créé l'activité | ⬜ |
| Error : given un créateur non renseigné, system affiche la mention sans nom erroné et laisse la page consultable | ⬜ |
| Security/Gouvernance : l'information du créateur est en lecture seule et reflète l'utilisateur réel à l'origine de l'activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'historique complet des modifications est couvert par l'US Historique des modifications.

## Notes d'implémentation
- Module pilotage (OPDN), page Informations générales de l'activité.
- Libellé exact : « Créé par : nom du créateur ».

---
Item Type: US · Parent: F18.15 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.11 Création d'une activité
Dépendances: —
