# US18.14.4 — Affichage des activités archivées

**En tant que** utilisateur final
**Je veux** afficher les activités archivées via une case dédiée
**Afin de** consulter les activités qui sont masquées par défaut

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'écran de recherche d'activités, when je coche la case « Afficher les archives », then les activités archivées apparaissent dans la liste | ⬜ |
| Given le filtre « Statut des activités », when je l'ouvre, then il contient l'option « Archivé » | ⬜ |
| Given la case décochée, when la liste s'affiche, then les activités archivées restent masquées par défaut | ⬜ |
| Error : given aucune activité archivée, system affiche la liste sans erreur lorsque la case est cochée | ⬜ |
| Security/Gouvernance : seul un utilisateur habilité peut afficher les activités archivées | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'archivage d'une activité (couvert par l'US portefeuille — sélection & affichage).

## Notes d'implémentation
- Module pilotage (OPDN), case « Afficher les archives » sur l'écran de recherche.
- Option « Archivé » disponible dans le filtre « Statut des activités ».

---
Item Type: US · Parent: F18.14 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.10 Recherche d'activités
Dépendances: —
