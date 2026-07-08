# Audit Sécurité applicative — PIVOT Platform

## Date : 2026-07-08 — v2 (premier audit formel)

## Expert : Expert Red Team (offensif) + Expert Blue Team (corrections) — **double-passe** (voir note méthodologique — union réconciliée de deux passes indépendantes)

## Périmètre : `pivot-core` (auth, opaque tokens, OIDC resource server, `TenantContext`, endpoints `/api/admin/*` et `/api/superadmin/*`), `pivot-ui` (client OIDC PKCE, gestion des tokens Angular), `pivot-collaboratif-core` (WebSocket STOMP, isolation de room, présence)

---

## Note méthodologique — double-passe réalisée (fusion réconciliée)

Cet audit a fini par suivre une véritable méthodologie double-passe, bien que non planifiée comme
telle au départ :

- **Passe A** : trois investigations indépendantes en parallèle (une par repo), en lecture seule
  (`Read`/`grep`/`find`/`git show`, aucune écriture). Pour `pivot-collaboratif-core`, l'agent a
  détecté que le checkout local (`main`) était **2 commits derrière `origin/main`** et a
  explicitement relu le code réellement mergé via `git show <sha>:<path>` plutôt que de se fier au
  répertoire de travail local.
- **Passe B** : un second agent, lancé en parallèle sur `pivot-core` puis ayant poursuivi de façon
  autonome sur les trois repos, a produit sa propre version complète du rapport (score 5.5/10,
  5 findings) et l'a écrite directement dans ce fichier pendant la rédaction de la Passe A —
  détecté par conflit d'écriture (`File has been modified since read`).
- **Réconciliation** : les deux passes convergent totalement sur `pivot-core` et `pivot-ui`
  (mêmes bonnes pratiques, mêmes gaps). Sur `pivot-collaboratif-core`, un écart réel est apparu :
  la Passe B a audité **le répertoire de travail local non rafraîchi**, qui il a été vérifié ici
  est bien **2 commits derrière `origin/main`**, sans exécuter `git fetch`/`git show` sur la
  branche distante. Preuve : `git log HEAD..origin/main` liste `7217d8e` (US08.3.1 — endpoint WS
  canvas STOMP, introduit `CanvasActionService`) et `44e1b7c` (US08.4.1 — templates), tous deux
  absents du commit audité par la Passe B ; `git diff HEAD..origin/main --stat` confirme que
  `CanvasActionService.java`/`CanvasActionMessage.java` n'existent pas dans l'arbre lu par la
  Passe B et que `WhiteboardPresenceRegistry.java` y a une version différente. Ceci explique
  mécaniquement pourquoi la Passe B (1) n'a trouvé aucun finding HIGH — le bug d'autorisation
  vivait dans un fichier qu'elle n'a pas vu — et (2) a conclu que le double mécanisme de présence
  de l'issue #32 « n'a pas été retrouvé » — le second mécanisme concurrent vivait dans ce même
  fichier absent de sa lecture.
- **Décision de publication** : conformément à `skill-audit-format`
  (`double_passe_optionnelle` : *"le score publié est l'union des deux passes, le plus prudent des
  deux sur les findings actifs"*), ce rapport retient l'**union** des findings des deux passes,
  avec le code réellement présent sur `origin/main` comme référence faisant foi (c'est l'état qui
  serait déployé), et le score CVSS le plus prudent quand les deux passes divergent sur un même
  finding (détail des deux scores individuels noté dans chaque cas concerné).

Cette expérience elle-même constitue une leçon méthodologique à retenir pour les audits futurs :
**toujours vérifier `git status`/`git fetch` avant d'auditer un repo** — un checkout local
périmé peut produire un rapport qui semble complet et rigoureux tout en manquant des pans entiers
de fonctionnalité.

---

## Score global : 3.3/10 ↔ (premier audit — pas de tendance antérieure)

Premier audit formel — aucune version antérieure à comparer (`v1` du 2026-06-20 était une simple
initialisation, sans score). Le score consolidé est tiré vers le bas par un **finding CRITIQUE
unique (VULN-001, CVSS 10.0)** : l'authentification de `pivot-collaboratif-core` (REST et
WebSocket) repose entièrement sur des en-têtes HTTP auto-déclarés par le client, sans aucune
vérification cryptographique — ce qui rend inopérants, en pratique, tous les contrôles d'isolation
tenant/room construits par-dessus dans ce même repo, malgré leur qualité de conception intrinsèque
— et un **finding HIGH réel** (VULN-002, contournement RBAC sur le canvas temps réel) que seule la
Passe A (lecture d'`origin/main` à jour) a détecté.

**Score par repo** (composante du score consolidé, à titre indicatif — convergent entre les deux
passes pour `pivot-core`/`pivot-ui`) :

| Repo | Score indicatif | Lecture |
|------|------------------|---------|
| `pivot-core` | ~8.6/10 | Auth par token opaque, RBAC, rate limiting et isolation tenant très solides — confirmé indépendamment par les deux passes |
| `pivot-ui` | ~7.1/10 | Bonne hygiène tokens/XSS/guards, mais écart de conformité factuel sur l'OIDC PKCE (non implémenté malgré la documentation) — confirmé indépendamment par les deux passes |
| `pivot-collaboratif-core` | ~1.3/10 | VULN-001 (authentification absente) invalide la garantie d'isolation tenant/room pourtant bien conçue ; VULN-002 (contournement RBAC canvas) aggrave le tableau — visible uniquement en auditant `origin/main` à jour |

---

## I. Résumé exécutif

PIVOT dispose d'un socle d'authentification (`pivot-core`) et d'un client (`pivot-ui`) **matures
et globalement bien conçus**, confirmé par deux lectures indépendantes du code : tokens opaques
SHA-256/SecureRandom 256 bits, aucune injection SQL/JPQL détectée sur les trois repos, aucun
secret en dur, upload d'avatar avec détection de magic bytes, rate limiting Redis exhaustif sur
tous les endpoints sensibles, résolution d'IP via `RemoteIpValve` avec liste de proxies de
confiance, RBAC systématiquement porté par `@PreAuthorize` au niveau service, isolation tenant
vérifiée dans le code (jamais de `tenantId`/`userId` accepté depuis le body/query/header) avec un
vrai réflexe **404 (pas 403)** sur ressource cross-tenant, et absence de disclosure de statut de
compte testée explicitement en e2e.

Ce constat positif est cependant contredit de façon spectaculaire par **`pivot-collaboratif-core`**,
où l'ensemble des fonctionnalités métier déjà mergées (CRUD de tableau, partage, présence, canvas
collaboratif temps réel — y compris les deux dernières US mergées `7217d8e`/`44e1b7c`, absentes du
checkout local audité par la seconde passe) reposent sur une authentification **totalement
absente** : l'identité de l'appelant (userId, tenantId) est lue directement depuis des en-têtes
HTTP (`X-Pivot-User-Id`, `X-Pivot-Tenant-Id`) que n'importe quel client peut fixer à la valeur de
son choix. Vérification faite : aucune passerelle authentifiante n'existe aujourd'hui devant ce
service — le routing nginx (confirmé côté `pivot-collaboratif-ui/nginx.conf` : seuls
`Host`/`X-Real-IP`/`X-Forwarded-For`/`X-Forwarded-Proto` sont posés, jamais les en-têtes
`X-Pivot-*`) est un simple reverse-proxy, et la passerelle qui validerait un token en entrée
(`EN43.2 — API Gateway`) est encore `Stage: Backlog`. Ce n'est donc pas un risque théorique
neutralisé par une couche non auditée : c'est un contournement total et immédiatement exploitable
de l'isolation tenant si ce service était exposé tel quel — vecteur REST confirmé exploitable via
la configuration d'ingress actuelle.

Le `CLAUDE.md` de `pivot-collaboratif-core` affirme encore *"Statut actuel : bootstrap (…) aucune
feature métier n'est implémentée"* — affirmation obsolète au vu du code mergé sur `origin/main`.
Le repo documente lui-même la dépendance non satisfaite (`pivot-core-starter` non publié), avec
des `TODO` explicites dans le code. Le problème n'est donc pas l'existence du TODO, mais le fait
que des fonctionnalités complètes aient été construites et mergées par-dessus, en violation de la
règle absolue documentée du repo lui-même.

**Verdict** : `pivot-core` et `pivot-ui` sont proches du niveau de maturité attendu pour une mise
en production progressive ; `pivot-collaboratif-core` est **non déployable en l'état**, quel que
soit le réseau cible, tant que VULN-001 (et idéalement VULN-002) ne sont pas corrigés.

---

## II. CRITIQUE

### VULN-001 — Authentification WebSocket et REST totalement absente (headers client non vérifiés)

- **Repo / fichiers** : `pivot-collaboratif-core`
  - `src/main/java/fr/pivot/collaboratif/whiteboard/ws/StompHandshakeInterceptor.java:51-66`
  - `src/main/java/fr/pivot/collaboratif/context/RequestPrincipalResolver.java:61-91`
  - confirmé non filtré par `pivot-collaboratif-ui/nginx.conf:48-53`
- **Sévérité** : CRITIQUE
- **Catégorie OWASP** : A07:2021 (Identification and Authentication Failures) / A01:2021 (Broken Access Control)
- **CVSS v3.1 (retenu)** : `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H` — **10.0**
  *(double-passe : Passe A = 10.0 avec `A:H` — la suppression/destruction en masse de tableaux d'un tenant entier constitue une perte de disponibilité de la ressource gérée, pas seulement une atteinte d'intégrité ; Passe B = 9.1 avec `A:N`. Score le plus prudent retenu = 10.0, conformément à la règle de fusion double-passe.)*

**Code vulnérable** (`StompHandshakeInterceptor.beforeHandshake`) :
```java
String rawUserId = request.getHeaders().getFirst(HEADER_USER_ID);      // "X-Pivot-User-Id"
String rawTenantId = request.getHeaders().getFirst(HEADER_TENANT_ID);  // "X-Pivot-Tenant-Id"
UUID userId = parseUuid(rawUserId);
UUID tenantId = parseUuid(rawTenantId);
if (userId == null || tenantId == null) {
    response.setStatusCode(HttpStatus.UNAUTHORIZED);
    return false;
}
attributes.put(ATTR_USER_ID, userId);      // devient le StompPrincipal — fait foi partout ensuite
attributes.put(ATTR_TENANT_ID, tenantId);
```
`RequestPrincipalResolver.resolveArgument()` applique exactement le même schéma côté REST. Aucune
vérification cryptographique, aucun opaque token, aucune session — ces valeurs sont **entièrement
choisies par le client**. Les deux fichiers l'assument explicitement dans leur JavaDoc : *"TODO:
replace header extraction with opaque-token validation once `fr.pivot:pivot-core-starter` is
published (EN17)"*.

**PoC (REST)** :
```http
POST /api/collaboratif/whiteboard/join?token=<token de partage capturé/deviné>
X-Pivot-User-Id: <UUID de la victime ou choisi par l'attaquant>
X-Pivot-Tenant-Id: <UUID du tenant ciblé>
```
Aucune preuve d'authentification n'est demandée : l'attaquant choisit littéralement l'identité
sous laquelle il agit — sur tous les endpoints REST et sur le handshake WebSocket.

**Vérification indépendante de l'exposition réelle** (recoupée par les deux passes) :
- `pivot-collaboratif-ui/nginx.conf:48-53` ne pose ni ne filtre `X-Pivot-User-Id`/`X-Pivot-Tenant-Id` —
  seuls `Host`/`X-Real-IP`/`X-Forwarded-For`/`X-Forwarded-Proto` sont gérés. Un client peut donc les
  envoyer directement, transmis tels quels jusqu'au backend. **Vecteur REST confirmé exploitable
  via la configuration d'ingress actuelle.**
- Le routing nginx multi-module prévu (`EN17.7`) reste un simple `proxy_pass` par préfixe d'URL —
  aucune validation de token. La passerelle qui validerait un token en entrée (`EN43.2 — API
  Gateway`) est `Stage: Backlog`, `Statut: ⬜ À faire` — non implémentée. Aucun composant de
  l'architecture actuelle n'intercepte ni ne neutralise cette faille.

**Impact** : compromission totale de la confidentialité et de l'intégrité de tous les tableaux
collaboratifs de tous les tenants (lecture, modification, suppression, gestion des membres selon
le rôle usurpé), sans authentification réelle requise.

**Recommandation** :
1. **Immédiat (P0, mitigation)** : couper/restreindre l'exposition externe de
   `pivot-collaboratif-core` (retirer la route nginx ou la restreindre à un réseau de confiance)
   tant que la validation d'opaque token n'est pas branchée.
2. **Fond (suivi EN17)** : achever la publication de `fr.pivot:pivot-core-starter` (validation
   d'opaque token SHA-256 + résolution de `TenantContext` depuis le token porteur, sur le modèle
   exact de `pivot-core/TokenAuthenticationFilter`) et remplacer intégralement
   `StompHandshakeInterceptor`/`RequestPrincipalResolver` — supprimer toute confiance accordée aux
   en-têtes `X-Pivot-*`.
3. Geler le merge de toute nouvelle US métier sur ce repo tant que ce socle n'est pas corrigé.
- **Effort** : S (mitigation réseau immédiate) / L (correctif de fond, dépendant d'EN17 déjà suivi au backlog)
- **Priorité** : **P0 — bloquant prod, < 24h**

---

## III. HIGH

### VULN-002 — Contournement du contrôle d'accès : un VIEWER (lecture seule) peut dessiner sur le canvas

- **Repo / fichier** : `pivot-collaboratif-core` — `src/main/java/fr/pivot/collaboratif/whiteboard/canvas/CanvasActionService.java:101-127` (introduit par `7217d8e`, US08.3.1 — **absent du checkout local audité par la Passe B**, visible uniquement en lisant `origin/main`)
- **Sévérité** : HIGH
- **Catégorie OWASP** : A01:2021 (Broken Access Control) — CWE-862 (Missing Authorization)
- **CVSS v3.1** : `CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:H/A:L` — **7.1**

**Code vulnérable** :
```java
if (eventType == CanvasEventType.UNDO && isViewer(role)) {
    reject(...);   // seul UNDO est bloqué pour un VIEWER
}
// ... handleDraw() (ligne 124) : aucun contrôle de rôle
```
`BoardRole.VIEWER` est explicitement documenté comme *"Read-only access"*
(`whiteboard/board/BoardRole.java:10,19`), mais seul le type d'évènement `UNDO` est bloqué pour ce
rôle — `DRAW` ne l'est pas. Un utilisateur avec un token de partage en lecture seule peut donc
dessiner sur le canvas, persister des `CanvasEvent` en base et polluer l'historique du board.
Aucun test ne couvre ce cas (`viewer_cannot_send_undo()` existe, pas de `viewer_cannot_send_draw()`).

**Impact** : contournement total de la restriction métier "lecture seule" d'un rôle de partage,
atteinte d'intégrité sur le contenu du board, et — combiné à VULN-004 (absence de limite de
volume) — risque de dégradation de disponibilité par accumulation d'évènements.

**Recommandation** : appliquer la même garde que pour `UNDO` sur `DRAW` :
```java
if ((eventType == CanvasEventType.UNDO || eventType == CanvasEventType.DRAW) && isViewer(role)) {
    reject(...);
}
```
Ajouter le test `viewer_cannot_send_draw()` manquant.
- **Effort** : S
- **Priorité** : **P1 — avant le prochain déploiement, < 48h**

---

## IV. MEDIUM

### VULN-003 — Fingerprint d'appareil MFA faible : contournement de l'OTP si le mot de passe est déjà compromis

- **Repo / fichiers** : `pivot-ui` — `src/app/core/auth/service/device.service.ts:29-33` · `pivot-core` — `src/main/java/fr/pivot/auth/service/TrustedDeviceService.java` (`isTrusted`, comparaison exacte du fingerprint stocké)
- **Sévérité** : MEDIUM (limite HIGH)
- **Catégorie OWASP** : A07:2021 (Identification and Authentication Failures)
- **CVSS v3.1** : `CVSS:3.1/AV:N/AC:H/PR:L/UI:N/S:C/C:N/I:H/A:N` — **~6.3** (estimatif, cross-repo)

```ts
getDeviceFingerprint(): string {
  const nav = globalThis.navigator;
  const raw = `${nav.userAgent}|${nav.language}|${globalThis.screen.width}x${globalThis.screen.height}|${nav.hardwareConcurrency}`;
  return btoa(raw).substring(0, 64);
}
```
Entièrement dérivé de propriétés `navigator`/`screen` publiques et devinables. Côté serveur,
`TrustedDeviceService.isTrusted(user, fingerprint)` compare ce fingerprint tel quel, sans facteur
d'entropie additionnel. Le flux MFA n'intervient qu'**après** authentification par mot de passe
réussie — ce n'est donc pas un bypass de l'authentification complète, mais un contournement du
**second facteur** (OTP) une fois le mot de passe déjà connu de l'attaquant (phishing, credential
stuffing, fuite de base tierce).

**Impact** : un attaquant en possession du mot de passe d'une victime peut reproduire son
fingerprint pour se faire passer pour un appareil de confiance et éviter l'étape OTP.

**Recommandation** : ne pas baser la confiance d'appareil sur un fingerprint dérivé d'attributs
publics seuls — générer côté client un identifiant aléatoire cryptographique
(`crypto.randomUUID()`), le lier à l'appareil, et envisager un facteur additionnel côté serveur en
complément (pas en remplacement) de l'OTP.
- **Effort** : M (coordination pivot-ui + pivot-core)
- **Priorité** : **P2 — sprint suivant, < 7j**

### VULN-004 — Absence de validation de schéma sur les payloads STOMP entrants (risque de contenu non fiable stocké et diffusé)

- **Repo / fichiers** : `pivot-collaboratif-core` — `canvas/CanvasActionService.java:140-151` · `canvas/dto/CanvasActionMessage.java` · `canvas/WhiteboardActionController.java:60-68` (US08.3.1, `7217d8e` — hors périmètre de la Passe B)
- **Sévérité** : MEDIUM
- **Catégorie OWASP** : A04:2021 (Insecure Design) / CWE-20 (Improper Input Validation)
- **CVSS v3.1** : `CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:N/I:L/A:N` — **~4.8** (estimatif — l'impact réel de la composante XSS dépend du rendu côté `pivot-collaboratif-ui`, hors périmètre de cet audit)

`CanvasActionMessage` est un `record(String type, Map<String, Object> data)` — aucune annotation
Bean Validation sur le `@Payload` reçu. `handleJoin()` fait des casts non sécurisés sans
validation de type ni de longueur ; aucun `@MessageExceptionHandler` n'existe dans le repo pour
absorber une `ClassCastException`. `displayName`/`avatarUrl` sont broadcastés tels quels à tous
les participants et persistés indéfiniment en Redis, sans limite de longueur ni d'échappement.
Fait révélateur : `CanvasElementValidator` (whitelist de champs, bornes, regex) **existe déjà**
mais n'est appliqué qu'aux données de seed (templates), jamais au flux temps réel réellement
soumis par l'utilisateur. Volumétrie non bornée sur `handleDraw()` : jusqu'à ~108 000
évènements/heure par membre possibles, sans purge — risque de saturation de
`collaboratif.canvas_event`.

**Recommandation** : valider `type`/`data` avec Bean Validation ou un schéma explicite avant
traitement, réutiliser `CanvasElementValidator` sur le flux live, ajouter un
`@MessageExceptionHandler` global, encoder HTML tout texte libre avant stockage/broadcast.
- **Effort** : S-M
- **Priorité** : **P2 — sprint suivant, < 7j**

### VULN-005 — Double mécanisme de présence concurrent (issue #32) et perte de présence en cas de multi-onglets

- **Repo / fichiers** : `pivot-collaboratif-core` — `ws/WhiteboardPresenceRegistry.java:71-86` · `ws/WhiteboardWebSocketEventListener.java:59-79` · `canvas/CanvasActionService.java:138-166` (le second mécanisme, introduit par `7217d8e`/US08.3.1, était absent du checkout audité par la Passe B, qui a conclu à tort à l'absence de duplication)
- **Sévérité** : MEDIUM
- **Catégorie OWASP** : A04:2021 (Insecure Design)
- **CVSS v3.1** : `CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N` — **~4.2**

**Constat confirmé** (issue #32, `gh issue view 32`, et par lecture directe d'`origin/main`) :
deux systèmes distincts écrivent sur `/topic/whiteboard/{boardId}/presence` —
`WhiteboardPresenceRegistry` (déclenché par simple SUBSCRIBE STOMP, diffuse un `PresencePayload`
minimal) et `CanvasActionService` (déclenché par message applicatif JOIN/LEAVE explicite, diffuse
un `ParticipantsUpdatePayload` enrichi). Un client qui écoute ce topic reçoit deux formats de
message incompatibles dans un ordre non déterministe. Bug supplémentaire confirmé :
`WhiteboardPresenceRegistry.join()` ne mémorise qu'**une seule session par `userId` par board** —
un même utilisateur avec deux onglets ouverts, si l'un crashe, disparaît de la présence même si
l'autre onglet est toujours actif.

**Impact** : incohérence fonctionnelle plutôt que fuite de confidentialité directe, mais un état
de présence erroné peut tromper une décision de collaboration.

**Recommandation** : celle déjà proposée dans l'issue #32 — faire de `WhiteboardPresenceRegistry`
un tracker de liveness pur par SET de sessions actives par `(tenantId, boardId, userId)`, et ne
faire piloter `ParticipantMetaStore`/diffusion que par le flux applicatif JOIN/LEAVE.
- **Effort** : M
- **Priorité** : **P2 — sprint suivant, < 7j**

### VULN-006 — Rate limiting de jointure de board contournable via `X-Forwarded-For` falsifié

- **Repo / fichier** : `pivot-collaboratif-core` — `whiteboard/join/BoardJoinController.java:77-83`
- **Sévérité** : MEDIUM
- **Catégorie OWASP** : A04:2021 (Insecure Design) / CWE-290 (Authentication Bypass by Spoofing) / CWE-307
- **CVSS v3.1** : `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N` — **5.3** *(convergent entre les deux passes)*

```java
private String resolveClientIp(final HttpServletRequest request) {
    String forwarded = request.getHeader("X-Forwarded-For");
    if (forwarded != null && !forwarded.isBlank()) {
        return forwarded.split(",")[0].trim();   // prend la 1ère valeur — celle du client
    }
    return request.getRemoteAddr();
}
```
Ce code relit manuellement `X-Forwarded-For` au lieu d'utiliser `request.getRemoteAddr()` — déjà
normalisé de façon fiable par `RemoteIpValve` côté `pivot-core` (pattern à répliquer ici). nginx
**ajoute** l'IP réelle en fin de chaîne plutôt que de la remplacer — un client qui envoie déjà
`X-Forwarded-For: 1.2.3.4` obtient côté backend `1.2.3.4, <ip réelle>`, et le code prend la
première valeur (celle fournie par le client). Combiné à `userId` auto-déclaré (VULN-001), les
deux dimensions du rate limiter de jointure sont indépendamment contournables.

**Impact** : dégrade l'efficacité du rate limiting par IP sur `POST /whiteboard/join` — un
attaquant peut faire varier `X-Forwarded-For` à chaque tentative. Le token de partage reste en
256 bits (`SecureRandom`), donc infaisable à brute-forcer même sans rate limit — l'impact réel est
une dégradation du contrôle, pas un bypass total à lui seul.

**Recommandation** : utiliser uniquement la dernière IP de confiance de la chaîne, ou mieux,
`request.getRemoteAddr()` derrière un `RemoteIpValve` configuré (pattern déjà en place côté
`pivot-core`, `CookieHelper.clientIp()`).
- **Effort** : XS
- **Priorité** : **P2 — sprint suivant, < 7j**

### VULN-007 — Oracle d'existence cross-tenant (403 au lieu de 404) sur la jointure de board

- **Repo / fichier** : `pivot-collaboratif-core` — `whiteboard/join/BoardJoinService.java:120-122`
- **Sévérité** : MEDIUM
- **Catégorie OWASP** : A01:2021 / CWE-203 (Observable Discrepancy)
- **CVSS v3.1** : `CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:N/A:N` — **4.3**

```java
if (!board.getTenantId().equals(tenantId)) {
    throw new BoardAccessDeniedException(board.getId());   // → 403 (BoardAccessDeniedException
                                                             //   est documentée pour un membre à
                                                             //   qui il manque un rôle, PAS pour
                                                             //   un board d'un autre tenant)
}
```
Vérifié : `BoardAccessDeniedException` est explicitement documentée (JavaDoc) *"Thrown when the
caller is a board member but lacks the required role"* et mappée en 403 par
`GlobalExceptionHandler` — un usage légitime ailleurs dans le repo (`BoardMemberService`,
`BoardShareService`, `BoardService`). Mais ici, dans `BoardJoinService.join()`, elle est utilisée
pour un scénario différent : tenant non correspondant. C'est le seul point de cette méthode qui
s'écarte du pattern utilisé partout ailleurs dans le même fichier
(`BoardShareTokenNotFoundException` → 404, y compris pour un token inexistant, révoqué, expiré,
ou un board introuvable). La règle transversale documentée dans les trois `CLAUDE.md` du périmètre
(« appartenance invalide → 404, jamais 403 ») est respectée partout ailleurs dans ce fichier sauf
ici.

**Impact** : un attaquant qui soumet un token de partage valide mais appartenant à un board d'un
autre tenant reçoit un 403 explicite (avec le `boardId` dans le corps de l'exception) au lieu du
404 générique — confirme l'existence d'un board dans un tenant qu'il ne devrait pas pouvoir
sonder. Fuite d'information mineure, pas d'accès aux données elles-mêmes.

**Recommandation** : remplacer par `BoardShareTokenNotFoundException` (404), cohérent avec le
reste de la méthode.
- **Effort** : XS (changement d'une ligne + test IT associé)
- **Priorité** : **P2 — sprint suivant, < 7j**

---

## V. LOW / INFO

### VULN-008 — Interceptor HTTP Angular attache le Bearer token à toute requête sortante sans vérifier le domaine cible

- **Repo / fichier** : `pivot-ui` — `src/app/core/auth/interceptor/token.interceptor.ts:40-44`, enregistré globalement dans `src/app/app.config.ts:46`
- **Sévérité** : LOW/INFO — **CVSS non calculé**, défense en profondeur sans exploitation directe (grille `audit-cyber`, bande LOW/INFO)
- **Catégorie OWASP** : A05:2021 (Security Misconfiguration)

```ts
const token = auth.accessToken();
const authReq = token
  ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
  : req;
```
Aucun test `req.url.startsWith(environment.apiUrl)` avant d'attacher l'en-tête. **Vérifié : 100 %
des appels `HttpClient` actuels ciblent `environment.apiUrl`** (même origine, proxifiée par
nginx) — aucun vecteur d'exploitation réel aujourd'hui. Risque latent : le premier appel HTTP
ajouté vers un domaine tiers (CDN, SDK d'observabilité, service cartographique…) enverrait
silencieusement le token opaque en clair dans l'en-tête `Authorization`.

**Recommandation** : scoper l'ajout du header à `req.url.startsWith(environment.apiUrl)`.
- **Effort** : XS
- **Priorité** : **P3 — qualité continue, < 30j** (avant toute nouvelle intégration HttpClient)

### VULN-009 — Écart documentation : le token opaque est bien stocké dans un cookie (contrairement à ce qu'affirme `CLAUDE.md`)

- **Repo / fichiers** : `pivot-core` — `src/main/java/fr/pivot/config/CookieHelper.java:52-124`, `AuthController.java:172,189,207-217`
- **Sévérité** : INFO (non exploitable — conception solide)
- **Catégorie OWASP** : A05:2021 (documentation/configuration)

`pivot-core/CLAUDE.md` affirme *"Access token — jamais dans Local Storage, sessionStorage,
IndexedDB ou Cookie"*. En réalité, chaque connexion pose un cookie `pivot_session` contenant le
token opaque brut, utilisé par `POST /api/auth/refresh` pour restaurer la session Angular après un
rechargement de page. **La conception est solide** : `HttpOnly=true`, `Secure` (par défaut),
`SameSite=Strict`, `Path=/api/auth` (portée strictement limitée aux routes d'auth). Ce n'est ni un
silent-refresh iframe, ni un cookie ambiant exploitable en CSRF — divergence de formulation
documentaire, pas un problème de sécurité.

**Recommandation** : corriger le libellé de `CLAUDE.md` pour décrire précisément ce mécanisme.
- **Effort** : S (doc uniquement) · **Priorité** : **P3**

### VULN-010 — OIDC PKCE S256 documenté comme actif côté `pivot-ui` mais non implémenté (constat structurant, sous-domaine OIDC/IAM)

- **Repo / fichiers** : `pivot-ui` — `package.json`/`package-lock.json` (aucune dépendance OIDC), `auth.service.ts:146-155`, `login.component.ts:29,87-89`
- **Sévérité** : INFO / constat de statut (pas une vulnérabilité — pas de surface de code à attaquer, confirmé indépendamment par les deux passes)

`pivot-ui/CLAUDE.md` documente *"Auth : OIDC PKCE S256 (client Angular) · angular-oauth2-oidc"*.
Vérifié (deux fois, indépendamment) : aucune dépendance OIDC dans `package.json`, aucune
occurrence de `code_verifier`/`code_challenge`/`S256`/`nonce`/`crypto.getRandomValues` dans `src/`.
`AuthService.getOidcConfig()`/`exchangeOidc()` existent mais ne sont appelées par aucun composant.
**Le flux OIDC enterprise n'existe pas côté client aujourd'hui.**

**Recommandation** : mettre à jour le tableau stack de `CLAUDE.md` pour refléter le statut réel
(`Stage: Backlog`), ou prioriser l'implémentation si un client enterprise est requis à court terme.
- **Effort** : S (doc) / L (implémentation réelle) · **Priorité** : **P3**

### VULN-011 — Deux implémentations `sanitizeReturnUrl` divergentes (une forte, une faible non utilisée sur entrée attaquant)

- **Repo / fichiers** : `pivot-ui` — `src/app/core/auth/return-url.ts` (forte) vs. `src/app/core/auth/util/return-url.ts` (faible, utilisée par `session-expiry.service.ts:82`)
- **Sévérité** : LOW — non exploitable aujourd'hui (le point d'appel de la version faible est une URL déjà résolue par le routeur Angular, pas une entrée brute attaquant)
- **Recommandation** : fusionner les deux implémentations, garder la version forte comme source unique de vérité.
- **Effort** : S · **Priorité** : **P3**

### VULN-012 — `.env.example` : terminologie "JWT local" trompeuse

- **Repo / fichier** : `pivot-ui` — `.env.example:7`
- **Sévérité** : INFO (documentation uniquement, aucun secret exposé)
- **Recommandation** : aligner le vocabulaire sur "opaque token".
- **Effort** : S · **Priorité** : **P3**

### VULN-013 — Trois usages `[innerHTML]` sur données statiques (fragilité de conception, non exploitable)

- **Repo / fichiers** : `pivot-ui` — `home.component.ts:79,134`, `sidebar.component.ts:30`
- **Sévérité** : LOW/INFO — non exploitable (sources 100 % statiques, `PivotModuleDto` sans champ `icon`, aucun `bypassSecurityTrust*` dans le repo)
- **Recommandation** : remplacer par des composants d'icônes SVG statiques.
- **Effort** : S · **Priorité** : **P3**

### VULN-014 — Commentaire "constant-time comparison" trompeur (dead code, non exploitable)

- **Repo / fichier** : `pivot-collaboratif-core` — `whiteboard/join/BoardJoinService.java:100-105`
- **Sévérité** : INFO (dette de qualité)

`MessageDigest.isEqual` est appelé après un `findByTokenHash(submittedHash)` qui a déjà retrouvé
l'enregistrement par recherche exacte en base — la comparaison qui suit ne peut jamais échouer par
construction. La protection réelle vient de l'espace de recherche SHA-256 du token.
- **Recommandation** : corriger le commentaire, ou supprimer la comparaison redondante.
- **Effort** : S · **Priorité** : **P3**

### VULN-015 — Écart mineur de conformité fonctionnelle : `avatarUrl` non prévu au contrat de présence (issue #29)

- **Repo / fichier** : `pivot-collaboratif-core` — `canvas/dto/ParticipantInfo.java`
- **Sévérité** : INFO (conformité fonctionnelle — aucun champ email trouvé nulle part dans ce repo, règle de fond respectée)
- **Recommandation** : aligner le DTO sur l'AC #29, ou mettre à jour l'AC si voulu.
- **Effort** : S · **Priorité** : **P3**

---

## Sous-domaine — OIDC / IAM

**Profil agent responsable : Expert OIDC / IAM**

- **Opaque tokens (pivot-core)** — **conforme et bien implémenté** : SHA-256 stocké en BDD, raw
  token jamais persisté, 256 bits `SecureRandom`, TTL en BDD, rotation transparente avec fenêtre
  de grâce, jamais de JWT.
- **OIDC enterprise côté `pivot-core` (resource server)** — **conforme** : `OidcAuthService`
  compose un `DelegatingOAuth2TokenValidator` qui, au-delà des contrôles par défaut
  (signature/issuer/expiry), impose la correspondance `aud`/`client_id` et, pour Azure, `tid`.
  `sanitizeProvisionedRole` restreint les rôles JIT-provisionnables à `{ROLE_USER, ROLE_ADMIN}` —
  un `default_role` mal configuré dans `TenantOidcConfig` ne peut jamais provisionner
  `ROLE_SUPER_ADMIN`. Flow d'échange rate-limité et audité.
- **OIDC PKCE côté `pivot-ui` (client)** — **non implémenté**, malgré la documentation
  (VULN-010). Aucune régression "silent refresh iframe" pour la bonne raison qu'il n'y a aucun
  flux OIDC actif à ce jour côté client — règle respectée par absence de surface, pas démontrée
  sous charge réelle.
- **Fingerprint MFA (VULN-003)** — seul point faible réel identifié dans ce sous-domaine.
- **`pivot-collaboratif-core`** — hors du système d'identité PIVOT à ce jour (VULN-001).

## Sous-domaine — Temps réel / WebSocket (STOMP)

**Profil agent responsable : Architecte Temps Réel / WebSocket (domaine Collaboratif)**

- **Isolation par room WS** — le mécanisme (`WhiteboardChannelInterceptor`/`MembershipCacheService`)
  est **bien conçu et testé** pour son périmètre propre : `boardId` re-vérifié en base à chaque
  SUBSCRIBE/SEND avec `board.getTenantId().equals(tenantId)` vérifié avant tout lookup de
  membership (une collision de `boardId` entre tenants est traitée comme non-membre, jamais
  comme une fuite), SLA de révocation 5 s, tests `WhiteboardWebSocketIT` couvrant non-membre et
  cross-tenant. **Mais toute cette garantie repose sur une identité elle-même non authentifiée
  (VULN-001)** — un contrôle correct bâti sur une fondation absente.
- **Fuite de données dans les payloads de présence (issue #29)** — **infirmée** : ni
  `PresencePayload` ni `ParticipantInfo` ne portent de champ email ; aucune entité `User`/email
  n'existe même dans ce repo. Écart mineur : `avatarUrl` hors contrat (VULN-015).
- **Isolation tenant sur les topics WS** — architecturalement correcte, mais dépend de la même
  identité non fiable (VULN-001).
- **Résilience déconnexion/reconnexion (issue #32)** — **confirmée** (voir note méthodologique en
  tête de rapport) : double mécanisme de présence concurrent sur le même topic (VULN-005), avec
  un bug multi-onglets. Le nettoyage au crash simple fonctionne (`leaveAll()` + TTL 24h +
  heartbeat STOMP natif Spring).
- **Contrôle d'accès sur le canal applicatif** — VULN-002 (VIEWER peut DRAW) et VULN-004
  (absence de validation de schéma) affectent spécifiquement le sous-canal `/app/whiteboard/**`
  introduit par US08.3.1.

---

## Statut des findings/dettes historiques

| # | Item | Statut | Preuve |
|---|------|--------|--------|
| — | Aucun audit formel antérieur | **N/A — premier audit formel** | `v1` (2026-06-20) était une initialisation de scaffolding sans score ni finding publié |

Traçabilité informelle des « Points d'attention » du scaffolding `v1` (aide à la continuité, pas
une confrontation de findings au sens strict) : « Isolation tenant/IDOR » confirmée conforme sur
`pivot-core`/`pivot-ui`, en défaut sur `pivot-collaboratif-core` (VULN-001) · « 404 vs 403 »
confirmée conforme sur `pivot-core`, en défaut isolé sur `pivot-collaboratif-core` (VULN-007) ·
« rate limiting » confirmé large sur `pivot-core`, contournable sur `pivot-collaboratif-core`
(VULN-006) · « `// NOSONAR`/`// nosemgrep` » confirmé absent des trois repos · « issue #32 »
confirmée réelle (VULN-005), après réconciliation d'une divergence entre les deux passes de cet
audit (voir Note méthodologique).

---

## Bonnes pratiques confirmées / Points forts

| # | Repo | Pratique | Preuve |
|---|------|----------|--------|
| 1 | pivot-core | Tokens opaques 256 bits `SecureRandom`, SHA-256 en BDD, raw token jamais persisté ni loggé | `TokenService.java:174-232` |
| 2 | pivot-core | Cookie de restauration de session : `HttpOnly`+`Secure`+`SameSite=Strict`+`Path=/api/auth` (portée minimale) | `CookieHelper.java:117-124` |
| 3 | pivot-core | RBAC systématiquement porté par `@PreAuthorize` au niveau service, cohérent sur tous les endpoints admin/superadmin | `AdminUserService.java:117,183,263` · `SuperAdminTenantService.java:118,156,203,244` · `PlanService.java` · `ModuleOverrideService.java:60,79` |
| 4 | pivot-core | Isolation tenant : `tenantId`/`userId` **jamais** acceptés depuis body/query/header — extraction exclusive depuis `SecurityContextHolder` | `AdminUserController.java:317-332`, `SuperAdminTenantController.java:283-311` |
| 5 | pivot-core | 404 (jamais 403) sur ressource cross-tenant | `AdminUserController.handleUserNotFound:236-242` |
| 6 | pivot-core | Rate limiting Redis exhaustif (login IP+email, register, forgot/reset password, verify-email, resend-verification, device-otp, change-password, Google auth, connexion suspecte) | `RateLimiterService.java` + usages dans `SessionService`, `RegistrationService`, `AccountPasswordService`, `GoogleAuthService`, `SuspiciousLoginService` |
| 7 | pivot-core | Résolution d'IP via `RemoteIpValve` + liste de proxies de confiance (CIDR), jamais de parsing manuel de XFF | `application.yml:102-105`, `CookieHelper.clientIp():98-100` — à contraster avec VULN-006 |
| 8 | pivot-core | Upload d'avatar : détection par magic bytes, noms de fichiers UUID (anti path-traversal/énumération), limite de taille stricte | `AvatarStorageService.java` (JavaDoc "Red Team consideration") |
| 9 | pivot-core | OIDC resource server : signature + issuer + expiry + audience (`client_id`) + `tid` Azure, whitelist des rôles JIT-provisionnables (anti-escalade), cache de décodeur par tenant | `OidcAuthService.java:227-271,322-331` |
| 10 | pivot-core | Google Sign-In : SDK officiel `GoogleIdTokenVerifier`, pas de parsing JWT maison | `GoogleAuthService.java:76` |
| 11 | pivot-core | Anti-enumeration : `forgot-password` toujours 202, corps "mot de passe incorrect" vs "rate limited" indiscernables | `GlobalExceptionHandler.java:39-67` |
| 12 | pivot-core | Protection log-forging (CRLF) sur toute valeur utilisateur avant écriture en log | `AdminUserController.sanitizeForLog():302-304`, `SuperAdminTenantController.sanitizeForLog():274-276`, `SuperAdminModuleOverrideController.java:185-187` |
| 13 | pivot-core | CORS sans wildcard malgré `allowCredentials(true)` (origines depuis variable d'environnement) | `SecurityConfig.java:166-179` |
| 14 | pivot-core | Tests d'intégration cross-tenant réels sur les principaux endpoints admin/superadmin | `AdminUserIntegrationTest.java`, `SuperAdminTenantServiceIntegrationTest.java`, `AdminModuleActivationIntegrationTest.java`, etc. |
| 3 repos | — | Aucune injection SQL/JPQL — 100 % des `@Query` paramétrées ; aucun secret en dur ; aucun `// NOSONAR`/`// nosemgrep` | grep exhaustif sur les trois repos |
| 15 | pivot-collaboratif-core | Token de partage de board à haute entropie (256 bits, `SecureRandom`) | `BoardShareService.java:153-157` |
| 16 | pivot-collaboratif-core | Isolation par room WS bien conçue et testée (SUBSCRIBE/SEND re-vérifiés, tests cross-tenant/non-membre) — sous réserve de VULN-001 | `WhiteboardChannelInterceptor.java`, `MembershipCacheService.java:76-118`, `WhiteboardWebSocketIT.java` |
| 17 | pivot-collaboratif-core | Aucune fuite d'email dans les payloads de présence (règle issue #29 respectée) | `PresencePayload.java`, `ParticipantInfo.java` |
| 18 | pivot-collaboratif-core | Limite de taille de frame WS (64 Ko) en défense en profondeur anti-DoS | `WebSocketConfig.java` |
| 19 | pivot-collaboratif-core | Dette d'authentification documentée en TODO explicite plutôt que masquée | `StompHandshakeInterceptor.java:24-25`, `RequestPrincipalResolver.java:21` |
| 20 | pivot-ui | Stockage token en mémoire uniquement (signal Angular privé), jamais Local/Session Storage | `auth.service.ts:69-72` |
| 21 | pivot-ui | Aucun silent refresh iframe — modèle opaque token sans refresh token, 401 comme seul signal | `session-expiry.service.ts:19-22` |
| 22 | pivot-ui | Guards Angular fail-closed sur les routes admin/superadmin | `admin.guard.ts:19`, `super-admin.guard.ts:22`, `module.guard.ts:76-77` |
| 23 | pivot-ui | Headers de sécurité nginx complets (CSP `script-src 'self'`, `X-Frame-Options: DENY`, HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`), TLS 1.2+ uniquement | `nginx.conf` |
| 24 | pivot-ui | Protection open-redirect robuste sur le flux de redirection post-login principal | `return-url.ts` |
| 25 | pivot-ui | Aucune disclosure de statut de compte/username sur 401/403, testé explicitement en e2e | `e2e/auth/security.spec.ts:56-95` |

---

## Score par catégorie OWASP Top 10 2021

| Catégorie | Score /10 | Findings/dette actifs |
|-----------|-----------|------------------------|
| A01 — Broken Access Control | 3/10 | VULN-001 (CRITIQUE), VULN-002 (HIGH), VULN-007 (MEDIUM) sur `pivot-collaboratif-core` — malgré une isolation tenant exemplaire sur `pivot-core`/`pivot-ui` (points forts 3, 4, 5, 22) |
| A02 — Cryptographic Failures | 8.5/10 | Tokens opaques, BCrypt (coût 12), cookies bien attribués, tokens de partage 256 bits — seul VULN-009 (écart documentaire, non exploitable) |
| A03 — Injection | 7/10 | Aucune injection SQL/JPQL trouvée ; gap de validation de schéma STOMP (VULN-004, risque XSS stocké potentiel à confirmer côté `pivot-collaboratif-ui`) |
| A04 — Insecure Design | 3.5/10 | VULN-001 (cause racine : identité via en-tête HTTP), VULN-004, VULN-005, VULN-006 ; architecture d'auth différée (`EN17`) livrée avec des features métier construites dessus avant que le socle soit prêt |
| A05 — Security Misconfiguration | 6/10 | VULN-008 (interceptor latent), VULN-009/VULN-010/VULN-012 (écarts documentation/code) ; CORS/CSRF de `pivot-core` bien pensés |
| A06 — Vulnerable and Outdated Components | N/A | Hors périmètre de cet audit — voir `audit-dependances.md` |
| A07 — Identification and Authentication Failures | 2/10 | VULN-001 (bypass total), VULN-003 (fingerprint MFA faible) ; compensé sur `pivot-core` seul par un design opaque-token très solide (points forts 1, 2, 6, 9, 10) |
| A08 — Software and Data Integrity Failures | 7/10 | Aucune désérialisation dangereuse trouvée ; VULN-002 est une atteinte d'intégrité réelle sur `pivot-collaboratif-core` |
| A09 — Security Logging and Monitoring Failures | 7.5/10 | Logs structurés, pas de token/PII en clair, anti log-forging systématique ; absence de `@MessageExceptionHandler` STOMP (VULN-004, bruit de log potentiel) |
| A10 — Server-Side Request Forgery | 8/10 | Pas de SSRF direct identifié ; note mineure sur `avatarUrl` non validé côté collaboratif (vecteur théorique, cf. VULN-004) |

---

## Plan d'action

### P0 — Bloquant prod (< 24h)
- **VULN-001** — Authentification WS/REST absente (`pivot-collaboratif-core`). Geler toute
  exposition publique du service ; prioriser l'achèvement d'`EN17`/`pivot-core-starter`.

### P1 — Avant le prochain déploiement (< 48h)
- **VULN-002** — VIEWER peut envoyer `DRAW` (contournement RBAC canvas).

### P2 — Sprint suivant (< 7j)
- **VULN-003** — Fingerprint MFA faible (bypass OTP si mot de passe déjà compromis).
- **VULN-004** — Absence de validation de schéma sur les payloads STOMP.
- **VULN-005** — Double mécanisme de présence concurrent (issue #32) + bug multi-onglets.
- **VULN-006** — Rate limit de join contournable par spoofing XFF.
- **VULN-007** — Oracle d'existence cross-tenant (403 au lieu de 404) sur `BoardJoinService.join`.

### P3 — Qualité continue (< 30j)
- **VULN-008** — Interceptor HTTP Angular sans filtre de domaine (latent).
- **VULN-009** — Écart documentation cookie de session (`pivot-core/CLAUDE.md`).
- **VULN-010** — OIDC PKCE non implémenté malgré la documentation (`pivot-ui/CLAUDE.md`) — reclasser en priorité produit si un client enterprise est requis à court terme.
- **VULN-011** — Duplication `sanitizeReturnUrl`.
- **VULN-012** — `.env.example` terminologie trompeuse.
- **VULN-013** — Usages `[innerHTML]` sur données statiques (durcissement préventif).
- **VULN-014** — Commentaire "constant-time comparison" trompeur.
- **VULN-015** — `avatarUrl` hors contrat de présence (issue #29).

### Externe
Aucun — tous les correctifs identifiés sont sous le contrôle direct des équipes
`pivot-core`/`pivot-ui`/`pivot-collaboratif-core`. La dépendance à la publication de
`pivot-core-starter` (`EN17`) est déjà un enabler suivi au backlog interne, pas une dépendance à un
prestataire externe.

---

## Conclusion

**Verdict global : NON PROD-READY sur `pivot-collaboratif-core` (bloquant — VULN-001, aggravé par
VULN-002) ; `pivot-core` et `pivot-ui` proches du niveau attendu, avec des réserves nommées.**

`pivot-core` démontre une maîtrise réelle des fondamentaux de sécurité applicative — c'est le repo
le plus mature du périmètre audité, confirmé par deux lectures indépendantes convergentes, et il
peut servir de référence pour corriger `pivot-collaboratif-core` (le pattern `RemoteIpValve` de
`CookieHelper.clientIp()` en particulier, à répliquer pour corriger VULN-006). `pivot-ui` est
globalement sain mais porte un écart de conformité factuel notable sur l'OIDC PKCE.
`pivot-collaboratif-core` ne doit **pas** être déployé, ni même exposé sur un réseau interne non
cloisonné, tant que VULN-001 n'est pas corrigé.

**Réserves principales** : (1) VULN-001 doit être traité avant toute mise en production de
`pivot-collaboratif-core`, sans exception, et VULN-002 avant le prochain déploiement quel qu'il
soit ; (2) l'écart entre documentation et code doit être traité comme un risque de processus à
part entière (plusieurs occurrences trouvées dans ce seul audit — VULN-009, VULN-010, et
l'affirmation obsolète du `CLAUDE.md` collaboratif sur l'absence de features métier) ; (3) cet
audit a révélé, en cours de rédaction, un risque méthodologique concret : une passe d'audit
indépendante sur un checkout git local non synchronisé (`pivot-collaboratif-core`, 2 commits
derrière `origin/main`) a manqué un finding HIGH réel et infirmé à tort un finding MEDIUM confirmé
— rappel que la fraîcheur du code audité (vs. `origin/main`/la branche de déploiement) doit être
vérifiée systématiquement en préambule de tout audit futur.

---

*Expert Red Team (offensif) + Expert Blue Team (corrections) — 2026-07-08 — double-passe réconciliée — distribution restreinte*

---

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---------|------|-------|------------------------|
| v1 | 2026-06-20 | — | Initialisation |
| v2 | 2026-07-08 | 3.3/10 | Premier audit formel réel, double-passe réconciliée (voir Note méthodologique). 15 findings (1 CRITIQUE — VULN-001 CVSS 10.0, bypass total d'authentification REST+WS sur `pivot-collaboratif-core` ; 1 HIGH — VULN-002 CVSS 7.1, contournement RBAC canvas ; 5 MEDIUM ; 8 LOW/INFO). `pivot-core` et `pivot-ui` globalement matures, confirmés par deux lectures indépendantes convergentes. 25 bonnes pratiques confirmées avec preuve fichier:ligne. |
