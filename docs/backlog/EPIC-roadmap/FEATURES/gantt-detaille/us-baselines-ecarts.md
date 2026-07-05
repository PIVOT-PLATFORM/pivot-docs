# US22.4.9 — Baselines multiples & analyse des écarts

**En tant que** PMO
**Je veux** figer plusieurs références (baselines) et comparer planifié vs réel (dates, durée, travail, coût)
**Afin de** mesurer la dérive et objectiver le pilotage

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un planning, when je pose une baseline, then dates/durée/travail/coût de référence sont figés (jusqu'à 11 baselines, comme MS Project) | ⬜ |
| Given une baseline, when le réel diverge, then les écarts (jours, %, coût) sont calculés et affichés | ⬜ |
| Given deux baselines, when je les compare, then l'évolution entre références est visible | ⬜ |
| Error : given une tentative de poser une 12e baseline (au-delà de la limite de 11), then le système refuse et invite à écraser ou supprimer une baseline existante | ⬜ |
| Security : seul un utilisateur avec un rôle PMO ou chef de projet peut poser, écraser ou supprimer une baseline ; un contributeur planning ne peut que consulter les écarts | ⬜ |
| A11y : le tableau de comparaison des écarts (planifié vs réel) est navigable au clavier et les écarts positifs/négatifs ne sont pas signalés uniquement par la couleur (texte/icône associés) | ⬜ |

## Hors périmètre
- La saisie de l'avancement réel qui alimente les écarts : couverte par US22.4.8
- Le calcul des coûts réels affectés (main-d'œuvre, autres coûts) : couvert par US22.5.4
- L'export des écarts en rapport formaté (PDF/Excel) : couvert par F22.6/F22.7

## Notes d'implémentation
- La limite de 11 baselines reprend celle de MS Project (Baseline + Baseline 1 à 10) ; chaque baseline fige un instantané (dates, durée, travail, coût) de l'ensemble des tâches du projet à un instant T
- Le calcul des écarts (variance) doit comparer les valeurs courantes du graphe temporel unique (EN22.1) à l'instantané figé, sans recalculer rétroactivement la baseline elle-même
- Prévoir que poser une baseline sur un plan de 10 000+ tâches reste performant (EN22.2) : l'instantané doit être une copie légère, pas une duplication complète synchrone bloquante

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
