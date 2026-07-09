# US27.6.1 — Lier des initiatives / projets aux KR

**En tant que** responsable pilotage
**Je veux** rattacher des **initiatives** (projets, chantiers, epics) aux KR — le « comment » qui fait bouger le résultat
**Afin de** distinguer les résultats (KR) des actions (initiatives) et suivre leur contribution

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un KR, when je lui rattache une ou plusieurs initiatives, then leur avancement est visible sans se substituer à la mesure du KR | ⬜ |
| Given une initiative, when elle avance, then elle n'update pas mécaniquement le KR (le KR reste une mesure de résultat, pas de tâche) | ⬜ |
| Error : given une initiative déjà supprimée ou inaccessible côté source, when le KR l'affiche, then le rattachement est signalé comme rompu plutôt que de faire échouer l'affichage du KR | ⬜ |
| Security : seul un utilisateur habilité sur l'objectif (owner ou contributeur autorisé) peut créer/retirer un rattachement initiative↔KR | ⬜ |
| A11y : la liste des initiatives rattachées à un KR est restituable par un lecteur d'écran (libellés, statut d'avancement en texte, pas seulement une barre de progression graphique) | ⬜ |

## Hors périmètre
- La création ou la gestion du cycle de vie des initiatives elles-mêmes (projets, epics) — hors du module OKR, cette US ne fait que le rattachement
- La consolidation via deep-links avec roadmap/portefeuille/risques (E22/E23/E21) — couverte par US27.6.2
- Le calcul automatique de contribution quantitative de l'initiative au score du KR — explicitement exclu par le principe séparation résultat/action

## Notes d'implémentation
- Le rattachement initiative↔KR est un lien de suivi (visibilité de l'avancement), jamais une source d'update automatique du KR — cf. modèle EN27.1 où Initiative est une entité distincte du KeyResult
- Une initiative peut recouper plusieurs KR (relation many-to-many à prévoir dans le modèle)
- Le principe directeur (Doerr) « les KR mesurent des résultats, les initiatives portent le comment » doit rester visible dans l'UI pour éviter la confusion avec une simple todo-list

---
Item Type: US · Parent: F27.6 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
