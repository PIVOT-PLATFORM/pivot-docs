# US22.6.1 — Vues multiples (Gantt, chronologie, calendrier, réseau, ressources)

**En tant que** utilisateur métier
**Je veux** basculer entre Gantt, Chronologie (roadmap), Calendrier, Réseau (PERT), Feuille de ressources, Utilisation tâches/ressources, Tableau/Kanban
**Afin de** consulter le même plan sous l'angle adapté (parité vues MS Project)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet, when je change de vue, then les mêmes données s'affichent sous la vue choisie (même modèle, EN22.1) | ⬜ |
| Given la vue Réseau, when je l'ouvre, then les tâches et dépendances apparaissent en diagramme PERT | ⬜ |
| Given la vue Feuille de ressources ou Utilisation, when je l'ouvre, then charge et affectations par ressource sont visibles (cf. US22.5.1/US22.5.2) | ⬜ |
| Error : given un projet sans tâches/dépendances exploitables, when j'ouvre la vue Réseau, system affiche un état vide explicite plutôt qu'un diagramme cassé | ⬜ |
| Security : chaque vue n'affiche que les projets/tâches sur lesquels l'utilisateur a un droit de lecture (cohérent quelle que soit la vue choisie) | ⬜ |
| A11y : chaque vue (Gantt, Chronologie, Calendrier, Réseau, Feuille de ressources, Tableau/Kanban) est navigable au clavier et conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre

- Les colonnes, filtres, regroupements et tris avancés au sein de chaque vue : couverts par US22.6.2
- La mise en forme visuelle (styles de barres, en-têtes d'impression) : couverte par US22.6.3
- L'export des vues (Excel/PDF/image) : couvert par US22.6.4 et F22.7
- Le calcul du chemin critique affiché dans la vue Réseau : le calcul lui-même est porté par US22.2.2, cette US n'assure que l'affichage

## Notes d'implémentation

- Toutes les vues consomment le même graphe temporel (`Projet → Phase → Tâche → Jalon → Dépendance`, EN22.1) : aucune vue ne doit maintenir son propre stockage de données
- La vue Réseau (PERT) doit se recalculer si les dépendances changent (cohérence avec le chemin critique, US22.2.2)
- La disponibilité de certaines vues (Feuille de ressources, Réseau) peut être conditionnée par le profil d'organisation (altitude pilotée par E40 — TPE/PME en roadmap rapide n'a pas nécessairement besoin de la vue Réseau)
- Le rendu doit rester compatible avec la virtualisation visée par EN22.2 pour les vues à forte volumétrie (Gantt, Tableau)

---
Item Type: US · Parent: F22.6 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: High
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
