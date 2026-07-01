# US06.2.1 — Super admin crée un tenant

**En tant que** SUPER_ADMIN
**Je veux** créer un nouveau tenant sur la plateforme
**Afin d'** onboarder un nouveau client ou organisation

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| POST /api/superadmin/tenants crée un tenant avec : nom, slug, plan, auth_mode | ⬜ |
| Requiert ROLE_SUPER_ADMIN | ⬜ |
| Slug unique (409 si doublon) | ⬜ |
| Tenant créé avec statut `is_active: true` | ⬜ |
| Audit event `TenantCreated` enregistré | ⬜ |
| Tests TI POST /api/superadmin/tenants | ⬜ |
| Le slug est validé par regex stricte : [a-z0-9-]{3,50}, sans préfixe réservé | ⬜ |
| Liste de slugs interdits : api, admin, superadmin, auth, actuator, health, system, pivot. Tentative avec slug réservé → 422 Unprocessable Entity | ⬜ |
| Rate limit sur POST /api/superadmin/tenants : 10 créations / heure par compte SUPER_ADMIN → 429. Audit event TenantCreationRateLimitExceeded enregistré | ⬜ |
| Valeurs possibles d'auth_mode listées : LOCAL, OIDC, GOOGLE | ⬜ |
| La réponse retourne l'ID du tenant créé et une URL d'invitation pour le premier admin du tenant | ⬜ |
| Formulaire Angular /superadmin/tenants/new : champs nom (obligatoire), slug (auto-généré depuis le nom, éditable), plan (select), auth_mode (select) | ⬜ |
| Slug auto-généré en temps réel depuis le nom (lowercase, tirets), vérification disponibilité en temps réel (debounce 500ms → GET /api/superadmin/tenants/check-slug) | ⬜ |
| 409 (slug dupliqué) → message d'erreur inline sur le champ slug | ⬜ |
| Après création réussie, toast succès + redirection vers page de détail du tenant créé | ⬜ |
| Pendant soumission, bouton disabled + spinner | ⬜ |
| Formulaire : labels explicites, aria-required="true" sur les champs obligatoires, messages d'erreur liés via aria-describedby | ⬜ |
| Tous textes internalisés dans admin.tenants.create.* (fr.json / en.json) | ⬜ |

---
Item Type: US · Parent: F06.2 · Module: admin · Phase: MVP · Size: S · Priority: Medium
Human Gate: human-validated · Stage: Backlog
