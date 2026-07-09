# US39.1.9 — Traçabilité réglementaire

**En tant que** PMO
**Je veux** définir la politique de traçabilité et d'archivage des décisions d'arbitrage (contrôle de légalité, CRC) et l'exiger de l'outil
**Afin de** garantir l'opposabilité des décisions face aux contrôles

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'organisation, when la politique est définie, then les règles de traçabilité et d'archivage des décisions d'arbitrage (contrôle de légalité, CRC) sont documentées | ⬜ |
| La politique est traduite en exigences vis-à-vis de l'outil dans la consultation | ⬜ |
| Error : given une offre sans capacité de traçabilité/archivage conforme, la grille la déclare non conforme | ⬜ |
| Security/Gouvernance : la politique impose l'horodatage inaltérable et l'export pour contrôle | ⬜ |

## Hors périmètre
- L'US ne couvre pas l'implémentation technique de l'archivage (choix du système d'archivage électronique, format légal de conservation) — seulement la définition de la politique et son exigence contractuelle vis-à-vis de l'outil.
- Le contrôle de légalité ou l'audit CRC lui-même (procédure externe) n'est pas mené ici — cette US garantit seulement que l'outil et l'organisation permettent de répondre à ces contrôles.
- La traçabilité des productions de l'IA de pilotage est couverte par US39.1.7, pas par cette US qui porte sur la traçabilité générale des décisions d'arbitrage.

## Notes d'implémentation
- Cette US est un artefact de gouvernance (politique + exigence contractuelle), pas une fonctionnalité applicative : le livrable attendu est une politique de traçabilité et d'archivage des décisions d'arbitrage, traduite en exigences dans le dossier de consultation.
- L'exigence d'horodatage inaltérable et d'export pour contrôle doit être objectivable dans la grille de dépouillement (critère vérifiable techniquement), en cohérence avec les autres critères éliminatoires du chantier (US39.1.2, US39.1.4, US39.1.5).
- Le référentiel de contrôle (contrôle de légalité, chambres régionales des comptes) est propre au secteur public FR : à confirmer/adapter selon le statut de l'organisme lors du Gate 1 (cohérent avec les profils "Publique, État" indiqués en frontmatter).

---
Item Type: US · Parent: F39.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Source: PP-069 · MoSCoW: Must (conditionnel) · Lot: Lot 1 · Origine: Insight I9
Profils: Privée sous droit public, Publique, État
Justification: Dossier §8-I9
Dépendances: —
