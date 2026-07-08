# US02.1.2 — Préférence de langue

**En tant que** utilisateur connecté
**Je veux** choisir ma langue préférée (FR/EN) dans mon profil
**Afin de** avoir l'interface dans ma langue sans devoir la rechoisir à chaque connexion

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Champ `preferredLanguage` (FR/EN) sauvegardé en BDD sur l'entité User | ✅ *(réutilise la colonne `locale` existante, promue en CHECK constraint DB — pas de nouvelle colonne, voir notes)* |
| PATCH /api/account/profile accepte `preferredLanguage` | ✅ |
| Au login, la langue préférée est chargée et appliquée dans Transloco | ✅ |
| Sélecteur de langue visible dans la page profil | ✅ |
| Conflit source de vérité : à la connexion, la préférence BDD écrase le localStorage si différente | ✅ |
| Sélecteur de langue navbar (si connecté) met à jour localStorage ET appelle PATCH /api/account/profile | ✅ |
| Après enregistrement, interface bascule instantanément dans la nouvelle langue ; toast de confirmation affiché dans la nouvelle langue | ✅ |
| Si sauvegarde échoue (erreur réseau), langue revient à l'état précédent + toast "error" | ✅ |
| Sélecteur est <select> natif ou composant custom avec role="listbox" + aria-label="Langue préférée" ; langue courante aria-selected="true" | ✅ |
| Sélecteur opérable au clavier (Tab, Enter, flèches directionnelles) | ✅ |
| Tous textes du sélecteur et confirmations internalisés dans account.preferences.* (fr.json / en.json) | ✅ |

## Hors périmètre
- Détection automatique de la langue navigateur → comportement existant (non connecté)

## Notes de livraison

- Implémenté : `pivot-core` PR [#130](https://github.com/PIVOT-PLATFORM/pivot-core/pull/130) (Gate 2 self-évalué : 98/100) · `pivot-ui` PR [#72](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/72) (Gate 2 self-évalué : détail dans la PR).
- **Décision d'architecture** : la colonne `locale` existait déjà sur `User` (utilisée pour les emails transactionnels i18n) — réutilisée plutôt que d'ajouter une seconde colonne `preferred_language`, pour éviter deux sources de vérité sur la même donnée. À valider par le mainteneur.
- **Dépendance de branche** : les deux PR étaient empilées sur les branches de US02.1.1 (PR#129/#71), toutes deux mergées.
- Effet de bord positif côté frontend : un stub `localStorage` ajouté pour les tests a corrigé un test préexistant cassé (`navbar.component.spec.ts`).
- **Statut réel vérifié (2026-07-06) :** `pivot-core` PR #130 et `pivot-ui` PR #72 sont toutes deux mergées sur `main` — resynchronisé de `In progress` à `Review`.

---
Item Type: US · Parent: F02.1 · Module: auth · Phase: Socle · Size: XS · Priority: Low
Stage: Review
Gate 5 : `pivot-core` PR [#130](https://github.com/PIVOT-PLATFORM/pivot-core/pull/130) (Gate 4 = 100/100) · `pivot-ui` PR [#72](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/72) (Gate 4 = 100/100), spec figée `docs/specs/EPIC-espace-compte/us02-1-2-preference-langue.md` (rétroactif, 2026-07-08)
