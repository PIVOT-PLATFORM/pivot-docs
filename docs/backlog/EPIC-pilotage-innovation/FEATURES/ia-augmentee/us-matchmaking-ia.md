# US38.11.5 — Matchmaking IA (experts, mentors, financeurs)

**En tant que** porteur d'innovation
**Je veux** un **matchmaking par IA** reliant une idée aux bons **experts, mentors, contributeurs et financeurs internes** (recommandation)
**Afin de** accélérer la maturation en connectant les bonnes personnes

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une idée et ses besoins, when le matchmaking s'exécute, then des experts/mentors/financeurs pertinents sont suggérés (compétences & disponibilité) | ⬜ |
| Given une mise en relation, when elle est acceptée, then elle respecte le consentement des personnes (opt-in) et la confidentialité | ⬜ |
| Error : given aucun profil correspondant disponible (compétences absentes ou tous indisponibles), when le matchmaking s'exécute, then le porteur d'idée reçoit un message explicite (aucune suggestion forcée ni profil non pertinent affiché) | ⬜ |
| Security : seules les personnes ayant explicitement activé leur visibilité/disponibilité (opt-in, cf. US38.12.2) sont suggérées ; **aucune sollicitation n'est envoyée sans consentement préalable** ; suggestions et mises en relation tracées (idée, profil suggéré, décision) | ⬜ |
| A11y : la liste de profils suggérés (nom, expertise, disponibilité) est navigable au clavier et restituée correctement par lecteur d'écran | ⬜ |

## Hors périmètre
- Négociation ou contractualisation du financement (le matchmaking suggère un contact financeur, il ne gère pas la transaction)
- Gestion des plannings/agendas des experts/mentors (juste un indicateur de disponibilité déclaratif)
- Mentorat/coaching suivi dans la durée — couvert par US38.12.4

## Notes d'implémentation
- S'appuie sur EN38.2 (moteur IA & graphe) et sur les profils d'innovateurs (US38.12.2) pour l'appariement compétences/disponibilité
- La disponibilité et la visibilité des profils doivent respecter le statut opt-in défini par US38.12.2 ; le matchmaking IA ne doit jamais contourner ce paramètre
- Les décisions de mise en relation (acceptée/refusée) sont à conserver pour améliorer la pertinence des suggestions futures, dans le respect de la gouvernance IA (US38.11.6)

---
Item Type: US · Parent: F38.11 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — fonctionnalités innovantes (IA gouvernée, intelligence collective, corporate venturing)
Dépendances: EN38.1 · EN38.2 (moteur IA & graphe)
