# US08.4.1 — Utilisateur crée un tableau depuis un template

**En tant que** utilisateur
**Je veux** choisir un template pour initialiser mon tableau
**Afin de** démarrer plus vite avec une structure prédéfinie

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
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

---
Item Type: US · Parent: F08.4 · Module: whiteboard · Phase: MVP · Size: M · Priority: Medium
Human Gate: needs-human-valid · Stage: Backlog
