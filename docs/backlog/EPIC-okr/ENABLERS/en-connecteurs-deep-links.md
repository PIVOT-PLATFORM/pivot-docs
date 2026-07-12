# EN27.1d — Connecteurs OKR : auto-update KR, rappels & deep-links pilotage

**Type d'enabler** : intégration

**Objectif technique** : Câbler les points d'intégration du module OKR sans couplage fort
inter-modules : auto-update des `KeyResult` depuis des sources **externes** (BI/API/tableur) **et
des KPI PIVOT internes** (autres cockpits : portefeuille E23, innovation E38, adoption E30), rappels
de `CheckIn` publiés sur le **bus PIVOT** (→ Slack/Teams), et **deep-links** de pilotage vers la
roadmap (E22), le portefeuille (E23) et le risque (E21). **Pas de FK inter-modules** — liens
logiques par identifiant + événements, conformément à ADR-006 (multi-repo, pas de FK inter-modules)
et ADR-025 (bus d'événements & schéma inter-briques ; implémentation `EN28.4` ⬜).

**Justification** : Les OKR ne vivent pas isolés : l'auto-update supprime la saisie manuelle, les
rappels entretiennent la cadence de check-in, les deep-links relient l'intention à l'exécution.
Isoler la couche d'intégration protège le cœur (modèle + moteur) de toute dépendance directe aux
autres modules et concentre le respect d'ADR-006/008 (pas de FK inter-modules) en un seul lot.

**Critères de complétion** :
- [ ] Point d'entrée d'auto-update d'un `KeyResult` (valeur `actuel`) depuis une source externe
  (connecteur BI/API/tableur), traçant l'origine de la mise à jour
- [ ] Point d'entrée d'auto-update d'un `KeyResult` depuis un **KPI PIVOT interne** (autre cockpit) :
  résolution d'un `KpiRef` en **pull** (liste `GET /api/{domaine}/kpi` + valeur) et consommation de
  l'événement `kpi.updated` en **push** (bus PIVOT, ADR-025), par identifiant logique
  (tenant + source + kpiKey + scope), **sans FK inter-modules** — cf. US27.8.3
- [ ] Émission de rappels de `CheckIn` sur le bus PIVOT (ADR-025, implémentation `EN28.4` ⬜) à
  destination des canaux Slack/Teams, sans appel synchrone direct au module de notification
- [ ] Deep-links sortants vers roadmap (E22), portefeuille (E23), risque (E21) construits par
  identifiant logique, **sans clé étrangère** vers les schémas de ces modules
- [ ] Confidentialité RGPD respectée : les rappels et deep-links relatifs à un `Objective`
  individuel confidentiel ne sont émis qu'aux destinataires autorisés
- [ ] Résilience : une source externe ou un canal indisponible n'interrompt pas le cœur OKR
  (dégradation gracieuse, pas d'échec en cascade)

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un `KeyResult` métrique et une source d'auto-update configurée, when une nouvelle valeur
  arrive, then l'`actuel` du KR est mis à jour et l'origine (source, horodatage) est tracée.
- [ ] Given un `KeyResult` métrique lié à un **KPI PIVOT interne** (`KpiRef` = tenant, source,
  kpiKey, scope), when le producteur émet `kpi.updated` ou when la synchro pull s'exécute, then
  l'`actuel` du KR est mis à jour, historisé et l'origine (source interne, horodatage) tracée —
  **sans aucune FK** vers le schéma du module producteur (ADR-006).
- [ ] Given un `Objective` dont le `CheckIn` est dû, when l'échéance de rappel est atteinte, then un
  message de rappel est publié sur le bus PIVOT vers le canal configuré (Slack/Teams).
- [ ] Given un `KeyResult` lié logiquement à un projet roadmap (E22), when j'ouvre le deep-link,
  then je suis redirigé vers l'item E22 par identifiant, sans qu'aucune FK inter-modules n'existe en
  base (conforme ADR-006 multi-repo / ADR-025 bus & schéma inter-briques).
- [ ] Error case: given une source externe indisponible ou un payload d'auto-update malformé, when
  la mise à jour est tentée, then elle est rejetée/ignorée proprement (log + `4xx` côté connecteur)
  sans corrompre la valeur `actuel` existante ni bloquer le module.
- [ ] Error case: given un deep-link vers un item d'un autre tenant ou inexistant, when il est
  résolu, then l'accès retourne `404` (jamais de fuite d'existence cross-tenant).
- [ ] Security: un rappel ou un auto-update relatif à un `Objective` individuel confidentiel n'est
  émis qu'aux destinataires autorisés — isolation multi-tenant (`404` cross-tenant), `403` si le
  rôle n'a pas accès à l'OKR confidentiel (découplage RGPD des OKR individuels).

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E27 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Profils: Tous
Justification: Connecteurs auto-update KR + rappels bus PIVOT + deep-links pilotage sans FK inter-modules (ADR-006/008) — issu de la décomposition d'EN27.1 XL
Dépendances: EN27.1a (modèle & persistance OKR) · EN27.1b (moteur, pour statut/rappels) · bus PIVOT (ADR-025, implémentation EN28.4 ⬜)
