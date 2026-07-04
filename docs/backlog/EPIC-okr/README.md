# E27 — OKR

> Module de capacité du **domaine Pilotage** (E18) — cf. [ADR-008 Domaines composables & cockpits](pathname:///pivot-docs/adr/ADR-008-domaines-modules-cockpits).

## Objectif

Piloter par les **OKR** (Objectives & Key Results) de bout en bout : définition, **alignement** multi-niveaux, **check-ins** et confiance, **scoring** de fin de cycle, **CFR** (Conversations, Feedback, Recognition) et lien avec l'exécution (initiatives, roadmap, portefeuille). Objectif : un module **au niveau de l'état de l'art** (Google/Doerr, *Measure What Matters*), comparable à Quantive / Workboard / Viva Goals / Perdoo / Weekdone / Betterworks.

## Principes (état de l'art)

- **Objective** = *qualitatif*, inspirant, borné dans le temps. **Key Results** = *quantitatifs*, mesurables (**3–5 par O**), types **métrique / jalon / booléen / %** avec baseline → cible et **pondération**.
- **Engageant (committed, cible 1.0)** vs **aspirationnel (moonshot, cible ~0.7)** — le stretch est explicite.
- **Scoring 0.0–1.0** : avancement borné, agrégation **pondérée** au niveau objectif ; *sweet spot* 0.6–0.7 pour l'aspirationnel.
- **Cadence** : cycles **trimestriels + annuels**, **check-in hebdomadaire** (valeur + **niveau de confiance** + commentaire), **statut** ON_TRACK / AT_RISK / OFF_TRACK / DONE calculé par le **rythme attendu**.
- **Alignement** top-down **et** bottom-up : arbre O↔O, KR → O parent, entreprise → équipe → individu ; **transparence par défaut**.
- **CFR** (Doerr) : les OKR vivent par le **dialogue** (1:1, feedback, reconnaissance), pas par le seul reporting.
- **Séparer les résultats des actions** : les KR mesurent des *résultats*, les **initiatives** portent le *« comment »* (lien delivery).
- **Garde-fous** : OKR ≠ liste de tâches · 3–5 O / 3–5 KR · pas de *sandbagging* · **découplage de la rémunération** · **RGPD** pour les OKR individuels.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage` partagé du domaine, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "MVP terminé" par le mainteneur

## Périmètre GitHub (phase-3)

### Features
- **F27.1 — Objectifs & Key Results (socle)** — US27.1.1 créer OKR · US27.1.2 suivre KR · US27.1.3 types de KR (métrique/jalon/booléen, pondération) · US27.1.4 engageant vs aspirationnel + garde-fous
- **F27.2 — Cadence & cycles** — US27.2.1 cycles (trimestriel/annuel) · US27.2.2 périodes imbriquées & report
- **F27.3 — Alignement** — US27.3.1 arbre d'alignement · US27.3.2 entreprise→équipe→individu (top-down/bottom-up) · US27.3.3 carte d'alignement & dépendances
- **F27.4 — Check-ins & confiance** — US27.4.1 check-in périodique · US27.4.2 statut & tendance · US27.4.3 rappels
- **F27.5 — Scoring & clôture** — US27.5.1 scoring 0.0–1.0 · US27.5.2 clôture & grading · US27.5.3 rétrospective OKR
- **F27.6 — Initiatives & lien delivery** — US27.6.1 initiatives ↔ KR · US27.6.2 interfaces pilotage (roadmap E22 / portefeuille E23 / risques E21)
- **F27.7 — CFR** — US27.7.1 conversations & 1:1 · US27.7.2 feedback & reconnaissance
- **F27.8 — Intégrations & auto-update KR** — US27.8.1 mise à jour auto des KR (BI/API/tableur) · US27.8.2 import/export & format ouvert
- **F27.9 — Tableaux de bord & restitutions** — US27.9.1 dashboards (mes/équipe/entreprise/à risque/heatmap) · US27.9.2 export & rapports de comité
- **F27.10 — Gouvernance & bonnes pratiques** — US27.10.1 découplage rémunération & transparence · US27.10.2 RGPD & confidentialité des OKR individuels

### Enablers
- **[EN27.1](ENABLERS/en-modele-okr-moteur.md)** — Modèle OKR & moteur (scoring, statut, alignement, connecteurs) — gouvernance-by-design
- Partagés domaine : **EN18.1** (schéma `pilotage`) · **EN18.2** (guard)

## Modules impactés

`pilotage` (pivot-pilotage-core + pivot-pilotage-ui)

## Dépendances

- Dépend de : E03 Système de modules · E17 Infrastructure multi-repo · E15 Équipes transverses · E18 Domaine Pilotage (EN18.1/EN18.2)
- Interface avec : **E22 Roadmap** (initiatives/projets), **E23 Portefeuille**, **E21 Risques** — via bus PIVOT + deep-links (ADR-006/008)

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers** | |
| [EN27.1 — Modèle OKR & moteur](ENABLERS/en-modele-okr-moteur.md) | ⬜ |
| **F27.1 — Objectifs & Key Results (socle)** | |
| [US27.1.1 — Créer des objectifs et résultats-clés (OKR)](FEATURES/okr/us-creer-objectif.md) | ⬜ |
| [US27.1.2 — Mettre à jour et suivre l'avancement des Key Results](FEATURES/okr/us-suivre-kr.md) | ⬜ |
| [US27.1.3 — Types de Key Results (métrique, jalon, booléen)](FEATURES/okr/us-types-key-results.md) | ⬜ |
| [US27.1.4 — OKR engageant vs aspirationnel + garde-fous](FEATURES/okr/us-committed-vs-aspirational.md) | ⬜ |
| **F27.2 — Cadence & cycles** | |
| [US27.2.1 — Cycles OKR (trimestriel / annuel)](FEATURES/cadence-cycles/us-cycles-okr.md) | ⬜ |
| [US27.2.2 — Périodes imbriquées & report](FEATURES/cadence-cycles/us-periodes-imbriquees-report.md) | ⬜ |
| **F27.3 — Alignement** | |
| [US27.3.1 — Arbre d'alignement](FEATURES/alignement/us-arbre-alignement.md) | ⬜ |
| [US27.3.2 — Alignement entreprise → équipe → individu](FEATURES/alignement/us-alignement-entreprise-equipe-individu.md) | ⬜ |
| [US27.3.3 — Carte d'alignement & dépendances](FEATURES/alignement/us-carte-alignement.md) | ⬜ |
| **F27.4 — Check-ins & confiance** | |
| [US27.4.1 — Check-in périodique](FEATURES/check-ins/us-check-in-periodique.md) | ⬜ |
| [US27.4.2 — Statut & tendance](FEATURES/check-ins/us-statut-tendance.md) | ⬜ |
| [US27.4.3 — Rappels de check-in](FEATURES/check-ins/us-rappels-check-in.md) | ⬜ |
| **F27.5 — Scoring & clôture** | |
| [US27.5.1 — Scoring 0.0–1.0](FEATURES/scoring-cloture/us-scoring.md) | ⬜ |
| [US27.5.2 — Clôture de cycle & grading](FEATURES/scoring-cloture/us-cloture-grading.md) | ⬜ |
| [US27.5.3 — Rétrospective OKR](FEATURES/scoring-cloture/us-retrospective-okr.md) | ⬜ |
| **F27.6 — Initiatives & lien delivery** | |
| [US27.6.1 — Lier des initiatives / projets aux KR](FEATURES/initiatives-delivery/us-initiatives-kr.md) | ⬜ |
| [US27.6.2 — Interfaces OKR ↔ pilotage](FEATURES/initiatives-delivery/us-interfaces-pilotage.md) | ⬜ |
| **F27.7 — CFR** | |
| [US27.7.1 — Conversations & 1:1 liées aux OKR](FEATURES/cfr/us-conversations-1a1.md) | ⬜ |
| [US27.7.2 — Feedback & reconnaissance](FEATURES/cfr/us-feedback-reconnaissance.md) | ⬜ |
| **F27.8 — Intégrations & auto-update KR** | |
| [US27.8.1 — Mise à jour automatique des KR](FEATURES/integrations/us-auto-update-kr.md) | ⬜ |
| [US27.8.2 — Import / export & format ouvert](FEATURES/integrations/us-import-export-format-ouvert.md) | ⬜ |
| **F27.9 — Tableaux de bord & restitutions** | |
| [US27.9.1 — Tableaux de bord OKR](FEATURES/dashboards/us-dashboards-okr.md) | ⬜ |
| [US27.9.2 — Export & rapports de comité](FEATURES/dashboards/us-export-rapports-comite.md) | ⬜ |
| **F27.10 — Gouvernance & bonnes pratiques** | |
| [US27.10.1 — Découplage rémunération & transparence](FEATURES/gouvernance-bonnes-pratiques/us-decouplage-remuneration-transparence.md) | ⬜ |
| [US27.10.2 — RGPD & confidentialité des OKR individuels](FEATURES/gouvernance-bonnes-pratiques/us-rgpd-confidentialite-okr.md) | ⬜ |
