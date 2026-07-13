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
| Favoris (BoardFavorite) | §1.3, §2.2 | US08.1.6 | ✅ Sprint 37 |
| Corbeille / suppression douce | — | US08.1.7 | ✅ Sprint 37 |
| Recherche de tableaux | — | US08.1.8 | ✅ Sprint 37 |
| Paramètres board (modal OWNER) + **reset board** (§3.8) | §2.2, §3.8 | US08.2.4 | ✅ Sprint 37 |
| Image de couverture (upload, limite 1,5 Mo) | §2.7 | US08.13.3 | 🆕 |
| Partage lien + rôles VIEWER/EDITOR/OWNER | §2.3 | US08.2.1-2.3 | ✅ existant |
| Invitation par email + gouvernance des rôles | §2.3, §5.5 | US08.2.5 | 🆕 (fix §6.1 scoping boardId) |
| Templates : créer-depuis-template | §2.5 | US08.4.1 | ✅ existant |
| Templates : CRUD + cycle brouillon (edit-content/save/discard) | §2.5, §5.6 | US08.13.2 | 🆕 |
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
| Curseurs nommés throttlés (50 ms) | §3.2 | US08.5.2 | 🆕 ↩︎ US30.2.2 |
| Verrou doux d'édition (card:editing) | §3.3 | US08.5.3 | 🆕 |
| Reset du board (OWNER) | §3.8 | US08.2.4 | ✅ Sprint 37 |
| Minuteur partagé (Redis, extend, serverNow) | §3.10, §5.4 | US08.12.1 | 🆕 ↩︎ US30.3.2 |
| Vote / dot-vote (quota Serializable, uncast) | §1.9, §3.11, §5.3 | US08.12.2 | 🆕 ↩︎ US30.3.1 (fix §6.7/§6.9) |
| Import Klaxoon + undo (anti-collision, remapping) | §2.4, §5.1 | US08.13.1 | 🆕 ↩︎ EN30.13 |

## §4 — Mécaniques UI

| Capacité (spec réf.) | § | US Socle cible | Statut |
|---|---|---|---|
| Zoom molette centrée / boutons / fit-content / fit-selection | §4.1 | US08.11.2 (+ US08.3.5 dézoom dynamique) | 🆕 + ✅ |
| Snap-to-grid (24 px, toggle) | §4.2 | US08.11.1 | 🆕 |
| Guides d'alignement (6 px) | §4.3 | US08.3.2a | ✅ existant |
| Resize homothétique multi-sélection | §4.4 | US08.3.6 | ✅ existant |
| Undo / redo (profondeur 30) | §4.5 | US08.3.3 | ✅ existant |
| Verrouillage — matrice complète | §4.6 | US08.9.2 | 🆕 |
| Calque / z-order (premier plan / arrière-plan) | §3.4, §4.6 | US08.9.3 | 🆕 |
| Raccourcis clavier | §4.7 | US08.3.2a | ✅ existant |
| Presse-papiers (image / tableur / texte) | §4.8 | US08.11.3 (+ US08.6.4/.6) | 🆕 |
| Lasso / sélection AABB | §4.9 | US08.3.2a, US08.3.6 | ✅ existant |

## §6 — Registre d'incohérences : politique appliquée

Par défaut, **reproduction fidèle** du comportement du POC (refus silencieux documentés comme
attendus, asymétries de broadcast §6.11). **Exceptions corrigées** (défauts sécurité / intégrité),
flaggées dans une AC `Security` de l'US concernée :

| Constat §6 | Correction | US porteuse |
|---|---|---|
| §6.1 — shares PATCH/DELETE non scopés par `boardId` (IDOR cross-board) | scoping `where {id, boardId}` | US08.2.5 |
| §6.5 — `connection:create` ne vérifie pas l'existence des cartes | validation des extrémités | US08.7.1 |
| §6.6 — `boardfield:create` type non validé (`as never` → crash) | validation contre l'enum `FieldType` | US08.10.1 |
| §6.7 — `vote:stop` sans garde session/status | garde existence + statut | US08.12.2 |
| §6.9 — `BoardVote.cardId` sans FK/cascade (votes orphelins) | FK `onDelete: Cascade` | US08.12.2 |
| §6.15 — `frame:move/resize` non scopés par `boardId` | scoping défensif | US08.8.2 |
| §4.6 (SHAPE) style libre non borné | valeurs bornées/validées serveur | US08.6.3 |
| OpenGraph (LINK) : SSRF / XSS des champs meta | durcissement fetch + assainissement | US08.6.5 |

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
