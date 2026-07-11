# US38.15.1 — Organisation d'événements internes d'innovation

**En tant que** responsable innovation
**Je veux** organiser des **événements internes d'innovation** — hackathons, ateliers d'idéation, demo days, pitch sessions, cérémonies de prix — de bout en bout (annonce, inscription, équipes, jury, résultats)
**Afin de** mobiliser et accélérer la génération et la sélection d'idées par le collectif

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un type d'événement (hackathon, atelier, demo day, pitch, awards), when je le crée, then format, dates, inscriptions, constitution d'équipes, jury et prix sont paramétrés | ⬜ |
| Given un événement, when il se déroule, then l'animation live s'appuie sur le module **Session (E19)** et la logistique/créneaux sur **MeetOps (E12)** | ⬜ |
| Given la clôture, when elle a lieu, then les livrables/idées primés entrent dans l'**entonnoir** (F38.3) et l'adoption/participation est mesurée | ⬜ |
| Given un événement ouvert à l'écosystème externe (US38.8.3), when il est organisé, then il réutilise ce moteur d'événements interne pour inscription/équipes/jury/prix | ⬜ |
| Error : given une inscription après la date de clôture des inscriptions, when elle est soumise, then elle est refusée avec un message explicite | ⬜ |
| Security : seul le responsable innovation (organisateur) peut créer/modifier un événement et désigner le jury ; les membres du jury n'accèdent qu'aux livrables de l'événement dont ils sont membres | ⬜ |
| A11y : les pages d'inscription et de consultation des résultats de l'événement respectent WCAG 2.1 AA (formulaires étiquetés, navigation clavier, contrastes) | ⬜ |

## Hors périmètre
- L'outillage d'animation live lui-même (visioconférence, tableau blanc collaboratif) : délégué à Session (E19), cette US ne fait qu'orchestrer le lien
- La réservation de salles/ressources physiques détaillée : déléguée à MeetOps (E12), cette US se limite au paramétrage de l'événement d'innovation
- L'ouverture à l'écosystème externe elle-même (partenaires, invités externes) : couverte par US38.8.3, cette US fournit seulement le moteur réutilisé

## Notes d'implémentation
- S'appuie sur EN38.1 pour le lien entre livrables/idées primés et l'entonnoir (F38.3) ; interconnexion avec E19 (Session) et E12 (MeetOps) via bus PIVOT + deep-links, sans FK inter-modules (ADR-006/008)
- Le moteur d'événements (inscription, équipes, jury, prix) doit être conçu pour être réutilisable tel quel par US38.8.3 (hackathons avec l'écosystème externe), pas dupliqué
- La mesure d'adoption/participation à la clôture alimente les KPIs d'innovation (F38.9.1)

---
Item Type: US · Parent: F38.15 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Rôle: responsable-innovation
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — événements internes d'innovation, parcours orchestré (Workflow E29), dépôt d'idée par formulaire (Forms)
Dépendances: EN38.1 · E19 (Session) · E12 (MeetOps)
