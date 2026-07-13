# EN07.15 — Validation des AC contre la recette réelle (Gate 6)

**Type d'enabler** : CI/CD · tests d'acceptation · qualité

**Problème résolu** : les Gates 1→5 sont pré-merge et s'appuient sur des tests **éphémères** —
Gate 2 (coverage) et `e2e.yml` montent une stack jetable dans le runner et **mockent** le backend
(`page.route`). Rapide et bloquant, mais ne prouve rien sur l'**infra réellement déployée**.
[EN07.6](en-gcp-hosting-iac.md) l'a confirmé empiriquement : le premier déploiement réel a mis en
évidence plusieurs bugs de [EN07.1](en-docker-compose-prod.md)/[EN07.5](en-deploy-ci.md) jamais
visibles avant un déploiement réel (SMTP STARTTLS, chemin d'image GHCR doublé, healthcheck
Actuator…). Gate 6 automatise la recette qu'un PO ferait à la main sur le site déployé.

**Portée** : un workflow `e2e-recette.yml` **par repo UI** (`pivot-ui` shell +
`pivot-agilite-ui`/`pivot-collaboratif-ui`/`pivot-pilotage-ui`), chacun validant ses propres AC
au plus près de l'US (vision PO), contre `https://recette.pivot-platform.fr`.

**Critères de complétion** :
- [ ] Workflow `e2e-recette.yml` déclenché sur `workflow_run` du **Deploy** concluant `success`
      (donc après le smoke test `/health` de [EN07.5](en-deploy-ci.md)) + `workflow_dispatch`.
      **Jamais sur PR** : recette est partagée, jouer des AC qui écrivent à chaque PR créerait des
      courses de données. La validation éphémère par PR reste `e2e.yml`.
- [ ] Projets Playwright `recette-setup` (login unique du compte de recette dédié → `storageState`)
      + `recette` (`baseURL` = site réel). Le projet mocké existant reste scopé à `./e2e` — aucune
      fuite inter-projets.
- [ ] Login réel via un **compte + tenant de test dédiés** (secrets `RECETTE_E2E_*`) — jamais un
      compte réel. Les AC destructifs créent leurs données sur le tenant de test et les nettoient
      en `afterEach`/`afterAll`.
- [ ] Traçabilité inchangée (skill `pivot-ac-traceability`) : chaque spec recette porte
      l'identifiant de l'AC (`AC-{module}-{n}`) — la preuve vaut sur l'infra réelle, pas en mock.
- [ ] En cas d'échec : alerte post-déploiement (rapport Playwright en artefact + onglet
      Environments/Deployments), ouverture d'une US/`fix` traçant l'écart AC ↔ comportement réel.
      Ce n'est pas un blocage de merge (le merge a déjà eu lieu) mais la détection des régressions
      **fonctionnelles** que le smoke test `/health` de EN07.5 ne voit pas.

**Secrets/vars à créer par le mainteneur (gap externe)** : `RECETTE_E2E_EMAIL`,
`RECETTE_E2E_PASSWORD`, `RECETTE_E2E_TENANT` (compte + tenant de test dédiés), Environment GitHub
`recette`, `RECETTE_BASE_URL` (optionnel, défaut `https://recette.pivot-platform.fr`).

**Dépendance — migration Cloud Run** : se branche sur le workflow `Deploy` (VM,
[EN07.5](en-deploy-ci.md)) qui sert `recette.pivot-platform.fr` aujourd'hui. Quand la recette
bascule sur Cloud Run ([EN07.12](en-bascule-cloud-manage.md)), rebrancher le `workflow_run` sur le
workflow de déploiement managé.

**Documentation process** : Gate 6 — Recette Acceptance, `docs/workflow/README.md`.

**PR** : `pivot-ui#195` (référence, shell) + PR par repo module.

**Statut** : 🔎 En cours — référence shell ouverte (draft, Gate 6), modules en cours, secrets en
gap externe documenté.

---
Item Type: Enabler · Parent: E07 · Type: CI/CD · Module: core · Phase: Socle
Stage: ⬜ · Priority: High
