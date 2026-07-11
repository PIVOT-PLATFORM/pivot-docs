# Audit BDD — PIVOT Platform

**Statut :** 7.3/10 — v2
**Dernière révision :** 2026-07-08
**Profil agent responsable :** Architecte BDD PostgreSQL

## Date : 2026-07-08 — v2

## Expert : Architecte BDD PostgreSQL — passe unique (pas d'enjeu double-passe pour ce domaine à ce stade)

## Périmètre

- `pivot-core/src/main/resources/db/migration/V1__schema_init.sql` (schéma `public`) +
  `pivot-core/src/main/resources/db/seeds/V2__test_seeds.sql` (seeds, profil `test` uniquement)
- `pivot-agilite-core/src/main/resources/db/migration/V1__schema_init.sql` (schéma `agilite`)
- `pivot-pilotage-core/src/main/resources/db/migration/V1__schema_init.sql` (schéma `pilotage`)
- `pivot-collaboratif-core/src/main/resources/db/migration/V1__schema_init.sql` (schéma `collaboratif`)
- Configuration Flyway/JPA des 4 repos (`application.yml` / `application-test.yml` — `spring.flyway.*`,
  `spring.jpa.properties.hibernate.default_schema`)
- `pivot-core/pivot-core-starter/src/main/java/fr/pivot/core/db/ModuleFlywayConfigurer.java` (+ son test)
- Documentation d'architecture cible : `pivot-docs/docs/architecture/bdd-multi-schema.md`,
  `platform-overview.md`, `modules-system.md` — comparée au code réel, pas prise pour acquise
- ADR-001 à ADR-016 (`pivot-docs/docs/adr/`) — recherche d'une décision sur la stratégie d'ID (UUID vs BIGSERIAL) : aucune trouvée
- `pivot-docs/docs/backlog/EPIC-infra-multi-repo/ENABLERS/en-pivot-core-starter.md` (EN17.1) — gap
  `teams`/`team_members` déjà tracké côté backlog, confronté ici au schéma réel

Hors périmètre : plans d'exécution PostgreSQL réels (`EXPLAIN ANALYZE`) — aucune base peuplée en
volume à ce stade, RGPD (registre Art. 30, bases légales — voir `audit-rgpd.md`), sécurité applicative
au sens OWASP (voir `audit-cyber.md`).

---

## Score global : 7.3/10 (premier audit formel)

**Tendance : —** (aucun audit formel BDD n'a précédé celui-ci — la version v1 du 2026-06-20 n'était
que du scaffolding de contexte, pas un passage noté, conformément à la règle du gabarit d'audit).

Le socle `public` (pivot-core) est solide : contraintes d'intégrité systématiques, indexation
réfléchie (y compris des index partiels ciblés sur les patterns de requête réels), conventions
cohérentes et documentées inline. Les trois repos modules respectent tous la convention "V1
unique" et n'ont introduit aucune FK cross-schéma illégale. La pièce centrale qui permettrait de le
faire correctement (`public.teams`/`team_members`), absente au moment de l'audit initial, a été
**livrée depuis** (EN17.1/`pivot-core#171`) — la convention FK est désormais applicable côté cible.
Reste que `collaboratif` (seul module avec des tables métier réelles) a été modélisé avec une
stratégie de clé primaire (UUID) incompatible avec celle de `public` (BIGSERIAL) — un point de
friction concret et non documenté qu'il vaut mieux corriger maintenant, pendant que les tables
sont vides, plutôt qu'au moment de l'intégration `pivot-core-starter` (EN17.1).

---

## I. Résumé exécutif

Le socle BDD de PIVOT n'est pas en prod et n'a jamais eu de dette héritée à traiter — ce premier
audit formel constate un socle réellement construit avec soin plutôt qu'un état dégradé à
redresser. Le schéma `public` de `pivot-core` (17 tables) applique systématiquement les bonnes
pratiques attendues sur une plateforme SaaS multi-tenant : contraintes `CHECK` sur toute colonne
enum-like, `UNIQUE` sur tout hash de token, `ON DELETE CASCADE` réfléchi table par table, et surtout
des index partiels ciblés sur les vrais patterns de requête (purge de tokens expirés, sessions
actives par utilisateur, notifications non lues) — un niveau de maturité rarement vu dès le premier
jet. Aucune migration `V2+` n'a été ajoutée prématurément nulle part sur la plateforme : la
convention "V1 unique avant la BETA" est respectée à 100 % sur les 4 repos core.

Le point le plus concret à corriger est que le schéma `collaboratif` (seul module avec des tables
métier réelles à ce jour — whiteboard) a été conçu avec des clés UUID (`board.id`,
`board.tenant_id`, `board.owner_id`, `board_member.user_id`…) alors que `public` (pivot-core) est
entièrement en `BIGSERIAL`/`BIGINT` (`tenants.id`, `users.id`…). Aucune FK cross-schéma n'existe
encore nulle part sur la plateforme (vérifié par grep exhaustif) — la règle "FK cross-schéma
uniquement vers `public`" est donc respectée aujourd'hui simplement parce qu'elle n'est pas encore
utilisée, pas parce qu'elle a été testée. Le jour où `collaboratif` ajoutera la FK vers
`public.tenants(id)` documentée comme cible autorisée, elle échouera : PostgreSQL n'autorise pas
une FK entre deux types de colonnes différents (`UUID` → `BIGINT`) sans conversion. À traiter
avant que `collaboratif` n'ait des données réelles, pas après.

Second point structurel, déjà identifié côté backlog (EN17.1, vérifié 2026-07-08) mais absent de
tout audit BDD formel jusqu'ici : `public.teams` / `public.teams_members`, documentés comme
propriété de `pivot-core` dans trois documents d'architecture distincts et cités comme cible de FK
autorisée dans `ModuleFlywayConfigurer.java` lui-même, **n'existent pas** dans
`V1__schema_init.sql`. Aucune classe `Team`/`TeamMember` n'existe dans le codebase. Ce n'est pas
une régression — c'est une fonctionnalité jamais implémentée — mais tant qu'elle ne l'est pas,
aucun des trois modules ne peut appliquer la moitié de la règle de FK cross-schéma qui lui est
documentée.

Aucun de ces deux points ne bloque quoi que ce soit aujourd'hui (aucune table métier n'a encore de
donnée réelle, aucune FK cross-schéma n'a été tentée) — mais les deux sont des blocages *prévisibles*
de l'intégration `pivot-core-starter` (EN17.1) si non traités avant. Le reste des findings
(index manquant sur `audit_events.tenant_id`, absence de purge programmée sur plusieurs tables de
tokens à durée de vie courte, contraintes `CHECK` manquantes côté `collaboratif`) sont des
améliorations de performance/robustesse à faible effort, sans risque immédiat.

---

## II. Analyse par axe

### II.1 — Intégrité référentielle & respect du schéma multi-BDD

**Score : 7/10**

**Ce qui fonctionne :**

- Toutes les FK internes au schéma `public` sont correctement déclarées avec une politique
  `ON DELETE` explicite et cohérente avec la sémantique métier : `CASCADE` sur les entités qui
  n'ont aucun sens sans leur parent (`email_verifications.user_id`, `access_tokens.user_id`,
  `tenant_oidc_configs.tenant_id`…), pas de `CASCADE` sur `audit_events.user_id`/`tenant_id`
  (immuabilité RGPD Art. 5.2 explicitement commentée en ligne 283 du fichier).
- FK "forward reference" bien gérée : `tenants.billing_plan_id` est déclarée sans contrainte à la
  création de `tenants` (la table `plans` référencée n'existe pas encore à ce stade du fichier),
  puis la contrainte `fk_tenants_billing_plan` est ajoutée via `ALTER TABLE` juste après la
  création de `plans` (V1, lignes 44 et 448-449) — modélisation correcte d'une dépendance
  circulaire de déclaration, avec commentaire explicite justifiant le choix.
- **Zéro FK cross-schéma illégale** : grep exhaustif de `REFERENCES` sur les trois migrations
  modules ne retourne que des FK intra-schéma (`collaboratif.board_member` → `collaboratif.board`,
  `collaboratif.board_share_token` → `collaboratif.board`, lignes 23 et 34 du V1 collaboratif).
  Aucune écriture ni lecture qualifiée vers `public.*` n'existe dans aucun des trois modules.

**Ce qui doit être corrigé :**

- **[HIGH] Incompatibilité de type pour la future FK cross-schéma `collaboratif` → `public`.**
  `pivot-collaboratif-core/src/main/resources/db/migration/V1__schema_init.sql` déclare
  `board.id UUID DEFAULT gen_random_uuid()` (ligne 10), `board.tenant_id UUID` (ligne 12),
  `board.owner_id UUID` (ligne 13), `board_member.user_id UUID` (ligne 24),
  `board_share_token.created_by UUID` (ligne 41). Le schéma `public` de pivot-core est
  entièrement `BIGSERIAL`/`BIGINT` : `tenants.id BIGSERIAL` (ligne 16),
  `users.id BIGSERIAL` (ligne 103). Aucune des deux FK documentées comme autorisées
  (`bdd-multi-schema.md`, lignes 29-36 : `FOREIGN KEY (team_id) REFERENCES public.teams (id)`,
  `FOREIGN KEY (tenant_id) REFERENCES public.tenants (id)`) n'est actuellement déclarée dans
  `collaboratif` — mais le jour où elle le sera (au démarrage réel de l'implémentation whiteboard
  avec auth branchée, EN17.1), elle échouera : PostgreSQL exige une compatibilité de type stricte
  entre colonne FK et colonne référencée. Aucune décision d'architecture (`ADR-001` à `ADR-016`) ne
  documente ce choix UUID pour `collaboratif` — recherche exhaustive sans résultat. À trancher
  maintenant (harmoniser `collaboratif` sur `BIGINT`, ou documenter formellement une stratégie
  UUID plateforme avec plan de conversion pour `public`) pendant que la table `board` est vide,
  plutôt qu'au moment de brancher `pivot-core-starter`.
- **[RÉSOLU depuis l'audit initial] `public.teams` / `public.team_members` désormais livrés (EN17.1/`pivot-core#171`).** Trois
  documents d'architecture (`pivot-docs/docs/architecture/bdd-multi-schema.md` ligne 13,
  `platform-overview.md` ligne 119, `modules-system.md` ligne 141) et le Javadoc de
  `ModuleFlywayConfigurer.java` (ligne 35) citent `public.teams(id)` comme cible de FK autorisée
  au même titre que `public.tenants(id)`. Au moment de l'audit initial, `V1__schema_init.sql` de
  pivot-core ne contenait aucune table `teams`/`team_members`, et aucune classe `Team`/`TeamMember`
  n'existait dans le codebase — **ce n'est plus le cas** : EN17.1/`pivot-core#171` a livré les
  entités, les tables et leurs repositories. Ce gap est déjà tracké côté backlog
  (`EPIC-infra-multi-repo/ENABLERS/en-pivot-core-starter.md`, EN17.1, vérifié 2026-07-08 : "Aucune
  classe Team/TeamMember dans le codebase à ce jour : pas une extraction, une feature jamais
  implémentée — bloque la convention FK cross-schéma public.teams(id) déjà documentée par
  EN17.4") — ce premier audit BDD formel confirme et documente ce gap dans le domaine BDD
  lui-même, ce qui n'avait jamais été fait explicitement ici. Conséquence : le gap est **clos** —
  la convention FK cross-schéma `public.teams(id)` est désormais applicable ; les trois modules ne
  l'ont simplement pas encore câblée (bootstrap). Le concept est en cours de raffinage en modèle
  organisationnel — voir [ADR-027](pathname:///pivot-docs/adr/ADR-027-modele-organisationnel-unites-equipes).
- **[MEDIUM] Isolation tenant/team non vérifiable au niveau BDD dans `collaboratif` tant que les
  deux points ci-dessus ne sont pas résolus.** `collaboratif.board.tenant_id`/`owner_id` et
  `board_member.user_id` sont aujourd'hui des colonnes `UUID` sans aucune contrainte de référence
  — rien n'empêche au niveau base qu'un `board` référence un `tenant_id` ou un `owner_id`
  inexistant. C'est cohérent avec le statut bootstrap du repo (auth non branchée, voir
  `pivot-collaboratif-core/CLAUDE.md`), mais mérite d'être rappelé comme non-couvert tant que la
  FK réelle n'est pas ajoutée.

### II.2 — Normalisation & conventions de modélisation

**Score : 8/10**

**Ce qui fonctionne :**

- Colonnes à double sémantique explicitement documentées plutôt que source de confusion silencieuse :
  `tenants.plan`/`tenants.auth_mode` (portée déploiement historique + mode d'auth primaire d'un
  tenant créé via l'API super-admin, deux jeux de valeurs coexistant de façon additive, commentaire
  détaillé lignes 19-27 et 34-39) ; `tenants.billing_plan_id` vs `tenants.plan` explicitement
  distingués en commentaire (ligne 34-39) pour éviter toute confusion de nommage.
  `module_activations` (autorité tenant-scope) vs `module_overrides` (autorité super-admin
  cross-tenant) : séparées en deux tables plutôt que fusionnées dans une colonne ambiguë, avec la
  justification explicite en commentaire (lignes 456-469) — bonne décision de modélisation, le
  couplage des deux autorités dans une seule ligne aurait introduit un risque d'écrasement
  silencieux.
- `locale` sur `users` : un seul champ pour la langue préférée, explicitement justifié pour éviter
  une deuxième source de vérité entre langue UI et langue des emails (lignes 118-123) — décision de
  normalisation documentée, pas laissée implicite.
- `notifications.tenant_id` est la seule dénormalisation volontaire du schéma (dupliquée depuis
  `users.tenant_id` au moment de la création) — mais justifiée explicitement : filtrage direct sans
  jointure + garde-fou défense-en-profondeur d'isolation tenant (lignes 630-634). Dénormalisation
  assumée et documentée, pas une omission.

**Ce qui doit être corrigé :**

- **[MEDIUM] Contraintes `CHECK` manquantes sur les colonnes enum-like de `collaboratif`.** Le
  schéma `public` établit une convention forte : toute colonne à valeurs bornées porte une
  contrainte `CHECK` (`chk_tenants_plan`, `chk_tenants_auth_mode`, `chk_users_locale`,
  `chk_at_status`, `chk_at_auth_method`, `chk_adr_confirmed_via`, `chk_der_status`,
  `chk_notifications_type` — huit occurrences dans `V1__schema_init.sql` de pivot-core). Le
  V1 de `collaboratif` ne suit pas cette convention : `board.visibility VARCHAR(20)` (ligne 14),
  `board_member.role VARCHAR(20)` (ligne 25) et `board_share_token.role VARCHAR(20)` (ligne 36)
  n'ont aucune contrainte `CHECK`, alors que leur nom et leur commentaire (`US08.1.1`) indiquent
  clairement un jeu de valeurs fermé (probablement `PRIVATE`/`PUBLIC` et
  `OWNER`/`EDITOR`/`VIEWER` ou équivalent). À corriger avant que la feature whiteboard ne soit
  réellement implémentée (le fichier n'est plié dans le V1 unique que pour l'instant).

### II.3 — Performance : index & volumétrie

**Score : 7/10**

**Ce qui fonctionne :**

- `access_tokens` (table la plus sensible en volumétrie : une ligne par session, à chaque login)
  est le meilleur exemple d'indexation du schéma : `idx_at_token_hash` (UNIQUE, lookup à chaque
  requête authentifiée), `idx_at_user_status` (révocation groupée), `idx_at_status_cleanup` (index
  **partiel**, `WHERE status IN ('revoked','expired')`, ciblé sur le job de purge —
  `CleanupScheduler`), `idx_at_active_user_created` (index partiel `WHERE status = 'active'`, sert
  directement `countByUserIdAndStatus` + l'éviction `MAX_SESSIONS_PER_USER`). Quatre index, chacun
  justifié par un pattern de requête réel documenté en commentaire — exemplaire.
- `data_export_requests` : même niveau de soin — `idx_der_token_hash` partiel (`WHERE token_hash IS
  NOT NULL`, la majorité des lignes n'en ont pas), `idx_der_status_expires` partiel pour le job de
  purge, et surtout `idx_der_user_one_active` : un index unique partiel qui ferme une fenêtre TOCTOU
  applicative documentée explicitement (lignes 563-569) — usage de la contrainte BDD comme filet de
  sécurité en complément (pas en remplacement) du contrôle applicatif, exactement le bon réflexe.
- `users.scheduled_deletion_at` : index partiel `WHERE deleted_at IS NOT NULL AND anonymized_at IS
  NULL` (ligne 161-162), alimente précisément `AccountDeletionScheduler.anonymizeDueAccounts()` —
  encore un index dimensionné sur le job qui le consomme, pas générique.

**Ce qui doit être corrigé :**

- **[MEDIUM] Index manquant sur `audit_events.tenant_id`.** `audit_events` est une table immuable
  (jamais de `DELETE`), donc structurellement la table à plus forte croissance de tout le schéma
  `public` — déjà signalée comme point d'attention avant ce premier audit formel. Elle est indexée
  sur `user_id`, `event_type` et `created_at` (lignes 298-300) mais **pas sur `tenant_id`** ni sur
  un composite `(tenant_id, created_at)` qui servirait la requête la plus probable d'un écran
  d'audit admin tenant ("historique de mon tenant, trié par date"). À volumétrie croissante, cette
  requête dégénère en scan séquentiel filtré. Recommandation : `CREATE INDEX
  idx_audit_tenant_created ON audit_events (tenant_id, created_at DESC)`.
- **[LOW] Absence de purge programmée (et d'index de support) sur plusieurs tables de tokens à
  durée de vie courte.** `CleanupScheduler` (`fr.pivot.scheduler`) ne purge que `access_tokens` ;
  `AccountDeletionScheduler` et `ExportCleanupScheduler` ne couvrent que leurs domaines respectifs.
  `email_verifications`, `password_reset_tokens`, `device_verify_tokens`,
  `suspicious_login_tokens` et `account_deletion_otps` n'ont **aucun job de purge** et aucun index
  sur `expires_at` pour en supporter un futur. Volume faible aujourd'hui (produit non lancé), mais
  chaque email de vérification/reset/OTP laisse une ligne permanente — à planifier avant que le
  volume ne devienne un vrai problème de performance ou de conformité (minimisation des données).

### II.4 — Conformité des migrations Flyway

**Score : 8/10**

**Ce qui fonctionne :**

- **Convention "V1 unique avant la BETA" respectée à 100 %** sur les 4 repos core : aucun fichier
  `V2__`/`V3__` numéroté n'existe dans un dossier `db/migration/` où que ce soit sur la plateforme
  (vérifié par recherche exhaustive). `pivot-agilite-core` et `pivot-pilotage-core` sont bien à
  l'état "bootstrap infra uniquement" (`CREATE SCHEMA IF NOT EXISTS` seul, aucune table métier) —
  cohérent avec ce que documentent leurs `CLAUDE.md` respectifs, pas juste une affirmation.
- **Les seeds de test ne sont pas un `V2` dans le même sens que la convention V1 unique
  l'interdit.** `V2__test_seeds.sql` vit dans `pivot-core/src/main/resources/db/seeds/` — un
  **emplacement Flyway distinct** de `db/migration/`, ajouté à `spring.flyway.locations`
  uniquement sous le profil Spring `test` (`application-test.yml` ligne 32 :
  `classpath:db/migration,classpath:db/seeds` — contre `classpath:db/migration` seul dans
  `application.yml`, ligne 28, utilisé en dev/prod). C'est une garantie plus forte que ce que la
  note de préparation du premier passage supposait : il ne s'agit pas d'une simple convention de
  nommage à l'intérieur du même dossier, mais d'une isolation structurelle — les seeds ne peuvent
  physiquement pas se charger hors profil `test`, quel que soit un futur oubli de renommage.
  Contenu vérifié : 5 comptes (`super_admin`/`admin`/`user`/`unverified`/`blocked`), toutes les
  requêtes idempotentes (`ON CONFLICT DO NOTHING` / `NOT EXISTS`), mot de passe de test unique
  documenté en tête de fichier — conforme à ce qu'annonçait la préparation du premier passage.
- Build artifact (`target/classes/db/migration/V1__schema_init.sql`) identique au source
  (`src/main/resources/...`) sur pivot-core — pas de drift silencieux entre un ancien build et la
  source actuelle qui aggraverait un incident de checksum.
- `ModuleFlywayConfigurer` (`pivot-core-starter/src/main/java/fr/pivot/core/db/`) implémente
  exactement le pattern documenté dans `bdd-multi-schema.md` (Flyway dédié par module, schéma +
  emplacement de migration isolés, `createSchemas(true)`), et est déjà couvert par un test unitaire
  (`ModuleFlywayConfigurerTest`) et un test d'intégration d'isolation
  (`ModuleSchemaIsolationIntegrationTest`) — l'infrastructure existe et est testée, ce qui n'était
  pas garanti avant vérification.

**Ce qui doit être corrigé :**

- **[LOW] Incident réel du 2026-07-07 (changement de contenu de `V1__schema_init.sql` sur `main` →
  `FlywayValidateException: Migration checksum mismatch` sur toute base de dev déjà migrée) toujours
  non documenté côté setup développeur.** Recherche exhaustive dans `pivot-docs/docs/setup/` :
  aucune mention de Flyway, de checksum, ni de procédure de reset de base locale
  (`docker compose down && docker volume rm ... && docker compose up`). Le comportement est
  attendu compte tenu de la convention V1 unique (un changement de contenu d'une migration déjà
  appliquée casse toujours son checksum, par design Flyway) — ce n'est donc pas un bug, mais
  l'absence de documentation transforme un non-événement en incident répété à chaque évolution de
  schéma pré-BETA pour quiconque n'a pas vécu la première occurrence.
- **[LOW] `ModuleFlywayConfigurer` construit et testé, mais consommé par aucun des trois repos
  modules.** `pivot-agilite-core`, `pivot-pilotage-core` et `pivot-collaboratif-core` configurent
  chacun manuellement `spring.flyway.locations`/`default_schema` dans leur propre `application.yml`
  plutôt que de déclarer le bean `ModuleFlywayConfigurer` documenté — cohérent avec le fait que
  `pivot-core-starter` n'est pas encore publié en artefact consommable (gap déjà tracké EN17.1,
  confirmé dans les trois `CLAUDE.md` modules), donc pas un défaut d'exécution actuel, juste une
  duplication de configuration à résorber une fois le starter réellement publiable.

---

## Statut des findings/dettes historiques

N/A — premier audit formel BDD. La version v1 (2026-06-20) du fichier n'était que du scaffolding
de contexte ("Points d'attention" en préparation du premier passage), pas un audit noté avec un
score réel — conformément à la règle du gabarit (`skill-audit-format`), elle ne compte pas comme
une révision antérieure à confronter finding par finding. Les points qu'elle listait ont tous été
effectivement vérifiés dans ce premier passage (voir axes ci-dessus) plutôt que reconduits tels quels.

| # | Item | Statut | Preuve |
|---|------|--------|--------|
| — | (aucun historique antérieur à confronter) | N/A | Premier audit formel — voir Section II pour la vérification réelle des points de la préparation v1 |

---

## Bonnes pratiques confirmées / Points forts

1. **Discipline de contraintes `CHECK` systématique sur `public`** — huit colonnes enum-like
   contraintes en base, pas seulement côté application (`chk_tenants_plan`, `chk_users_locale`,
   `chk_at_status`, `chk_at_auth_method`, `chk_adr_confirmed_via`, `chk_der_status`,
   `chk_notifications_type`, `chk_tenants_auth_mode`).
2. **Index partiels dimensionnés sur le job/la requête réelle qui les consomme**, pas génériques —
   `access_tokens` (purge, sessions actives), `data_export_requests` (token nullable, purge,
   verrou TOCTOU), `users.scheduled_deletion_at` (scheduler d'anonymisation).
3. **Documentation inline du "pourquoi" à chaque décision de modélisation non triviale** —
   dénormalisation assumée (`notifications.tenant_id`), double-sémantique de colonne
   (`tenants.plan`/`auth_mode`), séparation d'autorité (`module_activations` vs
   `module_overrides`) : chaque cas ambigu est expliqué en commentaire plutôt que laissé à
   deviner — rare à ce stade d'un projet.
4. **Séparation structurelle (pas juste conventionnelle) des seeds de test** — emplacement Flyway
   dédié (`db/seeds/`), activé uniquement sous profil `test`, jamais un risque de fuite en
   dev/prod par oubli de renommage.
5. **Convention "V1 unique avant la BETA" appliquée uniformément sur les 4 repos core**, y compris
   sur les deux modules encore bootstrap (`agilite`, `pilotage`) qui n'avaient aucune obligation
   immédiate de s'y conformer faute de table métier — signe que la convention est comprise et
   appliquée par anticipation, pas seulement respectée par absence d'occasion de la violer.
6. **Infrastructure d'isolation multi-schéma déjà construite et testée** (`ModuleFlywayConfigurer`
   et `ModuleSchemaIsolationIntegrationTest`) avant même qu'un seul module ne la consomme —
   développement en avance de phase sur le besoin réel, plutôt qu'en rattrapage.
7. **Zéro FK cross-schéma illégale sur toute la plateforme**, vérifié par grep exhaustif — la
   règle d'isolation multi-schéma n'a pas été contournée une seule fois, même sur un module
   (`collaboratif`) qui a déjà des tables métier réelles.

---

## Score par grille (Intégrité référentielle, normalisation, performance, conformité Flyway)

| Catégorie | Score | Findings/dette actifs |
|-----------|-------|------------------------|
| Intégrité référentielle | 7/10 | Incompatibilité UUID/BIGINT à trancher avant FK cross-schéma réelle (HIGH) ; `teams`/`team_members` absents du schéma (HIGH, déjà tracké EN17.1) ; isolation tenant non vérifiable en BDD sur `collaboratif` tant que les deux points précédents ne sont pas résolus (MEDIUM) |
| Normalisation | 8/10 | `CHECK` manquants sur les colonnes enum-like de `collaboratif` (MEDIUM) |
| Performance (index, volumétrie) | 7/10 | Index composite manquant sur `audit_events (tenant_id, created_at)` (MEDIUM) ; absence de purge/index sur 5 tables de tokens courte durée (LOW) |
| Conformité migrations Flyway | 8/10 | Procédure de reset DB locale (incident checksum du 2026-07-07) non documentée côté setup dev (LOW) ; `ModuleFlywayConfigurer` construit mais non consommé par les modules (LOW, déjà tracké EN17.1) |
| Respect du schéma multi-BDD (FK cross-schéma vers `public` uniquement) | 8/10 | Zéro violation constatée — règle respectée mais pas encore testée en pratique (aucune FK cross-schéma n'existe encore) |
| Convention V1 unique pré-BETA | 10/10 | Aucune dette — respectée à 100 % sur les 4 repos, y compris les modules bootstrap |
| Index et volumétrie sur tables à forte croissance potentielle | 6/10 | `audit_events` et les tables de tokens courte durée sous-indexées pour leur profil de croissance réel |

---

## Plan d'action

### P0 — Bloquant avant toute donnée réelle / avant intégration `pivot-core-starter` (EN17.1)

- Trancher la stratégie de clé primaire de `collaboratif` (UUID actuel) vs `public` (BIGSERIAL) —
  harmoniser sur `BIGINT` (le plus simple, aucune donnée réelle à migrer aujourd'hui) ou documenter
  formellement un ADR "stratégie d'ID plateforme" si UUID est le choix voulu, avec plan de
  conversion de `public`. Sans cela, la FK cross-schéma documentée (`bdd-multi-schema.md`) sera
  techniquement impossible à créer le jour venu.
- Signaler au mainteneur que `public.teams`/`team_members` (EN17.1/EN17.4) reste un prérequis dur
  avant que `pilotage`, `agilite` ou `collaboratif` ne puissent appliquer la moitié "team" de la
  règle de FK cross-schéma — déjà tracké côté backlog, ce point confirme qu'aucun contournement
  silencieux n'a été tenté entre-temps.

### P1 — Avant le prochain déploiement / dette majeure

- Ajouter les contraintes `CHECK` manquantes sur `collaboratif.board.visibility`,
  `board_member.role`, `board_share_token.role` (toujours dans le `V1__schema_init.sql` unique,
  conformément à la convention pré-BETA).
- Ajouter `CREATE INDEX idx_audit_tenant_created ON audit_events (tenant_id, created_at DESC)`.
- Documenter dans `pivot-docs/docs/setup/` la procédure de reset de base locale après changement du
  contenu de `V1__schema_init.sql` (incident réel du 2026-07-07) — un paragraphe suffit.

### P2 — Sprint suivant / amélioration planifiable

- Migrer les trois repos modules sur `ModuleFlywayConfigurer` dès que `pivot-core-starter` est
  effectivement publié et consommable (EN17.1), à la place de leur configuration Flyway manuelle
  actuelle (fonctionnellement équivalente aujourd'hui, mais dupliquée).
- Ajouter un index (partiel, sur `expires_at`) et un job de purge planifié pour
  `email_verifications`, `password_reset_tokens`, `device_verify_tokens`,
  `suspicious_login_tokens` et `account_deletion_otps`, sur le modèle de `CleanupScheduler`
  existant pour `access_tokens`.

### P3 — Qualité continue

- Maintenir la discipline de commentaire inline sur toute future colonne à sémantique ambiguë ou
  double usage — déjà bien tenue, à ne pas relâcher au fil des prochaines migrations pliées dans
  le `V1` unique.

### Externe

Aucun point hors du contrôle direct de l'équipe à ce stade — les quatre repos audités sont tous
internes à l'organisation, aucune dépendance à un prestataire externe sur le périmètre BDD.

---

## Conclusion

**Verdict : dette maîtrisée, aucun bloquant immédiat — deux points à trancher avant que la
plateforme ne grandisse.** Le schéma `public` de pivot-core est d'un niveau de maturité solide dès
ce premier audit formel : contraintes, index et documentation inline sont d'un niveau qu'on trouve
rarement avant une première mise en production réelle. Les deux réserves principales — la
stratégie de clé primaire divergente sur `collaboratif` (UUID vs BIGINT) et l'absence de
`public.teams`/`team_members` (déjà tracké EN17.1) — ne sont pas des défauts de qualité mais des
décisions d'architecture non encore prises ou non encore implémentées, dont le coût de correction
augmente avec le temps si elles ne sont pas traitées avant que `collaboratif` n'ait des données
réelles ou que `pivot-core-starter` ne soit intégré. Rien dans ce périmètre ne justifie de bloquer
le développement en cours — mais les deux points P0 méritent une décision explicite du mainteneur
avant le prochain sprint qui touche `collaboratif` ou l'intégration `pivot-core-starter`.

---

*Architecte BDD PostgreSQL — 2026-07-08 — indépendant, premier passage — distribution restreinte*

---

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---|---|---|---|
| v1 | 2026-06-20 | — | Initialisation |
| v2 | 2026-07-08 | 7.3/10 | Premier audit formel réel. Schéma `public` (pivot-core) vérifié solide (contraintes, index, conventions). Convention "V1 unique" confirmée respectée à 100 % sur les 4 repos core. Zéro FK cross-schéma illégale constatée. Findings principaux : incompatibilité de type UUID (`collaboratif`) vs BIGINT (`public`) qui bloquera la FK cross-schéma documentée si non résolue avant intégration `pivot-core-starter` ; `public.teams`/`team_members` documentés mais absents du schéma réel (déjà tracké EN17.1, confirmé ici côté BDD) ; index manquant sur `audit_events.tenant_id` ; absence de purge programmée sur 5 tables de tokens courte durée ; procédure de reset DB locale (incident checksum du 2026-07-07) non documentée côté setup dev. |
