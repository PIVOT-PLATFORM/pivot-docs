# EN07.6 — Hébergement GCP en IaC (Terraform + Ansible) — test MVP

**Type d'enabler** : infrastructure

**Objectif technique** : héberger un environnement de test MVP réel sur GCP, provisionné et
configuré de façon reproductible — infrastructure (Terraform) et configuration applicative
(Ansible) séparées, secrets chiffrés au repos, sans étape manuelle non documentée.

**Justification** : jusqu'ici, [EN07.1](en-docker-compose-prod.md)/[EN07.5](en-deploy-ci.md)
supposent "un serveur de production" déjà provisionné, sans jamais spécifier comment. Ce repo
(`pivot-infra`, nouveau) comble ce gap pour un premier déploiement réel testable — pas encore
la cible prod finale (pas de HA, pas de disque persistant séparé, cert auto-signé).

**Repo** : [pivot-infra](https://github.com/PIVOT-PLATFORM/pivot-infra) (nouveau) — Terraform
(`modules/compute-vm`, `environments/mvp-test`) + Ansible (`ansible/`, rôle `pivot_deploy`).

**Critères de complétion** :
- [x] VM Compute Engine dédiée (VPC + subnet propres, pas le réseau `default`), IP statique,
      firewall restreint (22 scopé à une IP, 80/443 publics), service account scopé
      logs/monitoring uniquement
- [x] SSH restreint à une plage IP explicite — pas de valeur par défaut `0.0.0.0/0` possible
      (validation Terraform bloquante)
- [x] Configuration applicative déclarative et rejouable (Ansible) : `docker-compose.prod.yml`
      + config ActiveMQ synchronisés depuis un checkout `pivot-core` local, secrets
      (mots de passe Postgres/OTP/mail, PAT GHCR) chiffrés via `ansible-vault` — jamais en
      clair dans le repo
- [x] Permissions de secrets par ACL POSIX ciblées sur l'UID exact de chaque conteneur
      consommateur, pas un mode `644` world-readable (Docker Compose non-swarm ne fait que du
      bind-mount, les permissions hôte s'appliquent telles quelles dans le conteneur)
- [x] Certificat TLS auto-signé généré et déployé (pas de domaine réel pour ce test) — nginx
      sert bien en HTTPS
- [x] Stack complète démarrée et vérifiée saine : nginx, pivot-core, postgres, redis, activemq
      tous `healthy`, proxy API fonctionnel, envoi d'email SMTP réel vérifié (Gmail)

**Bugs réels découverts et corrigés en déployant pour de vrai** (aucun n'était visible avant un
déploiement réel — ni EN07.1 ni EN07.5 n'avaient jamais tourné contre une vraie infra) :
- `release.yml` (pivot-core **et** pivot-ui) publiait les images à un chemin GHCR doublé
  (`ghcr.io/pivot-platform/<repo>/<repo>` au lieu de `ghcr.io/pivot-platform/<repo>`) —
  jamais résolvable par `docker-compose.prod.yml`. Corrigé :
  [pivot-core#198](https://github.com/PIVOT-PLATFORM/pivot-core/pull/198),
  [pivot-ui#128](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/128).
- `release.yml` de pivot-ui : job `prepare` sans auth npm (`NODE_AUTH_TOKEN` puis
  `packages: read`) pour la dépendance privée `@pivot-platform/collaboratif-ui` (EN17.10) —
  bloquait toute release depuis que cette dépendance existe. Corrigé :
  [pivot-ui#130](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/130),
  [pivot-ui#131](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/131).
- SMTP STARTTLS/auth jamais activés en profil prod (`application-prod.yml`) — tout relais SMTP
  réel (Gmail, Brevo…) rejette l'envoi. Fix proposé :
  [pivot-core#199](https://github.com/PIVOT-PLATFORM/pivot-core/pull/199) (en cours).

**Gaps externes / suite** (hors périmètre de ce premier test) :
- `deploy.yml` (EN07.5, pivot-core **et** pivot-ui) ne fait aucun `docker login` GHCR —
  cassé pour de vrai tant que les packages restent privés (contourné manuellement pour ce
  test via un PAT `read:packages`, jamais commité). Nécessite un secret dédié
  (`GH_PACKAGES_TOKEN`) + une étape de login dans les deux workflows.
- Secrets GitHub `PROD_SSH_HOST`/`PROD_SSH_USER`/`PROD_SSH_KEY`/`PROD_DEPLOY_PATH` (EN07.5)
  non posés sur `pivot-core` ni `pivot-ui` — `deploy.yml` ne peut pas encore cibler cette VM.
- Disque persistant séparé pour `postgres_data`/`redis_data` (actuellement sur le disque
  boot — perdu si la VM est recréée), domaine réel + Let's Encrypt (cert auto-signé
  aujourd'hui) : différé au-delà de ce test.
- Release `pivot-core` (image `:latest` republiée) actuellement bloquée par un CVE amont
  (`libexpat`/`p11-kit`, dépôt Alpine pas encore à jour côté paquets — pas un bug du repo) —
  la VM tourne sur un retag manuel de l'ancienne image en attendant.

**PR** : aucune sur ce repo (config Terraform/Ansible, pas de code applicatif) — voir
[pivot-infra](https://github.com/PIVOT-PLATFORM/pivot-infra) directement.

**Statut** : ✅ Test MVP déployé et fonctionnel (HTTP + HTTPS + email réel) — 2026-07-09.

---
Item Type: Enabler · Parent: E07 · Type: infrastructure · Module: core · Phase: Socle
Stage: ✅ · Priority: High
