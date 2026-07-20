# E30 — Collaboration

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](pathname:///pivot-docs/backlog/EPIC-formation-onboarding/) (US41.5.19 · US41.5.1 pour le noyau F08.x/EN08.x whiteboard, ex-E08).*

## Objectif

Suite de collaboration visuelle (whiteboard collaboratif temps réel, ateliers d'équipe, facilitation) benchmarkée contre **Miro**, **Klaxoon**, **FigJam** et **Microsoft Whiteboard**. L'épique couvre l'exigence marché complète : du socle commoditisé (canevas, pense-bêtes, co-édition) jusqu'aux différenciants (IA de facilitation, souveraineté, séquençage d'atelier) et aux chantiers SI d'adoption. Module `collaboratif`.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-collaboratif-core`** (schéma `collaboratif`)
- Frontend : **`pivot-collaboratif-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation — rapatrié
  dans **Sprint 5, Vague 0** (2026-07-07, voir `sprints/sprint-5.md` §Reséquencement E17), plus
  besoin d'attendre Sprint 7/post-Socle comme documenté précédemment ici

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "Socle terminé" par le mainteneur, **à l'exception
de F08.x/EN08.x (ex-E08)** qui gardent leur propre `Phase: Socle` (non verrouillés — implémentation
en cours indépendamment du reste du périmètre benchmark E30, voir "Suivi d'avancement — noyau
F08.x/EN08.x" ci-dessous).

## Origine

Épique générée depuis le **CSV benchmark Collaboration** (98 items `BL-###`, thème *Collaboration*). Les critères d'acceptation sont dérivés automatiquement des descriptions du benchmark et **restent à affiner au Gate 1 PO Agent** avant tout démarrage de sprint.

**Raffinement 2026-07** : passe de croisement contre les 4 cahiers de spécifications individuels
(`pivot-benchmarks/collaboration-visuelle`) en complément du dossier de synthèse déjà exploité pour
les 98 items `BL-###` — 2 écarts fonctionnels mineurs identifiés dans les cahiers mais non repris
dans la synthèse cross-outils, ajoutés sous leur Feature existante (US30.1.11, US30.4.4 —
`Source: Benchmark 2026-07`, sans identifiant `BL-###`). Le reste du croisement confirme une
couverture déjà large : les 8 propositions « bonus » du dossier de synthèse (§7, B1-B8) et les 9
insights SI (§8, I1-I9) sont déjà portés respectivement par F30.14 Innovation et F30.15 Chantiers
SI.

**Raffinement 2026-07-13 (voix des utilisateurs)** : croisement contre l'[étude interne Klaxoon EDF](https://pivot-platform.github.io/pivot-benchmarks/collaboration-visuelle/etude-interne-klaxoon-edf)
(2 enquêtes terrain, 91 + 226 répondants — données d'usage réel, complément aux cahiers marché).
Le croisement confirme la couverture existante et fait remonter **8 écarts fonctionnels concrets**
(peu visibles dans l'analyse marché pure), ajoutés sous leur Feature existante avec la source
`Étude interne Klaxoon (EDF) 2026-07` (sans identifiant `BL-###`) :
US30.1.12 (filtres/vues par couleur-catégorie), US30.1.13 (mini-carte / navigation grands boards),
US30.3.10 (mode *private* en atelier), US30.6.7 (IA génération de CR), US30.8.5 (export structuré
des contenus), US30.11.4 (classement / scoring temps réel), US30.15.9 (plan de reprise du
patrimoine — action Critique n°1 de l'étude), US30.15.10 (conduite du changement). Les priorités
métier de l'étude (unification, accès sans friction, réversibilité du patrimoine) sont déjà portées
par le périmètre existant. Le levier « licence créateur/contributeur » de l'étude reste **hors
périmètre** (PIVOT sans modèle payant — voir §Hors périmètre).

## Couverture existante (note de rationalisation)

F08.x/EN08.x (ex-EPIC-whiteboard, fusionné dans E30 — E08 était le noyau incrémental de socle
whiteboard, désormais implémenté nativement ici, voir "Suivi d'avancement — noyau F08.x/EN08.x"
ci-dessous) couvrent nativement une partie du périmètre F30.1/F30.2/F30.4/F30.8. Le reste du
périmètre benchmark (facilitation, IA, diagrammes, sécurité/gouvernance, plateformes, engagement,
extensibilité, licences, innovation, chantiers SI) est **net-new**.

| Features E30 | Couvertes nativement par |
|--------------|--------------------------|
| F30.1 Canevas & objets, F30.2 Temps réel, F30.4 Modèles, F30.8 Partage & administration | F08.x/EN08.x (ex-E08, fusionné — voir correspondance détaillée ci-dessous) |
| F30.3 Facilitation & ateliers, F30.11 Engagement | [E19 Session live](../EPIC-module-session/README.md) · [E20 Retrospective](../EPIC-retrospective/README.md) |

### Correspondance détaillée F08.x/EN08.x → F30.x

| Exigence benchmark (E30) | Portée par (ex-E08) | Écart / reste à faire |
|--------------------------|----------------------|-----------------------|
| F30.1 Canevas & objets (BL-001…007) | F08.3 Canvas WS | formes/connecteurs, dessin main levée, images, frames = à étendre |
| F30.2 Collaboration temps réel (BL-008…011) | F08.3 + F08.5 Présence + EN08.1 | commentaires ancrés, historique de versions = à étendre |
| F30.4 Modèles (BL-012…013) | F08.4 Templates | modèles d'organisation chartés = à étendre |
| F30.8 Partage & administration (BL-014…016) | F08.2 Partage & rôles | hiérarchie d'espaces, export PNG/PDF = à étendre |

F08.1 (CRUD tableaux) est un socle d'infrastructure sans équivalent benchmark direct — géré
nativement sous ce même EPIC sans mapping F30.x.

## Périmètre GitHub (phase-3)

### Enablers — E13 Performance & NFR
- **EN30.1** — Latence temps réel < 500 ms
- **EN30.2** — Disponibilité 99,9 %
- **EN30.3** — Résilience réseau
- **EN30.4** — Localisation FR/EN
- **EN30.5** — Fluidité sur boards chargés
- **EN30.6** — Chargement initial < 3 s
- **EN30.7** — Montée en charge d'atelier
- **EN30.8** — Latence d'encrage < 50 ms
- **EN30.9** — Accessibilité WCAG 2.1 AA
- **EN30.10** — Stabilité fonctionnelle
- **EN30.11** — Statistiques d'usage
- **EN30.12** — Mode dégradé consultation
- **EN30.13** — Import de tableaux Klaxoon (.klx)
- **EN30.14** — Exposer les KPI du domaine

### F30.1 — Canevas & objets
- US30.1.1 : Canevas partagé infini
- US30.1.2 : Pense-bêtes (sticky notes)
- US30.1.3 : Formes, connecteurs, texte
- US30.1.4 : Dessin à main levée
- US30.1.5 : Insertion d'images et fichiers
- US30.1.6 : Organisation des objets
- US30.1.7 : Sections / cadres (frames)
- US30.1.8 : Reconnaissance d'encre
- US30.1.9 : Capture de pense-bêtes physiques
- US30.1.10 : Ink-to-table
- US30.1.11 : Liens enrichis et lecture vidéo intégrée
- US30.1.12 : Filtres et vues par couleur / catégorie
- US30.1.13 : Mini-carte et navigation sur grands boards

### F30.2 — Collaboration temps réel
- US30.2.1 : Édition simultanée temps réel
- US30.2.2 : Présence et curseurs nommés
- US30.2.3 : Commentaires ancrés
- US30.2.4 : Enregistrement automatique continu
- US30.2.5 : Historique de versions
- US30.2.6 : Audio/vidéo natif au board
- US30.2.7 : Très grande échelle (200 simultanés)

### F30.3 — Facilitation & ateliers
- US30.3.1 : Vote structuré
- US30.3.2 : Minuteur partagé
- US30.3.3 : Mode présentation
- US30.3.4 : Gestion de l'attention
- US30.3.5 : Anonymat contrôlé
- US30.3.6 : Quiz et sondages natifs
- US30.3.7 : Visites guidées asynchrones
- US30.3.8 : Séquençage d'atelier (Session)
- US30.3.9 : Question instantanée & Mémo
- US30.3.10 : Mode private (contribution masquée avant révélation)

### F30.4 — Modèles
- US30.4.1 : Bibliothèque de modèles
- US30.4.2 : Modèles personnalisés d'organisation
- US30.4.3 : Bibliothèque interne gouvernée
- US30.4.4 : Rituels récurrents

### F30.5 — Diagrammes & structuration
- US30.5.1 : Diagrammes structurés
- US30.5.2 : Mind mapping
- US30.5.3 : Objets de pilotage natifs
- US30.5.4 : Continuité design

### F30.6 — Intelligence artificielle
- US30.6.1 : IA : clustering des contributions
- US30.6.2 : IA : génération par invite
- US30.6.3 : IA : synthèse en actions
- US30.6.4 : Gouvernance de l'IA
- US30.6.5 : Outils générés par prompt
- US30.6.6 : Agents IA collaboratifs
- US30.6.7 : IA : génération de compte-rendu d'atelier

### F30.7 — Continuum & intégrations
- US30.7.1 : Intégration visioconférence 1-clic
- US30.7.2 : Synchronisation gestion de projet
- US30.7.3 : Contenus synchronisés inter-apps
- US30.7.4 : Intégration outils de code

### F30.8 — Partage & administration
- US30.8.1 : Partage par lien avec droits
- US30.8.2 : Hiérarchie des espaces
- US30.8.3 : Export image et PDF
- US30.8.4 : Accès invité sans compte
- US30.8.5 : Export structuré des contenus

### F30.9 — Sécurité & gouvernance
- US30.9.1 : SSO d'entreprise
- US30.9.2 : Chiffrement
- US30.9.3 : Conformité RGPD
- US30.9.4 : Politique d'accès externes
- US30.9.5 : Journaux d'audit
- US30.9.6 : Classification et DLP
- US30.9.7 : Résidence des données UE
- US30.9.8 : Réversibilité des données
- US30.9.9 : Provisionnement SCIM
- US30.9.10 : Stockage dans le tenant
- US30.9.11 : Mode hors ligne (boîtier local)
- US30.9.12 : Hébergement souverain / air-gap

### F30.10 — Plateformes
- US30.10.1 : Applications web, desktop, mobile
- US30.10.2 : Écrans interactifs & multitouch
- US30.10.3 : Optimisation salle de réunion

### F30.11 — Engagement
- US30.11.1 : Réactions temps réel
- US30.11.2 : Parcours gamifié (Aventure)
- US30.11.3 : Ambiance ludique avancée
- US30.11.4 : Classement et scoring temps réel des parcours

### F30.12 — Extensibilité
- US30.12.1 : API publique documentée
- US30.12.2 : Marketplace d'intégrations
- US30.12.3 : Widgets communautaires

### F30.13 — Licences & modèle économique
- US30.13.2 : Tableau de bord des quotas

### F30.14 — Innovation
- US30.14.1 : Mémoire d'atelier exécutable
- US30.14.2 : Coffre de décisions
- *(US30.14.3 Traduction simultanée → [BACKLOG-IDEATION](../BACKLOG-IDEATION/EPIC-collaboration/FEATURES/innovation/us-traduction-simultanee.md) 2026-07-09 — spéculatif, dépendance IA)*
- US30.14.4 : Équité de participation
- *(US30.14.5 Pont physique-numérique continu → [BACKLOG-IDEATION](../BACKLOG-IDEATION/EPIC-collaboration/FEATURES/innovation/us-pont-physique-numerique-continu.md) 2026-07-09 — spéculatif, infrastructure non définie)*
- US30.14.6 : Format d'échange ouvert
- US30.14.7 : IA souveraine embarquée
- US30.14.8 : Board accessible non visuel

### F30.15 — Chantiers SI
- US30.15.1 : Standardisation du parc
- US30.15.4 : Test de sortie avant signature
- US30.15.5 : Réseau d'animateurs référents
- US30.15.6 : Mesure d'adoption
- US30.15.7 : Archivage GED des boards critiques
- US30.15.9 : Plan de reprise & capitalisation du patrimoine
- US30.15.10 : Conduite du changement & accompagnement à la transition

### F08.x/EN08.x — Noyau whiteboard (ex-E08, `Phase: Socle`, non verrouillé)
- **EN08.1** — Isolation WebSocket room par board
- **EN08.2** — Guard Angular module whiteboard
- **F08.1** — CRUD tableaux (backend + Angular) — **+ parité visible PouetPouet (2026-07-13,
  Sprint 10)** : favoris (US08.1.6), corbeille/restauration (US08.1.7), recherche (US08.1.8)
- **F08.2** — Partage et rôles (backend + Angular) — **+ parité visible PouetPouet (2026-07-13,
  Sprint 10)** : paramètres de tableau modal OWNER (US08.2.4)
- **F08.3** — Canvas collaboratif temps réel (backend WS + Angular)
- **F08.4** — Templates de tableau

## Hors périmètre

*Retiré le 2026-07-09 : PIVOT n'a pas de modèle payant/multi-tiers (une instance = un déploiement
gratuit, pas de facturation par siège ni de licence à négocier) — ces US, dérivées du benchmark
concurrentiel (Miro/Klaxoon/FigJam/Microsoft Whiteboard, tous payants), n'ont pas d'équivalent
produit chez PIVOT.*

| Retiré | Raison |
|---|---|
| US30.13.1 — Sièges légers participants | Sièges gratuits/à bas coût pour participants occasionnels : n'a de sens que face à une tarification par siège, absente chez PIVOT |
| US30.15.2 — Choix par écosystème | Grille d'arbitrage entre outils payants concurrents par écosystème IT (M365→Whiteboard, Figma→FigJam…) — PIVOT n'est pas en compétition de licence sur ce terrain |
| US30.15.3 — Contractualisation gouvernance | Clauses contractuelles (SLA, audit, réversibilité) propres à un contrat de licence commercial — sans contrat payant, rien à négocier |
| US30.15.8 — Négociation licences | Négociation de sièges légers et d'engagement pluriannuel indexé sur l'usage — présuppose un modèle de licence payant |

US30.13.2 (Tableau de bord des quotas) est conservé : les quotas qu'il couvre (participants,
fichiers, crédits IA) sont un risque opérationnel indépendant de tout modèle de facturation.

## Dépendances

- Dépend de : **E03** Système de modules (interface PivotModule)
- Dépend de : **E17** Infrastructure multi-repo (pré-requis pivot-core-starter + @pivot/ui-core) — pour F08.x/EN08.x, résolu dans **Sprint 5, Vague 0** (même sprint, en amont de la Vague 1+ whiteboard) ; pour le reste d'E30 (net-new phase-3), reste conditionné au jalon « Socle terminé »
- F08.x/EN08.x (ex-**E08** Whiteboard) fusionné nativement dans cet EPIC — voir "Couverture existante" ci-dessus.

## Statut global

⬜ Backlog — reste du périmètre E30 (phase-3, F30.x/EN30.x NFR), Gate 1 PO Agent à effectuer au démarrage du sprint · noyau F08.x/EN08.x (Socle) : ✅ Done — 17/17 (2026-07-09, recette PO différée, détail dans le tableau dédié ci-dessous)

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers — E13 Performance & NFR** | |
| [EN30.1 — Latence temps réel < 500 ms](ENABLERS/en-latence-temps-reel-500-ms.md) | ⬜ |
| [EN30.2 — Disponibilité 99,9 %](ENABLERS/en-disponibilite-99-9.md) | ⬜ |
| [EN30.3 — Résilience réseau](ENABLERS/en-resilience-reseau.md) | ⬜ |
| [EN30.4 — Localisation FR/EN](ENABLERS/en-localisation-fr-en.md) | ⬜ |
| [EN30.5 — Fluidité sur boards chargés](ENABLERS/en-fluidite-sur-boards-charges.md) | ⬜ |
| [EN30.6 — Chargement initial < 3 s](ENABLERS/en-chargement-initial-3-s.md) | ⬜ |
| [EN30.7 — Montée en charge d'atelier](ENABLERS/en-montee-en-charge-d-atelier.md) | ⬜ |
| [EN30.8 — Latence d'encrage < 50 ms](ENABLERS/en-latence-d-encrage-50-ms.md) | ⬜ |
| [EN30.9 — Accessibilité WCAG 2.1 AA](ENABLERS/en-accessibilite-wcag-2-1-aa.md) | ⬜ |
| [EN30.10 — Stabilité fonctionnelle](ENABLERS/en-stabilite-fonctionnelle.md) | ⬜ |
| [EN30.11 — Statistiques d'usage](ENABLERS/en-statistiques-d-usage.md) | ⬜ |
| [EN30.12 — Mode dégradé consultation](ENABLERS/en-mode-degrade-consultation.md) | ⬜ |
| [EN30.13 — Import de tableaux Klaxoon (.klx)](ENABLERS/en-import-klaxoon.md) | ⬜ |
| [EN30.14 — Exposer les KPI du domaine](ENABLERS/en-exposer-kpi.md) | ⬜ |
| **F30.1 — Canevas & objets** | |
| [US30.1.1 — Canevas partagé infini](FEATURES/canevas-objets/us-canevas-partage-infini.md) | ⬜ |
| [US30.1.2 — Pense-bêtes (sticky notes)](FEATURES/canevas-objets/us-pense-betes-sticky-notes.md) | ⬜ |
| [US30.1.3 — Formes, connecteurs, texte](FEATURES/canevas-objets/us-formes-connecteurs-texte.md) | ⬜ |
| [US30.1.4 — Dessin à main levée](FEATURES/canevas-objets/us-dessin-a-main-levee.md) | ⬜ |
| [US30.1.5 — Insertion d'images et fichiers](FEATURES/canevas-objets/us-insertion-d-images-et-fichiers.md) | ⬜ |
| [US30.1.6 — Organisation des objets](FEATURES/canevas-objets/us-organisation-des-objets.md) | ⬜ |
| [US30.1.7 — Sections / cadres (frames)](FEATURES/canevas-objets/us-sections-cadres-frames.md) | ⬜ |
| [US30.1.8 — Reconnaissance d'encre](FEATURES/canevas-objets/us-reconnaissance-d-encre.md) | ⬜ |
| [US30.1.9 — Capture de pense-bêtes physiques](FEATURES/canevas-objets/us-capture-de-pense-betes-physiques.md) | ⬜ |
| [US30.1.10 — Ink-to-table](FEATURES/canevas-objets/us-ink-to-table.md) | ⬜ |
| [US30.1.11 — Liens enrichis et lecture vidéo intégrée](FEATURES/canevas-objets/us-liens-enrichis-video.md) | ⬜ |
| [US30.1.12 — Filtres et vues par couleur / catégorie](FEATURES/canevas-objets/us-filtres-vues-couleur-categorie.md) | ⬜ |
| [US30.1.13 — Mini-carte et navigation sur grands boards](FEATURES/canevas-objets/us-mini-carte-navigation-grands-boards.md) | ⬜ |
| **F30.2 — Collaboration temps réel** | |
| [US30.2.1 — Édition simultanée temps réel](FEATURES/temps-reel/us-edition-simultanee-temps-reel.md) | ⬜ |
| [US30.2.2 — Présence et curseurs nommés](FEATURES/temps-reel/us-presence-et-curseurs-nommes.md) | ⬜ |
| [US30.2.3 — Commentaires ancrés](FEATURES/temps-reel/us-commentaires-ancres.md) | ⬜ |
| [US30.2.4 — Enregistrement automatique continu](FEATURES/temps-reel/us-enregistrement-automatique-continu.md) | ⬜ |
| [US30.2.5 — Historique de versions](FEATURES/temps-reel/us-historique-de-versions.md) | ⬜ |
| [US30.2.6 — Audio/vidéo natif au board](FEATURES/temps-reel/us-audio-video-natif-au-board.md) | ⬜ |
| [US30.2.7 — Très grande échelle (200 simultanés)](FEATURES/temps-reel/us-tres-grande-echelle-200-simultanes.md) | ⬜ |
| **F30.3 — Facilitation & ateliers** | |
| [US30.3.1 — Vote structuré](FEATURES/facilitation-ateliers/us-vote-structure.md) | ⬜ |
| [US30.3.2 — Minuteur partagé](FEATURES/facilitation-ateliers/us-minuteur-partage.md) | ⬜ |
| [US30.3.3 — Mode présentation](FEATURES/facilitation-ateliers/us-mode-presentation.md) | ⬜ |
| [US30.3.4 — Gestion de l'attention](FEATURES/facilitation-ateliers/us-gestion-de-l-attention.md) | ⬜ |
| [US30.3.5 — Anonymat contrôlé](FEATURES/facilitation-ateliers/us-anonymat-controle.md) | ⬜ |
| [US30.3.6 — Quiz et sondages natifs](FEATURES/facilitation-ateliers/us-quiz-et-sondages-natifs.md) | ⬜ |
| [US30.3.7 — Visites guidées asynchrones](FEATURES/facilitation-ateliers/us-visites-guidees-asynchrones.md) | ⬜ |
| [US30.3.8 — Séquençage d'atelier (Session)](FEATURES/facilitation-ateliers/us-sequencage-d-atelier-session.md) | ⬜ |
| [US30.3.9 — Question instantanée & Mémo](FEATURES/facilitation-ateliers/us-question-instantanee-memo.md) | ⬜ |
| [US30.3.10 — Mode private (contribution masquée avant révélation)](FEATURES/facilitation-ateliers/us-mode-private-contribution-masquee.md) | ⬜ |
| **F30.4 — Modèles** | |
| [US30.4.1 — Bibliothèque de modèles](FEATURES/modeles/us-bibliotheque-de-modeles.md) | ⬜ |
| [US30.4.2 — Modèles personnalisés d'organisation](FEATURES/modeles/us-modeles-personnalises-d-organisation.md) | ⬜ |
| [US30.4.3 — Bibliothèque interne gouvernée](FEATURES/modeles/us-bibliotheque-interne-gouvernee.md) | ⬜ |
| [US30.4.4 — Rituels récurrents](FEATURES/modeles/us-rituels-recurrents.md) | ⬜ |
| **F30.5 — Diagrammes & structuration** | |
| [US30.5.1 — Diagrammes structurés](FEATURES/diagrammes/us-diagrammes-structures.md) | ⬜ |
| [US30.5.2 — Mind mapping](FEATURES/diagrammes/us-mind-mapping.md) | ⬜ |
| [US30.5.3 — Objets de pilotage natifs](FEATURES/diagrammes/us-objets-de-pilotage-natifs.md) | ⬜ |
| [US30.5.4 — Continuité design](FEATURES/diagrammes/us-continuite-design.md) | ⬜ |
| **F30.6 — Intelligence artificielle** | |
| [US30.6.1 — IA : clustering des contributions](FEATURES/ia/us-ia-clustering-des-contributions.md) | ⬜ |
| [US30.6.2 — IA : génération par invite](FEATURES/ia/us-ia-generation-par-invite.md) | ⬜ |
| [US30.6.3 — IA : synthèse en actions](FEATURES/ia/us-ia-synthese-en-actions.md) | ⬜ |
| [US30.6.4 — Gouvernance de l'IA](FEATURES/ia/us-gouvernance-de-l-ia.md) | ⬜ |
| [US30.6.5 — Outils générés par prompt](FEATURES/ia/us-outils-generes-par-prompt.md) | ⬜ |
| [US30.6.6 — Agents IA collaboratifs](FEATURES/ia/us-agents-ia-collaboratifs.md) | ⬜ |
| [US30.6.7 — IA : génération de compte-rendu d'atelier](FEATURES/ia/us-ia-generation-compte-rendu.md) | ⬜ |
| **F30.7 — Continuum & intégrations** | |
| [US30.7.1 — Intégration visioconférence 1-clic](FEATURES/continuum-integrations/us-integration-visioconference-1-clic.md) | ⬜ |
| [US30.7.2 — Synchronisation gestion de projet](FEATURES/continuum-integrations/us-synchronisation-gestion-de-projet.md) | ⬜ |
| [US30.7.3 — Contenus synchronisés inter-apps](FEATURES/continuum-integrations/us-contenus-synchronises-inter-apps.md) | ⬜ |
| [US30.7.4 — Intégration outils de code](FEATURES/continuum-integrations/us-integration-outils-de-code.md) | ⬜ |
| **F30.8 — Partage & administration** | |
| [US30.8.1 — Partage par lien avec droits](FEATURES/partage-administration/us-partage-par-lien-avec-droits.md) | ⬜ |
| [US30.8.2 — Hiérarchie des espaces](FEATURES/partage-administration/us-hierarchie-des-espaces.md) | ⬜ |
| [US30.8.3 — Export image et PDF](FEATURES/partage-administration/us-export-image-et-pdf.md) | ⬜ |
| [US30.8.4 — Accès invité sans compte](FEATURES/partage-administration/us-acces-invite-sans-compte.md) | ⬜ |
| [US30.8.5 — Export structuré des contenus](FEATURES/partage-administration/us-export-structure-contenus.md) | ⬜ |
| **F30.9 — Sécurité & gouvernance** | |
| [US30.9.1 — SSO d'entreprise](FEATURES/securite-gouvernance/us-sso-d-entreprise.md) | ⬜ |
| [US30.9.2 — Chiffrement](FEATURES/securite-gouvernance/us-chiffrement.md) | ⬜ |
| [US30.9.3 — Conformité RGPD](FEATURES/securite-gouvernance/us-conformite-rgpd.md) | ⬜ |
| [US30.9.4 — Politique d'accès externes](FEATURES/securite-gouvernance/us-politique-d-acces-externes.md) | ⬜ |
| [US30.9.5 — Journaux d'audit](FEATURES/securite-gouvernance/us-journaux-d-audit.md) | ⬜ |
| [US30.9.6 — Classification et DLP](FEATURES/securite-gouvernance/us-classification-et-dlp.md) | ⬜ |
| [US30.9.7 — Résidence des données UE](FEATURES/securite-gouvernance/us-residence-des-donnees-ue.md) | ⬜ |
| [US30.9.8 — Réversibilité des données](FEATURES/securite-gouvernance/us-reversibilite-des-donnees.md) | ⬜ |
| [US30.9.9 — Provisionnement SCIM](FEATURES/securite-gouvernance/us-provisionnement-scim.md) | ⬜ |
| [US30.9.10 — Stockage dans le tenant](FEATURES/securite-gouvernance/us-stockage-dans-le-tenant.md) | ⬜ |
| [US30.9.11 — Mode hors ligne (boîtier local)](FEATURES/securite-gouvernance/us-mode-hors-ligne-boitier-local.md) | ⬜ |
| [US30.9.12 — Hébergement souverain / air-gap](FEATURES/securite-gouvernance/us-hebergement-souverain-air-gap.md) | ⬜ |
| **F30.10 — Plateformes** | |
| [US30.10.1 — Applications web, desktop, mobile](FEATURES/plateformes/us-applications-web-desktop-mobile.md) | ⬜ |
| [US30.10.2 — Écrans interactifs & multitouch](FEATURES/plateformes/us-ecrans-interactifs-multitouch.md) | ⬜ |
| [US30.10.3 — Optimisation salle de réunion](FEATURES/plateformes/us-optimisation-salle-de-reunion.md) | ⬜ |
| **F30.11 — Engagement** | |
| [US30.11.1 — Réactions temps réel](FEATURES/engagement/us-reactions-temps-reel.md) | ⬜ |
| [US30.11.2 — Parcours gamifié (Aventure)](FEATURES/engagement/us-parcours-gamifie-aventure.md) | ⬜ |
| [US30.11.3 — Ambiance ludique avancée](FEATURES/engagement/us-ambiance-ludique-avancee.md) | ⬜ |
| [US30.11.4 — Classement et scoring temps réel des parcours](FEATURES/engagement/us-classement-scoring-temps-reel.md) | ⬜ |
| **F30.12 — Extensibilité** | |
| [US30.12.1 — API publique documentée](FEATURES/extensibilite/us-api-publique-documentee.md) | ⬜ |
| [US30.12.2 — Marketplace d'intégrations](FEATURES/extensibilite/us-marketplace-d-integrations.md) | ⬜ |
| [US30.12.3 — Widgets communautaires](FEATURES/extensibilite/us-widgets-communautaires.md) | ⬜ |
| **F30.13 — Licences & modèle éco.** | |
| [US30.13.2 — Tableau de bord des quotas](FEATURES/licences-eco/us-tableau-de-bord-des-quotas.md) | ⬜ |
| **F30.14 — Innovation** | |
| [US30.14.1 — Mémoire d'atelier exécutable](FEATURES/innovation/us-memoire-d-atelier-executable.md) | ⬜ |
| [US30.14.2 — Coffre de décisions](FEATURES/innovation/us-coffre-de-decisions.md) | ⬜ |
| *(US30.14.3 — Traduction simultanée → [BACKLOG-IDEATION](../BACKLOG-IDEATION/EPIC-collaboration/FEATURES/innovation/us-traduction-simultanee.md))* | — |
| [US30.14.4 — Équité de participation](FEATURES/innovation/us-equite-de-participation.md) | ⬜ |
| *(US30.14.5 — Pont physique-numérique continu → [BACKLOG-IDEATION](../BACKLOG-IDEATION/EPIC-collaboration/FEATURES/innovation/us-pont-physique-numerique-continu.md))* | — |
| [US30.14.6 — Format d'échange ouvert](FEATURES/innovation/us-format-d-echange-ouvert.md) | ⬜ |
| [US30.14.7 — IA souveraine embarquée](FEATURES/innovation/us-ia-souveraine-embarquee.md) | ⬜ |
| [US30.14.8 — Board accessible non visuel](FEATURES/innovation/us-board-accessible-non-visuel.md) | ⬜ |
| **F30.15 — Chantiers SI** | |
| [US30.15.1 — Standardisation du parc](FEATURES/chantiers-si/us-standardisation-du-parc.md) | ⬜ |
| [US30.15.4 — Test de sortie avant signature](FEATURES/chantiers-si/us-test-de-sortie-avant-signature.md) | ⬜ |
| [US30.15.5 — Réseau d'animateurs référents](FEATURES/chantiers-si/us-reseau-d-animateurs-referents.md) | ⬜ |
| [US30.15.6 — Mesure d'adoption](FEATURES/chantiers-si/us-mesure-d-adoption.md) | ⬜ |
| [US30.15.7 — Archivage GED des boards critiques](FEATURES/chantiers-si/us-archivage-ged-des-boards-critiques.md) | ⬜ |
| [US30.15.9 — Plan de reprise & capitalisation du patrimoine](FEATURES/chantiers-si/us-plan-de-reprise-patrimoine.md) | ⬜ |
| [US30.15.10 — Conduite du changement & accompagnement à la transition](FEATURES/chantiers-si/us-conduite-du-changement.md) | ⬜ |

---

## Suivi d'avancement — noyau F08.x/EN08.x (ex-E08, Phase: Socle)

Ex-`EPIC-whiteboard`, fusionné ici — implémentation en cours indépendamment du verrouillage
phase-3 du reste d'E30 (voir §Phase ci-dessus). Inspiration : PouetPouet (tableau blanc
collaboratif open-source).

| Élément | 🤖 Dev |
|---------|--------|
| [EN08.1 — Isolation WebSocket room par board](ENABLERS/en-ws-room-isolation.md) | ✅ Done |
| [EN08.2 — Guard Angular module whiteboard](ENABLERS/en-guard-angular-whiteboard.md) | ✅ Done |
| **F08.1 — CRUD tableaux** | |
| [US08.1.1 — Utilisateur crée un tableau](FEATURES/crud-tableaux/us-creer-tableau.md) | ✅ Done |
| [US08.1.2 — Utilisateur liste ses tableaux (backend)](FEATURES/crud-tableaux/us-liste-tableaux-backend.md) | ✅ Done |
| [US08.1.3 — Angular : liste des tableaux](FEATURES/crud-tableaux/us-liste-tableaux-angular.md) | ✅ Done |
| [US08.1.4 — Renommer un tableau](FEATURES/crud-tableaux/us-renommer-tableau.md) | ✅ Done |
| [US08.1.5 — Supprimer un tableau](FEATURES/crud-tableaux/us-supprimer-tableau.md) | ✅ Done |
| **F08.2 — Partage et rôles** | |
| [US08.2.1 — Owner partage un tableau par lien public](FEATURES/partage-roles/us-partager-tableau.md) | ✅ Done |
| [US08.2.2 — Utilisateur rejoint un tableau via token](FEATURES/partage-roles/us-rejoindre-tableau.md) | ✅ Done |
| [US08.2.3 — Angular : UI partage et gestion rôles](FEATURES/partage-roles/us-ui-partage-roles.md) | ✅ Done |
| **F08.3 — Canvas collaboratif temps réel** | |
| [US08.3.1 — Connexion WebSocket au canvas d'un tableau](FEATURES/canvas-ws/us-connexion-ws-canvas.md) | ✅ Done |
| [US08.3.2 — Angular : canvas whiteboard](FEATURES/canvas-ws/us-canvas-angular.md) ⚠️ *(Decomposed — voir US08.3.2a/b/c)* | — |
| [US08.3.2a — Canvas local, outils de dessin et a11y](FEATURES/canvas-ws/us-canvas-angular-08-3-2a.md) | ✅ Done |
| [US08.3.2b — Sync STOMP et états de connexion](FEATURES/canvas-ws/us-canvas-angular-08-3-2b.md) | ✅ Done |
| [US08.3.2c — Présence, curseurs temps réel](FEATURES/canvas-ws/us-canvas-angular-08-3-2c.md) | ✅ Done |
| [US08.3.3 — Undo / Redo sur le canvas](FEATURES/canvas-ws/us-undo-redo.md) | ✅ Done |
| [US08.3.4 — Taille du texte proportionnelle à la taille de la carte](FEATURES/canvas-ws/us-texte-proportionnel-carte.md) | ⬜ |
| [US08.3.5 — Dézoom dynamique selon la taille du contenu](FEATURES/canvas-ws/us-dezoom-dynamique-contenu.md) | ⬜ |
| [US08.3.6 — Redimensionnement d'une sélection multiple ou d'un groupe par cadre englobant](FEATURES/canvas-ws/us-redim-selection-multiple-cadre.md) | ⬜ |
| [US08.3.7 — Navigation au clic droit](FEATURES/canvas-ws/us-navigation-clic-droit.md) | ⬜ |
| [US08.5.1 — Présence des participants sur le canvas](FEATURES/presence/us-presence-participants.md) | ✅ Done |
| **F08.4 — Templates** | |
| [US08.4.1 — Utilisateur crée un tableau depuis un template](FEATURES/templates/us-tableau-depuis-template.md) | ✅ Done |
| **Parité visible PouetPouet (Sprint 10, 2026-07-13)** | |
| [US08.1.6 — Favoris de tableaux](FEATURES/crud-tableaux/us-favoris-tableau.md) | ⬜ |
| [US08.1.7 — Corbeille et restauration d'un tableau](FEATURES/crud-tableaux/us-corbeille-tableau.md) | ⬜ |
| [US08.1.8 — Recherche de tableaux](FEATURES/crud-tableaux/us-recherche-tableau.md) | ⬜ |
| [US08.2.4 — Paramètres de tableau (modal OWNER) + câblage Reset board](FEATURES/partage-roles/us-parametres-tableau.md) | ⬜ |
| **Parité complète PouetPouet — spec de référence absorbée (Sprints 38-43, 2026-07-13)** | |
| [EN08.4 — Modèle `Card` typé + contrats WS](ENABLERS/en-modele-card-type.md) | 🔎 code livré — recette |
| **F08.6 — Objets typés** *(absorbe US30.1.2/.3/.5/.11)* | |
| [US08.6.1 — Pense-bête texte (TEXT)](FEATURES/objets-types/us-carte-texte.md) | 🔎 code livré — recette |
| [US08.6.2 — Étiquette (LABEL)](FEATURES/objets-types/us-carte-etiquette.md) | 🔎 code livré — recette |
| [US08.6.3 — Forme (SHAPE)](FEATURES/objets-types/us-carte-forme.md) | 🔎 code livré — recette |
| [US08.6.4 — Image (IMAGE)](FEATURES/objets-types/us-carte-image.md) | 🔎 code livré — recette |
| [US08.6.5 — Carte lien (LINK) + aperçu OpenGraph](FEATURES/objets-types/us-carte-lien-apercu.md) | 🔎 code livré — recette |
| [US08.6.6 — Tableau (TABLE) + collage tableur](FEATURES/objets-types/us-carte-tableau.md) | 🔎 code livré — recette |
| **F08.7 — Connecteurs** *(absorbe US30.1.3)* | |
| [US08.7.1 — Créer / supprimer un connecteur](FEATURES/connecteurs/us-creer-connecteur.md) | ✅ |
| [US08.7.2 — Styler un connecteur](FEATURES/connecteurs/us-styler-connecteur.md) | 🔎 code livré — recette |
| **F08.8 — Cadres (frames)** *(absorbe US30.1.7)* | |
| [US08.8.1 — Créer / supprimer un cadre](FEATURES/cadres/us-creer-cadre.md) | 🔎 code livré — recette |
| [US08.8.2 — Déplacer / redimensionner / renommer / calque un cadre](FEATURES/cadres/us-manipuler-cadre.md) | 🔎 code livré — recette |
| **F08.9 — Organisation & calque** *(absorbe US30.1.6)* | |
| [US08.9.1 — Grouper / dégrouper / couleur de groupe](FEATURES/organisation-calque/us-grouper-cartes.md) | 🔎 code livré — recette |
| [US08.9.2 — Verrouiller / déverrouiller (matrice complète)](FEATURES/organisation-calque/us-verrouiller-cartes.md) | 🔎 code livré — recette |
| [US08.9.3 — Calque / z-order (premier plan / arrière-plan)](FEATURES/organisation-calque/us-calque-z-order.md) | 🔎 code livré — recette |
| **F08.10 — Champs personnalisés** | |
| [US08.10.1 — Définir des champs de board](FEATURES/champs-personnalises/us-definir-champs.md) | 🔎 code livré — recette |
| [US08.10.2 — Renseigner / effacer une valeur de champ](FEATURES/champs-personnalises/us-valeurs-champs.md) | 🔎 code livré — recette |
| **F08.11 — Canvas UX** | |
| [US08.11.1 — Aimantation à la grille](FEATURES/canvas-ux/us-aimantation-grille.md) | 🔎 code livré (ui #241) — recette |
| [US08.11.2 — Zoom avancé (boutons + ajuster)](FEATURES/canvas-ux/us-zoom-avance.md) | 🔎 partiel (molette OK, boutons/ajuster absents du canvas routé) |
| [US08.11.3 — Collage presse-papiers (image / tableur / texte)](FEATURES/canvas-ux/us-collage-presse-papiers.md) | 🔎 code livré — recette |
| [US08.11.4 — Guides d'alignement (§4.3, supersède le 8 px d'US08.3.2a)](FEATURES/canvas-ux/us-guides-alignement.md) | ⬜ absent |
| [US08.11.5 — Undo / redo (§4.5, HISTORY_LIMIT 30, supersède la pile 50 d'US08.3.3)](FEATURES/canvas-ux/us-undo-redo-parite.md) | 🔎 code livré — recette |
| [US08.11.6 — Raccourcis clavier & nudge (§4.7, offset +24, supersède US08.3.2a)](FEATURES/canvas-ux/us-raccourcis-clavier.md) | 🔎 code livré, écart mineur (nudge 1/20px vs 24px spécifié) |
| [US08.11.7 — Redimensionnement fin & lasso (§4.4/§4.9, min ~24 px, supersède US08.3.6)](FEATURES/canvas-ux/us-redimensionnement-fin.md) | 🔎 code livré — recette |
| **F08.5 — Présence (étendue)** | |
| [US08.5.2 — Curseurs nommés throttlés](FEATURES/presence/us-curseurs-nommes.md) | 🔎 code livré — recette |
| [US08.5.3 — Verrou doux d'édition](FEATURES/presence/us-verrou-edition.md) | 🔎 code livré — recette |
| **F08.12 — Facilitation Socle** *(absorbe US30.3.1/.2)* | |
| [US08.12.1 — Minuteur partagé](FEATURES/facilitation-socle/us-minuteur-partage.md) | ✅ Terminé (Sprint 15, 2026-07-16) |
| [US08.12.2 — Vote / dot-vote](FEATURES/facilitation-socle/us-vote-dot-vote.md) | ✅ Terminé (Sprint 15, 2026-07-16) |
| **F08.13 — Cycle de vie du board & import** *(absorbe EN30.13)* | |
| [US08.13.1 — Import Klaxoon + annulation](FEATURES/cycle-vie-board/us-import-klaxoon.md) | 🔎 code livré — recette |
| [US08.13.2 — Cycle de vie du brouillon de template](FEATURES/cycle-vie-board/us-brouillon-template.md) | ⬜ non commencé |
| [US08.13.3 — Image de couverture](FEATURES/cycle-vie-board/us-image-couverture.md) | 🔎 code livré — recette |
| [US08.13.4 — Réinitialisation du canvas (§3.8, préservation champs/votes §6.10)](FEATURES/cycle-vie-board/us-reset-board.md) | 🔎 code livré — recette |
| **F08.1 — CRUD tableaux (étendue)** | |
| [US08.1.9 — Chargement d'un tableau & présence agrégée (§2.2)](FEATURES/crud-tableaux/us-chargement-tableau.md) | 🔎 code livré — recette |
| **F08.2 — Partage et rôles (étendue)** | |
| [US08.2.5 — Inviter par email + gouvernance des rôles](FEATURES/partage-roles/us-inviter-email.md) | ⚠️ régression de migration — codé/mergé pré-modulith, absent du monolith actuel (voir sprint-16.md) |
| [US08.2.6 — Lien de partage : lecture & gestion (§2.3)](FEATURES/partage-roles/us-lien-partage-parite.md) | 🔎 code livré — recette |

> **Resynchronisé le 2026-07-09** depuis le frontmatter `Stage:` de chaque fichier (source de
> vérité, grep direct des 17 fichiers) : ce tableau affichait encore « 17 Review » alors que
> 2 fichiers (US08.1.4, US08.1.5) étaient en réalité restés à `In progress` malgré un code déjà
> mergé des deux côtés (`pivot-collaboratif-core#19`, `pivot-collaboratif-ui#19`/`#20`) — écart
> corrigé. **17/17 `Stage: Done` positionné le 2026-07-09** — décision explicite du mainteneur de
> ne pas attendre la recette PO formelle (différée, traitée séparément) pour refléter que tout le
> code du noyau est implémenté et mergé. Exception documentée à la règle habituelle (`Stage: Done`
> réservé à la recette humaine) — voir `sprints/sprint-6.md` pour le contexte de cette décision.
>
> **Ajout 2026-07-10 (audit de parité POC PouetPouet, v0.32.0)** : US08.3.4 à US08.3.7 sont des
> raffinements UX du canvas ("confort des boards") livrés dans le POC après le gel des 17 items
> ci-dessus — net-new, `Stage: Backlog`, ne remettent pas en cause le 17/17 Done. À vérifier au
> Gate 1 contre l'état réel de `pivot-collaboratif-ui` (le redimensionnement par handles sur objet
> unique et le groupement `Ctrl+G` sont déjà couverts par US08.3.2a — seul le raffinement listé
> dans chaque US est net-new).
>
> **Ajout 2026-07-13 (audit de recette fonctionnelle Socle, parité visible PouetPouet)** :
> [`docs/audits/audit-recette-fonctionnelle.md`](pathname:///pivot-docs/audits/audit-recette-fonctionnelle)
> confirme le noyau F08.x conforme au périmètre annoncé et classe l'écart de parité vs PouetPouet
> (Vote, Timer, Session, favoris, corbeille, recherche…) en `⬜ Backlog` F30.x, **non-KO**. Le
> mainteneur a néanmoins décidé d'étendre le périmètre Socle F08.x à **4 capacités de parité
> visible** jugées structurantes pour la gestion de tableaux : favoris (US08.1.6), corbeille +
> restauration (US08.1.7 — révise le hard-delete d'US08.1.5), recherche (US08.1.8), paramètres de
> tableau modal OWNER + câblage Reset board (US08.2.4). Net-new, `Stage: Backlog`, tracées dans
> **`sprints/sprint-10.md`** — ne remettent pas en cause le 17/17 Done du noyau initial.
>
> **Ajout 2026-07-13 (absorption intégrale du spec de référence PouetPouet) :** décision mainteneur
> d'aller **au-delà** de la parité visible du Sprint 10 et de **rapatrier tout le contenu** de
> `Détails tableau blanc backlog.md` (spec de réimplémentation fine du POC) dans le périmètre Socle
> E08 — ce qui **lève le verrou `phase-3`** posé par la décision #2 + zone d'ombre #11
> (`sprints/zones-ombre.md`). Nouvel enabler pré-requis **EN08.4** (modèle `Card` typé remplaçant
> l'objet `DRAW` générique d'US08.3.2a) + **33 US** sous F08.6→F08.13 (objets typés, connecteurs,
> cadres, organisation/calque, champs personnalisés, canvas UX — dont guides d'alignement, undo/redo,
> raccourcis, redimensionnement fin en **parité fine §4** supersédant les valeurs des US08.3.x
> livrées —, présence étendue, facilitation minuteur/vote, cycle de vie/import Klaxoon/reset,
> chargement & lien de partage, invitation email). Ces US **absorbent** les
> Features benchmark US30.1.2/.3/.5/.6/.7/.11, US30.2.2, US30.3.1/.2, EN30.13 (voir
> `COUVERTURE-SPEC-REFERENCE.md` pour la traçabilité spec §→US). Réactions (US30.11.1) et commentaires
> ancrés (US30.2.3) **restent `phase-3`** : absents du spec de référence. Séquencement :
> **Sprints 38-43** (`sprints/README.md`). `Stage: Backlog`, Gate 1 PO Agent à passer au démarrage
> de chaque item. Ne remet pas en cause le 17/17 Done du noyau initial.
>
> **Réconciliation 2026-07-20 (backlog↔code, Sprints 11/12/14/16) :** ce tableau affichait encore
> tout `⬜` faute d'avoir été mis à jour depuis sa création (seul Sprint 13 avait été réconcilié le
> 2026-07-16). Vérification directe du code (`pivot-core`/`pivot-ui` post-bascule Spring Modulith,
> ADR-030) : **EN08.4, F08.6, F08.7, F08.8, F08.9, F08.10, F08.13 (hors US08.13.2), US08.1.9,
> US08.2.6, F08.12 sont code-complets** (recette mainteneur restante, `Stage` inchangé). Trois
> écarts réels identifiés : **US08.11.4** (guides d'alignement) absent du canvas réellement
> routé ; **US08.11.2** (zoom avancé) partiel (molette seule) ; *(**US08.11.1** — aimantation
> grille — était de ce lot, livrée depuis par `pivot-ui#241`, 2026-07-20)* ; **US08.13.2** (brouillon de template) non commencé ; **US08.2.5** (inviter par email) —
> ⚠️ **régression de la bascule modulith** : codé et mergé sur les repos pré-migration
> (`pivot-collaboratif-core#108`/`pivot-collaboratif-ui#169`, 2026-07-17) mais absent du monolith
> actuel, à réimporter plutôt qu'à réécrire. Détail par sprint : `sprints/sprint-12.md`,
> `sprint-14.md`, `sprint-16.md`.
>
> **Items orphelins non séquencés (constatés 2026-07-20) :** US08.3.4 (texte proportionnel à la
> carte), US08.3.5 (dézoom dynamique selon le contenu) et US08.3.7 (navigation au clic droit) —
> ajoutés en `Stage: Backlog` le 2026-07-10 (raffinements UX post-audit de parité) — n'ont jamais
> été assignés à un sprint et sont absents du code. US08.3.6 est distinct : superseded par
> US08.11.7 (Sprint 14), déjà code-complet.
