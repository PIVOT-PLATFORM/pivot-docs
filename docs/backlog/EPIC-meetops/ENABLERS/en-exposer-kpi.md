# EN12.3 — Exposer les KPI du domaine (producteur KpiRef)

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
- [x] Les KPI de cet EPIC sont déclarés et servis via l'endpoint KPI du module `collaboratif` (`GET /api/collaboratif/kpi`, contrat EN28.14), chacun déclarant `unit`, `supportedScopes` et `refreshHint`
- [x] Résolution d'un `KpiRef` de ces KPI en pull (valeur + scope), par identifiant logique, sans FK inter-modules
- [x] Émission de `kpi.updated` (signé, idempotent) sur le bus PIVOT (ADR-025, EN28.4) à chaque recalcul significatif — voir note sous le tableau (2 des 3 déclencheurs de l'énoncé câblés, le 3e n'a pas encore de point d'accroche code)
- [x] Habilitations respectées : un KPI restreint n'est ni listé ni résolu pour un rôle non autorisé (403) ; isolation multi-tenant (404 cross-tenant)
- [x] Conforme au contrat socle EN28.14 (schéma `KpiRef`, versionnement, signature d'événement) — réutilise le même schéma `KpiRef`/`KpiDefinitionResponse` qu'EN19.4, pas de duplication

**Critères d'acceptation (Given/When/Then, finalisés Gate 1)** :

| Critère | 🤖 Dev |
|---------|--------|
| AC-EN12.3-01 (List) — `GET /api/collaboratif/kpi` renvoie les 5 KPI MeetOps (`source`/`kpiKey`/`unit`/`supportedScopes`/`refreshHint`/`visibility`), filtrés selon les droits de l'appelant | ✅ |
| AC-EN12.3-02 (Pull tenant) — `GET .../kpi/meetops.meetings_run?scope=tenant` renvoie un `KpiRef` recalculé à la volée, `tenantId` dérivé du token, `scope` vide | ✅ |
| AC-EN12.3-03 (Pull team) — `GET .../kpi/{kpiKey}?scope=team&teamId={id}` sur un KPI d'équipe renvoie un `KpiRef` avec `scope={teamId}` et la valeur agrégée de cette équipe | ✅ |
| AC-EN12.3-04 (Event + cohérence pull) — recalcul suite à réunion clôturée/CR partagé/action clôturée → `MeetopsKpiUpdatedEvent` publié, pull immédiat cohérent | ⚠️ Partiel — voir note |
| Error case — `kpiKey` inconnu → 404 anti-énumération · `scope` non supporté → 400 `UNSUPPORTED_KPI_SCOPE` · `scope=team` sans `teamId` → 400 · `teamId` inconnu/autre tenant → 404 | ✅ |
| Security — KPI restreint absent de la liste + 403 `KPI_ACCESS_DENIED` pour un rôle non habilité · référence cross-tenant → 404 · `tenantId` toujours dérivé du principal | ✅ |
| A11y (contrat de données producteur) — sens du KPI intégralement porté par `kpiKey`/`unit` (texte), jamais par une seule couleur/icône/position | ✅ |

**Note d'implémentation (Gate 2, EN12.3)** — deux écarts documentés découverts en confrontant l'énoncé au schéma réel de la branche parente (US12.1.1–US12.3.1), consignés en Javadoc (`MeetopsKpiDefinition`, `MeetopsKpiRepository#aggregate`) :
- **`meetops.participation_rate`** — le schéma MeetOps n'a **aucune** table d'invitation/présence (`meeting_participants` n'existe pas ; `fr.pivot.collaboratif.meeting.report.MeetingReportDto.ParticipantReportDto` documente déjà ce même trou pour le compte-rendu, résolu comme "organisateur + membres de l'équipe", donc vaudrait trivialement 100 % en KPI). Le KPI livré mesure à la place la part des membres de l'équipe **traçablement engagés** (auteur d'au moins une action ou décision) dans les réunions clôturées de l'équipe — un signal réel et variable, mais différent de « présents/invités » au sens littéral de l'énoncé.
- **`meetops.action_completion_rate`** — `meeting_actions.status` n'est jamais mis à autre chose que `OPEN` par aucun code existant (fermeture d'action hors périmètre jusqu'à une US12.3.2 future) ; la requête d'agrégation est correcte et déjà prête (`status <> 'OPEN'`), mais vaut `0` sur toute donnée réelle aujourd'hui — reflet exact de l'absence de cette capacité, pas un défaut du producteur.
- Ces deux écarts, plus le 3ᵉ déclencheur non câblable d'AC-EN12.3-04 ("action de réunion clôturée" — même raison, aucune mutation à laquelle accrocher l'event), sont proposés à validation Gate 3/4 humaine plutôt qu'auto-certifiés.

**Statut** : 🔄 En cours (PR draft ouverte, Gate 2 — voir pivot-core)

---
Item Type: Enabler · Parent: E12 · Module: collaboratif · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Profils: Tous
Justification: Producteur de KPI liables (contrat EN28.14) alimentant le lien KR ↔ KPI interne (US27.8.3)
Dépendances: EN28.14 (contrat producteur KPI) · EN28.4 (bus, push) · US27.8.3 (consommateur OKR)
