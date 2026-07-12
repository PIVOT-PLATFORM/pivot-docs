# US51.1.1 — Card Identités & sessions

**En tant que** administrateur de la plateforme
**Je veux** une card « Identités & sessions » sur mon cockpit
**Afin de** voir d'un coup d'œil les comptes, rôles et sessions actives de mon tenant

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un admin authentifié consulte son cockpit, when la card se charge, then elle affiche le nombre de comptes actifs et la répartition par rôle (source `GET /admin/users`) | ⬜ |
| Given des sessions actives existent, when la card est affichée, then elle montre le nombre de sessions en cours et le fournisseur d'authentification (mot de passe / Google / OIDC entreprise) | ⬜ |
| Given l'admin clique l'action contextuelle, when il l'active, then il est routé vers la gestion des utilisateurs / sessions (drill-down), jamais d'action destructrice en un clic | ⬜ |
| Empty : given aucun compte hors l'admin courant, when la card se charge, then l'état `empty` affiche un message d'amorçage (inviter un utilisateur) | ⬜ |
| Error : given l'API échoue après réessais, when le chargement échoue, then l'état `error` s'affiche avec réessai, sans donnée périmée | ⬜ |
| Security : given une identité externe pure, when le cockpit se compose, then cette card est `○` masquée (donnée d'identité, sensibilité 🔴 IAM) — filtre EN51.5 | ⬜ |
| A11y : valeurs et tendances annoncées (aria-label i18n FR/EN), contrastes AA, navigation clavier | ⬜ |

## Hors périmètre

- La gestion CRUD des utilisateurs (couverte par E06) — la card ne fait que **consulter** et router.

## Notes d'implémentation

- Source confirmée : `AdminUserController` (`GET /admin/users` + rôle/statut), `SessionController`,
  `OidcAuthController` (`pivot-core`, E01/E06 livrés).
- Card construite via EN51.1 (composant) + EN51.2 (composition) + EN51.5 (filtre d'accès).

---
Item Type: US · Parent: F51.1 · Module: core · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Dépendances: EN51.1, EN51.2, EN51.4, EN51.5, E01, E06
