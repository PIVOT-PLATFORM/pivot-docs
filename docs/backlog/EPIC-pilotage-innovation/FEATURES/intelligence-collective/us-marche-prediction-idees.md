# US38.14.1 — Marché de prédiction d'idées

**En tant que** contributeur
**Je veux** un **marché de prédiction d'idées** (idea prediction market) : chacun mise des jetons virtuels sur le potentiel des idées
**Afin de** faire émerger la sagesse des foules au-delà du simple vote

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un ensemble d'idées, when les participants misent des jetons virtuels, then une **cote/probabilité de succès** collective se forme et évolue | ⬜ |
| Given la cote, when elle est exploitée, then elle complète (sans remplacer) l'évaluation experte (F38.4) | ⬜ |
| Éthique : jeu virtuel non monétaire, non punitif, RGPD-agrégé | ⬜ |
| Error : given un solde de jetons insuffisant, when un contributeur tente une mise, then la mise est refusée avec un message explicite (pas de solde négatif) | ⬜ |
| Security : les jetons sont virtuels et non convertibles en valeur réelle ; les mises individuelles ne sont visibles qu'en agrégé (cote collective), pas nominativement, pour éviter tout effet punitif ou de classement individuel | ⬜ |
| A11y : la cote/probabilité et son évolution sont restituées par un moyen non exclusivement visuel (texte/tableau en plus du graphique) pour rester perceptibles au lecteur d'écran | ⬜ |

## Hors périmètre
- Toute conversion des jetons virtuels en argent réel ou avantage matériel : strictement exclu (jeu non monétaire, non punitif)
- Le classement nominatif des participants selon leurs gains/pertes de jetons : hors périmètre pour éviter un effet de compétition individuelle négative
- Le remplacement de l'évaluation experte (F38.4) : la cote est un signal complémentaire, jamais décisionnel seul

## Notes d'implémentation
- S'appuie sur EN38.2 (signaux & prédiction) pour le calcul et l'évolution de la cote collective
- Les données de mise sont agrégées avant restitution (RGPD) ; conserver uniquement ce qui est nécessaire au calcul de la cote, pas d'historique nominatif exposé
- Le solde de jetons initial et les règles de distribution (périodique, par campagne) sont à définir avec le responsable innovation, sans lien avec un système de récompense matérielle (cf. US38.10.2 pour la reconnaissance, séparée)

---
Item Type: US · Parent: F38.14 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Low
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — fonctionnalités innovantes (IA gouvernée, intelligence collective, corporate venturing)
Dépendances: EN38.1 · EN38.2 (moteur IA & graphe)
