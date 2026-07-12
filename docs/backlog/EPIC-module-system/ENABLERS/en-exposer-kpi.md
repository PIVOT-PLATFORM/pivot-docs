# EN03.5 — Exposer les KPI du domaine (producteur KpiRef)

**Type d'enabler** : intégration

**Objectif technique** : Rendre les KPI du domaine « Système de modules » **adressables et liables** par le système d'OKR (lien KR ↔ KPI interne, US27.8.3) et par tout futur consommateur, en exposant les KPI de cet EPIC via l'**endpoint KPI du module `core`** (`GET /api/core/kpi`) et l'événement `kpi.updated`, conformément au **contrat producteur de KPI EN28.14**. **Pas de FK inter-modules** (ADR-006) — références logiques (tenant + source + kpiKey + scope) uniquement.

**KPI exposés (domaine Système de modules)** :
- **Modules actifs** — nombre de modules activés et opérationnels par tenant (nombre ; granularité : tenant) ; kpiKey `modules.active_modules`
- **Taux d'activation de module** — part des modules disponibles effectivement activés (% ; granularité : tenant) ; kpiKey `modules.activation_rate`
- **Taux d'usage des modules activés** — part des modules activés réellement utilisés sur la période (% ; granularité : tenant) ; kpiKey `modules.usage_rate`
- **Latence de résolution du statut module** — temps de réponse du registre/cache Redis de statut (ms ; granularité : tenant) ; kpiKey `modules.status_resolution_latency`
- **Changements de configuration** — nombre d'activations/désactivations de modules sur la période (nombre ; granularité : tenant) ; kpiKey `modules.config_changes`

**Justification** : Exposer l'adoption et l'usage des modules permet de lier des KR de déploiement fonctionnel (activation, usage réel) et d'alimenter les tableaux de bord d'adoption plateforme sans collecte dédiée.

**Critères de complétion** :
- [ ] Les KPI de cet EPIC sont déclarés et servis via l'endpoint KPI du module `core` (`GET /api/core/kpi`, contrat EN28.14), chacun déclarant `unit`, `supportedScopes` et `refreshHint`
- [ ] Résolution d'un `KpiRef` de ces KPI en pull (valeur + scope), par identifiant logique, sans FK inter-modules
- [ ] Émission de `kpi.updated` (signé, idempotent) sur le bus PIVOT (ADR-025, EN28.4) à chaque recalcul significatif
- [ ] Habilitations respectées : un KPI restreint n'est ni listé ni résolu pour un rôle non autorisé (403) ; isolation multi-tenant (404 cross-tenant)
- [ ] Conforme au contrat socle EN28.14 (schéma `KpiRef`, versionnement, signature d'événement)

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un appelant habilité, when il interroge `GET /api/core/kpi`, then il reçoit les KPI liables de ce domaine avec `unit`/`supportedScopes`/`refreshHint`, filtrés par ses droits.
- [ ] Given un KPI exposé lié à un KR (US27.8.3), when sa valeur est recalculée, then un `kpi.updated` est publié sur le bus (ADR-025) et la résolution pull renvoie la même valeur.
- [ ] Error case: given un `kpiKey` inconnu ou un `scope` hors `supportedScopes`, when il est résolu, then `404` (kpiKey inconnu) ou `400` (scope non supporté), sans fuite.
- [ ] Security: given un KPI restreint et un rôle non habilité, when il liste ou résout, then le KPI est absent de la liste et la résolution retourne `403` ; référence cross-tenant → `404`.

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E03 · Module: core · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Profils: Tous
Justification: Producteur de KPI liables (contrat EN28.14) alimentant le lien KR ↔ KPI interne (US27.8.3)
Dépendances: EN28.14 (contrat producteur KPI) · EN28.4 (bus, push) · US27.8.3 (consommateur OKR)
