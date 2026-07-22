# US11.2.2 — Saisir les absences et jours non disponibles

**En tant que** Scrum Master
**Je veux** saisir les absences de chaque membre sur un événement
**Afin de** calculer la capacité réelle disponible

**Gate 1 réalisé le 2026-07-22** — remplace le stub outline précédent. Prolonge US11.2.1.

**Architecture — RGPD, suppression du champ `motif` (Gate 1 — décision mainteneur)** : le stub
d'origine demandait une absence `{ memberId, dateDebut, dateFin, motif }` — mais la section RGPD
de l'EPIC (`EPIC-capacity-planning/README.md` §RGPD & éthique) énonce explicitement : *« Minimisation
(seules les périodes d'indisponibilité, **jamais les motifs ni données de santé**) »*. Le champ
`motif` du stub contredisait donc directement le principe déjà posé par l'EPIC lui-même — écart
constaté et corrigé au Gate 1 (confirmation mainteneur explicite, 2026-07-22), pas une
interprétation unilatérale. Le POC de référence PouetPouet (`apps/api/src/modules/capacity/
capacity.routes.ts`) porte lui-même un champ `reason` libre sur ses absences — **délibérément non
repris**, cet écart avec le POC est la correction elle-même. **Décision retenue** : l'entité
absence ne porte **que** `teamMemberId` + `dateDebut`/`dateFin` — aucun champ motif, catégorie ou
commentaire, même sous forme d'énumération grossière. Même rigueur que la décision anonymat/
attribution du poker (US09.2.2) documentée plus tôt cette session.

## Critères d'acceptation

### Création (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un membre d'un événement accessible, when `POST /api/agilite/capacity/events/{id}/members/{memberId}/absences` avec `{ dateDebut, dateFin }`, then 201 Created — **aucun champ motif accepté même si fourni** (ignoré silencieusement, jamais persisté) | ⬜ |
| Given l'absence créée, when le résumé de capacité est recalculé (US11.1.2), then les jours d'absence en recouvrement avec la période de l'événement sont déduits de la capacité nette du membre | ⬜ |

### Lecture / Suppression

| Critère | 🤖 Dev |
|---------|--------|
| Given un membre d'un événement accessible, when ses absences sont consultées (incluses dans `GET .../members`, US11.2.1), then elles apparaissent triées par `dateDebut` | ⬜ |
| Given une absence existante, when `DELETE .../events/{id}/absences/{absenceId}`, then 204 No Content | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given `dateDebut` postérieure à `dateFin`, when création, then 400 code `INVALID_DATE_RANGE` | ⬜ |
| Error : given une absence entièrement hors de la période de l'événement (`dateFin` < `startDate` événement ou `dateDebut` > `endDate` événement), when création, then 400 code `ABSENCE_OUTSIDE_EVENT` — une absence partiellement chevauchante est acceptée (seul le recouvrement compte dans le calcul, voir US11.1.2) | ⬜ |
| Error : given un `id` d'événement, de membre ou d'absence inexistant/autre tenant, when tout endpoint ci-dessus, then 404 | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : `tenantId`/`userId` résolus exclusivement depuis le `RequestPrincipal` | ⬜ |
| Security : given un appelant sans lien avec l'événement, when création/suppression d'absence, then 404 (jamais 403) | ⬜ |
| Security : **RGPD — aucun champ texte libre sur l'absence**, voir §Architecture — test unitaire/TI prouvant qu'un `motif` envoyé dans le body est silencieusement rejeté (pas d'erreur 400, simplement jamais persisté ni retourné) | ⬜ |
| Security : test TI obligatoire cross-tenant sur `POST/DELETE .../absences` | ⬜ |

## Hors périmètre

- **Import automatique depuis un SI RH/absence** (SAP, Workday, Lucca…) — `US11.7.1`, Sprint 21.
- **Jours fériés configurables au niveau tenant** — relève de `US11.6.1` (jours ouvrables vs
  ouvrés par localité, `EN22.3`), Sprint 21 ; ce lot ne déduit **que** les weekends (voir US11.1.2
  §Architecture), aucun jour férié.
- **Tout champ motif/catégorie/commentaire** — voir §Architecture, exclu par principe RGPD, pas
  seulement différé.

## Notes d'implémentation

- **Backend** : entité `CapacityAbsence` (`id`, `eventMemberId` FK `pi_cycle_team`-style
  `ON DELETE CASCADE` vers `capacity_event_member`, `dateDebut`, `dateFin` — **aucune autre
  colonne**, voir §Architecture) — même fichier de migration que `CapacityEvent`/
  `CapacityEventMember` ou suivant. `CapacityAbsenceService#create/delete`, validation de
  recouvrement avec la période de l'événement. Le DTO de requête (`CreateAbsenceRequest`) ne
  déclare **pas** de champ `motif`/`reason` — un tel champ envoyé par un client legacy/malveillant
  est ignoré par la désérialisation Jackson standard (propriété inconnue non mappée), jamais
  intercepté explicitement (rien à intercepter puisque le champ n'existe pas dans le contrat).
- **Frontend** : formulaire d'absence dans `capacity-event-detail` — deux champs date uniquement,
  aucun champ texte libre proposé à l'utilisateur (cohérent avec le contrat backend).

---
Item Type: US · Parent: F11.2 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: scrum-master
Dépendances: US11.2.1
