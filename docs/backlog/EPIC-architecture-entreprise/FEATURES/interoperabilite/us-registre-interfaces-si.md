# US50.3.1 — Registre des interfaces SI

**En tant qu'** Architecte
**Je veux** un registre déclaratif des interfaces/API exposées entre SI métier autonomes
**Afin de** cartographier l'interopérabilité du SI Groupe sans dupliquer la brique technique de Gateway

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une interface exposée par une application du SI, when elle est déclarée dans le registre, then elle apparaît avec l'application source, la ou les applications consommatrices et la nature du flux | ⬜ |
| Given une application marquée retirée de la cartographie, when ce statut est appliqué, then les interfaces qu'elle exposait sont signalées comme obsolètes dans le registre | ⬜ |
| Error : given une interface déclarée avec une application source non présente dans la cartographie applicative, system refuse la déclaration | ⬜ |
| Security : seuls les rôles habilités (Architecte) peuvent créer ou modifier une entrée du registre | ⬜ |

## Hors périmètre
- L'API Gateway commune, le bus d'intégration (ESB / iPaaS) et le modèle de données pivot technique sont des briques d'infrastructure hors périmètre du backlog PPM — cette US couvre uniquement le registre déclaratif des interfaces, pas leur implémentation technique.
- Le monitoring runtime des flux (santé, latence, volumétrie) n'est pas couvert par cette US.

## Notes d'implémentation
- Référence les applications cartographiées par [US50.1.1](../cartographie-applicative/us-inventaire-applications.md) pour l'application source et les applications consommatrices.
- Registre purement déclaratif en v1 — pas de découverte automatique des flux réseau/API.

---
Item Type: US · Parent: F50.3 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Dépendances: US50.1.1 (cartographie applicative source)
