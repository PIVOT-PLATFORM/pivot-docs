# EN18.10 — Profil d'organisation par défaut (couture / seam)

**Type d'enabler** : architecture (couture de découplage)

**Objectif technique** : Fournir un `DefaultOrganizationProfile` à **altitude fixe**, **sans
questionnaire ni moteur adaptatif**, servant de **couture de découplage** entre le domaine Pilotage
et le moteur de profil adaptatif E40 (verrouillé en idéation). Le système de modules (E03) et le
curseur d'altitude roadmap↔Gantt (E22) lisent un **contrat de résolution de profil stable** —
`resolveProfile(tenant) → { altitude fixe, modules activés par défaut, classe de souveraineté par
défaut, niveau de rigueur }` — **identique** que le backing soit le défaut (EN18.10) ou le moteur
adaptatif (E40). E40 s'y greffe plus tard par **substitution**, sans casser les consommateurs.

**Justification** : Sans ce seam, E22 (curseur altitude) et E03 (activation des features) auraient
une **dépendance dure sur E40** (phase-3, verrouillé), bloquant tout le socle Roadmap du
[Sprint 9](../../sprints/sprint-9.md). EN18.10 permet de livrer « une roadmap simple créable de
bout en bout » **avant** E40. C'est le pivot du re-tri « valeur pilotage avant idéation »
(2026-07-10) : voir [E22 — Roadmap §Altitude](../../EPIC-roadmap/README.md).

**Hors-périmètre** : aucune adaptation, aucun questionnaire de cadrage, aucun recalcul dynamique de
l'altitude — tout cela reste à E40 ([`BACKLOG-IDEATION/EPIC-profil-adaptation`](../../BACKLOG-IDEATION/EPIC-profil-adaptation/README.md)).

**Critères de complétion** :
- [ ] Contrat de lecture `resolveProfile(tenant)` exposé, **signature identique** à celle
      qu'implémentera E40 (substituabilité).
- [ ] Un `DefaultOrganizationProfile` **unique par tenant** (résolu depuis config versionnée, override
      optionnel en base), rattaché via FK `public.teams(id)`.
- [ ] 4 attributs à valeur non nulle déterministe et documentée : altitude fixe, modules activés,
      classe de souveraineté, niveau de rigueur.
- [ ] Test de substituabilité : même contrat, deux backings (défaut EN18.10 vs stub E40) →
      consommateurs (E03, E22) inchangés.
- [ ] Isolation multi-tenant (404 cross-tenant / non-membre) sur le contrat de résolution.

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un tenant sans moteur E40, when E03 ou le curseur E22 appelle le contrat de résolution, then l'enabler retourne un profil par défaut unique `{ altitude fixe, modules par défaut, souveraineté par défaut, rigueur par défaut }`.
- [ ] Given un tenant nouvellement provisionné sans profil explicite, when le profil est résolu, then exactement un `DefaultOrganizationProfile` existe (FK `public.teams(id)`), jamais plus d'un.
- [ ] Given le curseur d'altitude E22, when il lit l'altitude du profil par défaut, then il obtient une valeur **fixe, stable et déterministe** (aucune adaptation/recalcul), affichant la vue par défaut sans E40.
- [ ] Given le système de modules E03, when il lit la liste des modules activés du profil par défaut, then il obtient l'ensemble par défaut stable permettant l'activation des features **sans** US40.1.2.
- [ ] Given E40 greffé ultérieurement fournissant sa propre implémentation du contrat, when il se substitue, then E03 et E22 fonctionnent à l'identique **sans modification du code appelant** (contrat EN18.10 == contrat E40).
- [ ] Error case: given un `tenantId` inexistant (ou sans enregistrement `teams`), when la résolution est tentée, then `404` (ressource introuvable), aucun profil fantôme fabriqué.
- [ ] Security: given un utilisateur authentifié ciblant un tenant dont il n'est pas membre / cross-tenant, when il appelle le contrat, then `404` (isolation systématique, FK `public.teams(id)`) ; si un override des valeurs par défaut est exposé, il est réservé à un rôle habilité (DSI / admin plateforme), sinon `403`.

**Valeurs par défaut** (confirmées par le mainteneur, 2026-07-11) : altitude = **roadmap rapide
(macro)** ; modules = socle roadmap minimal (E22, sans AP/CP ni PPI) ; souveraineté = classe la
plus neutre ; matérialisation = **config versionnée résolue à la volée + override optionnel en
base**.

**Statut** : ⬜ À faire — couture net-new (re-tri 2026-07-10)

---
Item Type: Enabler · Parent: E18 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Relation de découplage: E40 (US40.1.1/US40.1.2/US40.1.3) — substitue l'implémentation du contrat sans changer sa signature
Dépendances: EN18.1 (schéma `pilotage` + entités JPA) · EN18.9 (Application → Projet)
