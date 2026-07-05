# US35.1.4 — SSO et audit

**En tant que** DSI
**Je veux** un SSO (SAML/OIDC) avec MFA et des journaux d'audit exportables
**Afin d'** intégrer l'authentification à l'annuaire de l'organisation et alimenter le SIEM

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un fournisseur d'identité, when un utilisateur se connecte, then l'authentification se fait via SSO SAML/OIDC avec MFA héritée | ⬜ |
| Les journaux d'audit (accès, actions d'administration) sont exportables vers le SIEM | ⬜ |
| Error : given un échec MFA, system refuse l'accès et journalise la tentative | ⬜ |
| Security/Gouvernance : les journaux d'audit sont complets et exportables (traçabilité) | ⬜ |

---
Item Type: US · Parent: F35.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Rôle: directeur-des-systemes-d-information
Source: PP-027 · MoSCoW: Must · Lot: Lot 2 · Origine: Cahiers des 3
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Cahiers ADM/SEC/GOV
Dépendances: —
