# EN08.2 — Guard Angular module whiteboard

**Type d'enabler** : architecture

**Objectif technique** : Empêcher l'accès à l'UI et au bundle Angular du module whiteboard dans
deux cas distincts : (1) le module whiteboard est désactivé pour le tenant courant, et (2)
l'utilisateur authentifié n'a aucun droit sur le board précis demandé — dans les deux cas, avant
que le composant whiteboard ne soit instancié ou qu'une connexion canvas/WebSocket ne soit tentée.

**Justification** : Le `moduleGuard` (EN03.2, générique à tous les modules) ne couvre que la
désactivation globale du module pour le tenant ; il ne vérifie pas les droits sur un board précis.
Sans un guard dédié au niveau board, un utilisateur pourrait naviguer directement vers
`/whiteboard/{boardId}` d'un tableau auquel il n'a pas accès et voir l'UI se charger avant que le
rejet ne survienne côté serveur (fuite d'information, mauvaise UX, incohérence avec l'isolation
stricte imposée côté WebSocket par EN08.1). Ce guard est un prérequis bloquant pour toutes les US
de navigation whiteboard par board (F08.1 liste/CRUD, F08.3 canvas).

**Critères de complétion** :
- [ ] `moduleGuard('whiteboard')` appliqué sur la route `/whiteboard`
- [ ] Si module désactivé → redirection `/home` + toast "Module non disponible"
- [ ] Bundle Angular whiteboard non chargé si désactivé (lazy-loading respecté)
- [ ] Tests Vitest guard whiteboard (enabled=true, enabled=false)
- [ ] `boardAccessGuard` (CanActivate) appliqué sur la route `/whiteboard/:boardId`, en complément
  de `moduleGuard('whiteboard')` — les deux guards sont indépendants et cumulatifs (le
  `moduleGuard` bloque en premier, avant toute vérification de droits sur le board)
- [ ] Le guard vérifie l'accès via l'appel API déjà utilisé pour charger le board (ex.
  `GET /api/whiteboard/boards/{boardId}`), en respectant la convention déjà établie dans le module
  (cf. `us-renommer-tableau.md`, `us-partager-tableau.md`) : **403** si l'utilisateur est du même
  tenant mais n'est pas membre du board ; **404** si le board n'existe pas ou appartient à un
  autre tenant (cross-tenant — ne jamais révéler l'existence d'un board d'un autre tenant)
- [ ] Si accès refusé (403 ou 404) → redirection `/home` + toast distinct du cas module désactivé :
  "Vous n'avez pas accès à ce tableau" (ne jamais réutiliser le message "Module non disponible",
  pour ne pas induire l'utilisateur en erreur sur la cause du refus)
- [ ] Si erreur réseau/timeout lors de l'appel de vérification → comportement fail-closed
  identique à un refus (redirection `/home` + toast générique) — jamais d'accès accordé par défaut
- [ ] Tests Vitest `boardAccessGuard` : accès autorisé, 403 (non-membre même tenant), 404
  (cross-tenant/inexistant), erreur réseau (fail-closed)

**Statut** : ⬜ À faire — dépend de EN03.2 (Stage: Done, non bloquant)

---
Item Type: Enabler · Parent: E08 · Type: architecture · Module: whiteboard · Phase: Socle · Size: S
Stage: Review · Priority: High
Dépendances: EN03.2 (moduleGuard générique, Stage: Done) · EN08.1 (cohérence des codes d'erreur board)
