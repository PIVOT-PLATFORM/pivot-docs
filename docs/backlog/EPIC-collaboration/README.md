# E22 — Collaboration

## Objectif

Suite de collaboration visuelle (whiteboard collaboratif temps réel, ateliers d'équipe, facilitation) benchmarkée contre **Miro**, **Klaxoon**, **FigJam** et **Microsoft Whiteboard**. L'épique couvre l'exigence marché complète : du socle commoditisé (canevas, pense-bêtes, co-édition) jusqu'aux différenciants (IA de facilitation, souveraineté, séquençage d'atelier) et aux chantiers SI d'adoption. Module `collaboratif`.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-collaboratif-core`** (schéma `collaboratif`)
- Frontend : **`pivot-collaboratif-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "MVP terminé" par le mainteneur

## Origine

Épique générée depuis le **CSV benchmark Collaboration** (98 items `BL-###`, thème *Collaboration*). Les critères d'acceptation sont dérivés automatiquement des descriptions du benchmark et **restent à affiner au Gate 1 PO Agent** avant tout démarrage de sprint.

## Couverture existante (note de rationalisation)

Une partie du périmètre est déjà couverte par des épiques MVP existantes. E22 est le référentiel benchmark cible ; les épiques ci-dessous en sont l'amorce implémentée.

| Features E22 | Déjà partiellement couvert par |
|--------------|--------------------------------|
| F22.1 Canevas & objets, F22.2 Temps réel, F22.4 Modèles, F22.8 Partage & administration | [E08 Whiteboard](../EPIC-whiteboard/README.md) |
| F22.3 Facilitation & ateliers, F22.11 Engagement | [E19 Session live](../EPIC-module-session/README.md) · [E20 Retrospective](../EPIC-retrospective/README.md) |

## Périmètre GitHub (phase-3)

### Enablers — E13 Performance & NFR
- **EN22.1** — Latence temps réel < 500 ms
- **EN22.2** — Disponibilité 99,9 %
- **EN22.3** — Résilience réseau
- **EN22.4** — Localisation FR/EN
- **EN22.5** — Fluidité sur boards chargés
- **EN22.6** — Chargement initial < 3 s
- **EN22.7** — Montée en charge d'atelier
- **EN22.8** — Latence d'encrage < 50 ms
- **EN22.9** — Accessibilité WCAG 2.1 AA
- **EN22.10** — Stabilité fonctionnelle
- **EN22.11** — Statistiques d'usage
- **EN22.12** — Mode dégradé consultation

### F22.1 — Canevas & objets
- US22.1.1 : Canevas partagé infini
- US22.1.2 : Pense-bêtes (sticky notes)
- US22.1.3 : Formes, connecteurs, texte
- US22.1.4 : Dessin à main levée
- US22.1.5 : Insertion d'images et fichiers
- US22.1.6 : Organisation des objets
- US22.1.7 : Sections / cadres (frames)
- US22.1.8 : Reconnaissance d'encre
- US22.1.9 : Capture de pense-bêtes physiques
- US22.1.10 : Ink-to-table

### F22.2 — Collaboration temps réel
- US22.2.1 : Édition simultanée temps réel
- US22.2.2 : Présence et curseurs nommés
- US22.2.3 : Commentaires ancrés
- US22.2.4 : Enregistrement automatique continu
- US22.2.5 : Historique de versions
- US22.2.6 : Audio/vidéo natif au board
- US22.2.7 : Très grande échelle (200 simultanés)

### F22.3 — Facilitation & ateliers
- US22.3.1 : Vote structuré
- US22.3.2 : Minuteur partagé
- US22.3.3 : Mode présentation
- US22.3.4 : Gestion de l'attention
- US22.3.5 : Anonymat contrôlé
- US22.3.6 : Quiz et sondages natifs
- US22.3.7 : Visites guidées asynchrones
- US22.3.8 : Séquençage d'atelier (Session)
- US22.3.9 : Question instantanée & Mémo

### F22.4 — Modèles
- US22.4.1 : Bibliothèque de modèles
- US22.4.2 : Modèles personnalisés d'organisation
- US22.4.3 : Bibliothèque interne gouvernée

### F22.5 — Diagrammes & structuration
- US22.5.1 : Diagrammes structurés
- US22.5.2 : Mind mapping
- US22.5.3 : Objets de pilotage natifs
- US22.5.4 : Continuité design

### F22.6 — Intelligence artificielle
- US22.6.1 : IA : clustering des contributions
- US22.6.2 : IA : génération par invite
- US22.6.3 : IA : synthèse en actions
- US22.6.4 : Gouvernance de l'IA
- US22.6.5 : Outils générés par prompt
- US22.6.6 : Agents IA collaboratifs

### F22.7 — Continuum & intégrations
- US22.7.1 : Intégration visioconférence 1-clic
- US22.7.2 : Synchronisation gestion de projet
- US22.7.3 : Contenus synchronisés inter-apps
- US22.7.4 : Intégration outils de code

### F22.8 — Partage & administration
- US22.8.1 : Partage par lien avec droits
- US22.8.2 : Hiérarchie des espaces
- US22.8.3 : Export image et PDF
- US22.8.4 : Accès invité sans compte

### F22.9 — Sécurité & gouvernance
- US22.9.1 : SSO d'entreprise
- US22.9.2 : Chiffrement
- US22.9.3 : Conformité RGPD
- US22.9.4 : Politique d'accès externes
- US22.9.5 : Journaux d'audit
- US22.9.6 : Classification et DLP
- US22.9.7 : Résidence des données UE
- US22.9.8 : Réversibilité des données
- US22.9.9 : Provisionnement SCIM
- US22.9.10 : Stockage dans le tenant
- US22.9.11 : Mode hors ligne (boîtier local)
- US22.9.12 : Hébergement souverain / air-gap

### F22.10 — Plateformes
- US22.10.1 : Applications web, desktop, mobile
- US22.10.2 : Écrans interactifs & multitouch
- US22.10.3 : Optimisation salle de réunion

### F22.11 — Engagement
- US22.11.1 : Réactions temps réel
- US22.11.2 : Parcours gamifié (Aventure)
- US22.11.3 : Ambiance ludique avancée

### F22.12 — Extensibilité
- US22.12.1 : API publique documentée
- US22.12.2 : Marketplace d'intégrations
- US22.12.3 : Widgets communautaires

### F22.13 — Licences & modèle économique
- US22.13.1 : Sièges légers participants
- US22.13.2 : Tableau de bord des quotas

### F22.14 — Innovation
- US22.14.1 : Mémoire d'atelier exécutable
- US22.14.2 : Coffre de décisions
- US22.14.3 : Traduction simultanée
- US22.14.4 : Équité de participation
- US22.14.5 : Pont physique-numérique continu
- US22.14.6 : Format d'échange ouvert
- US22.14.7 : IA souveraine embarquée
- US22.14.8 : Board accessible non visuel

### F22.15 — Chantiers SI
- US22.15.1 : Standardisation du parc
- US22.15.2 : Choix par écosystème
- US22.15.3 : Contractualisation gouvernance
- US22.15.4 : Test de sortie avant signature
- US22.15.5 : Réseau d'animateurs référents
- US22.15.6 : Mesure d'adoption
- US22.15.7 : Archivage GED des boards critiques
- US22.15.8 : Négociation licences

## Dépendances

- Dépend de : **E03** Système de modules (interface PivotModule)
- Dépend de : **E17** Infrastructure multi-repo (pré-requis pivot-core-starter + @pivot/ui-core)
- Rationalise / prolonge : **E08** Whiteboard (socle canevas déjà implémenté)

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers — E13 Performance & NFR** | |
| [EN22.1 — Latence temps réel < 500 ms](ENABLERS/en-latence-temps-reel-500-ms.md) | ⬜ |
| [EN22.2 — Disponibilité 99,9 %](ENABLERS/en-disponibilite-99-9.md) | ⬜ |
| [EN22.3 — Résilience réseau](ENABLERS/en-resilience-reseau.md) | ⬜ |
| [EN22.4 — Localisation FR/EN](ENABLERS/en-localisation-fr-en.md) | ⬜ |
| [EN22.5 — Fluidité sur boards chargés](ENABLERS/en-fluidite-sur-boards-charges.md) | ⬜ |
| [EN22.6 — Chargement initial < 3 s](ENABLERS/en-chargement-initial-3-s.md) | ⬜ |
| [EN22.7 — Montée en charge d'atelier](ENABLERS/en-montee-en-charge-d-atelier.md) | ⬜ |
| [EN22.8 — Latence d'encrage < 50 ms](ENABLERS/en-latence-d-encrage-50-ms.md) | ⬜ |
| [EN22.9 — Accessibilité WCAG 2.1 AA](ENABLERS/en-accessibilite-wcag-2-1-aa.md) | ⬜ |
| [EN22.10 — Stabilité fonctionnelle](ENABLERS/en-stabilite-fonctionnelle.md) | ⬜ |
| [EN22.11 — Statistiques d'usage](ENABLERS/en-statistiques-d-usage.md) | ⬜ |
| [EN22.12 — Mode dégradé consultation](ENABLERS/en-mode-degrade-consultation.md) | ⬜ |
| **F22.1 — Canevas & objets** | |
| [US22.1.1 — Canevas partagé infini](FEATURES/canevas-objets/us-canevas-partage-infini.md) | ⬜ |
| [US22.1.2 — Pense-bêtes (sticky notes)](FEATURES/canevas-objets/us-pense-betes-sticky-notes.md) | ⬜ |
| [US22.1.3 — Formes, connecteurs, texte](FEATURES/canevas-objets/us-formes-connecteurs-texte.md) | ⬜ |
| [US22.1.4 — Dessin à main levée](FEATURES/canevas-objets/us-dessin-a-main-levee.md) | ⬜ |
| [US22.1.5 — Insertion d'images et fichiers](FEATURES/canevas-objets/us-insertion-d-images-et-fichiers.md) | ⬜ |
| [US22.1.6 — Organisation des objets](FEATURES/canevas-objets/us-organisation-des-objets.md) | ⬜ |
| [US22.1.7 — Sections / cadres (frames)](FEATURES/canevas-objets/us-sections-cadres-frames.md) | ⬜ |
| [US22.1.8 — Reconnaissance d'encre](FEATURES/canevas-objets/us-reconnaissance-d-encre.md) | ⬜ |
| [US22.1.9 — Capture de pense-bêtes physiques](FEATURES/canevas-objets/us-capture-de-pense-betes-physiques.md) | ⬜ |
| [US22.1.10 — Ink-to-table](FEATURES/canevas-objets/us-ink-to-table.md) | ⬜ |
| **F22.2 — Collaboration temps réel** | |
| [US22.2.1 — Édition simultanée temps réel](FEATURES/temps-reel/us-edition-simultanee-temps-reel.md) | ⬜ |
| [US22.2.2 — Présence et curseurs nommés](FEATURES/temps-reel/us-presence-et-curseurs-nommes.md) | ⬜ |
| [US22.2.3 — Commentaires ancrés](FEATURES/temps-reel/us-commentaires-ancres.md) | ⬜ |
| [US22.2.4 — Enregistrement automatique continu](FEATURES/temps-reel/us-enregistrement-automatique-continu.md) | ⬜ |
| [US22.2.5 — Historique de versions](FEATURES/temps-reel/us-historique-de-versions.md) | ⬜ |
| [US22.2.6 — Audio/vidéo natif au board](FEATURES/temps-reel/us-audio-video-natif-au-board.md) | ⬜ |
| [US22.2.7 — Très grande échelle (200 simultanés)](FEATURES/temps-reel/us-tres-grande-echelle-200-simultanes.md) | ⬜ |
| **F22.3 — Facilitation & ateliers** | |
| [US22.3.1 — Vote structuré](FEATURES/facilitation-ateliers/us-vote-structure.md) | ⬜ |
| [US22.3.2 — Minuteur partagé](FEATURES/facilitation-ateliers/us-minuteur-partage.md) | ⬜ |
| [US22.3.3 — Mode présentation](FEATURES/facilitation-ateliers/us-mode-presentation.md) | ⬜ |
| [US22.3.4 — Gestion de l'attention](FEATURES/facilitation-ateliers/us-gestion-de-l-attention.md) | ⬜ |
| [US22.3.5 — Anonymat contrôlé](FEATURES/facilitation-ateliers/us-anonymat-controle.md) | ⬜ |
| [US22.3.6 — Quiz et sondages natifs](FEATURES/facilitation-ateliers/us-quiz-et-sondages-natifs.md) | ⬜ |
| [US22.3.7 — Visites guidées asynchrones](FEATURES/facilitation-ateliers/us-visites-guidees-asynchrones.md) | ⬜ |
| [US22.3.8 — Séquençage d'atelier (Session)](FEATURES/facilitation-ateliers/us-sequencage-d-atelier-session.md) | ⬜ |
| [US22.3.9 — Question instantanée & Mémo](FEATURES/facilitation-ateliers/us-question-instantanee-memo.md) | ⬜ |
| **F22.4 — Modèles** | |
| [US22.4.1 — Bibliothèque de modèles](FEATURES/modeles/us-bibliotheque-de-modeles.md) | ⬜ |
| [US22.4.2 — Modèles personnalisés d'organisation](FEATURES/modeles/us-modeles-personnalises-d-organisation.md) | ⬜ |
| [US22.4.3 — Bibliothèque interne gouvernée](FEATURES/modeles/us-bibliotheque-interne-gouvernee.md) | ⬜ |
| **F22.5 — Diagrammes & structuration** | |
| [US22.5.1 — Diagrammes structurés](FEATURES/diagrammes/us-diagrammes-structures.md) | ⬜ |
| [US22.5.2 — Mind mapping](FEATURES/diagrammes/us-mind-mapping.md) | ⬜ |
| [US22.5.3 — Objets de pilotage natifs](FEATURES/diagrammes/us-objets-de-pilotage-natifs.md) | ⬜ |
| [US22.5.4 — Continuité design](FEATURES/diagrammes/us-continuite-design.md) | ⬜ |
| **F22.6 — Intelligence artificielle** | |
| [US22.6.1 — IA : clustering des contributions](FEATURES/ia/us-ia-clustering-des-contributions.md) | ⬜ |
| [US22.6.2 — IA : génération par invite](FEATURES/ia/us-ia-generation-par-invite.md) | ⬜ |
| [US22.6.3 — IA : synthèse en actions](FEATURES/ia/us-ia-synthese-en-actions.md) | ⬜ |
| [US22.6.4 — Gouvernance de l'IA](FEATURES/ia/us-gouvernance-de-l-ia.md) | ⬜ |
| [US22.6.5 — Outils générés par prompt](FEATURES/ia/us-outils-generes-par-prompt.md) | ⬜ |
| [US22.6.6 — Agents IA collaboratifs](FEATURES/ia/us-agents-ia-collaboratifs.md) | ⬜ |
| **F22.7 — Continuum & intégrations** | |
| [US22.7.1 — Intégration visioconférence 1-clic](FEATURES/continuum-integrations/us-integration-visioconference-1-clic.md) | ⬜ |
| [US22.7.2 — Synchronisation gestion de projet](FEATURES/continuum-integrations/us-synchronisation-gestion-de-projet.md) | ⬜ |
| [US22.7.3 — Contenus synchronisés inter-apps](FEATURES/continuum-integrations/us-contenus-synchronises-inter-apps.md) | ⬜ |
| [US22.7.4 — Intégration outils de code](FEATURES/continuum-integrations/us-integration-outils-de-code.md) | ⬜ |
| **F22.8 — Partage & administration** | |
| [US22.8.1 — Partage par lien avec droits](FEATURES/partage-administration/us-partage-par-lien-avec-droits.md) | ⬜ |
| [US22.8.2 — Hiérarchie des espaces](FEATURES/partage-administration/us-hierarchie-des-espaces.md) | ⬜ |
| [US22.8.3 — Export image et PDF](FEATURES/partage-administration/us-export-image-et-pdf.md) | ⬜ |
| [US22.8.4 — Accès invité sans compte](FEATURES/partage-administration/us-acces-invite-sans-compte.md) | ⬜ |
| **F22.9 — Sécurité & gouvernance** | |
| [US22.9.1 — SSO d'entreprise](FEATURES/securite-gouvernance/us-sso-d-entreprise.md) | ⬜ |
| [US22.9.2 — Chiffrement](FEATURES/securite-gouvernance/us-chiffrement.md) | ⬜ |
| [US22.9.3 — Conformité RGPD](FEATURES/securite-gouvernance/us-conformite-rgpd.md) | ⬜ |
| [US22.9.4 — Politique d'accès externes](FEATURES/securite-gouvernance/us-politique-d-acces-externes.md) | ⬜ |
| [US22.9.5 — Journaux d'audit](FEATURES/securite-gouvernance/us-journaux-d-audit.md) | ⬜ |
| [US22.9.6 — Classification et DLP](FEATURES/securite-gouvernance/us-classification-et-dlp.md) | ⬜ |
| [US22.9.7 — Résidence des données UE](FEATURES/securite-gouvernance/us-residence-des-donnees-ue.md) | ⬜ |
| [US22.9.8 — Réversibilité des données](FEATURES/securite-gouvernance/us-reversibilite-des-donnees.md) | ⬜ |
| [US22.9.9 — Provisionnement SCIM](FEATURES/securite-gouvernance/us-provisionnement-scim.md) | ⬜ |
| [US22.9.10 — Stockage dans le tenant](FEATURES/securite-gouvernance/us-stockage-dans-le-tenant.md) | ⬜ |
| [US22.9.11 — Mode hors ligne (boîtier local)](FEATURES/securite-gouvernance/us-mode-hors-ligne-boitier-local.md) | ⬜ |
| [US22.9.12 — Hébergement souverain / air-gap](FEATURES/securite-gouvernance/us-hebergement-souverain-air-gap.md) | ⬜ |
| **F22.10 — Plateformes** | |
| [US22.10.1 — Applications web, desktop, mobile](FEATURES/plateformes/us-applications-web-desktop-mobile.md) | ⬜ |
| [US22.10.2 — Écrans interactifs & multitouch](FEATURES/plateformes/us-ecrans-interactifs-multitouch.md) | ⬜ |
| [US22.10.3 — Optimisation salle de réunion](FEATURES/plateformes/us-optimisation-salle-de-reunion.md) | ⬜ |
| **F22.11 — Engagement** | |
| [US22.11.1 — Réactions temps réel](FEATURES/engagement/us-reactions-temps-reel.md) | ⬜ |
| [US22.11.2 — Parcours gamifié (Aventure)](FEATURES/engagement/us-parcours-gamifie-aventure.md) | ⬜ |
| [US22.11.3 — Ambiance ludique avancée](FEATURES/engagement/us-ambiance-ludique-avancee.md) | ⬜ |
| **F22.12 — Extensibilité** | |
| [US22.12.1 — API publique documentée](FEATURES/extensibilite/us-api-publique-documentee.md) | ⬜ |
| [US22.12.2 — Marketplace d'intégrations](FEATURES/extensibilite/us-marketplace-d-integrations.md) | ⬜ |
| [US22.12.3 — Widgets communautaires](FEATURES/extensibilite/us-widgets-communautaires.md) | ⬜ |
| **F22.13 — Licences & modèle éco.** | |
| [US22.13.1 — Sièges légers participants](FEATURES/licences-eco/us-sieges-legers-participants.md) | ⬜ |
| [US22.13.2 — Tableau de bord des quotas](FEATURES/licences-eco/us-tableau-de-bord-des-quotas.md) | ⬜ |
| **F22.14 — Innovation** | |
| [US22.14.1 — Mémoire d'atelier exécutable](FEATURES/innovation/us-memoire-d-atelier-executable.md) | ⬜ |
| [US22.14.2 — Coffre de décisions](FEATURES/innovation/us-coffre-de-decisions.md) | ⬜ |
| [US22.14.3 — Traduction simultanée](FEATURES/innovation/us-traduction-simultanee.md) | ⬜ |
| [US22.14.4 — Équité de participation](FEATURES/innovation/us-equite-de-participation.md) | ⬜ |
| [US22.14.5 — Pont physique-numérique continu](FEATURES/innovation/us-pont-physique-numerique-continu.md) | ⬜ |
| [US22.14.6 — Format d'échange ouvert](FEATURES/innovation/us-format-d-echange-ouvert.md) | ⬜ |
| [US22.14.7 — IA souveraine embarquée](FEATURES/innovation/us-ia-souveraine-embarquee.md) | ⬜ |
| [US22.14.8 — Board accessible non visuel](FEATURES/innovation/us-board-accessible-non-visuel.md) | ⬜ |
| **F22.15 — Chantiers SI** | |
| [US22.15.1 — Standardisation du parc](FEATURES/chantiers-si/us-standardisation-du-parc.md) | ⬜ |
| [US22.15.2 — Choix par écosystème](FEATURES/chantiers-si/us-choix-par-ecosysteme.md) | ⬜ |
| [US22.15.3 — Contractualisation gouvernance](FEATURES/chantiers-si/us-contractualisation-gouvernance.md) | ⬜ |
| [US22.15.4 — Test de sortie avant signature](FEATURES/chantiers-si/us-test-de-sortie-avant-signature.md) | ⬜ |
| [US22.15.5 — Réseau d'animateurs référents](FEATURES/chantiers-si/us-reseau-d-animateurs-referents.md) | ⬜ |
| [US22.15.6 — Mesure d'adoption](FEATURES/chantiers-si/us-mesure-d-adoption.md) | ⬜ |
| [US22.15.7 — Archivage GED des boards critiques](FEATURES/chantiers-si/us-archivage-ged-des-boards-critiques.md) | ⬜ |
| [US22.15.8 — Négociation licences](FEATURES/chantiers-si/us-negociation-licences.md) | ⬜ |
