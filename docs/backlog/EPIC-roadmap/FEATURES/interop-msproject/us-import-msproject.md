# US22.7.1 — Import de plannings MS Project

**En tant que** chef de projet
**Je veux** importer un planning MS Project (.mpp et/ou .xml MSPDI) : tâches, dépendances, ressources, calendriers, baselines
**Afin de** reprendre l'existant sans ressaisie (condition d'adoption)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un fichier .xml MSPDI (ou .mpp), when je l'importe, then WBS, dépendances typées, contraintes, calendriers et ressources sont restitués | ⬜ |
| Given un import, when des éléments ne sont pas mappables, then un rapport d'import liste ce qui a été approximé | ⬜ |
| Error : given un fichier corrompu, un format invalide (ni .mpp ni .xml MSPDI) ou une version MSPDI non supportée, when je tente l'import, then l'import est rejeté avec un message précis (élément fautif si détectable) et aucune donnée partielle n'est créée dans le Projet cible | ⬜ |
| Security : le fichier importé est validé/assaini avant traitement (limite de taille, désactivation des entités externes XML pour prévenir le XXE, rejet des macros embarquées .mpp) ; seul un rôle avec droit d'écriture sur le Projet cible peut lancer un import | ⬜ |

## Hors périmètre
- Import de `.mpx` et `.mpt` (formats legacy, non couverts par cette US ciblée MSPDI/.mpp)
- Synchronisation bidirectionnelle continue avec MS Project après import (voir export, US22.7.2)
- Fusion/réconciliation intelligente lors d'un ré-import sur un Projet déjà existant (l'US ne couvre que la création initiale)

## Notes d'implémentation
- Le `.xml` (MSPDI) est un schéma XML documenté par Microsoft ; le `.mpp` est un format binaire propriétaire non documenté — s'appuyer sur une librairie tierce éprouvée (ex. MPXJ) plutôt qu'un parseur maison
- Mapping cible le modèle temporel unique EN22.1 (Projet → Phase → Tâche → Jalon → Dépendance) : chaque entité MSPDI (task, predecessor link, calendar, resource assignment, baseline) est routée vers l'entité EN22.1 correspondante
- Le rapport d'import (éléments approximés/non mappables) doit être persisté et consultable a posteriori, pas seulement affiché en notification transitoire

---
Item Type: US · Parent: F22.7 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
