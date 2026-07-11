# US32.1.1 — Ressources et affectations

**En tant que** chef de projet
**Je veux** affecter les ressources aux tâches et projets et visualiser leurs charges
**Afin de** répartir la capacité et détecter les surcharges d'affectation

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une ressource et une tâche/projet, when le chef de projet affecte la ressource, then la charge résultante est calculée et visualisable, agrégée avec l'ensemble des autres affectations de cette ressource | ⬜ |
| Given une ressource déjà affectée sur plusieurs tâches/projets, when le chef de projet consulte sa visualisation de charge, then le cumul de toutes les affectations est reflété sans double-comptage | ⬜ |
| Error : given une affectation qui ferait dépasser 100 % de la capacité de la ressource, system signale la surcharge au chef de projet (l'affectation reste possible mais l'alerte est explicite) | ⬜ |
| Security : seuls le chef de projet du projet concerné, le PMO et la ressource elle-même peuvent voir/modifier une affectation ; la visibilité des charges respecte les périmètres par rôle (pas d'accès aux affectations d'autres équipes/projets hors périmètre) | ⬜ |
| A11y : l'interface d'affectation et la visualisation des charges (jauges, indicateurs de surcharge) sont conformes WCAG 2.1 AA — l'alerte de surcharge n'est pas portée uniquement par la couleur, navigation clavier possible pour affecter une ressource | ⬜ |

## Hors périmètre
- La saisie des temps réellement passés sur les tâches (couverte par US32.1.2) : cette US ne traite que la charge planifiée/affectée, pas le réalisé
- Le plan de charge consolidé multi-ressources/multi-services avec détection de tension à l'échelle du portefeuille (couvert par US32.1.3)
- La résolution automatique des surcharges (réaffectation, replanification suggérée) : le système signale, l'arbitrage reste manuel
- La gestion de la capacité elle-même (temps de travail théorique, congés, temps partiel) : cette US suppose la capacité déjà connue en amont

## Notes d'implémentation
- Modèle de données : affectation = lien ressource × tâche/projet × quantité (ex. % de temps ou heures), stocké dans le schéma `pilotage`, avec FK vers `public.teams.id` pour le rattachement d'équipe
- Le calcul de charge doit agréger toutes les affectations actives d'une ressource, tous projets confondus — nécessite une requête transversale au portefeuille, pas seulement au projet courant
- Le seuil de surcharge (100 % de capacité) doit rester cohérent avec celui utilisé dans le plan de charge (US32.1.3) pour éviter des divergences d'affichage entre les deux vues
- Frontend `pivot-pilotage-ui`, consommation de `@pivot/ui-core` pour les composants d'affectation et `@pivot/design-system` pour la visualisation des charges

---
Item Type: US · Parent: F32.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Rôle: chef-de-projet
Source: PP-007 · MoSCoW: Must · Lot: Lot 1 · Origine: Socle 3/3
Profils: Tous
Justification: Dossier §4
Dépendances: —
