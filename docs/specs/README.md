---
slug: /
sidebar_position: 0
sidebar_label: "Vue d'ensemble"
---

# Specs techniques figées

Contrats techniques **tels que livrés**, générés automatiquement par le Doc Agent après le merge
d'une US (Gate 5 — SPEC FREEZE, voir [`docs/workflow/README.md`](../workflow/README.md)).

## Pourquoi

Une fois `Stage: Done`, le fichier US backlog continue de vivre (relecture, reformulation,
découpage en US enfants) et perd sa valeur de référence technique. Les specs de ce dossier sont
la source de vérité stable du contrat « tel qu'implémenté », pour les US futures qui en dépendent.

## Convention

```text
docs/specs/{EPIC}/{us-id}-{slug}.md
```

Chaque fichier contient : contexte (US, PR, commit de merge), contrat technique final (endpoints,
schémas, événements), écarts vs ACs initiaux, scores Gate 2 / Gate 4.

## Règle d'immutabilité

Une spec figée n'est **jamais réécrite**. Un changement de comportement ultérieur crée une
nouvelle US référençant la spec existante et ajoute un `## Addendum {date} — US-{id}` en fin de
fichier — jamais une édition silencieuse de la section figée initiale.
