# US29.7.2 — SSO, rôles, audit

**En tant que** administrateur
**Je veux** activer le SSO (SAML/OIDC), le RBAC par projet/workflow et des journaux d'audit complets exportables (SIEM)
**Afin de** gouverner les accès et tracer les actions à l'échelle de l'organisation

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le SSO configuré (SAML/OIDC), when un utilisateur se connecte, then il est authentifié via l'IdP de l'organisation | ⬜ |
| Given le RBAC, when un utilisateur accède à un projet/workflow, then ses droits sont vérifiés selon son rôle | ⬜ |
| Security/Gouvernance : les journaux d'audit sont complets et exportables vers un SIEM | ⬜ |

---
Item Type: US · Parent: F29.7 · Module: automatisation · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Source: WF-024 · MoSCoW: Must · Lot: Lot 2 · Origine: Quasi-standard 5/6
Justification: Dossier §5.1
Dépendances: —
