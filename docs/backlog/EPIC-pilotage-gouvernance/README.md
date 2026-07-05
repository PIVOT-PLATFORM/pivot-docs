# E35 — Gouvernance & sécurité (pilotage)

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](pathname:///pivot-docs/backlog/EPIC-formation-onboarding/) (US41.5.24).*

## Objectif
Module-EPIC du **Domaine Pilotage** ([E18](../EPIC-pilotage/README.md)) — capacité « Gouvernance & sécurité (pilotage) » issue du benchmark PPM secteur public (Project Monitor / Sciforma / Microsoft Project).

## Repo cible (architecture multi-repo)
- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage`, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase
⏸️ **phase-3** — VERROUILLÉ · AC issus du benchmark, à affiner au Gate 1 PO Agent

## Origine
Généré depuis le CSV benchmark (famille Pilotage, items `PP-###`). Voir la rationalisation dans [`BENCHMARK.md`](pathname:///pivot-docs/backlog/BENCHMARK).

## Dépendances
- Dépend de : E03 Système de modules · E17 Infrastructure multi-repo · E18 Domaine Pilotage (ombrelle)

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **F35.1 — Gouvernance & sécurité (pilotage)** | |
| [US35.1.5 — Classification des portefeuilles](FEATURES/gouvernance-securite/us-classification-portefeuilles.md) | ⬜ |
| [US35.1.1 — Droits par rôle et périmètre](FEATURES/gouvernance-securite/us-droits-role-perimetre.md) | ⬜ |
| [US35.1.6 — Étiquettes et DLP sur tâches](FEATURES/gouvernance-securite/us-etiquettes-dlp-taches.md) | ⬜ |
| [US35.1.7 — Portail de transparence](FEATURES/gouvernance-securite/us-portail-transparence.md) *(ex-E38)* | ⬜ |
| [US35.1.8 — Archivage probant](FEATURES/gouvernance-securite/us-archivage-probant.md) *(ex-E38)* | ⬜ |
| [US35.1.2 — Registre des risques](FEATURES/gouvernance-securite/us-registre-risques.md) | ⬜ |
| [US35.1.4 — SSO et audit](FEATURES/gouvernance-securite/us-sso-audit.md) | ⬜ |
| [US35.1.3 — Traçabilité des décisions](FEATURES/gouvernance-securite/us-tracabilite-decisions.md) | ⬜ |
