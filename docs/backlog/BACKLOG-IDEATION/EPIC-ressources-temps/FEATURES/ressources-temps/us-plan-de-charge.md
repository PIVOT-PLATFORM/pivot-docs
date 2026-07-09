# US32.1.3 — Plan de charge temps réel

**En tant que** PMO
**Je veux** confronter charge et capacité par ressource, service et compétence, détecter les tensions et répartir entre projet, maintenance et récurrent
**Afin de** piloter l'allocation dans une approche 'tout est projet'

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des affectations existantes sur des ressources, when le PMO consulte le plan de charge, then la charge est confrontée à la capacité par ressource, service et compétence, avec répartition distincte projet / maintenance / activités récurrentes | ⬜ |
| Given une ressource en tension — surcharge (charge cumulée > capacité disponible) ou sous-charge significative (charge cumulée très inférieure à un seuil configurable de la capacité disponible), when le PMO consulte le plan de charge, then la tension est détectée et signalée visuellement avec une distinction claire entre les deux cas (code couleur / indicateur différenciés) | ⬜ |
| Error : given une ressource sans données de capacité renseignées, system exclut la ressource du calcul de charge et signale la donnée manquante plutôt que d'afficher une valeur erronée | ⬜ |
| Security : la vue de charge respecte les périmètres de visibilité par rôle — un chef de projet ne voit que les ressources de ses projets, un PMO voit son périmètre de portefeuille, sans exposer les charges d'autres services non autorisés | ⬜ |
| A11y : le plan de charge (tableaux, indicateurs visuels de tension, code couleur) est conforme WCAG 2.1 AA — le signalement de tension n'est jamais porté par la couleur seule (icône/texte associé), contrastes et navigation clavier conformes | ⬜ |

## Hors périmètre
- Le calcul et la saisie de la capacité elle-même (temps de travail théorique, congés, absences) : cette US consomme la capacité, elle ne la définit pas
- La saisie ou la modification des affectations (couverte par US32.1.1)
- La résolution automatique des surcharges et sous-charges (replanification, réaffectation, suggestion d'affectation optimisée) : cette US se limite à la détection et à l'affichage, l'arbitrage reste manuel
- Les prévisions de charge au-delà des affectations planifiées (pas de simulation "what-if")
- L'agrégation de la charge des demandes/projets proposés non encore lancés face à la capacité (« capacité à faire » en gate d'intake) : périmètre explicitement retiré du backlog lors de la dissolution d'E31 (cf. [E18 — Domaine Pilotage](../../../EPIC-pilotage/README.md)) — cette US ne porte que le plan de charge des ressources déjà affectées sur des projets/activités en cours ; frontière exacte avec le wording « tout est projet » d'E31 à confirmer par le mainteneur (zone d'ombre #12)

## Notes d'implémentation
- Vue agrégée en lecture seule qui croise les données d'affectation (US32.1.1) et de capacité par ressource ; nécessite que ces données existent en amont dans le schéma `pilotage`
- Les périmètres de visibilité par rôle s'appuient sur les mêmes règles de scoping que les affectations (rattachement service/équipe via FK `public.teams.id`)
- Le seuil de détection de tension (ex. 100 % de capacité) doit être cohérent avec celui utilisé dans US32.1.1 (signalement de surcharge à l'affectation) pour éviter des incohérences entre les deux vues
- Frontend `pivot-pilotage-ui`, consommation de `@pivot/design-system` pour les composants de visualisation (indicateurs de charge, code couleur accessible)

---
Item Type: US · Parent: F32.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Source: PP-019 · MoSCoW: Must · Lot: Lot 2 · Origine: PM + Sciforma
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Dossier §5.1/§6.1 : approche 'tout est projet'
Dépendances: US32.1.1 (affectations et charges par ressource)
