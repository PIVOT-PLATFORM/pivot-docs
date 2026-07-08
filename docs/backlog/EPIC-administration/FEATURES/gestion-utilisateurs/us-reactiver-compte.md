# US06.1.5 — Admin réactive un compte utilisateur

**En tant que** administrateur du tenant
**Je veux** réactiver un compte utilisateur désactivé
**Afin de** rétablir l'accès d'un utilisateur dont la désactivation était temporaire ou erronée

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| PATCH /api/admin/users/{userId}/status avec body { status: "ACTIVE" } réactive le compte | ✅ |
| Vérification que userId appartient au tenant courant (TenantContext). Cross-tenant → 404 | ✅ |
| Seule la valeur ACTIVE acceptée via cet endpoint (symétrique avec US06.1.4) | ✅ |
| Tentative de réactivation d'un compte déjà ACTIVE → 200 idempotent (pas d'erreur) | ✅ |
| Audit event UserReactivated enregistré avec userId et actorId | ✅ |
| Email de notification envoyé à l'utilisateur réactivé | ✅ *(envoyé uniquement lors d'une transition réelle INACTIVE→ACTIVE, jamais sur l'appel idempotent — décision assumée, voir spec Gate 5)* |
| Tests TI PATCH /api/admin/users/{userId}/status → ACTIVE (depuis INACTIVE) | ✅ |
| Tests TI cross-tenant : admin tenant A tente de réactiver userId du tenant B → 404 | ✅ |
| UI : bouton "Réactiver" visible sur les lignes avec statut INACTIVE dans la liste US06.1.2 | ✅ |
| Toast de succès "Compte réactivé" + badge statut mis à jour en temps réel | ✅ *(bug de dédup toast — paramètre `{ name }` manquant sur `confirmStatusChange()` — trouvé en review Gate 4 rétrospective, corrigé par `pivot-ui` #98)* |
| Confirmation demandée avant réactivation (dialog) | ✅ |
| Textes internalisés dans admin.users.status.* (fr.json / en.json) | ✅ |

## Notes de livraison

- Implémenté conjointement avec US06.1.4 (même endpoint, même PR) : `pivot-core` PR [#142](https://github.com/PIVOT-PLATFORM/pivot-core/pull/142) **mergée** · `pivot-ui` PR [#85](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/85) **mergée**.
- Idempotence testée à deux niveaux (TU + TI) : réactiver un compte déjà `ACTIVE` renvoie `200` sans renvoyer l'email de notification.
- Voir US06.1.4 pour l'ordre de fusion respecté et la déviation 403/401.
- **Statut réel vérifié (2026-07-06) :** les deux PR sont mergées sur `main` — resynchronisé de `In progress` à `Review`.

---
Item Type: US · Parent: F06.1 · Module: admin · Phase: Socle · Size: S · Priority: High
Stage: Review
Gate 5 : `pivot-core` PR [#142](https://github.com/PIVOT-PLATFORM/pivot-core/pull/142) (Gate 4 = 100/100, après correction d'un gap RBAC en review) · `pivot-ui` PR [#85](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/85) (Gate 4 = 100/100 initial, 89/100 rétrospectif post-merge) + correctif toast [#98](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/98), spec figée `docs/specs/EPIC-administration/us06-1-5-reactiver-compte.md` (rétroactif, 2026-07-08)
