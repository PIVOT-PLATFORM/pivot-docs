# EN12.3 — Exposer les KPI du domaine (producteur KpiRef)

> Gate 1 validé (PO Agent) — Sprint 23.

**Type d'enabler** : intégration

**Objectif technique** : Rendre les KPI du domaine « MeetOps » **adressables et liables** par le système d'OKR (lien KR ↔ KPI interne, US27.8.3) et par tout futur consommateur, en exposant les KPI de cet EPIC via l'**endpoint KPI du module `collaboratif`** (`GET /api/collaboratif/kpi`) et l'événement `kpi.updated`, conformément au **contrat producteur de KPI EN28.14**. **Pas de FK inter-modules** (ADR-006) — références logiques (tenant + source + kpiKey + scope) uniquement.

**KPI exposés (domaine MeetOps)** :
- **Réunions outillées** — nombre de réunions préparées et animées via MeetOps sur la période (nombre ; granularité : tenant/équipe) ; kpiKey `meetops.meetings_run`
- **Taux de participation** — part des invités effectivement présents en réunion (% ; granularité : équipe) ; kpiKey `meetops.participation_rate`
- **Actions issues de réunion clôturées** — part des actions décidées en réunion menées à terme (% ; granularité : équipe/projet) ; kpiKey `meetops.action_completion_rate`
- **Respect de l'agenda** — part des points d'agenda traités dans le temps imparti (% ; granularité : équipe) ; kpiKey `meetops.agenda_adherence`
- **Comptes-rendus partagés** — part des réunions dont le compte-rendu a été diffusé (% ; granularité : équipe) ; kpiKey `meetops.minutes_shared_rate`

**Justification** : Exposer la participation et le suivi des actions de réunion permet de lier des KR d'efficacité collective (assiduité, décisions tenues) et d'alimenter les tableaux de bord d'équipe sans ressaisie.

**Critères de complétion** :
- [ ] Les KPI de cet EPIC sont déclarés et servis via l'endpoint KPI du module `collaboratif` (`GET /api/collaboratif/kpi`, contrat EN28.14), chacun déclarant `unit`, `supportedScopes` et `refreshHint`
- [ ] Résolution d'un `KpiRef` de ces KPI en pull (valeur + scope), par identifiant logique, sans FK inter-modules
- [ ] Émission de `kpi.updated` (signé, idempotent) sur le bus PIVOT (ADR-025, EN28.4) à chaque recalcul significatif
- [ ] Habilitations respectées : un KPI restreint n'est ni listé ni résolu pour un rôle non autorisé (403) ; isolation multi-tenant (404 cross-tenant)
- [ ] Conforme au contrat socle EN28.14 (schéma `KpiRef`, versionnement, signature d'événement)

**Critères d'acceptation (Given/When/Then)** :

- [ ] AC-EN12.3-01 (List) : Given un appelant authentifié et habilité (`ROLE_ADMIN` ou `ROLE_USER`) d'un tenant, when il appelle `GET /api/collaboratif/kpi`, then la réponse contient les 5 KPI MeetOps (`meetops.meetings_run`, `meetops.participation_rate`, `meetops.action_completion_rate`, `meetops.agenda_adherence`, `meetops.minutes_shared_rate`) — chacun avec `source=collaboratif`, `kpiKey`, `unit`, `supportedScopes`, `refreshHint`, `visibility` — filtrés selon ses droits (un KPI dont le rôle n'est pas dans `visibility` est absent de la liste).
- [ ] AC-EN12.3-02 (Pull tenant) : Given un appelant habilité, when il appelle `GET /api/collaboratif/kpi/{kpiKey}?scope=tenant` sur un KPI supportant `tenant` (`meetops.meetings_run`), then il reçoit un `KpiRef` (`value` recalculée à la volée, `tenantId` dérivé du token, `scope` vide, `unit`, `observedAt`), valeur = agrégat MeetOps all-time du tenant (pas de filtre de période — le schéma `KpiRef`/EN28.14 ne porte pas de date-range, même simplification qu'EN19.4).
- [ ] AC-EN12.3-03 (Pull team) : Given un appelant habilité et un `teamId` de son propre tenant, when il appelle `GET /api/collaboratif/kpi/{kpiKey}?scope=team&teamId={id}` sur un KPI supportant `team` (`meetops.participation_rate`, `meetops.action_completion_rate`, `meetops.agenda_adherence`, `meetops.minutes_shared_rate`), then il reçoit un `KpiRef` avec `scope` = `{teamId: id}` et la valeur agrégée pour cette équipe.
- [ ] AC-EN12.3-04 (Event + cohérence pull) : Given un KPI MeetOps liable à un KR (US27.8.3), when sa valeur est recalculée suite à une mutation de réunion significative (réunion clôturée, compte-rendu partagé, action de réunion clôturée), then un `kpi.updated` (`MeetopsKpiUpdatedEvent{tenantId, teamId, kpiKey, occurredAt}`) est publié sur le bus PIVOT (ADR-025 / EN28.4), et une résolution pull immédiate du même KPI renvoie la valeur recalculée (modèle pull sans cache : recalcul à chaque `GET`, donc l'invariant « pull renvoie la même valeur » tient trivialement).
- [ ] Error case : Given un `kpiKey` inconnu, when il est résolu, then `404` sans divulgation (anti-énumération). Given un `scope` hors des `supportedScopes` du KPI, when il est résolu, then `400` avec `code=UNSUPPORTED_KPI_SCOPE`. Given `scope=team` sans `teamId`, when il est résolu, then `400`. Given `scope=team` avec un `teamId` inexistant ou appartenant à un autre tenant, when il est résolu, then `404` (indiscernable d'une équipe inconnue).
- [ ] Security : Given un KPI restreint et un rôle non habilité, when l'appelant liste, then le KPI est absent de la réponse ; when il le résout, then `403` avec `code=KPI_ACCESS_DENIED`. Given une référence cross-tenant (`teamId` d'un autre tenant), when elle est résolue, then `404`. Le `tenantId` porté par le `KpiRef` est **toujours** dérivé du `CollaboratifRequestPrincipal` du token porteur — jamais d'un body, query param ou header (isolation multi-tenant ; ADR-006 : pas de FK inter-modules, référence logique tenant+source+kpiKey+scope uniquement).
- [ ] A11y (contrat de données producteur — pas d'UI rendue dans cet enabler) : Given un consommateur (dashboard OKR US27.8.3, ou tout futur rendu) qui affiche un KPI MeetOps, when il lit sa définition/résolution, then le sens du KPI est intégralement porté par des champs texte lisibles par une technologie d'assistance — `kpiKey` (identifiant stable) + `unit` (`count` / `%`) — et jamais uniquement par une couleur, une icône ou une position ; le producteur n'émet aucune donnée dont l'interprétation dépendrait d'un rendu visuel. *(La validation A11y d'une interface humaine — ex. validation d'un créneau par l'organisateur — relève de US12.4.1 / EN12.2, hors périmètre de ce producteur headless.)*

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E12 · Module: collaboratif · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Profils: Tous
Justification: Producteur de KPI liables (contrat EN28.14) alimentant le lien KR ↔ KPI interne (US27.8.3)
Dépendances: EN28.14 (contrat producteur KPI) · EN28.4 (bus, push) · US27.8.3 (consommateur OKR)
