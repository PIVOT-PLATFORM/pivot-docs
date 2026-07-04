# US36.1.1 — Interface comptabilité publique

**En tant que** DSI
**Je veux** des connecteurs avec les SI financiers publics (M57 ; Coriolis, Grand Angle…) important les réalisations avec rapprochement automatique
**Afin de** fiabiliser le réalisé budgétaire et supprimer la ressaisie (critère discriminant n°1)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un SI financier public cible, when le connecteur s'exécute, then les réalisations sont importées et rapprochées automatiquement des projets | ⬜ |
| Le rapprochement identifie les écarts entre engagé/réalisé importé et données PPM | ⬜ |
| Error : given un rapprochement en échec (donnée non appariée), system la met en exception plutôt que de l'ignorer | ⬜ |
| Security/Gouvernance : les imports financiers sont tracés (source, horodatage) — traçabilité | ⬜ |

---
Item Type: US · Parent: F36.1 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: High
Stage: Backlog
Source: PP-017 · MoSCoW: Must (conditionnel) · Lot: Lot 2 · Origine: Différenciant PM élevé au rang d'exigence + Insight I2
Profils: Privée sous droit public, Publique, État
Justification: Dossier §8-I2 : critère discriminant n°1 ; cas Strasbourg, gain 1 j -> 1 h (Haute-Savoie)
Dépendances: —
