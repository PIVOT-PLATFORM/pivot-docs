# EN02.6 — Exposer les KPI du domaine (producteur KpiRef)

**Type d'enabler** : intégration

**Objectif technique** : Rendre les KPI du domaine « Espace compte » **adressables et liables** par le système d'OKR (lien KR ↔ KPI interne, US27.8.3) et par tout futur consommateur, en exposant les KPI de cet EPIC via l'**endpoint KPI du module `auth`** (`GET /api/auth/kpi`) et l'événement `kpi.updated`, conformément au **contrat producteur de KPI EN28.14**. **Pas de FK inter-modules** (ADR-006) — références logiques (tenant + source + kpiKey + scope) uniquement.

**KPI exposés (domaine Espace compte)** :

- **Complétude du profil** — part des comptes au profil complet (% ; granularité : tenant) ; kpiKey `compte.profile_completion`
- **Comptes actifs** — nombre de comptes actifs sur la période (nombre ; granularité : tenant) ; kpiKey `compte.active_accounts`
- **Demandes d'export RGPD** — nombre d'exports de données personnelles demandés (nombre ; granularité : tenant) ; kpiKey `compte.rgpd_export_requests`
- **Suppressions de compte** — nombre de suppressions de compte RGPD (nombre ; granularité : tenant) ; kpiKey `compte.account_deletions`
- **Rotation des mots de passe** — part des comptes ayant renouvelé leur mot de passe récemment (% ; granularité : tenant) ; kpiKey `compte.password_rotation`

**Justification** : Exposer l'état des comptes (complétude, activité, exercice des droits RGPD) comme KPI liables permet de rattacher des KR d'hygiène de compte et de conformité à des mesures réelles, et d'alimenter les tableaux de bord d'administration.

**Critères de complétion** :

- [ ] Les KPI de cet EPIC sont déclarés et servis via l'endpoint KPI du module `auth` (`GET /api/auth/kpi`, contrat EN28.14), chacun déclarant `unit`, `supportedScopes` et `refreshHint`
- [ ] Résolution d'un `KpiRef` de ces KPI en pull (valeur + scope), par identifiant logique, sans FK inter-modules
- [ ] Émission de `kpi.updated` (signé, idempotent) sur le bus PIVOT (ADR-025, EN28.4) à chaque recalcul significatif
- [ ] Habilitations respectées : un KPI restreint n'est ni listé ni résolu pour un rôle non autorisé (403) ; isolation multi-tenant (404 cross-tenant)
- [ ] Conforme au contrat socle EN28.14 (schéma `KpiRef`, versionnement, signature d'événement)

**Critères d'acceptation (Given/When/Then)** :

- [ ] Given un appelant habilité, when il interroge `GET /api/auth/kpi`, then il reçoit les KPI liables de ce domaine avec `unit`/`supportedScopes`/`refreshHint`, filtrés par ses droits.
- [ ] Given un KPI exposé lié à un KR (US27.8.3), when sa valeur est recalculée, then un `kpi.updated` est publié sur le bus (ADR-025) et la résolution pull renvoie la même valeur.
- [ ] Error case: given un `kpiKey` inconnu ou un `scope` hors `supportedScopes`, when il est résolu, then `404` (kpiKey inconnu) ou `400` (scope non supporté), sans fuite.
- [ ] Security: given un KPI restreint et un rôle non habilité, when il liste ou résout, then le KPI est absent de la liste et la résolution retourne `403` ; référence cross-tenant → `404`.

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E02 · Module: auth · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Profils: Tous
Justification: Producteur de KPI liables (contrat EN28.14) alimentant le lien KR ↔ KPI interne (US27.8.3)
Dépendances: EN28.14 (contrat producteur KPI) · EN28.4 (bus, push) · US27.8.3 (consommateur OKR)
