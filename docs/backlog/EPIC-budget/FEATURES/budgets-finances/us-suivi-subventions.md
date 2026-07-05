# US26.2.5 — Suivi des subventions

**En tant que** contrôleur de gestion
**Je veux** gérer les plans de financement par projet (FEDER, DSIL, fonds vert), les échéances de justification, les taux de réalisation exigés et le risque de reversement
**Afin de** sécuriser la trésorerie réelle conditionnée par les subventions

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet, when un plan de financement est saisi, then les sources (FEDER, DSIL, fonds vert…) et leurs échéances de justification sont suivies | ⬜ |
| Le taux de réalisation exigé et le risque de reversement sont calculés par subvention | ⬜ |
| Error : given une échéance de justification approchant sans pièces, system alerte sur le risque de reversement | ⬜ |
| Security/Gouvernance : les pièces justificatives sont tracées et horodatées | ⬜ |

---
Item Type: US · Parent: F26.2 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Low
Stage: Backlog
Rôle: controleur-de-gestion-si
Source: PP-054 · MoSCoW: Could · Lot: Lot 4 · Origine: Bonus B2
Profils: Privée sous droit public, Publique, État
Justification: Dossier §7-B2 : conditionne la trésorerie réelle
Dépendances: —
