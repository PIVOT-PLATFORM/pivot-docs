# EN30.13 — Import de tableaux Klaxoon (.klx)

**Type d'enabler** : intégration / import de données

**Objectif technique** : Permettre l'import d'un export Klaxoon (.klx) dans un tableau PIVOT
existant — post-its, texte, dessins main levée, formes, images, liaisons et groupes convertis
en cartes natives du canvas.

**Justification** : Klaxoon est l'un des 4 concurrents benchmarkés par cet EPIC (cf. README
§Objectif) — faciliter la migration des équipes déjà équipées ailleurs lève un frein réel à
l'adoption. Méthode déjà implémentée et éprouvée dans PouetPouet (POC de référence Pivot,
`apps/web/src/lib/klx-import/converter.ts` + `converter.test.ts`, `import-klaxoon-modal.tsx`,
route `POST /:id/import/klaxoon`), à adapter à l'architecture PIVOT (Angular + API REST
`pivot-collaboratif-core`, plutôt que Next.js + Fastify + Prisma).

## Méthode (reprise de PouetPouet)

1. **Entrée** : l'utilisateur décompresse manuellement son export Klaxoon (.klx, un ZIP) et
   sélectionne le dossier `Activity/<id>/` via un input file `webkitdirectory` — pas de parsing
   ZIP côté client, Klaxoon fournit déjà une archive nativement décompressible par l'OS.
2. **Repérage des fichiers** : dans le dossier sélectionné, cherche `_brainstorm_data.json` (le
   graphe complet du board) et tous les fichiers sous `mediabundle/` (images embarquées) — lus
   en parallèle en data URL (`FileReader.readAsDataURL`).
3. **Conversion pure, côté client** (`convertKlaxoon(data, imageMap, debug)`), aucune I/O, testée
   unitairement (280 lignes de cas de test dans PouetPouet) :
   - `data.colors[]` → table de correspondance id→hex Klaxoon
   - `data.ideas[]` (post-its) → cartes `TEXT`, dimensionnées au contenu réel (pas la taille de
     post-it Klaxoon d'origine, majoritairement vide)
   - `data.state[]` → dispatché par `board_object_type` :
     - `text` → carte `LABEL` (taille de police dérivée du scale Klaxoon)
     - `pen` avec `path_commands` → détection de rectangle axis-aligned (6 commandes
       moveTo+4×lineTo+closePath, chaque segment strictement horizontal ou vertical) devient une
       carte `SHAPE` native éditable/redimensionnable ; sinon reste un tracé `DRAW` (chemin SVG
       généré depuis les commandes de dessin Klaxoon — types 2=moveTo, 16=lineTo,
       32=bezierCurveTo, 1=closePath)
     - `imageboard` → carte `IMAGE`, redimensionnée (cap 800×600, ratio préservé, pas
       d'agrandissement des petites icônes)
     - type inconnu → ignoré proprement, capturé dans `unknownTypes` si `debug=true` (détection
       de nouveaux types Klaxoon non mappés, sans faire échouer l'import)
   - `data.links[]` → connexions entre cartes (forme courbe/droite/orthogonale, flèches,
     pointillés)
   - `data.groups[]` → `groupKey` partagé, matérialisé uniquement si ≥ 2 membres importés (groupe
     à 1 membre auto-dissous)
   - offset global : tout le contenu est translaté pour démarrer près de (0,0), marge de 40px
   - tri final par `z_index` Klaxoon (le rendu carte-par-carte n'a pas de z-index individuel,
     l'ordre de création fait foi)
4. **Aperçu avant import** : étape de confirmation affichant les statistiques (post-its, textes,
   dessins, formes, images, liaisons, groupes, éléments ignorés) avant tout appel serveur —
   aucune écriture tant que l'utilisateur n'a pas validé.
5. **Persistance serveur** (route `POST /:id/import/klaxoon` côté PouetPouet) : payload validé
   par schéma strict (cartes/connexions), les `groupKey` Klaxoon sont remappés vers des UUID
   serveur frais (pas de collision avec des groupes existants sur le board, imports répétés
   isolés), toutes les cartes+connexions créées dans **une seule transaction** BDD (import
   atomique — soit tout, soit rien). Endpoint rate-limité (5/min) et à `bodyLimit` élevé (50 Mo,
   les images embarquées en base64 gonflent le payload). Permission : rejeté si l'appelant n'a
   qu'un rôle `VIEWER` sur le board cible.

## Critères de complétion

- [ ] Given un export Klaxoon `Activity/<id>/` décompressé sélectionné, when l'utilisateur lance
  l'import, then un aperçu (compte par type d'élément) s'affiche avant toute écriture
- [ ] Post-its Klaxoon → cartes TEXT, dimensionnées au contenu réel
- [ ] Rectangles dessinés au tracé (path Klaxoon axis-aligned) → cartes SHAPE natives éditables ;
  tracés libres/formes non rectangulaires → cartes DRAW (chemin SVG fidèle)
- [ ] Images Klaxoon (`mediabundle/`) → cartes IMAGE, taille plafonnée sans agrandir les petites
  icônes
- [ ] Liaisons Klaxoon (courbe/droite/orthogonale, flèches, pointillés) → connexions natives
  entre les cartes importées correspondantes
- [ ] Groupes Klaxoon (≥ 2 membres importés) → groupement natif ; groupe à 1 membre restant après
  filtrage non matérialisé
- [ ] Éléments Klaxoon d'un type non reconnu → ignorés proprement (jamais d'échec de l'import
  entier), comptés dans les "ignorés" de l'aperçu
- [ ] Import atomique côté serveur : toutes les cartes/connexions dans une seule transaction,
  échec partiel impossible
- [ ] Security: `groupKey`/UUID Klaxoon jamais réutilisés tels quels comme identifiants internes
  — remappés côté serveur, pas de collision possible avec des groupes existants ni fuite d'ID
  cross-board
- [ ] Security: rôle `VIEWER` sur le board cible → import refusé (403)
- [ ] Security: payload volumineux (images base64) accepté jusqu'à une limite explicite, requête
  au-delà rejetée — jamais de DoS par upload
- [ ] Error case: `_brainstorm_data.json` absent du dossier sélectionné → message d'erreur
  explicite, pas de crash silencieux
- [ ] Tests unitaires purs sur la fonction de conversion (pas de dépendance I/O), couvrant au
  minimum : post-it simple, texte à l'échelle, rectangle détecté vs tracé libre, image, lien avec
  flèches, groupe à 2+ membres vs 1 membre, type inconnu

## Écarts à trancher pour l'adaptation PIVOT

La méthode ci-dessus est celle de PouetPouet (Next.js/Fastify/Prisma) — à adapter à
l'architecture PIVOT, pas à reprendre telle quelle :

- **Répartition client/serveur** : PouetPouet fait toute la conversion côté client (Angular ici)
  puis POST le résultat déjà converti côté `pivot-collaboratif-core`. Garder ce découpage évite
  de dupliquer un parseur JSON Klaxoon complexe côté Java, et n'introduit aucun souci de
  sécurité identifié (la conversion ne fait que produire des cartes candidates, la validation
  stricte — permissions, schéma, limites — reste entièrement serveur).
- **Modèle de données** : le modèle `KlxCard`/`KlxConnection` ci-dessus doit être fait
  correspondre au modèle de cartes/connexions whiteboard PIVOT (EN08.x/US08.3.x) — vérifier avant
  implémentation que les types TEXT/LABEL/DRAW/IMAGE/SHAPE existent tous nativement côté canvas
  PIVOT (US08.3.2a), ou identifier les écarts à combler.
- **Table de correspondance couleurs Klaxoon** (`C_MAP`, ~30 entrées) : approximation "best
  effort, aucune source officielle" déjà documentée comme telle dans PouetPouet — à reprendre
  telle quelle plutôt que ré-inventée, la limitation est connue et acceptée dans le POC de
  référence.

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E30 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Source: PouetPouet (implémentation de référence, `apps/web/src/lib/klx-import/`) · sans
identifiant BL-###
Dépendances: F08.1 (CRUD tableaux), US08.3.2a (canvas Angular — types de cartes natifs)
