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
