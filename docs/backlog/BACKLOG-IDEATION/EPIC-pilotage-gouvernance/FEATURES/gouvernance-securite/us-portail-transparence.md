# US35.1.7 — Portail de transparence

**En tant que** direction
**Je veux** publier vers les citoyens l'avancement des projets (carte, jalons, budgets consommés, open data)
**Afin d'** outiller la redevabilité démocratique

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des projets marqués publiables par la direction, when la publication est déclenchée, then avancement, carte, jalons et budgets consommés de ces projets sont exposés sur le portail citoyen public | ⬜ |
| Given les données publiées, when un tiers (citoyen, journaliste, association) souhaite les réutiliser, then elles sont disponibles en open data dans un format ouvert (ex. CSV/JSON téléchargeable) | ⬜ |
| Error : given un projet non marqué publiable (ou dont le marquage publiable a été retiré), system l'exclut de la publication et du jeu de données open data, y compris s'il apparaissait dans une publication antérieure | ⬜ |
| Security : seuls les champs explicitement whitelistés pour la publication (avancement, carte, jalons, budgets consommés) sont exposés au portail public — aucune donnée sensible du pilotage interne (risques, arbitrages internes, pièces classifiées cf. US35.1.5, contenu étiqueté confidentiel cf. US35.1.6) ne peut fuiter vers le portail public même par erreur de configuration | ⬜ |
| Security : le passage d'un projet de "publiable" à "non publiable" retire effectivement ses données du portail et du flux open data sans délai (pas de cache public exposant une version obsolète au-delà d'une durée de rafraîchissement documentée) | ⬜ |
| A11y : le portail public est conforme RGAA 4 / WCAG 2.1 AA (obligation légale secteur public), y compris la carte interactive et les visualisations de jalons/budgets qui doivent rester consultables au clavier et par lecteur d'écran (alternative textuelle aux éléments graphiques) | ⬜ |

## Hors périmètre
- Interface d'administration permettant de marquer un projet "publiable" et de sélectionner les champs exposés — supposée existante côté pilotage interne (gérée par la direction), cette US couvre la publication et l'exposition, pas la conception de cet écran de marquage
- Interaction citoyenne (commentaires, questions, votes) sur le portail — portail en lecture seule uniquement dans le périmètre de cette US
- Authentification des consultants du portail — le portail est public et sans compte par nature
- Anonymisation avancée de données personnelles qui pourraient apparaître incidemment dans les champs publiés (ex. nom d'un intervenant dans un jalon) — à traiter en amont via le filtrage des champs whitelistés, pas par un moteur d'anonymisation dans cette US

## Notes d'implémentation
- Le portail public doit être servi par un chemin d'accès et une couche de données strictement distincts du reste de `pivot-pilotage-ui`/`pivot-pilotage-core`, afin qu'une régression de droits internes ne puisse jamais élargir accidentellement ce qui est exposé publiquement (principe : whitelist de champs publiables, jamais blacklist de champs à cacher)
- Format open data à aligner sur les standards français habituels (schéma data.gouv.fr, CSV/JSON) plutôt qu'un format propriétaire, cohérent avec l'objectif "redevabilité démocratique outillée"
- RGAA 4 est une obligation légale pour un service public numérique — prévoir un audit d'accessibilité dédié avant mise en production, distinct des vérifications a11y internes du reste du produit
- Priorité Low / Could / Phase phase-3 — item bonus (Dossier §7-B5), fonctionnalité de niche vs. le cœur du produit pilotage interne

---
Item Type: US · Parent: F35.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Low
Stage: ⬜
Rôle: macro:direction-pilotage
Source: PP-057 · MoSCoW: Could · Lot: Lot 4 · Origine: Bonus B5
Profils: Publique, État
Justification: Dossier §7-B5 : redevabilité démocratique outillée
Dépendances: —
