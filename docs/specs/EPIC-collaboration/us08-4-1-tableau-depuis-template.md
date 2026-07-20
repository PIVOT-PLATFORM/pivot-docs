# US08.4.1 — Créer un tableau depuis un template

## Contexte

- **US** : `docs/backlog/EPIC-collaboration/FEATURES/templates/us-tableau-depuis-template.md` (F08.4 — Templates, EPIC-collaboration E30)
- **PR backend** : `pivot-collaboratif-core` [#31](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/31) (`feat/us08-4-1-tableau-depuis-template`) — Gate 4 = 98/100
- **PR frontend** : `pivot-collaboratif-ui` [#29](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/29) (`feat/us08-4-1-tableau-depuis-template`) — Gate 4 = 96/100
- **Gate 2 COVERAGE** : backend 117/117 tests (unit + Testcontainers IT), 88 % lignes · frontend 220 tests Vitest, 87.3 % lignes
- **Statut** : les deux PR sont **sorties de draft, prêtes pour revue humaine** — non auto-mergées (seuil override de session : =100 uniquement)
- **Dépend de** : US08.1.1 (création de tableau), US08.1.3 (modal "Nouveau tableau")

---

## Résolution Gate 1 (rappel)

En Socle, seuls les templates globaux publics (`tenant_id IS NULL`) existent — 3 templates seedés
(Brainstorm, Retrospective, User Story Map). La colonne `tenant_id` reste nullable pour rester
extensible sans migration de rupture le jour où US30.4.2 (`phase-3`) débloque les templates par
tenant. Détail complet dans la fiche backlog, section "Résolution Gate 1".

## Spec fonctionnelle

### Backend (`pivot-collaboratif-core`)

- `GET /api/whiteboard/templates` — liste les 3 templates globaux (Brainstorm, Retrospective,
  User Story Map). "Vierge" n'est volontairement pas seedé : `POST /whiteboard/boards` sans
  `templateId` couvre déjà ce cas (US08.1.1).
- `POST /api/whiteboard/boards?templateId={id}` — étend le flux de création existant
  (`BoardService.create`, réutilisé plutôt que dupliqué) : initialise le canvas du nouveau board
  à partir des éléments du template.
- Résolution `templateId` : UUID malformé → `400 INVALID_TEMPLATE_ID` · UUID bien formé mais
  inconnu (ou, défensivement, non global) → `404`, sans fuite d'existence.
- Création du board + initialisation du canvas dans une seule transaction : un `templateId`
  invalide annule toute la création (pas de board orphelin).

### Frontend (`pivot-collaboratif-ui`)

- `TemplateGalleryComponent` intégré dans la modale "Nouveau tableau" existante (pas de modale
  dupliquée) : galerie `role="listbox"`/`option`, sélection unique, skeleton pendant le chargement
  (`aria-busy="true"`), état d'erreur avec bouton Réessayer (la modale reste utilisable, la
  création "Vierge" n'est pas impactée).
- Sélection par défaut : "Brainstorm" (ou le premier template, ou aucune sélection si la liste est
  vide/en erreur).
- Navigation clavier complète (flèches, Home/End, Entrée/Espace), contraste sélection ≈3.69:1,
  contraste texte ≥4.5:1, `alt` descriptif par vignette.
- Bouton "Créer" : spinner + `aria-disabled="true"` pendant la requête, focus maintenu dans la
  modale ; erreur → message inline (pas de fermeture) + bouton Réessayer.
- i18n complet `whiteboard.template.*` (fr/en).

---

## Contrat technique

### Backend — fichiers introduits

| Fichier | Rôle |
|---------|------|
| `whiteboard/template/WhiteboardTemplate.java`, `WhiteboardTemplateElement.java` | Entités JPA (tables pliées dans `V1__schema_init.sql`) |
| `whiteboard/template/WhiteboardTemplateRepository.java`, `WhiteboardTemplateElementRepository.java` | Spring Data JPA |
| `whiteboard/template/WhiteboardTemplateService.java` | Résolution template global, initialisation canvas (transactionnel avec `BoardService.create`) |
| `whiteboard/template/WhiteboardTemplateController.java` | `GET /whiteboard/templates` |
| `whiteboard/template/dto/TemplateResponse.java` | DTO — aucune entité JPA exposée |
| `whiteboard/canvas/CanvasElementType.java`, `CanvasElementValidator.java` | Whitelist JSON stricte shape/text/image, réutilisée à l'insertion des éléments de template |
| `exception/InvalidTemplateIdException.java`, `TemplateNotFoundException.java`, `InvalidCanvasElementException.java` | Erreurs dédiées → 400/404 |
| `resources/db/migration/V1__schema_init.sql` (modifié) | Tables `whiteboard_template`/`whiteboard_template_element` + seeds des 3 templates |

**Correctif sécurité appliqué avant merge** (Red Team → Blue Team, cf. Gate 4) :
`CanvasElementValidator.IMAGE_PATH` acceptait un chemin protocol-relative (`//host/x.png`),
résolu par un navigateur comme une URL externe arbitraire — corrigé (regex ancré) + test de
non-régression ajouté. Aucun chemin d'exploitation réel avant correctif (seul du contenu
Flyway de confiance atteignait le validateur), mais code étiqueté sécurité désormais sain pour
une réutilisation future sur le flux `DRAW` temps réel.

### Frontend — fichiers introduits/modifiés

| Fichier | Rôle |
|---------|------|
| `core/whiteboard/board.model.ts` (modifié) | `WhiteboardTemplate { id, code, previewUrl }` |
| `core/whiteboard/template.service.ts` (nouveau) | `TemplateService.getTemplates()` → `GET /whiteboard/templates` |
| `core/whiteboard/board.service.ts` (modifié) | `createBoard(title, templateId?)` — `templateId` en query param optionnel |
| `whiteboard/template-gallery/` (nouveau, 4 fichiers) | `TemplateGalleryComponent` — galerie sélectionnable, états loading/error |
| `whiteboard/board-list/board-list.component.*` (modifié) | Intégration de la galerie dans la modale "Nouveau tableau" existante |
| `public/assets/i18n/{fr,en}.json` (modifiés) | Clés `whiteboard.template.*` |

**Point de réconciliation signalé par l'agent frontend** : la forme du DTO (`{ id, code,
previewUrl }`, `code ∈ BRAINSTORM|RETROSPECTIVE|USER_STORY_MAP`) a été construite par hypothèse
contre la spec avant que le backend ne soit mergé — à vérifier lors de la revue humaine des deux
PR contre l'implémentation réelle de `TemplateResponse` (`WhiteboardTemplateController`).

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| US08.1.1 | `BoardService.create` réutilisé, pas dupliqué |
| US08.1.3 | Galerie intégrée dans la modale "Nouveau tableau" déjà livrée par cette US |
| US08.3.1 | Éléments de template rejoués comme événements `DRAW` (`CanvasEvent`) — même modèle de persistance |

## Hors périmètre (explicitement exclu)

- Bibliothèque étendue de modèles, modèles personnalisés d'organisation, bibliothèque interne
  gouvernée : US30.4.1/.2/.3 (`phase-3`, verrouillé)
- Création/édition de template par un utilisateur final
- Test IT bout-en-bout `GET /whiteboard/templates` avec module désactivé (gap préexistant sur
  `BoardControllerIT`, non introduit par cette US — noté au Gate 4)

---

## Addendum 2026-07-20 — US08.4.1 (correction : option « Aucun template » explicite + défaut vierge)

> Correction du comportement livré, pas une nouvelle US (décision mainteneur). Le corps figé
> ci-dessus reste inchangé ; cet addendum acte l'écart de comportement.

- **PR frontend** : `pivot-ui` [#218](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/218)
  (`feat/us08-4-1-blank-template-default`) — issue [#217](https://github.com/PIVOT-PLATFORM/pivot-ui/issues/217).
  Depuis EN53.4 (ADR-030), `collaboratif-ui` est un projet interne de `pivot-ui`
  (`projects/collaboratif-ui`) ; les anciens repos `pivot-collaboratif-{core,ui}` cités dans le
  corps figé sont archivés.
- **Backend** : aucun changement — la plomberie « tableau vierge » existante
  (`POST /whiteboard/boards` sans `templateId`) est réutilisée telle quelle.

### Écart de comportement vs corps figé

| Aspect | Corps figé (livraison initiale) | Après correction |
|--------|--------------------------------|------------------|
| Option de création vierge dans la galerie | Absente — « Vierge » non seedé, création vierge seulement via fallback silencieux (catalogue vide / erreur) | **Carte « Aucun template » explicite** en 1re position de la `listbox`, sélectionnable |
| Sélection par défaut à l'ouverture | « Brainstorm » (auto-sélection) | **« Aucun template » (vierge)** — plus d'auto-sélection d'un modèle |
| Émission de la galerie | id du template par défaut | `null` par défaut → `createBoard(title, undefined)` (contrat inchangé) |

Le backend reste inchangé : « Vierge » n'est toujours pas un template seedé côté API. La carte
« Aucun template » est une option **cliente** qui n'émet aucun `templateId` — sémantiquement
identique au flux de création vierge d'US08.1.1, désormais rendu explicite dans l'UI.

### Spec fonctionnelle (delta)

- Carte « Aucun template » rendue **hors de la boucle des templates** → visible même si le
  catalogue est vide ou en erreur (l'utilisateur garde toujours une option cliquable).
- Participe au roving-tabindex et à la navigation clavier (flèches, Home/End, Entrée/Espace) au
  même titre que les cartes de modèle ; index clavier unifié (position 0 = carte vierge).
- Sélectionner un modèle retire la sélection de la carte vierge et inversement (`aria-selected`
  exclusif, une seule option `tabindex=0`).
- i18n : nouvelle clé `whiteboard.template.blank` (`name` / `description`), fr + en.

### Contrat technique (delta) — `projects/collaboratif-ui`

| Fichier (modifié) | Delta |
|-------------------|-------|
| `whiteboard/template-gallery/template-gallery.component.ts` | Suppression de l'auto-sélection Brainstorm ; `selectBlank()`, `selectByIndex()`, `optionTabIndex(key)` ; index clavier unifié |
| `whiteboard/template-gallery/template-gallery.component.html` | Carte `role="option"` « Aucun template » avant le `@for`, index modèles décalés (`i + 1`) |
| `whiteboard/template-gallery/template-gallery.component.scss` | Styles `--blank` (aperçu décoratif pointillé) |
| `whiteboard/template-gallery/template-gallery.component.spec.ts` | Réindexation galerie + cas carte vierge |
| `whiteboard/board-list/board-list.component.spec.ts` | Attendu de défaut mis à jour (aucun `templateId` par défaut) — aucun code prod `board-list` modifié |
| i18n `{fr,en}.json` | Clé `whiteboard.template.blank` |

> Note : le corps figé mentionne `WhiteboardTemplate { id, code, previewUrl }` ; le code réel
> utilise `thumbnailUrl`. Écart de nommage préexistant (hors périmètre de cette correction),
> laissé tel quel — le modèle n'est pas touché ici.

### Scores

- Gate 2 (frontend) : vitest vert — collaboratif-ui 1021 tests (dont `template-gallery` et
  `board-list`) ; vérifications locales `tsc`/`lint`/`build` prod à 0 erreur / 0 warning.
- Gate 4 : à consigner sur la PR `pivot-ui#218` (workflow en cours).

**Statut** : addendum figé le 2026-07-20.
