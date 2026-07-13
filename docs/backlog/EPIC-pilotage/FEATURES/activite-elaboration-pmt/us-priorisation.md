# US18.17.3 — Priorisation

**En tant que** chef de projet
**Je veux** attribuer un niveau de priorisation à l'activité via une liste mono-sélection
**Afin de** hiérarchiser l'activité selon son enjeu (obsolescence, valeur métier, adoption)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ « Priorisation » (REF_PRIORISATION), when j'ouvre la liste, then les valeurs proposées sont P0 (obsolescence technique y compris failles cyber), P1 (valeur métier haute, enjeu industriel court terme), P2 (haute, moyen terme), P3 (valeur métier liée à l'adoption utilisateurs) | ⬜ |
| Given le champ « Priorisation », when je sélectionne une valeur, then une seule valeur est retenue (mono-sélection) | ⬜ |
| Error : given une valeur hors référentiel REF_PRIORISATION, system n'autorise pas sa saisie | ⬜ |
| Security/Gouvernance : les valeurs proviennent du référentiel REF_PRIORISATION, non modifiable par le chef de projet | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'administration du référentiel REF_PRIORISATION.

## Notes d'implémentation
- Module pilotage (OPDN), écran Élaboration PMT — informations structurelles, champ liste mono-sélection alimenté par REF_PRIORISATION.
- Valeurs : P0, P1, P2, P3 avec libellés associés.

---
Item Type: US · Parent: F18.17 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.13 Activité — champs Élaboration PMT (informations structurelles)
Dépendances: —
