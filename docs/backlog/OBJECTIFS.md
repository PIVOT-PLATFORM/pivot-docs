# Cascade d'objectifs PIVOT

Cadre stratégique qui gouverne la priorisation du backlog. Tout item qui ne contribue pas à au moins un objectif ci-dessous est déplacé en [`BACKLOG-IDEATION/`](BACKLOG-IDEATION/README.md).

---

## Raison d'être

Les organisations qui refusent de confier leurs données et leurs processus à des plateformes SaaS fermées n'ont aujourd'hui que deux options : des outils fragmentés, ou des suites propriétaires auto-hébergeables mais monolithiques et coûteuses en licences. PIVOT existe pour offrir une troisième voie.

---

## Vision

**Devenir la suite collaborative de référence pour les organisations souveraines.**

Horizon 5 ans : PIVOT est le premier choix des PME, ETI et organisations publiques européennes qui veulent un espace de travail collaboratif complet, hébergé sur leur propre infrastructure, et qu'elles peuvent inspecter, modifier et contribuer librement.

---

## Mission

Fournir une suite de travail modulaire, open-source (AGPL v3) et auto-hébergeable qui couvre les besoins de collaboration, de pilotage et d'automatisation d'une organisation — sans lock-in de données, sans abonnement obligatoire, sans dépendance à un éditeur.

---

## Principes directeurs

| Principe | Conséquence produit |
|----------|---------------------|
| **Souveraineté** — les données restent dans l'infrastructure de l'organisation | Pas de telemetry, pas d'appels maison par défaut, export libre à tout moment |
| **Modularité** — chaque module est déployable indépendamment | Architecture multi-repo, SDK plugin ouvert, pas de couplage fort entre modules |
| **Ouverture** — AGPL v3, gouvernance transparente | Code lisible, roadmap publique, décisions d'architecture en ADR versionné |
| **Pertinence sectorielle large** — PME / ETI / collectivités, pas un outil de niche | Éviter les features sectorielles (marchés publics, IP/brevets, corporate venturing) |
| **Incrémentalité** — le Socle est livrable seul avant la phase-3 | Chaque EPIC Socle doit apporter une valeur standalone |

---

## Objectifs stratégiques

### O1 — Livrer un Socle stable et déployable

> Permettre à n'importe quelle organisation de s'auto-héberger PIVOT et de l'utiliser en production.

| Résultat clé | Pilote |
|---|---|
| KR1.1 : Tous les EPICs Socle (E01–E07, E16, E17) en statut `Done` | Sprints 1–12 |
| KR1.2 : Image Docker officielle publiée + Helm chart documenté | E17 — Infrastructure multi-repo |
| KR1.3 : Documentation d'installation reproductible sur une machine vierge | `docs/setup/` |
| KR1.4 : 0 dépendance runtime à un service externe non opt-in | Architecture multi-repo |

**EPICs porteurs** : [E01 Auth IAM](EPIC-auth-iam/README.md), [E02 Admin](EPIC-administration/README.md), [E03 Module System](EPIC-module-system/README.md), [E04 Shell UX](EPIC-shell-ux/README.md) *(numérotation à confirmer)*, [E16 Shell UX](EPIC-shell-ux/README.md), [E17 Infrastructure multi-repo](EPIC-infra-multi-repo/README.md)

---

### O2 — Couvrir le cœur collaboratif en temps réel

> Une équipe peut animer un atelier, tenir un daily standup, et conduire une rétrospective entièrement dans PIVOT.

| Résultat clé | Pilote |
|---|---|
| KR2.1 : Canvas whiteboard collaboratif temps réel (parité noyau Miro/Klaxoon) | E30 — Collaboration / F08.x |
| KR2.2 : Session live avec au moins 3 types d'activité (quiz, poll, brainstorm) | E19 — Module Session |
| KR2.3 : Rétrospective structurée exportable | E20 — Rétrospective |
| KR2.4 : Scrum Poker + Daily Standup utilisables sans configuration préalable | E09, E10 |

**EPICs porteurs** : [E30 Collaboration](EPIC-collaboration/README.md), [E19 Module Session](EPIC-module-session/README.md), [E20 Rétrospective](EPIC-retrospective/README.md), [E09 Scrum Poker](EPIC-scrum-poker/README.md), [E10 Daily Standup](EPIC-daily-standup/README.md), [E11 Capacity Planning](EPIC-capacity-planning/README.md), [E12 MeetOps](EPIC-meetops/README.md), [E14 Roue](EPIC-roue/README.md)

---

### O3 — Offrir le pilotage projet essentiel

> Un chef de projet peut créer, planifier et suivre un projet sans quitter PIVOT.

| Résultat clé | Pilote |
|---|---|
| KR3.1 : Roadmap avec Gantt + jalons + dépendances | E22 — Roadmap |
| KR3.2 : Vue portefeuille multi-projets avec indicateurs RAG | E23 — Portefeuille |
| KR3.3 : Suivi budgétaire de base (budget saisi / consommation réelle) | E26 — Budget |
| KR3.4 : Registre des risques et actions d'atténuation | E27 — Risk |
| KR3.5 : ADR projet collaboratif (décisions de projet) | E21 — ADR Projet |

**EPICs porteurs** : [E22 Roadmap](EPIC-roadmap/README.md), [E23 Portefeuille](EPIC-portefeuille/README.md), [E26 Budget](EPIC-budget/README.md), [E27 Risk](EPIC-risk/README.md), [E21 ADR Projet](EPIC-adr-projet/README.md)

---

### O4 — Automatiser les processus métier courants

> Une organisation peut remplacer ses workflows manuels par des automatisations sans coder.

| Résultat clé | Pilote |
|---|---|
| KR4.1 : Éditeur no-code avec déclencheurs natifs PIVOT (form.submitted, risk.raised…) | E29 — Workflows |
| KR4.2 : Formulaires intégrés avec logique conditionnelle | E42 — Pivot Forms |
| KR4.3 : Au moins 5 types de nœuds d'action (email, webhook, create-entity, assign, notify) | E29 — F29.1 Éditeur |
| KR4.4 : Logs d'exécution consultables par l'administrateur | E29 — F29.4 Fiabilité |

**EPICs porteurs** : [E29 Workflows & Automatisation](EPIC-workflows/README.md), [E42 Pivot Forms](EPIC-pivot-forms/README.md)

---

### O5 — Construire un écosystème d'intégrations OSS

> PIVOT s'intègre proprement dans un environnement outillé sans imposer ses propres outils.

| Résultat clé | Pilote |
|---|---|
| KR5.1 : Adaptateurs certifiés pour delivery agile (Jira-like, Linear-like) | E28 — F28.1 |
| KR5.2 : Connecteur BI (Metabase / Grafana) | E28 — F28.4 |
| KR5.3 : Adaptateurs formulaires & sondages (Formbricks / LimeSurvey) | E28 — F28.8 |
| KR5.4 : SDK d'intégration documenté (ADR-009) | E28 — EN28.x |

**EPICs porteurs** : [E28 Intégration open source](EPIC-integration-open-source/README.md) — F28.1, F28.2, F28.3, F28.4, F28.5, F28.7, F28.8

---

### O6 — Garantir une adoption pérenne

> PIVOT est adoptable par une organisation sans expertise PIVOT préalable.

| Résultat clé | Pilote |
|---|---|
| KR6.1 : Onboarding in-app pour chaque module (sans lire la doc) | E41 — Formation & Onboarding |
| KR6.2 : Espace compte (profil, préférences, notifications) | E24 — Espace compte *(à confirmer)* |
| KR6.3 : Export des données dans un format ouvert (CSV, JSON, Markdown) | Non-objectif lock-in |
| KR6.4 : RGPD by design — registre des traitements documenté | E43 — Sécurité, ADR-015–016 |

**EPICs porteurs** : [E41 Formation & Onboarding](EPIC-formation-onboarding/README.md), [E43 Sécurité & Zero Trust](EPIC-securite/README.md)

---

## Carte objectifs ↔ domaines

```text
Socle (O1)
  ├─ Auth / IAM (E01)
  ├─ Admin & tenant (E02)
  ├─ Système modules (E03)
  ├─ Shell UX (E16)
  └─ Infrastructure (E17)

Collaboratif (O2)
  ├─ Whiteboard (E30 / F08.x)
  ├─ Session live (E19)
  ├─ Rétrospective (E20)
  ├─ Scrum Poker (E09)
  ├─ Daily Standup (E10)
  ├─ Capacity Planning (E11)
  ├─ MeetOps (E12)
  └─ Roue (E14)

Pilotage (O3)
  ├─ Roadmap (E22)
  ├─ Portefeuille (E23)
  ├─ Budget (E26)
  ├─ Risk (E27)
  └─ ADR Projet (E21)

Automatisation (O4)
  ├─ Workflows (E29)
  └─ Pivot Forms (E42)

Intégrations OSS (O5)
  └─ E28 — F28.1/2/3/4/5/7/8

Adoption (O6)
  ├─ Formation / Onboarding (E41)
  └─ Sécurité (E43)

Phase-3 (non priorisé Socle)
  ├─ OKR (E-okr)
  ├─ Pilotage innovation (E38)
  ├─ SignDoc (E44)
  ├─ PDF Manager (E45)
  ├─ Feedback (E46)
  ├─ Mini-jeux (E47)
  └─ Assistant IA (E48)
```

---

## Non-objectifs — périmètre explicitement exclu

Ces items ne contribuent à aucun des 6 objectifs stratégiques. Ils sont en [`BACKLOG-IDEATION/`](BACKLOG-IDEATION/README.md) et ne seront pas implémentés sauf décision explicite du mainteneur.

| Hors périmètre | Raison d'exclusion | Items en idéation |
|---|---|---|
| **Marchés publics / Commande publique** | Niche sectorielle incompatible avec le positionnement B-all | [E25](BACKLOG-IDEATION/EPIC-commande-publique/README.md) |
| **Gestionnaire de brevets (INPI/EPO)** | Outil juridique spécialisé hors domaine collaboration | US38.7.1 |
| **Corporate venturing & deal flow M&A** | Finance d'investissement, hors scope PME | US38.13.2, US38.13.4 |
| **Marchés prédictifs d'idées / sérendipité** | Trop académique, bénéfice non démontré en production | [F38.14](BACKLOG-IDEATION/README.md) |
| **SCM & CI/CD (GitLab CE, Forgejo)** | Outillage développeur, pas collaboration métier | [F28.10](BACKLOG-IDEATION/README.md) |
| **Plateforme développeur (scorecards, TechDocs)** | Outillage Platform Engineering, hors cible | [F28.11](BACKLOG-IDEATION/README.md) |
| **Doublons avec modules natifs** (PPM natif E22/E23, whiteboard natif E30) | L'adaptateur OSS est redondant si le natif couvre le besoin | [F28.6](BACKLOG-IDEATION/README.md), [F28.9](BACKLOG-IDEATION/README.md) |
| **RPA desktop & process mining** | Outillage spécialisé (UiPath/Power Automate), hors scope | [F29.10](BACKLOG-IDEATION/README.md) |
| **Chantiers SI (transformation organisationnelle)** | Méta-gouvernance, pas une feature produit | [F29.14](BACKLOG-IDEATION/README.md) |
| **Budgets secteur public (PPI, AP/CP, subventions)** | Niche comptabilité publique française | US26.2.2, US26.2.5, US26.2.6 |
| **Interface ERP finance** | Intégration lourde, dépendance externe majeure | US26.2.4 |
| **Indicateurs valeur publique** | Terminologie et besoins secteur public uniquement | US23.2.9, US23.2.10 |
| **Traduction simultanée & pont physique-numérique** | Spéculatif, infrastructure non définie | US30.14.3, US30.14.5 |

---

*Cascade mise à jour : 2026-07-09 — issue du nettoyage backlog (2 passes, [PR #164](https://github.com/PIVOT-PLATFORM/pivot-docs/pull/164)).*
