# US29.6.2 — Base de données native

**En tant que** maker
**Je veux** utiliser des tables natives liées aux workflows (lecture/écriture/déclenchement), non facturées à l'usage
**Afin de** stocker et déclencher sur des données sans outil externe

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une table native, when un workflow y lit/écrit, then les données persistent et sont partagées entre workflows | ⬜ |
| Given une modification de ligne, when elle survient, then un workflow peut être déclenché | ⬜ |
| Error : given une écriture violant une contrainte, system rejette l'opération avec un message explicite | ⬜ |

---
Item Type: US · Parent: F29.6 · Module: automatisation · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Source: WF-028 · MoSCoW: Should · Lot: Lot 3 · Origine: 3/6 (Zapier, AP, PA Dataverse)
Justification: Dossier §5.2 : le workflow absorbe le datastore
Dépendances: —
