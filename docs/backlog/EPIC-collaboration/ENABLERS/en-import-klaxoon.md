# EN30.13 — Import de tableaux Klaxoon (.klx)

**Type d'enabler** : intégration / import de données

**Objectif technique** : Permettre l'import d'un export Klaxoon (.klx) dans un tableau PIVOT
existant — post-its, texte, dessins main levée, formes, images, liaisons et groupes convertis
en cartes natives du canvas.

**Justification** : Klaxoon est l'un des 4 concurrents benchmarkés par cet EPIC (cf. README
§Objectif) — faciliter la migration des équipes déjà équipées ailleurs lève un frein réel à
l'adoption. Méthode déjà implémentée et éprouvée dans PouetPouet (POC de référence Pivot,
`apps/web/src/lib/klx-import/converter.ts` + `archive.ts` + `converter.test.ts`,
`import-klaxoon-modal.tsx`, route `POST /:id/import/klaxoon`), à adapter à l'architecture PIVOT
(Angular + API REST `pivot-collaboratif-core`, plutôt que Next.js + Fastify + Prisma).

> **Mise à jour 2026-07-10 (audit de parité, v0.32.0).** PouetPouet a revu son import Klaxoon
> après la rédaction initiale de cet enabler : dépôt direct du fichier `.klx` (décompression et
> repérage des activités automatiques côté client, fini la décompression manuelle par
> l'utilisateur — cf. étape 1 révisée ci-dessous), fidélité de conversion nettement améliorée
> (tailles/positions réelles, zones Klaxoon → cadres natifs, post-its image, dessins au brush),
> catégories/dimensions Klaxoon → champs personnalisés sur les cartes, annulation de l'import en
> un clic, placement anti-collision sous le contenu existant du board cible. La méthode et les
> critères ci-dessous intègrent ces évolutions.

## Méthode (reprise de PouetPouet)

1. **Entrée** : l'utilisateur dépose directement son export Klaxoon (`.klx`, un ZIP) — plus de
   décompression manuelle ni de sélection de dossier. La décompression et le repérage des
   activités se font côté client (`archive.ts` : scan des chemins d'entrée de l'archive, aucune
   I/O, testable unitairement). Un `.klx` peut regrouper **plusieurs boards Klaxoon** ("Activity")
   dans une seule archive — chacun est détecté indépendamment (son propre
   `_brainstorm_data.json` + dossier `mediabundle/` associé), sans dépendre des autres.
2. **Repérage des fichiers** : pour chaque activité détectée, cherche `_brainstorm_data.json` (le
   graphe complet du board) et tous les fichiers sous son `mediabundle/` (images embarquées) — lus
   en parallèle en data URL (`FileReader.readAsDataURL`).
3. **Conversion pure, côté client** (`convertKlaxoon(data, imageMap, debug)`), aucune I/O, testée
   unitairement (280 lignes de cas de test dans PouetPouet) :
   - `data.colors[]` → table de correspondance id→hex Klaxoon
   - `data.ideas[]` (post-its) → cartes `TEXT` (taille et position réelles reprises de la
     géométrie Klaxoon, pas réajustées au contenu) ; un post-it de type image (corps = image
     `mediabundle/`) devient une carte `IMAGE` plutôt que `TEXT`
   - `data.state[]` → dispatché par `board_object_type` :
     - `text` → carte `LABEL` (taille de police dérivée du scale Klaxoon)
     - `pen`/`brush` avec commandes de tracé → détection de rectangle axis-aligned (6 commandes
       moveTo+4×lineTo+closePath, chaque segment strictement horizontal ou vertical) devient une
       carte `SHAPE` native éditable/redimensionnable ; sinon reste un tracé `DRAW` (chemin SVG
       fidèle, y compris rotation, généré depuis les commandes de dessin Klaxoon — types 2=moveTo,
       16=lineTo, 32=bezierCurveTo, 1=closePath)
     - `imageboard` → carte `IMAGE`, redimensionnée (cap 800×600, ratio préservé, pas
       d'agrandissement des petites icônes)
     - `zone` → cadre (`Frame`) natif titré, plutôt qu'ignoré
     - type inconnu → ignoré proprement, capturé dans `unknownTypes` si `debug=true` (détection
       de nouveaux types Klaxoon non mappés, sans faire échouer l'import)
   - `data.links[]` → connexions entre cartes (forme courbe/droite/orthogonale, flèches avec
     pointe rendue fidèlement, pointillés détectés)
   - `data.groups[]` → `groupKey` partagé, matérialisé uniquement si ≥ 2 membres importés (groupe
     à 1 membre auto-dissous)
   - catégories/dimensions Klaxoon (quand présentes) → champs personnalisés sur les cartes
     importées, plutôt que perdues à la conversion
   - offset global : tout le contenu est translaté pour démarrer près de (0,0), marge de 40px
   - tri final par `z_index` Klaxoon (le rendu carte-par-carte n'a pas de z-index individuel,
     l'ordre de création fait foi)
4. **Aperçu avant import** : étape de confirmation affichant les statistiques (post-its, textes,
   dessins, formes, images, zones, liaisons, groupes, éléments ignorés) avant tout appel serveur —
   aucune écriture tant que l'utilisateur n'a pas validé. L'utilisateur peut **annuler l'import en
   un clic** à ce stade, sans effet de bord côté serveur (aucun appel n'a encore été fait).
5. **Persistance serveur** (route `POST /:id/import/klaxoon` côté PouetPouet) : payload validé
   par schéma strict (cartes/connexions/cadres), les `groupKey` Klaxoon sont remappés vers des
   UUID serveur frais (pas de collision avec des groupes existants sur le board, imports répétés
   isolés), **placement anti-collision** du contenu importé sous le contenu déjà présent sur le
   board cible (pas de recouvrement avec des cartes existantes), toutes les cartes+connexions
   créées dans **une seule transaction** BDD (import atomique — soit tout, soit rien). Endpoint
   rate-limité (5/min) et à `bodyLimit` élevé (50 Mo, les images embarquées en base64 gonflent le
   payload). Permission : rejeté si l'appelant n'a qu'un rôle `VIEWER` sur le board cible.

## Critères de complétion

- [ ] Given un fichier `.klx` déposé directement (sans décompression manuelle préalable), when
  l'utilisateur lance l'import, then l'archive est décompressée et ses activités repérées côté
  client, et un aperçu (compte par type d'élément) s'affiche avant toute écriture
- [ ] Given un `.klx` regroupant plusieurs boards Klaxoon ("Activity"), when il est déposé, then
  chaque activité est détectée indépendamment (sans dépendre de la présence des autres)
- [ ] Given l'étape d'aperçu, when l'utilisateur annule, then aucune donnée n'a été écrite côté
  serveur (aucun appel n'a encore été fait à ce stade)
- [ ] Post-its Klaxoon → cartes TEXT à taille et position réelles (pas réajustées au contenu) ;
  post-its de type image → cartes IMAGE
- [ ] Rectangles dessinés au tracé (path Klaxoon axis-aligned) → cartes SHAPE natives éditables ;
  tracés libres/formes non rectangulaires (y compris dessins au brush) → cartes DRAW (chemin SVG
  fidèle, rotation incluse)
- [ ] Images Klaxoon (`mediabundle/`) → cartes IMAGE, taille plafonnée sans agrandir les petites
  icônes
- [ ] Zones Klaxoon → cadres (Frame) natifs titrés
- [ ] Liaisons Klaxoon (courbe/droite/orthogonale, flèches avec pointe fidèle, pointillés) →
  connexions natives entre les cartes importées correspondantes
- [ ] Groupes Klaxoon (≥ 2 membres importés) → groupement natif ; groupe à 1 membre restant après
  filtrage non matérialisé
- [ ] Catégories/dimensions Klaxoon (quand présentes) → champs personnalisés sur les cartes
  importées
- [ ] Éléments Klaxoon d'un type non reconnu → ignorés proprement (jamais d'échec de l'import
  entier), comptés dans les "ignorés" de l'aperçu
- [ ] Placement anti-collision : le contenu importé ne recouvre pas le contenu déjà présent sur
  le board cible
- [ ] Import atomique côté serveur : toutes les cartes/connexions/cadres dans une seule
  transaction, échec partiel impossible
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
- **Modèle de données** : le modèle `KlxCard`/`KlxConnection`/`KlxFrame` ci-dessus doit être fait
  correspondre au modèle de cartes/connexions/cadres whiteboard PIVOT (EN08.x/US08.3.x) —
  vérifier avant implémentation que les types TEXT/LABEL/DRAW/IMAGE/SHAPE et les cadres (Frame,
  cf. sections/cadres du canvas) existent tous nativement côté canvas PIVOT (US08.3.2a), ou
  identifier les écarts à combler.
- **Table de correspondance couleurs Klaxoon** (`C_MAP`, ~30 entrées) : approximation "best
  effort, aucune source officielle" déjà documentée comme telle dans PouetPouet — à reprendre
  telle quelle plutôt que ré-inventée, la limitation est connue et acceptée dans le POC de
  référence.

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E30 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Source: PouetPouet (implémentation de référence, `apps/web/src/lib/klx-import/`) · sans
identifiant BL-###
Dépendances: F08.1 (CRUD tableaux), US08.3.2a (canvas Angular — types de cartes natifs)
