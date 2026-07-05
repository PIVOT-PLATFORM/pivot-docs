# US36.1.5 — Accompagnement et communauté

**En tant que** PMO
**Je veux** une offre d'accompagnement (implémentation, formation, conduite du changement) et une communauté d'homologues (club utilisateurs)
**Afin de** réussir l'adoption, condition documentée du succès

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le déploiement, when l'organisation démarre, then une offre d'accompagnement (implémentation, formation, conduite du changement) est disponible | ⬜ |
| Une communauté d'homologues / club utilisateurs est accessible aux PMO | ⬜ |
| Error : given une demande d'accompagnement sans interlocuteur assigné, system la met en file de traitement | ⬜ |
| Security/Gouvernance : les échanges communautaires respectent la confidentialité des données de l'organisation | ⬜ |

## Hors périmètre
- La production des contenus de formation (supports, parcours e-learning) est traitée par l'EPIC Formation & Onboarding (E41, US41.5.25), pas ici : cette US couvre l'offre d'accompagnement humain (implémentation, conduite du changement) et l'espace communautaire, pas le contenu pédagogique lui-même.
- La certification ou la notation des consultants d'implémentation n'est pas incluse.
- L'animation éditoriale de la communauté (newsletters, événements) n'est pas définie ici, seule l'existence de l'espace d'échange l'est.

## Notes d'implémentation
- La file de traitement des demandes d'accompagnement sans interlocuteur assigné peut réutiliser le mécanisme de queue déjà en place pour d'autres notifications transverses du module pilotage plutôt qu'un nouveau composant dédié.
- L'espace communauté (club utilisateurs) est un espace applicatif distinct du portefeuille de projets : il ne doit pas exposer de données métier d'une organisation à une autre (isolation multi-tenant stricte, cf. FK `public.teams.id`).
- Frontend `pivot-pilotage-ui` pour l'espace communauté ; le routage des demandes d'accompagnement peut rester back-office (pas nécessairement une UI dédiée dans ce lot).

---
Item Type: US · Parent: F36.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Source: PP-052 · MoSCoW: Should · Lot: Lot 1 · Origine: Différenciant PM (300 implémentations, PM Club)
Profils: PME, Privée sous droit public, Publique, État
Justification: Dossier §6.1 + §8-I6 : conditionne la réussite
Dépendances: —
