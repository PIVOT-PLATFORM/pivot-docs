# US29.8.4 — Déploiement VPC

**En tant que** DSI
**Je veux** exécuter la solution dans le cloud privé du client, en intermédiaire entre SaaS et self-host
**Afin de** atteindre la classe B de souveraineté sans exploiter l'infra soi-même

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un VPC client, when la solution y est déployée, then les exécutions ont lieu dans le cloud privé du client | ⬜ |
| Given ce mode, when je le compare au SaaS, then les données restent dans le périmètre réseau du client | ⬜ |
| Security/Gouvernance : l'isolation réseau du VPC est garantie et documentée | ⬜ |

---
Item Type: US · Parent: F29.8 · Module: automatisation · Phase: phase-3 · Size: XL · Priority: Medium
Stage: ⬜
Source: WF-044 · MoSCoW: Could · Lot: Lot 3 · Origine: Différenciant Gumloop
Justification: Dossier §6.6 : classe B de souveraineté
Dépendances: —
