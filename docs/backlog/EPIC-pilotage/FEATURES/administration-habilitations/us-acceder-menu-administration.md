# US18.8.1 — Accéder au menu d'administration

**En tant que** administrateur de la plateforme
**Je veux** accéder à un menu d'administration réservé à mon rôle
**Afin de** gérer les groupes d'utilisateurs et les listes de référence

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un utilisateur membre du groupe DIVNUM-LISTE-ADMIN-OPPA, when il ouvre l'application, then le menu d'administration lui est visible et accessible | ⬜ |
| Given le menu d'administration ouvert, when j'y navigue, then j'accède à la gestion des groupes d'utilisateurs et à la gestion des listes de référence | ⬜ |
| Error : given un utilisateur non membre du groupe DIVNUM-LISTE-ADMIN-OPPA, when il tente d'accéder au menu ou à une URL d'administration, then l'accès est refusé et le menu n'est pas affiché | ⬜ |
| Security/Gouvernance : l'accès au menu d'administration est strictement conditionné à l'appartenance au groupe DIVNUM-LISTE-ADMIN-OPPA (contrôle côté serveur, pas seulement masquage UI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La mécanique d'habilitation par groupe AD (appartenance, visibilité conditionnelle) est détaillée dans l'enabler dédié.
- Le contenu fonctionnel de la gestion des référentiels est couvert par l'US Gérer les référentiels métiers.

## Notes d'implémentation
- Menu d'administration (module pilotage) réservé au groupe DIVNUM-LISTE-ADMIN-OPPA.
- Point d'entrée vers : gestion des groupes d'utilisateurs et gestion des listes de référence.

---
Item Type: US · Parent: F18.8 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Source: Backlog OPPA (reconstitution v1–v2.1) — US-801
Dépendances: —
