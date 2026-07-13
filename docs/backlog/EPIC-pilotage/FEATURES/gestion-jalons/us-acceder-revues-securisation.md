# US18.3.8 — Accéder aux revues de sécurisation (Jalons B, C, D)

**En tant que** chef de projet (pilote d'activité)
**Je veux** un accès direct au dossier SharePoint des revues de sécurisation des jalons B, C et D
**Afin de** consulter rapidement les documents de sécurisation

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given les jalons B, C et D, when j'active l'accès aux revues, then j'ouvre directement le dossier SharePoint des revues de sécurisation correspondant | ⬜ |
| Given le lien vers SharePoint, when je l'active, then la navigation se fait sans étape intermédiaire superflue | ⬜ |
| Error : given un dossier SharePoint inaccessible ou un lien indisponible, system signale l'indisponibilité sans bloquer la vue jalons | ⬜ |
| Security/Gouvernance : l'accès au dossier SharePoint reste soumis aux droits SharePoint de l'utilisateur | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La gestion des permissions SharePoint et le contenu des revues ne sont pas couverts par cette US.

## Notes d'implémentation
- Lien direct vers le dossier SharePoint des revues de sécurisation des jalons B, C, D (module pilotage, intégration externe).

---
Item Type: US · Parent: F18.3 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: Backlog OPPA (reconstitution v1–v2.1) — US-308
Dépendances: —
