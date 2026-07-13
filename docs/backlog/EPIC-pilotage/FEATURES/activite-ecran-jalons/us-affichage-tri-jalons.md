# US18.19.2 — Affichage et tri des jalons

**En tant que** chef de projet (pilote d'activité)
**Je veux** voir les jalons triés par date de passage puis par type
**Afin de** lire l'écran Jalon dans un ordre chronologique cohérent

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given plusieurs jalons avec date de passage renseignée, when l'écran s'affiche, then les jalons sont triés par date de passage croissante | ⬜ |
| Given des jalons sans date de passage (ou à date identique), when l'écran s'affiche, then le tri applique l'ordre par type : Revue DivNum, Jalon A, CT cadrage, Jalon B, BIPSE, ARIS, AIPD, CATE, CT conception, Jalon C, J3-Recette, J4-AQR, J5-Pré-PROD, J6-MEP, J7-MES, Jalon D, Jalon E | ⬜ |
| Error : given des jalons sans aucune date renseignée, system les affiche selon l'ordre par type sans erreur de tri | ⬜ |
| Security/Gouvernance : le tri d'affichage ne modifie pas les données ni les droits d'accès aux jalons | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La création, la modification et la suppression des jalons sont couvertes par les US dédiées.

## Notes d'implémentation
- Tri primaire par date de passage croissante ; tri secondaire par type selon l'ordre de référence des jalons (module pilotage, onglet Jalon).

---
Item Type: US · Parent: F18.19 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.16 Activité — écran Jalons
Dépendances: —
