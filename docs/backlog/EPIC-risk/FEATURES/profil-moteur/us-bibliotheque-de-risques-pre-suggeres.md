# US21.1.5 — Bibliothèque de risques pré-suggérés

**En tant que** Chef de projet
**Je veux** « Bibliothèque de risques pré-suggérés »
**Afin de** adapter l'analyse de risque à la nature du projet

## Contexte

Catalogue de risques types filtré par typologie, proposé au cadrage.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un profil projet rattaché à une typologie (US21.1.1), when le Chef de projet arrive au cadrage des risques, then le catalogue de risques types filtré sur cette typologie est proposé, avec pour chacun un rattachement pré-rempli à sa famille (US21.1.3) | ⬜ |
| Given la liste de risques types proposée, when le Chef de projet en sélectionne un ou plusieurs, then les risques choisis sont ajoutés au registre du projet en tant que risques réels, modifiables comme n'importe quel risque saisi manuellement | ⬜ |
| Error : given une typologie sans aucun risque type associé dans le catalogue, system affiche une liste vide avec message explicite, sans bloquer la poursuite du cadrage | ⬜ |
| Security : la lecture du catalogue de risques types est ouverte à tout membre de l'équipe projet ; seuls les rôles Archi et admin peuvent créer, modifier ou retirer un risque type du catalogue partagé (impact transverse sur tous les projets de la typologie) | ⬜ |

## Hors périmètre
- La définition des typologies et de leurs familles dominantes, dont dépend le filtrage — couverte par US21.1.2.
- La suggestion de risques par similarité au niveau portefeuille (approche historique/statistique) — couverte par US21.5.4, mécanisme distinct de ce catalogue statique par typologie.
- La suggestion de risques par IA à partir de la description libre du projet — couverte par US21.7.1.

## Notes d'implémentation
- Le catalogue de risques types est un référentiel partagé (pas propre à un projet), filtré dynamiquement par la `Typology` du profil projet (US21.1.1 + US21.1.2).
- Les risques types ajoutés au registre créent une instance d'entité `Risk` (US21.1.6) référençant le risque type d'origine, pour permettre le suivi de son usage/adoption au niveau portefeuille.
- Ce catalogue est distinct de la bibliothèque vivante (REX, US21.5.3) qui capitalise sur des risques réellement survenus ; ici il s'agit d'un référentiel de départ pré-rempli, pas encore alimenté par le retour d'expérience.

---
Item Type: US · Parent: F21.1 · Module: risk · Phase: phase-3 · Size: M · Priority: Critical
Stage: Backlog
Dépendances: US21.1.2
