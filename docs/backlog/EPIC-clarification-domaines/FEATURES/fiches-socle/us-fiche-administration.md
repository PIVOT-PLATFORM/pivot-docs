# US52.1.4 — Fiche de clarification : Administration

En tant qu'**architecte / RSSI**
Je veux une **fiche de clarification du domaine Administration** (E06)
Afin de cartographier les pouvoirs d'`ADMIN` et de `SUPER_ADMIN` — le domaine le plus sensible en
matière de « qui a accès ».

**Livrable** : `docs/architecture/domaines/administration.md`, conforme au template EN52.1.

**Périmètre du domaine** *(repo pivot-core · schéma `public` · module `admin`)* : gestion des
utilisateurs du tenant (lister, activer/désactiver, modifier le rôle), gestion des plans/tenants
(`SUPER_ADMIN`), vue admin d'activation des modules (frontière avec US52.1.5). Endpoints
`/api/admin/**` et `/api/superadmin/**`.

## Critères d'acceptation

- [ ] **Axe 1 — CRUD** : matrice CRUD des opérations admin (utilisateurs, attribution de rôle,
      activation de plan) avec distinction nette `/api/admin/**` (portée tenant) vs `/api/superadmin/**`
      (portée plateforme).
- [ ] **Axe 2 — Accès par profil** : `ADMIN` = tenant uniquement (`◑ tenant`), `SUPER_ADMIN` = plateforme
      (`●`), `USER`/`GUEST` = `○`. Mapping des rôles métier de gouvernance (DSI, RSSI…) → `ADMIN`
      candidat, marqué « grille de lecture » (renvoi EN52.2).
- [ ] **Axe 3 — Mécanisme** : point d'application serveur de la séparation admin/superadmin nommé
      (annotation/filtre sur les deux préfixes) ; vérifier qu'un `ADMIN` d'un tenant ne peut atteindre
      un autre tenant.
- [ ] **Axe 4 — Sources externes** : aucune source externe propre attendue — le noter explicitement
      (l'absence est une information).
- [ ] Error case + Security : escalade de privilège possible, action superadmin atteignable par un
      admin tenant, ou modification de rôle non journalisée (renvoi audit US52.1.7) = écarts critiques.
- [ ] `npm run lint` + `npm run build` verts.

## Notes d'implémentation

- Source d'audit : code `pivot-core`/`pivot-ui` (E06) + backlog E06. Frontière : self-service compte
  (US52.1.2) vs gestion tierce (ici) ; activation module (US52.1.5) référencée, pas dupliquée.

---
Item Type: US · Parent: F52.1 · Module: admin · Phase: Socle · Size: M · Priority: Critical
Stage: ⬜
Dépendances: EN52.1, EN52.2, EN52.3, E06, US52.1.5, US52.1.7 (audit)
