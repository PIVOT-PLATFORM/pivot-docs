# US33.1.4 — Tâches du quotidien

**En tant que** contributeur (individuel ou membre d'équipe)
**Je veux** créer et gérer des tâches légères (titre, description, checklist, pièces jointes, étiquettes, échéance, affectations multiples) regroupées en compartiments
**Afin de** suivre mon travail au quotidien, y compris avant qu'il ne soit rattaché à un projet du portefeuille

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un compartiment de tâches, when le contributeur crée une tâche, then il peut renseigner titre (obligatoire), description, checklist, pièces jointes, étiquettes, échéance et l'affecter à une ou plusieurs personnes | ⬜ |
| Given des tâches existantes, when le contributeur les consulte, then elles sont regroupées en compartiments dont l'ordre peut être modifié par glisser-déposer, et disponibles en vue tableau et en vue liste, avec les mêmes filtres et regroupements que ceux du module Roadmap (cohérence avec US22.2.3) | ⬜ |
| Given une tâche avec checklist, when un élément de la checklist est coché, then la progression de la tâche (ex. 2/5) est visible sans ouvrir le détail | ⬜ |
| Error : given une création de tâche sans titre, system refuse la création et signale le champ manquant | ⬜ |
| Security : seuls le créateur, les personnes affectées et le PMO du périmètre concerné peuvent voir/éditer une tâche ; un compartiment personnel n'est visible par d'autres utilisateurs qu'après partage explicite | ⬜ |
| A11y : la création/édition de tâche, la checklist et les vues tableau/liste sont conformes RGAA 4 / WCAG 2.1 AA — navigation clavier complète, focus géré à l'ouverture/fermeture du détail de tâche | ⬜ |

## Hors périmètre

- Le rattachement de la tâche à un projet du portefeuille et la remontée d'avancement associée : couverts par US33.1.2 (continuum tâches-projets)
- La discussion contextuelle (mentions, fils, notifications) autour d'une tâche : couverte par US33.1.1 (collaboration contextuelle)
- Les vues avancées de planification (Gantt, WBS, dépendances, chemin critique) : portées par le module Roadmap (E22) une fois la tâche rattachée à un projet — cette US ne couvre que les vues socle (tableau, liste)
- Les modèles de tâches réutilisables et gouvernés par l'organisation (ex. checklist type onboarding) : non couverts ici, à traiter dans une US ultérieure si le besoin est confirmé
- La création automatique de tâches depuis des e-mails ou des transcriptions de réunion : couverte par le module IA & agents (E34, ex. capture des décisions de réunion)
- L'agrégation de capacité/charge à partir de ces tâches légères (une tâche du quotidien non rattachée à un projet n'entre pas dans le plan de charge E32 tant qu'elle n'est pas affectée à une ressource sur un projet, cf. US32.1.1)

## Notes d'implémentation

- Entité `Task` propre au schéma `pilotage`, distincte des tâches WBS du Gantt (E22, `Projet → Phase → Tâche` d'EN22.1) — le rattachement (US33.1.2) crée un lien entre les deux modèles, jamais une fusion ni un double stockage
- Cette US comble un écart structurel : US33.1.1 (collaboration contextuelle) et US33.1.2 (continuum tâches-projets) présupposaient déjà l'existence d'une tâche « du quotidien » sans jamais définir l'entité elle-même — identifié lors du raffinement benchmark 2026-07 (cahier MS Planner §3.1, EF-TSK-01)
- Réutiliser les composants `@pivot/design-system` de checklist/étiquette s'ils existent déjà côté E30/E42 avant d'en dupliquer de nouveaux
- Le compartiment est un simple regroupement libre (pas une colonne de workflow à statuts) — à distinguer du board agile Kanban/sprint synchronisé Plane (E28, US28.1.4), qui reste l'outil de référence pour la delivery agile structurée
- Prévoir l'émission d'un événement sur le bus PIVOT à la création/mise à jour d'une tâche, pour permettre au fil de discussion (US33.1.1) et au rattachement projet (US33.1.2) de s'y abonner sans couplage direct

---
Item Type: US · Parent: F33.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Source: Écart agent 2026-07-08 · MoSCoW: Should · Lot: Lot 1 · Origine: MS Planner EF-TSK-01/EF-TSK-05 (tâches d'équipe non couvertes)
Profils: Tous
Justification: Cahier MS Planner/Project §3.1 (EF-TSK-01, EF-TSK-05) — entité tâche du quotidien manquante alors que US33.1.1 et US33.1.2 la présupposent déjà toutes deux
Dépendances: —
