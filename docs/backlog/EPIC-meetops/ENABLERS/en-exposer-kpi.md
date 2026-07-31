# EN12.3 — Exposer les KPI du domaine (producteur KpiRef)

**Type d'enabler** : intégration

**Objectif technique** : Rendre les KPI du domaine « MeetOps » **adressables et liables** par le système d'OKR (lien KR ↔ KPI interne, US27.8.3) et par tout futur consommateur, en exposant les KPI de cet EPIC via l'**endpoint KPI du module `collaboratif`** (`GET /api/collaboratif/kpi`) et l'événement `kpi.updated`, conformément au **contrat producteur de KPI EN28.14**. **Pas de FK inter-modules** (ADR-006) — références logiques (tenant + source + kpiKey + scope) uniquement.

**KPI exposés (domaine MeetOps)** — chaque KPI déclare `kpiKey`, `unit`, `supportedScopes` et `refreshHint` ; les taux sont des pourcentages bornés `0`–`100` :

- **Réunions outillées** — nombre de réunions préparées et animées via MeetOps sur la période (granularité : tenant/équipe) ; kpiKey `meetops.meetings_run` ; unit `count` ; supportedScopes `tenant`, `team`
- **Taux de participation** — part des invités effectivement présents en réunion (granularité : équipe) ; kpiKey `meetops.participation_rate` ; unit `percentage` ; supportedScopes `team`
- **Actions issues de réunion clôturées** — part des actions décidées en réunion menées à terme (granularité : équipe/projet) ; kpiKey `meetops.action_completion_rate` ; unit `percentage` ; supportedScopes `team`, `project`
- **Respect de l'agenda** — part des points d'agenda traités dans le temps imparti (granularité : équipe) ; kpiKey `meetops.agenda_adherence` ; unit `percentage` ; supportedScopes `team`
- **Comptes-rendus partagés** — part des réunions dont le compte-rendu a été diffusé (granularité : équipe) ; kpiKey `meetops.minutes_shared_rate` ; unit `percentage` ; supportedScopes `team`

Le `scope` de résolution est passé en paramètre de requête sous la forme `<niveau>:<uuid>` (ex. `team:{teamId}`, `project:{projectId}`) ; en son absence, la résolution porte sur le scope `tenant`. `refreshHint` reflète la cadence de recalcul (post-réunion, borne la fraîcheur du pull) — valeur par défaut `PT1H`.

**Justification** : Exposer la participation et le suivi des actions de réunion permet de lier des KR d'efficacité collective (assiduité, décisions tenues) et d'alimenter les tableaux de bord d'équipe sans ressaisie.

**Critères de complétion** :
- [ ] Les KPI de cet EPIC sont déclarés et servis via l'endpoint KPI du module `collaboratif` (`GET /api/collaboratif/kpi`, contrat EN28.14), chacun déclarant `unit`, `supportedScopes` et `refreshHint`
- [ ] Résolution d'un `KpiRef` de ces KPI en pull via `GET /api/collaboratif/kpi/{kpiKey}?scope=…` (valeur + scope), par identifiant logique, sans FK inter-modules
- [ ] Émission de `kpi.updated` (signé, idempotent) sur le bus PIVOT (ADR-025, EN28.4) à chaque recalcul modifiant la `value` ou l'`observedAt` d'un KPI exposé
- [ ] Habilitations respectées : un KPI restreint n'est ni listé ni résolu pour un rôle non autorisé (403) ; isolation multi-tenant (404 cross-tenant)
- [ ] Conforme au contrat socle EN28.14 (schéma `KpiRef`, versionnement, signature d'événement)

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un appelant habilité, when il interroge `GET /api/collaboratif/kpi`, then il reçoit la liste des KPI liables du domaine MeetOps sous forme de descripteurs (`kpiKey`, `unit`, `supportedScopes`, `refreshHint`, sans `value`), filtrée par ses droits.
- [ ] Given un appelant habilité et un `kpiKey` exposé, when il résout `GET /api/collaboratif/kpi/{kpiKey}?scope=<niveau>:<uuid>` avec un `scope` appartenant aux `supportedScopes` du KPI, then il reçoit un `KpiRef` unique portant `source=collaboratif`, `kpiKey`, `tenantId`, `scope`, `value`, `unit` et `observedAt` pour le scope demandé.
- [ ] Given un KPI exposé lié à un KR (US27.8.3), when sa `value` est recalculée (nouvelle `value` ou nouveau `observedAt`), then un `kpi.updated` signé et idempotent est publié sur le bus PIVOT (ADR-025) — payload `source`, `kpiKey`, `tenantId`, `scope`, `value`, `observedAt`, sans copie de données métier — et une résolution pull immédiate renvoie la même `value`.
- [ ] Error case: given un `kpiKey` inconnu ou un `scope` hors `supportedScopes`, when il est résolu, then `404` (kpiKey inconnu) ou `400` (scope non supporté), sans fuite d'existence.
- [ ] Security: given un KPI restreint et un rôle non habilité, when il liste ou résout, then le KPI est absent de la liste et la résolution retourne `403` (indiscernable d'un KPI inexistant) ; une référence cross-tenant retourne `404`.

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E12 · Module: collaboratif · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Profils: Tous
Justification: Producteur de KPI liables (contrat EN28.14) alimentant le lien KR ↔ KPI interne (US27.8.3)
Dépendances: EN28.14 (contrat producteur KPI) · EN28.4 (bus, push) · US27.8.3 (consommateur OKR)
