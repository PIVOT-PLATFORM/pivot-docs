# US21.6.6 — Pack AI Act

**En tant que** DPO, Data
**Je veux** « Pack AI Act »
**Afin de** chiffrer les risques et garantir la conformité réglementaire

## Contexte

Classer le niveau de risque du système IA et injecter explicabilité et exigences.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet dont le profil indique la présence d'un système d'IA, when le DPO ou le rôle Data renseigne la classification de risque AI Act du système (inacceptable, haut risque, risque limité, risque minimal), then le pack AI Act injecte automatiquement les risques pré-suggérés correspondants (exigences d'explicabilité, de documentation, de supervision humaine) proportionnés au niveau de classification | ⬜ |
| Error : given un projet avec système d'IA dont la classification de risque n'a pas encore été renseignée, system bloque l'injection automatique du pack et affiche un état « classification requise », plutôt que d'appliquer un niveau de risque par défaut potentiellement inexact | ⬜ |
| Security : la classification de risque AI Act et les risques de conformité associés (données sensibles sur l'exposition réglementaire du projet) ne sont modifiables que par les rôles habilités (DPO, Data) ; un contributeur standard peut consulter mais pas modifier la classification | ⬜ |

## Hors périmètre
- L'évaluation technique de conformité du système d'IA (audit de biais, tests d'explicabilité réels) n'est pas réalisée par cette US : elle injecte des risques de suivi, pas un outil d'audit IA.
- Le pack RGPD (US21.6.5), bien que souvent corrélé (IA traitant des données personnelles), reste une US distincte ; les deux packs peuvent s'appliquer simultanément sans se dupliquer.
- La gouvernance de l'IA interne au module risque (F21.7, ex. IA de suggestion) est hors périmètre — cette US concerne la conformité réglementaire des systèmes d'IA du projet suivi, pas l'IA du module lui-même.

## Notes d'implémentation
- Dépend de US21.1.5 (bibliothèque de risques pré-suggérés) : le pack AI Act est un sous-ensemble filtré par classification de risque (mapping classification → jeu de risques types).
- La classification de risque doit être un champ explicite et traçable sur le profil de projet (pas dérivée implicitement), pour permettre l'audit de conformité a posteriori.
- Prévoir que la classification puisse être révisée dans le temps (évolution du système d'IA) et que l'injection des risques se rafraîchisse en conséquence, sans dupliquer les risques déjà présents (idempotence).

---
Item Type: US · Parent: F21.6 · Module: risk · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Dépendances: US21.1.5
