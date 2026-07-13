# US21.10.1 — Modèle à deux niveaux Facteur de Risque → Risque

**En tant que** Chef de projet appliquant la méthode DIT
**Je veux** saisir des Facteurs de Risque (FR) distincts des risques macro du programme
**Afin de** analyser les causes (FR) séparément des risques agrégés qu'elles alimentent

## Contexte

Hérité de SANDRA (US-03, US-04, EN-01). La méthode DIT distingue deux niveaux : un **référentiel
de risques macro** (jusqu'à 12, communs au programme) et un ensemble de **Facteurs de Risque**
(jusqu'à 60, paramétrable) qui impactent ces risques. Cette US introduit l'entité `RiskFactor` et
la couche « risque macro » comme **profil de projet** activable (US21.1.1), sans remplacer la
cotation directe du Risque déjà portée par US21.1.6.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet dont le profil active la méthode DIT, when le chef de projet crée un Facteur de Risque avec libellé long, libellé court et commentaire, then le FR est enregistré, rattaché au projet, et un compteur de FR actifs est mis à jour | ⬜ |
| Given un référentiel de risques macro du programme, when le chef de projet définit un risque macro (libellé long + libellé court obligatoire), then il devient une cible d'impact disponible pour tous les FR du projet | ⬜ |
| Given une borne de capacité paramétrable par profil (par défaut 60 FR, 12 risques macro), when le chef de projet dépasse cette borne, then la création est refusée (422) avec un message indiquant la limite atteinte | ⬜ |
| Error : given un FR sans libellé court, when il est enregistré, then la saisie est rejetée (400, libellé court obligatoire car utilisé dans les graphiques) | ⬜ |
| Security : seul un rôle habilité (contributeur risque du projet) peut créer/modifier un FR ; l'accès est isolé par tenant (référence cross-tenant → 404) | ⬜ |
| A11y : le compteur de FR actifs et la limite de capacité sont exposés en texte (pas uniquement une jauge colorée), perceptibles par lecteur d'écran (WCAG 2.1 AA 1.4.1) | ⬜ |

## Hors périmètre
- La cotation en criticité 1–6 du FR est traitée par US21.10.3.
- La grille d'impacts FR × Risque est traitée par US21.10.4.
- Le calcul du niveau agrégé de chaque risque est traité par US21.10.5.
- La classification EFQM / 5M du FR est traitée par US21.10.2.
- Les projets qui n'activent pas le profil DIT conservent la cotation directe du Risque (US21.1.6) — cette US n'y touche pas.

## Notes d'implémentation
- Étend **EN21.1** : nouvelles entités `RiskFactor` (rattaché au projet, libellés, commentaire,
  état actif/clôturé, date de clôture) et référentiel `MacroRisk` ; l'impact `FactorImpact` est
  porté par US21.10.4.
- La méthode DIT est un **profil** issu de US21.1.1 : présence de la couche FR conditionnée au
  profil, pas un changement global du modèle `Risk`.
- Aucun caractère de balise SANDRA (`£`, `µ`, `^`) n'est réservé : le modèle de données propre
  remplace le codage par caractères (cf. F21.10 §Dette technique).
- La clôture d'un FR (état + date) relève du cycle de vie US21.3.1 ; ici on prévoit seulement le
  champ d'état et son exclusion des grilles actives.

---
Item Type: US · Parent: F21.10 · Module: risk · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Dépendances: US21.1.1 · US21.1.6 · EN21.1
