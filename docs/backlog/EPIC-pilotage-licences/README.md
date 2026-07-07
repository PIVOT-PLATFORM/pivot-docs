# E37 — Licences & réversibilité (pilotage)

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](pathname:///pivot-docs/backlog/EPIC-formation-onboarding/) (US41.5.26).*

## Objectif
Module-EPIC du **Domaine Pilotage** ([E18](../EPIC-pilotage/README.md)), issue du benchmark PPM secteur public (Project Monitor / Sciforma / Microsoft Project). Modèle commercial et garanties anti-lock-in du domaine Pilotage : **segmentation des licences** par taille d'organisation, **offre d'entrée incluse/gratuite**, **réversibilité contractuelle**, **format d'échange ouvert** pour la portabilité des données, et **garanties de pérennité** de l'éditeur.

## Repo cible (architecture multi-repo)
- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage`, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase
⏸️ **phase-3** — VERROUILLÉ · AC issus du benchmark, à affiner au Gate 1 PO Agent

## Origine
Généré depuis le CSV benchmark (famille Pilotage, items `PP-###`), rationalisé directement dans le README d'[E18 — Domaine Pilotage](../EPIC-pilotage/README.md) — le document source `BENCHMARK.md` n'a jamais été mergé sur `main` (ex-PR #38).

## Dépendances
- Dépend de : E03 Système de modules · E17 Infrastructure multi-repo · E18 Domaine Pilotage (ombrelle)

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **F37.1 — Licences & réversibilité (pilotage)** | |
| [US37.1.2 — Garanties de pérennité](FEATURES/licences-reversibilite/us-garanties-perennite.md) | ⬜ |
| [US37.1.4 — Offre d'entrée incluse](FEATURES/licences-reversibilite/us-offre-entree-incluse.md) | ⬜ |
| [US37.1.5 — Format d'échange ouvert](FEATURES/licences-reversibilite/us-format-echange-ouvert.md) *(ex-E38)* | ⬜ |
| [US37.1.1 — Réversibilité contractuelle](FEATURES/licences-reversibilite/us-reversibilite-contractuelle.md) | ⬜ |
| [US37.1.3 — Segmentation des licences](FEATURES/licences-reversibilite/us-segmentation-licences.md) | ⬜ |
