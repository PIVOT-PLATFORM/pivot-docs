# US27.6.2 — Interfaces OKR ↔ pilotage (roadmap, portefeuille, risques)

**En tant que** PMO
**Je veux** relier les OKR aux autres modules du domaine — **roadmap (E22)**, **portefeuille (E23)**, **risques (E21)** — via le bus PIVOT et des deep-links
**Afin de** connecter l'ambition (OKR) à l'exécution et aux aléas, sans coupler les modules

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une initiative liée à un KR, when elle correspond à un projet roadmap (E22), then un deep-link relie OKR et projet (pas de FK — ADR-006/008) | ⬜ |
| Given un risque (E21) menaçant un KR, when il est corrélé, then il apparaît en overlay sur l'OKR | ⬜ |
| Given un OKR de portefeuille, when il agrège, then il consomme les avancements via événements (bus PIVOT) | ⬜ |
| Error : given un module externe (E22/E23/E21) indisponible ou un événement bus non reçu, when l'overlay/deep-link est affiché, then l'OKR reste consultable avec une information "donnée externe indisponible" plutôt que de bloquer la vue | ⬜ |
| Security : le deep-link vers un projet/risque d'un autre module ne doit pas exposer de données de ce module si l'utilisateur n'y a pas accès (résolution des droits côté module cible, pas de bypass via le lien) | ⬜ |
| A11y : l'overlay de risque et les indicateurs de corrélation sur l'OKR sont annoncés en texte (pas seulement une pastille colorée) et accessibles au clavier | ⬜ |

## Hors périmètre
- La modélisation ou modification des modules Roadmap (E22), Portefeuille (E23) et Risques (E21) eux-mêmes — cette US ne fait que les interfacer
- Le rattachement initiative↔KR en tant que tel — couvert par US27.6.1 (prérequis)
- Toute synchronisation par FK directe entre schémas — explicitement exclue par l'ADR-006/008 (bus d'événements + deep-links uniquement)

## Notes d'implémentation
- Communication strictement par bus PIVOT (événements) et deep-links, jamais par FK inter-modules, conformément à l'ADR-006/008 déjà cité dans la story
- Le deep-link est un identifiant/URL opaque résolu côté module cible ; l'agrégation portefeuille consomme des événements déjà publiés, pas de requête synchrone inter-module
- Dépend de US27.6.1 pour l'existence du lien initiative↔KR sur lequel s'appuie le deep-link vers la roadmap

---
Item Type: US · Parent: F27.6 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
