# ADR-029 — i18n des modules : scope Transloco embarqué par la lib

**Date :** 2026-07-13
**Statut :** Accepté
**Décideurs :** Architecte plateforme, Architecte Modules, Mainteneur
**Contexte technique :** `pivot-ui` (shell, catalogue i18n global `public/assets/i18n/{lang}.json`),
tous les `pivot-xxx-ui` (libs de module publiées, ex. `@pivot-platform/collaboratif-ui`),
[ADR-003](ADR-003-systeme-modules.md) (système de modules), [ADR-006](ADR-006-multi-repo-architecture.md)
(architecture multi-repo), [E03 — Système de modules](pathname:///pivot-docs/backlog/EPIC-module-system/) —
implémentation de référence : `pivot-collaboratif-ui` PR #93 (scope `whiteboard`), nettoyage shell
`pivot-ui` (supersède `pivot-ui` PR #188)

---

## Contexte

L'éditeur de tableau blanc, chargé dans le shell `pivot-ui` via la lib publiée
`@pivot-platform/collaboratif-ui`, affichait ses libellés en **clés i18n brutes**
(`whiteboard.board.untitled`, `whiteboard.toolbar.*`, `whiteboard.groups.*`, `whiteboard.timer.*`,
`whiteboard.voteResults.*`…) au lieu du texte traduit.

**Cause racine.** La lib émet des clés Transloco **globales** (`'whiteboard.x' | transloco`)
**sans scope ni loader**, et le paquet npm **n'embarque aucun fichier i18n**. Transloco résout
donc ces clés contre l'**unique catalogue global** fourni par l'app hôte
(`pivot-ui/public/assets/i18n/{lang}.json`). Résultat : chaque host doit **recopier
manuellement** l'arbre `whiteboard.*` complet dans son propre catalogue. Lors du passage de la
lib en `0.2.0` (ajout des features groupes/timer/vote/cadres → 57 nouvelles clés), cette recopie
n'a pas suivi → clés brutes affichées.

**Pourquoi un simple correctif ne suffit pas.** Le correctif immédiat
(`pivot-ui` PR [#188](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/188)) recomplète les 57
clés manquantes dans le catalogue du shell : il corrige l'instant T mais **pérennise le
couplage host↔lib** — toute évolution future de la lib impose une resynchronisation manuelle
dans chaque host qui la consomme. Ce couplage n'est pas propre au module Collaboratif : il se
reproduira à l'identique pour chaque futur module (`pilotage`, `agilite`, …) dès qu'il gagnera
une UI et des libellés à traduire.

## Décision

**Chaque lib UI de module possède son propre scope Transloco, nommé d'après sa clé de module
dans le registre (ex. `whiteboard`), et embarque ses traductions dans son propre bundle npm.**

- La lib enregistre son scope via sa fonction de provisioning déjà existante
  (`provideXxxUi()`, ex. `provideCollaboratifUi()`), au moyen d'un **`InlineLoader`** Transloco
  (import dynamique du fichier de traduction par langue, résolu au chargement de la route lazy du
  module) :

  ```ts
  provideTranslocoScope({
    scope: 'whiteboard',
    loader: {
      en: () => import('../../../i18n/en.json'),
      fr: () => import('../../../i18n/fr.json'),
    },
  });
  ```

- Les fichiers de traduction (`src/lib/i18n/{en,fr}.json`) contiennent le sous-arbre racine du
  scope, **compilés dans le paquet npm** (chunks lazy par langue, produits par `ng-packagr`) —
  aucun asset externe, aucune configuration de build côté host.
- `provideXxxUi()` étant déjà appelé au chargement de la route du module par le shell **et** par
  le harnais de développement standalone de la lib, le scope est disponible partout où la lib
  tourne, **sans aucune action du host**.
- **Les hosts (`pivot-ui` et tout futur shell) ne recopient et ne possèdent jamais aucune
  traduction d'un module.** Le catalogue global du host ne conserve que ses propres clés
  (`modules.*`, `nav.*`, `auth.*`…) — les clés qui *parlent d'un module depuis le shell* (ex.
  `modules.guard.names.whiteboard`, nom d'affichage dans le registre de modules) restent
  légitimement dans le shell, car ce sont des clés du shell, pas du module.

Implémentation de référence : `pivot-collaboratif-ui` PR #93, scope `whiteboard` — voir la spec
de conception détaillée dans ce repo
(`docs/superpowers/specs/2026-07-13-i18n-modules-scope-design.md`).

## Conséquences

- **Dérive de version structurellement impossible** : les clés et leurs valeurs voyagent avec la
  version publiée de la lib — un host ne peut pas afficher un texte de module désynchronisé de la
  version qu'il consomme.
- **Zéro configuration côté host à l'ajout d'un nouveau module** : le shell n'a jamais besoin de
  toucher à l'i18n d'un module qu'il charge en lazy-loading ; `providePilotageUi()` /
  `provideAgiliteUi()` enregistreront leur propre scope de la même façon, le jour où ces modules
  gagneront une UI.
- **La lib doit être republiée pour propager une correction ou un ajout de traduction** — un
  changement de libellé n'est plus un patch du catalogue du host, c'est une nouvelle version
  sémantique de la lib de module, suivant le cycle de release existant
  (`release.yml`, semantic-release).
- Le catalogue global de `pivot-ui` **retire tout le sous-arbre `whiteboard`** — clôt
  `pivot-ui` PR #188 au profit de cette convention pérenne.
- Un **test anti-fuite côté host** garantit qu'aucune clé de namespace de module (`whiteboard`,
  `pilotage`, `agilite`, …) n'existe dans le catalogue global du shell — empêche la
  réintroduction du couplage.
- Cohérent avec [ADR-003](ADR-003-systeme-modules.md) (chaque module est une unité autonome
  activable/désactivable) et [ADR-006](ADR-006-multi-repo-architecture.md) (isolation par repo,
  librairies publiées comme unité de contrat).

## Alternatives écartées

- **Assets copiés par le host** — le host publie/copie les fichiers de traduction du module dans
  ses propres assets statiques (build-time ou script de synchronisation). Écarté : exige une
  configuration de build spécifique par host et par module, et la dérive reste possible dès
  qu'une recopie est oubliée — c'est exactement le problème que #188 a révélé, déplacé plutôt
  que résolu.
- **i18n servi par le backend du module** — le module expose ses traductions via un endpoint API
  de son `pivot-xxx-core`, chargé à l'exécution par le shell. Écarté : couplage runtime d'un
  shell frontend à la disponibilité du backend d'un module pour du texte purement statique,
  mauvaise séparation des responsabilités (le backend d'un module gère son domaine métier, pas
  la présentation de sa propre UI), et latence/point de défaillance supplémentaires sans
  bénéfice sur le problème de dérive.
