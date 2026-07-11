# US34.1.3 — Réunions vers tâches

**En tant que** chef de projet
**Je veux** capturer les décisions de réunion (transcriptions) et les convertir en tâches synchronisées au plan
**Afin de** ne perdre aucun engagement pris en réunion et alimenter directement le planning

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une transcription de réunion, when les décisions sont capturées par l'IA, then elles sont converties en tâches rattachées au plan du projet | ⬜ |
| Given des tâches créées à partir d'une réunion, when elles sont validées, then elles sont synchronisées avec le planning du projet (dates, dépendances, responsables) | ⬜ |
| Error : given une décision ambiguë ou incomplète dans la transcription, system la propose en brouillon pour validation humaine par le chef de projet plutôt que de créer une tâche automatiquement | ⬜ |
| Security : le traitement des transcriptions de réunion (données potentiellement sensibles : noms, décisions, propos tenus) respecte le RGPD (minimisation, durée de conservation limitée) et la localisation des traitements IA ; seul le chef de projet ou un rôle habilité peut valider la conversion brouillon → tâche réelle | ⬜ |
| A11y : l'écran de revue des tâches en brouillon (liste, édition, boutons valider/rejeter) est navigable au clavier et compatible lecteur d'écran conformément au WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Ne couvre pas la capture audio/vidéo ni la transcription elle-même (cette US part d'une transcription déjà disponible en entrée, produite par un outil tiers ou un module de capture séparé).
- Ne couvre pas la modification rétroactive du planning si une tâche synchronisée est ensuite supprimée manuellement (pas de règle de réconciliation automatique dans cette US).
- Ne couvre pas la détection automatique de qui a pris quel engagement à l'oral (attribution de la parole) : la story se limite à l'extraction de décisions et leur conversion en tâches.

## Notes d'implémentation
- Dépend de US34.1.4 (IA souveraine) pour la localisation des traitements de transcription, potentiellement sensible (RGPD).
- Les tâches créées doivent utiliser le même modèle de données/plan que le reste du module `pilotage` (schéma Flyway, FK vers `public.teams.id`) pour permettre la synchronisation avec le planning existant, pas un objet parallèle.
- Le brouillon en attente de validation doit être distinct visuellement et en base d'une tâche confirmée (statut explicite), pour éviter qu'une tâche non validée soit prise en compte dans le planning ou les rapports d'avancement.

---
Item Type: US · Parent: F34.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: PP-042 · MoSCoW: Could · Lot: Lot 4 · Origine: Différenciant MS (Facilitator)
Profils: PME, Grand groupe
Justification: Dossier §6.3
Dépendances: —
