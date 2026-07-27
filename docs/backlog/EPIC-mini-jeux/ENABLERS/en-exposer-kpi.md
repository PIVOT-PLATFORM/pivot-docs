# EN47.1 — Exposer les KPI du domaine (producteur KpiRef)

**Type d'enabler** : intégration

**Objectif technique** : Rendre les KPI du domaine « Mini-jeux collaboratifs » **adressables et liables** par le système d'OKR (lien KR ↔ KPI interne, US27.8.3) et par tout futur consommateur, en exposant les KPI de cet EPIC via l'**endpoint KPI du module `collaboratif`** (`GET /api/collaboratif/kpi`) et l'événement `kpi.updated`, conformément au **contrat producteur de KPI EN28.14**. **Pas de FK inter-modules** (ADR-006) — références logiques (tenant + source + kpiKey + scope) uniquement.

**KPI exposés (domaine Mini-jeux collaboratifs)** :
- **Parties jouées** — nombre de parties de mini-jeux lancées sur la période ; kpiKey `minijeux.games_played` ; `unit` = `count` ; `supportedScopes` = `["tenant","team"]`
- **Taux de participation** — part des membres invités ayant rejoint une partie ; kpiKey `minijeux.participation_rate` ; `unit` = `percent` (0–100) ; `supportedScopes` = `["team"]`
- **Joueurs actifs** — nombre de participants distincts sur la période ; kpiKey `minijeux.active_players` ; `unit` = `count` ; `supportedScopes` = `["tenant","team"]`
- **Taux de complétion des parties** — part des parties menées jusqu'au score final ; kpiKey `minijeux.completion_rate` ; `unit` = `percent` (0–100) ; `supportedScopes` = `["team"]`
- **Engagement moyen** — nombre moyen d'interactions (coches, clics, réponses) par joueur et par partie ; kpiKey `minijeux.avg_engagement` ; `unit` = `interactions_per_player` ; `supportedScopes` = `["team"]`

Tous ces KPI portent `source` = `minijeux` et un `refreshHint` déclaré (durée ISO-8601, ex. `PT15M`) reflétant la cadence réelle de recalcul. La période d'observation est bornée par `refreshHint`.

**Justification** : Exposer la participation et l'engagement ludique permet de lier des KR d'animation d'équipe et de cohésion, et d'alimenter les tableaux de bord d'engagement sans instrumentation dédiée.

**Critères de complétion** :
- [ ] Les KPI de cet EPIC sont déclarés et servis via l'endpoint KPI du module `collaboratif` (`GET /api/collaboratif/kpi`, contrat EN28.14), chacun déclarant `unit`, `supportedScopes` et `refreshHint`
- [ ] Résolution d'un `KpiRef` de ces KPI en pull (valeur + scope) via `GET /api/collaboratif/kpi/{kpiKey}?scope=…`, par identifiant logique, sans FK inter-modules
- [ ] Émission de `kpi.updated` (signé, idempotent) sur le bus PIVOT (ADR-025, EN28.4) à chaque recalcul significatif
- [ ] Habilitations respectées : un KPI restreint n'est ni listé ni résolu pour un rôle non autorisé (403) ; isolation multi-tenant (404 cross-tenant)
- [ ] Conforme au contrat socle EN28.14 (schéma `KpiRef`, versionnement, signature d'événement)

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un appelant habilité, when il interroge `GET /api/collaboratif/kpi`, then il reçoit la liste des `KpiRef` liables de ce domaine — chacun portant `source`, `kpiKey`, `unit`, `supportedScopes` et `refreshHint` (schéma EN28.14) — filtrée par ses droits.
- [ ] Given un KPI exposé lié à un KR (US27.8.3), when sa valeur est recalculée, then un événement de type `collaboratif.kpi.updated` (signé, idempotent) est publié sur le bus (ADR-025, EN28.4) et un pull sur `GET /api/collaboratif/kpi/{kpiKey}?scope=…` renvoie la même `value` pour le même `scope`.
- [ ] Error case: given une résolution `GET /api/collaboratif/kpi/{kpiKey}?scope=…` avec un `kpiKey` inconnu ou un `scope` hors des `supportedScopes` du KPI, then `404` (kpiKey inconnu) ou `400` (scope non supporté), sans fuite d'existence.
- [ ] Security: given un KPI restreint (visibilité héritée du KPI source) et un rôle non habilité, when il appelle `GET /api/collaboratif/kpi` ou `GET /api/collaboratif/kpi/{kpiKey}?scope=…`, then le KPI est absent de la liste et la résolution retourne `403` ; une résolution ciblant un `tenantId` autre que celui de l'appelant retourne `404` (isolation multi-tenant, jamais de fuite d'existence).

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E47 · Module: collaboratif · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Profils: Tous
Justification: Producteur de KPI liables (contrat EN28.14) alimentant le lien KR ↔ KPI interne (US27.8.3)
Dépendances: EN28.14 (contrat producteur KPI) · EN28.4 (bus, push) · US27.8.3 (consommateur OKR)
