# EN01.8 — Infrastructure Auth Frontend (Angular)

**Type d'enabler** : architecture · sécurité

**Objectif technique** : Briques Angular pour l'auth : `guestGuard` (bloque accès connecté aux pages login/register), `TokenInterceptor` (injecte cookie session sur requêtes HTTP), `AuthService` (state auth + session restore).

**Critères de complétion** :
- [x] `authMatchGuard` (CanMatchFn) : shell route — retourne false si non authentifié, laisse Angular fallthrough vers routes publiques
- [x] `guestGuard` (CanActivateFn) : pages login/register — redirect vers `/home` si déjà connecté
- [x] `TokenInterceptor` : ajoute `withCredentials: true` sur toutes les requêtes API (cookie HttpOnly transmis)
- [x] `AuthService.isAuthenticated()` : signal réactif, lecture depuis `GET /auth/session`
- [x] `DeviceService` : génère + persiste l'empreinte d'appareil (localStorage hash)
- [x] Tests : `auth.guard.spec.ts`, `token.interceptor.spec.ts`, `auth.service.spec.ts`, `device.service.spec.ts`

**Statut** : ✅ Fait — Stage: Done

---
Item Type: Enabler · Parent: E01 · Type: architecture · Module: auth · Phase: MVP
Stage: Done
