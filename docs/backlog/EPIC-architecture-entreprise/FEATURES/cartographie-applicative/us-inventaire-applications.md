# US50.1.1 — Inventaire des applications

**En tant que** DSI Groupe / Architecte
**Je veux** inventorier les applications du SI (nom, propriétaire métier, criticité, statut de cycle de vie)
**Afin de** disposer d'une cartographie applicative de référence à l'échelle du Groupe

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une application du SI, when un Architecte la déclare, then elle est enregistrée avec nom, propriétaire métier (rattaché à une unité organisationnelle), criticité et statut de cycle de vie | ⬜ |
| Given une application déjà cartographiée, when son propriétaire métier change, then la cartographie reflète le nouveau rattachement organisationnel | ⬜ |
| Error : given une application déclarée sans propriétaire métier rattachable à une unité organisationnelle existante, system refuse l'enregistrement | ⬜ |
| Security : seuls les rôles habilités (Architecte, DSI Groupe) peuvent créer/modifier une entrée de cartographie | ⬜ |
| A11y : le formulaire de saisie et la liste de cartographie sont conformes WCAG 2.1 AA (labels explicites, navigation clavier) | ⬜ |

## Hors périmètre
- Le rattachement automatique à un Projet PIVOT (au sens du modèle Application → Projet) n'est pas garanti — une application cartographiée ici peut, si pertinent, correspondre à une Application au sens de ce modèle, sans que ce soit systématique ni automatisé dans cette US.
- La détection de doublons/redondances fonctionnelles entre applications cartographiées est traitée par [US50.1.2](us-detection-doublons.md), pas ici.
- L'inventaire de la dette technique liée à une application est traité par [US50.4.1](../dette-technique/us-inventaire-dette-technique-groupe.md).

## Notes d'implémentation
- Le propriétaire métier référence une unité organisationnelle du référentiel organisationnel **EN49.1** ([E49](../../../EPIC-organisation-gouvernance-dsi/README.md)) — ne pas redéfinir de modèle organisationnel ad hoc dans cette US.
- Une application cartographiée peut, si pertinent, correspondre à une **Application** au sens **EN18.9** ([E18](../../../EPIC-pilotage/README.md)) — rattachement optionnel, à confirmer au Gate 1 selon le besoin réel du client.
- Statut de cycle de vie suggéré : en projet / en production / en fin de vie / retirée.

---
Item Type: US · Parent: F50.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: EN49.1 (référentiel organisationnel — rattachement du propriétaire métier), EN18.9 (rattachement optionnel à un Projet)
