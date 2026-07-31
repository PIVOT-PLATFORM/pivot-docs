# Audit RGPD — PIVOT Platform

## Date : 2026-07-08 — v2 (`pivot-core` @ `main`, `pivot-collaboratif-core`/`-ui` @ `main`)

## Expert : Expert RGPD — passe unique (premier audit formel, pas de double-passe requise pour ce domaine)

## Périmètre : `pivot-core` (schéma `public` : `users`, `audit_events`, `trusted_devices` et
tables de jetons associées, flux `/api/account/*`), `pivot-collaboratif-core`/`-ui` (schéma
`collaboratif` : `board`, `board_member`, `board_share_token` — module whiteboard bootstrap).
Hors périmètre : `pivot-pilotage-*`, `pivot-agilite-*` (repos non créés), gouvernance
contractuelle (DPA fournisseurs, désignation formelle du DPO) — non vérifiables par lecture de
code.

---

## Score global : 6.2/10 (premier audit — pas de tendance)

Premier passage d'audit formel RGPD sur la plateforme. Contrairement à l'hypothèse de départ du
mandat ("pas de preuve connue d'implémentation du droit à l'effacement/export"), la lecture
réelle du code montre que **les droits à l'effacement (Art. 17) et à la portabilité (Art. 20)
sont intégralement implémentés, testés et documentés** (`AccountDeletionService`,
`DataExportService`, US02.2.4 et US02.3.1 toutes deux `Stage: Review`). Le score n'est pas plus
élevé à cause de **deux findings CRITIQUES** : la plateforme promet publiquement des durées de
conservation précises (politique de confidentialité, `pivot-ui/src/app/features/legal/privacy.component.ts`)
qu'aucun mécanisme technique ne fait respecter — un écart entre l'engagement affiché aux
utilisateurs/à la CNIL et le comportement réel du système, qui est le type de constat qu'un
premier audit formel doit précisément faire remonter avant qu'un contrôle externe ne le fasse.

---

## I. Résumé exécutif

PIVOT dispose d'une base RGPD nettement plus mature que ce que suggérait le contexte de mandat :
droit à l'effacement avec délai de grâce configurable, double confirmation (mot de passe/OTP),
anonymisation idempotente et testée au-delà du délai de grâce ; droit à la portabilité avec
export asynchrone, rate-limité, lien à usage unique, vérification stricte de propriété ; droit
d'accès et de rectification via `GET`/`PATCH /account/profile` ; politique de confidentialité
publique complète (responsable de traitement, DPO, finalités/bases légales, durées de
conservation déclarées, droits, hébergement UE, cookies minimalistes).

Le point noir : **la politique de confidentialité promet une conservation des journaux d'audit
"1 an glissant"**, et le code confirme qu'**aucun mécanisme ne purge jamais `audit_events`** —
la table est explicitement conçue comme "immutable ... no DELETE from application" et le
`CleanupScheduler` unique du repo ne traite que les jetons de session. Le même constat vaut,
pour des données encore plus sensibles (IP, empreinte d'appareil, nom d'appareil), sur six autres
tables : les méthodes de purge existent dans le code (`deleteExpired`, `deleteExpiredAndUsed`,
`deleteExpiredAndTerminal`) mais ne sont **jamais invoquées par aucun `@Scheduled`** — du code
mort, jamais câblé. Le module collaboratif (whiteboard), encore au stade "cœur fonctionnel"
mais déjà connecté à de vrais utilisateurs/tenants, n'a de son côté **aucune infrastructure de
purge** et aucun mécanisme de propagation de l'effacement d'un compte vers ses données dans
d'autres schémas.

Verdict : fondations solides sur les droits des personnes, mais deux failures actives et
vérifiables de la limitation de conservation (Art. 5.1.e), dont une contredit directement un
engagement public — à corriger avant tout audit externe ou mise à l'échelle commerciale.

---

## II. Findings CRITIQUE

### RGPD-CRIT-01 — Rétention des `audit_events` promise publiquement ("1 an glissant") mais jamais appliquée techniquement

**Sévérité** : CRITIQUE — Gravité 4/4 × Vraisemblance 3/4 = **12/16** (méthode CNIL PIA,
équivalent CVSS pour ce domaine : G4 = préjudice réputationnel/réglementaire direct pour
l'intégralité des comptes et engagement public rompu ; V3 = déjà en vigueur en permanence, zéro
contrôle technique compensatoire).

**Article(s) RGPD concernés** : Art. 5.1.a (loyauté/transparence), Art. 5.1.e (limitation de la
conservation), Art. 13 (devoir d'information).

**Preuves** :
- `pivot-ui/src/app/features/legal/privacy.component.ts:50` — politique de confidentialité
  publique : *"Journaux d'audit : 1 an glissant."*
- `pivot-core/src/main/resources/db/migration/V1__schema_init.sql:280` — commentaire de la
  table : *"Immutable RGPD Art. 30 audit log — no DELETE from application"*.
- `pivot-core/src/main/java/fr/pivot/scheduler/CleanupScheduler.java:36-43` — l'unique job de
  purge du repo ne traite que `access_tokens` (`AccessTokenRepository.deleteExpiredAndRevoked`),
  aucune ligne ne référence `AuditEventRepository`.
- `pivot-docs/docs/backlog/EPIC-espace-compte/FEATURES/securite-compte/us-suppression-compte.md`
  — AC : *"Politique RGPD précise : ... audit events conservés 1 an puis purgés"* marquée 🟡 avec
  la note explicite : *"la purge des audit events après 1 an **n'est pas implémentée** —
  documentée comme TODO de suivi, à traiter par un enabler RGPD dédié"*.
- `pivot-docs/docs/backlog/EPIC-auth-iam/ENABLERS/en-audit-events.md` — critère coché ✅
  *"Rétention configurable (pas de purge immédiate — voir `CleanupScheduler`)"* : la référence
  est trompeuse, `CleanupScheduler` ne touche jamais `audit_events` — le critère ne devrait pas
  être marqué "Fait".

**Impact** : les adresses IP, user-agents et types d'événements de **tous** les comptes (actifs,
anonymisés ou en cours de suppression) s'accumulent indéfiniment, en contradiction directe avec
l'engagement écrit fait aux utilisateurs et opposable en cas de contrôle CNIL. La table croît
sans borne (impact performance à terme, hors du champ RGPD strict mais corrélé).

**Recommandation** : implémenter un scheduler dédié suivant le pattern déjà existant.

```java
// fr.pivot.scheduler.AuditEventCleanupScheduler
@Component
public class AuditEventCleanupScheduler {

    private final AuditEventRepository auditEventRepo;

    @Scheduled(cron = "${pivot.cleanup.audit-events-cron:0 45 2 * * *}")
    @Transactional
    public void purgeOldAuditEvents() {
        final Instant threshold = Instant.now().minus(365, ChronoUnit.DAYS);
        auditEventRepo.deleteByCreatedAtBefore(threshold);
    }
}
```

Ajouter `deleteByCreatedAtBefore(Instant)` à `AuditEventRepository`. Corriger la checkbox
`en-audit-events.md` (retirer le ✅ trompeur tant que non câblé) et faire passer l'AC 🟡 de
`us-suppression-compte.md` à ✅ une fois le job livré et testé.

**Effort** : S (job identique en forme à `CleanupScheduler`/`AccountDeletionScheduler` déjà en
place — pas de nouvelle requête complexe).

**Priorité** : P0.

---

### RGPD-CRIT-02 — Purge jamais câblée sur 6 tables contenant IP/empreinte d'appareil/jetons — méthodes de suppression déclarées mais mortes

**Sévérité** : CRITIQUE — Gravité 4/4 × Vraisemblance 3/4 = **12/16** (G4 = données identifiantes
— IP, empreinte d'appareil, nom d'appareil — conservées indéfiniment sur 6 tables distinctes ;
V3 = situation permanente depuis le déploiement initial, code déjà écrit mais jamais activé).

**Article(s) RGPD concernés** : Art. 5.1.e (limitation de la conservation), Art. 32 (sécurité —
surface de données exposée en cas de fuite anormalement large pour leur utilité réelle).

**Preuves** — seule `access_tokens` est purgée
(`CleanupScheduler.java:36-43` → `AccessTokenRepository.deleteExpiredAndRevoked`) ; les six
autres tables ont une méthode de purge déclarée **mais jamais appelée nulle part dans le
codebase** (vérifié par recherche globale) :

| Table | Contenu personnel | Méthode déclarée (jamais invoquée) |
|-------|--------------------|--------------------------------------|
| `trusted_devices` | `device_fingerprint`, `device_name`, `ip_address` | `TrustedDeviceRepository.java:18-19` `deleteExpired(threshold)` |
| `device_verify_tokens` | `device_fingerprint`, `device_name` | `DeviceVerifyTokenRepository.java:19-21` `deleteExpired(threshold)` |
| `password_reset_tokens` | lié à `user_id` | `PasswordResetTokenRepository.java:20` `deleteExpired(threshold)` |
| `email_verifications` | lié à `user_id` | `EmailVerificationRepository.java:13-15` `deleteExpiredAndUsed(threshold)` |
| `email_change_requests` | `new_email` (adresse email candidate) | `EmailChangeRequestRepository.java:49-52` `deleteExpiredAndTerminal(threshold)` |
| `suspicious_login_tokens` | `device_fingerprint`, `device_name`, `ip_address` | `SuspiciousLoginTokenRepository.java:23-25` `deleteExpired(threshold)` |

**Correction d'une hypothèse du mandat** : le contexte initial indiquait "`trusted_devices` ...
rétention 90 jours vue dans les migrations/seeds" en présentant cela comme un point déjà acquis.
Vérification faite : `DEVICE_TTL_DAYS=90` (`V1__schema_init.sql:699-700`) est une **contrainte
logique de re-vérification** (au-delà de ce délai glissant, l'appareil redemande un OTP — voir
`SessionService`/`GoogleAuthService`/`OidcAuthService`), **pas une suppression réelle de la
ligne** en base. Le TTL applicatif et la conservation BDD sont deux choses distinctes ici, et
seule la seconde relève strictement de l'Art. 5.1.e — elle n'existe pas.

**Impact** : accumulation indéfinie d'adresses IP et d'empreintes/noms d'appareils sur des
tables directement exploitées par les flux d'authentification — surface de données inutilement
large en cas de compromission de la base, et non-conformité au principe de minimisation même
hors tout incident.

**Recommandation** : étendre `CleanupScheduler` (ou dupliquer son pattern par table) — le code
métier existe déjà, il ne manque que le branchement :

```java
@Scheduled(cron = "${pivot.cleanup.tokens-cron:0 0 2 * * *}")
@Transactional
public void purgeExpiredTokens() {
    final Instant threshold = Instant.now().minus(30, ChronoUnit.DAYS);
    tokenRepo.deleteExpiredAndRevoked(threshold, TokenStatus.EXPIRED, TokenStatus.REVOKED);
    trustedDeviceRepo.deleteExpired(threshold);
    deviceVerifyTokenRepo.deleteExpired(threshold);
    passwordResetTokenRepo.deleteExpired(threshold);
    emailVerificationRepo.deleteExpiredAndUsed(threshold);
    emailChangeRequestRepo.deleteExpiredAndTerminal(threshold);
    suspiciousLoginTokenRepo.deleteExpired(threshold);
}
```

Ajouter un test unitaire par repository mocké (miroir de `CleanupSchedulerTest`) pour garantir
qu'aucune régression future ne "démonte" silencieusement un des sept appels.

**Effort** : XS — branchement seul, aucune nouvelle requête à écrire (le code de purge existe
déjà et est probablement déjà testé au niveau repository).

**Priorité** : P0.

---

## III. Findings HIGH

### RGPD-HIGH-01 — Absence de registre des traitements Art. 30 consolidé

**Sévérité** : HIGH — Gravité 3/4 × Vraisemblance 3/4 = **9/16** (obligation structurelle,
sanctionnable indépendamment de toute fuite de données ; situation actuelle permanente).

**Article(s) RGPD concernés** : Art. 30 (registre des activités de traitement).

**Preuves** : l'information nécessaire à un registre Art. 30 existe **mais est dispersée**,
jamais consolidée dans un document unique exploitable en cas de contrôle :
- finalités/bases légales/durées : `pivot-ui/src/app/features/legal/privacy.component.ts`
  (document public, pas un registre interne formel)
- inventaire technique : commentaires épars dans `V1__schema_init.sql` (ex. `audit_events`,
  `trusted_devices`)
- recherche explicite dans `pivot-docs/docs/audits/` et `pivot-docs/docs/backlog/` : aucun
  fichier `registre-traitements*` ou équivalent trouvé.

**Impact** : en cas de contrôle CNIL, aucun document ne peut être remis tel quel listant, par
traitement : finalité, catégories de données, catégories de personnes concernées, destinataires,
durée de conservation, mesures de sécurité — l'obligation documentaire existe indépendamment de
la conformité de fond.

**Recommandation** : créer `pivot-docs/docs/audits/registre-traitements-rgpd.md` (ou une section
dédiée dans un futur `docs/rgpd/`), un traitement par ligne : *Authentification & compte*,
*Journalisation de sécurité (`audit_events`)*, *Appareils de confiance*, *Whiteboard
collaboratif*. Réutiliser telles quelles les finalités/bases légales déjà rédigées dans
`privacy.component.ts` section 3 — pas de nouvelle réflexion juridique, juste la
restructuration en registre exploitable.

**Mise à jour 2026-07-31** : le fichier a été créé à l'emplacement recommandé, initié par
l'US11.8.1 (E11 Capacity Planning) avec sa seule entrée *Capacity Planning (Agilité)* — pas une
résolution de ce finding, dont le périmètre reste la consolidation de **tous** les traitements
existants (auth, audit_events, appareils de confiance, whiteboard…). Score/sévérité inchangés
tant qu'un passage formel ne couvre pas l'ensemble du registre.

**Effort** : M (rédaction, pas de code).

**Priorité** : P1.

---

### RGPD-HIGH-02 — Le droit à l'effacement/la portabilité ne se propage pas au module collaboratif — ni notification cross-repo, ni infrastructure de purge

**Sévérité** : HIGH — Gravité 3/4 × Vraisemblance 3/4 = **9/16** (G3 = risque architectural
touchant l'ensemble des futurs modules métier, pas seulement le whiteboard ; V3 = fenêtre courte
avant matérialisation — le module whiteboard est déjà en développement actif avec de vrais
utilisateurs/tenants).

**Article(s) RGPD concernés** : Art. 17 (effacement), Art. 20 (portabilité), Art. 5.1.e
(limitation de la conservation).

**Preuves** :
- `AccountDeletionService.anonymize(Long)` (`pivot-core/src/main/java/fr/pivot/account/service/AccountDeletionService.java:334-356`)
  n'agit que sur la table `users` du schéma `public` — aucun événement applicatif
  (`ApplicationEventPublisher`), aucun appel HTTP/webhook, aucune notification vers
  `pivot-collaboratif-core` lorsqu'un compte est anonymisé. Un `board.owner_id` ou
  `board_member.user_id` référençant ce compte reste inchangé indéfiniment.
- `ExportArchiveBuilder.java` — commentaire explicite : *"Collaborative-module data is deferred
  to a later phase"* ; `us-export-donnees.md` AC coché ✅ *"Archive contient : profil, sessions,
  audit events, données modules"* avec la note *"données modules différées"* — la checkbox ne
  reflète pas fidèlement l'état réel (partiel, pas complet).
- Recherche exhaustive de `@Scheduled`/`@EnableScheduling` dans
  `pivot-collaboratif-core/src/main/java` : **aucun résultat**. `board_share_token` a pourtant
  `expires_at`/`revoked_at` (`V1__schema_init.sql:32-43`, module collaboratif) sans jamais être
  purgé.

**Impact aujourd'hui** : limité — le schéma `collaboratif` actuel ne stocke que des métadonnées
structurelles (`title`, rôles, appartenance), aucun contenu libre saisi par l'utilisateur n'est
encore persisté (confirmé : pas de table canvas/élément/commentaire, le contenu temps réel
transite par WebSocket sans persistance actuellement). **Impact à court terme** : dès la
première US de contenu réellement persistant (F08.x whiteboard content, quiz, session live,
formulaire — toutes `Phase: Socle` ou `phase-3` déjà planifiées), ce module contiendra du texte
libre potentiellement identifiant, sans qu'aucun des deux droits (effacement, portabilité) ne
puisse le couvrir, et sans la moindre infrastructure de nettoyage à réutiliser.

**Recommandation** :
1. Publier un événement de domaine à l'anonymisation (`AccountAnonymizedEvent`, bus interne ou
   futur bus inter-modules) que chaque `pivot-xxx-core` pourra consommer pour anonymiser ses
   propres références (`owner_id`, `created_by`, `user_id`).
2. Créer dès maintenant l'équivalent minimal de `CleanupScheduler` dans
   `pivot-collaboratif-core` (purge de `board_share_token` expiré/révoqué) — établit le pattern
   avant que la charge de données personnelles n'augmente.
3. Corriger la checkbox `us-export-donnees.md` (🟡 partiel plutôt que ✅) et planifier
   l'extension de `ExportArchiveBuilder` avant la mise en production de tout module
   collaboratif persistant du contenu utilisateur.

**Effort** : M (event + listener + scheduler squelette) — architecture à poser tôt car elle sera
plus coûteuse à retrofit une fois plusieurs modules métier en place.

**Priorité** : P1.

---

## IV. Findings MEDIUM

### RGPD-MED-01 — Purge des comptes inactifs non implémentée (EN02.4/EN02.5, différée à `v1-enterprise`)

**Sévérité** : MEDIUM — Gravité 2/4 × Vraisemblance 3/4 = **6/16**.

**Article(s) RGPD concernés** : Art. 5.1.e (limitation de la conservation).

**Preuve** : `pivot-docs/docs/backlog/EPIC-espace-compte/ENABLERS/en-purge-comptes.md` (EN02.4)
et `en-cron-rgpd.md` (EN02.5) — tous deux `Stage: Backlog`, `Phase: v1-enterprise`, non
implémentés. Contrairement aux findings CRITIQUES ci-dessus, ce gap est **déjà connu, planifié
et volontairement différé** par l'équipe — nuance importante pour la priorisation.

**Impact** : un compte qui ne demande jamais explicitement sa suppression mais devient inactif
pendant des années conserve ses données (email, nom, historique) sans limite de durée liée à
l'usage réel. Risque réel mais moins pressant que C01/C02 (qui contredisent un engagement déjà
pris), et déjà tracé côté produit.

**Recommandation** : confirmer le calendrier `v1-enterprise` reste réaliste ; à défaut, aligner
la politique de confidentialité (section "Durée de conservation") pour ne pas sur-promettre tant
que le mécanisme n'existe pas — actuellement la politique reste correcte car elle ne mentionne
pas explicitement de purge d'inactivité, seulement "durée de la relation contractuelle + 3 ans".

**Effort** : L (nécessite une définition produit de "l'inactivité", pas seulement technique).

**Priorité** : P2.

---

### RGPD-MED-02 — Export de données (Art. 20) : `trusted_devices` absent de l'archive

**Sévérité** : MEDIUM — Gravité 2/4 × Vraisemblance 2/4 = **4/16**.

**Article(s) RGPD concernés** : Art. 15 (droit d'accès), Art. 20 (portabilité).

**Preuve** : `DataExportService.loadBundle` (`pivot-core/src/main/java/fr/pivot/account/service/DataExportService.java:231-250`)
charge `profil`, `sessions` (via `AccessTokenRepository`) et `audit events`, mais aucune section
`devices.json` alors que `TrustedDeviceRepository.findByUserIdOrderByLastSeenAtDesc(userId)`
existe déjà et suit exactement le même modèle que `sessions.json`.

**Impact** : gap de complétude mineur — les appareils de confiance (nom, IP, dates) sont déjà
consultables via `GET /api/auth/devices` (US01.4.2), donc le droit d'accès reste exerçable
autrement ; seule l'agrégation dans un export unique Art. 20 manque.

**Recommandation** :

```java
// ExportArchiveBuilder.build(...) — ajouter un 4e paramètre
final List<ExportDeviceDto> devices = trustedDeviceRepo
    .findByUserIdOrderByLastSeenAtDesc(user.getId())
    .stream().map(ExportDeviceDto::from).toList();
// puis writeEntry(zip, "devices.json", devices);
```

**Effort** : XS (DTO + query déjà disponibles, calqué sur `ExportSessionDto`).

**Priorité** : P2.

---

## V. Findings LOW-INFO

- **`notifications`** (schéma `public`) n'a aucune politique de purge (pas de TTL, pas de
  scheduler) — contenu à risque faible (titres/corps templatés, autoréférentiels à
  l'utilisateur destinataire), mais accumulation indéfinie même après lecture. À surveiller si
  le volume ou la richesse du contenu augmente.
- **Suppression de tenant** : `fk_users_tenant` (`V1__schema_init.sql:146`) n'a pas de clause
  `ON DELETE`, donc `RESTRICT` implicite — aucun flux d'offboarding complet d'un tenant
  (organisation) n'existe. N'est pas un droit RGPD au sens strict (les organisations ne sont pas
  des personnes concernées), mais pertinent pour la réversibilité contractuelle des données
  (cf. backlog `us-reversibilite-des-donnees.md`, hors périmètre de cet audit).
- **Droit d'opposition (Art. 21)** non exposé par un endpoint dédié — impact actuellement nul,
  la plateforme ne fait aujourd'hui aucun traitement de profilage/marketing (la politique de
  confidentialité mentionne un futur traitement "consentement — communications marketing" non
  encore implémenté) ; à couvrir avant l'activation réelle de toute fonctionnalité marketing.
- **`account_deletion_requests`/`account_deletion_otps`** conservées indéfiniment après purge du
  compte (par design, documenté explicitement dans le code comme nécessaire à la traçabilité
  Art. 5.2) — c'est un arbitrage assumé et correctement justifié, pas un gap.

---

## Statut des findings/dettes historiques

| # | Item | Statut | Preuve |
|---|------|--------|--------|
| — | — | N/A — premier audit formel | Aucun audit RGPD formel antérieur n'a été publié (v1 = initialisation du gabarit, `Statut: À compléter`, aucun score). Les "points d'attention" de la v1 ont été vérifiés par lecture de code réelle plutôt que reconduits par hypothèse — voir section suivante pour le résultat de cette vérification. |

**Vérification des hypothèses listées dans la v1 (scaffolding, pas un audit formel — confrontées
ici pour la première fois)** :

| Hypothèse v1 | Résultat de la vérification |
|--------------|------------------------------|
| "Aucune preuve d'implémentation du droit à l'effacement/export" | **Infirmée** — les deux droits sont intégralement implémentés, testés et en `Stage: Review` (US02.2.4, US02.3.1). |
| "`trusted_devices` ... rétention 90 jours" présentée comme acquise | **Partiellement infirmée** — le TTL de 90 jours est une contrainte logique de re-vérification, pas une suppression BDD réelle (RGPD-CRIT-02). |
| "Contenu whiteboard peut contenir des données personnelles saisies librement" | **Non confirmée à ce jour** — le schéma `collaboratif` actuel ne stocke aucun contenu libre (canvas/éléments), uniquement des métadonnées structurelles. Risque réel mais différé (RGPD-HIGH-02). |
| "Bases légales par traitement à documenter" | **Déjà fait côté public** (`privacy.component.ts` section 3) mais absent d'un registre interne consolidé (RGPD-HIGH-01). |

---

## Bonnes pratiques confirmées / Points forts

1. **Droit à l'effacement (Art. 17) exemplaire** — double confirmation (mot de passe / OTP pour
   comptes OIDC/Google-only), révocation immédiate de toutes les sessions, délai de grâce
   configurable, email de confirmation avec date d'effet et lien d'annulation à usage unique,
   anonymisation idempotente (`AccountDeletionService.anonymize`), et **testée réellement
   au-delà du délai de grâce** (TU + TI dédiées, cf. notes de livraison US02.2.4).
2. **Droit à la portabilité (Art. 20) rigoureux** — export asynchrone, rate-limité (1/24h),
   lien de téléchargement à usage unique avec TTL courte, vérification stricte de propriété
   (403 cross-user testé à 3 niveaux : unitaire, octets d'archive, bout-en-bout), DTO dédié
   excluant explicitement les secrets (`passwordHash`, `googleId`, `oidcSubject`).
3. **Suppression réelle du fichier avatar**, pas seulement de la référence BDD
   (`AvatarStorageService.deleteIfManaged`) — évite un résidu de fichier orphelin après
   anonymisation.
4. **Politique de confidentialité publique complète et à jour** (juin 2026) : responsable de
   traitement + DPO nommés, finalités/bases légales par catégorie de données, durées de
   conservation déclarées, droits Art. 15-22, hébergement UE exclusif affirmé, cookies
   strictement nécessaires (pas de tracking tiers).
5. **`access_tokens` : le seul des 7 mécanismes de purge de jetons réellement câblé et
   testé** (`CleanupScheduler` + `CleanupSchedulerTest`) — la preuve que le pattern fonctionne
   et qu'il suffit de répliquer pour combler RGPD-CRIT-02.
6. **Isolation tenant systématique** sur les données personnelles (`findByIdAndTenantId` côté
   `BoardRepository`, `TenantContext` jamais accepté depuis le body) — une fuite cross-tenant
   serait aussi une violation RGPD, ce contrôle sécurité sert directement la conformité.
7. **Aucune donnée sensible au sens de l'Art. 9** collectée à ce jour — confirmé par
   l'inventaire de schéma réel, cohérent avec l'affirmation de la politique de confidentialité.
8. **Droits d'accès et de rectification déjà exposés** (`GET`/`PATCH /account/profile`), pas
   seulement l'effacement/la portabilité — couverture des droits des personnes plus large que
   ce que le mandat initial laissait supposer.

---

## Score par grille RGPD (Art. 30, bases légales, droits des personnes)

| Catégorie | Score | Findings/dette actifs |
|-----------|-------|------------------------|
| Art. 30 — Registre des traitements | 4.5/10 | RGPD-HIGH-01 |
| Bases légales par finalité | 7.5/10 | Couvertes publiquement (`privacy.component.ts`), formalisation interne manquante (recoupe RGPD-HIGH-01) |
| Droits des personnes (accès, rectification, effacement, portabilité, opposition, limitation) | 6.5/10 | RGPD-CRIT-01, RGPD-CRIT-02, RGPD-HIGH-02, RGPD-MED-01, RGPD-MED-02 |

---

## Plan d'action

### P0 — Corriger avant toute mise à l'échelle commerciale ou tout contrôle externe
- RGPD-CRIT-01 — Scheduler de purge `audit_events` (365 jours glissants, aligné sur la politique
  de confidentialité publiée)
- RGPD-CRIT-02 — Câbler les 6 méthodes `deleteExpired*` déjà écrites dans un scheduler (extension
  de `CleanupScheduler` ou dédié)

### P1 — Avant le prochain audit externe / la publication commerciale du module collaboratif
- RGPD-HIGH-01 — Registre des traitements Art. 30 consolidé (`docs/audits/registre-traitements-rgpd.md`)
- RGPD-HIGH-02 — Événement de propagation de l'anonymisation cross-module + scheduler minimal
  dans `pivot-collaboratif-core` (purge `board_share_token`) avant toute US de contenu persistant

### P2 — Sprint suivant
- RGPD-MED-01 — Confirmer/ajuster le calendrier `v1-enterprise` d'EN02.4/EN02.5 (purge comptes
  inactifs) ou ajuster la politique de confidentialité en conséquence
- RGPD-MED-02 — Ajouter `devices.json` à l'export Art. 20 (réutilisation directe du modèle
  `sessions.json`)

### P3 — Qualité continue
- Purge/TTL sur `notifications`
- Endpoint explicite Art. 21 (opposition) avant toute fonctionnalité marketing/profilage réelle

### Externe — hors du contrôle direct de l'équipe
- Signature formelle des contrats de sous-traitance RGPD (DPA) avec les sous-traitants
  techniques mentionnés dans la politique de confidentialité (hébergeur cloud, prestataire email
  transactionnel) — vérification contractuelle/juridique, non observable par lecture de code, à
  confirmer par le mainteneur.
- Désignation formelle et enregistrement du DPO (`dpo@pivot.app` référencé publiquement) —
  existence de la boîte mail confirmée dans le code frontend, statut juridique de la désignation
  hors périmètre technique.

---

## Conclusion

**Dette maîtrisée sur les droits des personnes, mais deux failures actives de conformité à
corriger avant tout contrôle externe.** Les fondations (effacement, portabilité, accès,
rectification) sont solides, testées et documentées à un niveau supérieur à ce que le mandat
initial laissait supposer. Cependant, la plateforme promet publiquement une conservation
précise des journaux d'audit qu'elle n'applique techniquement pas, et six tables contenant des
données identifiantes (IP, empreinte d'appareil) n'ont jamais leur purge réellement activée
malgré du code déjà écrit à cet effet — deux constats vérifiables, corrigibles à faible effort
(P0, XS-S), qui doivent être traités avant toute communication de conformité externe ou mise à
l'échelle commerciale. Réserve principale : le module collaboratif ne stocke pas encore de
contenu personnel libre, mais n'a aujourd'hui aucune infrastructure de rétention/propagation de
l'effacement à hériter — la fenêtre pour la construire avant la première US de contenu persistant
se referme vite au rythme de développement actuel du module whiteboard.

---

*Expert RGPD — 2026-07-08 — indépendant (premier audit formel) — distribution restreinte*

---

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---|---|---|---|
| v1 | 2026-06-20 | — | Initialisation |
| v2 | 2026-07-08 | 6.2/10 | Premier audit formel réel. Vérification de code confirme l'implémentation complète des droits à l'effacement (Art. 17) et à la portabilité (Art. 20), infirmant l'hypothèse de départ. Deux findings CRITIQUES découverts : rétention `audit_events` promise (politique de confidentialité) mais jamais techniquement appliquée (RGPD-CRIT-01), et purge jamais câblée sur 6 tables contenant IP/empreinte d'appareil malgré du code de purge déjà écrit (RGPD-CRIT-02). Deux findings HIGH : absence de registre Art. 30 consolidé, et absence de propagation de l'effacement/purge vers le module collaboratif. |
