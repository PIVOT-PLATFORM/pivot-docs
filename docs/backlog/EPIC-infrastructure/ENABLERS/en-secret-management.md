# EN07.2 — Secret management Docker secrets

**Type d'enabler** : sécurité · infrastructure

**Objectif technique** : Injection des secrets applicatifs de production (mot de passe
PostgreSQL, SMTP, Redis, clé HMAC OTP) via Docker secrets, sans code custom : profil Spring
`prod` (`application-prod.yml`) important `optional:configtree:${SECRET_FILE_PATH:/run/secrets}/`
(mécanisme natif Spring Boot 4.x). Portée volontairement limitée aux secrets **statiques** —
voir `ADR-014` : étape 1, remplacée à terme par un coffre-fort central (OpenBao, secrets
dynamiques) sous `EN43.6`.

**Critères de complétion** :
- [x] Tous les secrets injectés via Docker secrets (fichiers `/run/secrets/`) ou variables d'env chiffrées
- [x] Zéro secret en clair dans `docker-compose.prod.yml` ou images
- [x] `.env.example` documenté avec toutes les variables requises
- [x] Spring Boot lit les secrets via `${SECRET_FILE_PATH}` ou profil `prod`
- [x] Rotation des secrets : procédure documentée

**Statut** : 🔎 En revue — Stage: Review

## Notes de livraison

- Implémenté : `pivot-core` PR [#150](https://github.com/PIVOT-PLATFORM/pivot-core/pull/150) —
  Gate 4 MERGE_CONFIDENCE : 100/100 (Autoloop, 1 itération — revue neutre indépendante sans
  blocker, 2 minor corrigés, sortie du mode draft).
- Mécanisme 100 % déclaratif : `application-prod.yml` (nouveau) + placeholders à deux niveaux
  dans `application.yml` (`${ENV_VAR:${secret.xxx:default}}`) — aucun code Java custom. Le
  namespace `secret.*` est délibérément distinct des clés Spring finales (ex.
  `spring.datasource.password`) pour éliminer toute dépendance à l'ordre de précédence entre
  la propriété importée par le config tree et le placeholder déjà déclaré dans
  `application.yml`.
- Couverture : `SecretManagementConfigTest` (6 tests — résolution config tree, précédence env
  var > secret Docker, fallback profil non-`prod`, absence d'échec si `/run/secrets` manquant).
  Checkstyle/SpotBugs clean ; 606/606 tests unitaires verts. Suite Testcontainers non
  exécutable dans l'environnement d'implémentation (pas de daemon Docker) — confirmé
  pré-existant sur `main` non modifié, sans lien avec cette PR ; exécutée normalement par la CI
  GitHub Actions.
- Documentation : `docs/deployment/secret-management.md` (nouveau, dans `pivot-core`) — table
  des secrets, contrat `docker-compose.prod.yml` attendu, procédure de rotation.
- **Point de coordination ouvert avec EN07.1** (PR [#149](https://github.com/PIVOT-PLATFORM/pivot-core/pull/149),
  `docker-compose.prod.yml`) : sa version actuelle câble les `secrets:`/`target:` directement
  sur les clés Spring finales plutôt que sur le namespace `secret.*` documenté ici — anticipé
  par PR #149 elle-même ("expect to reconcile... whichever PR merges second"). Commentaire de
  coordination avec recommandation concrète posté sur les deux PR ; à traiter avant que les
  deux ne soient mergées sur `main`. Ne bloque pas le Gate 4 de cette PR (scope respecté :
  aucune modification de `docker-compose.prod.yml` par EN07.2).
- Hors scope (documenté dans `docs/deployment/secret-management.md` § Non-buts) : rotation
  automatique/secrets dynamiques (`EN43.6`), chiffrement au repos des secrets OIDC par tenant
  (mécanisme distinct).

---
Item Type: Enabler · Parent: E07 · Type: sécurité · Module: core · Phase: Socle
Stage: ✅ · Priority: Critical
