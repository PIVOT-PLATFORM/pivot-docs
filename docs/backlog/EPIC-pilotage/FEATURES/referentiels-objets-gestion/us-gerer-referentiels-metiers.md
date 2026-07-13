# US18.7.3 — Gérer les référentiels métiers

**En tant que** administrateur de la plateforme
**Je veux** ajouter et modifier les valeurs des référentiels métiers (Produits, Objets de gestion, Contrats, Statuts d'activités, Typologies…)
**Afin de** maintenir des listes de référence cohérentes et à jour pour l'ensemble du module

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le menu de gestion des référentiels, when je choisis un référentiel (Produits, Objets de gestion, Contrats, Statuts d'activités, Typologies…), then je peux ajouter une nouvelle valeur ou modifier une valeur existante | ⬜ |
| Given une valeur de référentiel ajoutée ou modifiée, when j'enregistre, then la valeur devient immédiatement disponible dans les listes de sélection des écrans concernés | ⬜ |
| Error : given un libellé ou un code en doublon ou obligatoire manquant, system bloque l'enregistrement et signale le champ en cause | ⬜ |
| Security/Gouvernance : seul l'administrateur de la plateforme peut ajouter ou modifier les valeurs des référentiels métiers | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les mises à jour automatisées des objets de gestion (OI, EOTP) et des produits sont couvertes par leurs US dédiées.
- La visibilité conditionnelle du menu d'administration selon les groupes AD est couverte par l'enabler Habilitations par groupe AD.

## Notes d'implémentation
- Écran de gestion des référentiels métiers (module pilotage) : listes de référence éditables (ajout / modification).
- Une valeur désactivée reste rattachée aux enregistrements existants mais n'est plus proposée à la sélection.

---
Item Type: US · Parent: F18.7 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Source: Backlog OPPA (reconstitution v1–v2.1) — US-703
Dépendances: —
