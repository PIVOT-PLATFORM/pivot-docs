# US52.1.9 — Fiche de clarification : Infrastructure, CI/CD & sources externes

En tant qu'**architecte / DevOps / RSSI**
Je veux une **fiche de clarification du domaine Infrastructure & CI/CD** (E05/E07/E17)
Afin de cartographier ce qui n'a pas de CRUD utilisateur mais **concentre la surface externe** de la
plateforme.

**Livrable** : `docs/architecture/domaines/infra-cicd.md`, conforme au template EN52.1.

**Périmètre du domaine** *(repos pivot-core, pivot-infra, tous · pas de schéma métier propre)* :
topologie multi-repo/multi-JVM, gateway nginx (routage par préfixe, egress), pipelines CI/CD
(GitHub Actions, SonarCloud, supply-chain), librairies partagées (`pivot-core-starter`,
`@pivot/ui-core`, `@pivot/design-system`), migration managée GCP (Cloud Run/Cloud SQL). Ce domaine est
**faible en CRUD**, **fort en axe 4**.

## Critères d'acceptation

- [ ] **Axe 1 — CRUD** : constater et **documenter l'absence** de CRUD utilisateur (config = déploiement,
      pas API) ; lister les artefacts gérés hors-runtime (états `modules_state`, secrets d'env).
- [ ] **Axe 2 — Accès par profil** : accès aux plans/infra = `SUPER_ADMIN` / exploitation (hors UI
      utilisateur) ; le formaliser plutôt que le laisser implicite.
- [ ] **Axe 3 — Mécanisme** : routage nginx par préfixe (isolation module), egress ([ADR-012](pathname:///pivot-docs/adr/ADR-012-plan-trafic-gateway-mesh-egress)),
      TLS interne, verrous Flyway par schéma — nommés comme points de contrôle.
- [ ] **Axe 4 — Sources externes** : **section la plus dense** — GitHub (code-scanning/CI, EN51.8),
      registres de dépendances (supply-chain E05), IdP OIDC/JWKS, SMTP, ActiveMQ, GCP managé
      (Cloud SQL/Run) — tous croisés avec le registre EN52.3, avec host dev+prod et secret d'env.
- [ ] Error case + Security : flux egress non maîtrisé, secret en dur, ou source externe active mais
      absente du registre EN52.3 = écarts.
- [ ] `npm run lint` + `npm run build` verts.

## Notes d'implémentation

- Source d'audit : `pivot-infra`, workflows `.github/`, `architecture/platform-overview.md`, ADR-012,
  E05/E07/E17. Cette fiche **alimente en retour** EN52.3 (c'est le domaine qui possède la majorité des
  intégrations externes) — les produire de façon couplée.

---
Item Type: US · Parent: F52.1 · Module: core · Phase: Socle · Size: M · Priority: Medium
Stage: ⬜
Dépendances: EN52.1, EN52.2, EN52.3, E05, E07, E17, ADR-012
