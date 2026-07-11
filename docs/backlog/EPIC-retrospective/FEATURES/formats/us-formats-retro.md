# US20.2.1 — Formats de rétrospective prédéfinis et format custom

**En tant que** Scrum Master
**Je veux** choisir parmi des formats de rétro prédéfinis ou créer un format sur mesure
**Afin d'** adapter le format de la rétro au contexte de l'équipe

## Contrat — catalogue de formats

Un **format** est une liste ordonnée de **colonnes** : `{ key, label, color, description, icon }`
(`icon` seul est optionnel). Un format expose lui-même `{ key, label, system, columns }` —
`system = true` pour les 4 formats prédéfinis (immuables, catalogue de données compilé côté
backend, jamais de ligne BDD), `system = false` pour un format custom créé par un tenant
(persisté, `key` = son UUID généré serveur). Les deux se consomment de façon identique côté
client — un seul type `RetroFormatDefinition`, pas de branchement par forme.

| Format (`key`) | Colonnes (`key` — `label`) |
|-----------------|---------------------------|
| `START_STOP_CONTINUE` | `START` – Commencer · `STOP` – Arrêter · `CONTINUE` – Continuer |
| `KIF_KAF` | `KIF` – Kept It Famous · `KAF` – Killed A Feature |
| `FOUR_L` | `LIKED` – Liked · `LEARNED` – Learned · `LACKED` – Lacked · `LONGED_FOR` – Longed For |
| `MAD_SAD_GLAD` | `MAD` – Frustrant · `SAD` – Décevant · `GLAD` – Satisfaisant |

Un format custom : 2 à 8 colonnes, chacune définie par un `label` (obligatoire) ; `color`/
`description`/`icon` optionnels côté requête — valeur par défaut serveur si absents (couleur
issue d'une palette tournante par position, description/icon `null`). La `key` de chaque colonne
est dérivée du `label` (slug majuscule ASCII), désambiguïsée par suffixe numérique en cas de
collision au sein du même format — cette `key` est celle que US20.1.2a persistera plus tard dans
`retro_cards.column_key`.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un appelant authentifié (tout membre du tenant, pas seulement de l'équipe), when il appelle `GET /api/agilite/retro/formats`, then la réponse contient `{ "formats": [...] }` — les 4 formats système + les formats custom déjà créés pour son tenant, chacun `{ key, label, system, columns }`, `columns` = liste ordonnée `{ key, label, color, description, icon }` | ⬜ |
| Given le format `START_STOP_CONTINUE`, when il est résolu (catalogue interne ou `GET /formats`), then il expose exactement 3 colonnes dans l'ordre `START` (Commencer) · `STOP` (Arrêter) · `CONTINUE` (Continuer), chacune avec `color`/`description`/`icon` renseignés | ⬜ |
| Given le format `KIF_KAF`, when il est résolu, then il expose exactement 2 colonnes `KIF` (Kept It Famous) · `KAF` (Killed A Feature) | ⬜ |
| Given le format `FOUR_L`, when il est résolu, then il expose exactement 4 colonnes `LIKED` (Liked) · `LEARNED` (Learned) · `LACKED` (Lacked) · `LONGED_FOR` (Longed For) | ⬜ |
| Given le format `MAD_SAD_GLAD`, when il est résolu, then il expose exactement 3 colonnes `MAD` (Frustrant) · `SAD` (Décevant) · `GLAD` (Satisfaisant) | ⬜ |
| Given un appelant authentifié, when il appelle `POST /api/agilite/retro/formats` avec `{ label, columns: [{label, color?, description?, icon?}, …] }` (2 à 8 entrées), then un format custom est créé pour son tenant — `key` générée (UUID), `system: false`, chaque colonne reçoit une `key` slug dérivée de son `label` (dédupliquée si collision), `color`/`description`/`icon` par défaut si non fournis | ⬜ |
| Given un format custom fraîchement créé, when `GET /formats` est rappelé par le même tenant, then ce format apparaît dans la liste avec `system: false` et les colonnes exactement telles que créées | ⬜ |
| Given un format custom du tenant A, when un appelant du tenant B appelle `GET /formats`, then ce format n'apparaît pas dans sa liste (isolation tenant, jamais de fuite cross-tenant même en lecture) | ⬜ |
| Given un format custom existant du tenant courant, when `POST /sessions` est appelé avec `format: "CUSTOM"` et `customFormatId` = sa clé, then la session est créée avec ce `customFormatId` persistant sur `RetroSession`, exposé (non `null`) dans `RetroSessionResponse` | ⬜ |
| Given un format parmi les 4 valeurs prédéfinies (`format` ≠ `CUSTOM`), when `POST /sessions` est appelé sans `customFormatId`, then le comportement de US20.1.1 reste inchangé — `customFormatId` reste `null` dans la réponse | ⬜ |
| Error case: given `POST /formats` avec 0 ou 1 colonne, when la requête est traitée, system retourne 400 `CUSTOM_FORMAT_INVALID_COLUMN_COUNT` — couvre explicitement le cas « format CUSTOM sans colonnes définies » de l'outline initiale | ⬜ |
| Error case: given `POST /formats` avec plus de 8 colonnes, system retourne 400 `CUSTOM_FORMAT_INVALID_COLUMN_COUNT` | ⬜ |
| Error case: given `POST /formats` avec `label` de format vide ou > 60 caractères, system retourne 400 `INVALID_FORMAT_LABEL` | ⬜ |
| Error case: given `POST /formats` avec le `label` d'une colonne vide ou > 40 caractères, system retourne 400 `INVALID_COLUMN_LABEL` | ⬜ |
| Error case: given `POST /sessions` avec `format: "CUSTOM"` et `customFormatId` absent/vide, system retourne 400 `CUSTOM_FORMAT_ID_REQUIRED` | ⬜ |
| Error case: given `POST /sessions` avec `format: "CUSTOM"` et `customFormatId` inexistant ou appartenant à un autre tenant, system retourne 404 `CUSTOM_FORMAT_NOT_FOUND` (jamais de confirmation d'existence cross-tenant — même politique que `teamId` en US20.1.1) | ⬜ |
| Error case: given `POST /sessions` avec `format` ≠ `CUSTOM` et `customFormatId` fourni (non nul), system retourne 400 `CUSTOM_FORMAT_ID_NOT_ALLOWED` — rejeté explicitement plutôt qu'ignoré silencieusement (ambiguïté d'intention) | ⬜ |
| Error case: given un appelant non authentifié, when il appelle `GET /formats` ou `POST /formats`, system retourne 401 — contrairement à `GET /sessions/join/{joinCode}` (US20.1.1), aucun endpoint de ce contrat n'est public | ⬜ |
| Security: `tenantId` extrait exclusivement du token porteur (`RequestPrincipal`) sur `GET /formats`, `POST /formats`, et pour la résolution de `customFormatId` dans `POST /sessions` — jamais du body/query/header | ⬜ |
| Security — **format système structurellement non modifiable** : aucune route n'accepte de `key` choisie par le client pour un format custom (toujours générée serveur, UUID) — il est donc structurellement impossible de cibler/écraser l'une des 4 clés système ; aucun endpoint `PUT`/`PATCH`/`DELETE` n'existe sur `/formats/{key}`, garantie par construction (même logique que l'anonymat schéma de US20.1.1 — pas seulement documentée) | ⬜ |
| Test TI: une requête `PUT`/`PATCH`/`DELETE` vers `/api/agilite/retro/formats/START_STOP_CONTINUE` (ou toute autre clé système) retourne 404/405 — aucune route mappée, confirmant l'absence structurelle de chemin de mutation | ⬜ |
| Test TI cross-tenant: un `customFormatId` valide du tenant A utilisé par un appelant du tenant B dans `POST /sessions` retourne 404 `CUSTOM_FORMAT_NOT_FOUND` (jamais 403) | ⬜ |
| A11y: le sélecteur de format (cartes formats système + entrée "format personnalisé") est intégralement pilotable au clavier (Tab/flèches/Entrée), chaque carte annonce au lecteur d'écran son nom et le nombre de colonnes qu'elle propose | ⬜ |
| A11y: le constructeur de colonnes du format custom (ajout/suppression dynamique de champs, 2 à 8 bornés) annonce les changements via une région `aria-live`, chaque champ colonne a un `<label>` explicite, et le focus est géré correctement après ajout/suppression (pas de perte de focus, pas de saut inattendu) | ⬜ |

## Hors périmètre

- Résolution des colonnes effectives d'une session via un endpoint dédié (ex. `GET /sessions/{id}/columns`) — non demandé ici ; US20.1.2a résout les colonnes directement à partir de `format`/`customFormatId` de la session (catalogue interne ou format custom persisté), sans endpoint intermédiaire, sauf besoin ultérieur avéré
- Modification ou suppression d'un format custom après création — non demandée, ticket dédié si le besoin apparaît (formats custom immuables une fois créés dans cette première version, tout comme les formats système)
- Réordonnancement/renommage des 4 formats système — jamais permis, immuables par construction (catalogue de données compilé, aucune route de mutation)
- Limite du nombre de formats custom par tenant — non demandée, aucun garde-fou dans cette US (à réévaluer si abus constaté en usage réel)
- Persistance/logique métier de `retro_cards` et validation de `column_key` soumis contre les colonnes réelles de la session → US20.1.2a, qui consomme ce catalogue sans le redéfinir

## Notes d'implémentation

- **Catalogue des formats prédéfinis = donnée statique**, pas de logique dispersée par endpoint — un seul point de vérité (ex. classe `RetroFormatCatalog` associant chaque constante `RetroFormat` à sa liste ordonnée de colonnes), consommé à la fois par `GET /formats` et plus tard par la validation de `column_key` de US20.1.2a. Le `RetroFormat` enum de US20.1.1 est inchangé (`CUSTOM` y existait déjà).
- **Nouvelle table `agilite.retro_formats`** (formats custom uniquement — les 4 formats système ne sont jamais des lignes BDD), tenant-scopée, pliée dans `V1__schema_init.sql` (convention fichier unique pré-BETA, cf. `pivot-agilite-core/CLAUDE.md`). Colonnes du format modélisées en enfant (table dédiée ou `@ElementCollection` JPA) avec position ordonnée — au choix du Dev Agent selon les standards du repo, du moment que l'ordre est garanti et que `column_key` est unique au sein d'un même format.
- **Changement coordonné, minimal, sur US20.1.1** : ajout d'une colonne nullable `custom_format_id UUID REFERENCES agilite.retro_formats(id)` sur `agilite.retro_sessions` + champ optionnel `customFormatId` sur `CreateRetroSessionRequest` + `RetroSessionResponse`. Validation croisée (obligatoire si et seulement si `format = CUSTOM`) faite en service, pas en annotation Bean Validation seule — même pattern que la validation manuelle de `format` dans `RetroSessionService.parseFormat`.
- Génération de la `key` de colonne custom : slug ASCII majuscule à partir du `label`, caractères non alphanumériques normalisés/retirés, suffixe numérique (`_2`, `_3`, …) en cas de collision au sein du même format.
- Frontend : sélecteur de format = cartes pour les 4 formats système (aperçu des colonnes) + une entrée "format personnalisé" ouvrant le constructeur de colonnes. Flux recommandé : construire les colonnes → `POST /formats` → utiliser la `key` retournée comme `customFormatId` dans le `POST /sessions` du même formulaire — enchaînement exact (deux appels distincts vs. état intermédiaire) laissé au jugement du Dev Agent tant que le contrat à deux endpoints ci-dessus est respecté.

---
Item Type: US · Parent: F20.2 · Module: agilite · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Dépendances: US20.1.1
