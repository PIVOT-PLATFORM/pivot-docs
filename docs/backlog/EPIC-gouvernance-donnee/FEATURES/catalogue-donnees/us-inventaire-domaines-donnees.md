# US51.1.1 — Inventaire des domaines de données

En tant que Data Owner (rôle rattaché au référentiel partagé EN49.2)
Je veux déclarer un domaine de données (nom, description, système(s) source, propriétaire métier)
Afin de constituer un Data Catalog Groupe traçant qui porte quelle donnée et où elle vit réellement

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un Data Owner authentifié, when il crée un domaine de données (nom, description, un ou plusieurs systèmes source déclarés, propriétaire métier choisi parmi les rôles EN49.2), then le domaine est enregistré et visible dans le Data Catalog du tenant | ⬜ |
| Given un domaine de données existant, when le Data Owner modifie sa description, ses systèmes source ou son propriétaire, then l'historique de la modification est conservé (auteur, date, valeur précédente) | ⬜ |
| Given un domaine de données, when un utilisateur consulte le Data Catalog, then il voit pour chaque domaine sa source de vérité déclarée (le système source désigné comme référence parmi les systèmes déclarés) | ⬜ |
| Error : given une création de domaine sans nom ou sans propriétaire métier renseigné, system retourne une erreur de validation 400 et n'enregistre rien | ⬜ |
| Security : seul un utilisateur ayant le rôle Data Owner/Data Steward (EN49.2) ou un rôle d'administration du tenant peut créer ou modifier un domaine de données ; toute autre tentative retourne 403 | ⬜ |
| A11y : le formulaire de déclaration de domaine (champs, sélecteur de propriétaire, liste des systèmes source) respecte WCAG 2.1 AA (labels associés, navigation clavier, messages d'erreur annoncés) | ⬜ |

## Hors périmètre

- Réplication ou synchronisation technique des données entre systèmes source — hors périmètre,
  relève d'un outil MDM/ETL dédié, pas de PIVOT.
- Connecteurs techniques d'intégration avec les systèmes source déclarés (API, ETL) — la
  déclaration reste purement documentaire/déclarative.
- Redéfinition du rôle CDO/Data Owner — référence exclusivement **EN49.2** (E49).

## Notes d'implémentation

- Entité `DonneeDomaine` (schéma `pilotage`), FK `owner_role` vers le référentiel de rôles EN49.2
  et FK optionnelle vers `pilotage.applications`/`pilotage.projects` (EN18.9) si le domaine est
  rattaché à une Application/un Projet porteur.
- Le « propriétaire métier » est une instance de rôle (Data Owner/Data Steward), pas un rôle ad
  hoc recréé localement.

---
Item Type: US · Parent: F51.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: EN49.2 (Modèle de rôles & RACI — rôle Data Owner/CDO) · EN18.9 (Modèle Application → Projet, rattachement optionnel)
