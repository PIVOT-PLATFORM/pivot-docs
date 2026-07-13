# US08.13.2 — Cycle de vie du brouillon de template

**En tant que** propriétaire d'un template personnel
**Je veux** créer, éditer le contenu, enregistrer ou supprimer mes templates via un board brouillon jetable
**Afin de** modifier le canvas d'un template sans polluer ma liste de tableaux ni risquer de corrompre le template en cours d'édition

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given je suis authentifié, when je poste `POST /api/collaboratif/whiteboard/templates` (nom, description?, couverture?, `enabledActivities?`, `fromBoardId?`), then un template personnel privé est créé avec `ownerId = utilisateur courant` ; si `fromBoardId` est fourni, le snapshot brut du board (cartes/cadres/connexions/champs) est stocké en JSON **avec les ids d'origine conservés** (pas de remapping, contrairement au clonage template→board) | ⬜ |
| Given un template m'appartenant, when je poste `PATCH /api/collaboratif/whiteboard/templates/{templateId}` (métadonnées et/ou `isFavorite`), then le template est mis à jour ; propriétaire uniquement | ⬜ |
| Given un template m'appartenant, when je poste `DELETE /api/collaboratif/whiteboard/templates/{templateId}`, then le template est supprimé sans affecter les tableaux déjà créés depuis lui (aucune FK persistée entre template et boards issus) | ⬜ |
| Given un template sans brouillon existant pour moi, when je poste `POST /api/collaboratif/whiteboard/templates/{templateId}/edit-content`, then un nouveau board brouillon est créé (`name = "[Template] " + template.name`, `templateDraftOf = templateId`), son contenu cloné depuis le snapshot JSON du template avec ids remappés, et le serveur répond **200** | ⬜ |
| Given un brouillon existe déjà pour ce couple (utilisateur, template), when je poste à nouveau `edit-content`, then le brouillon existant est **réutilisé tel quel**, sans aucune resynchronisation depuis le template (même si le template a été modifié par un autre chemin entre-temps), et le serveur répond **200** (jamais 201) | ⬜ |
| Given un template dont le snapshot contient un cadre avec `active = true`, when je clone ce template via `edit-content` (vers un brouillon) **ou** via la création d'un tableau depuis template (US08.4.1), then le champ `frame.active` est **préservé à l'identique dans les deux chemins de clonage** — décision de cohérence corrigeant le §6 constat 13 (le POC omettait `frame.active` dans le clone template→brouillon alors qu'il le conservait dans template→board) | ⬜ |
| Given un board dont `templateDraftOf` n'est pas nul, when je liste mes tableaux via `GET /api/collaboratif/whiteboard/boards`, then ce brouillon **n'apparaît pas** dans la liste, même pour son propriétaire (filtre `templateDraftOf IS NULL`) | ⬜ |
| Given un brouillon modifié (cartes ajoutées/déplacées), when je poste `POST /api/collaboratif/whiteboard/templates/{templateId}/save-from-draft`, then le template est mis à jour avec un nouveau snapshot JSON de l'état **vivant** du brouillon (relu depuis les entités réelles, pas depuis l'ancien JSON), le préfixe `"[Template] "` est retiré du nom, puis le board brouillon est **définitivement supprimé** | ⬜ |
| Given un brouillon modifié, when je poste `POST /api/collaboratif/whiteboard/templates/{templateId}/discard-draft`, then le board brouillon est supprimé (`deleteMany` sur `ownerId + templateDraftOf`, idempotent, aucune lecture préalable) et le template n'est **pas** modifié ; le serveur répond **204** | ⬜ |
| Given aucun brouillon n'existe, when je poste `save-from-draft`, then le serveur répond **404** ("Aucun brouillon trouvé") | ⬜ |
| Given aucun brouillon n'existe, when je poste `discard-draft`, then l'opération est un no-op idempotent et répond **204** (pas d'erreur) | ⬜ |
| Error : given un échec réseau ou 5xx sur l'une des actions (create/update/delete template, edit-content, save-from-draft, discard-draft), when la requête échoue, then toast `role="alert"` explicite et aucun état local n'est modifié tant que la confirmation serveur n'est pas reçue | ⬜ |
| Error : given un `templateId` inexistant ou hors du tenant courant, when un des endpoints est appelé, then 404 (convention anti-énumération) | ⬜ |
| Security : tenantId et userId résolus exclusivement depuis le SecurityContext (token opaque) — jamais depuis le path ou le body ; tous les endpoints template sont strictement propriétaire (`template.ownerId = utilisateur courant`), un template n'est jamais partagé | ⬜ |
| Security : si `fromBoardId` est fourni au `POST /templates`, la vérification porte strictement sur `Board.ownerId = utilisateur courant` (un co-propriétaire par partage ne peut **pas** snapshotter un board qu'il ne possède pas) → 403 sinon | ⬜ |
| Security : le brouillon (`templateDraftOf` non nul) est invisible dans toute liste de tableaux et ne peut être manipulé que via les endpoints template de son propriétaire — aucun autre utilisateur ne peut le lister, l'ouvrir ni le cibler | ⬜ |
| A11y : les actions "Éditer le contenu", "Enregistrer", "Annuler" sont des boutons natifs focusables avec `aria-label` explicites ; "Annuler" (discard) demande une confirmation `role="dialog"` `aria-modal="true"` avec piège à focus et retour du focus au déclencheur | ⬜ |
| Tests TI : create template (avec/sans `fromBoardId`, snapshot ids conservés, co-owner `fromBoardId` → 403), edit-content (création puis réutilisation sans re-sync, 200 dans les deux cas), brouillon absent de `GET /boards`, save-from-draft (snapshot vivant + suppression brouillon + retrait préfixe, absence → 404), discard-draft (204 idempotent, template intact) | ⬜ |
| Tests Vitest : parcours "éditer contenu → modifier → enregistrer" et "éditer contenu → annuler", confirmation avant discard, gestion des erreurs réseau | ⬜ |

## Hors périmètre

- Partage de template entre utilisateurs ou tenants : les templates personnels restent strictement privés (`ownerId`), aucune route de partage — les 3 templates globaux publics seedés relèvent d'US08.4.1, hors de cette US
- Édition concurrente d'un même brouillon par deux sessions : un seul brouillon par couple (utilisateur, template), le POC ne verrouille pas et réutilise le brouillon existant tel quel — pas de gestion de conflit multi-session ici
- Re-synchronisation d'un brouillon existant depuis un template modifié entre-temps : explicitement **non** effectuée (le brouillon existant prime), reproduit tel quel
- Historique de versions du template : chaque `save-from-draft` écrase le snapshot précédent, pas de versioning

## Notes d'implémentation

- Backend `pivot-collaboratif-core` (schéma `collaboratif`) :
  - Entité `BoardTemplate` : `{ id, name, description?, coverImage?, maxParticipants?, enabledActivities?, isFavorite (défaut false), ownerId, cards (JSON), frames (JSON), connections (JSON), fields (JSON), createdAt, updatedAt }` — les blobs JSON sont des snapshots dénormalisés, aucune FK vers les tables réelles
  - Colonne `Board.templateDraftOf` (String nullable, **pas de FK Prisma/DB déclarée** vers `BoardTemplate.id` — relation gérée en code via `findFirst`/`deleteMany`)
  - `GET /api/collaboratif/whiteboard/templates` : `ownerId = utilisateur`, tri `isFavorite DESC, updatedAt DESC` — strictement privé
  - `POST /api/collaboratif/whiteboard/templates` : `+ fromBoardId?` ; si fourni et `board.ownerId != userId` → **403** (contrôle sur `Board.ownerId`, pas `isBoardOwner`) ; snapshot brut **ids d'origine conservés** ; héritage cascade des métadonnées si `undefined` (vs `null` explicite = non hérité)
  - `PATCH /templates/{id}` (+ `isFavorite?`) et `DELETE /templates/{id}` : propriétaire uniquement ; delete n'affecte pas les boards déjà issus
  - `POST /templates/{id}/edit-content` : cherche un brouillon `ownerId + templateDraftOf` → réutilisé **tel quel** si trouvé (pas de re-sync) ; sinon crée `Board{ name: "[Template] " + tpl.name, templateDraftOf: id }` + clone du snapshot (ids remappés) ; **200** toujours
  - **Cohérence `frame.active` (correctif §6 constat 13)** : le clone template→brouillon (`edit-content`) **conserve** `frame.active`, à l'identique du clone template→board (US08.4.1) — le POC omettait ce champ dans le seul chemin `edit-content` ; on unifie les deux chemins (préservation dans les deux)
  - `POST /templates/{id}/save-from-draft` : **404** si absent ; relit l'état **vivant** du brouillon (pas le JSON), `update` du template (nom sans préfixe `"[Template] "`, régénération du snapshot JSON avec les ids réels du brouillon) → `delete` du board brouillon
  - `POST /templates/{id}/discard-draft` : `deleteMany({ ownerId, templateDraftOf: id })`, idempotent, aucune lecture préalable → **204**
- `GET /api/collaboratif/whiteboard/boards` : liste `owned` filtrée `ownerId = id AND templateDraftOf IS NULL` fusionnée avec `shared` — les brouillons de template n'apparaissent jamais, même pour leur propriétaire
- Frontend `pivot-collaboratif-ui` : ouverture du brouillon dans le canvas standard (US08.3.2), boutons "Enregistrer le template" / "Annuler" câblés sur `save-from-draft` / `discard-draft` ; galerie de templates (US08.4.1) exposant create/edit-content/delete
- i18n : clés `whiteboard.template.*` (fr.json / en.json)

---
Item Type: US · Parent: F08.13 · Module: whiteboard · Phase: Socle · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.4, §2.5, §5.6) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: US08.4.1 (templates seedés + galerie de création), EN08.4 (modèle `Card` typé, clonage snapshot↔board), US08.2.4 (enregistrer comme template depuis un board)
