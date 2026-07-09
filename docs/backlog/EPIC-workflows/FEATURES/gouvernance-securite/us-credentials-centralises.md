# US29.7.1 — Credentials centralisés

**En tant que** administrateur
**Je veux** gérer de façon centralisée et chiffrée les identifiants de connexion, réutilisables entre workflows
**Afin de** sécuriser et mutualiser les accès aux systèmes tiers

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un identifiant enregistré, when je l'utilise dans plusieurs workflows, then il est réutilisé sans ressaisie | ⬜ |
| Given des credentials stockés, when ils sont au repos, then ils sont chiffrés | ⬜ |
| Given un identifiant expiré, révoqué ou dont l'authentification échoue, when la plateforme le détecte, then les workflows concernés sont signalés et une reconnexion guidée est proposée à leur propriétaire | ⬜ |
| Security/Gouvernance : les credentials ne sont jamais exposés en clair dans l'UI ni dans les logs | ⬜ |

---
Item Type: US · Parent: F29.7 · Module: automatisation · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Source: WF-007 · MoSCoW: Must · Lot: Lot 1 · Origine: Socle 6/6
Justification: Dossier §4 ; renforcé en WF-036 (I4) ; AC détection/reconnexion ajoutée lors du raffinage benchmark 2026-07-08 (cahier IFTTT ENF-04 : « détection des services cassés et reconnexion guidée », absente des 6 autres cahiers mais généralisable — un identifiant expiré est le premier facteur d'échec silencieux documenté §8-I7)
Dépendances: —
