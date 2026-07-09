# US20.1.1 — Créer une session de rétrospective

**En tant que** Scrum Master
**Je veux** créer une session de rétrospective pour mon équipe
**Afin d'** animer une rétrospective structurée à la fin du sprint

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un Scrum Master authentifié membre de l'équipe `teamId`, when il envoie `POST /api/agilite/retro/sessions` (titre, format, teamId, + sprintRef/timers par phase/nombre de votes optionnels), then une session est créée avec lui comme facilitateur, `currentPhase = CONTRIBUTION`, et un code de participation à 6 caractères alphanumériques unique généré | ⬜ |
| Given une session créée, when la réponse est retournée, then elle expose `id`, `title`, `format`, `teamId`, `facilitatorUserId`, `joinCode`, `currentPhase`, `contributionTimerSeconds`/`voteTimerSeconds`/`actionTimerSeconds` (null si non configurés = pas de minuteur, clôture manuelle uniquement), `voteCountPerParticipant` (défaut 3), `expiresAt` (défaut 24h après création, configurable), `createdAt` | ⬜ |
| Given un format parmi `START_STOP_CONTINUE` / `KIF_KAF` / `FOUR_L` / `MAD_SAD_GLAD` / `CUSTOM`, when la session est créée, then le champ `format` référence cette valeur telle quelle — catalogue détaillé des colonnes (nom, couleur, icône) par format = US20.2.1, hors périmètre ici | ⬜ |
| Given un code de participation généré, when un tiers (authentifié ou non — participant sans compte inclus) appelle `GET /api/agilite/retro/sessions/join/{joinCode}`, then les métadonnées minimales de la session (`id`, `title`, `format`, `currentPhase`, `expiresAt`) sont retournées **sans authentification requise** — accès par code sans friction (cf. EPIC README, contre-exemple Retrium sur l'accès par lien) | ⬜ |
| Given une session existante — quelle que soit sa phase, y compris `CLOSED` (US20.1.2c : une session close reste consultable en lecture seule) — when le facilitateur ou un membre de la même équipe (même tenant) appelle `GET /api/agilite/retro/sessions/{id}` avec un token valide, then le détail complet de la session est retourné | ⬜ |
| Error case: given un `teamId` inexistant ou appartenant à un autre tenant, when `POST /sessions` est appelé, system retourne 404 (jamais de confirmation d'existence cross-tenant) | ⬜ |
| Error case: given un `teamId` existant dans le tenant courant dont l'appelant n'est pas membre, when `POST /sessions` est appelé, system retourne 403 | ⬜ |
| Error case: given un `format` hors des 5 valeurs du catalogue (référence invalide), when `POST /sessions` est appelé, system retourne 400 | ⬜ |
| Error case: given un `title` vide ou de plus de 100 caractères, when `POST /sessions` est appelé, system retourne 400 | ⬜ |
| Error case: given un timer de phase (`contributionTimerSeconds`/`voteTimerSeconds`/`actionTimerSeconds`) à 0 ou négatif, when `POST /sessions` est appelé, system retourne 400 — validée à la création : US20.1.2a/b/c consomment ensuite une configuration déjà valide, sans revalider | ⬜ |
| Error case: given un `joinCode` inconnu, when `GET /sessions/join/{joinCode}` est appelé, system retourne 404 | ⬜ |
| Error case: given une session dont `expiresAt` est dépassé ou dont `currentPhase = CLOSED`, when `GET /sessions/join/{joinCode}` est appelé (résolution pour un **nouveau** participant), system retourne 410 — ce gate ne s'applique qu'à la jonction, jamais à `GET /sessions/{id}` (lecture seule toujours autorisée aux membres, cf. AC ci-dessus) | ⬜ |
| Security: `tenantId` extrait exclusivement du token porteur (`AuthenticatedPrincipal`/`TenantContext` résolu serveur, `pivot-core-starter`) sur `POST /sessions` et `GET /sessions/{id}` — jamais du body, d'un query param ou d'un header custom | ⬜ |
| Test TI: `GET /sessions/{id}` sur une session `CLOSED` (ou dont `expiresAt` est dépassé) retourne 200 avec le détail complet — non-régression explicite de la distinction join vs. lecture ci-dessus | ⬜ |
| Security: `GET /sessions/join/{joinCode}` est volontairement public (pas de token requis, condition du "sans friction") mais ne retourne **aucune** donnée sensible — pas de contenu de card, pas de `teamId`/`tenantId`, pas d'identité du facilitateur, uniquement les 5 champs listés ci-dessus | ⬜ |
| Security — **anonymat garanti au niveau schéma** : la table `agilite.retro_cards` (DDL posée par cette US pour porter la garantie dès l'origine ; logique métier complète — entité JPA, repository, service, endpoint de soumission, diffusion STOMP — hors périmètre, portée par US20.1.2a) déclare `is_anonymous BOOLEAN NOT NULL DEFAULT FALSE` + `author_user_id BIGINT NULL REFERENCES public.users(id)`, avec la contrainte `CHECK (NOT is_anonymous OR author_user_id IS NULL)`. **Décision retenue : non-persistance totale de l'auteur pour une card anonyme** (garantie la plus forte), plutôt que chiffrement/accès restreint. **Justification :** un chiffrement (ou une colonne à accès restreint) laisse toujours un point de fuite résiduel — une clé de déchiffrement qui existe quelque part, un rôle admin/DBA qui y accède en clair, une fuite de clé — contraire à l'enseignement du benchmark cité en EPIC README (« l'auteur d'une contribution anonyme non retrouvable a posteriori par un rôle non-animateur »). En ne persistant jamais la valeur, la propriété est vraie *par construction* : impossible à retrouver par quiconque, y compris un accès BDD direct ou un futur rôle animateur élargi — pas seulement un masquage visuel côté UI, cf. exigence explicite de l'EPIC README | ⬜ |
| Security: le `joinCode` est généré via `SecureRandom` (jamais `Random`/`Math.random`), alphabet alphanumérique majuscule (A–Z, 0–9 — 36 caractères, ambiguïté 0/O et 1/I acceptée : code affiché et copié depuis l'UI, jamais dicté à l'oral), 6 caractères, unicité vérifiée par contrainte `UNIQUE` en base avec re-génération bornée (5 tentatives) en cas de collision | ⬜ |
| Test TI: génération de session concurrente (plusieurs créations simultanées) ne produit jamais deux `joinCode` identiques (contrainte `UNIQUE` + re-génération vérifiées sous contention) | ⬜ |
| Test TI: une tentative d'insertion SQL directe d'une card `is_anonymous = TRUE` avec `author_user_id` non nul est rejetée par la contrainte `CHECK` de la base (preuve que la garantie d'anonymat est appliquée au niveau schéma, pas seulement documentée) | ⬜ |
| Test TI cross-tenant: une session d'un autre tenant retourne 404 sur `GET /sessions/{id}` | ⬜ |

## Hors périmètre

- Catalogue complet des formats (colonnes, couleurs, icônes par format prédéfini + création de format `CUSTOM`) → US20.2.1
- Soumission/masquage/révélation des cards, timers runtime, transitions de phase automatiques (STOMP) → US20.1.2a
- Vote (dot-voting) → US20.1.2b
- Clôture de session par transition temps réel, passage en lecture seule → US20.1.2c
- Attribution du rôle `ROLE_GUEST` et gestion d'identité participant en connexion temps réel (WebSocket) → US20.1.2a — cette US ne fait que résoudre le `joinCode` en métadonnées de session, elle ne crée aucune session de participation
- CRUD complet des sessions (renommage, suppression, listing par équipe) — non demandé par cette US, pourra faire l'objet d'un ticket dédié si le besoin apparaît
- Persistance/logique métier de `retro_cards` (entité JPA, repository, service, endpoint de soumission) → US20.1.2a ; seule la définition DDL (forme de la table + contrainte d'anonymat) est posée ici, à titre de fondation non contournable

## Notes d'implémentation

- **`pivot-core-starter` ≥ 0.28.0** — dépendance à ajouter fraîchement à `pivot-agilite-core` (jusqu'ici absente, cf. gap documenté au bootstrap : désormais levé, le starter est réellement publié par `pivot-core` depuis la version 0.27.0/0.28.0). Consommer `fr.pivot.core.auth.AuthenticatedPrincipal`/`AuthenticatedPrincipalResolver`, `fr.pivot.core.tenant.TenantContext`, et réutiliser directement `fr.pivot.core.team.Team`/`TeamRepository`/`TeamMemberRepository` (déjà exportés, pas besoin de dupliquer une entité `Team` locale) pour la vérification d'appartenance équipe/tenant.
- **Pattern d'authentification** — suivre le précédent EN08.3 de `pivot-collaboratif-core` : `RequestPrincipal`/`RequestPrincipalResolver` (résolution `Authorization: Bearer`) + `TokenValidationService` implémentant `AuthenticatedPrincipalResolver`, avec entités de lecture seule dupliquées (`PlatformAccessToken`/`PlatformUser`/`PlatformTenant` mappées sur `public.*`) — validation dupliquée localement contre `public.access_tokens`, jamais d'appel réseau vers `pivot-core` (ADR-022).
- **Piège Spring Security auto-config** — `pivot-core-starter` 0.28.0 marque désormais `spring-boot-starter-security`/`spring-security-oauth2-jose` `optional=true` (`pivot-core#211`, corrige le verrouillage HTTP Basic constaté sur `pivot-collaboratif-core` avant ce correctif) : a priori plus de verrouillage auto-config transitif en épinglant ≥ 0.28.0. À vérifier empiriquement (`mvn dependency:tree`, test d'un appel réel) avant de décider si un `SecurityConfig` (permit-all, cf. précédent `pivot-collaboratif-core`) reste nécessaire.
- **Table `agilite.retro_cards`** posée en DDL dans cette US (`V1__schema_init.sql`, convention V1 unique pré-BETA) pour porter la garantie d'anonymat dès l'origine — aucune classe Java (entité/repository/service/contrôleur) associée dans cette US, réservé à US20.1.2a qui construira sur ce contrat sans le redéfinir.
- `joinCode` : unicité **globale** (pas seulement par tenant) — un participant sans compte ne connaît pas de tenant au moment de la saisie du code, le code doit donc être suffisant à lui seul pour router vers la bonne session, quel que soit le tenant.
- `expiresAt` par défaut 24h après création (cohérent avec la convention `US09.1.1` — room scrum poker), configurable si un besoin apparaît, non exposé en paramètre de création dans cette première version (valeur fixe côté service).

---
Item Type: US · Parent: F20.1 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
