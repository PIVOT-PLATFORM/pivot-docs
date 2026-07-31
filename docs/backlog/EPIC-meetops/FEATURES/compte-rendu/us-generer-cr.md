# US12.3.1 — Générer et partager le compte-rendu de réunion

**En tant que** organisateur / participant
**Je veux** obtenir un compte-rendu structuré à la fin de la réunion
**Afin de** partager les décisions et actions à toute l'équipe

## Critères d'acceptation

Format Given/When/Then (« Étant donné … lorsque … alors … »). Chaque critère mappe au moins un test (pivot-collaboratif-core / pivot-collaboratif-ui).

| Critère | 🤖 Dev |
|---------|--------|
| Étant donné une réunion clôturée (`status = CLOSED`) dont l'utilisateur est organisateur ou participant, lorsqu'il appelle `GET /api/collaboratif/meetings/{id}/report`, alors le backend retourne `200` + `Content-Type: application/json` avec un objet `MeetingReport` : `{ meetingId, title, status, startedAt, closedAt, actualDurationMinutes, draft: false, attendees[], agendaItems[], decisions[], actions[] }` | ⬜ |
| Étant donné une réunion clôturée, lorsque le compte-rendu est généré, alors `attendees[]` liste chaque invité avec `{ userId, displayName, present }` — `present = true` si connecté au moins une fois pendant l'animation (US12.2.1), `false` sinon | ⬜ |
| Étant donné les temps enregistrés par point pendant l'animation (US12.2.1), lorsque le compte-rendu est généré, alors chaque entrée `agendaItems[]` expose `{ id, title, plannedDurationSeconds, actualDurationSeconds, overtime }` avec `overtime = actualDurationSeconds > plannedDurationSeconds` | ⬜ |
| Étant donné des décisions et actions saisies pendant la réunion (US12.2.2), lorsque le compte-rendu est généré, alors `decisions[]` contient `{ id, label, decidedAt }` et `actions[]` contient `{ id, label, ownerUserId, ownerDisplayName, dueDate, status }` (owner et échéance obligatoires) | ⬜ |
| Étant donné une réunion clôturée, lorsque l'utilisateur appelle `GET /api/collaboratif/meetings/{id}/report?format=markdown`, alors le backend retourne `200`, `Content-Type: text/markdown; charset=utf-8`, `Content-Disposition: attachment; filename="cr-{id}.md"`, corps = compte-rendu rendu en Markdown (titre, participants présents, agenda + durées réelles, décisions, actions owner/échéance) | ⬜ |
| Étant donné une réunion `status = IN_PROGRESS` (non clôturée), lorsque l'utilisateur appelle l'endpoint report, alors le backend retourne `200` avec un compte-rendu partiel `draft: true` (données arrêtées à l'instant T, point courant inclus avec sa durée partielle) et aucune notification de partage n'est déclenchée | ⬜ |
| Étant donné une réunion clôturée, lorsque l'utilisateur ouvre l'écran compte-rendu dans `pivot-collaboratif-ui`, alors le compte-rendu final (`draft: false`) s'affiche en lecture seule avec les actions « Télécharger JSON », « Télécharger Markdown » et « Partager à l'équipe » | ⬜ |
| Étant donné une réunion clôturée et l'utilisateur organisateur, lorsqu'il appelle `POST /api/collaboratif/meetings/{id}/report/share`, alors le backend retourne `200`, notifie tous les participants et les membres de l'équipe (FK `public.teams.id`) et diffuse l'événement `MEETING_REPORT_SHARED` sur le topic STOMP `/topic/collaboratif/meeting/{id}` | ⬜ |
| Erreur : lorsque `GET .../report` cible un `id` inexistant ou une réunion hors de l'équipe de l'utilisateur, alors le backend retourne `404 Not Found` ; lorsque `format` a une valeur non supportée, alors `400 Bad Request` ; lorsque `POST .../report/share` cible une réunion non clôturée (`IN_PROGRESS`), alors `409 Conflict` code `MEETING_NOT_CLOSED` | ⬜ |
| Sécurité : étant donné un utilisateur non membre de l'équipe de la réunion, lorsqu'il appelle report ou share, alors le backend retourne `403 Forbidden` — l'autorisation (appartenance à l'équipe) est vérifiée côté serveur, jamais seulement masquée en UI ; seul l'organisateur peut déclencher `share` (participant simple → `403`) | ⬜ |
| Accessibilité : étant donné l'écran compte-rendu, lorsqu'il est parcouru au clavier et au lecteur d'écran, alors le titre est en `<h1>`, le tableau agenda a des en-têtes `<th scope="col">`, les boutons de téléchargement/partage ont un libellé accessible, la confirmation de partage est annoncée via `aria-live="polite"`, et les contrastes respectent WCAG 2.1 AA | ⬜ |
| i18n : toutes les chaînes de l'écran et de l'export Markdown proviennent des catalogues `fr.json` / `en.json` sous l'espace de clés `collaboratif.meetops.report.*` — aucune chaîne en dur | ⬜ |

## Hors-périmètre

- Suivi et relance des actions issues des réunions passées → **US12.3.2**.
- Édition manuelle / annotation du compte-rendu après génération (le compte-rendu est un rendu calculé, pas un document éditable).
- Export PDF (Markdown + JSON uniquement pour cette US).
- Résumé automatique par IA du contenu des échanges.

## Notes d'implémentation

- **Backend** : `pivot-collaboratif-core`, schéma Flyway `collaboratif`. Le compte-rendu est un agrégat calculé (pas de table dédiée) à partir de `meetings`, `agenda_items`, `meeting_decisions`, `meeting_actions` (EN12.1) ; la présence des participants et les durées réelles par point sont produites par l'animation temps réel (US12.2.1).
- **Statuts réunion** utilisés : `IN_PROGRESS` (compte-rendu draft) et `CLOSED` (compte-rendu final + partage autorisé).
- **Endpoints** : `GET /api/collaboratif/meetings/{id}/report` (param `format=json|markdown`, défaut `json`) ; `POST /api/collaboratif/meetings/{id}/report/share`.
- **STOMP** : événement `MEETING_REPORT_SHARED` publié sur `/topic/collaboratif/meeting/{meetingId}` (room EN12.2).
- **Autorisation** : périmètre équipe (FK `collaboratif → public.teams.id`) ; action `share` réservée à l'organisateur.
- **Frontend** : `pivot-collaboratif-ui`, écran compte-rendu sous la route meetops, guard module (EN12.2) ; consomme `@pivot/ui-core` + `@pivot/design-system` (pré-requis EN17).

---
Item Type: US · Parent: F12.3 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: animateur-facilitateur, utilisateur-final
Dépendances: US12.2.1
