# US18.3.6 — Filtrer / isoler un jalon dans la vue planning

**En tant que** chef de projet (pilote d'activité)
**Je veux** cliquer sur l'icône d'un jalon dans le workflow pour l'isoler dans la vue planning
**Afin de** me concentrer sur un jalon précis

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le workflow des jalons, when je clique sur l'icône d'un jalon, then ce jalon est isolé dans la vue planning | ⬜ |
| Given un jalon isolé, when je re-clique sur son icône, then l'isolement est annulé et la vue planning revient à son état complet | ⬜ |
| Error : given un clic répété ou multiple sur les icônes, system maintient un état d'isolement cohérent sans erreur d'affichage | ⬜ |
| Security/Gouvernance : le filtrage d'affichage n'altère pas les données des jalons ni les habilitations d'accès | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La réinitialisation des champs de jalon est couverte par une US dédiée.

## Notes d'implémentation
- Vue planning des jalons (module pilotage) : clic sur icône jalon dans le workflow pour isoler/annuler (toggle).

---
Item Type: US · Parent: F18.3 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: Backlog OPPA (reconstitution v1–v2.1) — US-306
Dépendances: —
