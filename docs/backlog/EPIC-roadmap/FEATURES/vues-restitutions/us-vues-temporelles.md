# US22.6.1a — Socle multi-vues & vues temporelles (Gantt, Chronologie, Calendrier)

**En tant que** utilisateur métier
**Je veux** basculer entre les vues temporelles Gantt, Chronologie (roadmap) et Calendrier d'un même projet
**Afin de** consulter le même plan sous l'angle temporel adapté à mon besoin (parité vues MS Project)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet avec un sélecteur de vue, when je choisis Gantt, Chronologie ou Calendrier, then les mêmes données temporelles s'affichent sous la vue choisie sans rechargement du modèle (même graphe `Projet → Phase → Tâche → Jalon → Dépendance`, EN22.1) | ⬜ |
| Given la vue Chronologie (roadmap), when je l'ouvre, then les phases et jalons se positionnent sur un axe temporel condensé et lisible | ⬜ |
| Given la vue Calendrier, when je l'ouvre, then les tâches et jalons apparaissent sur les jours/semaines/mois correspondant à leurs dates planifiées | ⬜ |
| Given un plan volumineux (10 000+ tâches, EN22.2), when j'ouvre la vue Gantt, then le rendu reste fluide grâce à la virtualisation (pas de rendu naïf de toutes les lignes) | ⬜ |
| Error : given un projet sans aucune tâche ni jalon planifié, when j'ouvre une vue temporelle, then le système affiche un état vide explicite (message d'invitation à planifier) plutôt qu'une grille vide ambiguë | ⬜ |
| Security : given un utilisateur non membre de l'équipe rattachée au projet (EN18.2), when il tente d'ouvrir une vue via l'API, then le système répond 404 (non-membre et cross-tenant traités de façon identique) et n'expose aucune donnée temporelle ; isolation multi-tenant garantie quelle que soit la vue | ⬜ |
| A11y : chaque vue temporelle est navigable intégralement au clavier (déplacement de focus sur tâches/jalons, changement de vue via menu accessible), les changements de vue sont annoncés (`aria-live`), conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Vue Réseau (PERT) et vue Tableau/Kanban : couvertes par US22.6.1b.
- Vues ressources (Feuille de ressources, Utilisation tâches/ressources) : couvertes par US22.6.1c.
- Colonnes, filtres, regroupements et tris au sein de chaque vue : couverts par US22.6.2.
- Mise en forme visuelle (styles de barres, en-têtes d'impression) : couverte par US22.6.3.
- Export des vues (Excel/PDF/image) : couvert par US22.6.4 et F22.7.

## Notes d'implémentation
- Les trois vues temporelles consomment le même graphe temporel unique (EN22.1) : aucune vue ne maintient son propre stockage de données. Le sélecteur de vue est mutualisé et réutilisé par US22.6.1b et US22.6.1c.
- Le rendu Gantt doit rester compatible avec la virtualisation visée par EN22.2 pour les fortes volumétries.
- Le guard d'accès projet (équipe rattachée, EN18.2) est appliqué en amont du rendu de toute vue — la vérification de droit de lecture est identique quelle que soit la vue choisie.
- Cette US porte le socle du sélecteur multi-vues (contrat commun de commutation), réutilisé par les enfants suivants.

---
Item Type: US · Parent: F22.6 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique), EN22.2 (performance & collaboration web du Gantt), EN18.2 (guard d'accès projet)
