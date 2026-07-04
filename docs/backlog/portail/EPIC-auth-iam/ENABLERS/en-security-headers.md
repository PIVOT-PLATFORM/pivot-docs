# EN01.10 — En-têtes de sécurité (CSP, HSTS)

**Type d'enabler** : sécurité

**Critères de complétion** :
- [x] Content-Security-Policy configuré (whitelist sources stricte)
- [x] Strict-Transport-Security (HSTS) : max-age=31536000; includeSubDomains
- [x] X-Frame-Options: DENY
- [x] X-Content-Type-Options: nosniff
- [x] Referrer-Policy: strict-origin-when-cross-origin
- [x] En-têtes configurés côté nginx (pivot-ui) ET Spring Security (pivot-core)
- [x] Score A+ sur securityheaders.com en environnement prod

**Statut** : ✅ Fait — Stage: Done

---
Item Type: Enabler · Parent: E01 · Type: sécurité · Module: auth · Phase: MVP
Stage: Done · Priority: Medium
