# US02.2.3 — Voir et révoquer ses sessions actives

**En tant que** utilisateur connecté
**Je veux** voir la liste de mes sessions actives (appareil, date, IP) et en révoquer certaines
**Afin de** détecter et stopper les accès non autorisés

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| GET /api/account/sessions retourne la liste des tokens actifs (appareil, IP, créé le, expire le) | ⬜ |
| DELETE /api/account/sessions/{tokenId} révoque un token spécifique | ⬜ |
| DELETE /api/account/sessions révoque toutes les sessions sauf la courante | ⬜ |
| Page Angular liste les sessions avec bouton "Révoquer" | ⬜ |
| Session courante marquée clairement (non révocable via la liste) | ⬜ |
| Tests TU SessionService + TI GET/DELETE | ⬜ |
| DELETE /api/account/sessions/{tokenId} vérifie que le token appartient au userId extrait du token porteur. Token d'un autre utilisateur → 404 (pas 403, ne confirme pas l'existence) | ⬜ |
| GET /api/account/sessions retourne un champ isCurrent: boolean sur la session active de la requête courante | ⬜ |
| DELETE /api/account/sessions/{tokenId} retourne 403 si tokenId est la session courante (protection API, pas uniquement UI) | ⬜ |
| Le champ "appareil" est tronqué à 200 caractères et sanitisé (strip HTML) avant stockage. Frontend affiche via text content Angular, jamais innerHTML | ⬜ |
| État "loading" affiché pendant chargement de la liste (skeleton ou spinner) | ⬜ |
| État "empty state" si aucune autre session active : message "Aucune autre session active" | ⬜ |
| Bouton "Révoquer" d'une session individuelle : dialog de confirmation avant action | ⬜ |
| Bouton "Révoquer toutes les autres sessions" : dialog de confirmation obligatoire (action destructive) | ⬜ |
| Après révocation réussie, toast succès + la session révoquée disparaît de la liste (mise à jour optimiste ou rechargement) | ⬜ |
| En cas d'erreur révocation, toast "error" + la session reste dans la liste | ⬜ |
| Liste des sessions : <ul> ou <table> avec headers ; bouton "Révoquer" a aria-label contextuel ("Révoquer la session depuis [appareil] le [date]") | ⬜ |
| Dialog de confirmation : role="dialog", aria-modal="true", aria-labelledby, focus trap actif | ⬜ |
| Session courante : indicateur visuel ET textuel accessible (pas uniquement icône colorée) | ⬜ |
| Tous textes internalisés dans account.sessions.* (fr.json / en.json) | ⬜ |
| Sur mobile (< 768px), tableau → liste de cartes : IP et date en texte secondaire sous le nom d'appareil | ⬜ |

---
Item Type: US · Parent: F02.2 · Module: auth · Phase: MVP · Size: M · Priority: Medium
Human Gate: human-validated · Stage: Backlog
