# US40.1.3 — Classe de souveraineté par profil

**En tant que** RSSI
**Je veux** dériver la classe de souveraineté (A/B/C) et l'hébergement exigé depuis le profil et la sensibilité des données
**Afin de** traiter la souveraineté comme un curseur indexé sur le statut, pas un interrupteur

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un profil et la sensibilité des données, when la classe est calculée, then une classe A/B/C et un hébergement cible (SaaS FR/UE, dédié, on-premise) sont prescrits | ⬜ |
| Given une classe C sur données sensibles, when un hébergement non conforme est choisi, then le système bloque ou alerte | ⬜ |
| Security/Gouvernance : la dérivation de classe est traçable et opposable (audit) | ⬜ |

---
Item Type: US · Parent: F40.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Critical
Stage: Backlog
Source: PP-A03 · MoSCoW: Must · Lot: Lot 1 · Origine: Synthèse v2
Profils: Grand groupe, Privée sous droit public, Publique, État
Justification: Synthèse v2 §6-I3 + ADR souveraineté
Dépendances: EN18.9 (modèle Application→Projet)
