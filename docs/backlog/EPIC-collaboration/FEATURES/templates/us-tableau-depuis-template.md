# US08.4.1 — Utilisateur crée un tableau depuis un template

**En tant que** utilisateur
**Je veux** choisir un template pour initialiser mon tableau
**Afin de** démarrer plus vite avec une structure prédéfinie

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| GET /api/whiteboard/templates liste les templates disponibles | ✅ |
| POST /api/whiteboard/boards avec `templateId` initialise le canvas depuis le template | ✅ |
| Templates disponibles : Vierge, Brainstorm, Retrospective, User Story Map | ✅ |
| UI : galerie templates dans la modal "Nouveau tableau" | ✅ |
| Tests TI POST /api/whiteboard/boards?templateId={id} | ✅ |
| Template "Vierge" retiré de la liste (couvert par US08.1.1 — création sans template) | ✅ |
| Templates initiaux (Brainstorm, Retrospective, User Story Map) stockés en BDD via seeds Flyway | ✅ |
| Initialisation = insertion des éléments du template dans la table d'événements canvas du nouveau board | ✅ |
| Dépendances : US08.1.1 (création de tableau), US08.1.3 (modal "Nouveau tableau") | ✅ |
| Contenu des templates validé à l'insertion via schéma JSON strict (whitelist : shape, text, image). Champs texte soumis aux mêmes contraintes que les éléments canvas user | ✅ |
| templateId vérifie que le template est global public (`tenant_id IS NULL`) — aucun template propre à un tenant ne peut exister en Socle (voir résolution Gate 1 ci-dessous). templateId hors périmètre (inexistant ou, si un `tenant_id` non nul apparaissait par anomalie, appartenant à un autre tenant) → 404 | ✅ |
| Galerie templates : skeleton cards pendant le GET /api/whiteboard/templates (aria-busy="true") | ✅ |
| Chaque card template : nom, aperçu visuel (img avec alt descriptif), courte description textuelle | ✅ |
| Card sélectionnée : aria-selected="true" + contour visible contraste ≥ 3:1 | ✅ |
| Navigation clavier galerie : flèches directionnelles entre cards, Entrée/Espace pour sélectionner | ✅ |
| Template "Brainstorm" sélectionné par défaut à l'ouverture (ou le premier de la liste) avec aria-selected="true" | ✅ |
| Après sélection + saisie titre, bouton "Créer" affiche spinner, aria-disabled="true", focus maintenu dans la modal | ✅ |
| Erreur POST → message inline dans la modal (pas de fermeture) + bouton "Réessayer" | ✅ |
| Noms et descriptions de templates localisables via i18n (whiteboard.template.*) avec traductions FR et EN | ✅ |
| Error : GET /api/whiteboard/templates en échec (5xx/réseau) → galerie affiche un état d'erreur non bloquant + bouton "Réessayer" (la modal reste ouvrable, création "Vierge" via US08.1.1 non impactée) | ✅ |
| Error : templateId de format invalide (UUID malformé) → 400 INVALID_TEMPLATE_ID | ✅ |
| Tests TI : POST avec templateId inexistant → 404 ; POST avec templateId valide format UUID mais absent en base → 404 (pas de fuite d'existence) | ✅ |

## Hors périmètre

- Bibliothèque étendue de modèles (SWOT, Kanban, parcours client, plan d'action…) : relève de **US30.4.1** (F30.4, `phase-3`, verrouillé).
- Modèles personnalisés à l'image de l'organisation (couleurs, logos) : relève de **US30.4.2** (F30.4, `phase-3`, verrouillé).
- Bibliothèque interne gouvernée (modération, cycle de vie des modèles) : relève de **US30.4.3** (F30.4, `phase-3`, verrouillé).
- Création ou édition d'un template par un utilisateur final (pas d'UI d'authoring dans cette US) — seuls les 3 templates initiaux (Brainstorm, Retrospective, User Story Map) sont disponibles, leur contenu étant seedé en base (voir Notes d'implémentation).
- Templates propres à un tenant (`tenant_id` non nul) : aucune US `Phase: Socle` ne permet d'en créer — relève de **US30.4.2** (`phase-3`, verrouillé). Voir résolution Gate 1 ci-dessous.

## Résolution Gate 1 (2026-07-07, PO Agent)

Ambiguïté relevée à la lecture : l'AC IDOR distinguait "templates globaux publics" et "templates
du tenant courant", mais aucune US Socle ne décrit la création d'un template propre à un tenant.
**Décision** : en Socle, seuls les templates globaux publics (`tenant_id IS NULL`) existent — les
3 templates seedés. La colonne `tenant_id` reste nullable dans le schéma (cf. Notes
d'implémentation) pour rester extensible sans migration de rupture le jour où US30.4.2
(`phase-3`) débloque la création de templates par tenant, mais aucune ligne à `tenant_id` non nul
n'est produite en Socle — le AC IDOR est donc simplifié : `templateId` doit référencer un template
global existant, sinon `404`. AC et test correspondants mis à jour en conséquence.

## Notes d'implémentation

- Endpoints : `GET /api/whiteboard/templates` (liste), `POST /api/whiteboard/boards?templateId={id}` (création depuis template).
- Persistance : table de templates avec `tenant_id` nullable (`NULL` = template global public) ; le contenu des 3 templates initiaux est seedé via migrations Flyway.
- Initialisation du board : insertion des éléments du template dans la table d'événements canvas du nouveau board (mêmes contraintes de validation que les éléments canvas utilisateur — schéma JSON strict whitelist shape/text/image).
- Composant Angular : galerie de templates dans la modal "Nouveau tableau" (dépend de **US08.1.1** création de tableau et **US08.1.3** modal "Nouveau tableau").
- Relation avec F30.4 (`phase-3`, verrouillé) : cette US couvre nativement le socle minimal (catalogue fixe, sans image de marque ni gouvernance) ; F30.4 étend vers modèles personnalisés/organisation quand la phase sera déverrouillée (voir `EPIC-collaboration/README.md`, tableau de correspondance F08.x→F30.x).

---
Item Type: US · Parent: F08.4 · Module: whiteboard · Phase: Socle · Size: M · Priority: Medium
Stage: Review
Dépendances: US08.1.1, US08.1.3 — `pivot-collaboratif-core` PR
[#31](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/31) (Gate 4 = 100/100,
mergée), `pivot-collaboratif-ui` PR
[#29](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/29) (Gate 4 = 100/100,
mergée) + fix de suivi
[#30](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-ui/pull/30) (thumbnailUrl), spec figée
`docs/specs/EPIC-collaboration/us08-4-1-tableau-depuis-template.md`
