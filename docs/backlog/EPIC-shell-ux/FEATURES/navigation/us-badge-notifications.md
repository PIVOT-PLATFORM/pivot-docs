# US16.1.3 — Badge notifications dans la navigation

**En tant que** utilisateur
**Je veux** voir un badge dans la navigation indiquant le nombre de notifications non lues
**Afin de** savoir rapidement si j'ai des alertes en attente

## Critères d'acceptation

> **PO Agent — Gate 1 READINESS recalculé (2026-07-06).** L'US était bloquée sur EN-notifications
> (enabler à créer). C'est fait : `pivot-core` PR [#160](https://github.com/PIVOT-PLATFORM/pivot-core/pull/160)
> (`feat/en-notif-infrastructure`), Gate 4 = 100/100, CI verte — **non fusionnée sur `main`** au
> moment de cette réévaluation. Dépendance considérée résolue au niveau du contrat (lu directement
> dans le diff de la PR, pas deviné), avec un point de coordination cross-repo documenté ci-dessous
> (§ Notes d'implémentation) plutôt qu'ignoré. AC reformulées au format Given/When/Then +
> AC sécurité ajoutée (absente de la version précédente) — DoR désormais satisfaite.
>
> **Score Gate 1 : 96/100** — AC testables 40/40 · dépendances résolues 18/20 (contrat confirmé,
> mais PR #160 pas encore mergée — coordination documentée, pas un blocage) · impact contrat module
> 15/15 (aucun changement de contrat côté `pivot-ui`, consomme un contrat existant) · AC sécurité +
> A11y 15/15 · pas de cycle 10/10 → **≥ 70 → `Stage: Ready` → implémentation immédiate.**

| Critère | 🤖 Dev |
|---------|--------|
| Given l'utilisateur authentifié consulte la navbar, when le nombre de notifications non lues (`GET /api/notifications/unread-count`) est > 0, then un badge numérique s'affiche sur l'icône cloche avec ce nombre | ✅ |
| Given le nombre de notifications non lues est 0, when la navbar est affichée, then le badge est masqué | ✅ |
| Given le nombre de notifications non lues dépasse 99, when le badge s'affiche, then il montre "99+" et l'`aria-label` indique le nombre exact (ex. "127 notifications non lues") | ✅ |
| Given l'utilisateur authentifié, when 30 secondes s'écoulent depuis la dernière mise à jour (polling — voir Notes d'implémentation pour le choix polling vs WebSocket), then le badge se met à jour avec le nombre courant | ✅ |
| Given une mise à jour du compteur, when le nombre change, then l'annonce est faite via une région `aria-live="polite"` hors-écran dédiée — jamais sur le badge lui-même (évite les annonces répétées à chaque cycle de détection de changement) | ✅ |
| Error : given `GET /api/notifications/unread-count` échoue, when le nombre total de tentatives (1 initiale + 2 réessais en backoff exponentiel, 1s puis 2s) atteint 3, then le badge n'est pas affiché — même si un dernier compteur positif était connu avant l'échec | ✅ |
| Security : le client n'envoie jamais `userId`/`tenantId` — le compteur est résolu exclusivement depuis le token porteur côté `pivot-core` ; le badge n'expose que le compteur, jamais le contenu (titre/corps) des notifications | ✅ |
| A11y : `aria-label` internationalisé (fr "X notifications non lues" / en "X unread notifications"), suit le pattern Transloco existant (`nav.notif_count`) | ✅ |

## Hors périmètre

- Liste détaillée des notifications (panneau déroulant, page dédiée) — le bouton cloche reste
  `aria-disabled="true"` ("bientôt disponible"). Périmètre potentiel d'une US future consommant
  `GET /api/notifications` (paginé) et `PATCH /api/notifications/{id}/read` (déjà livrés par
  EN-NOTIF côté contrat, non consommés ici).
- Le mécanisme de push STOMP côté serveur (`/user/{userId}/queue/notifications`) — déjà livré par
  EN-NOTIF (`pivot-core`), pas consommé côté `pivot-ui` (voir Notes d'implémentation).

## Notes d'implémentation

- `NotificationService` : `src/app/core/notifications/notification.service.ts` (`pivot-ui`) —
  `GET /api/notifications/unread-count`, signal `unreadCount`/`hasError`, `poll()` (30s).
- `NavbarComponent` : `src/app/core/layout/navbar/navbar.component.ts` — bouton cloche déjà
  existant (placeholder), câblé sur `NotificationService`.
- **Dépendance EN-NOTIF** : contrat confirmé par lecture directe de `pivot-core` PR
  [#160](https://github.com/PIVOT-PLATFORM/pivot-core/pull/160) (`feat/en-notif-infrastructure`,
  Gate 4 = 100/100, CI verte) — **non fusionnée sur `main`** au moment de l'implémentation de cette
  US. Aucun conflit de fichier (repos distincts), mais dépendance **fonctionnelle** : le badge ne
  sera opérationnel en intégration réelle (vraies données pivot-core) qu'après fusion de #160. Les
  tests `pivot-ui` (Vitest) simulent le contrat HTTP tel que confirmé dans le diff — n'attendent pas
  un backend réellement démarré. Point de coordination répété dans la PR `pivot-ui`
  [#103](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/103) et la spec Gate 5
  (`docs/specs/EPIC-shell-ux/us16-1-3-badge-notifications.md`).
- **Choix polling 30s plutôt que WebSocket STOMP** : `pivot-ui/CLAUDE.md` réserve le client STOMP
  (`@stomp/rx-stomp`) aux repos modules (ex. `pivot-collaboratif-ui`), jamais au shell `pivot-ui` —
  vérifié : aucune trace de STOMP dans `pivot-ui` aujourd'hui (`package.json`, `src/`). Le canal
  STOMP EN-NOTIF (`/user/{userId}/queue/notifications`) reste disponible pour un futur repo module
  de notifications si besoin, mais l'introduire dans le shell violerait cette séparation
  d'architecture. Le polling 30s est de toute façon documenté comme filet de sécurité par l'AC
  EN-NOTIF elle-même — un choix cohérent, pas un contournement.
- Interprétation explicite de l'AC "réessai automatique avec backoff exponentiel (max 3
  tentatives)" : 3 tentatives **totales** (1 initiale + 2 réessais), pas 3 réessais en plus du
  premier appel — clarifiée ici plutôt que devinée silencieusement (règle "AC ambigu → PO Agent
  clarifie").
- E2E Playwright différé (environnement indisponible dans ce bac à sable, règle déjà établie ce
  sprint) — couverture Vitest complète à la place (`notification.service.spec.ts` +
  `navbar.component.spec.ts` étendu).

## Gate 4 MERGE_CONFIDENCE

**Score : 100/100** — Autoloop `pivot-ui` PR [#103](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/103)
convergé en 1 itération (1 correctif mineur `aria-atomic` appliqué en auto-review). CI complète
verte (build, lint, tests Vitest 867/867, Lighthouse Accessibilité, CodeQL, Semgrep, Gitleaks,
SonarCloud, Trivy, SCA, Plumber). PR sortie du mode draft. Détail complet du scoring : commentaire
de revue sur la PR + spec Gate 5 (`docs/specs/EPIC-shell-ux/us16-1-3-badge-notifications.md`).

---
Item Type: US · Parent: F16.1 · Module: core · Phase: Socle · Size: S · Priority: Medium
Stage: Review
Dépendances: EN-NOTIF (`pivot-core` PR #160, Gate 4 = 100/100, CI verte — non fusionnée sur `main`,
coordination cross-repo documentée ci-dessus)
