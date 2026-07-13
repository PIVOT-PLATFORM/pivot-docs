# US52.1.5 — Fiche de clarification : Système de modules

En tant qu'**architecte**
Je veux une **fiche de clarification du domaine Système de modules** (E03)
Afin de clarifier le **gate d'activation** — la brique qui conditionne l'accès à *tous* les modules
métier.

**Livrable** : `docs/architecture/domaines/systeme-modules.md`, conforme au template EN52.1.

**Périmètre du domaine** *(repo pivot-core · schéma `public` · module `core`)* : `modules_state`
(état activé/désactivé par tenant), registre `PivotModule` (backend), contrat frontend TypeScript,
endpoint de statut, cache Redis TTL 60s, `moduleGuard` (Angular). Endpoints `/api/modules/status`
(+ activation via `/api/admin/**`).

## Critères d'acceptation

- [ ] **Axe 1 — CRUD** : matrice CRUD de `modules_state` (R statut par tous les membres du tenant ;
      U activation réservée admin — renvoi US52.1.4) + description du registre `PivotModule` (déclaratif,
      non-CRUD).
- [ ] **Axe 2 — Accès par profil** : lecture du statut = tout `USER` du tenant ; bascule d'activation =
      `ADMIN` (`◑ tenant`).
- [ ] **Axe 3 — Mécanisme** : la fiche est la **référence canonique de la portée `module`** pour EN52.2
      — double barrière `moduleGuard` (UI, bundle non chargé) + 403 côté API du module désactivé ;
      cache Redis TTL 60s et son chemin de lecture nommés (noter le gap connu EN03.3 : cache non raccordé
      au chemin de lecture).
- [ ] **Axe 4 — Sources externes** : aucune ; Redis noté comme cache interne (renvoi EN52.3 ligne infra).
- [ ] Error case + Security : un module désactivé encore atteignable côté API (barrière UI seule),
      ou une incohérence `description` API vs `PivotModule` (gap Sprint 2 documenté), = écarts.
- [ ] `npm run lint` + `npm run build` verts.

## Notes d'implémentation

- Source d'audit : code `pivot-core` (`PivotModule`, registre, `/api/modules`), `pivot-ui`
  (`moduleGuard`) + E03. Les gaps déjà connus (STATUS.md Sprint 2) sont repris tels quels en « Écarts ».

---
Item Type: US · Parent: F52.1 · Module: core · Phase: Socle · Size: S · Priority: High
Stage: ⬜
Dépendances: EN52.1, EN52.2, EN52.3, E03, US52.1.4
