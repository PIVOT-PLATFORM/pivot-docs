# US50.1.2 — Détection de doublons

**En tant qu'** Architecte
**Je veux** être alerté quand deux applications cartographiées couvrent la même capacité métier
**Afin de** réduire les redondances fonctionnelles du SI Groupe

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given deux applications cartographiées déclarant la même capacité métier, when la cartographie est analysée, then une alerte de doublon potentiel est levée | ⬜ |
| Given une alerte de doublon potentiel, when un Architecte la qualifie (doublon confirmé / faux positif), then la qualification est tracée avec son auteur et sa date | ⬜ |
| Error : given une application sans capacité métier renseignée, system exclut cette application de la détection et le signale explicitement plutôt que de l'ignorer silencieusement | ⬜ |
| Security : seuls les rôles habilités (Architecte, DSI Groupe) peuvent qualifier une alerte de doublon | ⬜ |

## Hors périmètre
- L'algorithme de détection sémantique avancée (similarité textuelle, rapprochement par IA) n'est pas requis en v1 : un rapprochement déclaratif par capacité métier taguée sur chaque application suffit.
- La décision de rationalisation (fusion, retrait d'une des applications en doublon) relève du comité d'architecture ([US50.2.1](../comite-architecture/us-workflow-comite-architecture.md)), pas de cette US : cette US se limite à détecter et qualifier, pas à décider.

## Notes d'implémentation
- S'appuie sur la cartographie produite par [US50.1.1](us-inventaire-applications.md) (nom, propriétaire, capacité métier taguée par application).
- Le tag « capacité métier » peut rester un champ libre en v1 ; un référentiel structuré de capacités métier est une évolution possible hors périmètre de cette US.

---
Item Type: US · Parent: F50.1 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: Backlog
Dépendances: US50.1.1 (cartographie applicative source)
