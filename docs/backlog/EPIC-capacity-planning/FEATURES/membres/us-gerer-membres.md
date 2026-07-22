# US11.2.1 — Gérer les membres de l'équipe et leur disponibilité

**En tant que** Scrum Master
**Je veux** définir les membres de l'équipe participant à un événement
**Afin de** calculer la capacité totale disponible

**Gate 1 réalisé le 2026-07-22** — remplace le stub outline précédent. Prolonge US11.1.1 : les
membres sont **auto-alimentés** depuis l'effectif de l'équipe à la création de l'événement (types
`SPRINT`/`RELEASE`/`CUSTOM` uniquement — un `PI_PLANNING` n'a pas de membres propres, voir
US11.1.1 §Architecture) ; cette US couvre la **consultation et l'ajustement** de cet effectif
figé, pas sa création à partir de rien.

## Critères d'acceptation

### Lecture (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un événement accessible, when `GET /api/agilite/capacity/events/{id}/members`, then 200 OK avec les membres de l'événement (`teamMemberId`, `name` dénormalisé, `availabilityPercent`, `excluded`, absences — voir US11.2.2), triés par nom | ⬜ |

### Ajustement (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un membre d'un événement accessible, when `PATCH .../events/{id}/members/{memberId}` avec `{ excluded?, availabilityPercent? }`, then 200 OK avec le membre mis à jour | ⬜ |
| Given `availabilityPercent`, when il est fourni, then il est validé dans l'intervalle `[10, 100]` — bornes inclusives, aucune énumération stricte imposée bien que 50/75/100 restent les valeurs suggérées côté UI | ⬜ |
| Given un membre exclu (`excluded: true`), when le résumé de capacité est calculé (US11.1.2), then il ne contribue plus au calcul, mais reste visible dans la liste (pas de suppression) | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given `availabilityPercent` hors `[10, 100]`, when ajustement, then 400 code `INVALID_AVAILABILITY` | ⬜ |
| Error : given un `id` d'événement ou de membre inexistant/autre tenant, when tout endpoint ci-dessus, then 404 | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : `tenantId`/`userId` résolus exclusivement depuis le `RequestPrincipal` | ⬜ |
| Security : given un appelant sans lien avec l'événement (voir US11.1.1), when lecture/ajustement, then 404 (jamais 403) | ⬜ |
| Security : test TI obligatoire cross-tenant sur `GET/PATCH .../events/{id}/members` — un membre d'un événement d'un autre tenant reste inaccessible même si l'`id` est deviné | ⬜ |

### A11y (frontend `pivot-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| A11y : bascule d'exclusion — `<input type="checkbox">` natif par membre avec `<label>` associé, jamais un simple clic sur une ligne | ⬜ |
| A11y : sélecteur de disponibilité — `<input type="number">` ou `<select>` natif avec libellé, pas un slider sans alternative clavier | ⬜ |

## Hors périmètre

- **Ajout/retrait manuel d'un membre hors effectif de l'équipe** — l'effectif de l'événement reste
  dérivé strictement de `public.team_members` au moment de la création (US11.1.1) ; pas de saisie
  libre de participant externe pour ce lot (contrairement à la Roue, US14.1.1).
- **Resynchronisation automatique** après changement d'effectif de l'équipe — voir US11.1.1 §Hors
  périmètre.

## Notes d'implémentation

- **Backend** : entité `CapacityEventMember` (`id`, `eventId` FK `ON DELETE CASCADE`,
  `teamMemberId` FK `public.team_members(id)`, `name` dénormalisé (même précédent que
  `StandupParticipant.name`/`WheelEntry` — un départ d'équipe ultérieur ne casse pas l'historique
  de l'événement), `availabilityPercent` (défaut 100), `excluded` (défaut `false`) — même fichier
  de migration que `CapacityEvent` (`V6__capacity_event.sql`) ou suivant selon la taille, à
  trancher en implémentation. `CapacityEventMemberService#list/updateMember`, réutilise
  `CapacityEventAccessService#resolveEventForCaller` (US11.1.1) pour l'anti-énumération.
- **Frontend** : liste des membres dans `capacity-event-detail` — checklist native (checkbox
  exclusion) + champ disponibilité par ligne, mêmes conventions que le sélecteur de participants
  Standup (US10.1.1).

---
Item Type: US · Parent: F11.2 · Module: agilite · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: scrum-master
Dépendances: US11.1.1
