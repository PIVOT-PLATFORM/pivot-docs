# EN18.13 — Renommage du champ « Bénéficiaire (MOA) »

**Type d'enabler** : dette

**Objectif technique** : renommer le champ « Bénéficiaire (MOA) » en « Utilisateur / Prescripteur » et propager le nouveau libellé dans tous les écrans et exports, en garantissant la rétro-compatibilité des données existantes.

**Justification** : le libellé « Bénéficiaire (MOA) » ne reflète plus le vocabulaire métier cible ; l'harmonisation doit être appliquée partout (écrans, exports) sans migration destructrice des données déjà saisies.

**Critères de complétion** :
- [ ] Le libellé « Utilisateur / Prescripteur » remplace « Bénéficiaire (MOA) » sur tous les écrans.
- [ ] Le nouveau libellé est propagé dans tous les exports (fichiers, en-têtes de colonnes).
- [ ] Les données existantes restent lisibles et rattachées sans perte (rétro-compatibilité).

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given n'importe quel écran affichant l'ancien champ, when je le consulte, then le libellé affiché est « Utilisateur / Prescripteur ».
- [ ] Error case: given un export généré après le renommage, when je l'ouvre, then l'en-tête porte le nouveau libellé et les valeurs historiques restent correctement associées.
- [ ] Security: le renommage n'altère aucune valeur stockée ni aucune habilitation liée au champ.

---
Item Type: Enabler · Parent: E18 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: administrateur-plateforme
Source: Backlog OPPA (reconstitution v1–v2.1) — EN-704
Dépendances: —
