# US38.14.2 — Graphe d'innovation & moteur de sérendipité

**En tant que** responsable innovation
**Je veux** un **graphe de connaissance de l'innovation** (idées ↔ brevets ↔ projets ↔ personnes ↔ tendances) avec un **moteur de sérendipité** suggérant des connexions inattendues
**Afin de** provoquer les rapprochements fertiles que personne n'aurait cherchés

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given les entités du SMI, when le graphe est construit, then idées, brevets, projets, personnes et tendances sont reliés et explorables | ⬜ |
| Given le moteur de sérendipité, when il s'exécute, then il propose des **connexions inattendues** (idées lointaines, experts insoupçonnés) à explorer | ⬜ |
| Error : given une entité orpheline (sans lien exploitable dans le graphe), when la sérendipité s'exécute, then aucune suggestion n'est forcée et l'absence de résultat est explicite (pas de connexion inventée) | ⬜ |
| Security : la visibilité des connexions du graphe respecte les permissions existantes sur les entités sous-jacentes (une idée confidentielle ou un brevet restreint n'apparaît pas à un utilisateur non habilité) | ⬜ |
| A11y : l'exploration du graphe propose une vue alternative non graphique (liste/tableau des connexions) navigable au clavier et compatible lecteur d'écran | ⬜ |

## Hors périmètre
- Le calcul de similarité sémantique lui-même (embeddings, clustering) : fourni par EN38.2, cette US consomme le service
- L'édition manuelle du graphe (ajout/suppression de nœuds et liens à la main) : le graphe est dérivé automatiquement des entités du SMI, pas d'édition directe
- Le matchmaking IA (experts, mentors, financeurs) : couvert par US38.11.5, cette US se limite à l'exploration et la sérendipité

## Notes d'implémentation
- S'appuie entièrement sur EN38.2 (moteur IA & graphe) pour la construction du graphe de connaissance et le moteur de sérendipité
- Le graphe agrège des entités inter-modules (brevets = F38.7, projets = E22/E23, personnes = profils F38.12, tendances = veille F38.8.2) via bus PIVOT + deep-links, sans FK inter-modules (ADR-006/008)
- Les suggestions de sérendipité restent des recommandations à explorer par l'utilisateur, jamais des décisions automatiques (gouvernance IA)

---
Item Type: US · Parent: F38.14 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Medium
Stage: ⬜
Rôle: responsable-innovation
Profils: Grand groupe, Publique, État
Justification: SMI — fonctionnalités innovantes (IA gouvernée, intelligence collective, corporate venturing)
Dépendances: EN38.1 · EN38.2 (moteur IA & graphe)
