# EN42.2 — Déploiement souverain & sécurité (Forms)

**Type d'enabler** : infrastructure · sécurité

**Objectif technique** : Rendre le form-builder **souverain et conforme** :
- **Self-host** (Docker/K8s) avec **réponses illimitées**, données dans le périmètre (FRM-801).
- **Hébergement UE/RGPD** documenté, sans facturation à la réponse (FRM-802).
- **Sécurité** : SSO (Keycloak, cf. E01 Auth & IAM), RBAC, chiffrement au repos, **anti-bot/spam & journal des modifications** (FRM-704).
- **RGPD-by-design** : consentement (FRM-702), minimisation, **rétention & purge** (FRM-703), formulaire = **entité gouvernée** au catalogue (FRM-701).

**Critères de complétion** :
- [ ] Packaging self-host (Docker) + option cloud UE, sans facturation à la réponse
- [ ] SSO Keycloak + RBAC + chiffrement au repos + anti-spam + journal
- [ ] Consentement, rétention/purge, classification & propriétaire (catalogue)

---
Item Type: Enabler · Parent: E42 · Module: forms · Phase: phase-3 · Size: XL · Priority: High
Stage: ⬜
Justification: Souveraineté (self-host/UE), sécurité et RGPD-by-design du form-builder
Dépendances: EN42.1 · E01 Auth & IAM (SSO Keycloak)
