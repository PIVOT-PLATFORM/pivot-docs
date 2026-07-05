# US38.14.3 — Combinaison & recombinaison d'idées

**En tant que** porteur d'innovation
**Je veux** **croiser/recombiner** des idées (cross-pollination assistée) pour en générer de nouvelles
**Afin de** exploiter le fait que l'innovation naît souvent de combinaisons

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given deux idées ou plus, when je les combine, then une idée dérivée est proposée en conservant la traçabilité des sources et contributeurs | ⬜ |
| Given des idées de domaines éloignés, when le moteur les croise, then des pistes de recombinaison sont suggérées | ⬜ |
| Error : given une seule idée sélectionnée, when je demande une combinaison, then l'action est refusée (au moins deux idées sources requises) | ⬜ |
| Security : les contributeurs des idées sources doivent être notifiés/crédités sur l'idée dérivée ; seul le porteur ou un rôle habilité peut initier une combinaison impliquant des idées d'autrui | ⬜ |

## Hors périmètre
- La génération automatique d'idées sans validation humaine : les suggestions de recombinaison restent des propositions à valider par un utilisateur (humain dans la boucle)
- L'évaluation de la valeur de l'idée dérivée : relève de F38.4 (scoring multicritère), pas de cette US
- La détection de doublons entre idées similaires : couverte par US38.11.2 (ponts entre idées ressemblantes)

## Notes d'implémentation
- S'appuie sur EN38.2 (moteur IA & graphe) pour le calcul de similarité/éloignement sémantique entre idées et la suggestion de recombinaisons
- La traçabilité des sources et contributeurs de l'idée dérivée doit être portée par le modèle Idea (EN38.1), sans dupliquer les métadonnées d'origine
- Gouvernance IA : les suggestions du moteur sont des propositions révisables, jamais appliquées automatiquement

---
Item Type: US · Parent: F38.14 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Low
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — fonctionnalités innovantes (IA gouvernée, intelligence collective, corporate venturing)
Dépendances: EN38.1 · EN38.2 (moteur IA & graphe)
