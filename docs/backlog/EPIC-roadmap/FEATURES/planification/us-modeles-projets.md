# US22.2.4 — Modèles de projets

**En tant que** PMO
**Je veux** disposer d'une bibliothèque de modèles de projets réutilisables et gouvernés
**Afin de** transposer les méthodes internes et homogénéiser la création des projets

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un modèle de projet, when un utilisateur crée un projet à partir du modèle, then la structure (phases, tâches, jalons) est instanciée | ⬜ |
| Les modèles sont gouvernés : création, publication et administration par un propriétaire désigné | ⬜ |
| Error : given un modèle obsolète, system empêche son instanciation et signale son statut | ⬜ |
| Security/Gouvernance : les modèles internes sont chartés et leur diffusion respecte les droits par périmètre | ⬜ |
| A11y : la bibliothèque de modèles (parcours de sélection et d'instanciation) est navigable au clavier et conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre

- L'édition détaillée du planning une fois le projet instancié (WBS, dépendances, jalons fins) : couverte par US22.2.1/F22.4, cette US ne fait qu'instancier la structure initiale du modèle
- Le moteur d'ordonnancement et le recalcul des dates après instanciation : porté par EN22.1, cette US pose uniquement la structure
- La gestion des droits d'accès générique (rôles, permissions transverses) : rattachée à l'IAM (E01), cette US ne fait qu'appliquer un périmètre de diffusion par modèle
- L'import de modèles depuis des outils externes (MS Project, GanttProject…) : couvert par F22.7, hors périmètre ici

## Notes d'implémentation

- Un modèle capture une structure de phases/tâches/jalons sans dates absolues (dates relatives ou durées) ; l'instanciation doit projeter ces durées relatives sur une date de démarrage réelle via le moteur EN22.1
- Le statut du modèle (brouillon/publié/obsolète) conditionne son instanciation (AC Error) — prévoir un champ de statut explicite plutôt qu'une simple suppression du modèle
- La gouvernance (propriétaire désigné, droits de diffusion par périmètre) doit s'appuyer sur les mécanismes de rôles/permissions déjà en place dans le domaine Pilotage (EN18.2 guard), sans réinventer un système de droits ad hoc

---
Item Type: US · Parent: F22.2 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Rôle: officier-responsable-pmo
Source: PP-005 · MoSCoW: Must · Lot: Lot 1 · Origine: Socle 3/3
Profils: Tous
Justification: Dossier §4
Dépendances: —
