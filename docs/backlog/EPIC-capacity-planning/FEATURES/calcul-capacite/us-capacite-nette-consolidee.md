# US11.6.5 — Capacité nette consolidée (membre → sprint → incrément/PI)

**En tant que** RTE / Scrum Master
**Je veux** consolider la capacité nette du membre au sprint, puis à l'incrément / PI
**Afin de** disposer d'une capacité fiable à chaque maille pour engager le bon périmètre

**Gate 1 réalisé le 2026-07-22** — remplace la version outline précédente. Point de convergence de
tout F11.6 (US11.6.1→US11.6.4) — dernière pièce du moteur complet, remplace définitivement le
calcul provisoire de S20.

**Architecture — extension de `CapacityCalculator`, pas de nouvelle classe parallèle (Gate 1 —
décision PO/Architecte)** : `CapacityCalculator` (S20, pur, testé en isolation, `isProvisional:
true` sur tout ce qu'il produit) porte déjà `summarize`/`aggregate` avec la bonne forme
(jours ouvrés, membres, absences, agrégation PI). Ce lot **étend** cette même classe (nouvelle
surcharge de `summarize`/`aggregate` prenant en paramètres les jours fériés tenant — US11.6.1 —,
le facteur de concentration effectif par membre — US11.6.2/US11.6.4 —, et l'ajustement vélocité —
US11.6.3) plutôt que de dupliquer la logique de calcul de base dans une classe séparée. La
Javadoc de `CapacityCalculator` annonçait déjà cette trajectoire : « the real F11.6 engine will
replace this formula, not add to it ». **Une fois ce lot livré, `isProvisional` devient `false`**
sur tout résumé produit par le chemin complet (holidays + focus + maturité + vélocité renseignés
au niveau équipe) ; il reste `true` uniquement si l'appelant n'a **rien** configuré (aucun jour
férié, aucune maturité, facteur par défaut brut) — signal honnête qu'aucun paramètre réel n'a
encore été saisi, pas une limitation technique du moteur.

## Critères d'acceptation

### Consolidation (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un événement `SPRINT`/`RELEASE`/`CUSTOM` avec ses membres, absences, jours fériés tenant et facteur de concentration effectif, when `GET .../events/{id}/summary`, then 200 OK avec la **capacité nette du sprint** (jours-homme et, si `pointsPerDay` configuré, en points) — même endpoint qu'US11.1.2, réponse enrichie | ⬜ |
| Given un événement `INCREMENT`/`PI_PLANNING` avec ses enfants `SPRINT`/`RELEASE`/`CUSTOM`, when `GET .../events/{id}/summary`, then 200 OK avec la **capacité du PI/incrément = somme des capacités des enfants**, les enfants marqués `isIpIteration: true` (US11.5.1) **exclus** de la somme | ⬜ |
| Given `pointsPerDay` et un forecast de vélocité disponible (US11.6.3), when le résumé d'un `SPRINT` en préparation (sans `completedPoints` encore saisi) est demandé, then il porte en plus `forecastPoints` (issu d'US11.6.3) et `engagementRecommendedPoints = forecastPoints × (1 − marge maturité effective)` (US11.6.4) | ⬜ |
| Given un changement affectant le calcul (ajout/suppression d'absence, modification du facteur de concentration, de la maturité d'équipe, ou de la période), when il survient, then le résumé recalculé au prochain `GET` reflète immédiatement le changement — **pas de valeur mise en cache obsolète** (calcul à la demande, pas de job de recalcul asynchrone au socle) | ⬜ |
| Given tous les paramètres du moteur complet renseignés (jours fériés tenant même vide-mais-configuré, maturité équipe, facteur de concentration), when le résumé est produit, then `isProvisional: false` ; sinon `true` (voir §Architecture) | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given un `id` d'événement inexistant ou d'un autre tenant, when `GET .../summary`, then 404 | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : mêmes règles d'accès qu'US11.1.2 (créateur ou membre de l'équipe, 404 anti-énumération) | ⬜ |
| Security : test TI obligatoire cross-tenant sur `GET .../events/{id}/summary` | ⬜ |

## Hors périmètre

- **Recalcul asynchrone/planifié** (job périodique recalculant tous les résumés en arrière-plan) —
  calcul à la demande uniquement au socle, cohérent avec l'absence de temps réel sur ce module.

## Notes d'implémentation

- **Backend** : `CapacityCalculator` étendu (nouvelle surcharge de `summarize`/`aggregate` avec
  jours fériés/facteur/maturité en paramètres, en conservant les signatures S20 existantes pour
  compatibilité — `CapacitySummaryService` choisit la surcharge complète dès que les paramètres
  du tenant/équipe sont disponibles). `CapacityMaturityDefaults` (US11.6.4) et
  `CapacityVelocityForecastService` (US11.6.3) injectés dans `CapacitySummaryService`, qui devient
  le point d'orchestration unique du calcul complet — aucun endpoint ne réimplémente sa propre
  version de la formule. TU exhaustifs sur `CapacityCalculator` étendu (jours fériés vides vs
  peuplés, agrégation avec/sans itération IP exclue, `isProvisional` vrai/faux selon paramétrage).
- **Frontend** : `capacity-event-detail` affiche le résumé complet (badge "estimation provisoire"
  uniquement si `isProvisional: true`, sinon un badge neutre confirmant le calcul complet) ;
  vue hiérarchique PI/incrément → sprints avec capacité agrégée et itérations IP visuellement
  distinguées (grisées, non comptées).

---
Item Type: US · Parent: F11.6 · Module: agilite · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: release-train-engineer, scrum-master
Dépendances: US11.6.1 · US11.6.2 · US11.6.3 · US11.6.4
