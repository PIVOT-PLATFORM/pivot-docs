# US08.1.8 — Recherche de tableaux

**En tant que** utilisateur
**Je veux** filtrer mes tableaux par nom ou description depuis un champ de recherche
**Afin de** retrouver rapidement un tableau précis quand j'en ai beaucoup

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la liste des tableaux affichée, when je saisis du texte dans le champ de recherche, then seuls les tableaux dont le titre ou la description contiennent le texte (insensible à la casse et aux accents) restent affichés dans la grille | ⬜ |
| Given un filtre de recherche actif, when je vide le champ, then tous les tableaux chargés réapparaissent (favoris toujours en tête, cf. US08.1.6) | ⬜ |
| Given un filtre de recherche actif, when aucun tableau ne correspond, then un état "Aucun résultat pour « [texte] »" s'affiche à la place de la grille (distinct de l'état vide "Créer mon premier tableau") | ⬜ |
| Given le filtrage est client-only sur les tableaux déjà chargés en page, when de nouvelles pages sont chargées via "Charger plus" pendant qu'un filtre est actif, then les nouveaux tableaux chargés sont également filtrés par le texte courant | ⬜ |
| Given une saisie rapide dans le champ de recherche, when l'utilisateur tape plusieurs caractères successifs, then le filtrage est debouncé (pas de nouveau tri à chaque frappe individuelle) pour rester fluide | ⬜ |
| Error : given le filtrage est purement client (aucun appel réseau additionnel), then aucune erreur réseau n'est possible sur cette action — pas d'AC erreur réseau applicable ; le seul cas d'erreur est un filtre qui ne matche rien, couvert par l'état "Aucun résultat" ci-dessus | ⬜ |
| Security : le filtre s'applique exclusivement sur les tableaux déjà retournés par `GET /boards` (donc déjà scopés tenant + membership côté backend, cf. US08.1.2) — aucune requête de recherche n'est envoyée au serveur, donc aucune fuite cross-tenant possible via ce canal | ⬜ |
| A11y : champ de recherche avec `<label>` explicite ou `aria-label="Rechercher un tableau"`, résultat du filtrage annoncé via une région `aria-live="polite"` (nombre de résultats ou message "Aucun résultat"), navigable au clavier | ⬜ |
| Tests Vitest : filtrage titre, filtrage description, insensibilité casse/accents, debounce, état "Aucun résultat", interaction avec pagination "Charger plus" | ⬜ |

## Hors périmètre

- Recherche côté serveur / pagination sur résultats de recherche au-delà de la page déjà chargée — hors scope Socle, filtre strictement client sur les tableaux déjà en mémoire
- Recherche floue (fuzzy matching), recherche par contenu du canvas, ou recherche par tags — hors scope, simple correspondance de sous-chaîne sur titre/description
- Historique des recherches récentes — hors scope

## Notes d'implémentation

- **Révise la note "Hors périmètre" d'US08.1.3** (`us-liste-tableaux-angular.md`, "Recherche/filtre de tableaux dans la grille : hors scope") : mise en œuvre par cette US, en front-only comme documenté
- Frontend uniquement `pivot-collaboratif-ui` : champ de recherche dans `BoardListComponent` (au-dessus de la grille), filtrage `Array.prototype.filter` sur les boards déjà chargés (`title`/`description`), normalisation accents/casse (`localeCompare` ou `normalize('NFD')`)
- Aucun endpoint backend nouveau — cohérent avec le choix "front-only" du cadrage
- i18n : clés `whiteboard.board.search.*` (fr.json / en.json)
- Source : parité visible vs POC PouetPouet (recherche de tableaux) — décision mainteneur d'extension du Socle noyau F08.x, suite à `docs/audits/audit-recette-fonctionnelle.md`

---
Item Type: US · Parent: F08.1 · Module: whiteboard · Phase: Socle · Size: XS · Priority: Medium
Stage: ✅
Rôle: utilisateur-final
Source: Parité visible PouetPouet (audit recette fonctionnelle Socle, 2026-07-13) — décision mainteneur d'extension du périmètre F08.x « noyau + parité visible ». Révise la note Hors périmètre d'US08.1.3
Dépendances: US08.1.3 (liste tableaux Angular), US08.1.6 (favoris — ordre de tri préservé sous filtre)
