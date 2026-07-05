# US22.6.2 — Colonnes, filtres, regroupements & tri

**En tant que** PMO
**Je veux** personnaliser les colonnes, filtrer, regrouper et trier (par ressource, chemin critique, jalon, statut…)
**Afin de** adapter la lecture du plan à chaque besoin

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une table, when j'ajoute/retire des colonnes, then l'affichage se met à jour et la préférence est mémorisée | ⬜ |
| Given un filtre (ex. tâches critiques en retard), when je l'applique, then seules les tâches concernées restent visibles | ⬜ |
| Given un regroupement (par ressource), when je l'applique, then les tâches se groupent avec sous-totaux | ⬜ |
| Error : given un filtre combinant des critères contradictoires (ex. date fin < date début) ou un champ de tri inexistant, when je l'applique, then le système ignore le critère invalide et affiche un message expliquant qu'aucun résultat ne correspond, sans planter la vue | ⬜ |
| Security : la préférence de colonnes/filtres/groupes est mémorisée par utilisateur et par projet — un utilisateur n'ayant pas accès au projet (droits de l'équipe rattachée, EN18.2) ne peut ni lire ni écrire ces préférences via l'API | ⬜ |
| A11y : ajout/retrait de colonnes, application de filtres et de regroupements pilotables intégralement au clavier (menus et cases à cocher accessibles), changements d'état annoncés aux lecteurs d'écran (`aria-live`), conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Création de vues sauvegardées partagées entre utilisateurs (cf. US22.6.1 — vues multiples) : ici, seules les préférences de colonnes/filtres/groupes d'un utilisateur sur une vue donnée sont couvertes.
- Filtres avancés avec expressions/formules personnalisées (hors parité MS Project de base) — non couvert par cette US.
- Export du résultat filtré/groupé (Excel, PDF…) : couvert par US22.6.4 — Export & rapports.

## Notes d'implémentation
- S'appuie sur le modèle temporel unique `Projet → Phase → Tâche → Jalon → Dépendance` (EN22.1) : les colonnes disponibles (dates, ressource, % avancement, chemin critique…) dérivent des attributs de ce graphe, sans duplication de données entre roadmap et Gantt.
- Le tri par chemin critique/marge dépend du moteur d'ordonnancement (EN22.1) déjà calculé côté serveur — pas de recalcul côté client.
- Préférences de colonnes/filtres/groupes persistées par (utilisateur, projet, vue) — à héberger dans le schéma `pilotage` (EN18.1), guard d'accès projet via EN18.2.
- Performance : filtrage/regroupement doit rester fluide sur les plans volumineux (10 000+ tâches, EN22.2) — privilégier un filtrage côté serveur ou virtualisé, pas un filtrage client naïf sur la liste complète.

---
Item Type: US · Parent: F22.6 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
