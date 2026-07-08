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

### F30.12 — Extensibilité
- US30.12.1 : API publique documentée
- US30.12.2 : Marketplace d'intégrations
- US30.12.3 : Widgets communautaires

### F30.13 — Licences & modèle économique
- US30.13.1 : Sièges légers participants
- US30.13.2 : Tableau de bord des quotas

### F30.14 — Innovation
- US30.14.1 : Mémoire d'atelier exécutable
- US30.14.2 : Coffre de décisions
- US30.14.3 : Traduction simultanée
- US30.14.4 : Équité de participation
- US30.14.5 : Pont physique-numérique continu
- US30.14.6 : Format d'échange ouvert
- US30.14.7 : IA souveraine embarquée
- US30.14.8 : Board accessible non visuel

### F30.15 — Chantiers SI
- US30.15.1 : Standardisation du parc
- US30.15.2 : Choix par écosystème
- US30.15.3 : Contractualisation gouvernance
- US30.15.4 : Test de sortie avant signature
- US30.15.5 : Réseau d'animateurs référents
- US30.15.6 : Mesure d'adoption
- US30.15.7 : Archivage GED des boards critiques
- US30.15.8 : Négociation licences

### F08.x/EN08.x — Noyau whiteboard (ex-E08, `Phase: Socle`, non verrouillé)
- **EN08.1** — Isolation WebSocket room par board
- **EN08.2** — Guard Angular module whiteboard
- **F08.1** — CRUD tableaux (backend + Angular)
- **F08.2** — Partage et rôles (backend + Angular)
- **F08.3** — Canvas collaboratif temps réel (backend WS + Angular)
- **F08.4** — Templates de tableau

## Dépendances

- Dépend de : **E03** Système de modules (interface PivotModule)
- Dépend de : **E17** Infrastructure multi-repo (pré-requis pivot-core-starter + @pivot/ui-core) — pour F08.x/EN08.x, résolu dans **Sprint 5, Vague 0** (même sprint, en amont de la Vague 1+ whiteboard) ; pour le reste d'E30 (net-new phase-3), reste conditionné au jalon « Socle terminé »
- F08.x/EN08.x (ex-**E08** Whiteboard) fusionné nativement dans cet EPIC — voir "Couverture existante" ci-dessus.

## Statut global

⬜ Backlog — reste du périmètre E30 (phase-3, F30.x/EN30.x NFR), Gate 1 PO Agent à effectuer au démarrage du sprint · noyau F08.x/EN08.x (Socle) : 🔄 En cours (Gate 1 passé 2026-07-07, Sprint 5 Vague 1+ — détail dans le tableau dédié ci-dessous)

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
| **F30.12 — Extensibilité** | |
| [US30.12.1 — API publique documentée](FEATURES/extensibilite/us-api-publique-documentee.md) | ⬜ |
| [US30.12.2 — Marketplace d'intégrations](FEATURES/extensibilite/us-marketplace-d-integrations.md) | ⬜ |
| [US30.12.3 — Widgets communautaires](FEATURES/extensibilite/us-widgets-communautaires.md) | ⬜ |
| **F30.13 — Licences & modèle éco.** | |
| [US30.13.1 — Sièges légers participants](FEATURES/licences-eco/us-sieges-legers-participants.md) | ⬜ |
| [US30.13.2 — Tableau de bord des quotas](FEATURES/licences-eco/us-tableau-de-bord-des-quotas.md) | ⬜ |
| **F30.14 — Innovation** | |
| [US30.14.1 — Mémoire d'atelier exécutable](FEATURES/innovation/us-memoire-d-atelier-executable.md) | ⬜ |
| [US30.14.2 — Coffre de décisions](FEATURES/innovation/us-coffre-de-decisions.md) | ⬜ |
| [US30.14.3 — Traduction simultanée](FEATURES/innovation/us-traduction-simultanee.md) | ⬜ |
| [US30.14.4 — Équité de participation](FEATURES/innovation/us-equite-de-participation.md) | ⬜ |
| [US30.14.5 — Pont physique-numérique continu](FEATURES/innovation/us-pont-physique-numerique-continu.md) | ⬜ |
| [US30.14.6 — Format d'échange ouvert](FEATURES/innovation/us-format-d-echange-ouvert.md) | ⬜ |
| [US30.14.7 — IA souveraine embarquée](FEATURES/innovation/us-ia-souveraine-embarquee.md) | ⬜ |
| [US30.14.8 — Board accessible non visuel](FEATURES/innovation/us-board-accessible-non-visuel.md) | ⬜ |
| **F30.15 — Chantiers SI** | |
| [US30.15.1 — Standardisation du parc](FEATURES/chantiers-si/us-standardisation-du-parc.md) | ⬜ |
| [US30.15.2 — Choix par écosystème](FEATURES/chantiers-si/us-choix-par-ecosysteme.md) | ⬜ |
| [US30.15.3 — Contractualisation gouvernance](FEATURES/chantiers-si/us-contractualisation-gouvernance.md) | ⬜ |
| [US30.15.4 — Test de sortie avant signature](FEATURES/chantiers-si/us-test-de-sortie-avant-signature.md) | ⬜ |
| [US30.15.5 — Réseau d'animateurs référents](FEATURES/chantiers-si/us-reseau-d-animateurs-referents.md) | ⬜ |
| [US30.15.6 — Mesure d'adoption](FEATURES/chantiers-si/us-mesure-d-adoption.md) | ⬜ |
| [US30.15.7 — Archivage GED des boards critiques](FEATURES/chantiers-si/us-archivage-ged-des-boards-critiques.md) | ⬜ |
| [US30.15.8 — Négociation licences](FEATURES/chantiers-si/us-negociation-licences.md) | ⬜ |

---

## Suivi d'avancement — noyau F08.x/EN08.x (ex-E08, Phase: Socle)

Ex-`EPIC-whiteboard`, fusionné ici — implémentation en cours indépendamment du verrouillage
phase-3 du reste d'E30 (voir §Phase ci-dessus). Inspiration : PouetPouet (tableau blanc
collaboratif open-source).

| Élément | 🤖 Dev |
|---------|--------|
| [EN08.1 — Isolation WebSocket room par board](ENABLERS/en-ws-room-isolation.md) | 🔎 Review |
| [EN08.2 — Guard Angular module whiteboard](ENABLERS/en-guard-angular-whiteboard.md) | 🔎 Review |
| **F08.1 — CRUD tableaux** | |
| [US08.1.1 — Utilisateur crée un tableau](FEATURES/crud-tableaux/us-creer-tableau.md) | 🔎 Review |
| [US08.1.2 — Utilisateur liste ses tableaux (backend)](FEATURES/crud-tableaux/us-liste-tableaux-backend.md) | 🔎 Review |
| [US08.1.3 — Angular : liste des tableaux](FEATURES/crud-tableaux/us-liste-tableaux-angular.md) | 🔎 Review |
| [US08.1.4 — Renommer un tableau](FEATURES/crud-tableaux/us-renommer-tableau.md) | 🔎 Review |
| [US08.1.5 — Supprimer un tableau](FEATURES/crud-tableaux/us-supprimer-tableau.md) | 🔎 Review |
| **F08.2 — Partage et rôles** | |
| [US08.2.1 — Owner partage un tableau par lien public](FEATURES/partage-roles/us-partager-tableau.md) | 🔎 Review |
| [US08.2.2 — Utilisateur rejoint un tableau via token](FEATURES/partage-roles/us-rejoindre-tableau.md) | 🔎 Review |
| [US08.2.3 — Angular : UI partage et gestion rôles](FEATURES/partage-roles/us-ui-partage-roles.md) | 🔎 Review |
| **F08.3 — Canvas collaboratif temps réel** | |
| [US08.3.1 — Connexion WebSocket au canvas d'un tableau](FEATURES/canvas-ws/us-connexion-ws-canvas.md) | 🔎 Review |
| [US08.3.2 — Angular : canvas whiteboard](FEATURES/canvas-ws/us-canvas-angular.md) ⚠️ *(Decomposed — voir US08.3.2a/b/c)* | — |
| [US08.3.2a — Canvas local, outils de dessin et a11y](FEATURES/canvas-ws/us-canvas-angular-08-3-2a.md) | 🔎 Review |
| [US08.3.2b — Sync STOMP et états de connexion](FEATURES/canvas-ws/us-canvas-angular-08-3-2b.md) | 🔎 Review |
| [US08.3.2c — Présence, curseurs temps réel](FEATURES/canvas-ws/us-canvas-angular-08-3-2c.md) | 🔎 Review |
| [US08.3.3 — Undo / Redo sur le canvas](FEATURES/canvas-ws/us-undo-redo.md) | 🔎 Review |
| [US08.5.1 — Présence des participants sur le canvas](FEATURES/presence/us-presence-participants.md) | 🔎 Review |
| **F08.4 — Templates** | |
| [US08.4.1 — Utilisateur crée un tableau depuis un template](FEATURES/templates/us-tableau-depuis-template.md) | 🔎 Review |

> Statuts resynchronisés le 2026-07-08 (nuit) depuis le frontmatter `Stage:` de chaque fichier
> (source de vérité, grep direct des 17 fichiers) : **17 Review · 0 In progress · 0 Ready · 0
> Done**. Tous les items ont désormais du code mergé côté `pivot-collaboratif-core` et/ou
> `-ui` — `Done` reste réservé à la recette PO du mainteneur (jamais auto-positionné), donc 0/17
> `Done` est attendu à ce stade, pas un signal de retard. Développement très actif — ce tableau
> est repassé en désync plusieurs fois le même jour. Ne pas considérer ce statut comme figé ;
> revérifier le frontmatter avant toute décision qui en dépend (ex. Definition of Done Socle,
> `sprints/sprint-6.md`).
