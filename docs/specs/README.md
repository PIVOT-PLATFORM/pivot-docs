---
slug: /
sidebar_position: 0
sidebar_label: "Vue d'ensemble"
---

# Specs fonctionnelles et techniques figées

Comportement et contrats techniques **tels qu'implémentés**, générés automatiquement par le Doc
Agent dès que la PR d'une US atteint Gate 4 = 100/100 — **avant merge** (Gate 5 — SPEC FREEZE, voir
[`docs/workflow/README.md`](pathname:///pivot-docs/workflow)).

## Pourquoi

Une fois `Stage: Done`, le fichier US backlog continue de vivre (relecture, reformulation,
découpage en US enfants) et perd sa valeur de référence technique. Les specs de ce dossier sont
la source de vérité stable du comportement et du contrat « tel qu'implémenté », pour les US futures
qui en dépendent. Le figeage a lieu dès la convergence de l'Autoloop (Gate 4 = 100/100), pas
seulement après la recette humaine du mainteneur — une PR peut être figée alors qu'elle attend
encore une revue humaine obligatoire (ex. Breaking Point 2).

## Convention

```text
docs/specs/{EPIC}/{us-id}-{slug}.md
```

Chaque fichier contient : contexte (US, PR, dernier commit au moment du figeage), spec fonctionnelle
(comportement et flux en langage clair, au-delà des ACs bruts), contrat technique final (endpoints,
schémas, événements), écarts vs ACs initiaux, scores Gate 2 / Gate 4.

## Règle d'immutabilité

Une spec figée n'est **jamais réécrite**. Un changement de comportement ultérieur crée une
nouvelle US référençant la spec existante et ajoute un `## Addendum {date} — US-{id}` en fin de
fichier — jamais une édition silencieuse de la section figée initiale.
