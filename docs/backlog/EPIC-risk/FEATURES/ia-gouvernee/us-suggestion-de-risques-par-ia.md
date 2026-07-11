# US21.7.1 — Suggestion de risques par IA

**En tant que** Chef de projet
**Je veux** que l'IA me propose des risques candidats à partir de la description et de la typologie du projet
**Afin de** accélérer l'identification des risques sans jamais me priver de la décision finale

## Contexte

Proposer des risques à partir de la description du projet, validés par un humain.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet cadré (typologie + description renseignées), when le chef de projet déclenche la suggestion IA, then une liste de risques candidats est affichée, chacun marqué « proposé par IA » et à l'état `candidat` tant qu'il n'est pas validé | ⬜ |
| Given une liste de risques candidats affichée, when le chef de projet valide un risque, then il est ajouté au registre à l'état `candidat` normal (comme un risque saisi manuellement) et référence la suggestion IA d'origine ; when il rejette un risque, then celui-ci est écarté et n'apparaît plus dans le registre | ⬜ |
| Error : given une description de projet insuffisante pour générer une suggestion exploitable, system retourne une liste vide accompagnée d'un message explicite (pas d'erreur bloquante, pas de risque inventé) | ⬜ |
| Security : la génération de suggestions n'est accessible qu'aux rôles habilités sur le projet ; aucun risque suggéré par l'IA n'intègre le registre officiel sans validation humaine explicite (traçabilité de l'auteur de la validation) | ⬜ |

## Hors périmètre
- Le mécanisme de gouvernance transverse de l'IA (traçabilité détaillée, localisation des traitements, journal d'audit) — couvert par US21.7.4.
- La détection automatique de signaux faibles à partir des données de pilotage — couverte par US21.7.2.
- L'entraînement ou le choix du modèle IA sous-jacent — hors périmètre produit, contrainte d'infrastructure.

## Notes d'implémentation
- S'appuie sur la bibliothèque de risques pré-suggérés (US21.1.5) comme référentiel de rapprochement pour la suggestion IA.
- Toute suggestion IA doit respecter les garde-fous définis par US21.7.4 (traçabilité, validation humaine obligatoire) dès son introduction — ne pas livrer cette US sans ce socle minimal de gouvernance.
- Le champ « proposé par IA » et la référence à la suggestion d'origine doivent être portés par l'entité Risk (US21.1.6).

---
Item Type: US · Parent: F21.7 · Module: risk · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Dépendances: US21.1.5
