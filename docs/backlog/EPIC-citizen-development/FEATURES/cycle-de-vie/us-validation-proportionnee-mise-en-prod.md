# US52.2.2 — Validation proportionnée à la mise en production

**En tant que** CoE Citizen Dev / RSSI / Architecte (rôles [EN49.2](../../../EPIC-organisation-gouvernance-dsi/ENABLERS/en-modele-roles-raci.md), matrice RACI domaine « Citizen Development »)
**Je veux** que la validation requise avant mise en production d'une application citoyenne soit proportionnée à son niveau de risque déclaré
**Afin de** ne pas imposer de lourdeur inutile aux usages à faible risque tout en sécurisant les usages critiques

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une application de niveau **vert** (usage individuel, données non sensibles, pas de partage), when le Citizen Developer demande la mise en production, then aucune validation a priori n'est requise et la mise en production est autorisée immédiatement, avec traçabilité automatique de l'événement | ⬜ |
| Given une application de niveau **orange** (partage équipe, automatisation d'un process métier), when la mise en production est demandée, then une déclaration obligatoire est enregistrée et une revue légère du CoE Citizen Dev est requise avant activation, limitée à la vérification que seuls des connecteurs pré-approuvés sont utilisés | ⬜ |
| Given une application de niveau **rouge** (données sensibles/critiques, échelle BU, exposition externe), when la mise en production est demandée, then une revue formelle sécurité (RSSI) et architecture (Architecte) est requise, avec possibilité de rattachement de l'application à la DSI | ⬜ |
| Given une revue orange ou rouge en cours, when le CoE/RSSI/Architecte rejette la demande, then l'application reste en statut « Développement » et le motif de rejet est communiqué au Citizen Developer et au Sponsor métier/PO citoyen | ⬜ |
| Error : given une application dont le niveau de risque n'est pas encore auto-évalué (US52.2.1), system refuse la demande de mise en production tant que l'auto-évaluation n'est pas complétée | ⬜ |
| Security : les connecteurs et modèles IA utilisables sont filtrés par une allowlist pré-approuvée pour les niveaux orange et rouge — toute tentative d'usage d'un connecteur non approuvé est journalisée (cohérent avec US29.7.3 côté Workflows) | ⬜ |
| A11y : le tableau de suivi des demandes de validation (statut, niveau de risque, validateur assigné) est navigable au clavier et exposé aux lecteurs d'écran | ⬜ |

## Hors périmètre

- Le détail technique du filtrage de connecteurs propre à chaque plateforme (ex. politiques DLP Workflows) — reste porté par le module d'origine (US29.7.3 pour Workflows), qui applique ce principe générique.
- La revue périodique post mise en production — couverte par US52.2.3.

## Notes d'implémentation

Workflow d'approbation conditionné par `risk_level` de l'entité `CitizenApp` (US52.1.1) :
vert → transition automatique de statut ; orange → tâche de revue assignée au rôle CoE (RACI
Responsible) ; rouge → tâches de revue assignées RSSI + Architecte (RACI Responsible), Accountable
unique porté par DSI Groupe/Architecture selon la matrice RACI EN49.2 domaine « Citizen
Development », décision « publication d'une application citizen dev ».

---
Item Type: US · Parent: F52.2 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: Backlog
Dépendances: US52.1.1 (registre transverse) · US52.2.1 (auto-évaluation du risque) · EN49.2 (matrice RACI, rôles CoE/RSSI/Architecte) · US29.7.3 (contrôle des connecteurs et modèles — module Workflows, principe généralisé ici)
