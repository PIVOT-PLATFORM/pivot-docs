# US08.2.3 — Angular : UI partage et gestion des rôles

**En tant que** owner d'un tableau
**Je veux** gérer les membres et leurs rôles depuis l'interface Angular
**Afin de** contrôler qui peut modifier ou visualiser mon tableau

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Panneau "Partager" : génération lien + liste membres + rôles | ⬜ |
| Copier le lien d'invitation (clipboard API) | ⬜ |
| Modifier le rôle d'un membre (select EDITOR/VIEWER) | ⬜ |
| Révoquer un membre (DELETE /api/whiteboard/boards/{id}/members/{userId}) | ⬜ |
| Tests Vitest SharePanelComponent | ⬜ |
| L'endpoint de modification de rôle membre (PATCH /api/whiteboard/boards/{id}/members/{userId}/role) vérifie OWNER uniquement. EDITOR ou VIEWER → 403 | ⬜ |
| Le nom du tableau et tous les champs texte affichés dans le panneau partage sont rendus via text content Angular (binding {{ }}) et jamais via [innerHTML]. Test E2E vérifie qu'un nom de tableau contenant <script> est affiché comme texte brut | ⬜ |
| CSP de l'application interdit eval et scripts inline (EN sécurité existant ou à créer) | ⬜ |
| Dialog de confirmation avant révocation d'un membre : role="dialog", aria-modal="true", focus trap | ⬜ |
| Échec réseau ou 5xx (génération de lien, changement de rôle, révocation) → toast `role="alert"` + panneau non modifié tant que la confirmation serveur n'est pas reçue (pas de mise à jour optimiste non confirmée) | ⬜ |
| Échec de la copie du lien (Clipboard API indisponible/refusée) → repli affichant le lien en texte sélectionnable avec message explicite | ⬜ |
| Panneau "Partager" : ouverture avec focus posé sur le premier élément interactif, fermeture par Échap avec retour du focus sur le déclencheur, piège à focus actif tant que le panneau est ouvert | ⬜ |
| Bouton copier lien : `aria-label="Copier le lien d'invitation"`, confirmation "Lien copié" annoncée via `role="status"` | ⬜ |
| Liste des membres structurée sémantiquement (table avec `<th>` ou liste avec rôles ARIA appropriés), chaque select de rôle associé à un `<label>` explicite (nom du membre), navigable entièrement au clavier | ⬜ |

## Hors périmètre

- Gestion de plusieurs liens de partage actifs simultanément dans l'UI (le backend US08.2.1 ne pose pas de limite explicite, mais cette US n'affiche/génère qu'un lien actif à la fois)
- Historique/audit des partages et révocations visible dans l'UI (les événements sont enregistrés côté backend, US08.2.1, sans vue dédiée ici)
- Recherche ou filtrage dans la liste des membres
- Attribution du rôle OWNER via cette UI (transfert de propriété hors périmètre)

## Notes d'implémentation

- Composant Angular `SharePanelComponent`, consomme `POST/DELETE /api/whiteboard/boards/{id}/share` (US08.2.1) et `PATCH/DELETE /api/whiteboard/boards/{id}/members/{userId}` (rôle, révocation)
- Le select de rôle membre n'expose que EDITOR/VIEWER, jamais OWNER — cohérent avec les rôles portés par le token (US08.2.1) et le contrat `board_members` (US08.1.1)
- Libellés internationalisés dans `whiteboard.share.*` (fr.json / en.json), même convention que US08.1.1
- Dépend de US08.2.1 (génération/révocation du lien) et US08.2.2 (jointure) déjà spécifiées côté backend

---
Item Type: US · Parent: F08.2 · Module: whiteboard · Phase: Socle · Size: M · Priority: High
Stage: Done
