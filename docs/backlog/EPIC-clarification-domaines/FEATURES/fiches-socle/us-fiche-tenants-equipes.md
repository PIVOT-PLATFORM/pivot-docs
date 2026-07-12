# US52.1.3 — Fiche de clarification : Tenants & Équipes

En tant qu'**architecte**
Je veux une **fiche de clarification du domaine Tenants & Équipes**
Afin de clarifier les briques d'isolation (tenant) et de portage collectif (équipe) sur lesquelles
**tous les autres domaines** s'appuient pour leurs droits.

**Livrable** : `docs/architecture/domaines/tenants-equipes.md`, conforme au template EN52.1.

**Périmètre du domaine** *(repo pivot-core · schéma `public` · module `core`)* : `tenants`, `teams`,
`team_members` (rôles `owner`/`member`). Ce domaine est **transverse** : `teams`/`team_members` vivent
obligatoirement dans `public` et servent de portée aux objets métier des modules (FK cross-schéma).

## Critères d'acceptation

- [ ] **Axe 1 — CRUD** : matrice CRUD de `tenants` (provisionnement `SUPER_ADMIN`), `teams` et
      `team_members` (création/ajout/retrait de membre, changement de rôle d'équipe), avec endpoints.
- [ ] **Axe 2 — Accès par profil** : `SUPER_ADMIN` gère les tenants ; `ADMIN` et `owner` d'équipe
      gèrent les équipes de leur tenant (`◑`) ; `member` en lecture ; `GUEST` exclu.
- [ ] **Axe 3 — Mécanisme** : la fiche est la **référence canonique** des portées `tenant` et `équipe`
      pour EN52.2 — `TenantContext` (isolation), `team_members` (appartenance), règle FK cross-schéma
      → `public` uniquement ; point d'application nommé.
- [ ] **Axe 4 — Sources externes** : rattachement organisationnel externe (LDAP/PGI, idéation) noté
      depuis EN52.3 comme **non livré** — les équipes sont aujourd'hui internes.
- [ ] Error case + Security : toute FK inter-schémas modules (interdite) ou tout objet métier non
      rattaché à une portée tenant/équipe est un écart critique.
- [ ] `npm run lint` + `npm run build` verts.

## Notes d'implémentation

- Source d'audit : code `pivot-core` (`teams`, `team_members`, `TenantContext`) + E17. Cette fiche est
  citée par toutes les fiches de modules pour l'axe « portée d'accès » — la produire tôt dans la vague.

---
Item Type: US · Parent: F52.1 · Module: core · Phase: Socle · Size: M · Priority: Critical
Stage: ⬜
Dépendances: EN52.1, EN52.2, EN52.3, E17
