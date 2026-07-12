# EN28.14 — Contrat producteur de KPI (endpoint KPI unifié + `kpi.updated`)

**Type d'enabler** : intégration

**Objectif technique** : Définir **le contrat transverse** par lequel n'importe quel domaine PIVOT
expose ses **KPI comme adressables et liables**, afin qu'ils puissent alimenter le système d'OKR
(lien KR ↔ KPI interne, US27.8.3) et tout futur consommateur (dashboards, workflows E29, risques
E21) **sans couplage fort**. Pendant « métier » d'EN28.6 (endpoint santé unifié) : là où EN28.6
normalise la **santé**, EN28.14 normalise les **KPI**.

Chaque domaine producteur implémente ce contrat via un enabler propre (`en-exposer-kpi.md` de son
EPIC) ; EN28.14 ne porte que **le schéma, l'endpoint et l'événement communs**, versionnés en un seul
lieu pour éviter toute dérive.

**Le contrat** — trois surfaces normalisées, **par identifiant logique, sans FK inter-modules**
(ADR-006) :

```text
KpiRef {
  source          : domaine émetteur (ex. "portefeuille", "innovation", …)
  kpiKey          : identifiant stable du KPI (ex. "portfolio.avancement_moyen")
  tenantId        : uuid
  scope?          : { teamId?, projectId?, … }        // filtre logique optionnel
  supportedScopes : ["tenant","team","project", …]     // granularités offertes par ce KPI
  refreshHint     : durée                              // fréquence réelle de recalcul (borne le pull)
  unit            : string
  value           : number
  observedAt      : timestamp
  visibility      : rôles habilités (repris du KPI source)
}
```

- **Liste** : `GET /api/{domaine}/kpi` — énumère les KPI liables du domaine, **filtrée par
  habilitation** de l'appelant (un KPI restreint n'apparaît pas). Alimente le sélecteur par module
  côté OKR (US27.8.3).
- **Pull** : `GET /api/{domaine}/kpi/{kpiKey}?scope=…` — résout la valeur courante par identifiant
  logique.
- **Push** : émission de `kpi.updated` sur le **bus PIVOT** (ADR-025, impl. EN28.4), **signé et
  idempotent**, à chaque recalcul significatif d'un KPI exposé.

**Justification** : Sans contrat commun, chaque domaine réinventerait sa façon d'exposer ses
mesures et l'OKR devrait coder un connecteur par module — exactement le couplage qu'ADR-006/008
proscrit. Centraliser le schéma `KpiRef`, l'endpoint et l'événement en un enabler socle garantit que
les ~38 producteurs restent interchangeables et que le consommateur (US27.8.3) ne dépend d'aucun
module en particulier.

**Critères de complétion** :
- [ ] Schéma `KpiRef` normalisé, **versionné**, publié comme contrat de plateforme (cohérent avec le
  schéma d'événement d'EN28.4 et l'endpoint santé d'EN28.6)
- [ ] Spécification des trois surfaces : liste `GET /api/{domaine}/kpi`, pull
  `GET /api/{domaine}/kpi/{kpiKey}`, push `kpi.updated`
- [ ] Règles d'habilitation transverses : filtrage à la liste, `403` à la résolution d'un KPI
  restreint, isolation multi-tenant (`404` cross-tenant, jamais de fuite d'existence)
- [ ] Signature & idempotence de `kpi.updated` alignées sur EN28.4 (ADR-025)
- [ ] Guide d'implémentation pour les enablers producteurs par domaine (`en-exposer-kpi.md`)

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un domaine implémentant le contrat, when un appelant habilité interroge
  `GET /api/{domaine}/kpi`, then il reçoit ses KPI liables avec `unit`, `supportedScopes` et
  `refreshHint`, filtrés par ses droits.
- [ ] Given un KPI exposé, when sa valeur est recalculée, then un `kpi.updated` signé et idempotent
  est publié sur le bus (ADR-025) et la résolution pull renvoie la même valeur.
- [ ] Error case: given un `kpiKey` inconnu ou un `scope` hors `supportedScopes`, when il est
  résolu, then `404` (kpiKey inconnu) ou `400` (scope non supporté), sans fuite.
- [ ] Security: given un KPI restreint et un rôle non habilité, when il liste ou résout, then le KPI
  est absent de la liste et la résolution retourne `403` ; une référence cross-tenant retourne `404`.

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E28 · Module: integration · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Profils: Tous
Justification: Contrat socle producteur de KPI (endpoint unifié + kpi.updated) alimentant le lien KR ↔ KPI interne (US27.8.3) — cf. docs/architecture/etude-liens-kpi-okr.md
Dépendances: EN28.4 (bus d'événements, push) · EN28.6 (endpoint santé unifié, modèle homologue) · US27.8.3 (consommateur OKR)
