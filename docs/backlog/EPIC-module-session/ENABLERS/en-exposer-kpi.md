# EN19.4 — Exposer les KPI du domaine (producteur KpiRef)

**Type d'enabler** : intégration

**Objectif technique** : Rendre les KPI du domaine « Session live » **adressables et liables** par le système d'OKR (lien KR ↔ KPI interne, US27.8.3) et par tout futur consommateur, en exposant les KPI de cet EPIC via l'**endpoint KPI du module `collaboratif`** (`GET /api/collaboratif/kpi`) et l'événement `kpi.updated`, conformément au **contrat producteur de KPI EN28.14**. **Pas de FK inter-modules** (ADR-006) — références logiques (tenant + source + kpiKey + scope) uniquement.

**KPI exposés (domaine Session live)** :
- **Sessions animées** — nombre de sessions live créées et lancées sur la période (nombre ; granularité : tenant/équipe) ; kpiKey `session.sessions_run`
- **Participants par session** — nombre moyen de participants (compte + invités) par session (participants/session ; granularité : équipe) ; kpiKey `session.avg_participants`
- **Taux de participation** — part des participants ayant interagi avec au moins une activité (% ; granularité : équipe) ; kpiKey `session.participation_rate`
- **Activités jouées** — nombre d'activités (QUIZ/POLL/WORDCLOUD/…) exécutées sur la période (nombre ; granularité : tenant/équipe) ; kpiKey `session.activities_run`
- **Taux de complétion des sessions** — part des sessions menées jusqu'à la clôture et la diffusion des résultats (% ; granularité : équipe) ; kpiKey `session.completion_rate`

**Justification** : Exposer l'usage et la participation aux sessions live permet de lier des KR d'engagement et d'interactivité, et d'alimenter les tableaux de bord d'équipe sans collecte parallèle.

**Critères de complétion** :
- [x] Les KPI de cet EPIC sont déclarés et servis via l'endpoint KPI du module `collaboratif` (`GET /api/collaboratif/kpi`), chacun déclarant `unit`, `supportedScopes` et `refreshHint` — [`pivot-core#280`](https://github.com/PIVOT-PLATFORM/pivot-core/pull/280)
- [x] Résolution d'un `KpiRef` de ces KPI en pull (valeur + scope), par identifiant logique, sans FK inter-modules
- [~] Émission de `kpi.updated` à chaque recalcul significatif (`ModuleSessionService#start`/`#end`) — **ni signé ni idempotent** : EN28.4 (bus PIVOT, ADR-025) n'a lui-même aucune implémentation dans `pivot-core` à ce jour (vérifié avant d'implémenter cet enabler) ; l'événement voyage via `ApplicationEventPublisher` in-process, seul mécanisme cross-module existant du repo
- [x] Habilitations respectées : un KPI restreint n'est ni listé ni résolu pour un rôle non autorisé (403) ; isolation multi-tenant (404 cross-tenant) — mécanisme générique testé, aucun des 5 KPI de ce domaine n'est aujourd'hui restreint (agrégats équipe/tenant, aucune donnée nominative)
- [ ] Conforme au contrat socle EN28.14 — **non applicable en l'état** : EN28.14 lui-même n'a aucun code dans ce repo (aucune classe `Kpi*`/route `/kpi`/événement `kpi.updated` ailleurs que ce domaine, vérifié avant implémentation) ; cette PR reproduit la *forme* du schéma `KpiRef` documenté ci-dessous pour ce seul domaine, sans poser l'abstraction transverse réutilisable par les ~38 autres domaines producteurs — décision explicite (portée minimale plutôt que socle générique en side-effect d'un enabler de sprint), EN28.14 reste un enabler distinct et toujours ⬜ dans son propre EPIC (E28)

**Critères d'acceptation (Given/When/Then)** :
- [x] Given un appelant habilité, when il interroge `GET /api/collaboratif/kpi`, then il reçoit les KPI liables de ce domaine avec `unit`/`supportedScopes`/`refreshHint`, filtrés par ses droits.
- [x] Given un KPI exposé lié à un KR (US27.8.3), when sa valeur est recalculée, then un `kpi.updated` est publié (`ApplicationEventPublisher`, non signé — voir ci-dessus) et la résolution pull renvoie la même valeur (calcul à la demande, pas de cache).
- [x] Error case: given un `kpiKey` inconnu ou un `scope` hors `supportedScopes`, when il est résolu, then `404` (kpiKey inconnu) ou `400` (scope non supporté), sans fuite.
- [x] Security: given un KPI restreint et un rôle non habilité, when il liste ou résout, then le KPI est absent de la liste et la résolution retourne `403` ; référence cross-tenant → `404`.

**Statut** : 🔵 Implémenté (scope domaine Session live) — PR [`pivot-core#280`](https://github.com/PIVOT-PLATFORM/pivot-core/pull/280), en attente CI + recette mainteneur. EN28.14 (contrat transverse) reste ⬜, non requis pour ce périmètre réduit — voir note ci-dessus.

---
Item Type: Enabler · Parent: E19 · Module: collaboratif · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Profils: Tous
Justification: Producteur de KPI liables (contrat EN28.14) alimentant le lien KR ↔ KPI interne (US27.8.3)
Dépendances: EN28.14 (contrat producteur KPI) · EN28.4 (bus, push) · US27.8.3 (consommateur OKR)
