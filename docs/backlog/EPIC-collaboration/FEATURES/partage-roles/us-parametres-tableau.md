# US08.2.4 — Paramètres de tableau (modal OWNER)

**En tant que** owner d'un tableau
**Je veux** une modal de paramètres pour éditer le nom/description, activer/désactiver les activités disponibles, enregistrer le tableau comme template, et réinitialiser le canvas
**Afin de** administrer mon tableau sans devoir passer par plusieurs actions dispersées dans l'interface

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given je suis owner d'un tableau, when j'ouvre la modal "Paramètres" depuis le canvas ou le menu ⋯ de la card, then la modal affiche le nom, la description, les toggles d'activités disponibles, et les actions "Enregistrer comme template" / "Réinitialiser le tableau" | ⬜ |
| Given la modal ouverte, when je modifie le nom et/ou la description et valide, then `PATCH /api/collaboratif/whiteboard/boards/{boardId}` persiste les deux champs (le nom réutilise le contrat existant d'US08.1.4, la description est un nouveau champ optionnel jusqu'à 500 caractères) | ⬜ |
| Given la modal ouverte, when je bascule un toggle d'activité disponible (ex. Vote, Timer — activités déjà `Backlog` sous F30.x et non implémentées en Socle), then seules les activités réellement implémentées et livrées sont togglables ; les toggles d'activités non encore livrées sont désactivés (disabled) avec une info-bulle "Bientôt disponible", pas d'appel API sur une activité non implémentée | ⬜ |
| Given la modal ouverte, when je clique "Enregistrer comme template", then le contenu courant du canvas est sauvegardé comme nouveau template personnel réutilisable par `POST /api/collaboratif/whiteboard/templates` (visible ensuite dans la galerie de création, US08.4.1) | ⬜ |
| Given la modal ouverte, when je clique "Réinitialiser le tableau" (bouton câblé sur la clé i18n existante `whiteboard.board.reset`), then une confirmation est demandée puis tous les éléments du canvas sont supprimés (le board et ses métadonnées — titre, membres, favoris — restent inchangés) | ⬜ |
| Given une réinitialisation confirmée, when elle est appliquée, then les participants actuellement connectés au canvas reçoivent un message STOMP `BOARD_RESET` et voient leur canvas se vider en temps réel, cohérent avec le mécanisme déjà en place pour `BOARD_DELETED` (EN08.1) | ⬜ |
| Error : given un échec réseau ou 5xx sur n'importe laquelle des actions (édition, enregistrer comme template, réinitialiser), when la requête échoue, then toast `role="alert"` explicite + aucun état local n'est modifié tant que la confirmation serveur n'est pas reçue | ⬜ |
| Error : given un boardId inexistant ou cross-tenant, when un des endpoints de cette US est appelé, then 404 (cohérent avec la convention anti-énumération des autres endpoints CRUD tableaux) | ⬜ |
| Security : seul l'OWNER peut ouvrir la modal Paramètres et déclencher ses actions — EDITOR/VIEWER n'ont pas d'entrée de menu vers cette modal, et un appel direct aux endpoints (édition, template, reset) par un non-owner retourne 403 | ⬜ |
| Security : tenantId résolu exclusivement depuis le SecurityContext (token opaque) — jamais depuis le path ou le body, sur les 3 nouveaux endpoints (édition description, enregistrer comme template, reset) | ⬜ |
| Security : "Réinitialiser le tableau" nécessite une confirmation explicite (dialog dédié, distinct de la confirmation de suppression) — pas de réinitialisation en un clic, pour limiter le risque de perte de contenu accidentelle | ⬜ |
| A11y : modal `role="dialog"` `aria-modal="true"`, focus posé sur le premier champ à l'ouverture, piège à focus actif, fermeture par Échap avec retour du focus sur le déclencheur | ⬜ |
| A11y : chaque toggle d'activité associé à un `<label>` explicite et à un état `aria-checked` (ou `role="switch"`), le bouton "Réinitialiser le tableau" porte `aria-label="Réinitialiser le tableau [titre] — supprime tout le contenu du canvas"` | ⬜ |
| Tests TI : PATCH description (owner → 200, editor/viewer → 403, cross-tenant → 404) ; POST template depuis board (owner → 200, non-owner → 403) ; POST reset (owner → 200 + événement STOMP émis, non-owner → 403, cross-tenant → 404) | ⬜ |
| Tests Vitest : ouverture modal, édition nom/description, toggles disabled sur activités non livrées, confirmation avant reset, gestion des 3 cas d'erreur réseau | ⬜ |

## Hors périmètre

- Suppression de template personnel enregistré (gestion de la bibliothèque de templates au-delà de la création) — hors scope, couvert le cas échéant par une future US
- Toggles d'activités réellement fonctionnels au-delà de l'affichage disabled — dépend de la livraison effective de chaque activité (Vote, Timer, etc., F30.x, hors Socle) ; cette US ne fait qu'exposer l'UI de la modal et son état "à venir"
- Réinitialisation partielle (garder certains éléments) — le reset est total sur le contenu du canvas, pas de sélection

## Notes d'implémentation

- Backend `pivot-collaboratif-core` :
  - `PATCH /api/collaboratif/whiteboard/boards/{boardId}` étendu avec un champ `description` optionnel (nouvelle colonne `board.description VARCHAR(500) NULL`), en plus du `title` déjà géré par US08.1.4
  - `POST /api/collaboratif/whiteboard/templates` (nouveau) : crée un template à partir du contenu canvas actuel du board — réutilise le mécanisme de stockage des templates seedés d'US08.4.1, avec `tenant_id` renseigné (template privé au tenant, distinct des 3 templates globaux publics)
  - `POST /api/collaboratif/whiteboard/boards/{boardId}/reset` (nouveau) : supprime tous les événements canvas du board (table d'événements canvas, cf. US08.4.1) sans toucher aux métadonnées board/membres/favoris ; émet `BOARD_RESET` sur `/topic/board/{boardId}` (même canal STOMP qu'EN08.1/US08.1.5)
  - OWNER-only sur les 3 endpoints, même convention 403/404 que le reste de F08.1/F08.2
- Frontend `pivot-collaboratif-ui` : `BoardSettingsModalComponent`, ouvert depuis le header du canvas (US08.3.2) et/ou le menu ⋯ de la card (US08.1.3) — accès conditionné au rôle owner déjà porté par le token de membership
- **Câblage du bouton Reset** : la clé i18n `whiteboard.board.reset` existe déjà dans les catalogues (`fr.json`/`en.json`) mais son câblage effectif était à vérifier (signalé dans le cadrage de cette US) — cette US couvre explicitement le branchement du bouton sur le nouvel endpoint `POST .../reset`, pas seulement la traduction du libellé
- i18n : clés `whiteboard.board.settings.*` (nom modal, description, toggles, template, confirmation reset) + réutilisation de `whiteboard.board.reset` existante
- Source : parité visible vs POC PouetPouet (modal paramètres OWNER + reset board) — décision mainteneur d'extension du Socle noyau F08.x, suite à `docs/audits/audit-recette-fonctionnelle.md`

---
Item Type: US · Parent: F08.2 · Module: whiteboard · Phase: Socle · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité visible PouetPouet (audit recette fonctionnelle Socle, 2026-07-13) — décision mainteneur d'extension du périmètre F08.x « noyau + parité visible »
Dépendances: US08.1.4 (renommer, contrat PATCH réutilisé), US08.4.1 (templates), EN08.1 (isolation WS room, canal STOMP reset)
