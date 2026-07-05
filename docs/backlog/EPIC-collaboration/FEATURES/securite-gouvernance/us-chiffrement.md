# US30.9.2 — Chiffrement

**En tant que** administrateur
**Je veux** un chiffrement TLS 1.2+ en transit et AES-256 au repos
**Afin de** protéger la confidentialité des données à tout moment

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le canevas de collaboration, when une donnée transite puis est stockée, chiffrée en TLS 1.2+ et AES-256, then le résultat est visible et persistant pour tous les participants | ⬜ |
| AES-256 au repos | ⬜ |
| Error : given une entrée invalide ou une coupure réseau, system préserve les contributions et affiche un état cohérent | ⬜ |
| Security/Gouvernance : conforme aux politiques de sécurité et de conformité (RGPD, audit, droits d'accès) | ⬜ |

---
Item Type: US · Parent: F30.9 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: Critical
Stage: Backlog
Source: BL-019 · MoSCoW: Must · Lot: Lot 1 · Origine: Socle 4/4
Justification: Cahiers ENF-SEC des 4 outils
Dépendances: —
