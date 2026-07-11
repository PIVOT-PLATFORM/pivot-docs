# US21.9.2 — Ouvrir les risques depuis la fiche projet (onglet + deep-link)

**En tant que** chef de projet
**Je veux** un onglet « Risques » dans la fiche projet du domaine Pilotage qui ouvre le module Risque filtré sur mon projet
**Afin de** passer de mon cockpit projet à mes risques sans changer de contexte

## Contexte

Chaînon de navigation Pilotage → Risque. L'onglet « Risques » de la fiche projet (pivot-pilotage-ui) est un **deep-link** vers pivot-risk-ui pré-filtré sur le `project_ref` (ex. `/risk?project={project_ref}`). Aucune duplication de données côté pilotage : la vue vit dans le module Risque.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une fiche projet dans pivot-pilotage-ui, when le chef de projet ouvre l'onglet « Risques », then il est redirigé vers pivot-risk-ui pré-filtré sur le `project_ref` de ce projet (`/risk?project={project_ref}`) | ⬜ |
| Given le module Risque ouvert via ce deep-link, when la vue se charge, then seuls les risques dont le `project_ref` correspond au projet ciblé sont affichés | ⬜ |
| Error : given un projet sans aucun risque associé, when le chef de projet ouvre l'onglet « Risques », then un état vide explicite s'affiche avec une action « Ajouter un risque » plutôt qu'une liste vide non expliquée | ⬜ |
| Security : le deep-link ne contourne pas les habilitations — l'accès est refusé si l'utilisateur n'est pas habilité sur le projet ciblé, même en connaissant l'URL du deep-link | ⬜ |
| A11y : l'onglet et la navigation clavier associée sont conformes WCAG 2.1 AA (focus visible, accessible au clavier, annoncé par lecteur d'écran) | ⬜ |

## Hors périmètre
- Le contenu de la vue Risque elle-même (matrice, top risques, plan d'action) — porté par US21.8.1 (Vue chef de projet) et les US de scoring/cycle de vie, réutilisé ici tel quel.
- La duplication de données de risque côté pilotage — explicitement exclue : la fiche projet ne fait que rediriger, elle n'affiche aucune donnée de risque en propre.
- La création du `project_ref` et sa résolution — pré-requis fourni par US21.9.1.
- Le widget « Top risques » intégré directement dans le cockpit projet (sans changer de module) — couvert séparément par US21.9.3.

## Notes d'implémentation
- Dépend de US21.9.1 pour disposer d'un `project_ref` résolu et de US21.8.1 pour que la vue chef de projet existe côté module Risque (cible du deep-link).
- Le deep-link est un simple lien applicatif (`/risk?project={project_ref}`), pas un iframe ni un rendu partagé — cohérent avec l'architecture multi-repo composable (ADR-008) : pivot-pilotage-ui et pivot-risk-ui restent des déploiements indépendants.
- Le contrôle d'habilitation sur le projet doit être revérifié côté pivot-risk-ui à la réception du deep-link, pas seulement côté pilotage avant la redirection (défense en profondeur).

---
Item Type: US · Parent: F21.9 · Module: risk · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Dépendances: US21.9.1, US21.8.1
