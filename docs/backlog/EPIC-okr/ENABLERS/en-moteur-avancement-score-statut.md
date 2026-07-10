# EN27.1b — Moteur d'avancement, score et statut OKR

**Type d'enabler** : architecture

**Objectif technique** : Implémenter le moteur de calcul OKR de l'état de l'art par-dessus le
modèle persistant (EN27.1a) : avancement d'un `KeyResult` borné `0–100 %`, `score 0.0–1.0` par KR
puis agrégation pondérée au niveau `Objective`, `statut` (`ON_TRACK` / `AT_RISK` / `OFF_TRACK` /
`DONE`) déduit du rythme attendu (`pace`), tendance et niveau de confiance issus des `CheckIn`,
grading de clôture, avec cibles par type (`engageant` cible `1.0` / `aspirationnel` sweet spot
`~0.7`).

**Moteur** :

```text
avancement KR = clamp( (actuel − baseline) / (cible − baseline), 0, 100 % )   (métrique/%)
score KR = avancement / 100 ; jalon/booléen → 0.0 ou 1.0
score O  = Σ(score KR × poids KR) / Σ(poids KR)                                (agrégation pondérée)
statut   = f(score attendu au prorata du temps écoulé dans le Cycle, seuils AT_RISK/OFF_TRACK)
tendance/confiance = dérivées de la série des CheckIn
```

**Justification** : Cœur de valeur analytique du module OKR — sans moteur, le modèle n'est qu'un
stockage. Lot purement calcul, testable unitairement de façon exhaustive (déterministe), isolé du
schéma (EN27.1a) et des connecteurs (EN27.1d).

**Critères de complétion** :
- [ ] Calcul d'avancement KR borné `0–100 %` pour les types `métrique` / `%` (baseline → cible),
  et binaire pour `jalon` / `booléen`
- [ ] Score `0.0–1.0` par KR et agrégation **pondérée** au niveau `Objective` (somme des poids
  normalisée, robuste à un poids total nul)
- [ ] Statut `ON_TRACK` / `AT_RISK` / `OFF_TRACK` / `DONE` calculé via le `pace` attendu (prorata
  temporel du `Cycle`), avec seuils configurables
- [ ] Tendance et niveau de confiance dérivés de la série de `CheckIn`
- [ ] Cibles par type : `engageant` visant `1.0`, `aspirationnel` sweet spot `~0.6–0.7` ; grading
  de clôture appliquant la cible correspondante
- [ ] Moteur sans effet de bord persistance (fonctions pures sur les entités chargées), couvert par
  des tests unitaires déterministes

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un `KeyResult` métrique baseline `10`, cible `20`, actuel `15`, when le moteur calcule
  l'avancement, then il retourne `50 %` et un score KR de `0.5`.
- [ ] Given un `Objective` à 2 KR de scores `0.4` (poids `3`) et `0.8` (poids `1`), when le moteur
  agrège, then le score `Objective` = `0.5` (moyenne pondérée) borné `[0.0, 1.0]`.
- [ ] Given un `Cycle` à mi-parcours et un `Objective` engageant sous le `pace` attendu, when le
  statut est évalué, then il vaut `AT_RISK` ou `OFF_TRACK` selon les seuils configurés.
- [ ] Error case: given un `KeyResult` avec `cible == baseline` (division par zéro) ou un
  `Objective` sans KR / à poids total nul, when le moteur calcule, then il retourne un score neutre
  défini (`0.0`) sans lever d'exception ni produire `NaN`/`Infinity`.
- [ ] Error case: given un `actuel` hors bornes (au-delà de la cible ou sous la baseline), when
  l'avancement est calculé, then il est clampé à `[0, 100] %` (jamais de score > `1.0` ou < `0.0`).
- [ ] Security: le moteur n'opère que sur les entités déjà filtrées par tenant fournies par la
  couche persistance (EN27.1a) — aucune requête directe, aucune agrégation ne peut mélanger des
  `Objective` de tenants différents (isolation multi-tenant préservée en amont, `404` cross-tenant).

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E27 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Profils: Tous
Justification: Moteur avancement/score/statut/tendance + agrégation pondérée + cibles par type — cœur analytique OKR (issu de la décomposition d'EN27.1 XL)
Dépendances: EN27.1a (modèle & persistance OKR)
