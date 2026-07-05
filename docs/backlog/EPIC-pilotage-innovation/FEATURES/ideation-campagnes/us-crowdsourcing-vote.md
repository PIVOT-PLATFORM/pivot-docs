# US38.2.3 — Crowdsourcing & vote communautaire

**En tant que** contributeur
**Je veux** **voter/réagir** sur les idées (crowdsourcing) pour faire remonter les plus prometteuses
**Afin de** capter l'intelligence collective avant l'évaluation formelle

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un ensemble d'idées, when la communauté vote, then un classement communautaire s'affiche (dot-voting/likes) | ⬜ |
| Given le vote, when il est ouvert, then il peut être anonyme/nominatif selon la configuration | ⬜ |
| Error : given un participant ayant déjà utilisé son quota de votes (dot-voting), when il tente de voter à nouveau, then le vote supplémentaire est refusé avec message explicite | ⬜ |
| Security : un participant ne peut voter qu'une fois par idée (anti-doublon) ; en mode anonyme, l'identité du votant n'est pas exposée dans le classement ni accessible aux autres participants (seul un rôle habilité peut, si nécessaire, auditer les votes bruts) | ⬜ |
| A11y : le classement et les contrôles de vote (dot-voting/likes) sont opérables au clavier, avec le score/rang annoncé aux lecteurs d'écran (pas uniquement par position visuelle) | ⬜ |

## Hors périmètre
- L'évaluation multicritère formelle des idées (F38.4) — le vote communautaire est un signal d'intelligence collective en amont, pas une évaluation qualifiante
- La création/gestion des campagnes dans lesquelles s'inscrit le vote (US38.2.2)
- La modération des votes suspects (bots, brigading) — non demandée ici

## Notes d'implémentation
- Réutilise le mécanisme de vote déjà existant dans le socle (Session E19, dot-voting) plutôt que de recréer un moteur de vote dédié au module innovation
- Le mode anonyme/nominatif est une configuration au niveau de la campagne ou du contexte de vote (EN38.1) ; en mode anonyme, l'association votant↔vote doit rester non exposée côté UI même si elle est conservée en base pour anti-doublon
- Le classement communautaire est un signal d'entrée pour l'entonnoir (F38.3) et l'évaluation (F38.4), pas une décision de gate en tant que telle

---
Item Type: US · Parent: F38.2 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: Backlog
Profils: Tous
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 (modèle SMI & moteur)
