---
sidebar_label: "Checklist recette whiteboard"
---

# Checklist de recette — whiteboard (E30 / F08.x)

**Objet :** support de la **recette mainteneur** des US whiteboard mergées et en attente de
validation. Le champ `Stage:` d'une US ne passe `⬜ → ✅` qu'après cette recette — jamais par un
agent, jamais sur la seule foi d'une CI verte.

**Dernière révision :** 2026-07-21 · **Périmètre :** Sprints 11 → 16
*(Sprints 10 et 15 déjà recettés et validés le 2026-07-16, hors périmètre de ce document.)*

Fichier **mis à jour en place** — on ne crée pas de copie datée à chaque campagne.

## Pré-requis

```bash
cd pivot-core && ./dev-refresh.sh      # rebuild depuis les sources locales — indispensable
```

> ⚠️ **Toujours rebuild avant de recetter.** Une image périmée a déjà fait conclure à tort à un bug
> côté code (incident du 2026-07-15 : sticky notes « cassées » alors que seules les images Docker
> étaient en retard sur `main`).

**Comptes de test** (mot de passe commun `Pivot@Test123!`) :

| Compte | Rôle | Usage |
|--------|------|-------|
| `admin@pivot.test` | `ROLE_ADMIN` | session A (propriétaire du board) |
| `user@pivot.test` | `ROLE_USER` | session B (invité, tests temps réel) |

Application sur `http://localhost` — **port 80**, pas 4200.

---

## Correctifs récents — à vérifier en premier

- [ ] **Liste des membres** — « Partager le tableau » → la ligne membre affiche identifiant / rôle / date *(s'affichait vide, `NG02100`)*
- [ ] **Lien d'invitation** — « Générer un lien » → URL en `http://localhost/...` **sans `:4200`**, et le lien s'ouvre
- [ ] **Aimantation grille** (US08.11.1) — bouton « Grille » → fond quadrillé, la carte déplacée colle à la grille, état conservé après rechargement

## Sprint 12 — Objets typés

- [ ] **TEXT** (US08.6.1) — double-clic sur le canevas → post-it, saisie, mise en forme (gras / italique / taille / couleur)
- [ ] **LABEL** (US08.6.2) — créer une étiquette, la redimensionner
- [ ] **SHAPE** (US08.6.3) — rectangle, ellipse, **trait** ; couleur de contour et de remplissage
- [ ] **IMAGE** (US08.6.4) — insérer via la barre d'outils **et** par glisser-déposer
- [ ] **LINK** (US08.6.5) — coller une URL → aperçu OpenGraph (titre + vignette)
- [ ] **TABLE** (US08.6.6) — créer un tableau, **coller depuis Excel / Google Sheets**
- [ ] **Connecteurs** (US08.7.1 / US08.7.2) — relier deux cartes, supprimer, styler (type de trait, flèches par extrémité)
- [ ] **Chargement** (US08.1.9) — rouvrir le board : tout est restitué, compteur de participants correct

## Sprint 13 — Organisation

- [ ] **Cadres** (US08.8.1 / US08.8.2) — créer, déplacer, redimensionner, renommer, supprimer
- [ ] **Groupes** (US08.9.1) — grouper deux cartes, couleur de groupe, dégrouper
- [ ] **Verrou** (US08.9.2) — verrouiller une carte → ni déplaçable ni éditable ; déverrouiller
- [ ] **Z-order** (US08.9.3) — premier plan / arrière-plan, sur cartes **et** cadres
- [ ] **Champs personnalisés** (US08.10.1 / US08.10.2) — définir un champ de board, puis le renseigner sur une carte

## Sprint 14 — Canvas UX

- [ ] **Guides d'alignement** (US08.11.4) — bouton « Guides d'alignement » (actif par défaut) → déplacer une carte près d'une autre fait apparaître une **ligne rose** quand les bords ou les centres s'alignent, et la carte s'y accroche. Vérifier :
  - au plus **une ligne verticale + une horizontale** à la fois (jamais un faisceau)
  - la ligne **disparaît** dès le relâchement
  - avec **plusieurs cartes sélectionnées**, aucun guide n'apparaît *(voulu — hors périmètre)*
  - **grille activée en même temps → aucun guide** *(voulu — la grille est prioritaire, §5.9)*
  - état conservé après rechargement de la page
- [ ] **Zoom avancé** (US08.11.2) — cluster de zoom en **bas à droite**. Vérifier :
  - **+** et **−** changent le zoom d'un quart à chaque clic (100 → 125 → 156 %)
  - cliquer le **pourcentage** revient à 100 %
  - **ajuster au contenu** cadre tout le tableau, **sans jamais dépasser 100 %**
  - **ajuster à la sélection** (une carte sélectionnée) peut monter **jusqu'à 150 %**
  - sans sélection, le bouton « ajuster à la sélection » est grisé et **ne fait rien**
  - à l'ouverture d'un tableau ayant du contenu, la vue **se cadre toute seule** et le contenu apparaît en fondu — sans clignoter à 100 % avant
  - ⚠️ **La molette seule zoome maintenant**, elle ne fait plus défiler la vue *(changement voulu, validé le 2026-07-21)*. Pour se déplacer : clic-milieu, outil main, ou Espace+glisser
- [ ] **Dézoom dynamique** (US08.3.5) — `Ctrl` + molette vers le bas jusqu'à la butée. Vérifier :
  - sur un tableau **de taille normale**, la butée reste à **10 %** (comportement inchangé)
  - sur un tableau **très étalé** (éloigner deux post-it de plusieurs écrans), la butée descend **en dessous de 10 %**, jusqu'à voir tout le contenu d'un seul coup d'œil
- [ ] **Collage** (US08.11.3) — coller une image, un tableau tableur, du texte
- [ ] **Undo / redo** (US08.11.5) — `Ctrl+Z` / `Ctrl+Y` sur création, déplacement, suppression
- [ ] **Raccourcis & nudge** (US08.11.6) — flèches pour décaler une carte de 24 px, touches d'outils
- [ ] **Redimensionnement fin & lasso** (US08.11.7) — `Shift` (ratio conservé), `Alt` (depuis le centre), sélection au lasso

## Sprint 16 — Cycle de vie

- [ ] **Import Klaxoon** (US08.13.1) — importer un `.klx`, puis **annuler l'import**
- [ ] **Image de couverture** (US08.13.3) — définir une couverture, la voir dans la liste des tableaux
- [ ] **Réinitialisation du canevas** (US08.13.4) — reset → champs personnalisés et votes **préservés**
- [ ] **Lien de partage** (US08.2.6) — générer, ouvrir en navigation privée, rejoindre le board
- [ ] **Invitation par email** (US08.2.5) — inviter, changer un rôle, révoquer un accès

## Temps réel — deux navigateurs

> Deux sessions simultanées : `admin@pivot.test` (A) et `user@pivot.test` (B), B invité sur le board de A.

- [ ] **Curseurs nommés** (US08.5.2) — le curseur de l'autre est visible et porte son nom
- [ ] **Verrou doux d'édition** (US08.5.3) — quand A édite une carte, B le voit
- [ ] **Synchronisation du déplacement** — A déplace une carte → B la voit bouger
- [ ] **Édition puis déplacement** — A édite un post-it **puis le déplace sans relâcher** → B reçoit le texte **et** la position *(correctif du 2026-07-20)*
- [ ] **Undo d'un connecteur** — A supprime une carte reliée → **un seul `Ctrl+Z`** → la carte **et** le lien reviennent *(correctif du 2026-07-20)*
- [ ] **Minuteur et vote** (US08.12.x) — déclenchés par A, visibles chez B

---

## Anomalies connues — ne pas les compter comme régressions

| Anomalie | Statut |
|----------|--------|
| `404` sur `GET /whiteboard/boards/{id}/preview` (aperçu SVG de la liste) | Endpoint backend inexistant — **non corrigé**, à tracer |
| Clés i18n brutes dans l'en-tête (`nav.notifications`, `nav.theme_to_dark`) | Drift i18n connu du shell |
| ~~Boutons de zoom +/− et « ajuster au contenu » absents~~ | **Résolu le 2026-07-21** — US08.11.2 livrée (ui #253) |
| `Ctrl+Z` pendant une saisie annule le **texte**, pas l'action board | **Décision mainteneur du 2026-07-20** — US08.11.5 à amender |

## Après la recette

1. Pour chaque US validée : passer `Stage: ⬜ → ✅` dans son frontmatter *(mainteneur uniquement)*
2. Mettre à jour le `sprints/sprint-{N}.md` correspondant
3. Ouvrir une issue par anomalie constatée, en citant l'US concernée
