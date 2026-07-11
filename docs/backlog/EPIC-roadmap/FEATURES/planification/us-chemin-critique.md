# US22.2.2 — Chemin critique

**En tant que** chef de projet
**Je veux** calculer et visualiser le chemin critique du projet
**Afin de** prioriser les ressources et les affectations sur les tâches déterminantes pour la date de fin

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un planning avec dépendances, when le chef de projet demande le chemin critique, then les tâches critiques sont calculées et mises en évidence | ⬜ |
| Le chemin critique se recalcule automatiquement après modification du planning | ⬜ |
| Error : given un planning sans dépendance exploitable, system indique que le chemin critique n'est pas calculable | ⬜ |
| Security : le calcul et l'affichage du chemin critique respectent les droits de lecture de l'utilisateur sur le projet (pas de fuite de tâches hors périmètre autorisé) | ⬜ |
| A11y : la mise en évidence du chemin critique ne repose pas uniquement sur la couleur (RGAA) | ⬜ |

## Hors périmètre

- Le calcul des marges libre/totale par tâche et le fractionnement (split) : couverts par US22.4.7 dans le Gantt détaillé
- Le nivellement des ressources et la résolution de sur-affectation : couvert par F22.5
- La gestion des dépendances typées (FS/SS/FF/SF) et des contraintes de date elles-mêmes : couverte par US22.4.3/US22.4.4, cette US consomme ces dépendances pour le calcul
- Les baselines et l'analyse d'écarts historisés : couvertes par US22.2.5

## Notes d'implémentation

- Le calcul du chemin critique (algorithme CPM classique : dates au plus tôt/au plus tard, marge totale = 0) doit s'appuyer sur le moteur d'ordonnancement unique du modèle temporel (EN22.1), pas sur une logique dupliquée par vue
- Le recalcul automatique après modification du planning doit rester performant sur la volumétrie visée par EN22.2 (10 000+ tâches) — éviter un recalcul complet naïf à chaque édition
- La détection de dépendance circulaire (cf. US22.2.1) est un prérequis : un cycle rend le chemin critique non calculable et doit être traité en amont, pas dans cette US

---
Item Type: US · Parent: F22.2 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Rôle: chef-de-projet
Source: PP-002 · MoSCoW: Must · Lot: Lot 1 · Origine: Socle 3/3
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Dossier §4
Dépendances: —
