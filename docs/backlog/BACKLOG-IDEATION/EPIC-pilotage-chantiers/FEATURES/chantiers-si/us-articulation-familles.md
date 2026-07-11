# US39.1.1 — Articulation des familles

**En tant que** DSI/PMO
**Je veux** décider l'architecture cible : suite (terrain) + PPM (pilotage) avec interfaces, plutôt qu'une mise en concurrence frontale des familles
**Afin de** structurer un SI de pilotage cohérent sans opposer les familles d'outils

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le contexte SI, when la décision d'architecture est prise, then elle acte une suite terrain + un PPM pilotage reliés par interfaces | ⬜ |
| La décision documente les interfaces cibles entre les deux familles | ⬜ |
| Error : given une mise en concurrence frontale des familles, la décision documente pourquoi elle est écartée | ⬜ |
| Security/Gouvernance : la décision d'architecture est tracée et validée par l'instance compétente | ⬜ |

## Hors périmètre
- Le choix concret des produits (suite terrain, PPM pilotage) n'est pas fait ici : cette US ne couvre que la décision d'architecture cible et son schéma d'interfaces, pas la consultation/sélection d'un éditeur (couverte par US39.1.2, US39.1.4, US39.1.5).
- Le détail technique des interfaces (protocole, fréquence de synchronisation, format d'échange) n'est pas spécifié — seule l'existence et la cible des interfaces sont actées ici.
- L'articulation opérationnelle capillarité/pilotage au niveau des modules Pivot est traitée par US40.1.5, pas par cette US de cadrage SI.

## Notes d'implémentation
- Cette US est un artefact de gouvernance (décision + documentation), pas une fonctionnalité applicative : le livrable attendu est un document d'architecture (ADR ou équivalent) formalisant le schéma suite/PPM et les interfaces cibles.
- S'appuie sur le principe déjà en place dans Pivot (suite collaborative data-centric = la "suite terrain") : la décision doit expliciter comment le futur module PPM de pilotage (E39/E40) s'interface avec elle plutôt que de la dupliquer.
- Instance de validation à préciser lors du Gate 1 (COPIL SI, DSI, ou comité d'architecture selon l'organisme).

---
Item Type: US · Parent: F39.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: officier-responsable-pmo
Source: PP-061 · MoSCoW: Must · Lot: Lot 1 · Origine: Insight I1
Profils: Tous
Justification: Dossier §8-I1
Dépendances: —
