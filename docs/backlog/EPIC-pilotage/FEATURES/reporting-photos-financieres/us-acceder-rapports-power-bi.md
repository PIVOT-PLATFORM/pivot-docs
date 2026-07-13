# US18.9.2 — Accéder aux rapports Power BI

**En tant que** gestionnaire de portefeuille (décideur)
**Je veux** accéder aux rapports Power BI à jour depuis l'application
**Afin de** analyser l'activité et le portefeuille sur des tableaux de bord actualisés

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'accès au reporting, when j'ouvre les rapports Power BI, then les rapports affichés reflètent des données à jour | ⬜ |
| Given un lien vers un rapport Power BI dans l'application, when je le suis, then j'accède au rapport correspondant à mon périmètre d'habilitation | ⬜ |
| Error : given un rapport Power BI indisponible ou un accès refusé côté Power BI, system affiche un message explicite au lieu d'un rapport vide ou d'une erreur brute | ⬜ |
| Security/Gouvernance : seul le gestionnaire de portefeuille habilité accède aux rapports Power BI de son périmètre, conformément aux droits Power BI | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La consultation des instantanés budgétaires internes est couverte par l'US Consulter les photos financières.
- La conception et l'alimentation des rapports Power BI relèvent de la plateforme décisionnelle, hors de cette US.

## Notes d'implémentation
- Intégration / accès aux rapports Power BI (module pilotage) avec respect des habilitations de périmètre.

---
Item Type: US · Parent: F18.9 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: gestionnaire-de-portefeuille
Source: Backlog OPPA (reconstitution v1–v2.1) — US-902
Dépendances: —
