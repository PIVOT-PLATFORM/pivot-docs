# US29.7.6 — Inventaire et propriétaires

**En tant que** administrateur
**Je veux** tenir un inventaire des workflows avec propriétaire obligatoire, dépendances, connexions, criticité et reporting d'usage consolidé
**Afin de** lutter contre le shadow IT de workflows

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un workflow, when il est créé, then un propriétaire est obligatoire avant activation | ⬜ |
| Given l'inventaire, when je le consulte, then je vois dépendances, connexions, criticité et usage consolidé par workflow | ⬜ |
| Given le départ ou le changement de rôle d'un propriétaire, when un administrateur transfère la propriété d'un workflow, then le nouveau propriétaire est enregistré sans interruption du workflow | ⬜ |
| Security/Gouvernance : les workflows sans propriétaire ou orphelins sont détectés et signalés | ⬜ |

---
Item Type: US · Parent: F29.7 · Module: automatisation · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Source: WF-034 · MoSCoW: Must · Lot: Lot 2 · Origine: PA (admin center) généralisé + I5
Justification: Dossier §8-I5 : contre le shadow IT de workflows ; AC de transfert de propriété ajoutée lors du raffinage benchmark 2026-07-08 (cahier Zapier §2.2 : dossiers avec propriétaires et transfert de propriété — nuance absente du dossier de synthèse, l'inventaire seul ne suffit pas si le départ d'un propriétaire n'a pas d'action de transfert explicite)
Dépendances: —
