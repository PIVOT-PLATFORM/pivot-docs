# US30.15.9 — Plan de reprise & capitalisation du patrimoine

**En tant que** DSI/RSSI/PMO
**Je veux** cadrer la reprise du patrimoine existant comme un chantier à part entière (outil d'export/import structuré, accompagnement, deadlines, recensement des boards et templates critiques)
**Afin de** ne pas détruire la valeur déjà produite lors d'une bascule ou d'une migration d'outil

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une décision de bascule/migration, when le chantier « Plan de reprise » est arbitré, then un plan documenté (recensement du patrimoine, outillage d'export structuré, accompagnement, deadlines) est acté et diffusable aux directions concernées | ⬜ |
| Given le plan de reprise, when il est exécuté, then chaque board/template critique recensé est soit migré, soit archivé de façon exploitable, avec un taux de reprise mesuré | ⬜ |
| Error : given un patrimoine non transférable identifié, system escalade vers le comité d'arbitrage DSI/RSSI/PMO avec une option de dérogation ou d'archivage | ⬜ |
| Security/Gouvernance : la décision et le taux de reprise sont tracés et revus périodiquement dans le registre de gouvernance | ⬜ |

---
Item Type: US · Parent: F30.15 · Module: collaboratif · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Rôle: groupe:gouvernance-si
Source: Étude interne Klaxoon (EDF) 2026-07 · MoSCoW: Must · Lot: Lot 1 · Origine: Écart terrain (risque n°1)
Justification: Étude interne §3.2 / §5 (action Critique n°1) : « traiter la migration/capitalisation comme un chantier à part entière » — orchestre EN30.13 (import), US30.8.5 (export structuré), US30.9.8 (réversibilité), US30.15.4 (test de sortie), US30.15.7 (archivage GED)
Dépendances: EN30.13, US30.8.5, US30.9.8, US30.15.4, US30.15.7
