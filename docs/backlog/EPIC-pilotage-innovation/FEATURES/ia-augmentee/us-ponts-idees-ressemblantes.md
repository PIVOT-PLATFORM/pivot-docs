# US38.11.2 — Ponts entre idées ressemblantes (clustering sémantique)

**En tant que** responsable innovation
**Je veux** détecter automatiquement les **idées ressemblantes** (similarité sémantique), suggérer des **rapprochements/fusions** et créer des **ponts** entre elles
**Afin de** éviter les doublons, capitaliser et faire émerger des idées combinées plus fortes

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un corpus d'idées, when l'analyse sémantique s'exécute, then les idées proches sont regroupées (clusters) et des **suggestions de fusion/lien** sont proposées | ⬜ |
| Given une suggestion de fusion, when je la valide, then les idées sont reliées/fusionnées en conservant les contributeurs et l'historique | ⬜ |
| Given un doublon, when il est détecté à la soumission, then l'auteur est orienté vers l'idée existante (rejoindre plutôt que dupliquer) | ⬜ |
| Error : given une suggestion de fusion invalide (une des deux idées supprimée/déjà fusionnée entre-temps), when je tente de la valider, then une erreur explicite s'affiche et aucune fusion partielle n'est appliquée | ⬜ |
| Security : la fusion/le rapprochement d'idées reste une action **validée par un humain habilité** (auteur ou responsable innovation) — le clustering IA ne fusionne jamais automatiquement ; suggestions et fusions tracées (idées sources, auteur de la validation) | ⬜ |
| A11y : les suggestions de rapprochement (clusters, doublon détecté) sont annoncées aux lecteurs d'écran et les actions (fusionner/ignorer/rejoindre) sont accessibles au clavier | ⬜ |

## Hors périmètre
- Fusion automatique sans validation humaine (le système suggère, l'humain décide)
- Détection de similarité inter-langues avancée (au-delà de la langue principale de l'organisation)
- Recombinaison créative d'idées pour en générer de nouvelles — couvert par US38.14.3 (Combinaison & recombinaison d'idées)

## Notes d'implémentation
- S'appuie sur EN38.2 (moteur IA & graphe, embeddings/similarité sémantique)
- La fusion doit préserver l'intégralité de l'historique et des contributeurs des idées sources (traçabilité SMI, pas de perte de paternité)
- La détection de doublon à la soumission doit s'exécuter avant validation finale de l'idée pour éviter de créer des doublons dans le pipeline (US38.3.1)

---
Item Type: US · Parent: F38.11 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: High
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — fonctionnalités innovantes (IA gouvernée, intelligence collective, corporate venturing)
Dépendances: EN38.1 · EN38.2 (moteur IA & graphe)
