# US30.4.4 — Rituels récurrents

**En tant que** facilitateur
**Je veux** dupliquer automatiquement un modèle à intervalle régulier et retrouver l'historique des occurrences précédentes au même endroit
**Afin de** dérouler des rituels d'équipe récurrents (rétrospective, point d'équipe) sans reconstruire le board à chaque fois

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un modèle marqué comme récurrent, when l'échéance suivante arrive, then le système propose une nouvelle occurrence dupliquée du modèle | ⬜ |
| Historique des occurrences précédentes consultable et navigable depuis la même bibliothèque | ⬜ |
| Error : given une planification invalide (date passée, modèle supprimé), system rejette la création et notifie le facilitateur | ⬜ |
| Security/Gouvernance : accès à l'historique des occurrences soumis aux mêmes droits que le board d'origine | ⬜ |

---
Item Type: US · Parent: F30.4 · Module: collaboratif · Phase: phase-3 · Size: L · Priority: Low
Stage: Backlog
Source: Benchmark 2026-07 (cahier FigJam EF-FAC-05) · MoSCoW: Should · Lot: Lot 2 · Origine: Différenciant FigJam (pages + historique d'occurrences), non repris dans le dossier de synthèse
Justification: Cahier FigJam §3.3 EF-FAC-05 — répond à la limite documentée « pas de rituels récurrents structurés » (§2.3 FigJam) ; distinct de US30.4.3 (gouvernance éditoriale d'une bibliothèque de modèles) : ici, la récurrence temporelle et l'historique des instances d'un même rituel
Dépendances: —
