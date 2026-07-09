# EN01.17 — Rework Angular auth infra pour le pattern BFF

**Type d'enabler** : architecture · sécurité

**Objectif technique** : Retirer d'`EN01.10` tout ce qui gère un token côté Angular
(`TokenInterceptor` injectant `Authorization: Bearer`, `AuthService` gardant le token en signal
mémoire) et le remplacer par un état de session dérivé uniquement de `GET /api/me`.

**Justification** : [ADR-004 v2](../../../adr/ADR-004-oidc-multi-tenant.md) — Angular ne doit
plus détenir ni relayer aucun token. `EN01.10` est marqué Done mais implémente exactement le
pattern inverse (Bearer en mémoire) ; ce n'est pas une extension, c'est un remplacement des
briques existantes.

**Critères de complétion** :
- [ ] `TokenInterceptor` supprimé — plus aucune requête n'ajoute `Authorization: Bearer`
- [ ] Requêtes API en `withCredentials: true` uniquement, cookie de session porté
      automatiquement par le navigateur (posé par EN01.15)
- [ ] `AuthService.isAuthenticated()` dérivé de `GET /api/me` (200 + profil, ou 401) — plus de
      token en signal
- [ ] `authMatchGuard` / `guestGuard` adaptés à la nouvelle source d'état (comportement fonctionnel
      inchangé pour l'utilisateur)
- [ ] `POST /api/auth/logout` invalide la session serveur et efface le cookie
- [ ] Tests existants (`auth.guard.spec.ts`, `token.interceptor.spec.ts` supprimé,
      `auth.service.spec.ts`) mis à jour ; répercuté sur la copie publiée (`projects/ui-core`)

**Dépendances** : EN01.15 (Spring Session JDBC), EN01.14 (ClientRegistrationRepository dynamique)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E01 · Type: architecture · Module: auth · Phase: v1-enterprise · Size: M
Stage: ⬜ · Priority: High
