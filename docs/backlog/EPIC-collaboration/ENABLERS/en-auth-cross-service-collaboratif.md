# EN08.3 — Authentification réelle cross-service pour pivot-collaboratif-core

**Type d'enabler** : sécurité

**Objectif technique** : Remplacer le mécanisme d'identité actuel de `pivot-collaboratif-core`
(headers `X-Pivot-User-Id`/`X-Pivot-Tenant-Id` non authentifiés, `RequestPrincipalResolver` stub
— "Auth différée", cf. CLAUDE.md du repo) par une résolution réelle du bearer opaque token émis
par `pivot-core`, conformément à `ADR-022` : **validation dupliquée via bibliothèque partagée,
jamais de centralisation réseau** vers `pivot-core` (préserverait l'isolation de panne déjà
documentée par les `CLAUDE.md` satellites).

**Justification** : Découvert en testant EN17.9 (câblage whiteboard shell) en local —
`pivot-collaboratif-core` renvoie **401** sur toute requête authentifiée par le bearer token
opaque de `pivot-core` (il n'en connaît pas la sémantique). Ce 401, remonté au shell `pivot-ui`
via son intercepteur global (`token.interceptor.ts`, EN04.4/US01.x), est interprété comme
"session expirée" et **déconnecte l'utilisateur** — alors que sa session `pivot-core` est valide.
Aucun utilisateur ne peut donc réellement utiliser le tableau blanc une fois le module activé,
malgré EN17.9 fonctionnellement correct côté shell. Bloquant pour la recette Socle E30 (Sprint 6,
Axe 3) et pour toute US whiteboard qui appelle l'API REST (F08.1, F08.2, F08.4).

**Décision d'architecture (`ADR-022`, statut Proposé — pas encore accepté formellement par le
mainteneur, mais déjà implémentée côté code)** : `pivot-core-starter` expose
`AuthenticatedPrincipal(userId, tenantId, role)` + l'interface fonctionnelle
`AuthenticatedPrincipalResolver` (`fr.pivot.core.auth`, livré par `pivot-core#171`/EN17.1) comme
contrat de résolution d'identité minimal partagé. La logique de validation elle-même (hash
SHA-256, expiration, révocation, désactivation tenant/utilisateur — cf. `ADR-005` opaque tokens)
n'est **pas** dupliquée dans le starter — chaque repo `pivot-xxx-core` consommateur l'implémente
lui-même, contre la même table `public.access_tokens` (lecture cross-schéma, même instance
PostgreSQL partagée — cf. architecture BDD multi-repo déjà établie).

**Critères de complétion** :
- [ ] `pivot-collaboratif-core` implémente `AuthenticatedPrincipalResolver` (contrat
  `pivot-core-starter`, `fr.pivot.core.auth`) — validation directe contre `public.access_tokens`
  (hash SHA-256 du bearer token, expiration, révocation) + `public.users`/`public.tenants` (rôle,
  désactivation tenant/utilisateur) — même algorithme et mêmes règles que `TokenService`
  (`pivot-core-app`), dupliqué, jamais d'appel réseau vers `pivot-core`
- [ ] Given un bearer token opaque valide émis par `pivot-core`, when un appel REST whiteboard
  (`GET /whiteboard/boards`, etc.), then la requête est authentifiée et résolue au bon
  `userId`/`tenantId` — remplace le `X-Pivot-User-Id`/`X-Pivot-Tenant-Id` actuel (jamais un header
  client-fourni comme source de vérité identité, cf. règle absolue déjà en vigueur côté
  `pivot-core`)
- [ ] Error case: given un token expiré/révoqué/inconnu, then 401 (comportement identique à
  `pivot-core` pour un client)
- [ ] Error case: given un tenant désactivé, then 401 (pas de fuite d'information sur la cause)
- [ ] Security: aucune régression sur l'isolation tenant déjà en vigueur (le `tenantId` résolu
  depuis le token reste l'unique source de vérité, jamais un paramètre requête/body)
- [ ] Security: le hash du token n'est jamais loggé, cohérent avec `ADR-005`
- [ ] Tests d'intégration : token valide/expiré/révoqué/tenant désactivé, contre une vraie
  instance Postgres (Testcontainers, cohérent avec les conventions déjà établies du repo)
- [ ] `pivot-ui` : plus de déconnexion erronée au clic sur `/whiteboard` une fois activé — vérifié
  manuellement (flow complet login → activation module → navigation whiteboard → chargement liste
  de tableaux, sans déconnexion)
- [ ] `RequestPrincipalResolver` (stub headers) retiré, remplacé par le nouveau resolver — pas de
  double mécanisme d'identité coexistant

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E08 (E30) · Type: sécurité · Module: collaboratif · Phase: Socle · Size: M
Stage: Backlog · Priority: Critical
Dépendances: `pivot-core#171`/EN17.1 (`AuthenticatedPrincipal`/`AuthenticatedPrincipalResolver`,
livré) · [`ADR-022`](pathname:///pivot-docs/adr/ADR-022-principal-authentification-minimal-partage) (statut
Proposé — acceptation formelle par le mainteneur recommandée avant le Gate 1 de cet enabler,
la décision qu'il documente est déjà celle implémentée dans `pivot-core-starter`)
