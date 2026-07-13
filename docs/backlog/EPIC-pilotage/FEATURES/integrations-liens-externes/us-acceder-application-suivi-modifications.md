# US18.10.1 — Accéder à l'application de suivi des modifications (logs)

**En tant que** utilisateur final
**Je veux** accéder depuis le bas des écrans à l'application de consultation des historiques de modifications
**Afin de** retracer les changements effectués sur une activité, un budget ou un jalon

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un écran d'activité, de budget ou de jalon, when je regarde le bas de l'écran, then un lien vers l'application de suivi des modifications (logs) est présent | ⬜ |
| Given ce lien en bas d'écran, when je clique dessus, then l'application de consultation des historiques s'ouvre sur le contexte concerné | ⬜ |
| Error : given l'application de suivi des modifications indisponible, when je clique sur le lien, then un message explicite est affiché sans bloquer l'écran d'origine | ⬜ |
| Security/Gouvernance : l'accès aux historiques respecte les habilitations de l'utilisateur sur le périmètre consulté | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'application de consultation des historiques elle-même (son moteur, son stockage) n'est pas couverte par cette US.
- Les autres liens utiles intégrés sont couverts par l'US Disposer de liens utiles intégrés.

## Notes d'implémentation
- Lien en pied des écrans activité / budget / jalon (module pilotage) vers l'application de consultation des historiques.

---
Item Type: US · Parent: F18.10 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Backlog OPPA (reconstitution v1–v2.1) — US-1001
Dépendances: —
