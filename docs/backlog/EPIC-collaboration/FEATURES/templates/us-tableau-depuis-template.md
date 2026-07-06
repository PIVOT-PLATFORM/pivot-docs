# US08.4.1 — Utilisateur crée un tableau depuis un template

**En tant que** utilisateur
**Je veux** choisir un template pour initialiser mon tableau
**Afin de** démarrer plus vite avec une structure prédéfinie

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| GET /api/whiteboard/templates liste les templates disponibles | ⬜ |
| POST /api/whiteboard/boards avec `templateId` initialise le canvas depuis le template | ⬜ |
| Templates disponibles : Vierge, Brainstorm, Retrospective, User Story Map | ⬜ |
| UI : galerie templates dans la modal "Nouveau tableau" | ⬜ |
| Tests TI POST /api/whiteboard/boards?templateId={id} | ⬜ |
| Template "Vierge" retiré de la liste (couvert par US08.1.1 — création sans template) | ⬜ |
| Templates initiaux (Brainstorm, Retrospective, User Story Map) stockés en BDD via seeds Flyway | ⬜ |
| Initialisation = insertion des éléments du template dans la table d'événements canvas du nouveau board | ⬜ |
| Dépendances : US08.1.1 (création de tableau), US08.1.3 (modal "Nouveau tableau") | ⬜ |
| Contenu des templates validé à l'insertion via schéma JSON strict (whitelist : shape, text, image). Champs texte soumis aux mêmes contraintes que les éléments canvas user | ⬜ |
| templateId vérifie que le template est visible par le tenant courant (templates globaux publics OU templates du tenant courant). templateId hors périmètre → 404 | ⬜ |
| Galerie templates : skeleton cards pendant le GET /api/whiteboard/templates (aria-busy="true") | ⬜ |
| Chaque card template : nom, aperçu visuel (img avec alt descriptif), courte description textuelle | ⬜ |
| Card sélectionnée : aria-selected="true" + contour visible contraste ≥ 3:1 | ⬜ |
| Navigation clavier galerie : flèches directionnelles entre cards, Entrée/Espace pour sélectionner | ⬜ |
| Template "Brainstorm" sélectionné par défaut à l'ouverture (ou le premier de la liste) avec aria-selected="true" | ⬜ |
| Après sélection + saisie titre, bouton "Créer" affiche spinner, aria-disabled="true", focus maintenu dans la modal | ⬜ |
| Erreur POST → message inline dans la modal (pas de fermeture) + bouton "Réessayer" | ⬜ |
| Noms et descriptions de templates localisables via i18n (whiteboard.template.*) avec traductions FR et EN | ⬜ |
| Error : GET /api/whiteboard/templates en échec (5xx/réseau) → galerie affiche un état d'erreur non bloquant + bouton "Réessayer" (la modal reste ouvrable, création "Vierge" via US08.1.1 non impactée) | ⬜ |
| Error : templateId de format invalide (UUID malformé) → 400 INVALID_TEMPLATE_ID | ⬜ |
| Tests TI : POST avec templateId d'un autre tenant (non public) → 404 (pas de fuite d'existence, cohérent avec l'IDOR ci-dessus) | ⬜ |

## Hors périmètre

- Bibliothèque étendue de modèles (SWOT, Kanban, parcours client, plan d'action…) : relève de **US30.4.1** (F30.4, `phase-3`, verrouillé).
- Modèles personnalisés à l'image de l'organisation (couleurs, logos) : relève de **US30.4.2** (F30.4, `phase-3`, verrouillé).
- Bibliothèque interne gouvernée (modération, cycle de vie des modèles) : relève de **US30.4.3** (F30.4, `phase-3`, verrouillé).
- Création ou édition d'un template par un utilisateur final (pas d'UI d'authoring dans cette US) — seuls les 3 templates initiaux (Brainstorm, Retrospective, User Story Map) sont disponibles, leur contenu étant seedé en base (voir Notes d'implémentation).
- ⚠️ **Ambiguïté produit non tranchée** : l'AC IDOR ci-dessus distingue déjà "templates globaux publics" et "templates du tenant courant", mais aucune US `Phase: Socle` ne décrit la création d'un template propre à un tenant — ce mécanisme est probablement anticipé pour **US30.4.2** (`phase-3`, verrouillé). À clarifier avant implémentation : si aucun template tenant ne peut exister en Socle, l'AC IDOR devrait être simplifiée (uniquement templates globaux) ; sinon il manque une US Socle pour la création de template tenant.

## Notes d'implémentation

- Endpoints : `GET /api/whiteboard/templates` (liste), `POST /api/whiteboard/boards?templateId={id}` (création depuis template).
- Persistance : table de templates avec `tenant_id` nullable (`NULL` = template global public) ; le contenu des 3 templates initiaux est seedé via migrations Flyway.
- Initialisation du board : insertion des éléments du template dans la table d'événements canvas du nouveau board (mêmes contraintes de validation que les éléments canvas utilisateur — schéma JSON strict whitelist shape/text/image).
- Composant Angular : galerie de templates dans la modal "Nouveau tableau" (dépend de **US08.1.1** création de tableau et **US08.1.3** modal "Nouveau tableau").
- Relation avec F30.4 (`phase-3`, verrouillé) : cette US couvre nativement le socle minimal (catalogue fixe, sans image de marque ni gouvernance) ; F30.4 étend vers modèles personnalisés/organisation quand la phase sera déverrouillée (voir `EPIC-collaboration/README.md`, tableau de correspondance F08.x→F30.x).

---
Item Type: US · Parent: F08.4 · Module: whiteboard · Phase: Socle · Size: M · Priority: Medium
Stage: Ready
