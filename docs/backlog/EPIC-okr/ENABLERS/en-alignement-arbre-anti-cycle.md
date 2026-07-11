# EN27.1c — Alignement OKR : arbre & garde-fou anti-cycle

**Type d'enabler** : architecture

**Objectif technique** : Construire le graphe d'alignement OKR (`Objective` ↔ `Objective` parent,
`KeyResult` → `Objective` parent) et garantir qu'il reste un **arbre acyclique** : top-down et
bottom-up, `entreprise → équipe → individu`, avec détection et rejet de tout cycle à l'écriture
d'un `Alignment` (EN27.1a fournit la table `alignment`, cet enabler porte l'invariant structurel et
les opérations de parcours).

**Justification** : L'alignement est le différenciateur clé des OKR de l'état de l'art
(Doerr/Google), mais un cycle dans l'arbre casse tout calcul de cascade, tout parcours et tout
rendu de carte d'alignement (boucle infinie). Isoler l'invariant anti-cycle dans un lot dédié
garantit sa robustesse et sa testabilité indépendamment du moteur de score.

**Critères de complétion** :
- [ ] Opération d'ajout/modification d'un `Alignment` (rattachement d'un `Objective` à un parent)
  avec validation transactionnelle
- [ ] Détection de cycle avant commit : refus de tout rattachement introduisant un cycle direct
  (auto-référence) ou indirect (parcours ascendant jusqu'à la racine)
- [ ] Parcours de l'arbre (ascendant vers la racine, descendant vers les feuilles) borné en
  profondeur configurable pour couper court à toute dérive
- [ ] Respect de la hiérarchie de niveaux `entreprise → équipe → individu` (rattachement à un
  niveau strictement supérieur ou égal selon la règle métier retenue)
- [ ] Support des liens `KeyResult → Objective parent` en plus des liens `Objective ↔ Objective`

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given deux `Objective` A et B sans lien, when je rattache B comme enfant de A, then
  l'`Alignment` est créé et le parcours ascendant depuis B atteint A.
- [ ] Given un chemin d'alignement A → B → C, when je tente de rattacher A comme enfant de C
  (cycle), then l'opération est rejetée avec une erreur métier explicite et aucun `Alignment` n'est
  persisté.
- [ ] Given une auto-référence (rattacher un `Objective` à lui-même), when l'écriture est tentée,
  then elle est rejetée avant commit.
- [ ] Error case: given un rattachement à un `Objective` parent inexistant ou d'un autre tenant,
  when l'`Alignment` est créé, then l'opération échoue en `404` (parent introuvable dans le tenant
  courant), jamais de lien cross-tenant.
- [ ] Error case: given un graphe déjà volumineux, when un rattachement dépasse la profondeur
  maximale configurée, then l'opération est rejetée sans parcours non borné (protection contre le
  déni de service par graphe pathologique).
- [ ] Security: un `Objective` d'un autre tenant ne peut jamais devenir parent ni enfant dans
  l'arbre du tenant courant — la validation d'alignement est filtrée par tenant (isolation
  multi-tenant, `404` cross-tenant, `403` si le rôle n'autorise pas la modification d'alignement).

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E27 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Profils: Tous
Justification: Arbre d'alignement OKR + invariant anti-cycle (top-down/bottom-up, entreprise→équipe→individu) — issu de la décomposition d'EN27.1 XL
Dépendances: EN27.1a (modèle & persistance OKR)
