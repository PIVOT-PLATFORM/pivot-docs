# EN22.1c — Jalon partagé, agrégation, dérivation de vues & événements

**Type d'enabler** : architecture (projection & intégration)

**Objectif technique** : Implémenter les sections **(c) Dérivation des vues**, **(d) Contrat
d'événements** et **(e) Matrice de couverture** du contrat figé
[EN22.1](en-modele-temporel-unique.md#c-dérivation-des-vues--roadmap-macro--gantt-détail) — la
projection roadmap macro ↔ Gantt détail à partir du **même graphe** (jalon partagé, jamais
dupliqué), le **rollup récapitulatif** dérivé (start=min, finish=max, travail/coût=Σ, %=pondéré),
et le **contrat d'événements** `pilotage.plan.v1` sur le bus PIVOT (enveloppe versionnée, idempotence
par `revision`, ADR-006) consommé par la co-édition et les modules E21/E23.

**Justification** : C'est la couche qui rend concret « deux vues d'un modèle unique » (ADR-010) sans
double stockage, et qui expose les changements aux consommateurs (55 fiches) sans FK inter-modules.

**Hors-périmètre** : le schéma (→ EN22.1a) ; le calcul CPM (→ EN22.1b). Cet enabler **consomme** la
sortie du moteur et **projette**, il ne recalcule pas.

**Critères de complétion** :
- [ ] Projection `GET /plan?altitude=…` : vue roadmap (période floue, jalons) et vue Gantt (dates précises) dérivées du même graphe ; altitude par défaut via `resolveProfile` (EN18.10)
- [ ] Jalon partagé (`task_type=MILESTONE`, `shared_in_roadmap=true`) : un seul objet, `id` stable entre les deux vues
- [ ] Rollup récapitulatif dérivé (jamais stocké en double), incluant `isCritical` propagé des feuilles
- [ ] Contrat d'événements `pilotage.plan.v1` : enveloppe versionnée, 6 événements, idempotence par `revision`, aucune donnée d'un autre module (ADR-006)
- [ ] Matrice de couverture (§e) vérifiée : chaque consommateur (US22.3.2/3.3/3.4, US22.4.x, EN22.2, E21/E23) trouve son champ/API/événement

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un jalon modifié dans la vue Gantt, when on ouvre la vue roadmap, then le **même** jalon (`id` stable) reflète le changement sans duplication ni double saisie.
- [ ] Given un recalcul du moteur (EN22.1b), when il aboutit, then un événement `pilotage.plan.v1` est publié sur le bus avec sa `revision` ; un consommateur qui reçoit deux fois la même `revision` l'ignore (idempotence).
- [ ] Given une tâche récapitulative, when ses sous-tâches changent, then son rollup (dates/travail/coût/%/`isCritical`) est recalculé en projection, jamais persisté en double.
- [ ] Error case: given une requête `GET /plan?altitude=INCONNUE`, when elle est traitée, then `422` (altitude non reconnue), aucune projection partielle renvoyée.
- [ ] Security: given un utilisateur non-membre du tenant d'un projet, when il demande sa projection ou s'abonne à ses événements, then `404` (invisible cross-tenant) ; les payloads d'événements ne portent que des identifiants logiques (aucune fuite de données d'un autre module/tenant).

**Statut** : ⬜ À faire — issu de la scission d'EN22.1 (contrat figé §c/§d/§e)

---
Item Type: Enabler · Parent: E22 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Dépendances: EN22.1a (schéma) · EN22.1b (moteur — sortie projetée) · contrat figé EN22.1 §(c)(d)(e)
