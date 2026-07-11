# US22.2.3 — Vues multiples

**En tant que** chef de projet
**Je veux** disposer de vues tableau/Kanban, liste, calendrier et chronologie avec filtres, regroupements et export Excel
**Afin de** consulter et présenter le projet sous l'angle adapté à chaque usage

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet, when l'utilisateur change de vue, then les mêmes données s'affichent en tableau/Kanban, liste, calendrier ou chronologie | ⬜ |
| Les filtres et regroupements s'appliquent de façon cohérente à toutes les vues | ⬜ |
| L'export Excel restitue les données filtrées de la vue courante | ⬜ |
| Error : given un filtre combiné ne retournant aucun résultat, system affiche un état vide explicite plutôt qu'une vue figée ou une erreur technique | ⬜ |
| Security : chaque vue et l'export Excel n'exposent que les projets/tâches sur lesquels l'utilisateur a un droit de lecture | ⬜ |
| A11y : chaque vue est navigable au clavier et conforme RGAA 4 / WCAG 2.1 AA | ⬜ |

## Hors périmètre

- La vue Gantt détaillée et la vue Réseau (PERT) : couvertes par US22.6.1 (parité vues MS Project, niveau F22.6), cette US porte les vues socle du benchmark PPM (tableau/Kanban, liste, calendrier, chronologie)
- La mise en forme avancée et l'impression paginée : couvertes par US22.6.3
- Les rapports de synthèse et l'export en formats autres qu'Excel (PDF, image, PowerPoint) : couverts par US22.6.4/F22.7
- La définition des colonnes personnalisables et des règles de regroupement avancées (agrégations, sous-totaux) au-delà du filtrage/regroupement de base : à approfondir si besoin dans US22.6.2

## Notes d'implémentation

- Toutes les vues doivent consommer le même modèle temporel unique (EN22.1) — pas de stockage parallèle par type de vue, pour garantir que filtres/regroupements restent cohérents partout
- L'export Excel doit appliquer les mêmes filtres actifs que la vue courante au moment de l'export (pas un export de la totalité des données du projet)
- Cette US est au niveau socle F22.2 (benchmark PPM, tous profils) ; elle est un pré-requis fonctionnel pour US22.6.1 qui étend la palette de vues (Gantt/Réseau/Ressources) au niveau F22.6

---
Item Type: US · Parent: F22.2 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Rôle: chef-de-projet
Source: PP-003 · MoSCoW: Must · Lot: Lot 1 · Origine: Socle 3/3
Profils: Tous
Justification: Dossier §4
Dépendances: —
