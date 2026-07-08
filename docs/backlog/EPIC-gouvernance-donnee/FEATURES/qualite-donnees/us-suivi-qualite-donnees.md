# US51.2.1 — Suivi de la qualité des données

En tant que Data Owner (rôle rattaché au référentiel partagé EN49.2)
Je veux déclarer un score de qualité par domaine de données et un plan de remédiation associé
Afin de piloter en gouvernance l'amélioration continue de la fiabilité des données Groupe, sans exécuter moi-même de règles techniques de qualité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un domaine de données existant (US51.1.1), when le Data Owner déclare un score de qualité (valeur + date d'évaluation + méthode/critères déclarés en texte libre), then le score est enregistré et historisé pour ce domaine | ⬜ |
| Given un domaine dont le score de qualité est déclaré en dessous d'un seuil défini par le tenant, when le Data Owner consulte le domaine, then un plan de remédiation peut lui être associé (actions, responsable, échéance) | ⬜ |
| Given un plan de remédiation associé à un domaine, when son échéance est dépassée sans clôture, then le domaine apparaît signalé dans le tableau de bord de gouvernance de la donnée | ⬜ |
| Error : given une déclaration de score hors des bornes autorisées (ex. hors 0-100 ou format invalide), system retourne une erreur de validation 400 et n'enregistre rien | ⬜ |
| Security : seul un Data Owner/Data Steward ou un rôle d'administration du tenant (EN49.2) peut déclarer un score de qualité ou un plan de remédiation ; toute autre tentative retourne 403 | ⬜ |
| A11y : le tableau de bord de suivi qualité (scores, échéances de remédiation en retard) respecte WCAG 2.1 AA (alertes non portées uniquement par la couleur, navigation clavier) | ⬜ |

## Hors périmètre

- Implémentation de règles techniques de qualité de données (validation de format, contrôle de
  cohérence automatisé, profiling) — hors périmètre, seul le **suivi déclaratif** du score et de
  sa remédiation relève de PIVOT.
- Calcul automatique du score à partir des données réelles des systèmes source — le score reste
  déclaré par le Data Owner, pas calculé par PIVOT.
- Outillage de correction automatique des données (nettoyage, standardisation) — relève d'un
  outil data dédié, hors périmètre.

## Notes d'implémentation

- Entité `DonneeQualiteScore` (historisée) + `DonneeQualitePlanRemediation` (schéma `pilotage`),
  FK vers `DonneeDomaine` (US51.1.1).
- Seuil d'alerte configurable par tenant (paramètre de gouvernance), pas une valeur figée en dur.

---
Item Type: US · Parent: F51.2 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: Backlog
Dépendances: US51.1.1 (Inventaire des domaines de données) · EN49.2 (rôle Data Owner déclarant le score)
