# US18.7.2 — Mettre à jour les produits

**En tant que** administrateur de la plateforme
**Je veux** mettre à jour le référentiel des produits
**Afin de** que les activités soient rattachées à des produits valides et à jour

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le référentiel des produits, when la mise à jour s'exécute, then les produits sont créés, modifiés ou désactivés conformément à la source de référence | ⬜ |
| Given un produit mis à jour, when je consulte le référentiel, then le produit reflète son état le plus récent (libellé, code, statut actif/inactif) | ⬜ |
| Error : given une donnée produit invalide ou une source indisponible, system journalise l'échec, conserve l'état précédent et n'applique pas de mise à jour partielle | ⬜ |
| Security/Gouvernance : seul l'administrateur de la plateforme (ou le processus automatique habilité) peut mettre à jour le référentiel des produits | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La mise à jour des objets de gestion (OI, EOTP) est couverte par l'US dédiée.
- Le rattachement d'un produit à une activité relève des écrans d'informations structurelles de l'activité.

## Notes d'implémentation
- Référentiel des produits (module pilotage) alimenté par mise à jour.
- Un produit désactivé reste rattaché aux activités existantes mais n'est plus proposé à la sélection.

---
Item Type: US · Parent: F18.7 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Source: Backlog OPPA (reconstitution v1–v2.1) — US-702
Dépendances: —
