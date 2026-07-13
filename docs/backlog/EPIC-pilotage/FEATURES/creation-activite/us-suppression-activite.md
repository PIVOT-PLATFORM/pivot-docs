# US18.15.8 — Suppression d'une activité

**En tant que** administrateur plateforme
**Je veux** supprimer une activité et l'ensemble de ses éléments liés après confirmation
**Afin de** retirer définitivement une activité et ses données sans suppression accidentelle

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une activité ouverte sur l'écran info général, when je clique sur l'icône « corbeille » du header, then une pop-up « Suppression d'une activité » avec message d'avertissement et boutons Confirmer/Annuler s'affiche | ⬜ |
| Given la pop-up « Suppression d'une activité », when je clique sur « Confirmer », then l'activité est supprimée en cascade avec ses lignes budgétaires, jalons, photos financières, années/montant et risques | ⬜ |
| Given la pop-up « Suppression d'une activité », when je clique sur « Annuler », then aucune suppression n'a lieu | ⬜ |
| Error : given une suppression en échec, system conserve l'activité et ses éléments liés et signale l'échec | ⬜ |
| Security/Gouvernance : la suppression est réservée aux profils admin et GESTION-BUDGET (GPP) ; les autres profils peuvent uniquement Archiver l'activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'archivage d'activité (alternative pour les profils non-admin) fait l'objet de sa propre US.

## Notes d'implémentation
- Module pilotage (OPDN), icône « corbeille » dans le header, accessible sur l'écran info général.
- Suppression en cascade de tous les éléments liés : lignes budgétaires, jalons, photos financières, années/montant, risques.
- Accès : profils admin + GESTION-BUDGET (GPP) ; profils non-admin limités à l'archivage.

---
Item Type: US · Parent: F18.15 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Source: SPEC_OPDN — B.11 Création d'une activité
Dépendances: —
