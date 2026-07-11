# US35.1.2 — Registre des risques

**En tant que** PMO
**Je veux** gérer les risques et problèmes aux niveaux projet, programme et portefeuille avec des plans d'action
**Afin de** identifier, suivre et traiter les risques à chaque niveau du portefeuille

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet, un programme ou un portefeuille, when le PMO enregistre un risque ou un problème avec un plan d'action, then il est rattaché au bon niveau et visible dans le registre correspondant | ⬜ |
| Given des risques enregistrés au niveau projet, when on consulte le registre au niveau programme ou portefeuille, then les risques remontent et sont consolidés (agrégation par gravité/statut) au niveau supérieur | ⬜ |
| Error : given un risque marqué critique sans plan d'action associé, system le signale visuellement (indicateur d'alerte dans le registre) tant qu'aucun plan d'action n'est renseigné | ⬜ |
| Security : la visibilité d'un risque dans le registre consolidé respecte le périmètre de visibilité de l'utilisateur (US35.1.1) — un risque projet ne remonte au niveau portefeuille que pour les rôles habilités à voir ce portefeuille, pas de fuite d'information via l'agrégation | ⬜ |
| Security : l'historique des risques et de leur traitement (création, changement de statut, plan d'action) est conservé et attribué à son auteur, pour permettre d'auditer le suivi réel des risques dans le temps | ⬜ |
| A11y : le registre des risques (tableau, indicateurs de gravité/criticité) est conforme WCAG 2.1 AA — la criticité n'est pas portée uniquement par la couleur et le tableau est navigable au clavier | ⬜ |

## Hors périmètre
- Notifications automatiques (email, push) lors de la création d'un risque critique sans plan d'action — cette US couvre le signalement visuel dans le registre, pas un système de notification proactif
- Méthodologie de cotation du risque (matrice probabilité/impact, échelle de criticité) — à cadrer avec le client au Gate 1, cette US porte le mécanisme d'enregistrement/consolidation, pas la définition de la grille de cotation
- Registre des risques comme flux transverse hors pilotage (ex. risques HSE, risques juridiques non liés à un projet) — hors périmètre de ce registre projet/programme/portefeuille

## Notes d'implémentation
- Le rattachement risque→niveau (projet/programme/portefeuille) doit s'appuyer sur la même hiérarchie de périmètre que celle utilisée par US35.1.1 (Droits par rôle et périmètre) pour garantir la cohérence de la consolidation et du contrôle d'accès
- La consolidation (remontée projet→portefeuille) implique une agrégation en base dans `pivot-pilotage-core` (schéma Flyway `pilotage`) — vérifier la volumétrie attendue avant de choisir entre agrégation à la volée (requête) et matérialisation (vue/table de consolidation)
- Item classé "2/3 (PM, Sciforma)" dans le benchmark — fonctionnalité standard du marché PPM, peu de risque de sur-interprétation sur le périmètre fonctionnel de base

---
Item Type: US · Parent: F35.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: officier-responsable-pmo
Source: PP-020 · MoSCoW: Must · Lot: Lot 2 · Origine: 2/3 (PM, Sciforma)
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Dossier §5.1
Dépendances: —
