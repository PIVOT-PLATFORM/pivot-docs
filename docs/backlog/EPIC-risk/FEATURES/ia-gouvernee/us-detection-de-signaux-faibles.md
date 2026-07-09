# US21.7.2 — Détection de signaux faibles

**En tant que** PMO, Chef de projet
**Je veux** que le module détecte automatiquement des signaux faibles (dégradation de vélocité, glissement budget, obstacles récurrents) dans les données de pilotage
**Afin de** repérer un risque émergent avant qu'il ne devienne critique, sans décision automatique

## Contexte

Repérer dégradation de vélocité, glissement budget, obstacles récurrents dans les données de pilotage, consommées via le bus PIVOT.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet dont la vélocité se dégrade ou le budget glisse sur plusieurs itérations consécutives (données reçues via le bus PIVOT), when le seuil de détection est franchi, then une alerte de risque candidat est générée et proposée à qualification par le chef de projet ou le PMO | ⬜ |
| Given une alerte de signal faible générée, when l'utilisateur habilité qualifie l'alerte, then elle devient un risque du registre (si confirmée) ou est archivée avec motif (si écartée), dans les deux cas de façon traçable | ⬜ |
| Error : given des données de pilotage incomplètes ou insuffisantes pour calculer un signal fiable, system n'émet aucune alerte plutôt qu'un faux positif, et journalise l'insuffisance de données | ⬜ |
| Security : la détection n'a jamais pour effet de créer un risque directement dans le registre — seule une qualification humaine explicite transforme le signal en risque ; l'accès aux alertes est restreint aux rôles habilités sur le projet concerné | ⬜ |

## Hors périmètre
- La suggestion de risques par IA à partir de la description projet — couverte par US21.7.1 (mécanisme distinct : ici la source est le pilotage réel, pas la description).
- La définition des seuils de vélocité/budget déclenchant un signal — paramétrage produit à traiter en notes d'implémentation, pas un AC de cette US.
- La gouvernance transverse de traçabilité IA — couverte par US21.7.4.

## Notes d'implémentation
- Consomme les mêmes flux que la boucle vivante (US21.4.1 : `task.completed`, `budget.alert`, `sprint.closed`) — réutilise l'adaptateur bus PIVOT d'EN21.3, ne recrée pas un second consumer.
- Les seuils de détection (ex. nombre d'itérations de dégradation consécutives) doivent être configurables par le PMO, pas codés en dur.
- Chaque alerte générée doit être traçable jusqu'aux événements bus qui l'ont déclenchée, pour permettre l'audit prévu par US21.7.4.

---
Item Type: US · Parent: F21.7 · Module: risk · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Dépendances: US21.4.1
