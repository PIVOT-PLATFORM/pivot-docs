# EN20.3 — Exposer les KPI du domaine (producteur KpiRef)

**Type d'enabler** : intégration

**Objectif technique** : Rendre les KPI du domaine « Rétrospective » **adressables et liables** par le système d'OKR (lien KR ↔ KPI interne, US27.8.3) et par tout futur consommateur, en exposant les KPI de cet EPIC via l'**endpoint KPI du module `agilite`** (`GET /api/agilite/kpi`) et l'événement `kpi.updated`, conformément au **contrat producteur de KPI EN28.14**. **Pas de FK inter-modules** (ADR-006) — références logiques (tenant + source + kpiKey + scope) uniquement.

**KPI exposés (domaine Rétrospective)** :
- **Actions clôturées** — nombre d'actions issues de rétrospective menées à terme (nombre ; granularité : équipe) ; kpiKey `retrospective.actions-cloturees`
- **Taux de clôture des actions** — part des actions de rétro clôturées vs créées (% ; granularité : équipe) ; kpiKey `retrospective.taux-cloture-actions`
- **Taux de participation** — part des membres ayant contribué à la rétrospective (% ; granularité : équipe) ; kpiKey `retrospective.taux-participation`
- **Rétrospectives tenues** — nombre de sessions de rétrospective clôturées sur la période (nombre ; granularité : équipe) ; kpiKey `retrospective.retros-tenues`

**Justification** : Les mesures d'assiduité et de clôture des actions matérialisent la dynamique d'amélioration continue d'une équipe ; les exposer permet de les rattacher à des KR d'engagement et de les afficher dans les cockpits.

**Critères de complétion** :
- [ ] Les KPI de cet EPIC sont déclarés et servis via l'endpoint KPI du module `agilite` (`GET /api/agilite/kpi`, contrat EN28.14), chacun déclarant `unit`, `supportedScopes` et `refreshHint`
- [ ] Résolution d'un `KpiRef` de ces KPI en pull (valeur + scope), par identifiant logique, sans FK inter-modules
- [ ] Émission de `kpi.updated` (signé, idempotent) sur le bus PIVOT (ADR-025, EN28.4) à chaque recalcul significatif
- [ ] Habilitations respectées : un KPI restreint n'est ni listé ni résolu pour un rôle non autorisé (403) ; isolation multi-tenant (404 cross-tenant)
- [ ] Conforme au contrat socle EN28.14 (schéma `KpiRef`, versionnement, signature d'événement)

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un appelant habilité, when il interroge `GET /api/agilite/kpi`, then il reçoit les KPI liables de ce domaine avec `unit`/`supportedScopes`/`refreshHint`, filtrés par ses droits.
- [ ] Given un KPI exposé lié à un KR (US27.8.3), when sa valeur est recalculée, then un `kpi.updated` est publié sur le bus (ADR-025) et la résolution pull renvoie la même valeur.
- [ ] Error case: given un `kpiKey` inconnu ou un `scope` hors `supportedScopes`, when il est résolu, then `404` (kpiKey inconnu) ou `400` (scope non supporté), sans fuite.
- [ ] Security: given un KPI restreint et un rôle non habilité, when il liste ou résout, then le KPI est absent de la liste et la résolution retourne `403` ; référence cross-tenant → `404`.

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E20 · Module: agilite · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Profils: Tous
Justification: Producteur de KPI liables (contrat EN28.14) alimentant le lien KR ↔ KPI interne (US27.8.3)
Dépendances: EN28.14 (contrat producteur KPI) · EN28.4 (bus, push) · US27.8.3 (consommateur OKR)
