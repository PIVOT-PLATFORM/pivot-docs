# EN43.13 — Checklist de sécurité d'admission d'un module

**Type d'enabler** : gouvernance · sécurité

**Objectif technique** : Étend le **contrat d'intégration à six capacités** (ADR-009 §4, EN28.3) d'un socle de sécurité à 9 points. Aucun module — interne ou externe — n'entre sans satisfaire cette baseline ; un module qui ne la coche pas reste en mode Lien (isolé, sans accès aux données sensibles) jusqu'à mise en conformité.

**Justification** : Sans porte d'entrée unique, chaque nouvel adaptateur OSS (E28) ou module natif pourrait satisfaire certains enablers de sécurité (EN43.3, .6, .7…) et pas d'autres, sans qu'aucun mécanisme ne le bloque. La checklist d'admission rend la conformité sécurité vérifiable et opposable avant qu'un module ne touche des données sensibles — pas une bonne pratique déclarative.

**Critères de complétion** — la checklist à 9 points :
- [ ] Identité : accepte le SSO PIVOT (OIDC/SAML), aucun compte local
- [ ] Secrets : ne détient aucun secret longue durée ; consomme EN43.6 (OpenBao)
- [ ] Autorisation : délègue les décisions à EN43.7 (policy-as-code), pas de logique d'accès codée en dur
- [ ] Chiffrement : mTLS en interne (EN43.3), TLS 1.2+ en sortie, données sensibles chiffrées au repos
- [ ] Santé & observabilité : expose `/health`, émet logs/traces/audit normalisés (EN43.8)
- [ ] Événements : publie/consomme via le bus signé, idempotent (EN28.4)
- [ ] Souveraineté : porte ses attributs de classe A/B/C (EN43.11) ; les flux respectent la classification
- [ ] Résilience : appels protégés (EN43.10), dégradation gracieuse prévue
- [ ] Supply chain : SBOM fourni, artefacts vérifiés, propriétaire déclaré au registre (EN28.12/EN28.13)

**Dépendances** : EN28.3, EN43.3, EN43.6, EN43.7, EN43.8, EN43.10, EN43.11

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: gouvernance · Module: securite · Phase: phase-3 · Size: M
Stage: ⬜ · Priority: Critical
