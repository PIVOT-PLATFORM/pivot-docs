# US39.1.4 — Classification et hébergement

**En tant que** DSI
**Je veux** classer les portefeuilles par sensibilité et prescrire l'hébergement par classe (SaaS FR/UE, on-premise) dans la consultation
**Afin d'** aligner le niveau de protection sur la sensibilité dès la commande

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given les portefeuilles, when la classification est établie, then chaque classe de sensibilité est associée à un mode d'hébergement prescrit | ⬜ |
| La prescription d'hébergement par classe est inscrite dans la consultation | ⬜ |
| Error : given une offre proposant un hébergement non conforme à la classe, la grille la déclare non conforme | ⬜ |
| Security/Gouvernance : la classification et les prescriptions sont documentées et tracées | ⬜ |

## Hors périmètre
- L'US ne couvre pas la mise en œuvre technique de l'hébergement (migration, contractualisation avec l'hébergeur) — seulement la classification des portefeuilles et la prescription du mode d'hébergement à inscrire dans la consultation.
- L'audit de conformité RGPD/hébergement des données d'un outil déjà en place n'est pas traité ici (relève d'une revue de conformité continue, hors périmètre de cadrage amont).
- Les autres critères de consultation (TCO, interface comptable, pérennité) sont couverts par les US dédiées (US39.1.8, US39.1.2, US39.1.5), pas ici.

## Notes d'implémentation
- Cette US est un artefact de gouvernance (classification + prescription contractuelle), pas une fonctionnalité applicative : le livrable attendu est la grille de classification des portefeuilles par sensibilité et la prescription d'hébergement associée (SaaS FR/UE, on-premise) intégrée au dossier de consultation.
- La classification doit s'appuyer sur une échelle de sensibilité explicite (ex. données publiques, données à caractère personnel, données sensibles/stratégiques) à définir lors du Gate 1 selon le référentiel de l'organisme.
- La déclaration de non-conformité d'une offre proposant un hébergement inadapté à la classe doit être objectivable dans la grille de dépouillement, en cohérence avec les exigences RGPD/hébergement de données de santé ou sensibles si applicable.

---
Item Type: US · Parent: F39.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Source: PP-064 · MoSCoW: Must (conditionnel) · Lot: Lot 1 · Origine: Insight I4
Profils: Grand groupe, Privée sous droit public, Publique, État
Justification: Dossier §8-I4
Dépendances: —
