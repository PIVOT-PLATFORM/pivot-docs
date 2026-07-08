# E20 — Module Retrospective (Agilité)

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](pathname:///pivot-docs/backlog/EPIC-formation-onboarding/) (US41.5.9).*

## Objectif

Animer des rétrospectives d'équipe structurées avec formats multiples (Start/Stop/Continue, KIF/KAF, 4L, Mad/Sad/Glad), plan d'action intégré et suivi des engagements entre sprints.

**Benchmark** ([dossier de synthèse outils agilité](https://github.com/PIVOT-PLATFORM/pivot-benchmarks) — Retrium, EasyRetro, Neatro, TeamRetro) : le socle (techniques, anonymat, regroupement, vote, plan d'actions) est totalement commoditisé sur les quatre. Deux enseignements à retenir pour ce module : (1) l'**anonymat doit être une garantie technique** — l'auteur d'une contribution anonyme non retrouvable a posteriori par un rôle non-animateur (enseignement Retrium, qui masque l'auteur y compris pendant la frappe), pas seulement un masquage visuel côté UI ; (2) la **mémoire d'actions inter-session** (US20.3.2, déjà prévue) est le principal facteur de valeur perçue chez les acteurs les plus matures (Neatro, TeamRetro) et ne doit pas être rognée en cours d'implémentation. Retrium, seul des quatre sans plan gratuit pérenne, est un contre-exemple à ne pas suivre sur l'accès (rejoindre par lien doit rester sans friction, cf. F20.1).

## Repo cible (architecture multi-repo)

- Backend : **`pivot-agilite-core`** (schéma Flyway `agilite`, FK → `public.teams.id`)
- Frontend : **`pivot-agilite-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "Socle terminé" par le mainteneur

## Périmètre (phase-3)

### Features
- **F20.1 — Session rétrospective** — créer, animer, clore
  - US20.1.1 : Créer une session rétrospective (format, équipe, durée)
  - US20.1.2 : Animer la session en temps réel (STOMP — contribution cards + timer par phase), avec anonymat garanti côté backend (auteur non retrouvable a posteriori par un rôle non-animateur — benchmark Retrium)
- **F20.2 — Formats de rétrospective**
  - US20.2.1 : Formats prédéfinis (Start/Stop/Continue · KIF/KAF · 4L · Mad/Sad/Glad) + format custom
- **F20.3 — Plan d'action**
  - US20.3.1 : Créer des actions issues de la rétrospective (titre, owner, échéance)
  - US20.3.2 : Suivre les actions des rétros précédentes au démarrage de la rétro suivante

### Enablers
- **EN20.1** — Schéma Flyway `agilite` — tables `retro_sessions`, `retro_cards`, `retro_actions`
- **EN20.2** — Guard Angular module retrospective + isolation STOMP room `/topic/agilite/retro/{sessionId}`

## Modules impactés

`agilite` (pivot-agilite-core + pivot-agilite-ui)

## Dépendances

- Dépend de : E03 Système de modules
- Dépend de : E17 Infrastructure multi-repo (EN17.1 + EN17.3 + EN17.5 + EN17.6)
- Dépend de : E15 Équipes transverses

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

Item Type: Epic · Clé: E20 · Phase: phase-3 · Module: agilite
Stage: Backlog · Priority: High
