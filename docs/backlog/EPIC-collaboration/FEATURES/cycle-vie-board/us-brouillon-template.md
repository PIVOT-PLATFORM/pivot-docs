# US08.13.2 — Cycle de vie du brouillon de template

**En tant que** propriétaire d'un template personnel
**Je veux** créer, éditer le contenu, enregistrer ou supprimer mes templates via un board brouillon jetable
**Afin de** modifier le canvas d'un template sans polluer ma liste de tableaux ni risquer de corrompre le template en cours d'édition

## ⚠️ Réalignement sur le modèle réel (2026-07-21)

Les critères ci-dessous ont été **réécrits** : leur rédaction initiale décrivait le schéma **Prisma
du POC PouetPouet** et non l'implémentation Java de `pivot-core`, ce qui les rendait
inapplicables tels quels. Trois écarts structurels constatés dans le code :

| Rédaction initiale (POC) | Implémentation réelle (`pivot-core`) |
|---|---|
| Template portant des blobs JSON `cards` / `frames` / `connections` / `fields` | Table normalisée `whiteboard_template_element`, **un payload JSONB par élément** (`FRAME`/`CARD`/`CONNECTION`/`FIELD`/`FIELD_VALUE`) |
| Template privé par utilisateur (`ownerId`) | Template par **tenant** (`tenant_id`), donc visible de toute l'organisation |
| `deleteMany({ ownerId, templateDraftOf })` | Sémantique Prisma sans équivalent — JPA/Spring Data |

**Décision mainteneur du 2026-07-21** : le template devient **personnel** (`owner_id`), et le
partage — avec l'organisation ou avec des personnes ciblées — est porté par la nouvelle
[US08.13.5](./us-partage-template.md). Cette US-ci introduit `owner_id` et le cycle de vie du
brouillon ; elle ne traite pas la visibilité.

**Prérequis découvert dans le code** : un template privé (`tenant_id` non nul) n'est aujourd'hui
**pas instanciable du tout** — `WhiteboardTemplateService.resolveGlobalTemplate` n'accepte que
`tenant_id IS NULL`, trou déjà signalé dans le JavaDoc de `createFromBoard`. Le combler fait partie
du périmètre de cette US, sans quoi aucun template personnel ne pourrait être rejoué.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given je suis authentifié, when je poste `POST /api/collaboratif/whiteboard/templates` (nom, description?, couverture?, `enabledActivities?`, `fromBoardId?`), then un template personnel est créé avec `owner_id = utilisateur courant` et `tenant_id = tenant courant` ; si `fromBoardId` est fourni, le contenu du board est capturé en lignes `whiteboard_template_element` (un payload JSONB par cadre / carte / connexion / champ / valeur de champ), **la `local_key` de chaque élément portant l'UUID d'origine de l'entité** — exactement le mécanisme déjà utilisé par `save-as-template` (US08.2.4), qui devient ainsi le chemin unique de capture | ⬜ |
| Given un template m'appartenant, when je poste `PATCH /api/collaboratif/whiteboard/templates/{templateId}` (métadonnées et/ou `isFavorite`), then le template est mis à jour ; propriétaire uniquement | ⬜ |
| Given un template m'appartenant, when je poste `DELETE /api/collaboratif/whiteboard/templates/{templateId}`, then le template est supprimé sans affecter les tableaux déjà créés depuis lui (aucune FK persistée entre template et boards issus) | ⬜ |
| Given un template sans brouillon existant pour moi, when je poste `POST /api/collaboratif/whiteboard/templates/{templateId}/edit-content`, then un nouveau board brouillon est créé (`title = "[Template] " + template.name`, `template_draft_of = templateId`), son contenu matérialisé depuis les `whiteboard_template_element` avec ids remappés — en réutilisant `WhiteboardTemplateService.initializeBoard`, dont la résolution devra accepter un template **personnel** et non plus seulement global — et le serveur répond **200** | ⬜ |
| Given un brouillon existe déjà pour ce couple (utilisateur, template), when je poste à nouveau `edit-content`, then le brouillon existant est **réutilisé tel quel**, sans aucune resynchronisation depuis le template (même si le template a été modifié par un autre chemin entre-temps), et le serveur répond **200** (jamais 201) | ⬜ |
| Given un template dont un élément `FRAME` porte `active = true`, when je matérialise ce template via `edit-content` (vers un brouillon) **ou** via la création d'un tableau depuis template (US08.4.1), then `frame.active` est **préservé à l'identique dans les deux chemins** — corrige le §6 constat 13, **et un défaut réel constaté le 2026-07-21** : `materializeFrame` ne lit aujourd'hui **jamais** `active` (ni dans un chemin ni dans l'autre), tout cadre issu d'un template retombant donc sur le défaut `false` de la colonne | ⬜ |
| Given un board dont `template_draft_of` n'est pas nul, when je liste mes tableaux via `GET /api/collaboratif/whiteboard/boards`, then ce brouillon **n'apparaît pas** dans la liste, même pour son propriétaire — le filtre `AND b.templateDraftOf IS NULL` est ajouté à `BoardRepository.findAccessibleByUser` (requête **et** `countQuery`, sans quoi la pagination compterait des lignes invisibles) et à la requête de corbeille | ⬜ |
| Given un brouillon modifié (cartes ajoutées/déplacées), when je poste `POST /api/collaboratif/whiteboard/templates/{templateId}/save-from-draft`, then les `whiteboard_template_element` du template sont **entièrement remplacés** par une capture de l'état **vivant** du brouillon (relu depuis les entités réelles `Card`/`Frame`/`CardConnection`/`BoardField`/`CardFieldValue`, jamais depuis les anciens payloads), le préfixe `"[Template] "` est retiré du nom, puis le board brouillon est **définitivement supprimé** | ⬜ |
| Given un brouillon modifié, when je poste `POST /api/collaboratif/whiteboard/templates/{templateId}/discard-draft`, then le board brouillon est supprimé (suppression directe sur `owner_id + template_draft_of`, idempotente, sans lecture préalable) et le template n'est **pas** modifié ; le serveur répond **204** | ⬜ |
| Given aucun brouillon n'existe, when je poste `save-from-draft`, then le serveur répond **404** ("Aucun brouillon trouvé") | ⬜ |
| Given aucun brouillon n'existe, when je poste `discard-draft`, then l'opération est un no-op idempotent et répond **204** (pas d'erreur) | ⬜ |
| Error : given un échec réseau ou 5xx sur l'une des actions (create/update/delete template, edit-content, save-from-draft, discard-draft), when la requête échoue, then toast `role="alert"` explicite et aucun état local n'est modifié tant que la confirmation serveur n'est pas reçue | ⬜ |
| Error : given un `templateId` inexistant ou hors du tenant courant, when un des endpoints est appelé, then 404 (convention anti-énumération) | ⬜ |
| Security : `tenantId` et `userId` résolus exclusivement depuis le SecurityContext (token opaque) — jamais depuis le path ou le body ; toutes les routes **d'écriture** d'un template (create / update / delete / edit-content / save-from-draft / discard-draft) exigent `template.owner_id = utilisateur courant`. La **lecture** obéit aux règles de visibilité d'[US08.13.5](./us-partage-template.md) — un destinataire d'un partage peut utiliser un template, jamais le modifier | ⬜ |
| Security : si `fromBoardId` est fourni au `POST /templates`, la vérification porte strictement sur `Board.ownerId = utilisateur courant` (un co-propriétaire par partage ne peut **pas** snapshotter un board qu'il ne possède pas) → 403 sinon | ⬜ |
| Security : le brouillon (`templateDraftOf` non nul) est invisible dans toute liste de tableaux et ne peut être manipulé que via les endpoints template de son propriétaire — aucun autre utilisateur ne peut le lister, l'ouvrir ni le cibler | ⬜ |
| A11y : les actions "Éditer le contenu", "Enregistrer", "Annuler" sont des boutons natifs focusables avec `aria-label` explicites ; "Annuler" (discard) demande une confirmation `role="dialog"` `aria-modal="true"` avec piège à focus et retour du focus au déclencheur | ⬜ |
| Tests TI : create template (avec/sans `fromBoardId`, snapshot ids conservés, co-owner `fromBoardId` → 403), edit-content (création puis réutilisation sans re-sync, 200 dans les deux cas), brouillon absent de `GET /boards`, save-from-draft (snapshot vivant + suppression brouillon + retrait préfixe, absence → 404), discard-draft (204 idempotent, template intact) | ⬜ |
| Tests Vitest : parcours "éditer contenu → modifier → enregistrer" et "éditer contenu → annuler", confirmation avant discard, gestion des erreurs réseau | ⬜ |

## Hors périmètre

- **Partage de template** : porté par [US08.13.5](./us-partage-template.md) (privé / organisation / personnes ciblées, décision mainteneur du 2026-07-21). Cette US-ci introduit `owner_id` et le cycle de vie du brouillon, jamais la visibilité. Les templates globaux seedés relèvent d'US08.4.1
- Édition concurrente d'un même brouillon par deux sessions : un seul brouillon par couple (utilisateur, template), le POC ne verrouille pas et réutilise le brouillon existant tel quel — pas de gestion de conflit multi-session ici
- Re-synchronisation d'un brouillon existant depuis un template modifié entre-temps : explicitement **non** effectuée (le brouillon existant prime), reproduit tel quel
- Historique de versions du template : chaque `save-from-draft` écrase le snapshot précédent, pas de versioning

## Notes d'implémentation

- **Backend `pivot-core`, module `collaboratif`** (schéma `collaboratif`) :
  - `whiteboard_template` gagne `owner_id BIGINT REFERENCES public.users(id)`, **nullable** — les
    10 templates globaux seedés (`tenant_id IS NULL`) n'ont pas de propriétaire. Le contenu reste
    porté par `whiteboard_template_element` (un payload JSONB par élément), **aucun blob JSON
    monolithique n'est introduit**.
  - `board` gagne `template_draft_of UUID` **nullable, sans FK déclarée** vers
    `whiteboard_template(id)` — la relation est gérée en code, pour que la suppression d'un template
    ne cascade pas sur des tableaux.
  - **Migration Flyway** : l'empreinte de `V1` est déjà enregistrée par Flyway sur l'environnement de recette persistant, ces
    colonnes exigent donc un fichier numéroté — soumis à l'accord explicite du mainteneur (règle
    « fichier V1 unique avant la BETA », à laquelle V2/V7/V8 ont déjà dérogé, chacune avec un en-tête justificatif).
  - **Lever le verrou « template personnel non instanciable »** : `resolveGlobalTemplate` /
    `WhiteboardTemplateRepository.findByIdAndTenantIdIsNull` n'acceptent aujourd'hui que
    `tenant_id IS NULL`. Une résolution acceptant un template accessible à l'utilisateur (global,
    possédé, ou partagé au sens d'[US08.13.5](./us-partage-template.md)) est un **prérequis** :
    sans elle, aucun template personnel ne peut être rejoué, ni vers un board ni vers un brouillon.
  - `GET /whiteboard/templates` : passe du seul `findAllByTenantIdIsNullOrderByDisplayOrderAsc`
    (globaux) à l'union globaux + possédés, tri `updated_at DESC` au sein des possédés. La
    visibilité étendue (tenant, partages ciblés) relève d'US08.13.5.
  - `POST /templates` (+ `fromBoardId?`) : si fourni et `board.owner_id != userId` → **403**
    (contrôle sur la propriété du board, pas sur l'appartenance) ; capture via le mécanisme
    existant de `WhiteboardTemplateService.createFromBoard`, dont la `local_key` porte déjà l'UUID
    d'origine de chaque entité.
  - `PATCH /templates/{id}` (+ `isFavorite?`) et `DELETE /templates/{id}` : propriétaire uniquement ;
    la suppression n'affecte pas les tableaux déjà issus du template.
  - `POST /templates/{id}/edit-content` : cherche un brouillon (`owner_id` + `template_draft_of`) →
    **réutilisé tel quel** si trouvé, sans aucune resynchronisation depuis le template ; sinon crée
    `Board{ title: "[Template] " + tpl.name, templateDraftOf: id }` puis appelle `initializeBoard`
    (ids remappés). **200 dans les deux cas**, jamais 201.
  - **Cohérence `frame.active`** : `materializeFrame` doit lire et positionner `active` — aujourd'hui
    il ne le fait dans **aucun** des deux chemins (constat 2026-07-21), tout cadre issu d'un template
    retombant sur le défaut `false`. Corriger les deux chemins d'un coup (§6 constat 13).
  - `POST /templates/{id}/save-from-draft` : **404** si aucun brouillon ; relit l'état **vivant** du
    brouillon, remplace intégralement les `whiteboard_template_element` du template, retire le
    préfixe `"[Template] "` du nom, puis supprime le board brouillon.
  - `POST /templates/{id}/discard-draft` : suppression idempotente sur `owner_id +
    template_draft_of`, sans lecture préalable → **204**.
- `GET /whiteboard/boards` : ajouter `AND b.templateDraftOf IS NULL` à `findAccessibleByUser`
  — **dans la requête *et* dans la `countQuery`**, faute de quoi la pagination compterait des
  lignes que la page ne contient pas — ainsi qu'à la requête de corbeille.
- **Frontend `pivot-ui`** (`projects/collaboratif-ui`) : le brouillon s'ouvre dans le canvas standard ;
  boutons « Enregistrer le template » / « Annuler » câblés sur `save-from-draft` / `discard-draft`,
  la galerie de templates (US08.4.1) exposant create / edit-content / delete.
- **i18n** : clés `whiteboard.template.*` (`fr.json` / `en.json`), aucune chaîne littérale.

---
Item Type: US · Parent: F08.13 · Module: whiteboard · Phase: Socle · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.4, §2.5, §5.6) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: US08.4.1 (templates seedés + galerie de création), EN08.4 (modèle `Card` typé), US08.2.4 (capture `save-as-template`, réutilisée) — prérequis interne : lever le verrou « template personnel non instanciable » (`resolveGlobalTemplate`). Complétée par US08.13.5 (partage)
