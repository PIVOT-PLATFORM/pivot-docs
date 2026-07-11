# US29.2.5 — IoT et domotique

**En tant que** utilisateur métier
**Je veux** déclencher des actions sur appareils connectés (capteurs, scènes, assistants vocaux) et via la localisation mobile
**Afin de** couvrir des cas d'usage terrain/bâtiment

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un appareil connecté enregistré, when son capteur émet un événement, then le workflow associé se déclenche | ⬜ |
| Given une action sur scène/assistant vocal, when le workflow l'invoque, then l'appareil exécute la commande | ⬜ |
| Error : given un appareil injoignable, system journalise l'échec et n'interrompt pas les autres branches | ⬜ |

---
Item Type: US · Parent: F29.2 · Module: automatisation · Phase: phase-3 · Size: XL · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: WF-059 · MoSCoW: Could · Lot: Lot 4 · Origine: Différenciant IFTTT
Justification: Dossier §6.5 : sans équivalent chez les acteurs pro — pertinent si cas d'usage terrain/bâtiment
Dépendances: —
