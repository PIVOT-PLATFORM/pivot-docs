# US29.7.1 — Credentials centralisés

**En tant que** administrateur
**Je veux** gérer de façon centralisée et chiffrée les identifiants de connexion, réutilisables entre workflows
**Afin de** sécuriser et mutualiser les accès aux systèmes tiers

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un identifiant enregistré, when je l'utilise dans plusieurs workflows, then il est réutilisé sans ressaisie | ⬜ |
| Given des credentials stockés, when ils sont au repos, then ils sont chiffrés | ⬜ |
| Security/Gouvernance : les credentials ne sont jamais exposés en clair dans l'UI ni dans les logs | ⬜ |

---
Item Type: US · Parent: F29.7 · Module: automatisation · Phase: phase-3 · Size: M · Priority: Critical
Stage: Backlog
Source: WF-007 · MoSCoW: Must · Lot: Lot 1 · Origine: Socle 6/6
Justification: Dossier §4 ; renforcé en WF-036 (I4)
Dépendances: —
