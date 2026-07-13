# F21.10 — Méthode DIT & Facteurs de Risque (héritage SANDRA)

> **Feature de la couche méthodologique de [E21 — Module Gestion des risques](../../README.md).**
> Elle porte dans PIVOT le modèle distinctif de l'outil **SANDRA** (*Système d'ANalyse De Risques
> Anticipée*), un classeur Excel `.xlsm` structuré autour de la méthode **DIT** (réf.
> *DIT-SMQ-GU-001*), afin de couvrir les analyses de risques existantes sans perte de méthode.

## Origine — reverse-engineering du classeur SANDRA

Backlog reconstruit par rétro-ingénierie du classeur `Copie_de_SANDRAV2_Analyse_de_risques.xlsm`
(56 onglets, ~2 100 lignes de VBA, version *SANDRA2-V3e*). Ce document sert de **spec source** :
il consigne ce que fait l'Excel, isole ce qui est déjà couvert par E21, et ne retient comme
User Stories que les **écarts nets** propres à la méthode DIT.

### Ce que fait le classeur (synthèse fonctionnelle)

SANDRA est un outil d'analyse de risques projet/programme qui permet de :

1. **Cadrer l'analyse** — identité projet/programme, périmètre, date de séminaire, historique.
2. **Définir un référentiel de risques** — jusqu'à 12 risques « macro » communs au programme
   (par défaut : Budget, Périmètre, Délais, Ressources, Qualité, Autre).
3. **Identifier des Facteurs de Risques (FR)** — jusqu'à 60 FR (24 dans les versions antérieures),
   avec libellé long, libellé court, commentaire, classification (**EFQM**, **5M**, familles) et
   clôture datée.
4. **Coter la criticité de chaque FR** — probabilité d'apparition × gravité si apparition, via une
   table de correspondance donnant une criticité de **1 à 6** ; suivi de la **maîtrise** et
   positionnement automatique dans une **matrice de criticité**.
5. **Évaluer les impacts** — pour chaque FR, saisie de l'impact (Fort / Moyen / Faible, ou valeur
   0–1) sur chacun des risques macro.
6. **Calculer le niveau des risques** — pour chaque risque : `Σ sur les FR de (criticité FR ×
   impact FR→risque)`, restitué en **radar**.
7. **Piloter un plan d'actions** — actions par FR (responsable, dates prévue/révisée, état,
   résultat) et **tableau de bord** consolidé avec tendance.
8. **Mettre en avant les FR critiques** — extraction automatique des FR dont la criticité
   résultante `> 8` (ou `= 8` avec résultat `> 3`).
9. **Restituer visuellement** — matrices, radars des risques et des FR, fiches détail FR,
   indicateurs colorés (vert/orange/rouge).
10. **Suivre l'évolution dans le temps** — jusqu'à 6 périodes (Initialisation + 5 mises à jour),
    comparaison avec la période précédente (courbes en pointillé).
11. **Consolider au niveau programme** — familles de FR (FamilFR) et statistiques agrégées.
12. **Aider l'utilisateur** — notice/mode opératoire, axes de réflexion (5M, critères EFQM),
    propositions de risques types.

### Modèle de données SANDRA (entités identifiées)

| Entité | Attributs principaux | Onglet(s) source |
|---|---|---|
| **Projet / Programme** | Nom, périmètre, dates de séminaire, commentaires, version | Fiche Identité |
| **Risque** | N°, libellé, libellé court (12 max) | Risques |
| **Facteur de Risque (FR)** | N°, libellé long/court, commentaire, classification EFQM / 5M / famille, date de clôture | Fact Risques |
| **Cotation FR** (par période) | Probabilité, Gravité, Criticité (calculée 1–6), Maîtrise | Fact Risques |
| **Impact** | FR × Risque → Fort/Moyen/Faible ou 0–1 | Impacts |
| **Niveau de risque** | Risque → `Σ(criticité FR × impact)` | Calcul du Niveau des Risques |
| **Action** | N° FR, N° action, libellé, responsable, dates, état, visibilité, résultat | Plan Actions |
| **Période** | 0-Initialisation + 5 mises à jour datées | Fact Risques / Evolution FR |
| **Famille de FR** | Libellé court + long (10 familles) | FamilFR |

### Référentiels de paramétrage SANDRA

- **Criticité** : Probabilité (5 niveaux : *Très peu probable · À ne pas écarter · Possible · Tout
  à fait possible · Très probable*) × Gravité (4 niveaux : *Très peu grave · Peu grave · Grave ·
  Gravité fatale*) → criticité **1 à 6**.
- **Impacts** : Fort = 0,8 · Moyen = 0,5 · Faible = 0,2 (ou saisie libre 0–1).
- **EFQM** : 9 critères (Leadership, Politique & Stratégie, Personnel, Partenariat & Ressources,
  Processus, Résultats Clients / Personnels / Collectivités / Performance clef).
- **5M** (Ishikawa) : Milieu, Main d'œuvre, Matériel, Matière (données), Méthodes.
- **États d'action** : En cours, Annulée, À venir, Terminée, Hors périmètre, Suspendue.

## Correspondance SANDRA ↔ E21 (ce qui est déjà couvert vs écart net)

> Principe d'intégration : **zéro duplication**. La majorité du périmètre SANDRA est déjà portée
> par le backlog E21. Seuls les **écarts** liés à la structure à deux niveaux *Facteur de Risque →
> Risque* et à la méthode DIT deviennent des US nouvelles (colonne « Cible »).

| Capacité SANDRA | Statut dans E21 | Cible |
|---|---|---|
| US-01 Identité projet | Couvert | US21.1.1 (cadrage) + US21.9.1 (corrélation projet via bus) |
| US-02 Historiser dates séminaire / MAJ | Couvert | US21.3.5 (revues) + US21.5.5 (historique) |
| US-03 Référentiel de 12 risques macro | **Écart** | **US21.10.1** (couche Risque agrégé, cible des FR) |
| US-04 Saisir un Facteur de Risque | **Écart** | **US21.10.1** (couche FR à deux niveaux) |
| US-05 Classifier FR (EFQM / 5M / famille) | Partiel | famille → US21.1.3 ; **EFQM/5M → US21.10.2** |
| US-06 Clôturer un FR | Couvert | US21.3.1 (cycle de vie, état clôturé) |
| US-07 Coter la criticité (barème 1–6) | Variante | US21.2.1 (P×G paramétrable) ; **barème DIT 1–6 → US21.10.3** |
| US-08 Suivre la maîtrise | Couvert | US21.3.2 (traitement 4 T) + US21.2.6 (exposition) |
| US-09 Matrice de criticité | Couvert | US21.2.4 (matrice visuelle) |
| US-10 Impact FR sur les risques | **Écart** | **US21.10.4** (grille bipartite FR × Risque) |
| US-11 Niveau de risque = Σ(crit × impact) | **Écart** | **US21.10.5** (agrégation FR → Risque + radar) |
| US-12 Plan d'actions par FR | Couvert | US21.3.3 (plan d'action) |
| US-13 Tableau de bord des actions | Couvert | US21.8.1 / US21.8.3 + widget US21.9.3 |
| US-14 Saisie multi-écran | Hors périmètre | ergonomie shell (E19) — pas un besoin métier risque |
| US-15 Lister les FR critiques (règle > 8) | **Écart** | **US21.10.6** (règle DIT `> 8` / `= 8 & résultat > 3`) |
| US-16 Radar des risques | Couvert | US21.10.5 (radar niveau) + restitutions F21.8 |
| US-17 Radars des FR | Couvert | US21.5.5 (tendance) + restitutions F21.8 |
| US-18 Détail d'un FR (contribution) | **Écart** | **US21.10.7** (fiche de contribution FR → risques) |
| US-19 Feuille de synthèse | Couvert | US21.8.5 (export & rapport) |
| US-20 Gérer plusieurs périodes | Couvert | US21.5.5 (tendance et historique) |
| US-21 Évolution d'un FR (courbes) | Couvert | US21.5.5 |
| US-22 Définir des familles de FR | Couvert | US21.1.3 (taxonomie 12 familles) |
| US-23 Consolidation programme (stats) | Couvert | US21.5.1 + US21.5.2 ; stats EFQM/5M via US21.10.2 |
| US-24 Notice / mode opératoire | Couvert | E41 (Formation & Onboarding) |
| US-25 Axes de réflexion (5M/EFQM/types) | Couvert | US21.1.5 (biblio pré-suggérés) ; volet 5M/EFQM via US21.10.2 |
| US-26 Naviguer entre les écrans | Couvert | E19 (Shell / UX) |
| EN-01 Modèle de données relationnel | Étend l'existant | EN21.1 **étendu** (entités `RiskFactor`, `FactorImpact`) |
| EN-02 Moteur de criticité (1–6) | **Écart** | **US21.10.3** |
| EN-03 Moteur de niveau de risque (Σ) | **Écart** | **US21.10.5** |
| EN-04 Référentiels paramétrables | Couvert | US21.1.4 (pondération) + profil US21.1.1 |
| EN-05 Moteur de coloration (smileys) | Ne pas reporter | remplacé par affichage conditionnel + A11y (US21.2.1 / US21.8.6) |
| EN-06 Règle de sélection des FR critiques | **Écart** | **US21.10.6** |
| EN-07 Historisation des périodes | Couvert | US21.5.5 |
| EN-08 Génération des visualisations | Couvert | US21.2.4 + US21.10.5 + restitutions F21.8 |
| EN-09 Migration des données existantes | **Écart** | **EN21.5** (import des classeurs `.xlsm`) |
| EN-10 Import / export & communication | Couvert | US21.8.5 |
| EN-11 Gestion des droits & verrouillage | Couvert | EN21.2 (guard) + E04 (Auth/IAM) |
| EN-12 Navigation applicative | Couvert | E19 (Shell / UX) |
| EN-13 Nettoyage du code obsolète | Sans objet | greenfield PIVOT — aucun code VBA reporté |

## Écart structurel majeur — le modèle à deux niveaux

E21 modélise aujourd'hui le **Risque** directement (score P × G porté par l'entité `Risk`,
cf. US21.1.6 / US21.2.1). La méthode DIT introduit une **couche intermédiaire** :

```text
Facteur de Risque (FR)  ──(impact 0–1)──►  Risque macro
   ▲ criticité 1–6 (P×G)                       ▲ niveau = Σ(criticité FR × impact FR→risque)
```

Cette feature ajoute donc l'entité `RiskFactor` et la relation d'impact `FactorImpact` **sans
remplacer** le modèle direct de E21 : la méthode DIT est un **profil de projet** activable
(cf. US21.1.1), les projets qui ne l'utilisent pas conservent la cotation directe du Risque.

## Périmètre GitHub

| ID | Titre | Écart couvert |
|----|-------|---------------|
| [US21.10.1](us-modele-facteur-de-risque.md) | Modèle à deux niveaux Facteur de Risque → Risque | SANDRA US-03, US-04 · EN-01 |
| [US21.10.2](us-classification-efqm-5m.md) | Classification EFQM & 5M d'un facteur | SANDRA US-05 · US-23 · US-25 |
| [US21.10.3](us-cotation-criticite-1-6.md) | Cotation en criticité 1–6 (table DIT) | SANDRA US-07 · EN-02 |
| [US21.10.4](us-grille-impacts-fr-risque.md) | Grille d'impacts Facteur × Risque | SANDRA US-10 |
| [US21.10.5](us-niveau-risque-agrege.md) | Niveau de risque agrégé = Σ(criticité × impact) | SANDRA US-11 · US-16 · EN-03 · EN-08 |
| [US21.10.6](us-extraction-fr-critiques.md) | Extraction automatique des FR critiques (règle DIT) | SANDRA US-15 · EN-06 |
| [US21.10.7](us-fiche-contribution-fr.md) | Fiche de contribution d'un facteur aux risques | SANDRA US-18 |
| [EN21.5](../../ENABLERS/en-migration-classeurs-sandra.md) | Migration des analyses SANDRA (`.xlsm`) | SANDRA EN-09 · EN-10 |

## Dette technique SANDRA à ne pas reporter

- **Chemins et noms de fichiers en dur** dans `Module1` (`D:\Lotus\Notes5\...\SANDRA4.xls`) :
  non portables — supprimés.
- **Codage par caractères de balise** (`£`, `µ`, `^`, lettres J/K/L en Wingdings pour les
  smileys) : fragile, impose des interdits de saisie — remplacé par un modèle de données propre
  et un affichage conditionnel accessible (A11y).
- **Onglets fantômes** référencés par des macros mais absents du classeur (*Matrice
  Différentielle*, *Reporting 2/3*, *Radar Risques Différentiel*, *Axes de reflexion*) :
  incohérences non reportées.
- **Écart de capacité** : la Notice mentionne 24 FR, l'onglet *Fact Risques* en annonce 60 →
  tranché comme **paramètre** (US21.10.1, borne par profil).
- **Logique de calcul dispersée** entre formules, plages nommées et VBA → regroupée dans des
  services testables (US21.10.3, US21.10.5).
- **Code mort** : module `Obsolete`, `Module1.Macro1` (`SaveAs SANDRA4.xls`) → non reporté.

---

Item Type: Feature · Parent: E21 · Module: risk · Phase: phase-3 · Priority: Medium
