# E41 — Formation & Onboarding

## Objectif

Former les utilisateurs et **faire adopter Pivot** — dans l'outil et hors de l'outil : **onboarding in-app** (tours guidés, aide contextuelle, checklists), **supports** (guides, vidéos, e-learning), **présentiel** (réseau de référents, kit d'animation, sessions live, certification) et **mesure de l'adoption**. Chaque module se branche sur un **framework commun** (EN41.1) et dispose de son propre parcours (catalogue F41.5).

> L'adoption est un **projet**, pas un déploiement (Insight I8 du benchmark) : formation, réseau d'animateurs et mesure d'usage réel conditionnent le succès.

## Repo cible (architecture multi-repo)

- Framework in-app : **`@pivot/ui-core`** (shell E16) — moteur tours/tooltips/checklists
- Contenu & LMS : **`pivot-core`** (schéma `core`) — supports, parcours, mesures
- **Pré-requis EN17** : pivot-core-starter + @pivot/ui-core publiés

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "Socle terminé" par le mainteneur

## Périmètre

### Features
- **F41.1 — Onboarding in-app** : tour guidé, tooltips & aide contextuelle, checklist de démarrage & empty states, « quoi de neuf »
- **F41.2 — Centre d'aide & base de connaissances** : centre d'aide in-app, aide contextuelle par écran
- **F41.3 — Supports de formation** : bibliothèque (guides/vidéos/tutoriels), parcours e-learning & export SCORM/LMS
- **F41.4 — Formation présentielle & réseau de référents** : réseau de référents & parcours formateur, kit + **sessions live (E19)**, certification & communauté
- **F41.5 — Onboarding par module (catalogue)** : un parcours d'onboarding in-app **par module fonctionnel** (29 modules, US41.5.1–19 · 21–30 — numérotation conservée avec un trou en US41.5.20, cf. Notes ci-dessous), branché sur EN41.1
- **F41.6 — Mesure de l'adoption** : complétion & taux d'adoption, funnel d'activation & relances

### Enablers
- **[EN41.1](ENABLERS/en-framework-onboarding.md)** — Framework d'onboarding in-app (moteur réutilisable, ciblage rôle/module/étape/profil, i18n, a11y, analytics RGPD)

## Hors périmètre

- **Rédaction et maintenance éditoriale du contenu** (articles du centre d'aide, tours par module, supports) — cet EPIC porte les mécanismes et le framework, pas la production continue de contenu qui reste un processus éditorial de chaque équipe module
- **Évaluation de performance individuelle** à partir des données d'adoption ou de complétion — exclu par principe (cf. éthique E11/E27, non-surveillance individuelle)
- **LMS complet hébergé par Pivot** — seul l'export SCORM/xAPI vers un LMS tiers est couvert (F41.3), pas un LMS de substitution
- **Certification externe/officielle reconnue** — seule la certification interne au tenant est couverte (F41.4)
- **Relances hors canal in-app/e-mail** (SMS, appel) — hors périmètre du funnel d'activation (F41.6)
- **Documentation technique versionnée d'une entité du catalogue** (« TechDocs », documentation-as-code) — reste [E28 — Intégration open source](pathname:///pivot-docs/backlog/EPIC-integration-open-source/) (US28.11.3, gap identifié par le benchmark plateforme développeur, `pivot-benchmarks/plateforme-developpeur/dossier-synthese-plateforme-developpeur.md` §8.1, pivot-benchmarks#1) ; F41.2/F41.3 restent centrés sur le contenu pédagogique utilisateur final (centre d'aide, guides, e-learning), pas sur la documentation technique d'un composant

> **Note (réconciliation post-merge `split/pilotage`)** : US41.5.20 (onboarding dédié à l'ex-EPIC E31 « Demande & arbitrage ») a été supprimée — E31 a été dissous et son contenu (scénarios what-if, business cases) migré vers E23 Portefeuille, désormais couvert par US41.5.12. La numérotation US41.5.1–30 conserve donc un trou en 20 plutôt que d'être renumérotée. US41.5.27 a été mise à jour : E38 est le Système de Management de l'Innovation (SMI), pas « Innovation ».

## Modules impactés

`core` + **tous les modules fonctionnels** (chacun expose son parcours via EN41.1)

## Dépendances

- Dépend de : E16 Shell applicatif & UX (intégration in-app) · E19 Session (présentiel/sessions live) · E03 Système de modules · E17 Infrastructure multi-repo
- Transverse : chaque EPIC module porte un **renvoi** vers son onboarding (F41.5) ; s'appuie sur la **taxonomie des rôles** et le **profil d'organisation** (E40) pour cibler le contenu

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers** | |
| [EN41.1 — Framework d'onboarding in-app](ENABLERS/en-framework-onboarding.md) | ⬜ |
| **F41.1 — Onboarding in-app** | |
| [US41.1.1 — Tour guidé au premier accès](FEATURES/onboarding-in-app/us-tour-guide.md) | ⬜ |
| [US41.1.2 — Tooltips & aide contextuelle](FEATURES/onboarding-in-app/us-tooltips-aide-contextuelle.md) | ⬜ |
| [US41.1.3 — Checklist de démarrage & empty states](FEATURES/onboarding-in-app/us-checklist-demarrage.md) | ⬜ |
| [US41.1.4 — « Quoi de neuf » (nouveautés in-app)](FEATURES/onboarding-in-app/us-quoi-de-neuf.md) | ⬜ |
| **F41.2 — Centre d'aide & base de connaissances** | |
| [US41.2.1 — Centre d'aide in-app (recherche & articles)](FEATURES/centre-aide/us-centre-aide-in-app.md) | ⬜ |
| [US41.2.2 — Aide contextuelle par écran](FEATURES/centre-aide/us-aide-contextuelle-par-ecran.md) | ⬜ |
| **F41.3 — Supports de formation** | |
| [US41.3.1 — Bibliothèque de supports (guides, vidéos, tutoriels)](FEATURES/supports-formation/us-bibliotheque-supports.md) | ⬜ |
| [US41.3.2 — Parcours e-learning & export SCORM/LMS](FEATURES/supports-formation/us-elearning-scorm-lms.md) | ⬜ |
| **F41.4 — Formation présentielle & réseau de référents** | |
| [US41.4.1 — Réseau de référents & parcours formateur](FEATURES/presentiel-referents/us-reseau-referents.md) | ⬜ |
| [US41.4.2 — Kit de formation présentielle & sessions live](FEATURES/presentiel-referents/us-kit-sessions-live.md) | ⬜ |
| [US41.4.3 — Certification interne & communauté](FEATURES/presentiel-referents/us-certification-communaute.md) | ⬜ |
| **F41.5 — Onboarding par module (catalogue)** | |
| [US41.5.1 — Onboarding Whiteboard (E08)](FEATURES/onboarding-modules/us-onboarding-whiteboard.md) | ⬜ |
| [US41.5.2 — Onboarding Scrum Poker (E09)](FEATURES/onboarding-modules/us-onboarding-scrum-poker.md) | ⬜ |
| [US41.5.3 — Onboarding Daily Standup (E10)](FEATURES/onboarding-modules/us-onboarding-daily-standup.md) | ⬜ |
| [US41.5.4 — Onboarding Capacity Planning (E11)](FEATURES/onboarding-modules/us-onboarding-capacity-planning.md) | ⬜ |
| [US41.5.5 — Onboarding MeetOps (E12)](FEATURES/onboarding-modules/us-onboarding-meetops.md) | ⬜ |
| [US41.5.6 — Onboarding Cahiers de Tests (E13)](FEATURES/onboarding-modules/us-onboarding-cahiers-tests.md) | ⬜ |
| [US41.5.7 — Onboarding La Roue (E14)](FEATURES/onboarding-modules/us-onboarding-roue.md) | ⬜ |
| [US41.5.8 — Onboarding Session live (E19)](FEATURES/onboarding-modules/us-onboarding-module-session.md) | ⬜ |
| [US41.5.9 — Onboarding Rétrospective (E20)](FEATURES/onboarding-modules/us-onboarding-retrospective.md) | ⬜ |
| [US41.5.10 — Onboarding Gestion des risques (E21)](FEATURES/onboarding-modules/us-onboarding-risk.md) | ⬜ |
| [US41.5.11 — Onboarding Roadmap & Planification (E22)](FEATURES/onboarding-modules/us-onboarding-roadmap.md) | ⬜ |
| [US41.5.12 — Onboarding Portefeuille projets (E23)](FEATURES/onboarding-modules/us-onboarding-portefeuille.md) | ⬜ |
| [US41.5.13 — Onboarding ADR projet (E24)](FEATURES/onboarding-modules/us-onboarding-adr-projet.md) | ⬜ |
| *(US41.5.14 — Onboarding Commande publique (E25) → [BACKLOG-IDEATION](../BACKLOG-IDEATION/EPIC-formation-onboarding/FEATURES/onboarding-modules/us-onboarding-commande-publique.md) — E25 en idéation)* | — |
| [US41.5.15 — Onboarding Budget & suivi financier (E26)](FEATURES/onboarding-modules/us-onboarding-budget.md) | ⬜ |
| [US41.5.16 — Onboarding OKR (E27)](FEATURES/onboarding-modules/us-onboarding-okr.md) | ⬜ |
| [US41.5.17 — Onboarding Intégration open source (E28)](FEATURES/onboarding-modules/us-onboarding-integration-open-source.md) | ⬜ |
| [US41.5.18 — Onboarding Workflows & Automatisation (E29)](FEATURES/onboarding-modules/us-onboarding-workflows.md) | ⬜ |
| [US41.5.19 — Onboarding Collaboration (E30)](FEATURES/onboarding-modules/us-onboarding-collaboration.md) | ⬜ |
| ~~US41.5.20 — Onboarding Demande & arbitrage (E31)~~ | *supprimée — E31 dissous, cf. US41.5.12* |
| [US41.5.21 — Onboarding Ressources & temps (E32)](FEATURES/onboarding-modules/us-onboarding-ressources-temps.md) | ⬜ |
| [US41.5.22 — Onboarding Collaboration & tâches (pilotage) (E33)](FEATURES/onboarding-modules/us-onboarding-pilotage-taches.md) | ⬜ |
| [US41.5.23 — Onboarding IA & agents (pilotage) (E34)](FEATURES/onboarding-modules/us-onboarding-pilotage-ia.md) | ⬜ |
| [US41.5.24 — Onboarding Gouvernance & sécurité (pilotage) (E35)](FEATURES/onboarding-modules/us-onboarding-pilotage-gouvernance.md) | ⬜ |
| [US41.5.25 — Onboarding Intégration SI (pilotage) (E36)](FEATURES/onboarding-modules/us-onboarding-pilotage-integration-si.md) | ⬜ |
| [US41.5.26 — Onboarding Licences & réversibilité (pilotage) (E37)](FEATURES/onboarding-modules/us-onboarding-pilotage-licences.md) | ⬜ |
| [US41.5.27 — Onboarding Management de l'innovation (SMI, pilotage) (E38)](FEATURES/onboarding-modules/us-onboarding-pilotage-innovation.md) | ⬜ |
| [US41.5.28 — Onboarding Chantiers SI (pilotage) (E39)](FEATURES/onboarding-modules/us-onboarding-pilotage-chantiers.md) | ⬜ |
| [US41.5.29 — Onboarding Profil & adaptation (E40)](FEATURES/onboarding-modules/us-onboarding-profil-adaptation.md) | ⬜ |
| [US41.5.30 — Onboarding Pivot Forms (E42)](FEATURES/onboarding-modules/us-onboarding-forms.md) | ⬜ |
| **F41.6 — Mesure de l'adoption** | |
| [US41.6.1 — Mesure de complétion & taux d'adoption](FEATURES/mesure-adoption/us-mesure-completion.md) | ⬜ |
| [US41.6.2 — Funnel d'activation & relances](FEATURES/mesure-adoption/us-funnel-activation.md) | ⬜ |
