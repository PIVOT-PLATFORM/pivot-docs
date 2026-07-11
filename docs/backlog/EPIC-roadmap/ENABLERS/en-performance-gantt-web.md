# EN22.2 — Performance & collaboration web du Gantt

**Type d'enabler** : performance · frontend

**Objectif technique** : Rendre le Gantt **fluide dans le navigateur** au niveau d'un client lourd : rendu **virtualisé** (seules les barres visibles sont dessinées), **recalcul incrémental** du chemin critique et de l'ordonnancement, **co-édition temps réel** et undo/redo.

**Justification** : la parité MS Project en web ne tient que si la performance suit sur de grands plannings (cf. PP-032 : 100+ projets < 1 min ; NFR « 30 fps sur 10 000 objets »).

**Critères de complétion** :
- [ ] Rendu virtualisé du Gantt : ≥ 30 fps et interactions fluides sur **10 000+ tâches**
- [ ] Recalcul **incrémental** (seules les tâches impactées) après une modification
- [ ] Co-édition temps réel (présence, verrous optimistes) + **undo/redo**
- [ ] Chargement initial d'un projet standard < 3 s (web)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un planning de 10 000+ tâches, when je fais défiler ou zoomer le Gantt, then seules les barres du viewport sont dessinées (virtualisation) et le rendu tient ≥ 30 fps (budget frame ≤ 33 ms), les tâches hors viewport n'étant ni montées ni calculées côté rendu | ⬜ |
| Given un projet standard, when j'ouvre le Gantt pour la première fois, then le premier rendu interactif est affiché en < 3 s (web) et le défilement reste fluide pendant l'hydratation progressive du reste du plan | ⬜ |
| Given un `Schedule` déjà calculé, when je reçois un événement `pilotage.plan.v1` (`PlanRecalculated`, `NodeScheduleChanged`, `DependencyChanged`, `MilestoneMoved`, `HorizonChanged`, `WbsRestructured`), then je n'applique au rendu que les `changed_node_ids[]` / `affected_node_ids[]` du patch (diff, pas snapshot) et le chemin critique n'est re-tracé que si `critical_path_changed=true` | ⬜ |
| Given une modification locale (drag d'une barre, edit de lag), when je soumets le delta au moteur via `reSchedule(prev, delta)`, then seule la fermeture transitive aval + les récapitulatifs ancêtres sont re-rendus, en < 16 ms cible pour un sous-graphe local (budget frame 30 fps, EN22.1 §b) | ⬜ |
| Given deux utilisateurs co-éditant le même projet, when chacun applique un delta sur des sous-graphes disjoints, then les deux deltas commutent, `scheduleVersion` progresse de façon monotone et la présence (curseurs/sélections des pairs) est affichée sans écraser l'édition locale | ⬜ |
| Given une suite de deltas appliqués localement, when je déclenche undo puis redo, then l'état du plan revient exactement à l'état précédent puis suivant via `inverse(delta)` / re-application (EN22.1 §b), chaque `ChangeSet` étant atomique et inversible (tout ou rien) | ⬜ |
| Error : given un delta soumis avec `baseVersion` ≠ `scheduleVersion` courant (édition concurrente d'un pair arrivée entre-temps), then le moteur retourne `STALE_BASE_VERSION`, le client rebase son delta sur l'état courant et le re-soumet — aucune application silencieuse ni perte d'édition d'un pair | ⬜ |
| Error : given un delta (drag/lien) introduisant un cycle de dépendances, then le moteur rejette le delta entier (`SCHEDULE_CYCLE`), le patch est vide, aucune barre n'est déplacée dans le rendu et l'utilisateur voit l'échec signalé (rollback optimiste de l'aperçu local) | ⬜ |
| Security : seul un utilisateur membre du projet peut ouvrir le canal de co-édition et soumettre un delta ; un non-membre ou un accès cross-tenant reçoit **404** (non-divulgation d'existence), un membre en lecture seule reçoit **403** (présence/consultation autorisées, soumission de delta refusée) | ⬜ |
| Security : given un delta ou un snapshot de recalcul mélangeant deux `tenant_id`, then le moteur rejette avec `TENANT_VIOLATION` et ne calcule jamais un graphe multi-tenant ; chaque événement `pilotage.plan.v1` reçu ne porte que la projection minimale (id/date/type/deep-link), jamais le schéma interne `pilotage` ni une FK inter-modules | ⬜ |
| A11y : le rendu virtualisé n'exclut pas les tâches non dessinées du modèle de focus clavier (le défilement virtuel ramène la tâche focalisée dans le viewport), l'arrivée d'une co-édition distante et le résultat d'un undo/redo sont annoncés via une région ARIA `live`, et aucune mise à jour temps réel ne déplace le focus de l'utilisateur ; conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le moteur CPM déterministe, l'API `schedule`/`reSchedule` incrémentale, le versionnement optimiste (`revision`/`scheduleVersion`), `inverse(delta)` et le contrat d'événements `pilotage.plan.v1` : **fournis** par EN22.1 (cet enabler en consomme les capacités côté rendu et transport temps réel)
- Les interactions Gantt elles-mêmes (drag/lien/zoom/clavier) : couvertes par les US F22.4 (US22.4.10a/b/c) qui consomment la virtualisation et le recalcul incrémental d'EN22.2
- La consolidation multi-projets du portefeuille (E23) : consommatrice des événements, hors de cet enabler

## Notes d'implémentation
- Virtualisation : ne monter/dessiner que les lignes du viewport (fenêtre + marge de défilement), mais conserver un index de focus stable sur l'ensemble du plan pour l'accessibilité clavier (cf. US22.4.10c) et pour cibler les patches sur des nœuds non rendus
- Recalcul incrémental : le rendu n'applique jamais un recalcul complet en réaction à un événement — il applique le **diff** (`changed_node_ids[]`) fourni par `reSchedule` / `PlanRecalculated` ; un recalcul complet (`schedule`) n'est déclenché qu'à la première ouverture, à l'import ou au changement de calendrier global (EN22.1 §b)
- Co-édition : transport temps réel des deltas + présence ; le verrou optimiste (`scheduleVersion` monotone, `STALE_BASE_VERSION` → rebase) et l'atomicité/inversibilité des `ChangeSet` sont ceux d'EN22.1 — cet enabler orchestre le rebase côté client et la fusion des deltas disjoints commutatifs, sans rouvrir la sémantique du moteur
- Undo/redo : pile de deltas locale s'appuyant sur `inverse(delta)` (EN22.1) ; un undo est lui-même un delta versionné soumis au moteur (peut donc recevoir `STALE_BASE_VERSION` et déclencher un rebase)

---
Item Type: Enabler · Parent: E22 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: High
Stage: ⬜
Profils: Grand groupe, Publique, État
Justification: Parité MS Project en web sur de grands plannings (NFR PP-032)
Dépendances: EN22.1 (modèle temporel unique)
