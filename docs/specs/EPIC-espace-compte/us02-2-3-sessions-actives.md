# US02.2.3 — Voir et révoquer ses sessions actives

## Contexte

- **US** : `docs/backlog/EPIC-espace-compte/FEATURES/securite-compte/us-sessions-actives.md` (F02.2 — Sécurité du compte, EPIC-espace-compte E02)
- **PR backend** : `pivot-core` [#132](https://github.com/PIVOT-PLATFORM/pivot-core/pull/132) (`feat(api): active sessions self-service - GET/DELETE /api/account/sessions (US02.2.3)`)
- **PR frontend** : `pivot-ui` [#74](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/74) (`feat(account): sessions actives — voir et révoquer (US02.2.3)`)
- **Dernier commit au moment du figeage** : `pivot-core` #132 mergée le 2026-07-05 (2e passage de convergence Gate 4 appliqué, 2 commits correctifs) · `pivot-ui` #74 mergée le 2026-07-06 au commit `c542171` (revue neutre finale)
- **Gate 4 `pivot-core` PR#132 (final, 2e passage de convergence)** : 100/100 — `MERGE_AUTONOMOUS`
- **Gate 4 `pivot-ui` PR#74 (final, revue neutre)** : 93/100 — `MERGE_AUTONOMOUS` (auto-évaluation initiale du Dev Agent à 97 → 96 → 99/100 après convergence ; le score qui fait foi est la revue neutre indépendante à 93/100, dernier commentaire Gate 4 posté avant merge)
- **Dépend de** : E01 Auth & IAM — réutilise l'entité `AccessToken`/`TokenService` (émission, hachage, statut `ACTIVE`/`REVOKED`) posée par les US de connexion/déconnexion (US01.1.1/US01.1.2), sans aucune migration Flyway supplémentaire

---

## Spec fonctionnelle

### API sessions (`pivot-core`)

Trois endpoints exposés sous `/api/account/sessions`, tous scopés exclusivement au `userId` résolu
depuis le `SecurityContext` (jamais un paramètre client) :

- **`GET /api/account/sessions`** — liste les sessions actives (statut `ACTIVE`) de l'utilisateur
  courant, triées par `createdAt` décroissant. Chaque entrée expose `id`, `device` (peut être
  `null` si aucun nom n'a été capturé à la connexion), `ip`, `createdAt`/`expiresAt` (ISO-8601 UTC),
  et `isCurrent` (calculé en comparant à l'id du token porteur de la requête). Réponse `403` si non
  authentifié (pas de `401` — cohérent avec le reste de l'API, aucun `AuthenticationEntryPoint`
  configuré dans ce projet).
- **`DELETE /api/account/sessions/{tokenId}`** — révoque une session précise. `204` si révoquée ;
  `404` si le `tokenId` n'existe pas, appartient à un autre utilisateur, ou est déjà
  révoqué/expiré (les trois cas sont indifférenciables côté client, par choix de sécurité :
  ne jamais confirmer l'existence du token d'un tiers) ; `403` si le `tokenId` visé est la session
  courante (garde côté API, pas seulement UI).
- **`DELETE /api/account/sessions`** — révoque toutes les sessions de l'utilisateur sauf la
  courante. `204` dans tous les cas, y compris no-op silencieux s'il n'y avait aucune autre
  session.

Le champ `device` est nettoyé **avant stockage** dans `TokenService.issue()` : tronqué à 200
caractères et débarrassé de tout tag HTML (`HtmlStripper`). Défense en profondeur : le champ est
re-strippé une seconde fois côté mapping DTO (`SessionService`), et le frontend doit systématiquement
l'afficher en liaison texte, jamais `innerHTML`.

### Page Angular (`pivot-ui`)

Route `/account/security/sessions` (utilisateur authentifié, aucun guard dédié — l'identité est
toujours résolue côté serveur depuis le bearer token). `SessionsListComponent` orchestre :

- **Chargement** : état `loading` (skeleton) pendant l'appel `GET`, état d'erreur avec message +
  bouton réessayer en cas d'échec.
- **Liste** : `<table>` avec en-têtes ; sous 768px, bascule CSS pure en liste de cartes (IP/date en
  texte secondaire sous le nom d'appareil, pas de logique JS dédiée).
- **Session courante** : badge "Session actuelle" visuel **et** textuel (pas seulement une icône
  colorée) ; aucun bouton de révocation n'est généré dans le DOM pour cette ligne (le template
  sépare explicitement la ligne courante des autres via un bloc de contrôle, ce n'est pas une
  simple dissimulation visuelle type `disabled`/`display:none`).
- **Empty state** : si aucune autre session que la courante, message "Aucune autre session
  active".
- **Révocation individuelle** : bouton "Révoquer" par ligne avec `aria-label` contextuel calculé
  dynamiquement (`"Révoquer la session depuis [device] le [date]"`), dialog de confirmation
  obligatoire avant l'appel `DELETE`.
- **Révocation groupée** : bouton "Révoquer toutes les autres sessions" (masqué s'il n'y a aucune
  autre session), même exigence de confirmation.
- **Mise à jour optimiste** : la session révoquée disparaît immédiatement de la liste ; en cas
  d'erreur, rollback (la session reste visible) + toast "error". Succès → toast succès.
- **Dialog de confirmation** (`ConfirmDialogComponent`, composant partagé) : a gagné un input
  `role` (`dialog`/`alertdialog`, valeur par défaut inchangée pour ne pas casser son usage
  existant dans l'admin des modules) pour satisfaire l'AC `role="dialog"`, `aria-modal="true"`,
  `aria-labelledby`, focus trap actif.
- **i18n** : toutes les chaînes sous `account.sessions.*` (`fr.json`/`en.json`).

### Divergences par rapport aux ACs pré-écrits

- **Résolution du token courant côté backend** : l'implémentation initiale de la PR #132
  (98/100) faisait une seconde lecture DB (`TokenService#validate` réappliqué au même bearer
  token) pour retrouver l'id du token courant côté `SessionController`, alors que
  `TokenAuthenticationFilter` l'avait déjà validé plus tôt dans la même requête. Corrigé lors du
  2e passage de convergence Gate 4 (100/100) : `TokenAuthenticationFilter` expose désormais l'id
  du token résolu via un attribut de requête (`CURRENT_TOKEN_ID_ATTRIBUTE`), lu directement par le
  contrôleur — une seule lecture DB par requête, comportement fonctionnel inchangé. C'est un
  changement d'implémentation, pas de contrat d'API.
- **`HtmlStripper` durci en cours de convergence** : la version initiale (regex `<[^>]*>`)
  laissait passer intacte une valeur contenant un tag **non terminé**
  (ex. `"Chrome<img src=x onerror=alert(1)"`, sans `>` de fermeture) — le fragment `<img ...`
  brut restait stocké en base. Corrigé au même 2e passage : tout chevron `<`/`>` restant après le
  passage regex est désormais supprimé, garantissant un résultat sans chevron quel que soit le
  degré de malformation de l'entrée. Pas d'ajout de dépendance (un sanitizer HTML complet type
  OWASP Java HTML Sanitizer resterait une décision d'architecture distincte, hors périmètre d'un
  correctif ciblé).
- **`DELETE /{tokenId}` sur token déjà révoqué/expiré → 404, pas 204 idempotent** : choix de
  design assumé côté PR #132, explicitement signalé au mainteneur comme "à valider" — traité comme
  faisant partie du même cas que "n'existe pas parmi les sessions actives", jamais challengé
  depuis par le PO. Écart non bloquant à garder en tête si l'idempotence devient un jour requise.
- **Aucune spec Playwright E2E** : différée sur les deux PRs (backend hors scope par nature, UI
  différée par politique projet explicitement documentée dans la description de la PR #74). Le
  AC "responsive mobile <768px" n'est donc couvert par aucun test automatisé — vérifié uniquement
  par relecture manuelle du SCSS lors des reviews Gate 4 (media query `@media (max-width: 767px)`
  jugée saine). Point de suivi produit, pas un irréductible bloquant.
- **Landmark `<main>` imbriqué (a11y)** : `sessions-list.component.html` a pour racine un
  `<main>`, lui-même imbriqué dans le `<main class="shell__content">` du shell applicatif —
  invalide en HTML5/ARIA strict (un seul `<main>` par document). Relevé en review neutre Gate 4
  comme non bloquant et **pré-existant** (le même pattern existe déjà dans
  `admin-modules.component.html`, mergé antérieurement) : à traiter comme un refactor a11y
  transverse au shell, pas au niveau de cette US individuelle. Non corrigé dans le périmètre de
  cette US.

---

## Contrat technique

### Fichiers introduits / modifiés

| Fichier | Repo | Rôle |
|---------|------|------|
| `src/main/java/fr/pivot/auth/controller/SessionController.java` | pivot-core | `GET`/`DELETE` `/api/account/sessions[...]`, purement délégant à `SessionService` |
| `src/main/java/fr/pivot/auth/dto/SessionDto.java` | pivot-core | `id`/`device`/`ip`/`createdAt`/`expiresAt`/`isCurrent` — jamais l'entité `AccessToken` (pas de `tokenHash` exposé) |
| `src/main/java/fr/pivot/auth/service/SessionService.java` | pivot-core | Logique métier : listing scopé userId, ownership 404, garde session courante 403, mapping DTO |
| `src/main/java/fr/pivot/auth/repository/AccessTokenRepository.java` | pivot-core | Requêtes listing/ownership (`findByIdAndUserId`)/bulk-revoke |
| `src/main/java/fr/pivot/auth/service/TokenService.java` | pivot-core | Sanitization `deviceName` (`HtmlStripper`) appliquée dans `issue()` |
| `src/main/java/fr/pivot/auth/util/HtmlStripper.java` | pivot-core | Strip HTML + troncature 200 caractères avant stockage, durci contre les tags non terminés |
| `src/main/java/fr/pivot/config/CookieHelper.java` | pivot-core | Extraction Bearer token mutualisée (refactor sans changement de comportement) |
| `src/main/java/fr/pivot/config/TokenAuthenticationFilter.java` | pivot-core | Pose `CURRENT_TOKEN_ID_ATTRIBUTE` sur la requête (évite la double lecture DB, ajouté en convergence) |
| `src/app/app.routes.ts` | pivot-ui | Route `account/security/sessions`, lazy-loaded |
| `src/app/features/account/security/sessions/session.service.ts` | pivot-ui | `SessionsService` — liste, revoke, revoke-all, état optimiste avec rollback |
| `src/app/features/account/security/sessions/session.model.ts` | pivot-ui | Modèle miroir de `SessionDto` |
| `src/app/features/account/security/sessions/session-date.util.ts` | pivot-ui | Formatage date fr/en, en UTC explicite (`Intl.DateTimeFormat` `timeZone: 'UTC'`) |
| `src/app/features/account/security/sessions/sessions-list.component.ts/.html/.scss` | pivot-ui | Composant `OnPush` + signals : loading/erreur/empty state, tableau, responsive mobile |
| `src/app/shared/confirm-dialog/confirm-dialog.component.ts` | pivot-ui | Ajout de l'input `role` (`dialog`/`alertdialog`, défaut inchangé) |
| `public/assets/i18n/fr.json` / `en.json` | pivot-ui | Clés `account.sessions.*` |

### Endpoints / modèles / contrats techniques pertinents

- `GET /api/account/sessions` → `200` (tableau de `SessionDto`) ou `403` si non authentifié.
  Exemple :
  ```json
  { "id": 123, "device": "Chrome sur Windows", "ip": "203.0.113.5",
    "createdAt": "2026-07-05T07:44:40.289641Z", "expiresAt": "2026-08-04T07:44:40.289641Z",
    "isCurrent": true }
  ```
- `DELETE /api/account/sessions/{tokenId}` → `204` (révoqué) / `404` (inexistant, déjà
  révoqué/expiré, ou d'un autre utilisateur — indifférencié par design) / `403` (cible la session
  courante, ou non authentifié).
- `DELETE /api/account/sessions` → `204` toujours (no-op silencieux si aucune autre session), ou
  `403` si non authentifié.
- Aucun body de requête sur les trois endpoints. Aucun champ `userId`/`tenantId` accepté nulle
  part — extrait exclusivement du token porteur (`SecurityContextHolder`).
- Table `access_tokens` (schéma `public`) : aucune migration Flyway ajoutée — les colonnes
  `deviceName`/`userAgent`/`ipAddress`/`createdAt`/`expiresAt`/`status` existaient déjà, capturées
  à l'émission du token par `TokenService.issue()`/`SessionService.login()` (US antérieures E01).

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US01.1.1 / US01.1.2 — Connexion / Déconnexion | Fournissent l'entité `AccessToken`/`TokenService` et le mécanisme de révocation (`ACTIVE`→`REVOKED`) réutilisés tels quels ici, sans migration supplémentaire |
| US01.4.3a — Alerte connexion suspecte | Le flux "Ce n'était pas moi" révoque toutes les sessions actives d'un utilisateur — mécanisme de révocation en masse distinct mais conceptuellement proche de `DELETE /api/account/sessions` (révocation groupée) livré ici |
| Admin des modules (composant `ConfirmDialogComponent` partagé) | L'ajout de l'input `role` sur le dialog partagé est rétro-compatible — vérifié non cassant pour son usage existant côté admin |

## Hors périmètre (explicitement exclu)

- Migration Flyway : aucune, la table `access_tokens` et ses colonnes existaient déjà.
- Sanitizer HTML complet (type OWASP Java HTML Sanitizer) pour `HtmlStripper` — le strip par regex
  durci est jugé suffisant au regard de l'AC (défense en profondeur, le frontend n'affiche jamais
  via `innerHTML`), l'ajout d'un sanitizer complet resterait une décision d'architecture/SBOM
  distincte.
- Idempotence de `DELETE /{tokenId}` sur un token déjà révoqué/expiré (retourne `404`, pas `204`)
  — point signalé au PO comme à challenger, non tranché à ce jour.
- Spec Playwright E2E (backend et frontend) — différée par politique projet explicite, y compris
  pour le seul AC non couvert autrement (responsive mobile <768px).
- Refactor a11y du landmark `<main>` imbriqué dans le shell — problème systémique pré-existant,
  hors périmètre d'une US individuelle.
- Introduction d'une préférence de fuseau horaire utilisateur — les dates sont affichées en UTC
  explicite, aucune préférence de fuseau n'existe encore ailleurs dans `pivot-ui`.
