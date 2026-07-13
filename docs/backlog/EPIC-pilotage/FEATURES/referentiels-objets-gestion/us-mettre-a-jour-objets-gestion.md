# US18.7.1 — Mettre à jour les objets de gestion (OI, EOTP)

**En tant que** administrateur de la plateforme
**Je veux** tenir à jour les objets de gestion (OI et EOTP) de manière automatisée
**Afin de** garantir que les activités s'appuient sur des objets financiers valides et à jour

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le référentiel des objets de gestion, when la mise à jour automatique s'exécute, then les OI (ordres internes) et les EOTP sont créés, modifiés ou clôturés conformément à la source de référence | ⬜ |
| Given un OI ou un EOTP mis à jour, when je consulte le référentiel, then l'objet reflète l'état le plus récent (libellé, code, statut actif/clôturé) | ⬜ |
| Error : given une source de mise à jour indisponible ou un enregistrement invalide, system journalise l'échec, conserve l'état précédent et n'applique pas de données partielles | ⬜ |
| Security/Gouvernance : seul l'administrateur de la plateforme (ou le processus automatique habilité) peut déclencher ou paramétrer la mise à jour des objets de gestion | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La mise à jour des produits est couverte par l'US Mettre à jour les produits.
- La gestion générale des référentiels métiers (contrats, statuts, typologies) est couverte par l'US Gérer les référentiels métiers.

## Notes d'implémentation
- Référentiel des objets de gestion (module pilotage) : OI et EOTP alimentés par mise à jour automatique.
- Prévoir la traçabilité des mises à jour (création / modification / clôture) et le maintien de l'état antérieur en cas d'échec.

---
Item Type: US · Parent: F18.7 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Source: Backlog OPPA (reconstitution v1–v2.1) — US-701
Dépendances: —
