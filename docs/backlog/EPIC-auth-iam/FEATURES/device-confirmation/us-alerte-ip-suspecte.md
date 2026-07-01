# US01.4.3b — Alerte connexion depuis IP/pays inhabituel

**En tant que** utilisateur
**Je veux** être alerté si une connexion est détectée depuis une localisation IP inhabituelle
**Afin de** protéger mon compte contre les connexions suspectes géographiquement anormales

> **Phase : v1-enterprise.** Requiert une décision architecture sur le service GeoIP (MaxMind, ip-api.com, ou comparaison subnet) et les implications RGPD (collecte de localisation).

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| Décision service GeoIP documentée dans un ADR avant implémentation | ⬜ |
| Algorithme de détection défini : baseline construite sur les 30 derniers jours de connexions | ⬜ |
| Détection IP inhabituelle : pays ou ASN significativement différent de l'historique | ⬜ |
| Pas d'alerte si appareil de confiance connu (EN BDD — ne dépend pas d'un cookie) | ⬜ |
| Email d'alerte envoyé (US01.5.1) avec IP, pays détecté, heure | ⬜ |
| Lien "Pas moi" → OTP à usage unique TTL 1h → ré-authentification complète requise | ⬜ |
| Conformité RGPD documentée : base légale pour la collecte/traitement d'IP et de localisation | ⬜ |
| VPN / Tor : comportement défini (alerte ou pas) — documenté dans la config | ⬜ |
| Tests TI : mock service GeoIP, connexion depuis pays inhabituel → alerte envoyée | ⬜ |

---
Item Type: US · Parent: F01.4 · Module: auth · Phase: v1-enterprise · Size: L · Priority: Medium
Human Gate: needs-human-valid · Stage: Backlog
Note: US01.4.3a (alerte appareil inconnu) = MVP → voir us-alerte-connexion-suspecte.md
