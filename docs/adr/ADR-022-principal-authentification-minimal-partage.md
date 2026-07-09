# ADR-022 — Principal d'authentification minimal partagé (`pivot-core-starter`)

**Date :** 2026-07-08
**Statut :** Proposé
**Décideurs :** Architecte Java / Spring, Expert OIDC / IAM, Expert Red Team, Expert Blue Team, mainteneur
**Contexte technique :** `pivot-core#171` (EN17.1, volet `fr.pivot.core.auth`)

---

## Contexte

EN17.1 extrait les packages partagés de `pivot-core` vers l'artifact Maven publié
`fr.pivot:pivot-core-starter`, consommé en dépendance par les repos `pivot-xxx-core`
(`pivot-pilotage-core`, `pivot-agilite-core`, `pivot-collaboratif-core`). Trois des quatre volets
sont faits et mergés (`fr.pivot.core.db`, `fr.pivot.core.modules`, `fr.pivot.core.tenant` +
`fr.pivot.core.team`, PR pivot-core#167/#173/#177). Le quatrième (`fr.pivot.core.auth`) a été
escaladé sur `pivot-core#171` (`needs-human-review`) plutôt qu'implémenté :

- `TokenAuthenticationFilter` (valide le token opaque porté par chaque requête) et `TokenService`
  (~474 lignes — émission, validation, rotation, révocation) travaillent tous deux directement sur
  l'entité JPA concrète `fr.pivot.auth.entity.User` (email, mot de passe, 2FA, appareils de
  confiance, locale, avatar…) et sur `fr.pivot.auth.entity.AccessToken`.
- Un déplacement mécanique de ce code vers le starter emporterait ces entités propres à
  `pivot-core-app` — hors périmètre du starter par design (qui n'expose que les entités
  réellement partagées du schéma `public`, à l'image de `Team`/`TenantContext`).
- Un futur repo module qui veut valider lui-même les tokens opaques qu'il reçoit (plutôt que de
  toujours faire proxy des décisions d'auth via `pivot-core`) a besoin d'une identité minimale
  partagée — pas du profil complet.
- La mention historique « OIDC resource server » ne correspond plus au code actuel :
  `SecurityConfig` documente explicitement avoir remplacé `oauth2ResourceServer().jwt()` par les
  tokens opaques — il n'y a plus de décodeur JWT/JWKS générique à extraire. Seul subsiste
  `OidcAuthService` (échange d'une identité IdP externe contre un token opaque au login), un flow
  de login UI-facing, pas un composant réutilisable de validation de requêtes entrantes.

Deux décisions étaient nécessaires avant tout déplacement de code, formulées explicitement dans
l'escalade `pivot-core#171` :

1. La forme du principal minimal partagé.
2. Comment un repo module valide un token opaque entrant.

### Paysage IAM — où se situe ce choix

Pour un portail central + modules qui possèdent chacun leurs données, la littérature identifie
trois familles de solutions pour ce problème précis (« un service B doit vérifier une identité
émise par un service A ») — nommées explicitement ici pour que ce choix soit comparable à l'état
de l'art, pas seulement à lui-même :

| Pattern | Mécanisme | Référence |
|---------|-----------|-----------|
| **Lecture directe du store partagé** | B lit la même base que A pour valider | Pas de RFC — pattern « base partagée », courant dans les monolithes modulaires co-déployés |
| **Token introspection** | B appelle A en réseau à chaque validation (ou avec cache TTL court) | [RFC 7662](https://www.rfc-editor.org/rfc/rfc7662) |
| **Token exchange / assertion interne signée** | A échange le token porteur contre un JWT signé, courte durée de vie, que B vérifie localement (signature seule, ni DB ni réseau par requête) | [RFC 8693](https://www.rfc-editor.org/rfc/rfc8693) — pattern courant des BFF/API Gateways (Netflix Passport, Kong/Ambassador + JWT, Cognito token exchange) |

Le troisième pattern est celui le plus souvent cité comme référence pour une architecture
« portail + services propriétaires de leurs données », précisément parce qu'il élimine à la fois
le couplage réseau par requête *et* le couplage par schéma partagé. Il suppose cependant un point
d'échange dans le chemin de la requête (un gateway/BFF qui termine le token porteur et émet
l'assertion interne) — **PIVOT n'a pas ce point aujourd'hui** : nginx route chaque module
directement (`/api/collaboratif/` → `pivot-collaboratif-core:8083`), le navigateur porte un seul
token opaque envoyé tel quel à quelque service que nginx cible, sans hop d'échange. Introduire le
pattern 3 supposerait donc soit un nouvel endpoint d'échange côté `pivot-core` appelé une fois
par session côté `pivot-ui` (et non par requête), soit un vrai gateway applicatif — un changement
d'architecture qui dépasse le périmètre de cette ADR. Il reste noté ci-dessous comme trigger de
réévaluation.

## Décision

### 1. Lecture directe du store partagé — pas d'introspection réseau, pas de token exchange

Chaque `pivot-xxx-core` validera, à terme, ses propres tokens opaques entrants en interrogeant
directement `public.access_tokens` (même instance PostgreSQL partagée, FK cross-schéma vers
`public` déjà la convention établie par EN17.4), à l'aide de code de validation packagé dans
`pivot-core-starter`. **Pas** de délégation réseau vers `pivot-core` (ni introspection RFC 7662,
ni token exchange RFC 8693 — voir §Paysage IAM ci-dessus pour pourquoi ce dernier n'est pas
praticable sans architecture supplémentaire).

Raisons :

- **Cohérence avec un choix déjà pris, pas un nouveau risque isolé.** EN17.4 a déjà établi que les
  repos modules lisent `public.tenants`/`public.teams` par FK cross-schéma, sur la même instance
  Postgres partagée — ce choix architectural pour les données de référence est déjà acté et vécu.
  Étendre `public.access_tokens` au même mécanisme n'introduit pas une nouvelle catégorie de
  couplage, ça applique la convention déjà en vigueur. Introduire l'introspection réseau (pattern
  2) créerait à l'inverse un **nouveau** type de dépendance (appel HTTP synchrone inter-service)
  qui n'existe nulle part ailleurs dans la codebase — un coût d'architecture réel, pas hypothétique.
- **Isolation de panne.** Les `CLAUDE.md` de `pivot-pilotage-core`, `pivot-agilite-core` et
  `pivot-collaboratif-core` documentent explicitement l'isolation de panne vis-à-vis de
  `pivot-core` comme objectif d'architecture. Un appel réseau à `pivot-core` sur chaque requête
  pour une décision d'auth ferait dépendre la disponibilité de chaque module de celle de
  `pivot-core` — contradiction directe avec cet objectif déjà acté.
- **Donnée déjà accessible.** `public.access_tokens` (et `public.users`/`public.tenants`, requis
  pour les vérifications de désactivation utilisateur/tenant, voir plus bas) vivent déjà dans
  l'unique instance PostgreSQL partagée que chaque module lit directement — aucune raison
  technique d'ajouter un saut réseau supplémentaire alors que la donnée est déjà atteignable
  directement.

**Nuance assumée, à ne pas sous-estimer** : `public.tenants`/`public.teams` (déjà lus par FK) sont
des données de référence à faible churn, avec un contrat de schéma stable. `public.access_tokens`
est une donnée à fort churn, sécurité-critique (émission/rotation/révocation continues) — le
risque de couplage schéma n'est donc pas strictement équivalent, même si le mécanisme d'accès
l'est. Traité explicitement en Conséquences ci-dessous, pas juste glissé sous le tapis de
l'argument « on le fait déjà pour les tenants ».

### 2. Forme du principal minimal : `fr.pivot.core.auth.AuthenticatedPrincipal`

```java
package fr.pivot.core.auth;

public record AuthenticatedPrincipal(Long userId, Long tenantId, String role) {
}
```

- `userId` — clé primaire `public.users.id`.
- `tenantId` — clé primaire `public.tenants.id`.
- `role` — rôle Spring Security de l'utilisateur (`ROLE_ADMIN`, `ROLE_USER`…).

**Exclus délibérément** — tout ce qui est profil applicatif propre à `pivot-core-app`, jamais
nécessaire à une décision d'autorisation côté module : email, hash de mot de passe, état 2FA,
appareils de confiance, locale, avatar, statut de suppression RGPD, historique de connexion, etc.
Ces champs restent privés à `fr.pivot.auth.entity.User` — jamais promus dans le starter.

`AuthenticatedPrincipal` diffère volontairement de `fr.pivot.core.tenant.TenantContext` existant
(qui porte `userId` en `String`, hérité d'un usage de journalisation/affichage) : le nouveau type
porte des clés primaires `Long`, cohérent avec le type natif utilisé partout ailleurs dans la
couche persistance (`User.id`, `Tenant.id`, `Team.id`) — nécessaire pour qu'un futur repo module
puisse s'en servir directement dans une requête JPA/SQL (jointure, filtre), pas seulement pour de
la journalisation. Aucun changement rétroactif de `TenantContext` — hors périmètre de cette ADR.

### 3. Frontière d'abstraction : `fr.pivot.core.auth.AuthenticatedPrincipalResolver`

```java
package fr.pivot.core.auth;

import java.util.Optional;

public interface AuthenticatedPrincipalResolver {
    Optional<AuthenticatedPrincipal> resolve(String rawToken);
}
```

Contrat partagé : résoudre un token opaque brut vers un `AuthenticatedPrincipal`, sans exposer
l'entité JPA concrète `User`. `fr.pivot.core.auth` (starter) exporte uniquement ce type et cette
interface dans cette ADR — pas la logique de hashing/expiration/révocation elle-même (voir
« Ce qui n'est pas fait maintenant » ci-dessous).

**Implémentation actuelle (`pivot-core-app`)** : `fr.pivot.auth.service.TokenService` implémente
`AuthenticatedPrincipalResolver`. Sa méthode `resolve(rawToken)` délègue à la méthode `validate()`
existante (inchangée — même requête, mêmes vérifications d'expiration/révocation/désactivation
tenant/utilisateur) et projette le résultat vers `AuthenticatedPrincipal`. `TokenService` continue
par ailleurs d'exposer sa surface riche (`issue`, `rotate`, `revoke`…) pour les besoins internes de
`pivot-core-app` qui ont besoin du profil complet.

**`TokenAuthenticationFilter` n'est pas modifié.** Il continue de peupler
`Authentication#getDetails()` avec l'entité `User` complète — une dizaine de contrôleurs
(`AccountController`, `AdminUserController`, `ModuleController`, `SuperAdminTenantController`,
`NotificationController`, `RequestMdcFilter`…) font `auth.getDetails() instanceof User` pour
accéder au profil complet de l'utilisateur courant. Remplacer cette valeur par le principal minimal
casserait tous ces appelants — hors périmètre du « zero behavior change » exigé par ce ticket. La
frontière d'extraction pertinente est `TokenService`, pas le filtre.

**Premier consommateur réel de l'interface (pas seulement le type)** :
`fr.pivot.notification.config.StompAuthChannelInterceptor` (authentification de la frame STOMP
`CONNECT`, EN-NOTIF) n'avait besoin que de `user.getId()` — jamais du profil complet. Il dépend
maintenant de `AuthenticatedPrincipalResolver` plutôt que de `TokenService`/`User` concrets, sans
changement de comportement (même rejet si token invalide/absent, même principal STOMP
`userId.toString()`). Démontre que l'abstraction fonctionne pour un besoin d'identité pure déjà
existant dans la codebase, pas seulement pour un futur repo module hypothétique.

### Ce qui n'est pas fait maintenant (hors périmètre volontaire)

La logique de validation elle-même (hash SHA-256, comparaison d'expiration, vérification
`tenant_invalidation_timestamp`, vérification `user.isActive()`) **reste** dans
`fr.pivot.auth.service.TokenService`, contre les entités JPA concrètes — elle n'est **pas**
dupliquée dans le starter par cette ADR. Constat de l'escalade `pivot-core#171` toujours valide :
aucun des trois repos module n'a de logique métier implémentée à ce jour (tous en bootstrap
infrastructure), donc aucun consommateur réel n'a besoin aujourd'hui d'interroger
`public.access_tokens` lui-même. Extraire cette logique maintenant (requêtes SQL/JPA
partagées, projection minimale sur `access_tokens`/`users`/`tenants`) serait de l'infrastructure
spéculative — à faire quand un premier repo module aura un besoin métier réel de valider des
tokens en local, dans un ticket dédié référençant cette ADR pour la forme du principal et le choix
« dupliqué, pas centralisé ».

## Conséquences

- **Positif :** lève le blocage `needs-human-review` sur `pivot-core#171` — le volet `auth` peut
  être implémenté sans rouvrir le débat d'architecture à chaque fois. Fournit un type stable
  (`AuthenticatedPrincipal`) et un contrat (`AuthenticatedPrincipalResolver`) que le futur travail
  d'extraction de la validation elle-même pourra réutiliser sans redéfinir la forme du principal.
- **Positif :** zéro changement de comportement pour `pivot-core-app` — `TokenService`/
  `TokenAuthenticationFilter` gardent leur logique de login/2FA/session/appareils de confiance
  intacte ; seule une méthode additive (`resolve`) et un consommateur interne
  (`StompAuthChannelInterceptor`) changent.
- **Négatif :** la duplication de validation (une fois implémentée dans chaque repo module)
  duplique aussi la surface de bug potentielle (chaque module doit répliquer correctement les
  vérifications d'expiration/révocation/désactivation) — atténué en centralisant cette logique
  dans `pivot-core-starter` au moment de l'implémenter (ticket dédié), pas copiée-collée
  manuellement par repo.
- **Négatif :** tant que la logique de validation elle-même n'est pas extraite, un repo module qui
  voudrait valider ses propres tokens aujourd'hui devrait soit attendre ce futur ticket, soit
  continuer de déléguer via `pivot-core` en proxy — acceptable car aucun repo module n'a ce besoin
  aujourd'hui (constat de l'escalade, revérifié à la date de cette ADR).
- **Négatif, à surveiller activement (pattern « base partagée ») :** `public.access_tokens` étant
  une donnée à fort churn et sécurité-critique (pas une donnée de référence stable comme
  `tenants`/`teams`), son schéma devient de fait un **contrat inter-repos**, au même titre qu'une
  API versionnée — un changement (nouvel algorithme de hash, ajout d'un token binding par device,
  nouvelle colonne de révocation) impacte silencieusement tout module ayant dupliqué la logique de
  lecture, sans le filet de sécurité qu'offrirait un contrat réseau versionné (RFC 7662/8693).
  Mitigation actée : (1) toute migration sur `access_tokens` doit rester **additive uniquement**
  tant que des repos modules en dépendent en lecture directe (jamais de renommage/suppression de
  colonne sans période de dépréciation coordonnée) ; (2) la logique de lecture elle-même reste
  centralisée dans `pivot-core-starter` (une seule implémentation versionnée consommée par tous
  les modules, jamais du copié-collé SQL par repo) — déjà la décision prise en §1, mais listée ici
  comme la mitigation concrète du risque, pas seulement comme un choix de commodité.
- **Interdit :** exposer `fr.pivot.auth.entity.User` (ou tout DTO équivalent portant email, hash
  de mot de passe, état 2FA, appareils de confiance, locale, avatar) depuis
  `fr.pivot.core.auth`/`pivot-core-starter` — seul `AuthenticatedPrincipal` (userId, tenantId,
  role) peut transiter vers un repo module.

## Trigger de réévaluation

Cette ADR n'est pas un choix figé pour la durée de vie du projet — à rouvrir explicitement si
l'une de ces conditions survient :

- **Éclatement de la base Postgres par module** (chaque `pivot-xxx-core` sur son instance
  propre) — casse l'hypothèse fondatrice (« la donnée est déjà accessible localement ») ; la
  lecture directe devient alors un vrai appel réseau déguisé, sans les garanties d'un pattern
  standard. Migrer vers introspection (RFC 7662) ou token exchange (RFC 8693) à ce moment-là, pas
  avant.
- **Volume de repos modules qui rend le coût de coordination de schéma significatif** — au-delà
  de 3-4 repos consommateurs de `access_tokens` en lecture directe, le coût de coordination d'une
  migration additive peut dépasser celui d'un contrat réseau versionné.
- **EN07.11 (mTLS interne / Service Mesh, phase-3)** — une fois un mesh en place, l'appel réseau
  inter-service authentifié (mTLS) devient une primitive déjà payée pour d'autres raisons
  (chiffrement transport, identité de service) ; le token exchange (pattern 3, §Paysage IAM)
  devient alors quasi gratuit à ajouter et résout à la fois le couplage schéma et la duplication de
  logique de validation — c'est le moment naturel de migrer, pas avant que ce socle existe.
- **Un module a besoin de politiques d'accès aux tokens différentes des autres** (ex. TTL propre,
  contrainte de device binding spécifique à un module) — la lecture directe suppose une sémantique
  de token uniforme pour tous les consommateurs ; un besoin de différenciation casserait cette
  hypothèse et pousserait vers un contrat explicite par consommateur (token exchange scoping).

## Alternatives écartées

- **Token introspection réseau** ([RFC 7662](https://www.rfc-editor.org/rfc/rfc7662) —
  `pivot-core` seul validateur, chaque module appelle un endpoint d'introspection, avec ou sans
  cache TTL court) : écartée pour ce Socle — voir raisons détaillées en section Décision
  (isolation de panne contredite, aucun pattern d'appel de service interne existant dans la
  codebase à ce jour, donnée déjà directement accessible en base partagée). Pattern standard et
  légitime en soi ; le bon choix architectural change si la base Postgres cesse d'être partagée
  (voir §Trigger de réévaluation) — pas écartée sur le fond, écartée sur le calendrier.
- **Token exchange / assertion interne signée** ([RFC 8693](https://www.rfc-editor.org/rfc/rfc8693)
  — `pivot-core` échange le token porteur contre un JWT signé courte durée, vérifié localement par
  chaque module sans DB ni réseau par requête) : écartée pour cette ADR — c'est le pattern le plus
  souvent cité comme référence pour une architecture portail + modules propriétaires de leurs
  données (élimine à la fois couplage réseau et couplage schéma), mais suppose un point d'échange
  dans le chemin de la requête que PIVOT n'a pas aujourd'hui (nginx route chaque module
  directement, pas de hop d'échange géré par `pivot-core`). L'introduire maintenant demanderait un
  nouvel endpoint d'échange + un changement du flux `pivot-ui` (récupérer un second token
  scope-module) — hors périmètre du « zero behavior change » de cette extraction. Candidat naturel
  une fois EN07.11 (mTLS/Service Mesh) posé (voir §Trigger de réévaluation).
- **Réutiliser `fr.pivot.core.tenant.TenantContext` tel quel comme principal partagé** : écartée —
  son champ `userId` est un `String` (hérité d'un usage de journalisation), inadapté à une
  jointure/filtre JPA direct sur `public.users.id` dans un futur repo module ; le faire évoluer en
  `Long` casserait ses appelants existants (`ModuleController`, tests `ModuleRegistryServiceTest`)
  sans rapport avec le périmètre de cette ADR.
- **Extraire immédiatement toute la logique de validation** (hash, expiration, révocation,
  désactivation tenant/utilisateur) dans le starter avec cette ADR : écartée — aucun consommateur
  réel aujourd'hui (constat inchangé depuis l'escalade `pivot-core#171`), infrastructure
  spéculative ; sera traitée dans un ticket dédié une fois un premier repo module concerné.
- **Faire porter le principal minimal par `TokenAuthenticationFilter#authenticateRequest`
  directement (remplacer `User` par `AuthenticatedPrincipal` dans
  `Authentication#getDetails()`)** : écartée — casserait tous les contrôleurs existants qui font
  `auth.getDetails() instanceof User`, violation directe de la contrainte « zero behavior change »
  du ticket d'implémentation.

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-07-08 | Décision initiale — lève l'escalade `pivot-core#171` (volet auth) |
| v2 | 2026-07-09 | Clarification à la demande du mainteneur : décision inchangée, mais reformulée contre le paysage IAM nommé explicitement (introspection RFC 7662, token exchange RFC 8693, lecture directe) plutôt qu'une « centralisation réseau » vague. Ajoute le risque de couplage schéma sur donnée à fort churn (nuance vs. `tenants`/`teams`, données de référence stables) comme conséquence négative explicite avec mitigation actée (migrations additives uniquement + logique centralisée dans le starter). Ajoute une section Trigger de réévaluation (éclatement DB par module, volume de repos consommateurs, arrivée d'EN07.11 mTLS/Service Mesh, besoin de politiques de token différenciées par module) — la décision n'est pas figée, elle est datée et conditionnée. Toujours `Statut: Proposé` — cette révision ne vaut pas acceptation formelle. |
