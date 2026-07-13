# US52.1.1 — Fiche de clarification : Identités & IAM

En tant qu'**architecte / RSSI**
Je veux une **fiche de clarification du domaine Identités & IAM** (E01)
Afin de savoir précisément *quelles entités d'identité existent, qui peut les manipuler, comment
l'accès est vérifié et d'où viennent les identités externes*.

**Livrable** : `docs/architecture/domaines/identites-iam.md`, conforme au template EN52.1.

**Périmètre du domaine** *(repo pivot-core · schéma `public` · module `auth`)* : `users`,
`access_tokens`, `oidc_configs`, jetons de vérification e-mail, jetons de reset mot de passe,
OTP / appareils connus (remember-me), sessions. Endpoints `/api/auth/**`.

## Critères d'acceptation

- [ ] **Axe 1 — CRUD** : given le domaine, when la fiche est produite, then chaque entité ci-dessus a
      sa ligne de matrice CRUD (opérations réellement exposées, endpoint, `access_tokens` noté
      create/revoke, jamais update ; raw token jamais lu).
- [ ] **Axe 2 — Accès par profil** : matrice entité·opération × `SUPER_ADMIN`/`ADMIN`/`USER`/`GUEST`
      + rôle métier — ex. un `USER` lit/révoque **ses propres** sessions (`R(propre)`), un `ADMIN`
      gère les `oidc_configs` de **son** tenant (`◑ tenant`).
- [ ] **Axe 3 — Mécanisme** : la fiche nomme le point d'application serveur de chaque droit (filtre
      Spring Security sur `/api/auth/**`, validation opaque token / JWKS OIDC) et renvoie à EN52.2.
- [ ] **Axe 4 — Sources externes** : IdP OIDC (JWKS ↓in) et SMTP (e-mails d'activation/reset ↑out)
      référencés depuis le registre EN52.3.
- [ ] Error case : toute opération présente dans le code mais sans droit clair, ou tout droit théorique
      non appliqué côté serveur, est listé en section « Écarts ».
- [ ] Security : la fiche vérifie l'invariant « raw token jamais persisté ni relu » et « max 5 sessions »
      (ADR-005) — écart si non tenu.
- [ ] `npm run lint` + `npm run build` verts.

## Notes d'implémentation

- Source d'audit : code `pivot-core` (contrôleurs `auth`, `TenantOidcConfig`) + backlog E01. La fiche
  **documente l'existant** ; toute divergence est un finding, pas un correctif.

---
Item Type: US · Parent: F52.1 · Module: auth · Phase: Socle · Size: M · Priority: Critical
Stage: ⬜
Dépendances: EN52.1, EN52.2, EN52.3, E01
