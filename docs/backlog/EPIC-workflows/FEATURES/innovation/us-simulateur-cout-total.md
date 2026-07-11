# US29.13.1 — Simulateur de coût total

**En tant que** administrateur
**Je veux** estimer avant activation le coût mensuel d'un workflow à volume projeté (tâches, crédits, licences, appels IA), avec alerte d'emballement
**Afin de** éviter les pathologies économiques avant qu'elles ne surviennent

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un workflow et un volume projeté, when je lance la simulation, then le coût mensuel estimé (tâches/crédits/licences/IA) s'affiche | ⬜ |
| Given une estimation, when elle dépasse un seuil, then une alerte d'emballement est signalée | ⬜ |
| Error : given des paramètres de volume manquants, system demande les entrées nécessaires avant d'estimer | ⬜ |

---
Item Type: US · Parent: F29.13 · Module: automatisation · Phase: phase-3 · Size: L · Priority: Low
Stage: ⬜
Rôle: administrateur-plateforme
Source: WF-066 · MoSCoW: Could · Lot: Lot 4 · Origine: Bonus B1
Justification: Dossier §7-B1 : éviterait les 3 pathologies économiques documentées
Dépendances: —
