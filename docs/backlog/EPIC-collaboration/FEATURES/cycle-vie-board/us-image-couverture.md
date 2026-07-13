# US08.13.3 — Image de couverture de tableau

**En tant que** owner d'un tableau
**Je veux** définir une image de couverture pour mon tableau
**Afin de** l'identifier visuellement d'un coup d'œil dans la liste des tableaux

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given je suis owner d'un tableau, when je sélectionne une image de couverture depuis la modal Paramètres, then l'image est encodée côté client en `data:` URL (base64) et persistée via `PATCH /api/collaboratif/whiteboard/boards/{boardId}` dans le champ `coverImage` (String nullable) — **aucune route serveur d'upload dédiée** | ⬜ |
| Given une image de couverture définie, when la liste des tableaux ou l'en-tête du canvas est affiché, then la couverture est rendue (source = la `data:` URL stockée) | ⬜ |
| Given un tableau avec couverture, when je choisis de la retirer, then `PATCH .../boards/{boardId}` envoie `coverImage: null` explicite et l'image est effacée | ⬜ |
| Given un fichier image sélectionné, when sa taille encodée dépasse **1,5 Mo** (`1.5 * 1024 * 1024` octets), then la sélection est refusée côté client avant tout appel réseau, avec un message explicite ("Fichier trop volumineux") — aucun `PATCH` n'est émis | ⬜ |
| Error : given un échec réseau ou 5xx lors du `PATCH` de couverture, when la requête échoue, then l'aperçu revient à l'état précédent + toast `role="alert"` — pas de mise à jour optimiste non confirmée | ⬜ |
| Error : given un appel API direct (hors UI) portant un `coverImage` dépassant la limite serveur générique (`bodyLimit` du framework, non redéfini sur cette route), when le corps est trop gros, then le serveur répond **413 générique** (pas le message métier "Fichier trop volumineux", qui n'existe que côté client) — comportement de parité assumé | ⬜ |
| Error : given un `boardId` inexistant ou cross-tenant, when le `PATCH` couverture est appelé, then 404 (convention anti-énumération) | ⬜ |
| Security : tenantId résolu exclusivement depuis le SecurityContext (token opaque) — jamais depuis le path ou le body ; seul l'OWNER peut modifier la couverture (même garde `isBoardOwner` que le reste de `PATCH /boards/{id}`), EDITOR/VIEWER → 403 | ⬜ |
| Security : le champ `coverImage` n'accepte qu'une `data:` URL d'image ; la valeur est rendue via une source d'image contrôlée (jamais injectée en HTML brut / `innerHTML`) pour éviter toute exécution de contenu — test vérifiant qu'une valeur non-image n'est pas exécutée | ⬜ |
| A11y : le déclencheur de sélection est un bouton natif focusable avec `aria-label="Choisir une image de couverture"` ; l'image rendue porte un `alt` significatif (ex. "Couverture du tableau [titre]") ; l'action "Retirer la couverture" est accessible au clavier | ⬜ |
| Tests TI : PATCH `coverImage` (owner → 200, editor/viewer → 403, cross-tenant → 404), retrait via `coverImage: null`, corps surdimensionné → 413 générique | ⬜ |
| Tests Vitest : refus client au-delà de 1,5 Mo (aucun appel réseau), encodage `data:` URL, retrait de couverture, rollback de l'aperçu sur erreur réseau | ⬜ |

## Hors périmètre

- Route serveur d'upload de fichier dédiée (multipart, stockage objet/blob) : le POC ne stocke la couverture qu'en `data:` URL base64 dans le champ `coverImage` via le `PATCH` board générique — reproduit tel quel, pas de service de stockage d'assets ici
- Redimensionnement / recompression serveur de l'image : le contrôle de taille (1,5 Mo) et tout traitement d'image sont côté client uniquement
- Message métier serveur "Fichier trop volumineux" : le serveur ne renvoie qu'un 413 générique du framework ; le message métier reste une garde client (asymétrie assumée, §6 constat 12)
- Galerie de couvertures prédéfinies : hors scope, sélection depuis un fichier local uniquement

## Notes d'implémentation

- Backend `pivot-collaboratif-core` : aucun nouvel endpoint — `coverImage` transite par le `PATCH /api/collaboratif/whiteboard/boards/{boardId}` existant (US08.2.4 / US08.1.4), en `String?` sans contrainte serveur de taille/format ; seul le `bodyLimit` par défaut du framework s'applique (413 générique au dépassement)
- La limite **1,5 Mo** (`1.5 * 1024 * 1024`) est une garde **client** (équivalent du `board-settings-modal` du POC), l'image y étant lue et encodée en `data:` URL base64 avant envoi
- Frontend `pivot-collaboratif-ui` : sélecteur de couverture dans `BoardSettingsModalComponent` (US08.2.4) ; rendu de la couverture sur `BoardCardComponent` (liste, US08.1.3) et éventuellement l'en-tête du canvas ; rendu via source d'image bindée, jamais `[innerHTML]`
- i18n : clés `whiteboard.board.cover.*` (fr.json / en.json), dont le message de dépassement de taille client
- Cohérence : le champ `coverImage` existe déjà au modèle `Board` (US08.1.1 / EN08.4) — cette US en câble la définition et le rendu, pas la colonne

---
Item Type: US · Parent: F08.13 · Module: whiteboard · Phase: Socle · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.1, §2.7, §7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: US08.2.4 (modal Paramètres OWNER, contrat PATCH board réutilisé), US08.1.3 (carte de tableau dans la liste, rendu de la couverture), US08.1.4 (renommer/PATCH board)
