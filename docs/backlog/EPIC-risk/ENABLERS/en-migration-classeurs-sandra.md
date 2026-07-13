# EN21.5 — Migration des analyses SANDRA (classeurs `.xlsm`)

**Type d'enabler** : migration

**Objectif technique** : Importer les analyses de risques SANDRA existantes (classeurs `.xls` /
`.xlsm`, méthode DIT) dans le module `risk` sans perte de méthode : identité projet, référentiel de
risques macro, Facteurs de Risque, cotations multi-périodes, grille d'impacts FR × Risque, actions
et familles. Hérité de SANDRA (EN-09, EN-10). Alimente la couche de méthode DIT (F21.10).

**Périmètre importé** :
- **Identité** — nom du programme/projet, périmètre, version, dates de séminaire/mises à jour.
- **Risques macro** — jusqu'à 12, libellés long/court.
- **Facteurs de Risque** — libellés long/court, commentaire, classification EFQM / 5M / famille,
  état et date de clôture (mappés sur `RiskFactor`, US21.10.1 / US21.10.2).
- **Cotations multi-périodes** — probabilité, gravité, criticité 1–6, maîtrise, par période
  (0-Initialisation + jusqu'à 5 mises à jour), mappées sur l'historisation US21.5.5 et le barème
  DIT US21.10.3.
- **Grille d'impacts** — valeurs FR × Risque (Fort/Moyen/Faible ou 0–1), mappées sur `FactorImpact`
  (US21.10.4).
- **Actions** — libellé, responsable, dates prévue/révisée, état, résultat, mappées sur le plan
  d'action US21.3.3.
- **Familles de FR** — libellés court/long, mappées sur la taxonomie US21.1.3.

**Exclusions explicites (dette technique non reportée)** :
- Aucun **code VBA** n'est migré (module `Obsolete`, `Module1`, chemins en dur `D:\Lotus\Notes5\…`,
  `SaveAs SANDRA4.xls`).
- Aucun **caractère de balise** (`£`, `µ`, `^`, lettres J/K/L en Wingdings) : le codage de
  coloration est remplacé par un affichage conditionnel accessible.
- Les **onglets fantômes** référencés mais absents (Matrice Différentielle, Reporting 2/3, Radar
  Risques Différentiel, Axes de reflexion) sont ignorés.
- Les **feuilles auxiliaires de calcul** (Matrice Aux, Impacts Auxiliaire, Evolution Auxiliaire…)
  ne sont pas importées : elles sont recalculées par les moteurs US21.10.3 / US21.10.5.

**Critères de complétion** :
- [ ] Import d'un classeur SANDRA réel (`.xlsm`) produisant un projet risque complet en profil DIT,
      sans perte des entités du périmètre ci-dessus.
- [ ] **Réconciliation des totaux** : le niveau de chaque risque et la liste des FR critiques
      recalculés après import (US21.10.5 / US21.10.6) sont identiques à ceux du classeur source sur
      un jeu de test documenté (parité de résultats).
- [ ] Rapport d'import listant les lignes ignorées / non mappées (FR sans libellé court, valeurs
      hors barème, caractères réservés nettoyés) — jamais d'échec silencieux.
- [ ] Idempotence : réimporter le même classeur ne crée pas de doublons (clé logique projet +
      période).

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un classeur SANDRA valide, when un rôle habilité l'importe, then un projet risque en
      profil DIT est créé avec identité, risques macro, FR, cotations multi-périodes, impacts,
      actions et familles.
- [ ] Given un classeur importé, when les niveaux de risque et FR critiques sont recalculés, then
      ils correspondent aux totaux du classeur source (réconciliation), écarts éventuels reportés.
- [ ] Error case: given un fichier non conforme (format inattendu, onglets requis absents), when il
      est importé, then l'import échoue proprement (422) avec un rapport des anomalies, sans créer
      de projet partiel.
- [ ] Security: given un import, when il est déclenché, then seul un rôle habilité peut le lancer,
      les données sont isolées par tenant, et aucun contenu actif (macro VBA) du classeur n'est
      exécuté (traitement en lecture de données uniquement).

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E21 · Module: risk · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Profils: Tous
Justification: Continuité de service pour les analyses de risques SANDRA existantes (méthode DIT) — condition d'adoption du module par les équipes utilisatrices de l'Excel
Dépendances: EN21.1 (schéma étendu RiskFactor/FactorImpact) · US21.10.1 · US21.10.3 · US21.10.4 · US21.10.5
