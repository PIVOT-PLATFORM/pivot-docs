# US02.1.2 — Préférence de langue

**En tant que** utilisateur connecté
**Je veux** choisir ma langue préférée (FR/EN) dans mon profil
**Afin de** avoir l'interface dans ma langue sans devoir la rechoisir à chaque connexion

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| Champ `preferredLanguage` (FR/EN) sauvegardé en BDD sur l'entité User | ⬜ |
| PATCH /api/account/profile accepte `preferredLanguage` | ⬜ |
| Au login, la langue préférée est chargée et appliquée dans Transloco | ⬜ |
| Sélecteur de langue visible dans la page profil | ⬜ |
| Conflit source de vérité : à la connexion, la préférence BDD écrase le localStorage si différente | ⬜ |
| Sélecteur de langue navbar (si connecté) met à jour localStorage ET appelle PATCH /api/account/profile | ⬜ |
| Après enregistrement, interface bascule instantanément dans la nouvelle langue ; toast de confirmation affiché dans la nouvelle langue | ⬜ |
| Si sauvegarde échoue (erreur réseau), langue revient à l'état précédent + toast "error" | ⬜ |
| Sélecteur est <select> natif ou composant custom avec role="listbox" + aria-label="Langue préférée" ; langue courante aria-selected="true" | ⬜ |
| Sélecteur opérable au clavier (Tab, Enter, flèches directionnelles) | ⬜ |
| Tous textes du sélecteur et confirmations internalisés dans account.preferences.* (fr.json / en.json) | ⬜ |

## Hors périmètre
- Détection automatique de la langue navigateur → comportement existant (non connecté)

---
Item Type: US · Parent: F02.1 · Module: auth · Phase: MVP · Size: XS · Priority: Low
Stage: Backlog
