# EN43.14 — Exposer les KPI du domaine (producteur KpiRef)

**Type d'enabler** : intégration

**Objectif technique** : Rendre les KPI du domaine « Sécurité & Zero Trust » **adressables et liables** par le système d'OKR (lien KR ↔ KPI interne, US27.8.3) et par tout futur consommateur, en exposant les KPI de cet EPIC via l'**endpoint KPI du module `securite`** (`GET /api/securite/kpi`) et l'événement `kpi.updated`, conformément au **contrat producteur de KPI EN28.14**. **Pas de FK inter-modules** (ADR-006) — références logiques (tenant + source + kpiKey + scope) uniquement.

**KPI exposés (domaine Sécurité & Zero Trust)** :

- **Incidents de sécurité ouverts** — incidents détectés non encore résolus (nombre ; granularité : tenant/équipe) ; kpiKey `securite.incidents_ouverts` — restreint (visibility RSSI)
- **Vulnérabilités critiques ouvertes** — CVE critiques/hautes non corrigées (nombre ; granularité : tenant/équipe) ; kpiKey `securite.vulnerabilites_critiques_ouvertes` — restreint (visibility RSSI)
- **Couverture MFA** — part des comptes actifs avec MFA activé (% ; granularité : tenant/équipe) ; kpiKey `securite.couverture_mfa`
- **Conformité Zero Trust** — score de conformité des politiques Zero Trust appliquées (score 0–100 ; granularité : tenant) ; kpiKey `securite.conformite_zero_trust` — restreint (visibility RSSI)
- **Temps moyen de remédiation (MTTR)** — délai moyen de correction d'une vulnérabilité (heures ; granularité : tenant/équipe) ; kpiKey `securite.mttr_remediation`
- **Modules en attente d'admission** — modules ne satisfaisant pas encore la checklist EN43.13 (nombre ; granularité : tenant) ; kpiKey `securite.modules_admission_en_attente`

**Justification** : Exposer la posture de sécurité comme KPI liables permet de rattacher des KR de réduction du risque (incidents, vulnérabilités, MTTR, couverture MFA) et d'alimenter les tableaux de bord de gouvernance. La plupart de ces KPI sont restreints à la visibilité RSSI et ne doivent être ni listés ni résolus hors habilitation.

**Critères de complétion** :
- [ ] Les KPI de cet EPIC sont déclarés et servis via l'endpoint KPI du module `securite` (`GET /api/securite/kpi`, contrat EN28.14), chacun déclarant `unit`, `supportedScopes` et `refreshHint`
- [ ] Résolution d'un `KpiRef` de ces KPI en pull (valeur + scope), par identifiant logique, sans FK inter-modules
- [ ] Émission de `kpi.updated` (signé, idempotent) sur le bus PIVOT (ADR-025, EN28.4) à chaque recalcul significatif
- [ ] Habilitations respectées : un KPI restreint n'est ni listé ni résolu pour un rôle non autorisé (403) ; isolation multi-tenant (404 cross-tenant)
- [ ] Conforme au contrat socle EN28.14 (schéma `KpiRef`, versionnement, signature d'événement)

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un appelant habilité, when il interroge `GET /api/securite/kpi`, then il reçoit les KPI liables de ce domaine avec `unit`/`supportedScopes`/`refreshHint`, filtrés par ses droits.
- [ ] Given un KPI exposé lié à un KR (US27.8.3), when sa valeur est recalculée, then un `kpi.updated` est publié sur le bus (ADR-025) et la résolution pull renvoie la même valeur.
- [ ] Error case: given un `kpiKey` inconnu ou un `scope` hors `supportedScopes`, when il est résolu, then `404` (kpiKey inconnu) ou `400` (scope non supporté), sans fuite.
- [ ] Security: given un KPI restreint et un rôle non habilité, when il liste ou résout, then le KPI est absent de la liste et la résolution retourne `403` ; référence cross-tenant → `404`.

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Module: securite · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Profils: Tous
Justification: Producteur de KPI liables (contrat EN28.14) alimentant le lien KR ↔ KPI interne (US27.8.3)
Dépendances: EN28.14 (contrat producteur KPI) · EN28.4 (bus, push) · US27.8.3 (consommateur OKR)
