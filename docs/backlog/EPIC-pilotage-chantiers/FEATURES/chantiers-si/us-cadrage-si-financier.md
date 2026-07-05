# US39.1.2 — Cadrage SI financier

**En tant que** DSI/acheteur
**Je veux** recenser les SI financiers cibles (M57, Coriolis, Grand Angle…) et faire de l'interface comptable un critère éliminatoire de la consultation
**Afin de** garantir l'intégration financière, critère n°1 du choix

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le SI financier, when le cadrage est réalisé, then les systèmes cibles (M57, Coriolis, Grand Angle…) sont recensés | ⬜ |
| L'interface comptable est inscrite comme critère éliminatoire de la consultation | ⬜ |
| Error : given une offre sans interface comptable, la grille la déclare non conforme | ⬜ |
| Security/Gouvernance : le recensement et le critère sont documentés dans le dossier de consultation (traçabilité) | ⬜ |

## Hors périmètre
- L'US ne couvre pas l'implémentation technique de l'interface comptable elle-même (connecteur, mapping de flux) — seulement le recensement des SI cibles et l'inscription du critère éliminatoire dans la consultation.
- Le choix final du prestataire/outil n'est pas fait ici : cette US alimente la grille de dépouillement, elle ne tranche pas la consultation (couvert par le processus d'arbitrage, US39.1.3).
- Les autres critères de sélection (TCO, hébergement, pérennité) sont traités par les US dédiées (US39.1.8, US39.1.4, US39.1.5), pas ici.

## Notes d'implémentation
- Cette US est un artefact de gouvernance (recensement + critère de consultation), pas une fonctionnalité applicative : le livrable attendu est la liste des SI financiers cibles de l'organisme (M57, Coriolis, Grand Angle ou équivalent local) et la clause éliminatoire correspondante dans le dossier de consultation.
- Le recensement dépend du contexte SI propre à chaque organisme (secteur public FR) : la liste des SI financiers cités (M57, Coriolis, Grand Angle) est indicative, à confirmer/adapter lors du Gate 1 selon l'organisme cible.
- La déclaration de non-conformité d'une offre sans interface comptable doit être objectivable dans la grille de dépouillement (critère binaire ou seuil), pas laissée à l'appréciation libre.

---
Item Type: US · Parent: F39.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Source: PP-062 · MoSCoW: Must · Lot: Lot 1 · Origine: Insight I2
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Dossier §8-I2 : critère n°1
Dépendances: —
