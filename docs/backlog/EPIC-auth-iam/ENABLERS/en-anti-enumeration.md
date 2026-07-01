# EN01.7 — Anti-énumération

**Type d'enabler** : sécurité

**Critères de complétion** :
- [x] Réponse identique (200 OK + message générique) pour email existant ou inexistant sur /auth/register et /auth/password-reset
- [x] Délai constant (timing attack mitigation) sur les endpoints sensibles
- [x] Pas d'information sur l'existence d'un compte dans les messages d'erreur
- [x] Tests Red Team : tentative d'énumération → réponse identique

**Statut** : ✅ Fait — Stage: Done

---
Item Type: Enabler · Parent: E01 · Type: sécurité · Module: auth · Phase: MVP
Human Gate: human-validated · Stage: Done · Priority: High
