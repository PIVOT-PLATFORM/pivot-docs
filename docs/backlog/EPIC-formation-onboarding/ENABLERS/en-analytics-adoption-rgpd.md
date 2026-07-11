# EN41.1d — Analytics d'adoption (RGPD)

**Type d'enabler** : architecture · mesure & conformité (RGPD-by-design)

**Objectif technique** : Fournir la couche de **mesure d'usage et de complétion** de l'onboarding, **RGPD-by-design** : capter les signaux de progression/complétion émis par le moteur (EN41.1a) et l'API (EN41.1b), les **agréger** en métriques d'adoption (taux de complétion, abandon par étape) et les exposer à la mesure de l'adoption (F41.6). La collecte respecte la **minimisation des données** (données strictement nécessaires, agrégation, pas de profilage individuel), le **consentement / opt-out** et l'exclusion de tout usage d'évaluation individuelle (cf. Hors-périmètre EPIC).

**Justification** : Sans mesure, l'adoption n'est pas pilotable (Insight I8 : l'adoption est un projet mesuré). La conformité RGPD-by-design est une exigence non négociable : les données d'onboarding ne doivent jamais servir à surveiller ou évaluer un individu, et la collecte doit être minimale et consentie.

**Hors-périmètre** :
- Rendu et séquencement — EN41.1a.
- Persistance de la progression brute par utilisateur — EN41.1b (source des signaux, pas objet de l'analytics).
- Ciblage du contenu — EN41.1c.
- Funnel d'activation & relances applicatives — F41.6 (consomme les métriques agrégées d'ici).
- Toute **évaluation de performance individuelle** à partir de l'adoption — exclue par principe (éthique E11/E27, non-surveillance individuelle).

**Critères de complétion** :
- [ ] Captation des signaux de progression / complétion (démarrage, étape franchie, skip, complétion) émis par EN41.1a/b.
- [ ] **Agrégation** en métriques d'adoption (taux de complétion, abandon par étape, par module/rôle) — **jamais** de métrique nominative exposée.
- [ ] **Minimisation** : seules les données strictement nécessaires sont collectées ; pas de donnée non requise, pas de profilage individuel.
- [ ] **Consentement / opt-out** respecté : un utilisateur opposé n'alimente pas les mesures.
- [ ] Métriques agrégées exposées à F41.6 ; isolation multi-tenant systématique (404 non-membre / cross-tenant).

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given des utilisateurs parcourant un onboarding, when ils franchissent des étapes ou complètent un parcours, then l'analytics agrège les signaux en métriques d'adoption (taux de complétion, abandon par étape) exposées à F41.6, sans jamais restituer de valeur nominative.
- [ ] Given un besoin de pilotage par module et par rôle, when la mesure est consultée, then elle fournit des taux **agrégés** par module/rôle sans permettre de ré-identifier un individu (k-anonymat / seuil d'agrégation).
- [ ] Given un utilisateur ayant exercé son opt-out, when il parcourt un onboarding, then ses signaux ne sont pas intégrés aux mesures (aucune collecte le concernant au-delà du strict fonctionnement).
- [ ] Error case: given un signal analytique porteur de données non minimales (identifiant nominatif superflu, champ hors périmètre), when il est reçu, then il est rejeté / expurgé avant agrégation (minimisation appliquée en entrée), sans stocker la donnée excédentaire.
- [ ] Security: given un utilisateur authentifié consultant les métriques d'un tenant dont il n'est pas membre / cross-tenant, when il interroge l'analytics, then `404` (isolation systématique) ; l'accès aux métriques d'adoption est réservé à un rôle habilité (admin / pilotage adoption), sinon `403` ; **RGPD** : les données sont minimales, agrégées, consenties, jamais utilisées pour une évaluation individuelle.

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E41 · Module: core · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Dépendances: EN41.1a (moteur d'affichage in-app) · EN41.1b (API parcours & progression) · F41.6 (mesure de l'adoption — consommateur)
