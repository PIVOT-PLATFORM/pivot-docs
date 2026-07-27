# US12.3.1 — Générer et partager le compte-rendu de réunion

> Gate 1 validé (PO Agent) — Sprint 23.

**En tant que** organisateur / participant
**Je veux** obtenir un compte-rendu structuré à la fin de la réunion
**Afin de** partager les décisions et actions à toute l'équipe

## Critères d'acceptation (Gate 1 — figés)

> Base REST du module : `CollaboratifApiPaths.BASE` = `/collaboratif` → préfixe global `/api` ⇒ toutes les routes ci-dessous sont servies sous `/api/collaboratif/...`.
> Identité résolue via `CollaboratifRequestPrincipal(userId, tenantId, role)` (token porteur, EN08.3/ADR-022) — jamais depuis le body, un header custom ou le path.

### Nominal — génération & consultation

| Critère | 🤖 Dev |
|---------|--------|
| Given une réunion clôturée du tenant courant à laquelle le caller a accès (organisateur, participant ou membre de la `teamId`), when il fait `GET /api/collaboratif/meetings/{meetingId}/report`, then le service retourne `200` + `MeetingReportDto` `draft=false` contenant : titre, statut, participants présents, points d'agenda (titre, durée planifiée, durée réelle, indicateur `overtime`), décisions enregistrées, actions (`label`, `ownerUserId`, `dueDate`), `actualDurationSeconds`, `generatedAt` | ⬜ |
| Given une réunion **non clôturée** (statut `STARTED`/`IN_PROGRESS`), when le caller fait `GET .../report`, then le service retourne `200` + `MeetingReportDto` `draft=true` (compte-rendu partiel dérivé en direct des tables source, sans figer de snapshot) | ⬜ |
| Given une réunion clôturée, when le caller fait `GET .../report/export?format=markdown`, then le service retourne `200` avec `Content-Type: text/markdown` et le corps Markdown transformé depuis le même `MeetingReportDto` (sections `## Participants`, `## Agenda`, `## Décisions`, `## Actions`) | ⬜ |
| Given une réunion clôturée, when le caller fait `GET .../report/export?format=json` (ou sans paramètre), then le service retourne `200` + le `MeetingReportDto` sérialisé en JSON natif REST | ⬜ |
| Given une réunion `STARTED`, when l'organisateur (ou `ROLE_ADMIN`) la clôture (`POST .../meetings/{meetingId}/close`), then un snapshot figé du CR est persisté (`collaboratif.meeting_report`, une ligne par réunion) et un événement STOMP `MEETING_REPORT_READY` est diffusé sur `/topic/collaboratif/meeting/{meetingId}` | ⬜ |

### Error cases

| Critère | 🤖 Dev |
|---------|--------|
| Error : given un `meetingId` inexistant **ou appartenant à un autre tenant**, when `GET .../report` (ou `/export`), then le système retourne `404 Not Found` (jamais `403` — ne pas confirmer l'existence cross-tenant) | ⬜ |
| Error : given `GET .../report/export?format=xml` (format non supporté — seuls `json` et `markdown`), then le système retourne `400 Bad Request` avec un message d'erreur explicite, sans corps de rapport | ⬜ |
| Error : given un caller authentifié du bon tenant mais **sans accès à la réunion** (ni organisateur, ni participant, ni membre de la `teamId`), when `GET .../report`, then le système retourne `404 Not Found` | ⬜ |
| Error : given une tentative de clôture (`POST .../close`) par un caller qui n'est ni organisateur ni `ROLE_ADMIN`, when la requête est traitée, then le système retourne `403 Forbidden` et aucun snapshot n'est écrit | ⬜ |

### Security

| Critère | 🤖 Dev |
|---------|--------|
| Security : le `tenantId` est extrait **exclusivement** du `CollaboratifRequestPrincipal` (token porteur) ; toute requête portant un `tenantId`/`userId` en body, query ou header custom l'ignore. Test TI cross-tenant obligatoire : réunion du tenant B → `404` pour un token tenant A | ⬜ |
| Security : la génération/figement du snapshot à la clôture est réservée à `owner-or-ROLE_ADMIN` (résolution via le service d'accès réunion) — un participant simple ne peut pas déclencher la clôture ni écraser un CR figé | ⬜ |
| Security : le CR (draft ou figé) n'agrège que les `agenda_items`/`meeting_decisions`/`meeting_actions` du `meetingId` demandé — aucune fuite de décisions/actions d'une autre réunion ; l'événement `MEETING_REPORT_READY` n'est diffusé que sur la room `/topic/collaboratif/meeting/{meetingId}` (isolation room STOMP) | ⬜ |
| Security : une fois figé à la clôture, le contenu du snapshot est immuable — une édition ultérieure d'une décision/action (US12.3.2) ne modifie pas le CR partagé déjà figé ; le draft, lui, reflète l'état courant tant que la réunion n'est pas clôturée | ⬜ |

### A11y (composant UI — vue CR + boutons d'export)

| Critère | 🤖 Dev |
|---------|--------|
| A11y : la vue CR expose une hiérarchie de titres cohérente (`h1` = titre réunion, `h2` = Participants / Agenda / Décisions / Actions) et des régions/landmarks ; la liste des actions est un `<table>` avec en-têtes `scope="col"` (Action, Responsable, Échéance) (WCAG 2.1 AA 1.3.1) | ⬜ |
| A11y : les boutons « Exporter en Markdown » / « Exporter en JSON » ont un nom accessible (`aria-label`), sont activables au clavier et présentent un focus visible (WCAG 2.1 AA 2.1.1 / 2.4.7) | ⬜ |
| A11y : les statuts `draft` (brouillon) et `overtime` (dépassement) ne sont pas véhiculés par la seule couleur — texte/icône + attribut ARIA associé ; contraste texte ≥ 4.5:1 (WCAG 2.1 AA 1.4.1 / 1.4.3) | ⬜ |

---
Item Type: US · Parent: F12.3 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: animateur-facilitateur, utilisateur-final
Dépendances: US12.2.1
