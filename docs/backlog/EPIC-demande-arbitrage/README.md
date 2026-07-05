# E31 — Demande & arbitrage

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](pathname:///pivot-docs/backlog/EPIC-formation-onboarding/) (US41.5.20).*

## Objectif
Module-EPIC du **Domaine Pilotage** ([E18](../EPIC-pilotage/README.md)) — capacité « Demande & arbitrage » issue du benchmark PPM secteur public (Project Monitor / Sciforma / Microsoft Project).

## Repo cible (architecture multi-repo)
- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage`, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase
⏸️ **phase-3** — VERROUILLÉ · AC issus du benchmark, à affiner au Gate 1 PO Agent

## Origine
Généré depuis le CSV benchmark (famille Pilotage, items `PP-###`). Voir la rationalisation dans [`BENCHMARK.md`](pathname:///pivot-docs/backlog/BENCHMARK).

> ⚠️ **Dissous dans la v2 adaptative.** La mise à jour PPM v2 ne conserve pas l'épique « Demande & arbitrage » telle quelle :
> - **Scénarios what-if** (PP-036) et **Business cases dynamiques** (PP-037) → déplacés vers [E23 Portefeuille & comités](../EPIC-portefeuille/README.md) (US23.2.7 / US23.2.8).
> - **Gestion de la demande** (PP-013), **Scoring multicritère** (PP-014), **Capacité à faire** (PP-015), **Approche 'tout est projet'** (PP-049) → **non repris dans la v2**, conservés ici pour mémoire (à confirmer). « Capacité à faire » était signalé critique (Insight I3).

## Dépendances
- Dépend de : E03 Système de modules · E17 Infrastructure multi-repo · E18 Domaine Pilotage (ombrelle)

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **F31.1 — Demande & arbitrage** *(hors v2 — à confirmer)* | |
| [US31.1.1 — Gestion de la demande](FEATURES/demande-arbitrage/us-gestion-demande.md) ⚠️ hors v2 | ⬜ |
| [US31.1.2 — Scoring multicritère](FEATURES/demande-arbitrage/us-scoring-multicritere.md) ⚠️ hors v2 | ⬜ |
| [US31.1.3 — Capacité à faire](FEATURES/demande-arbitrage/us-capacite-a-faire.md) ⚠️ hors v2 | ⬜ |
| [US31.1.6 — Approche 'tout est projet'](FEATURES/demande-arbitrage/us-tout-est-projet.md) ⚠️ hors v2 | ⬜ |

> Déplacés en v2 → E23 : US23.2.7 Scénarios what-if · US23.2.8 Business cases dynamiques.
