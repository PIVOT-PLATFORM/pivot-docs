# US19.1.1 — Créer une session live

**En tant que** animateur
**Je veux** créer une session live avec un type d'activité
**Afin de** animer une interaction collective en temps réel

**Gate 1 réalisé le 2026-07-23** — remplace le stub outline précédent.

**Architecture — schéma `EN19.1` posé ici** (Session, Activity, Participant, Response — pas de
fichier AC séparé pour l'enabler, socle direct de cette US et des trois suivantes, voir §Notes).

**Correction de périmètre (Gate 1)** : le stub d'origine listait 5 types (« QUIZ · POLL ·
WORDCLOUD · BRAINSTORM · QA ») — omission du 6ᵉ type `VOTE` (`US19.3.6`), pourtant bien présent
dans le tableau des items de `sprint-22.md` et le README de l'EPIC. Corrigé : 6 types.

## Critères d'acceptation

### Création (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un appelant authentifié, when `POST /api/collaboratif/sessions` avec `{ title, type, config, teamId? }`, then 201 Created avec la session créée (`status: "DRAFT"`, `createdBy` = appelant) | ⬜ |
| Given `type`, when la création est traitée, then il doit appartenir à `{QUIZ, POLL, WORDCLOUD, BRAINSTORM, QA, VOTE}` | ⬜ |
| Given la session créée, when elle est persistée, then un code court **6 caractères alphanumériques majuscules** (hors caractères ambigus `0/O/1/I`) est généré, unique parmi les sessions non `COMPLETED` du tenant (collision → régénération, boucle bornée à 10 tentatives) | ⬜ |
| Given `teamId` fourni, when la création est traitée, then il doit référencer une équipe du tenant de l'appelant (`public.teams`) — champ optionnel, une session peut être créée sans équipe (usage individuel) | ⬜ |
| Given `config`, when elle est validée, then sa forme dépend du `type` (ex. QUIZ attend une liste de questions, POLL une question + options) — validation détaillée dans l'US de l'activité correspondante (`US19.3.x`) ; à la création, seule la présence d'un objet `config` non nul est exigée, le contenu détaillé peut être complété après coup via `US19.1.2`/les endpoints d'activité avant `start` | ⬜ |

### Lecture

| Critère | 🤖 Dev |
|---------|--------|
| Given le tenant de l'appelant, when `GET /api/collaboratif/sessions?teamId=&status=`, then 200 OK avec les sessions accessibles (créateur, ou membre de l'équipe `teamId` si renseignée), filtrées si fournies, triées par `createdAt` décroissant | ⬜ |
| Given une session accessible, when `GET .../sessions/{id}`, then 200 OK avec la session (titre, type, config, statut, code, compteur de participants) | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given `title` vide ou > 120 caractères, when création, then 400 code `INVALID_TITLE` | ⬜ |
| Error : given `type` hors énumération, when création, then 400 code `INVALID_SESSION_TYPE` | ⬜ |
| Error : given `teamId` inexistant ou d'un autre tenant, when création, then 404 | ⬜ |
| Error : given un `id` de session inexistant ou d'un autre tenant, when lecture, then 404 | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : `tenantId`/`userId` résolus exclusivement depuis le `RequestPrincipal` (`CollaboratifRequestPrincipal`), jamais du body | ⬜ |
| Security : given un appelant sans lien avec une session `teamId`-scopée (ni créateur, ni membre de l'équipe), when lecture, then 404 (jamais 403 — anti-énumération) | ⬜ |
| Security : test TI obligatoire cross-tenant sur `GET /sessions` et `GET /sessions/{id}` | ⬜ |

## Hors périmètre

- **Duplication d'une session** — non spécifié, candidat futur.
- **Templates de session réutilisables** — non spécifié.

## Notes d'implémentation

- **Backend** : nouveau module `fr.pivot.collaboratif.session` (sibling de `fr.pivot.collaboratif.whiteboard`) — entités `Session` (`id`, `tenantId`, `teamId` nullable FK `public.teams(id)`, `title`, `type` enum `SessionType{QUIZ,POLL,WORDCLOUD,BRAINSTORM,QA,VOTE}`, `status` enum `SessionStatus{DRAFT,LIVE,PAUSED,COMPLETED}`, `joinCode` (6 chars, index unique partiel sur les sessions non `COMPLETED`), `config` (JSONB, forme dépendant du type), `createdBy`, `createdAt`, `updatedAt`), `Activity` (une session porte une activité active — pour ce socle, un mapping direct 1:1 Session↔Activity suffit puisque `type` est fixé à la création, pas de séquence multi-activités dans une même session ; `Activity` reste un concept distinct au niveau schéma pour absorber une future évolution multi-activités sans migration de rupture), `Participant` (`id`, `sessionId` FK `ON DELETE CASCADE`, `userId` nullable — `null` = invité anonyme —, `guestToken` nullable, `displayName`, `joinedAt`), `Response` (forme polymorphe minimale commune — voir chaque `US19.3.x` pour les colonnes propres à son type d'activité, ce socle ne pose que les colonnes partagées `id`/`sessionId`/`participantId`/`createdAt`). Migration Flyway forward `V12__session.sql` (dernier numéro réel constaté dans `collaboratif/src/main/resources/db/migration/collaboratif/` au Gate 1 est `V11` — `V12` suit ; revérifier avant implémentation si d'autres migrations sont mergées entretemps, ne jamais réutiliser un numéro déjà mergé). `SessionAccessService#resolveSessionForCaller` — créateur ou membre de l'équipe liée (si `teamId` renseigné) via `TeamMembershipService`, 404 anti-énumération, même pattern que `WheelService#resolveAccessibleWheel`. `JoinCodeGenerator` — fonction pure testable en isolation, même approche que `JoinCodeGenerator` déjà utilisé côté `agilite.retro`. `SessionController`, `CollaboratifApiPaths`.
- **Frontend** : `projects/collaboratif-ui/src/lib/session/` — `session-list`, `session-form` (sélecteur de type avec icônes, config initiale dépendant du type sélectionné).

---
Item Type: US · Parent: F19.1 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Rôle: animateur-facilitateur
