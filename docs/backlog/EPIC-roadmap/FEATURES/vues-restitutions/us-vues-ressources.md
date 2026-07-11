# US22.6.1c — Vues ressources (Feuille de ressources & Utilisation tâches/ressources)

**En tant que** utilisateur métier
**Je veux** basculer vers la Feuille de ressources et les vues d'Utilisation (par tâche, par ressource) du même projet
**Afin de** consulter la charge et les affectations sous l'angle ressources (parité vues MS Project)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet, when j'ouvre la Feuille de ressources via le sélecteur multi-vues (US22.6.1a), then la liste des ressources et leurs affectations s'affiche à partir des données de US22.5.1 | ⬜ |
| Given un projet, when j'ouvre la vue Utilisation des ressources, then la charge par ressource dans le temps (dont sur-affectations) est visible en cohérence avec les courbes de charge (US22.5.2) | ⬜ |
| Given un projet, when j'ouvre la vue Utilisation des tâches, then chaque tâche affiche ses ressources affectées et la répartition de charge associée, sans dupliquer le modèle temporel (EN22.1) | ⬜ |
| Error : given un projet dont aucune tâche n'a de ressource affectée, when j'ouvre une vue ressources, then le système affiche un état vide explicite (invitation à affecter des ressources) plutôt qu'un tableau vide ambigu | ⬜ |
| Security : given un utilisateur non membre de l'équipe rattachée au projet (EN18.2), when il tente d'ouvrir une vue ressources via l'API, then le système répond 404 (non-membre et cross-tenant traités de façon identique) sans exposer ressources ni charges ; isolation multi-tenant garantie | ⬜ |
| Security : given un utilisateur authentifié membre du tenant mais sans droit de lecture sur ce projet, when il tente d'ouvrir une vue ressources via l'API, then le système répond 403 (droit insuffisant, distinct du 404 de non-divulgation) sans exposer ressources ni charges | ⬜ |
| A11y : les vues ressources (tableaux de charge et d'affectation) sont navigables au clavier avec en-têtes de colonnes/lignes associés (`scope`/`aria`), et les sur-affectations sont signalées autrement que par la seule couleur, conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Vues temporelles (Gantt, Chronologie, Calendrier) et socle du sélecteur multi-vues : couverts par US22.6.1a.
- Vue Réseau (PERT) et vue Tableau/Kanban : couvertes par US22.6.1b.
- Le calcul des affectations et des courbes de charge lui-même : porté par US22.5.1 (affectations) et US22.5.2 (courbes de charge & sur-affectation) — cette US n'assure que la restitution en vues dédiées.
- Le nivellement/lissage des ressources (résolution des sur-affectations) : hors périmètre de la parité vues.
- Colonnes, filtres, regroupements et tris : couverts par US22.6.2 ; export des vues : US22.6.4 et F22.7.

## Notes d'implémentation
- Les vues ressources consomment le graphe temporel unique (EN22.1) et les données d'affectation/charge de US22.5.1 et US22.5.2 via le sélecteur mutualisé introduit par US22.6.1a : aucun stockage de données propre à ces vues.
- La disponibilité de la Feuille de ressources peut être conditionnée par le profil d'organisation (altitude pilotée par E40).
- Le guard d'accès projet (EN18.2) est appliqué en amont : la restitution ressources respecte strictement le droit de lecture de l'utilisateur, comme les autres vues.
- Les sur-affectations réutilisent la sémantique déjà définie par US22.5.2 ; cette US ne recalcule pas la charge côté client.

---
Item Type: US · Parent: F22.6 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: US22.6.1a (socle sélecteur multi-vues), EN22.1 (modèle temporel unique), US22.5.1 (affectations de ressources), US22.5.2 (courbes de charge & sur-affectation), EN18.2 (guard d'accès projet)
