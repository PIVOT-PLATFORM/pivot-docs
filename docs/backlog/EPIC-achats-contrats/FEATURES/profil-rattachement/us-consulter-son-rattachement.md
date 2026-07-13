# US25.2.1 — Consulter son rattachement Direction/division/unité

**En tant que** utilisateur de l'application Achats/Contrats
**Je veux** consulter mon rattachement Direction/division/unité et les droits associés
**Afin de** comprendre les habilitations dont je dispose dans l'application

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un utilisateur connecté, when il ouvre son profil, then son rattachement Direction/division/unité est affiché | ⬜ |
| Given le rattachement affiché, when l'utilisateur le consulte, then il provient automatiquement des codes de l'AD Microsoft | ⬜ |
| Given son rattachement, when l'utilisateur consulte son profil, then il peut visualiser les droits qui en découlent | ⬜ |
| Error : given un code AD non reconnu ou un rattachement introuvable, system affiche un rattachement vide ou un message indiquant l'absence de rattachement | ⬜ |
| Security/Gouvernance : le rattachement est déterminé par l'AD (non modifiable par l'utilisateur) ; consultation ouverte à P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La modification du rattachement (gérée par l'AD Microsoft, hors application).

## Notes d'implémentation
- Rattachement automatique via les codes de l'AD Microsoft ; affichage en lecture seule dans le profil.
- Consultation des droits dérivés du rattachement. Module WRAP/OPDN.

---
Item Type: US · Parent: F25.2 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.2 Profil utilisateur & rattachement
Dépendances: —
