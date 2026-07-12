# US27.8.3 — Lier un KR à un KPI PIVOT interne

**En tant que** responsable pilotage
**Je veux** lier **optionnellement** un Key Result métrique à un **KPI déjà remonté par un autre
cockpit PIVOT** (portefeuille, innovation, adoption…)
**Afin de** synchroniser sa valeur actuelle depuis une mesure interne existante, sans double saisie
ni recours à un connecteur externe

> Pendant *interne* d'US27.8.1 (sources externes BI/API/tableur). Conception détaillée, arbitrages
> et modèle : étude `docs/architecture/etude-liens-kpi-okr.md`.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un KR **métrique** (ou %) et un KPI interne **visible pour l'owner**, when j'établis le lien (sélecteur module → KPI → scope), then la valeur `actuel` du KR se synchronise depuis le KPI et l'origine (source, kpiKey, scope, horodatage) est tracée | ⬜ |
| Given un lien en mode **push**, when le module producteur émet `kpi.updated` pour ce `KpiRef` (tenant + kpiKey + scope), then un **nouveau point historisé** est écrit et l'avancement % recalculé (borné 0–100), sans écraser l'historique | ⬜ |
| Given un lien en mode **pull** (producteur n'émettant pas), when l'échéance de synchro est atteinte (défaut hebdomadaire, avant le rappel de check-in), then la valeur est résolue et historisée ; l'owner peut déclencher « synchroniser maintenant » | ⬜ |
| Given un KR **décroissant** (cible < baseline) et le mapping inversion, when une nouvelle valeur arrive, then l'avancement suit la progression décroissante en restant borné 0–100 | ⬜ |
| Given un lien existant, when l'owner le **supprime**, then le KR repasse en saisie manuelle (US27.1.2) et l'historique déjà accumulé est conservé | ⬜ |
| Error : given un KR non métrique (jalon/booléen), un scope non déclaré dans `supportedScopes` du KPI, ou une cadence plus fine que `refreshHint`, when le lien est créé/modifié, then l'API retourne **400** avec message explicite, sans créer le lien | ⬜ |
| Error : given un KPI source indisponible ou un payload malformé, when la synchro s'exécute, then le dernier point est conservé, le statut `SOURCE_UNAVAILABLE` est visible côté KR et le score reste inchangé (aucune corruption de `actuel`) | ⬜ |
| Security : given un KPI d'un **autre tenant**, when il est référencé ou résolu, then **404** (non-divulgation d'existence cross-tenant, jamais 403 exposant la ressource) | ⬜ |
| Security : given un owner **sans droit de lecture** sur le KPI source (ex. KPI restreint COMEX/PMO), when il tente de créer le lien, then **403** ; et si le KPI devient restreint après coup, le lien passe `UNAUTHORIZED` et **cesse d'écrire** (pas de fuite de valeur restreinte via le KR) | ⬜ |
| Security : seul l'owner du KR (ou un rôle habilité) peut créer / modifier / supprimer un lien KPI | ⬜ |
| A11y : le sélecteur (module → KPI → scope) et l'état de synchronisation du lien sont utilisables au clavier, avec libellés associés et statut annoncé aux lecteurs d'écran (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- Les **sources externes** (BI, API, Jira, tableur, webhook) — couvertes par US27.8.1
- L'**import / export** ponctuel de fichiers (CSV/XLSX/JSON) — couvert par US27.8.2
- Un **catalogue de KPI transverse** (registre / Option B de l'étude) : cette US retient le
  **sélecteur par module** uniquement
- Les **transformations de mapping avancées** (ratio, facteur, offset) : la V1 se limite à
  l'**identité** et à l'**inversion** pour KR décroissant (cf. Q3 de l'étude)
- Le **calcul des KPI eux-mêmes** : il reste dans les modules producteurs ; cette US ne fait que
  s'y abonner

## Notes d'implémentation

- Lien porté par un `kpiBinding?` **nullable** sur `KeyResult` (EN27.1a) : `null` = saisie manuelle
  (US27.1.2), **aucune régression** du comportement existant.
- Connecteur interne porté par **EN27.1d** (étendu) : résolution `KpiRef` en pull et consommation
  de `kpi.updated` en push sur le **bus PIVOT** (ADR-025).
- **Pas de FK inter-modules** (ADR-006) : le lien est logique — `tenantId` + `source` + `kpiKey` +
  `scope`. Aucune clé étrangère vers le schéma d'un module producteur.
- Chaque module producteur expose `GET /api/{domaine}/kpi` (liste des KPI liables, **filtrée par
  habilitation** de l'appelant) + la résolution de valeur — porté par un enabler par producteur
  (E23 Portefeuille d'abord).
- **Dépendance bus** : le mode push exige EN28.4 (bus) ; le mode pull peut fonctionner sans bus.
- Le KR reste la **source de vérité affichée** ; la synchro écrit un point historisé immuable
  (auteur = « système : KPI {source}/{kpiKey} »), jamais une réécriture destructive (aligné US27.1.2).
- Séquencement : **après** le socle OKR (F27.1) et le bus (EN28.4) — cf. Q5 de l'étude.

---
Item Type: US · Parent: F27.8 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Lien optionnel KR ↔ KPI PIVOT interne (pendant interne d'US27.8.1) — cf. docs/architecture/etude-liens-kpi-okr.md
Dépendances: EN27.1 (modèle & moteur) · EN27.1d (connecteurs, étendu) · EN28.4 (bus, mode push) · producteurs KPI (E23/E38/E30)
