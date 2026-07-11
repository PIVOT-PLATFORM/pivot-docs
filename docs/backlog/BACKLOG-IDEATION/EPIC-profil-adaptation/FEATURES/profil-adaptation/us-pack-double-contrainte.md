# US40.1.6 — Pack double contrainte

**En tant que** DSI d'une entreprise privée sous droit public
**Je veux** disposer d'un pack combinant agilité privée et traçabilité opposable + lien commande publique
**Afin de** couvrir le recouvrement « privé sous droit public », aujourd'hui vide de marché

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le profil « Privée sous droit public », when le pack est activé, then agilité (produit/agile) et traçabilité opposable (arbitrages horodatés, lien marchés) coexistent | ⬜ |
| Given un arbitrage, when il est pris, then il est à la fois fluide (agile) et tracé de façon opposable (audit/CRC) | ⬜ |
| Error : given un profil différent de « Privée sous droit public », when une tentative d'activation du pack double contrainte est faite, then l'activation est refusée (pack réservé à ce profil, cf. frontmatter `Profils`) | ⬜ |
| Security/Gouvernance : un arbitrage horodaté et son lien vers la commande publique (marché) sont immuables une fois tracés (non modifiables a posteriori) et la classe de souveraineté du profil (US40.1.3, typiquement B/C) encadre l'hébergement des preuves d'audit/CRC | ⬜ |
| A11y : l'écran de saisie/consultation des arbitrages tracés est navigable au clavier et conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La gestion complète de la commande publique (dématérialisation des marchés, mise en concurrence) n'est pas couverte — seul le lien arbitrage↔marché est traité.
- L'articulation générique terrain/pilotage est couverte par US40.1.5 ; cette US se limite au pack spécifique du profil « Privée sous droit public ».
- Pas de définition ici de la classe de souveraineté elle-même — le pack consomme la classe déjà dérivée par US40.1.3.

## Notes d'implémentation
- Backend `pivot-pilotage-core` (schéma Flyway `pilotage`) : le pack combine les entités agiles (produit/backlog) existantes avec un module de traçabilité opposable dédié (arbitrages horodatés, immuables, liés à un identifiant de marché).
- Réservé exclusivement au profil « Privée sous droit public » (cf. frontmatter `Profils`) — le guard module (US40.1.2) doit empêcher son activation pour tout autre profil.
- L'immuabilité des arbitrages tracés (AC Security) implique un stockage en append-only ou équivalent (pas d'update destructif), à définir en cohérence avec le schéma Flyway `pilotage`.
- Frontend `pivot-pilotage-ui`, consomme `@pivot/ui-core` + `@pivot/design-system` pour l'écran de saisie/consultation des arbitrages.

---
Item Type: US · Parent: F40.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: directeur-des-systemes-d-information
Source: PP-A06 · MoSCoW: Should · Lot: Lot 3 · Origine: Synthèse v2
Profils: Privée sous droit public
Justification: Synthèse v2 §5 + Insight I6 : vide de marché
Dépendances: EN18.9 (modèle Application→Projet)
