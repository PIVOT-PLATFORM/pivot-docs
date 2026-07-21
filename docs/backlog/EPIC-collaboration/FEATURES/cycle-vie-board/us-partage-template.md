# US08.13.5 — Partage d'un template : privé, organisation, ou personnes ciblées

**En tant que** créateur d'un template personnel
**Je veux** choisir qui peut l'utiliser — moi seul, toute mon organisation, ou des personnes que je désigne
**Afin de** diffuser le format d'atelier que j'ai mis au point (la rétro de mon pôle, par exemple) à ceux qui en ont besoin, sans l'imposer à tout le monde ni devoir le recréer chez chacun

## Contexte et décision

Aujourd'hui, un template créé via « enregistrer comme template » (US08.2.4) est stocké avec un
`tenant_id` et devient **automatiquement visible par toute l'organisation** : ce n'est ni un
template privé, ni un partage maîtrisé — c'est un partage implicite que son auteur n'a pas choisi.

À l'opposé, US08.13.2 (cycle de vie du brouillon) est spécifiée sur des templates **strictement
privés** (`ownerId`), sans aucune route de partage : l'appliquer telle quelle **retirerait** la
diffusion à l'organisation dont des utilisateurs peuvent déjà dépendre.

**Décision mainteneur du 2026-07-21** : viser un fonctionnement de type Klaxoon — le template est
**privé par défaut**, et son auteur peut ensuite le partager **avec son organisation** ou **avec
des personnes ciblées**. Cette US porte le modèle de visibilité et les routes de partage ;
US08.13.2 porte le cycle de vie du contenu (brouillon) et introduit `owner_id`.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un template dont je suis le propriétaire, when je consulte sa visibilité, then elle vaut `PRIVATE` par défaut — un template nouvellement créé n'est visible que de son auteur | ⬜ |
| Given un template m'appartenant, when je poste `PATCH /api/collaboratif/whiteboard/templates/{templateId}` avec `visibility: "TENANT"`, then tout utilisateur du **même tenant** voit ce template dans sa galerie et peut créer un tableau à partir de lui | ⬜ |
| Given un template en visibilité `TENANT`, when je le repasse à `PRIVATE`, then il disparaît immédiatement de la galerie des autres utilisateurs du tenant, **sans affecter les tableaux déjà créés** à partir de lui | ⬜ |
| Given un template m'appartenant, when je poste `POST /api/collaboratif/whiteboard/templates/{templateId}/shares` avec une liste d'identifiants ou d'emails d'utilisateurs **du même tenant**, then chacun d'eux voit le template dans sa galerie, quelle que soit la valeur de `visibility` | ⬜ |
| Given un template partagé avec des personnes ciblées, when je poste `DELETE /api/collaboratif/whiteboard/templates/{templateId}/shares/{userId}`, then cet utilisateur perd l'accès ; l'opération est **idempotente** (204 même si le partage n'existait pas) | ⬜ |
| Given un template m'appartenant, when je poste `GET /api/collaboratif/whiteboard/templates/{templateId}/shares`, then j'obtiens la liste des personnes avec qui je l'ai partagé (identifiant, nom affiché, date de partage) — **propriétaire uniquement** | ⬜ |
| Given je liste `GET /api/collaboratif/whiteboard/templates`, when la galerie est construite, then elle contient l'**union** de : les templates globaux (`tenant_id IS NULL`), mes templates, ceux de mon tenant en visibilité `TENANT`, et ceux partagés nommément avec moi — **sans doublon** | ⬜ |
| Given un template auquel j'ai accès sans en être propriétaire (via `TENANT` ou partage ciblé), when je tente `PATCH`, `DELETE`, `POST /shares`, `edit-content`, `save-from-draft` ou `discard-draft`, then l'accès est refusé — **seul le propriétaire modifie un template**, les autres ne peuvent que l'**utiliser** pour créer un tableau | ⬜ |
| Given un template partagé (TENANT ou ciblé), when son propriétaire le supprime, then il disparaît pour tous ses destinataires, **sans affecter les tableaux déjà créés** à partir de lui (aucune FK persistée template→board) | ⬜ |
| Given un utilisateur destinataire d'un partage ciblé, when son compte est supprimé, then la ligne de partage est supprimée en cascade sans laisser de partage orphelin | ⬜ |
| Error : given un `userId` ciblé qui n'appartient **pas** au tenant du template, when je tente de partager avec lui, then 400 — le partage inter-tenant est refusé (voir Hors périmètre) | ⬜ |
| Error : given un `templateId` inexistant, hors de mon tenant, ou auquel je n'ai pas accès, when un endpoint est appelé, then **404** (convention anti-énumération, jamais 403 sur l'existence) | ⬜ |
| Error : given je tente de me partager le template à moi-même (propriétaire), when la requête est traitée, then no-op idempotent 204 — pas de ligne de partage redondante avec la propriété | ⬜ |
| Security : `tenantId` et `userId` sont résolus **exclusivement** depuis le SecurityContext (token opaque) — jamais depuis le path, le body ou un header ; un `userId` ciblé fourni dans le body est validé comme appartenant au tenant courant avant toute écriture | ⬜ |
| Security : le passage en `TENANT` ne rend visible que **dans le tenant du propriétaire** ; aucune visibilité ne franchit jamais la frontière de tenant, y compris pour un utilisateur multi-tenant | ⬜ |
| Security : un template en visibilité `PRIVATE` sans partage n'est **jamais** listé, lisible ni instanciable par quiconque d'autre que son propriétaire — vérifié par un test dédié qui tente l'accès en tant qu'autre utilisateur du même tenant | ⬜ |
| Security : un destinataire ne peut pas **re-partager** un template dont il n'est pas propriétaire (pas de partage transitif) | ⬜ |
| A11y : le panneau de partage est un `role="dialog"` `aria-modal="true"` avec piège à focus et retour du focus au déclencheur ; le choix de visibilité est un groupe de `<input type="radio">` natifs étiquetés ; la liste des destinataires est un tableau avec en-têtes associés et un bouton de retrait par ligne portant un `aria-label` explicite nommant la personne | ⬜ |
| A11y : tout changement de visibilité ou de destinataire est annoncé dans une région `aria-live="polite"` | ⬜ |
| Tests TI : défaut `PRIVATE` ; bascule `PRIVATE↔TENANT` et effet sur la galerie d'un autre utilisateur du tenant ; partage ciblé + retrait idempotent ; union sans doublon dans la galerie ; refus d'écriture pour un non-propriétaire sur les 6 routes ; refus inter-tenant ; 404 anti-énumération ; cascade à la suppression d'utilisateur | ⬜ |
| Tests Vitest : sélection de visibilité, ajout/retrait de destinataires, états de chargement et d'erreur, annonce `aria-live`, panneau inaccessible pour un non-propriétaire | ⬜ |

## Hors périmètre

- **Partage inter-tenant** : un template ne franchit jamais la frontière d'organisation. Le partage
  ciblé est restreint aux membres du tenant du propriétaire — cohérent avec la règle transversale
  d'isolation tenant du Socle.
- **Rôles sur un template** (lecture seule vs co-édition) : le partage donne le droit d'**utiliser**
  le template pour créer un tableau, jamais celui de le modifier. Un modèle de co-édition de
  template relève d'une US ultérieure si le besoin se confirme.
- **Partage par lien public** (token, à l'image d'US08.2.1 pour les tableaux) : hors périmètre ici,
  le partage est nominatif ou à l'échelle du tenant.
- **Transfert de propriété** d'un template : hors périmètre.
- **Notification** des destinataires d'un partage : hors périmètre — le template apparaît dans leur
  galerie, sans notification dédiée.
- **Templates globaux** (`tenant_id IS NULL`, seedés) : non concernés, ils restent visibles de tous
  et non modifiables (US08.4.1).

## Notes d'implémentation

- **Backend `pivot-core`, module `collaboratif`** (schéma `collaboratif`) :
  - `whiteboard_template` gagne deux colonnes : `owner_id BIGINT REFERENCES public.users(id)`
    (**introduite par US08.13.2**, nullable pour les templates globaux seedés) et
    `visibility VARCHAR(20) NOT NULL DEFAULT 'PRIVATE'`.
  - Nouvelle table `whiteboard_template_share` sur le patron exact de `board_member` :
    `(template_id UUID REFERENCES whiteboard_template(id) ON DELETE CASCADE, user_id BIGINT
    REFERENCES public.users(id) ON DELETE CASCADE, shared_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (template_id, user_id))` + index sur `user_id` (comme
    `idx_board_member_user_id`) — c'est ce sens qui porte la requête de galerie.
  - Enum `TemplateVisibility { PRIVATE, TENANT }`, aligné sur le patron de `BoardVisibility`.
  - Requête de galerie : union `tenant_id IS NULL` **OR** `owner_id = :userId` **OR**
    (`tenant_id = :tenantId AND visibility = 'TENANT'`) **OR** `EXISTS (share)`, avec `DISTINCT` —
    même forme que `BoardRepository.findAccessibleByUser`, qui joint déjà `board_member` pour la
    même raison.
  - **Migration Flyway** : nécessite l'accord explicite du mainteneur pour un fichier numéroté
    (règle « fichier V1 unique avant la BETA », à laquelle V2/V7/V8 ont déjà dérogé, chacune avec un en-tête justificatif
    — l'empreinte de `V1` est déjà enregistrée par Flyway sur l'environnement de recette persistant).
  - **Reprise des données existantes** : les templates créés par `save-as-template` avant cette US
    portent un `tenant_id` non nul et sont de fait visibles de toute l'organisation. Les basculer en
    `PRIVATE` **retirerait** un accès existant ; la migration les initialise donc en
    `visibility = 'TENANT'` pour préserver le comportement observé, et laisse `owner_id` à `NULL`
    tant que le créateur n'est pas récupérable (aucune trace d'auteur n'est conservée aujourd'hui).
    À la date de rédaction, la base de recette n'en contient **qu'un seul**, nommé « (recette) ».
- **Frontend `pivot-ui`** (`projects/collaboratif-ui`) : panneau de partage ouvert depuis la galerie
  de templates, sur le patron de `share-panel` (partage de tableau) — choix de visibilité en boutons
  radio, ajout de destinataires, tableau des personnes avec retrait par ligne.
- **i18n** : clés `whiteboard.template.share.*` (`fr.json` / `en.json`), aucune chaîne littérale.
- Dépend d'**US08.13.2** (introduit `owner_id` et la notion de template personnel) et d'**US08.4.1**
  (galerie de templates). Complète **US08.2.4** (`save-as-template`), dont le comportement
  « visible par tout le tenant » devient explicite et modifiable au lieu d'être implicite.

---
Item Type: US · Parent: F08.13 · Module: whiteboard · Phase: Socle · Size: L · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Décision mainteneur du 2026-07-21 — fonctionnement cible de type Klaxoon (template personnel, partageable avec l'organisation ou des personnes ciblées), levant la tension entre le partage implicite au tenant de l'implémentation actuelle et le « strictement privé » d'US08.13.2
Dépendances: US08.13.2 (owner_id, template personnel) + US08.4.1 (galerie) — complète US08.2.4 (save-as-template)
