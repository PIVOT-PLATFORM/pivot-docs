# US11.5.2 — Période de sprint : API préconfigurée ou durée manuelle

**Gate 1 réalisé le 2026-07-22 — fermé, redondant avec le socle S20 (décision mainteneur).**

**En tant que** Scrum Master
**Je veux** récupérer automatiquement les dates de sprint depuis une API externe préalablement configurée (Jira, Azure DevOps…), ou à défaut saisir une durée de sprint
**Afin de** éviter la double saisie des dates et rester source-agnostique

## Décision Gate 1

Cette US portait deux chemins : (1) récupération automatique via un connecteur agile externe
préconfiguré (Jira, Azure DevOps…), (2) saisie manuelle d'une durée. Le chemin (2) est **déjà
livré** — `CapacityEvent.startDate`/`endDate` (US11.1.1, Sprint 20, `pivot-core#261`) couvre
exactement ce besoin : chaque événement de capacité porte ses dates de début/fin saisies à la
création, sans double saisie puisqu'aucune autre source de vérité n'existe encore côté PIVOT pour
ces dates.

Le chemin (1) — connecteur Jira/Azure DevOps en temps réel — nécessite une intégration OAuth/API
tierce réelle (identifiants, comptes sandbox ou de production, gestion de jetons, webhooks de
resynchronisation) qui n'est pas réalisable dans le cadre de ce sprint : aucun accès à un tenant
Jira/ADO réel n'est disponible, et bâtir un tel connecteur sans jamais l'exercer contre une vraie
instance produirait du code non vérifiable de bout en bout. **Décision mainteneur explicite
(2026-07-22)** : ce chemin n'est pas construit ce sprint.

**Statut retenu** : US fermée comme **redondante avec le socle déjà livré** — aucun développement
supplémentaire. Une future US de convergence pourra proposer un connecteur Jira/ADO réel si un
besoin concret émerge et qu'un accès à un environnement agile externe devient disponible ; non
traité ici, non régressif (la saisie manuelle actuelle reste pleinement fonctionnelle).

---
Item Type: US · Parent: F11.5 · Module: agilite · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: scrum-master
