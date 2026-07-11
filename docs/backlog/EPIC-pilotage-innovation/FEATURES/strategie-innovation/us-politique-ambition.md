# US38.1.1 — Politique & ambition d'innovation

**En tant que** responsable innovation
**Je veux** définir la **politique d'innovation** (ambition, axes/thèmes stratégiques, appétence au risque) — socle du SMI (ISO 56002 §5)
**Afin de** donner un cap et cadrer où l'organisation veut innover

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'organisation, when je définis la politique, then ambition, axes stratégiques et critères d'appétence sont enregistrés et publiés | ⬜ |
| Given des idées/projets, when ils sont créés, then ils se rattachent à un axe stratégique (alignement) | ⬜ |
| Error : given une politique sans aucun axe stratégique renseigné, when je tente de la publier, then la publication est bloquée avec un message explicite (au moins un axe requis) | ⬜ |
| Security : seul le rôle responsable innovation (ou équivalent habilité) peut créer/modifier/publier la politique d'innovation ; les autres rôles ont un accès en lecture seule une fois publiée | ⬜ |
| A11y : le formulaire de définition de la politique (ambition, axes, appétence au risque) est utilisable au clavier, avec libellés et messages d'erreur associés aux champs (WCAG 2.1 AA) | ⬜ |

## Hors périmètre
- La gouvernance (rôles, comités, cadence de décision) : couverte par US38.1.2
- Le rattachement rétroactif en masse des idées/projets existants à un axe stratégique lors de la création/modification d'un axe (migration de données hors périmètre)
- La définition des grilles de scoring ou critères d'évaluation détaillés (couverts par F38.4) — l'appétence au risque ici reste une déclaration de cadrage, pas une grille

## Notes d'implémentation
- La politique d'innovation (ambition, axes stratégiques, appétence au risque) est le premier objet du modèle SMI porté par EN38.1 (`AxeStrategique`) ; elle doit exister avant que idées/campagnes puissent s'y rattacher
- Le rattachement idée/projet → axe stratégique est une FK simple au sein du schéma `pilotage` (pas de bus inter-modules nécessaire ici, contrairement à la conversion vers projet en F38.3)
- Une politique publiée reste modifiable (nouvelle version), mais l'historique des versions n'est pas requis par cette US (cf. business case léger US38.4.2 pour le versionnement, à titre de référence de pattern si repris ici)

---
Item Type: US · Parent: F38.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: responsable-innovation
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 (modèle SMI & moteur)
