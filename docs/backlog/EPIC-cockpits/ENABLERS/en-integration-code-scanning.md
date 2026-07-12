# EN51.8 — Intégration GitHub Code-Scanning (sécurité comme donnée)

**Type d'enabler** : sécurité / intégration

**Objectif technique** : Remonter les sorties de sécurité déjà produites en CI (Trivy SCA, CodeQL,
Dependabot, SBOM CycloneDX, DAST ZAP) — aujourd'hui confinées à l'onglet GitHub Code-Scanning et aux
artefacts de release — sous forme de **donnée consommable** par une card (correctifs de sécurité en
attente, posture de sécurité).

**Justification** : Les scans **existent et tournent** (EPIC E05), mais **aucun endpoint applicatif**
ne les expose. Sans cette intégration, les cards C5 « correctifs en attente » et « posture » n'ont
pas de source, alors que la donnée est là.

**Critères de complétion** :
- [ ] Connecteur vers l'API GitHub Code-Scanning / Dependabot alerts (par repo de l'org).
- [ ] Agrégat par sévérité (critique / haute / …) et par repo, exposé via endpoint interne.
- [ ] Rafraîchissement périodique (pas d'appel synchrone à chaque rendu de card).
- [ ] Secret d'accès GitHub géré via le gestionnaire de secrets (EN07.2), jamais en clair.
- [ ] Donnée 🔴 (Sensible) : réservée à l'interne, masquée aux externes (matrice EN51.3/EN51.5).

## Notes

- Alternative envisageable : ingestion des SARIF en artefacts plutôt qu'API live — à trancher au
  Gate 1 selon la fraîcheur requise par la card.

---
Item Type: Enabler · Parent: E51 · Type: securite · Module: core · Phase: phase-3
Stage: ⬜ · Priority: Medium
Dépendances: E05 (scans CI existants), EN07.2 (secret management)
