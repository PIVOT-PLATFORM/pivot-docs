# US06.1.5 — Admin réactive un compte utilisateur

**En tant que** administrateur du tenant
**Je veux** réactiver un compte utilisateur désactivé
**Afin de** rétablir l'accès d'un utilisateur dont la désactivation était temporaire ou erronée

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| PATCH /api/admin/users/{userId}/status avec body { status: "ACTIVE" } réactive le compte | ⬜ |
| Vérification que userId appartient au tenant courant (TenantContext). Cross-tenant → 404 | ⬜ |
| Seule la valeur ACTIVE acceptée via cet endpoint (symétrique avec US06.1.4) | ⬜ |
| Tentative de réactivation d'un compte déjà ACTIVE → 200 idempotent (pas d'erreur) | ⬜ |
| Audit event UserReactivated enregistré avec userId et actorId | ⬜ |
| Email de notification envoyé à l'utilisateur réactivé | ⬜ |
| Tests TI PATCH /api/admin/users/{userId}/status → ACTIVE (depuis INACTIVE) | ⬜ |
| Tests TI cross-tenant : admin tenant A tente de réactiver userId du tenant B → 404 | ⬜ |
| UI : bouton "Réactiver" visible sur les lignes avec statut INACTIVE dans la liste US06.1.2 | ⬜ |
| Toast de succès "Compte réactivé" + badge statut mis à jour en temps réel | ⬜ |
| Confirmation demandée avant réactivation (dialog) | ⬜ |
| Textes internalisés dans admin.users.status.* (fr.json / en.json) | ⬜ |

---
Item Type: US · Parent: F06.1 · Module: admin · Phase: MVP · Size: S · Priority: High
Stage: Backlog
