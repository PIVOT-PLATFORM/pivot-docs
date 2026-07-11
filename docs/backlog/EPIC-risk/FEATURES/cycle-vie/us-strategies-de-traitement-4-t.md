# US21.3.2 — Stratégies de traitement (4 T)

**En tant que** Chef de projet, Contract Manager
**Je veux** assigner à un risque une stratégie de traitement parmi les 4 T (Traiter, Transférer, Tolérer, Terminer), un owner et une échéance
**Afin de** traiter et suivre chaque risque jusqu'à sa clôture

## Contexte

Terminer / Traiter / Transférer / Tolérer avec responsable et échéance.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un risque `actif` dont le score dépasse le seuil d'appétence, when le Chef de projet lui assigne une stratégie (Traiter, Transférer, Tolérer ou Terminer), un owner et une date d'échéance, then la stratégie est enregistrée et associée au risque | ⬜ |
| Given une stratégie `Transférer` choisie pour un risque lié à un fournisseur, when le Contract Manager la valide, then le lien vers l'entité Contract/Vendor concernée est conservé (sans FK inter-modules, via `project_ref`/référence du bus PIVOT) | ⬜ |
| Error : given une tentative d'enregistrement d'une stratégie sans owner ni échéance, system rejette la requête avec un statut 400 et la liste des champs manquants | ⬜ |
| Security : seuls le Chef de projet ou le Contract Manager assignés au risque peuvent créer/modifier une stratégie de traitement ; chaque changement de stratégie est tracé dans l'audit trail (auteur, ancienne/nouvelle stratégie, horodatage) | ⬜ |
| A11y : le formulaire de sélection de stratégie (choix des 4 T, owner, échéance) est intégralement pilotable au clavier et les erreurs de validation sont annoncées par lecteur d'écran (WCAG 2.1 AA) | ⬜ |

## Hors périmètre
- Le détail opérationnel des actions de mitigation liées à une stratégie `Traiter` — cf. US21.3.3 (Plan d'action)
- Le plan de repli à déclencher pour une stratégie `Tolérer` — cf. US21.3.4 (Plan de contingence)
- La réévaluation périodique de la pertinence d'une stratégie choisie — cf. US21.3.5 (Revues de risques)

## Notes d'implémentation
- La stratégie de traitement est un attribut du risque distinct de son statut de cycle de vie (US21.3.1) : un risque `actif` porte une stratégie parmi les 4 valeurs (Traiter, Transférer, Tolérer, Terminer)
- Le choix de la stratégie conditionne les entités enfants attendues : `Traiter` nécessite au moins un plan d'action (US21.3.3), `Tolérer` nécessite un plan de contingence (US21.3.4) ; ces règles de cohérence sont à valider côté backend
- Le lien vers Contract/Vendor pour une stratégie `Transférer` respecte ADR-006 : corrélation par référence (`project_ref`/`vendor_ref`) via le bus PIVOT, jamais de FK inter-modules directe

---
Item Type: US · Parent: F21.3 · Module: risk · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Rôle: chef-de-projet, contract-manager
Dépendances: US21.3.1
