# E40 — Profil & adaptation

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](pathname:///pivot-docs/backlog/EPIC-formation-onboarding/) (US41.5.29).*

## Objectif

Module-EPIC du **Domaine Pilotage** ([E18](../EPIC-pilotage/README.md)) — **couche adaptative** issue de la synthèse v2 du backlog PPM. Le **profil d'organisation** (TPE, PME, Grand groupe, Privée sous droit public, Publique, État) pilote l'**activation des modules**, la **classe de souveraineté** et le **niveau de rigueur**, pour éviter la sur-ingénierie (TPE) comme le sous-équipement (État).

## Repo cible (architecture multi-repo)

- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage`, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ · AC issus de la synthèse v2, à affiner au Gate 1 PO Agent

## Origine

Nouveau dans la **v2 adaptative** du backlog PPM (`PP-A01…A06`). Introduit la dimension
**`Profils_applicables`** portée par chaque US du domaine Pilotage. Voir [`BENCHMARK.md`](pathname:///pivot-docs/backlog/BENCHMARK).

## Dépendances

- Dépend de : E03 Système de modules · E17 Infrastructure multi-repo · E18 Domaine Pilotage · EN18.9 (modèle Application→Projet)

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **F40.1 — Profil & adaptation** | |
| [US40.1.1 — Profil d'organisation](FEATURES/profil-adaptation/us-profil-organisation.md) | ⬜ |
| [US40.1.2 — Activation des modules par profil](FEATURES/profil-adaptation/us-activation-modules-par-profil.md) | ⬜ |
| [US40.1.3 — Classe de souveraineté par profil](FEATURES/profil-adaptation/us-classe-souverainete-par-profil.md) | ⬜ |
| [US40.1.4 — Modularité & montée en gamme](FEATURES/profil-adaptation/us-modularite-montee-en-gamme.md) | ⬜ |
| [US40.1.5 — Articulation capillarité + pilotage](FEATURES/profil-adaptation/us-articulation-capillarite-pilotage.md) | ⬜ |
| [US40.1.6 — Pack double contrainte](FEATURES/profil-adaptation/us-pack-double-contrainte.md) | ⬜ |
