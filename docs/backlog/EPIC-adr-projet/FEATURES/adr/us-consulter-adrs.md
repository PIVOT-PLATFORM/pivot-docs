# US24.1.2 — Consulter et rechercher les ADRs d'un projet

**En tant que** membre de l'équipe projet
**Je veux** consulter et rechercher les ADRs du projet
**Afin de** comprendre les décisions architecturales prises

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet ayant des ADRs, when le membre liste les ADRs, then GET `/api/pilotage/roadmap/projects/{id}/adrs` retourne une liste paginée, filtrable par statut, affichée en vue Angular avec badge de statut et aperçu de la décision | ⬜ |
| Given une recherche full-text sur titre, contexte ou décision, when l'utilisateur lance la recherche, then les ADRs pertinents sont retournés et la vue détail affiche contexte, décision, conséquences et historique des versions | ⬜ |
| Error : given un paramètre de pagination invalide (page négative, limite hors bornes), system retourne 400 | ⬜ |
| Security : seuls les membres de l'équipe rattachée au projet peuvent consulter ses ADRs ; toute autre requête retourne 403 | ⬜ |
| A11y : la liste et la vue détail des ADRs sont navigables au clavier, le badge de statut n'est pas porté uniquement par la couleur | ⬜ |

## Hors périmètre
- La création, modification et suppression d'ADR sont couvertes par US24.1.1 (US24.1.2 est lecture seule).
- Le classement/scoring de pertinence avancé de la recherche full-text (au-delà d'un matching standard) n'est pas couvert.

## Notes d'implémentation
- Dépend de US24.1.1 pour l'existence des ADRs et du modèle de données (statuts, lien successeur).
- Recherche full-text sur titre + contexte + décision : s'appuyer sur les capacités full-text de PostgreSQL (schéma `pilotage`) plutôt qu'un moteur externe, cohérent avec la stack existante.
- Frontend `pivot-pilotage-ui`, consomme `@pivot/ui-core` + `@pivot/design-system` pour badges de statut et vue détail.

---
Item Type: US · Parent: F24.1 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: macro:ingenierie-developpement
Dépendances: US24.1.1
