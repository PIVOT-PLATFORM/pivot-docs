# E22 — Roadmap & Planification (Gantt)

*🎓 Onboarding in-app de ce module → [E41 — Formation & Onboarding](../EPIC-formation-onboarding/README.md) (US41.5.11).*

> Module de capacité du **domaine Pilotage** (E18) — cf. [ADR-008 Domaines composables & cockpits](pathname:///pivot-docs/adr/ADR-008-domaines-modules-cockpits) et **[ADR-010 Roadmap & Gantt : modèle temporel unique](pathname:///pivot-docs/adr/ADR-010-roadmap-gantt-modele-temporel)**.

## Objectif

Planifier dans le temps, de la **roadmap stratégique** au **Gantt opérationnel**, avec une **parité fonctionnelle MS Project mais en mode web**. Le module porte l'entité **Projet** (rattachée à une **Application**, 1 Application → 1..n Projet, cf. [EN18.9](../EPIC-pilotage/ENABLERS/en-modele-application-projet.md)).

## Principe directeur — deux vues d'un **modèle temporel unique**

**Roadmap rapide** et **Gantt détaillé** ne sont **pas deux outils**, mais **deux vues (deux altitudes de zoom)** sur **un seul graphe temporel** (`Projet → Phase → Tâche → Jalon → Dépendance`, cf. [EN22.1](ENABLERS/en-modele-temporel-unique.md)). Le **jalon est l'objet partagé** entre les deux vues. → **Aucun double stockage, aucune double saisie.**

| | **Roadmap rapide** (F22.3) | **Gantt détaillé** (F22.4) |
|---|---|---|
| Job-to-be-done | *Aligner & communiquer* la direction | *Planifier, ordonnancer & suivre* l'exécution |
| Granularité | Initiatives / lanes / jalons | Tâches, WBS, sous-tâches |
| Temps | Flou (trimestre, Now/Next/Later) | Dates précises, calendriers ouvrés |
| Moteur | Aucun (pose à la main) | Ordonnancement auto, chemin critique |
| Création | **Minutes** | Détaillée |
| Utilisateurs | Direction, sponsor, PO | PMO, chef de projet |

## Altitude pilotée par le **profil** (E40)

Le curseur roadmap↔Gantt est **indexé sur le profil d'organisation** ([E40](../EPIC-profil-adaptation/README.md)) :

- **TPE / PME** → roadmap rapide (F22.3) ; le Gantt lourd est de la sur-ingénierie (chemin critique « peu utile en TPE »).
- **Grand groupe / Publique / État** → Gantt complet (F22.4), ressources & nivellement (F22.5), baselines, hybride cascade/agile, consolidation 100+ projets.

L'activation des features par profil est gérée par **PP-A02** (E40).

## Parité MS Project — mais web-native

Couvert par F22.4–F22.7 : **WBS** (indent/outdent), tâches récapitulatives/périodiques, **dépendances typées FS/SS/FF/SF + retard/avance**, **contraintes** (ASAP/ALAP/MSO/MFO/SNET…) & échéances, **calendriers** ouvrés/exceptions, **planification auto/manuelle**, **chemin critique & marges**, fractionnement, **suivi d'avancement**, **baselines multiples & écarts**, **ressources** (affectation, charge, sur-affectation, **nivellement**, coûts), **vues multiples** (Gantt/chronologie/calendrier/réseau PERT/feuilles), filtres/regroupements, **import/export MS Project (.mpp/.xml MSPDI)** + Excel/PDF + **format ouvert**. Le web-native est garanti par **[EN22.2](ENABLERS/en-performance-gantt-web.md)** (rendu virtualisé 10 000+ tâches, recalcul incrémental, co-édition temps réel).

## Interopérabilité — formats supportés (F22.7)

| Famille | Formats | Import | Export |
|---|---|:---:|:---:|
| MS Project | `.mpp`, `.mpx`, `.mpt`, `.xml` (MSPDI) | ✅ | ✅ |
| Oracle Primavera | `.xer`, P6 XML | ✅ | ✅ |
| Tableur & données | CSV, XLSX, JSON, **API REST** | ✅ | ✅ |
| Calendrier | iCalendar `.ics` (+ abonnement URL) | — | ✅ |
| Agile & gestion de travail | Jira, Azure DevOps, Asana, Trello, monday, GitHub/GitLab | ✅ (sync) | ✅ (sync) |
| PM open source | GanttProject `.gan`, ProjectLibre, OpenProject, TaskJuggler, GNOME Planner `.planner` | ✅ | ✅ |
| Documents & présentation | PDF, PNG, SVG, PowerPoint `.pptx` | — | ✅ |
| Format ouvert PIVOT | JSON documenté & versionné (réversibilité) | ✅ | ✅ |

## Interfaces inter-modules & SI externes (F22.8)

Consommées via le **bus d'événements PIVOT** + **deep-links**, **sans FK inter-modules** (ADR-006/008), socle [EN22.3](ENABLERS/en-connecteurs-calendrier-disponibilite.md) :

- **Sprints agiles → roadmap** (US22.8.1) : bandes de sprint superposées à la timeline, alignement jalons/sprints.
- **Versions applicatives → timeline** (US22.8.2) : chaque `Projet` = une version d'`Application` (EN18.9), affichée en bande de release + jalon de mise en production.
- **Weekends & jours fériés par pays/localité** (US22.8.3) : calendriers légaux importés, weekend configurable par région (ex. vendredi–samedi).
- **SI d'absences / RH** (US22.8.4) : SAP SuccessFactors / HCM, Workday, Lucca, ADP… → indisponibilités ressources (RGPD-minimisé) pour l'ordonnancement & le nivellement.
- **Overlays inter-modules** (US22.8.5) : risques (E21), budget (E26), décisions/ADR (E24), échéances de marché (E25) positionnés sur la roadmap/Gantt.
- **Plage → MeetOps** (US22.8.6) : une **plage d'événement** posée sur la roadmap crée une **pré-réservation MeetOps** (E12) *à valider* ; à la validation, MeetOps propose et envoie le **meilleur créneau** dans la période (selon disponibilités, calendriers & absences EN22.3).

## Repo cible (architecture multi-repo)

- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage` partagé du domaine, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "MVP terminé" par le mainteneur

## Périmètre GitHub (phase-3)

### Features
- **F22.1 — Roadmap / Gantt (socle)** — US22.1.1 créer/gérer un projet · US22.1.2 vue Gantt · US22.1.3 jalons & dépendances
- **F22.2 — Planification (benchmark PPM)** — US22.2.1 Gantt/dép./jalons · US22.2.2 chemin critique · US22.2.3 vues multiples · US22.2.4 modèles · US22.2.5 baselines · US22.2.6 hybride cascade/agile
- **F22.3 — Roadmap rapide (vue macro)** — US22.3.1 créer une roadmap rapide · US22.3.2 échelle floue · US22.3.3 Now/Next/Later · US22.3.4 jalons stratégiques · US22.3.5 partage & export
- **F22.4 — Planification Gantt (parité MS Project)** — US22.4.1 WBS · US22.4.2 durées/effort/auto-manuel · US22.4.3 dépendances typées · US22.4.4 contraintes & échéances · US22.4.5 calendriers · US22.4.6 jalons & tâches périodiques · US22.4.7 chemin critique/marges/split · US22.4.8 suivi d'avancement · US22.4.9 baselines & écarts · US22.4.10 interactions Gantt
- **F22.5 — Ressources dans le plan** — US22.5.1 affectation · US22.5.2 charge & sur-affectation · US22.5.3 nivellement · US22.5.4 coûts
- **F22.6 — Vues & restitutions** — US22.6.1 vues multiples · US22.6.2 colonnes/filtres/groupes · US22.6.3 mise en forme/impression · US22.6.4 export & rapports
- **F22.7 — Interopérabilité (formats)** — US22.7.1 import MS Project (.mpp/.xml) · US22.7.2 export MS Project (.xml MSPDI/Excel) · US22.7.3 format ouvert · US22.7.4 Primavera P6 (XER/P6 XML) · US22.7.5 tableur & données (CSV/XLSX/JSON/API) · US22.7.6 iCalendar (.ics) · US22.7.7 outils agiles (Jira/Azure DevOps/Asana…) · US22.7.8 PM open source (GanttProject/ProjectLibre/OpenProject/TaskJuggler/Planner) · US22.7.9 documents (PDF/PNG/SVG/PowerPoint)
- **F22.8 — Interfaces inter-modules & SI** — US22.8.1 sprints sur la roadmap · US22.8.2 versions applicatives (releases) · US22.8.3 weekends & jours fériés par pays/localité · US22.8.4 interconnexion SI d'absences/RH (SAP, Workday…) · US22.8.5 overlays inter-modules (risques/budget/décisions/marchés) · US22.8.6 plage → pré-réservation MeetOps (meilleur créneau à valider)

### Enablers
- **[EN22.1](ENABLERS/en-modele-temporel-unique.md)** — Modèle temporel unique & moteur d'ordonnancement (roadmap & Gantt = deux vues)
- **[EN22.2](ENABLERS/en-performance-gantt-web.md)** — Performance & collaboration web du Gantt (10 000+ tâches)
- **[EN22.3](ENABLERS/en-connecteurs-calendrier-disponibilite.md)** — Connecteurs calendrier & disponibilité (fériés par pays, absences SI RH type SAP) + socle interfaces inter-modules
- Partagés domaine : **EN18.1** (schéma `pilotage`) · **EN18.2** (guard) · **EN18.9** (Application→Projet)

## Modules impactés

`pilotage` (pivot-pilotage-core + pivot-pilotage-ui)

## Dépendances

- Dépend de : E03 Système de modules · E17 Infrastructure multi-repo · E15 Équipes transverses (projet ↔ équipe)
- Dépend de : E18 Domaine Pilotage (EN18.1/EN18.2/EN18.9) · E40 Profil & adaptation (altitude par profil)
- Coordonné avec : E03 Ressources & temps (capacité transverse) · E26 Budget (coûts)

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers** | |
| [EN22.1 — Modèle temporel unique & ordonnancement](ENABLERS/en-modele-temporel-unique.md) | ⬜ |
| [EN22.2 — Performance & collaboration web du Gantt](ENABLERS/en-performance-gantt-web.md) | ⬜ |
| [EN22.3 — Connecteurs calendrier & disponibilité](ENABLERS/en-connecteurs-calendrier-disponibilite.md) | ⬜ |
| **F22.1 — Roadmap / Gantt (socle)** | |
| [US22.1.1 — Créer et gérer un projet sur la roadmap](FEATURES/roadmap/us-creer-projet-roadmap.md) | ⬜ |
| [US22.1.2 — Visualiser la roadmap en vue Gantt](FEATURES/roadmap/us-vue-gantt.md) | ⬜ |
| [US22.1.3 — Gérer les jalons et dépendances entre projets](FEATURES/roadmap/us-jalons-dependances.md) | ⬜ |
| **F22.2 — Planification (benchmark PPM)** | |
| [US22.2.1 — Gantt, dépendances, jalons](FEATURES/planification/us-gantt-dependances-jalons.md) | ⬜ |
| [US22.2.2 — Chemin critique](FEATURES/planification/us-chemin-critique.md) | ⬜ |
| [US22.2.3 — Vues multiples](FEATURES/planification/us-vues-multiples.md) | ⬜ |
| [US22.2.4 — Modèles de projets](FEATURES/planification/us-modeles-projets.md) | ⬜ |
| [US22.2.5 — Baselines et historisation](FEATURES/planification/us-baselines-historisation.md) | ⬜ |
| [US22.2.6 — Hybride cascade/agile](FEATURES/planification/us-hybride-cascade-agile.md) | ⬜ |
| **F22.3 — Roadmap rapide (vue macro)** | |
| [US22.3.1 — Créer une roadmap rapide](FEATURES/roadmap-rapide/us-creer-roadmap-rapide.md) | ⬜ |
| [US22.3.2 — Échelle de temps floue](FEATURES/roadmap-rapide/us-echelle-temps-floue.md) | ⬜ |
| [US22.3.3 — Vue Now / Next / Later](FEATURES/roadmap-rapide/us-now-next-later.md) | ⬜ |
| [US22.3.4 — Jalons stratégiques](FEATURES/roadmap-rapide/us-jalons-strategiques.md) | ⬜ |
| [US22.3.5 — Partage & export de la roadmap](FEATURES/roadmap-rapide/us-partage-export-roadmap.md) | ⬜ |
| **F22.4 — Planification Gantt (parité MS Project)** | |
| [US22.4.1 — WBS : tâches & tâches récapitulatives](FEATURES/gantt-detaille/us-wbs-taches-recapitulatives.md) | ⬜ |
| [US22.4.2 — Durées, effort, planification auto vs manuelle](FEATURES/gantt-detaille/us-duree-effort-planif-auto-manuelle.md) | ⬜ |
| [US22.4.3 — Dépendances typées (FS/SS/FF/SF) + retard/avance](FEATURES/gantt-detaille/us-dependances-typees.md) | ⬜ |
| [US22.4.4 — Contraintes de date & échéances](FEATURES/gantt-detaille/us-contraintes-echeances.md) | ⬜ |
| [US22.4.5 — Calendriers ouvrés & exceptions](FEATURES/gantt-detaille/us-calendriers-ouvres.md) | ⬜ |
| [US22.4.6 — Jalons & tâches périodiques](FEATURES/gantt-detaille/us-jalons-taches-periodiques.md) | ⬜ |
| [US22.4.7 — Chemin critique, marges & fractionnement](FEATURES/gantt-detaille/us-chemin-critique-marges-split.md) | ⬜ |
| [US22.4.8 — Suivi d'avancement](FEATURES/gantt-detaille/us-suivi-avancement.md) | ⬜ |
| [US22.4.9 — Baselines multiples & analyse des écarts](FEATURES/gantt-detaille/us-baselines-ecarts.md) | ⬜ |
| [US22.4.10 — Interactions Gantt directes](FEATURES/gantt-detaille/us-interactions-gantt.md) | ⬜ |
| **F22.5 — Ressources dans le plan** | |
| [US22.5.1 — Affecter des ressources aux tâches](FEATURES/ressources-plan/us-affectation-ressources.md) | ⬜ |
| [US22.5.2 — Courbes de charge & sur-affectation](FEATURES/ressources-plan/us-charge-suraffectation.md) | ⬜ |
| [US22.5.3 — Nivellement des ressources](FEATURES/ressources-plan/us-nivellement-ressources.md) | ⬜ |
| [US22.5.4 — Coûts du plan](FEATURES/ressources-plan/us-couts-plan.md) | ⬜ |
| **F22.6 — Vues & restitutions** | |
| [US22.6.1 — Vues multiples (Gantt, chronologie, calendrier, réseau…)](FEATURES/vues-restitutions/us-vues-multiples.md) | ⬜ |
| [US22.6.2 — Colonnes, filtres, regroupements & tri](FEATURES/vues-restitutions/us-colonnes-filtres-groupes.md) | ⬜ |
| [US22.6.3 — Mise en forme & impression](FEATURES/vues-restitutions/us-mise-en-forme-impression.md) | ⬜ |
| [US22.6.4 — Export & rapports de pilotage](FEATURES/vues-restitutions/us-export-rapports.md) | ⬜ |
| **F22.7 — Interopérabilité MS Project** | |
| [US22.7.1 — Import de plannings MS Project](FEATURES/interop-msproject/us-import-msproject.md) | ⬜ |
| [US22.7.2 — Export MS Project & Excel](FEATURES/interop-msproject/us-export-msproject.md) | ⬜ |
| [US22.7.3 — Format d'échange ouvert (réversibilité)](FEATURES/interop-msproject/us-format-echange-ouvert.md) | ⬜ |
| [US22.7.4 — Import/export Primavera P6 (XER / P6 XML)](FEATURES/interop-msproject/us-primavera-p6.md) | ⬜ |
| [US22.7.5 — Formats tableur & données (CSV, XLSX, JSON, API)](FEATURES/interop-msproject/us-tableur-donnees-api.md) | ⬜ |
| [US22.7.6 — Export iCalendar (.ics)](FEATURES/interop-msproject/us-icalendar.md) | ⬜ |
| [US22.7.7 — Interop outils agiles & de travail (Jira, Azure DevOps, Asana…)](FEATURES/interop-msproject/us-outils-agiles-travail.md) | ⬜ |
| [US22.7.8 — Interop outils PM open source](FEATURES/interop-msproject/us-outils-pm-open-source.md) | ⬜ |
| [US22.7.9 — Export documents & présentation (PDF, PNG/SVG, PowerPoint)](FEATURES/interop-msproject/us-documents-presentation.md) | ⬜ |
| **F22.8 — Interfaces inter-modules & SI** | |
| [US22.8.1 — Afficher les sprints sur la roadmap](FEATURES/interfaces-modules-si/us-sprints-sur-roadmap.md) | ⬜ |
| [US22.8.2 — Afficher les versions applicatives (releases)](FEATURES/interfaces-modules-si/us-versions-applicatives.md) | ⬜ |
| [US22.8.3 — Weekends & jours fériés par pays / localité](FEATURES/interfaces-modules-si/us-feries-weekends-pays.md) | ⬜ |
| [US22.8.4 — Interconnexion SI d'absences / RH (SAP, Workday…)](FEATURES/interfaces-modules-si/us-si-absences-rh-sap.md) | ⬜ |
| [US22.8.5 — Overlays inter-modules Pilotage](FEATURES/interfaces-modules-si/us-overlays-inter-modules.md) | ⬜ |
| [US22.8.6 — Plage d'événement → pré-réservation MeetOps](FEATURES/interfaces-modules-si/us-plage-evenement-meetops.md) | ⬜ |
