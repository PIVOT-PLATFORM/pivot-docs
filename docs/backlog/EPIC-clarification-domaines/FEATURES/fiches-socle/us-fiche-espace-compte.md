# US52.1.2 — Fiche de clarification : Espace compte

En tant qu'**architecte / DPO**
Je veux une **fiche de clarification du domaine Espace compte** (E02)
Afin de savoir quelles données personnelles l'utilisateur gère lui-même, qui d'autre y accède, comment
c'est appliqué et quelles sorties externes existent.

**Livrable** : `docs/architecture/domaines/espace-compte.md`, conforme au template EN52.1.

**Périmètre du domaine** *(repo pivot-core · schéma `public` · module `core`)* : profil utilisateur
(champs d'identité éditables), préférences (langue/thème), préférences de notification, gestion des
sessions actives côté utilisateur, suppression/anonymisation de compte. Endpoints `/api/account/**`
(à confirmer à l'audit).

## Critères d'acceptation

- [ ] **Axe 1 — CRUD** : matrice CRUD des entités de compte — le `USER` `R/U(propre)` son profil et
      ses préférences ; suppression de compte (D) tracée avec sa politique RGPD.
- [ ] **Axe 2 — Accès par profil** : un `USER` n'agit que sur **son** compte (`◑ propriété`) ; un
      `ADMIN` lit/désactive les comptes de son tenant (renvoi à la fiche Administration US52.1.4 pour
      éviter le doublon) ; `GUEST` sans accès.
- [ ] **Axe 3 — Mécanisme** : point d'application serveur (l'identité de l'appelant = propriétaire de
      la ressource) nommé ; renvoi EN52.2.
- [ ] **Axe 4 — Sources externes** : SMTP (confirmation de changement d'e-mail ↑out) référencé depuis
      EN52.3 ; noter l'absence/présence d'export de données personnelles (droit à la portabilité RGPD).
- [ ] Error case + Security : toute donnée personnelle modifiable sans re-vérification d'identité, ou
      toute frontière floue avec l'Administration, est listée en « Écarts ».
- [ ] `npm run lint` + `npm run build` verts.

## Notes d'implémentation

- Source d'audit : code `pivot-core`/`pivot-ui` (espace compte E02) + backlog E02. Frontière explicite
  avec US52.1.4 (Administration) : compte = **self-service** ; admin = **gestion tierce**.

---
Item Type: US · Parent: F52.1 · Module: core · Phase: Socle · Size: S · Priority: High
Stage: ⬜
Dépendances: EN52.1, EN52.2, EN52.3, E02, US52.1.4 (frontière admin)
