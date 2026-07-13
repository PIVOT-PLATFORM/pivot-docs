# US18.19.9 — Créer un jalon

**En tant que** chef de projet (pilote d'activité)
**Je veux** créer un jalon via « + Nouveau Jalon » ou par duplication
**Afin d'** ajouter un jalon manquant à l'activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'écran Jalon, when je clique sur « + Nouveau Jalon » ou que je duplique un jalon, then un pop-up « Ajouter un jalon » s'ouvre avec un champ « Type de jalon » (liste obligatoire) | ⬜ |
| Given une duplication, when le pop-up s'ouvre, then le « Type de jalon » est pré-rempli avec le type dupliqué mais reste modifiable | ⬜ |
| Given un type sélectionné, when le pop-up s'affiche, then il propose les champs selon le type : B/C/D → date de passage + date de sécurisation + avis ; A et autres → date de passage ; J6/J7 selon leur structure | ⬜ |
| Given le champ « Type de jalon », when je l'ouvre, then il propose la liste REF_JALONS : Revue DivNum, Jalon A, CT Cadrage, Jalon B, AIP, ARIS, BIPSE, CATE, CT Conception, Jalon C, J3-Recette, J4-AQR, J5-Pré-PROD, J6-MEP, J7-MES, Jalon D, Jalon E | ⬜ |
| Error : given un « Type de jalon » non renseigné, system bloque la création (champ obligatoire) | ⬜ |
| Security/Gouvernance : la création d'un jalon reste soumise aux droits de l'utilisateur sur l'activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La validation et la copie de référence planning/budget sont couvertes par l'US dédiée.

## Notes d'implémentation
- Pop-up « Ajouter un jalon » (module pilotage, onglet Jalon) ; Type de jalon obligatoire issu de REF_JALONS ; champs affichés selon le type ; duplication pré-remplit le type modifiable.

---
Item Type: US · Parent: F18.19 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.16 Activité — écran Jalons
Dépendances: —
