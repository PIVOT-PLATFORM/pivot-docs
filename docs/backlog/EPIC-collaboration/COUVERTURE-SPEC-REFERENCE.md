# Couverture du spec de référence PouetPouet → Socle E08

> **Objet** : matrice de traçabilité entre le spec de réimplémentation fine du tableau blanc de
> référence — `Détails tableau blanc backlog.md` (POC *PouetPouet*) — et les US du **Socle E08**
> (`EPIC-collaboration`, `Phase: Socle`, module `whiteboard`).
>
> **Contexte** : décision mainteneur du **2026-07-13** d'**absorber l'intégralité** du spec de
> référence dans le Socle E08, **levant le verrou `phase-3`** posé par la décision #2 + la
> [zone d'ombre #11](../sprints/zones-ombre.md). Cette matrice sert de preuve de couverture (« le
> Socle prend-il bien tout ? ») et de source de vérité spec §→US pour l'implémentation
> (Sprints 38-43).

## Légende

- **✅ Socle (existant)** — déjà couvert par une US `Done` ou déjà planifiée du noyau F08.x.
- **🆕 Socle (net-new 2026-07-13)** — US créée par cette absorption (Sprints 38-43).
- **↩︎ absorbe F30.x** — l'US Socle reprend et détaille une Feature benchmark auparavant `phase-3`.
- **⏸️ reste phase-3** — hors spec de référence, non absorbé (décision explicite).

## §1-§3 — Modèle de données, REST & temps réel

| Capacité (spec réf.) | § | US Socle cible | Statut |
|---|---|---|---|
| Board CRUD (name/description/maxParticipants/enabledActivities) | §1.1, §2.2 | US08.1.1-1.5 | ✅ existant |
| Chargement board `GET /:id` (cards+fieldValues+role, omet frames/connexions/champs) · `GET /presence` (comptes agrégés, dédup userId) · `shareCount` sur `GET /boards/` · schéma `POST /boards/` complet (maxParticipants/enabledActivities/coverImage) + remap connexions au clone | §2.2 | US08.1.9 | 🆕 |
| Favoris (BoardFavorite) | §1.3, §2.2 | US08.1.6 | ✅ Sprint 10 |
| Corbeille / suppression douce | — | US08.1.7 | ✅ Sprint 10 |
| Recherche de tableaux | — | US08.1.8 | ✅ Sprint 10 |
| Paramètres board (modal OWNER) + **reset board** (§3.8) | §2.2, §3.8 | US08.2.4 | ✅ Sprint 10 |
| Image de couverture (upload, limite 1,5 Mo) | §2.7 | US08.13.3 | 🆕 |
| Partage lien + rôles VIEWER/EDITOR/OWNER | §2.3 | US08.2.1-2.3 | ✅ existant |
| Invitation par email + gouvernance des rôles | §2.3, §5.5 | US08.2.5 | 🆕 (fix §6.1 scoping boardId) |
| Lien de partage : `GET /:id/shares` + `POST/PATCH/DELETE /:id/shares/link` (regen token, shareLinkRole, disable-sans-révoquer) | §2.3 | US08.2.6 | 🆕 (réconcilié avec le modèle token d'US08.2.1) |
| Templates : créer-depuis-template | §2.5 | US08.4.1 | ✅ existant |
| Templates : CRUD + cycle brouillon (edit-content/save/discard) | §2.5, §5.6 | US08.13.2 | 🆕 (AC réalignés 2026-07-21 sur le modèle Java : éléments normalisés, pas de blob JSON) |
| Templates : partage privé / organisation / personnes ciblées | *(hors spec réf.)* | US08.13.5 | 🆕 **net-new 2026-07-21** — décision mainteneur, au-delà du POC (qui ne partage pas les templates) |
| **Modèle `Card` typé** (TEXT/IMAGE/LINK/SHAPE/DRAW/LABEL/TABLE + `meta`) | §1.5, §3.1, §3.4 | **EN08.4** | 🆕 (remplace l'objet `DRAW` d'US08.3.2a) |
| Pense-bête texte (TEXT) | §1.5, §3.4 | US08.6.1 | 🆕 ↩︎ US30.1.2 |
| Étiquette (LABEL) | §1.10, §3.4 | US08.6.2 | 🆕 |
| Forme (SHAPE) | §3.4 | US08.6.3 | 🆕 ↩︎ US30.1.3 |
| Image (IMAGE) + collage/upload | §3.4, §4.8 | US08.6.4 | 🆕 ↩︎ US30.1.5 |
| Carte lien (LINK) + aperçu OpenGraph | §3.4, §7 | US08.6.5 | 🆕 ↩︎ US30.1.11 |
| Tableau (TABLE) + collage tableur | §4.8 | US08.6.6 | 🆕 |
| Dessin main levée (DRAW) | §3.4 | US08.3.2a | ✅ existant |
| Cartes : move/resize/update/recolor/lock/layer | §3.4, §4.6 | EN08.4 + US08.6.1 + US08.9.2/.3 | 🆕 |
| Groupes (group/ungroup/couleur + dissolution auto) | §3.5, §5.7 | US08.9.1 | 🆕 ↩︎ US30.1.6 |
| Connecteurs (create/delete, anti-doublon) | §3.6 | US08.7.1 | 🆕 ↩︎ US30.1.3 (fix §6.5) |
| Connecteurs (style : shape/arrow/dashed/label) | §3.6 | US08.7.2 | 🆕 |
| Cadres / frames (max 2, title/move/resize/layer) | §3.7 | US08.8.1, US08.8.2 | 🆕 ↩︎ US30.1.7 (fix §6.15) |
| Champs personnalisés (BoardField CRUD) | §1.7, §3.9 | US08.10.1 | 🆕 (fix §6.6) |
| Valeurs de champ sur carte (CardFieldValue) | §3.9 | US08.10.2 | 🆕 |
| Présence participants | §3.1 | US08.5.1 | ✅ existant |
| Présence — stockage Redis (hash `board:presence:{id}`, **TTL 3600 s**) | §3.1 | US08.5.2 | 🆕 (raffine heartbeat 30 s d'US08.5.1) |
| Curseurs nommés throttlés (50 ms) | §3.2 | US08.5.2 | 🆕 ↩︎ US30.2.2 |
| Verrou doux d'édition (card:editing) | §3.3 | US08.5.3 | 🆕 |
| Reset du board (OWNER, REST) | §3.8 | US08.2.4 | ✅ Sprint 10 |
| Reset du board — contrat WS `board:resetted` + **préservation champs/votes (§6.10)** | §3.8, §6.10 | US08.13.4 | 🆕 (complète US08.2.4) |
| Minuteur partagé (Redis, extend, serverNow) | §3.10, §5.4 | US08.12.1 | 🆕 ↩︎ US30.3.2 |
| Vote / dot-vote (quota Serializable, uncast) | §1.9, §3.11, §5.3 | US08.12.2 | 🆕 ↩︎ US30.3.1 (fix §6.7/§6.9) |
| Vote — lectures `GET /vote/current` + `GET /vote/last` | §2.6 | US08.12.2 | 🆕 |
| Import Klaxoon + undo (anti-collision, remapping) + **bus/webhook `board.imported`** + rate-limit 5/min permanent | §2.4, §5.1 | US08.13.1 | 🆕 ↩︎ EN30.13 (fix §6.16) |

## §4 — Mécaniques UI

| Capacité (spec réf.) | § | US Socle cible | Statut |
|---|---|---|---|
| Zoom molette centrée / boutons / fit-content / fit-selection / **auto-fit 2000 ms** | §4.1 | US08.11.2 (+ US08.3.5 dézoom dynamique) | 🆕 + ✅ |
| Snap-to-grid (24 px, toggle) | §4.2 | US08.11.1 | 🆕 |
| Guides d'alignement (6 px, 3 repères/axe, #ec4899, off multi-sélection) | §4.3 | US08.11.4 | 🆕 (supersède le 8 px d'US08.3.2a) |
| Resize homothétique multi-sélection (min ~24 px, factor ≤ 20, throttle 60 ms) | §4.4 | US08.11.7 (valeurs fines) + US08.3.6 | 🆕 (supersède plancher 150×110) |
| Undo / redo (HISTORY_LIMIT 30, listes couvertes, last-writer-wins) | §4.5 | US08.11.5 | 🆕 (supersède la pile 50 d'US08.3.3) |
| Verrouillage — matrice complète | §4.6 | US08.9.2 | 🆕 |
| Calque / z-order (premier plan / arrière-plan) | §3.4, §4.6 | US08.9.3 | 🆕 |
| Raccourcis clavier (Ctrl+D +24, nudge 1/20 px, Escape, space-pan…) | §4.7 | US08.11.6 | 🆕 (supersède offset +16 d'US08.3.2a) |
| Presse-papiers (image / tableur / texte) | §4.8 | US08.11.3 (+ US08.6.4/.6) | 🆕 |
| Lasso / sélection AABB (seuils 3 px / 5 px) | §4.9 | US08.11.7 + US08.3.6 | 🆕 |

## §6 — Registre d'incohérences : politique appliquée

Politique : **reproduction fidèle** du POC par défaut (refus silencieux, asymétries) ;
**correction et flag** (AC `Security`) pour les défauts sécurité/intégrité. Registre des 17 constats :

| # | Constat §6 (abrégé) | Décision | US porteuse |
|---|---|---|---|
| 1 | shares PATCH/DELETE non scopés par `boardId` (IDOR cross-board) | **Corrigé + flaggé** — `where {id, boardId}` | US08.2.5 |
| 2 | undo/redo n'inclut pas champs/vote/timer/paramètres board | Reproduit (documenté) | US08.11.5 + US08.10.2 |
| 3 | undo/redo sans détection de conflit (last-writer-wins) | Reproduit (documenté) | US08.11.5 |
| 4 | `shape`/`arrow` (connexions) et style SHAPE = String libres | **Corrigé + flaggé** — valeurs bornées serveur | US08.6.3 · US08.7.2 |
| 5 | `connection:create` ne vérifie pas l'existence des cartes | **Corrigé + flaggé** — validation des extrémités | US08.7.1 |
| 6 | `boardfield:create` type non validé (`as never` → crash) | **Corrigé + flaggé** — validation enum `FieldType` | US08.10.1 |
| 7 | `vote:stop` sans garde session/status (P2025) | **Corrigé + flaggé** — garde existence + statut | US08.12.2 |
| 8 | pas d'`@@unique([session,card,user])` sur BoardVote | Reproduit (multi-vote/carte, uncast retire 1) | US08.12.2 |
| 9 | `BoardVote.cardId` sans FK/cascade (votes orphelins) | **Corrigé + flaggé** — FK `onDelete: Cascade` | US08.12.2 |
| 10 | `board:reset` ne purge ni champs ni sessions de vote | **Décision explicite** — préservation intentionnelle | US08.13.4 |
| 11 | asymétrie de portée des broadcasts (update→room vs move→sauf émetteur) | Reproduit (documenté) | EN08.4 · US08.6.1 · US08.8.2 |
| 12 | limite cover 1,5 Mo côté client seulement, 413 générique serveur | Reproduit (+ durcissement XSS data:URL) | US08.13.3 |
| 13 | clone template→brouillon omet `frame.active` vs template→board | **Corrigé** — préservation unifiée dans les 2 chemins | US08.13.2 |
| 14 | pas de `notify()` à l'import (type `BOARD_IMPORTED` mort) | Reproduit (bus/webhook émis, notify non) | US08.13.1 |
| 15 | `frame:move/resize` non scopés par `boardId` | **Corrigé + flaggé** — scoping défensif | US08.8.2 |
| 16 | rate-limit + validation taille import prod-only (`NODE_ENV`) | **Corrigé** — gardes permanentes tous environnements | US08.13.1 |
| 17 | aucune limite serveur nom/contenu/nombre de cartes/membres | Reproduit (import garde ses `.max()`) | US08.6.1/.2 · US08.13.1 |
| — | OpenGraph (LINK) : SSRF / XSS des champs meta | **Corrigé + flaggé** — durcissement fetch + assainissement | US08.6.5 |

## Hors absorption — restent `phase-3`

Capacités **absentes du spec de référence PouetPouet** (donc non concernées par « tout le contenu du
spec dans le Socle ») et maintenues en `phase-3` sous E30 :

- **Commentaires ancrés** (US30.2.3) et **réactions temps réel** (US30.11.1) — non présents dans le POC.
- Tout le périmètre benchmark au-delà du POC : historique de versions (US30.2.5), audio/vidéo
  (US30.2.6), IA (F30.6), diagrammes/mind-mapping (F30.5), mode présentation & séquençage d'atelier
  (US30.3.3-.9), sécurité/gouvernance avancée (F30.9), plateformes (F30.10), extensibilité (F30.12),
  chantiers SI (F30.15), etc.

## Séquencement

Sprints **38** (fondation EN08.4, bloquant) → **39** (objets & connecteurs) → **40** (cadres /
organisation / champs) → **41** (canvas UX & présence) → **42** (facilitation) → **43** (cycle de
vie & partage). Voir [`sprints/README.md`](../sprints/README.md) et le suivi d'avancement dans
[`README.md`](./README.md) de cet EPIC. Gate 1 PO Agent à passer au démarrage de chaque item.
