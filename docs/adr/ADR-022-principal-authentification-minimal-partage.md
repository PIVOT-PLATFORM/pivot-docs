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
2. Validation dupliquée (chaque `pivot-xxx-core` interroge `public.access_tokens` directement,
   via du code de bibliothèque partagé) vs. centralisée (`pivot-core` reste seul validateur, les
   autres services délèguent par appel réseau).

## Décision

### 1. Validation dupliquée via bibliothèque partagée — pas de centralisation réseau

Chaque `pivot-xxx-core` validera, à terme, ses propres tokens opaques entrants en interrogeant
directement `public.access_tokens` (même instance PostgreSQL partagée, FK cross-schéma vers
`public` déjà la convention établie par EN17.4), à l'aide de code de validation packagé dans
`pivot-core-starter`. **Pas** de délégation réseau vers `pivot-core` comme validateur central.

Raisons :

- **Isolation de panne.** Les `CLAUDE.md` de `pivot-pilotage-core`, `pivot-agilite-core` et
  `pivot-collaboratif-core` documentent explicitement l'isolation de panne vis-à-vis de
  `pivot-core` comme objectif d'architecture. Un appel réseau à `pivot-core` sur chaque requête
  pour une décision d'auth ferait dépendre la disponibilité de chaque module de celle de
  `pivot-core` — contradiction directe avec cet objectif déjà acté.
- **Cohérence avec le reste de l'extraction.** Tout ce qui a déjà été extrait
  (`fr.pivot.core.db`, `fr.pivot.core.modules`, `fr.pivot.core.tenant`/`team`) est une bibliothèque
  consommée in-process, jamais un service réseau. Il n'existe aucun pattern d'appel de service
  interne dans cette codebase — en introduire un maintenant, pour l'auth seule, serait
  architecturalement incohérent avec le reste de la plateforme.
- **Donnée déjà accessible.** `public.access_tokens` (et `public.users`/`public.tenants`, requis
  pour les vérifications de désactivation utilisateur/tenant, voir plus bas) vivent déjà dans
  l'unique instance PostgreSQL partagée que chaque module lit directement — aucune raison
  technique d'ajouter un saut réseau supplémentaire alors que la donnée est déjà atteignable
  directement.

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
- **Interdit :** exposer `fr.pivot.auth.entity.User` (ou tout DTO équivalent portant email, hash
  de mot de passe, état 2FA, appareils de confiance, locale, avatar) depuis
  `fr.pivot.core.auth`/`pivot-core-starter` — seul `AuthenticatedPrincipal` (userId, tenantId,
  role) peut transiter vers un repo module.

## Alternatives écartées

- **Centralisation réseau** (`pivot-core` seul validateur, appel réseau depuis chaque module) :
  écartée — voir raisons détaillées en section Décision (isolation de panne contredite, aucun
  pattern de service interne existant dans la codebase, donnée déjà directement accessible en
  base partagée).
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
