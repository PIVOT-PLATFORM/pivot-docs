# US08.4.2 — Clone de template en cartes typées + remap des connecteurs

**En tant que** utilisateur-final créant un tableau depuis un template
**Je veux** que le clone instancie de vraies cartes typées (`TEXT`/`LABEL`/`SHAPE`/`IMAGE`/`LINK`/`TABLE`) et leurs connecteurs, avec des identifiants réattribués et des connexions cohérentes
**Afin de** repartir d'un template éditable comme un tableau normal (cartes manipulables, connecteurs valides), et non d'un calque `DRAW` figé

## Contexte

US08.4.1 (`Stage: ✅`) instancie aujourd'hui un template en **rejouant verbatim les events `DRAW`**
du template (`WhiteboardTemplateService`) — le canvas cloné ne contient donc pas de cartes typées ni
de connecteurs, seulement des tracés `DRAW`. Depuis EN08.4 (modèle `Card` typé) et le Sprint 12
(6 types de carte + connecteurs), un tableau normal est composé de `Card` typées et de
`CardConnection`. Cette US aligne le **clone de template** sur ce modèle : c'est la partie non
couverte de l'AC de parité §2.2 ligne 313 (initialement rédigée dans US08.1.9, AC L18), sortie ici
car elle constitue une capacité à part entière et un **prérequis d'architecture** distinct du
chargement de tableau.

## Prérequis d'architecture (à trancher — Architecte Modules + mainteneur)

Le remap au clone suppose que le **template porte des cartes typées + connecteurs** (et non des events
`DRAW`). Deux voies, à arbitrer avant implémentation (ne pas décider unilatéralement) :

- **A — Migration du modèle de template** : le template stocke des `Card`/`CardConnection`
  (nouvel enabler dédié, `EN08.x`), et US08.4.1 (instanciation DRAW-replay) est révisée pour rejouer
  des cartes typées. Voie de parité complète.
- **B — Génération de template depuis un board typé** : conserver le stockage actuel mais dériver le
  template d'un board existant (cartes + connecteurs) au moment de la sauvegarde. Plus incrémental.

Cette US est **bloquée** tant que ce prérequis n'est pas tranché ; ses AC ci-dessous décrivent le
comportement cible du clone une fois le template porteur de cartes typées.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un template porteur de cartes typées et de connecteurs, when `POST /api/collaboratif/whiteboard/boards/` est appelé avec `templateId`, then chaque carte du template est recréée sur le nouveau board avec un **nouvel identifiant**, et une **table de correspondance** `ancien cardId → nouveau cardId` est tenue pour toute la durée du clone | ⬜ |
| Given le clone des cartes est effectué, when les connecteurs du template sont clonés, then chaque connecteur est **réassigné** sur les nouveaux `cardId` (via la table de correspondance) et **filtré** : seuls sont conservés les connecteurs dont **les deux extrémités** pointent vers une carte effectivement survivante du clone | ⬜ |
| Given un connecteur du template dont une extrémité référence une carte absente du clone (non survivante), when le clone est exécuté, then ce connecteur est **écarté silencieusement** (aucun connecteur orphelin ni extrémité pendante n'est créé) | ⬜ |
| Given le clone réussit, when le board est chargé (`GET /boards/{id}` + état canvas WS), then les cartes clonées sont des `Card` typées éditables (déplaçables, redimensionnables, modifiables) et les connecteurs clonés relient les nouvelles cartes — parité fonctionnelle avec un board créé à la main | ⬜ |
| Error : given le clone échoue en cours (carte ou connecteur invalide, contrainte BDD), when la transaction est traitée, then l'opération est **atomique** — aucun board partiel n'est créé, rien n'est diffusé | ⬜ |
| Error : given un `templateId` introuvable ou hors du périmètre de l'appelant, when le clone est tenté, then 404 (convention anti-énumération, cohérent US08.1.9), aucun board créé | ⬜ |
| Security : `tenantId`/`userId` résolus exclusivement depuis le SecurityContext ; les cartes et connecteurs clonés sont écrits sous le tenant de l'appelant, jamais sous celui du template s'il diffère ; un template non accessible au tenant courant renvoie 404 | ⬜ |
| Security : le remap n'accepte que des `cardId` issus de la table de correspondance du clone courant — aucune connexion ne peut pointer vers une carte d'un autre board/tenant (pas de fuite cross-board via un `templateId` forgé) | ⬜ |
| Tests TI (backend) : clone nominal (N cartes typées → N nouveaux ids + table de correspondance) ; connecteurs remappés sur les nouveaux ids ; connecteur à extrémité non survivante écarté ; atomicité sur échec ; 404 template introuvable/hors tenant ; isolation cross-tenant | ⬜ |
| Tests Vitest (frontend) : après clone, le canvas affiche des cartes typées éditables et des connecteurs reliant les nouvelles cartes (pas de calque `DRAW` figé) | ⬜ |

## Hors périmètre

- Le comportement de clone en **modèle `DRAW`-replay** actuel (US08.4.1, `Stage: ✅`) — conservé tant
  que le prérequis d'architecture n'est pas tranché ; cette US le **remplace** une fois la voie A ou B retenue
- La création/édition de templates (galerie, sauvegarde d'un board comme template) — relève de F08.4 /
  F08.13 (cycle de vie du brouillon de template, US08.13.2), hors scope du seul clone
- Le chargement de tableau et la présence agrégée — couverts et livrés par US08.1.9

## Notes d'implémentation

- Backend `pivot-collaboratif-core`, module whiteboard : `POST /boards/` avec `templateId` — remap
  séquentiel des `cardId` via table de correspondance en mémoire, puis remap/filtre des `CardConnection`
  vers les cartes survivantes (parité §2.2, ligne 313 du spec de référence). Opération transactionnelle.
- Dépend de la voie retenue au **Prérequis d'architecture** ci-dessus (modèle de template porteur de
  cartes typées).
- Réutilise les contrats de carte typée (EN08.4, US08.6.x) et de connecteur (US08.7.1) déjà livrés.

---
Item Type: US · Parent: F08.4 · Module: whiteboard · Phase: Socle · Size: L · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §2.2, ligne 313) — carve-out de US08.1.9 AC L18 (clone de template), sorti en US dédiée car capacité distincte à prérequis d'architecture propre (2026-07-17)
Dépendances: US08.4.1 (instanciation de template, base à faire évoluer), EN08.4 (modèle `Card` typé), US08.6.x (cartes typées), US08.7.1 (connecteurs), US08.1.9 (contrat de création de board) ; **bloquée par** le prérequis d'architecture (modèle de template porteur de cartes typées)
