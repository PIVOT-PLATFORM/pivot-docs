# Étude — Liens optionnels entre KPI remontés et système d'OKR

> **Statut** : étude de cadrage (design study) — **pas** une décision arrêtée ni un item de backlog validé.
> À arbitrer par **PO Agent + Architecte Modules** avant toute création d'US.
> **Périmètre** : module `pilotage` (E27 OKR) et ses producteurs de KPI (E23 Portefeuille, E38 Innovation, E30 Collaboration…).

## 1. Besoin

Permettre qu'un **Key Result** d'un objectif s'**abonne optionnellement** à un **KPI déjà
remonté** par un autre cockpit/module de PIVOT, afin que sa valeur `actuel` se mette à jour
automatiquement à partir d'une mesure qui existe déjà dans la plateforme — sans double saisie,
sans recalcul propre à l'OKR.

Mot-clé : **optionnel**. Le lien est une *commodité* offerte au owner du KR, jamais un pré-requis.
Un KR sans lien reste piloté à la main (US27.1.2), exactement comme aujourd'hui.

## 2. Ce qui existe déjà (et pourquoi ça ne couvre pas le besoin)

| Brique existante | Ce qu'elle fait | Pourquoi insuffisante ici |
|---|---|---|
| **US27.8.1** — auto-update KR (BI/API/Jira/tableur/webhook) | Relie un KR à une source **externe** préconfigurée (pull BI ou push webhook), avec coffre-fort de secrets | Cible des systèmes **hors PIVOT**. Un KPI portefeuille (US23.1.1) ou innovation (US38.9.1) est **déjà dans la plateforme** : passer par un connecteur BI externe pour le rapatrier serait un détour absurde (secrets, réseau, latence) pour une donnée locale. |
| **EN27.1d** — connecteurs OKR (auto-update, rappels, deep-links) | Pose la couche d'intégration OKR : point d'entrée auto-update, deep-links sortants **par identifiant logique**, **pas de FK inter-modules** (ADR-006/008) | Décrit le *canal* (bus PIVOT, deep-links) mais son auto-update vise « sources externes (BI/API/tableur) ». La **source interne = un autre cockpit PIVOT** n'est pas modélisée comme telle. C'est le point d'ancrage naturel de cette étude. |
| **US27.1.3** — types de KR (métrique/jalon/booléen/%) | Le KR **métrique** a `baseline → actuel → cible`, unité, avancement borné 0–100 % | Le réceptacle de valeur existe déjà. Seul le KR **métrique** (et éventuellement %) est éligible à un abonnement KPI — un jalon/booléen n'a pas de flux continu. |
| **ADR-025** — bus d'événements inter-briques | Broker ActiveMQ (OpenWire `:61616`), Spring JMS, at-least-once, durable, DLQ par domaine, événements **signés & idempotents** | Le transport est décidé mais **EN28.4 (implémentation du bus) = ⬜ à faire**. Toute solution événementielle en dépend. |

**Constat structurant** : il n'existe **aucun registre / catalogue de KPI unifié** dans PIVOT
(vérifié : aucune entité « indicateur » partagée). Chaque cockpit calcule ses KPI **localement**
et **à la demande** :

- **Portefeuille** — `GET /api/pilotage/portfolio/dashboard` calcule nb projets par statut, taux
  d'avancement moyen, RAG… au moment de l'appel (US23.1.1).
- **Innovation** — moteur entonnoir + KPIs ISO 56008 (EN38.1 → US38.9.1), calculés à l'ouverture
  du dashboard.
- **Adoption collaboration** — boards actifs, taux de réunions outillées (US30.15.6), encore au
  stade décision de gouvernance.

Conséquence directe : **il n'y a pas d'« identifiant de KPI » stable et adressable** auquel un KR
pourrait s'abonner aujourd'hui. C'est le principal manque à combler.

## 3. Contraintes d'architecture (non négociables)

- **Pas de FK inter-modules** (ADR-006 multi-repo). Le lien KR → KPI est **logique** (référence
  par identifiant + tenant), jamais une clé étrangère vers le schéma d'un autre module.
- **Découplage par événements / deep-links** (ADR-008, ADR-025). Le cœur OKR ne fait **aucun appel
  synchrone** obligatoire à un module producteur ; une source indisponible ne casse pas l'OKR
  (dégradation gracieuse — déjà exigé par EN27.1d et US27.8.1).
- **Isolation multi-tenant** : une source d'un autre tenant → `404` (non-divulgation), jamais de
  fuite d'existence.
- **RGPD / confidentialité** (US27.10.2) : un KPI dont l'accès est restreint (ex. `% CA issu du
  nouveau`, ROI — réservés COMEX/PMO en US38.9.1) ne doit pas devenir lisible via un KR
  transversal. Le lien doit **propager**, pas contourner, les habilitations du KPI source.
- **Historique immuable du KR** (US27.1.2) : un abonnement écrit un **nouveau point historisé**,
  jamais une réécriture destructive. Le KR reste la source de vérité affichée.

## 4. Pré-requis : rendre un KPI *adressable*

Pour qu'un lien optionnel existe, il faut d'abord qu'un KPI soit **désignable de façon stable**.
Deux niveaux de solution, à trancher :

### Option A — Contrat léger « KPI adressable » (recommandée pour commencer)

Chaque module producteur expose ses KPI publiables via une petite **descripteur normalisé**
(pas un nouveau moteur, juste un contrat) :

```text
KpiRef {
  source          : "portefeuille" | "innovation" | "collaboration" | …   (domaine émetteur)
  kpiKey          : string        // ex. "portfolio.avancement_moyen", "smi.time_to_market"
  tenantId        : uuid
  scope?          : { teamId?, projectId?, … }   // filtre optionnel (par identifiant logique)
  supportedScopes : ["tenant","team","project", …]   // capacité déclarée par le KPI (cf. Q1)
  refreshHint     : durée        // fréquence réelle de recalcul du KPI (borne le pull, cf. Q2)
  unit            : string
  value           : number
  observedAt      : timestamp
  visibility      : rôles habilités (repris du KPI source)
}
```

- **Pull** : le connecteur OKR (EN27.1d) résout un `KpiRef` en interrogeant un endpoint standard
  du module producteur (`GET /api/{domaine}/kpi/{kpiKey}?scope=…`), **par identifiant logique**.
- **Push** : le module producteur émet `kpi.updated` sur le **bus PIVOT** (ADR-025) ; le connecteur
  OKR consomme et met à jour les KR abonnés — asynchrone, durable, at-least-once.
- **Découverte** : chaque producteur expose la **liste de ses KPI liables** (`GET /api/{domaine}/kpi`,
  filtrée par habilitation) pour alimenter le **sélecteur par module** (cf. Q4) — pas de catalogue
  central.

Avantage : pas de nouveau sous-système transverse ; réutilise bus + deep-links déjà décidés.
Coût : chaque producteur doit implémenter le contrat `KpiRef` + l'endpoint/emission (enabler par
module, incrémental).

### Option B — Registre de KPI transverse

Un service central « catalogue d'indicateurs » où chaque module **publie** ses KPI, interrogeable
par l'OKR (et demain par d'autres consommateurs : dashboards, workflows E29, risques E21).

- **Pour** : découverte (le owner d'un KR *parcourt* les KPI disponibles), réutilisation
  multi-consommateurs, gouvernance centralisée des définitions.
- **Contre** : nouveau composant transverse à construire, versionner, sécuriser (RGPD par KPI) —
  investissement lourd pour un besoin d'abord **optionnel**. Risque de recréer un couplage fort
  que l'ADR-006/008 cherche justement à éviter.

**Recommandation** : démarrer en **Option A** (contrat + bus, croissance incrémentale par module),
en gardant l'Option B comme évolution possible si le nombre de consommateurs de KPI justifie un
catalogue. L'Option A ne ferme pas la porte à B (le `KpiRef` deviendrait l'entrée du catalogue).

## 5. Design cible du lien (Option A)

### Modèle

Ajouter au `KeyResult` (schéma `pilotage`, EN27.1a) un **binding optionnel**, nullable :

```text
KeyResult
  ├─ … (baseline, actuel, cible, unité, poids)   ← inchangé
  └─ kpiBinding? {                                 ← NOUVEAU, optionnel
        kpiRef       : KpiRef (source, kpiKey, scope)
        mode         : PULL | PUSH
        cadence?     : durée        // PULL seul ; défaut = check-in hebdo, borné (cf. Q2)
        mapping?     : identité | inversion (KR décroissant) ; ratio/offset repoussés (cf. Q3)
        lastSyncAt   : timestamp
        lastStatus   : OK | SOURCE_UNAVAILABLE | UNAUTHORIZED | STALE
     }
```

- `kpiBinding = null` → comportement actuel (saisie manuelle US27.1.2). **Aucune régression.**
- `kpiBinding ≠ null` → à chaque `kpi.updated` (push) ou synchro planifiée (pull), le connecteur
  résout la valeur, applique `mapping`, écrit un **nouveau point historisé** (auteur = « système :
  KPI {source}/{kpiKey} », traçabilité d'origine — déjà exigée par EN27.1d).

### Règles

- **Seul un KR de type métrique (ou %)** est éligible au binding.
- **Le owner du KR** (ou rôle habilité) crée/modifie/supprime le binding — **et** doit avoir le
  droit de lire le KPI source (les habilitations du KPI priment ; sinon `403`).
- **Dégradation gracieuse** : source indisponible → dernier point conservé, statut
  `SOURCE_UNAVAILABLE` visible côté KR, **score inchangé** (aligné US27.8.1 / EN27.1d).
- **Suppression du lien** : possible à tout moment ; le KR repasse en saisie manuelle, l'historique
  déjà accumulé reste.
- **RGPD** : si le KPI source devient confidentiel/inaccessible, le binding passe `UNAUTHORIZED` et
  cesse d'écrire — jamais de fuite de valeur restreinte via le KR.

### Flux (push, cible)

```text
Cockpit Portefeuille ──(kpi.updated, signé, idempotent)──▶ Bus PIVOT (ADR-025)
                                                              │
                                    Connecteur OKR (EN27.1d) ─┤ consomme, filtre par tenant
                                                              │ résout KR abonnés à ce KpiRef
                                                              ▼
                                    KeyResult.actuel ← mapping(value)  + point historisé
                                    (recalcul avancement % — US27.1.3, borné 0–100)
```

## 6. Impact backlog (proposition, à valider PO + Architecte)

| Item proposé | Nature | Contenu |
|---|---|---|
| **US27.8.x — Lier un KR à un KPI PIVOT interne** | Nouvelle US sous **F27.8** | Le pendant *interne* d'US27.8.1 : binding optionnel KR ↔ `KpiRef`, éligibilité type métrique, habilitations propagées, dégradation gracieuse, suppression. AC Given/When/Then + erreur + sécurité (404 cross-tenant, 403 KPI restreint). |
| **Extension EN27.1d** | Enabler existant | Ajouter au périmètre du connecteur : résolution `KpiRef` interne (pull) + consommation `kpi.updated` (push). Aujourd'hui EN27.1d ne parle que de sources « BI/API/tableur ». |
| **EN(par module) — Contrat `KpiRef` + `kpi.updated`** | Nouveaux enablers, un par producteur | Portefeuille (E23), Innovation (E38), Collaboration (E30) : liste des KPI liables (`GET /api/{domaine}/kpi`, pour le sélecteur Q4), résolution `KpiRef` (pull) + émission `kpi.updated` (push). Incrémental : on n'active que les modules dont les KPI sont demandés. |
| **Dépendance dure : EN28.4** | Existant ⬜ | Le mode push exige le bus implémenté (ADR-025). Le mode pull peut démarrer sans bus (appel résolu à la synchro), mais reste soumis à ADR-006 (pas de FK). |

## 7. Arbitrages

### Q1 — Granularité du scope — ✅ tranché

**Autoriser le binding scopé, mais uniquement aux dimensions que le producteur déclare
supporter ; scope par défaut = le niveau d'alignement du KR.**

- La granularité n'est **pas** une règle globale OKR : c'est une **capacité déclarée par chaque
  KPI** (`KpiRef.supportedScopes`). Le dashboard portefeuille **sait déjà filtrer par équipe /
  responsable / période** (US23.1.1) → `portfolio.avancement_moyen` est scopable par équipe. Un
  KPI innovation (`% CA issu du nouveau`) peut n'exister qu'au niveau tenant.
- Binder un KR sur un scope **non supporté** par le KPI → **rejet à la création du binding (`400`)**,
  message explicite.
- **Défaut aligné sur l'OKR** : objectif d'équipe → `scope.teamId` de l'équipe du KR ; objectif
  entreprise → scope tenant ; objectif individuel → scope tenant/équipe selon ce que le KPI expose,
  **jamais plus large que l'habilitation de l'owner**.
- **Sécurité** : scope validé contre l'isolation multi-tenant **et** la visibilité du KPI — un KR
  d'équipe A ne peut pas binder un KPI scopé équipe B (`404`, non-divulgation). Prolonge la règle
  « les habilitations du KPI priment » (§3).

### Q2 — Cadence de synchro — ✅ tranché

**Push prioritaire (événementiel, sans cadence) ; en pull, défaut hebdomadaire calé sur le
check-in, configurable par l'owner dans des bornes, plancher quotidien, jamais plus fin que le
rafraîchissement réel du KPI.**

- **Push (`kpi.updated` sur le bus)** = mode cible : pas de polling, valeur fraîche à l'émission,
  coût minimal. La cadence est un non-sujet dès que le producteur émet.
- **Pull** ne se justifie que sans émission producteur. Défaut = **hebdomadaire, aligné sur la
  cadence de check-in** (US27.4.1) : l'OKR vit à un rythme hebdo, synchroniser plus souvent
  n'apporte rien au pilotage et charge inutilement les modules.
- **Timing** : déclencher le pull **juste avant le rappel de check-in** (US27.4.3) pour une valeur
  fraîche au moment de la revue humaine — pas un cron aveugle décorrélé du rythme OKR.
- **Configurable, borné** : l'owner peut resserrer/desserrer, mais **plancher quotidien** et
  **jamais plus fin que `KpiRef.refreshHint`** (polling horaire d'un KPI recalculé chaque nuit =
  gaspillage). Plus une action **« synchroniser maintenant »** à la demande, avant un check-in.
- **Dégradation** inchangée : un pull en échec conserve le dernier point (`SOURCE_UNAVAILABLE`),
  score intact.

### Q3 — Mapping valeur KPI → valeur KR — ✅ tranché

**V1 = identité + inversion pour les KR décroissants ; ratio/offset repoussés à une itération.**

- **Identité** : `actuel = value` (même unité) couvre la majorité des cas.
- **Inversion décroissante** : pour un KR de type « réduire X » (délai, coût, nb d'incidents), la
  progression est décroissante. Le moteur d'avancement gère déjà `cible < baseline` (US27.1.3, note
  d'implémentation) — le mapping se contente d'alimenter `actuel`, le bornage 0–100 % reste au moteur.
- **Repoussé** : ratio, facteur (×100), offset configurables — n'entrent en V1 que si un besoin réel
  émerge, pour ne pas gonfler la surface de config/validation.

### Q4 — Découverte du KPI à lier — ✅ tranché

**Sélecteur par module : l'owner choisit un module producteur, puis un KPI dans la liste qu'il
expose — pas de catalogue central.**

- Chaque producteur expose `GET /api/{domaine}/kpi` (liste filtrée par habilitation de l'appelant :
  un KPI non visible pour l'owner n'apparaît pas). Le sélecteur OKR agrège **à la demande** les
  modules activés.
- Reste en **Option A** : aucun composant transverse à construire. Si le nombre de producteurs et de
  consommateurs croît, la bascule vers un catalogue (Option B) reste possible sans casser ce contrat.
- **Sécurité** : la liste respecte tenant + visibilité (un KPI restreint COMEX/PMO n'est pas listé
  pour un rôle non habilité) — cohérent avec la propagation des habilitations (§3).

### Q5 — Séquencement — ✅ tranché

**Après le socle OKR (F27.1) et l'implémentation du bus (EN28.4).**

- Ordre : socle OKR **F27.1** → bus **EN28.4** → lien interne **US27.8.x** + 1ᵉʳ producteur.
- Justification : push **et** pull disponibles d'emblée, dépendances propres, pas de mode dégradé
  transitoire à maintenir. E27 étant en **phase-3 verrouillée**, ce lien est explicitement une
  **extension** postérieure au socle, pas un pré-requis.

## 8. Recommandation

1. **Traiter ce lien comme une extension optionnelle d'US27.8** (auto-update KR), **pas** comme une
   refonte du modèle KPI. Le réceptacle (KR métrique) et le canal (bus/deep-links) existent déjà.
2. **Option A (contrat `KpiRef` + bus)**, croissance **incrémentale par module producteur** — pas
   de registre transverse tant qu'un seul consommateur (l'OKR) existe.
3. **Séquencement** : socle OKR (F27.1) → bus (EN28.4) → US27.8.x lien interne + 1ᵉʳ producteur
   (Portefeuille E23, le plus mature). Les autres producteurs suivent à la demande.
4. **Garde-fous à ne jamais relâcher** : optionnalité (aucune régression du manuel), pas de FK
   inter-modules, propagation des habilitations RGPD du KPI source, dégradation gracieuse.

---

## Références

- **E27 — OKR** : `docs/backlog/EPIC-okr/README.md`
- **US27.8.1** — auto-update KR (sources externes) : `docs/backlog/EPIC-okr/FEATURES/integrations/us-auto-update-kr.md`
- **EN27.1d** — connecteurs OKR (auto-update, rappels, deep-links) : `docs/backlog/EPIC-okr/ENABLERS/en-connecteurs-deep-links.md`
- **US27.1.2 / US27.1.3** — suivi & types de KR : `docs/backlog/EPIC-okr/FEATURES/okr/`
- **US23.1.1** — dashboard portefeuille (KPI) : `docs/backlog/EPIC-portefeuille/FEATURES/portfolio/us-tableau-bord-portfolio.md`
- **US38.9.1** — KPIs innovation ISO 56008 : `docs/backlog/EPIC-pilotage-innovation/FEATURES/kpis-maturite-iso/us-kpis-tableau-bord.md`
- **US30.15.6** — mesure d'adoption : `docs/backlog/EPIC-collaboration/FEATURES/chantiers-si/us-mesure-d-adoption.md`
- **ADR-006** — architecture multi-repo (pas de FK inter-modules)
- **ADR-008** — domaines, modules & cockpits
- **ADR-025** — bus d'événements & schéma inter-briques (impl. EN28.4 ⬜)
