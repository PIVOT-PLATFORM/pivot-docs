# E43 — Sécurité & Zero Trust

## Objectif

Relier des dizaines de modules — internes et externes via API — sans que le portail ne devienne le maillon dont la compromission donne tout le SI. Un portail qui agrège des modules concentre les identités, les accès et les données : c'est structurellement la cible la plus rentable du SI, juste après l'annuaire. Trois principes directeurs gouvernent cette EPIC :

- **Zero Trust** — aucune confiance implicite liée au réseau ; chaque requête (y compris interne) est authentifiée, autorisée, chiffrée.
- **Defense in Depth** — plusieurs contrôles indépendants en profondeur ; aucune brèche unique ne donne tout.
- **Assume Breach** — on conçoit en supposant qu'un module sera compromis ; l'objectif est de contenir le rayon d'explosion.

La sécurité n'est pas une couche ajoutée : c'est la **fonction du tissu conjonctif** (adaptateurs, passerelle, maillage) qui relie les modules — natifs comme OSS (cf. [E28](pathname:///pivot-docs/backlog/EPIC-integration-open-source/)).

## Phase

⏸️ **phase-3** — dépend de l'acceptation des ADR Sécurité (ADR-015 à ADR-020, statut Proposé).

## Périmètre GitHub (phase-3)

### Enablers — topologie en couches

- **EN43.1** — [BFF (Backend for Frontend)](ENABLERS/en-bff.md)
- **EN43.2** — [API Gateway (nord-sud)](ENABLERS/en-api-gateway.md)
- **EN43.3** — [Service Mesh (est-ouest, mTLS)](ENABLERS/en-service-mesh.md)
- **EN43.4** — [Egress Gateway (sortant)](ENABLERS/en-egress-gateway.md)

### Enablers — plan de contrôle transverse

- **EN43.5** — [Identité](ENABLERS/en-plan-controle-identite.md)
- **EN43.6** — [Secrets (OpenBao)](ENABLERS/en-plan-controle-secrets.md)
- **EN43.7** — [Autorisation externalisée (policy-as-code)](ENABLERS/en-autorisation-externalisee.md)
- **EN43.8** — [Observabilité + SIEM](ENABLERS/en-observabilite-siem.md)

### Enablers — gouvernance & résilience

- **EN43.9** — [Validation & assainissement des entrées externes](ENABLERS/en-validation-entrees-externes.md)
- **EN43.10** — [Résilience & dégradation gracieuse](ENABLERS/en-resilience-degradation.md)
- **EN43.11** — [Classification de souveraineté (zones A/B/C)](ENABLERS/en-classification-souverainete.md)
- **EN43.12** — [Modèle de menace](ENABLERS/en-modele-menace.md)
- **EN43.13** — [Checklist de sécurité d'admission d'un module](ENABLERS/en-checklist-admission-module.md)

Pas de Feature dans cette EPIC — travail 100 % transverse/architectural (comme [E05](../EPIC-cicd-supply-chain/README.md), [E07](../EPIC-infrastructure/README.md), [E17](../EPIC-infra-multi-repo/README.md)), consommé par tous les autres modules plutôt que porteur de valeur utilisateur directe.

## Modèle de menace (synthèse)

| Menace | Où | Contre-mesure principale |
|---|---|---|
| Vol de token / usurpation | Identité | Token exchange court, mTLS, MFA, rotation (EN43.5, EN01.13) |
| Exposition de données par agrégation | Portail/BFF | Minimisation, BFF sans stockage, autorisation fine (EN43.1, EN43.7) |
| SSRF / pivot sortant | Modules → externe | Egress gateway + allowlist, pas d'appel direct (EN43.4) |
| Injection (prompt, entrées externes) | Entrées & réponses externes | Validation/assainissement, frontière instruction/donnée (EN43.9) |
| Exfiltration vers classe C | API externes | Classification + blocage par politique (EN43.7, EN43.11) |
| Chaîne d'approvisionnement | Modules OSS | SBOM, artefacts signés, scan continu, gouvernance forks (EN28.12/13) |
| Sur-privilège / insider | Autorisation | Moindre privilège, ABAC, audit de chaque accès (EN43.7, EN43.8) |
| Défaillance en cascade | Est-ouest & sortant | Circuit breakers, bulkheads, bus async, mode dégradé (EN43.10) |
| Fuite de credential externe | Secrets | OpenBao, secrets dynamiques, révocation en un geste (EN43.6) |

Détail complet : [EN43.12 — Modèle de menace](ENABLERS/en-modele-menace.md).

## Hors périmètre

- Choix du produit de Service Mesh (Istio/Linkerd) et du moteur de politique (OPA/Cedar) : arbitrage technique laissé aux ADR Sécurité (ADR-015 à ADR-020), pas figé au niveau backlog.
- Détails d'implémentation SPIFFE/SPIRE : relèvent de l'implémentation d'EN43.3, pas du cadrage.

## Dépendances

- Dépend de : ADR-004 (identité), ADR-009 (contrat PivotAdapter, six capacités)
- Interface avec : [E01 — Auth & IAM](../EPIC-auth-iam/README.md) (EN01.13 Token Exchange), [E07 — Infrastructure](../EPIC-infrastructure/README.md) (EN07.11 mTLS interne), [E28 — Intégration open source](pathname:///pivot-docs/backlog/EPIC-integration-open-source/) (EN28.3/4/12/13, checklist d'admission étendue par EN43.13)
- Bloque : tout module (natif ou adaptateur) qui souhaite manipuler des données sensibles doit satisfaire EN43.13 avant de sortir du mode Lien

## Statut global

⬜ Backlog — bloqué tant que les ADR Sécurité ne sont pas Acceptées.

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers — topologie en couches** | |
| [EN43.1 — BFF](ENABLERS/en-bff.md) | ⬜ |
| [EN43.2 — API Gateway (nord-sud)](ENABLERS/en-api-gateway.md) | ⬜ |
| [EN43.3 — Service Mesh (est-ouest, mTLS)](ENABLERS/en-service-mesh.md) | ⬜ |
| [EN43.4 — Egress Gateway (sortant)](ENABLERS/en-egress-gateway.md) | ⬜ |
| **Enablers — plan de contrôle transverse** | |
| [EN43.5 — Identité](ENABLERS/en-plan-controle-identite.md) | ⬜ |
| [EN43.6 — Secrets (OpenBao)](ENABLERS/en-plan-controle-secrets.md) | ⬜ |
| [EN43.7 — Autorisation externalisée](ENABLERS/en-autorisation-externalisee.md) | ⬜ |
| [EN43.8 — Observabilité + SIEM](ENABLERS/en-observabilite-siem.md) | ⬜ |
| **Enablers — gouvernance & résilience** | |
| [EN43.9 — Validation & assainissement des entrées externes](ENABLERS/en-validation-entrees-externes.md) | ⬜ |
| [EN43.10 — Résilience & dégradation gracieuse](ENABLERS/en-resilience-degradation.md) | ⬜ |
| [EN43.11 — Classification de souveraineté (zones A/B/C)](ENABLERS/en-classification-souverainete.md) | ⬜ |
| [EN43.12 — Modèle de menace](ENABLERS/en-modele-menace.md) | ⬜ |
| [EN43.13 — Checklist de sécurité d'admission d'un module](ENABLERS/en-checklist-admission-module.md) | ⬜ |
