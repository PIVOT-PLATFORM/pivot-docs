# EN07.2 — Secret management Docker secrets

## Contexte

- **Enabler** : `docs/backlog/EPIC-infrastructure/ENABLERS/en-secret-management.md` (E07 —
  Infrastructure & Déploiement)
- **PR** : `pivot-core` [#150](https://github.com/PIVOT-PLATFORM/pivot-core/pull/150)
  (`feat/en07-2-secret-management`)
- **Dernier commit au moment du figeage** : `fd7c9be` — `fix(config): précise les commentaires
  EN07.2 + coordination EN07.1`
- **Gate 2 COVERAGE** : 92/100 (5/5 AC couverts — 3 automatiquement, 2 par vérification
  manuelle documentée)
- **Gate 4 MERGE_CONFIDENCE** : 100/100 (Autoloop, 1 itération — revue neutre indépendante)

## Spec fonctionnelle

`pivot-core` injecte ses secrets applicatifs de production — mot de passe PostgreSQL, mot de
passe SMTP, mot de passe Redis (si AUTH activé), clé HMAC OTP (device / suppression de compte)
— via des fichiers Docker secrets montés dans le conteneur, jamais via une valeur en clair dans
`docker-compose.prod.yml`, une image, ou le dépôt.

Le comportement observable, par contexte de démarrage :

- **Profil par défaut / `test`** (dev local, CI unitaire) : aucun secret Docker requis ni lu —
  le mécanisme d'import (`spring.config.import`) n'est même pas activé, seules les variables
  d'environnement classiques (`SPRING_DATASOURCE_PASSWORD`, etc., avec défauts locaux de
  confort) s'appliquent, comme avant cet Enabler.
- **Profil `prod`** :
  - Si une variable d'environnement classique est positionnée (ex. `SPRING_DATASOURCE_PASSWORD`)
    — elle est utilisée (compatibilité ascendante, utile hors Docker secrets, ex. orchestrateur
    injectant des env vars directement).
  - Sinon, si un fichier `${SECRET_FILE_PATH:/run/secrets}/secret.<nom>` existe — son contenu
    est utilisé.
  - Sinon, un défaut local est utilisé (`pivot` pour le mot de passe PostgreSQL, chaîne vide
    pour les autres — comportement inchangé vs avant l'Enabler : mot de passe mail vide comme
    aujourd'hui, clé OTP vide déclenchant la génération d'une clé éphémère documentée dans
    `CryptoUtils.resolveOtpSecret`).
  - Si `${SECRET_FILE_PATH:/run/secrets}` n'existe pas du tout (profil `prod` lancé hors
    conteneur, sans secrets montés) — aucun échec au démarrage.

## Contrat technique

### Fichiers introduits / modifiés (`pivot-core`)

| Fichier | Rôle |
|---|---|
| `src/main/resources/application-prod.yml` (nouveau) | Active `spring.config.import: "optional:configtree:${SECRET_FILE_PATH:/run/secrets}/"`, uniquement sous le profil `prod` |
| `src/main/resources/application.yml` | Placeholders à deux niveaux pour `spring.datasource.password`, `spring.mail.password`, `spring.data.redis.password` (nouvelle propriété), `pivot.auth.otp-secret` (désormais déclarée explicitement, auparavant seulement défaut inline `@Value`) |
| `src/test/java/fr/pivot/config/SecretManagementConfigTest.java` (nouveau) | 6 tests — voir § Tests |
| `.env.example` | Distinction dev (`.env`, en clair, local) / prod (Docker secrets) ; ajoute `SPRING_DATA_REDIS_PASSWORD` |
| `docs/deployment/secret-management.md` (nouveau) | Table des secrets, contrat `docker-compose.prod.yml` attendu, procédure de rotation, non-buts |
| `README.md` | Lien vers le nouveau doc de déploiement |

### Table des secrets (contrat namespace `secret.*`)

| Secret | Fichier Docker secret | Propriété Spring | Variable d'env (dev) | Défaut dev |
|---|---|---|---|---|
| Mot de passe PostgreSQL | `secret.datasource-password` | `spring.datasource.password` | `SPRING_DATASOURCE_PASSWORD` / `POSTGRES_PASSWORD` | `pivot` |
| Mot de passe SMTP | `secret.mail-password` | `spring.mail.password` | `SPRING_MAIL_PASSWORD` / `MAIL_PASSWORD` | *(vide)* |
| Mot de passe Redis | `secret.redis-password` | `spring.data.redis.password` | `SPRING_DATA_REDIS_PASSWORD` | *(vide, pas d'AUTH)* |
| Clé HMAC OTP | `secret.auth-otp-secret` | `pivot.auth.otp-secret` | `PIVOT_AUTH_OTP_SECRET` | *(vide → clé éphémère)* |

Le namespace `secret.*` (plutôt que d'importer directement sous la clé Spring finale) est un
choix technique délibéré : il élimine toute dépendance à l'ordre de précédence entre la
propriété importée par le config tree et le placeholder déjà déclaré sous la même clé dans
`application.yml` — les deux ne partagent jamais la même clé, donc aucun comportement
implicite à documenter/maintenir sur ce point.

### Mécanisme — zéro code Java custom

Repose entièrement sur des fonctionnalités Spring Boot 4.x natives :
`spring.config.import` + protocole `configtree:` + préfixe `optional:` + activation
conditionnelle par profil Spring (`application-{profile}.yml`). Aucune classe
`EnvironmentPostProcessor`, aucun `@Value` de lecture de fichier, aucune logique de parsing
`_FILE` custom.

### Contrat attendu côté `docker-compose.prod.yml` (EN07.1)

```yaml
secrets:
  datasource_password: { file: ./secrets/datasource_password.txt }
  mail_password:        { file: ./secrets/mail_password.txt }
  redis_password:       { file: ./secrets/redis_password.txt }
  auth_otp_secret:      { file: ./secrets/auth_otp_secret.txt }

services:
  pivot-core:
    environment:
      SPRING_PROFILES_ACTIVE: prod
    secrets:
      - { source: datasource_password, target: secret.datasource-password }
      - { source: mail_password,       target: secret.mail-password }
      - { source: redis_password,      target: secret.redis-password }
      - { source: auth_otp_secret,     target: secret.auth-otp-secret }
```

## Écarts vs AC initiaux

Aucun écart de fond. Deux précisions de portée, confirmées par `ADR-014` (lu avant
implémentation, pas après) :

- Secrets **statiques** uniquement (pas de rotation automatique, pas de secrets dynamiques à
  courte durée de vie) — c'est l'étape 1 explicitement définie par `ADR-014`, l'étape suivante
  (`EN43.6`, OpenBao) est un Enabler distinct, `Phase: phase-3`.
- Les secrets OIDC par tenant (`tenant_oidc_configs.client_secret_enc`, stockés chiffrés en
  base) sont un mécanisme distinct, non touché par cet Enabler.

## Point de coordination ouvert (non résolu au moment du figeage)

`docker-compose.prod.yml` sur `pivot-core` PR [#149](https://github.com/PIVOT-PLATFORM/pivot-core/pull/149)
(EN07.1, en cours au moment du figeage de cette spec) cible actuellement les `secrets:`/`target:`
directement sur les clés Spring finales (`SPRING_DATASOURCE_PASSWORD`, `SPRING_MAIL_PASSWORD`,
`pivot.auth.otp-secret`) plutôt que sur le namespace `secret.*` ci-dessus, et déclare
`SPRING_CONFIG_IMPORT` en variable d'environnement séparée (redondant avec
`application-prod.yml`). PR #149 anticipe elle-même ce point de réconciliation. Commentaire de
coordination avec recommandation concrète posté sur les deux PR (#149 et #150) — à traiter
avant que les deux ne soient mergées sur `main`. Ne remet pas en cause le contrat figé ci-dessus
côté `pivot-core` (application Spring) : seul le câblage `docker-compose.prod.yml` reste à
aligner.

## Tests

`SecretManagementConfigTest` (`fr.pivot.config`) — 6 tests, boot d'un contexte Spring minimal
(`SpringApplicationBuilder`, sans auto-configuration) contre les vrais fichiers
`application.yml`/`application-prod.yml` :

| Test | Comportement vérifié |
|---|---|
| `ac1_resolvesDockerSecretFromConfigTree_whenProdProfileActive` | Fichier secret présent + profil `prod` → propriété résolue depuis son contenu |
| `ac1_envVarTakesPrecedenceOverDockerSecret_whenBothPresent` | Variable d'env présente en plus du secret → variable d'env gagne |
| `ac1_fallsBackToLocalDefault_whenNeitherEnvVarNorSecretFilePresent` | Ni env var ni secret → défaut local (`pivot`, vide) |
| `ac1_doesNotFailStartup_whenSecretDirectoryDoesNotExistAtAll` | `/run/secrets` absent (chemin par défaut, profil `prod`) → démarrage réussi |
| `ac2_neverImportsConfigTree_whenProdProfileInactive` | Profil `prod` inactif → `secret.*` jamais résolu, même si le fichier existe |
| `ac1_resolvesAllDeclaredSecrets_whenProdProfileActive` | Les 4 secrets (datasource/mail/redis/otp) résolvent simultanément |

Vérifications manuelles (non automatisables) : absence de secret en clair dans le diff (AC2,
revue du diff avant commit) ; contenu de la procédure de rotation (AC5, revue de contenu du
document).
