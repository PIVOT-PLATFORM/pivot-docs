# US18.19.1 — Création de l'écran Jalon

**En tant que** chef de projet (pilote d'activité)
**Je veux** accéder à un onglet Jalon initialisé avec les blocs jalons par défaut
**Afin de** disposer d'un écran structuré pour piloter les jalons de l'activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une activité de type BUILD, GRP ou TRANSVERSE, when j'ouvre l'onglet Jalon, then l'écran affiche un header, un bouton « + Nouveau Jalon », un bouton « Enregistrer » et un champ « commentaire général » (texte, 200 caractères max) | ⬜ |
| Given la création de l'écran Jalon, when il s'initialise, then les blocs jalons sont créés par défaut dans l'ordre : Revue DivNum, Jalon A, Comité Technique cadrage, Jalon B, Comité Technique conception, Jalon C, J6 - Mise en Production (MEP), J7 - Mise en Service (MES), Jalon D | ⬜ |
| Given les blocs jalons créés par défaut, when l'écran s'affiche, then les champs date de passage et avis sont vides à la création | ⬜ |
| Error : given une activité dont le type n'ouvre pas droit à l'onglet Jalon, system n'affiche pas l'onglet Jalon | ⬜ |
| Security/Gouvernance : l'onglet Jalon n'est accessible que pour les activités de type BUILD, GRP et TRANSVERSE | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le détail de la structure de chaque bloc jalon et les règles de validation sont couverts par les US dédiées.

## Notes d'implémentation
- Onglet Jalon de l'écran Activité (module pilotage) ; blocs par défaut instanciés à la création, champs date/avis vides.
- Commentaire général limité à 200 caractères.

---
Item Type: US · Parent: F18.19 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.16 Activité — écran Jalons
Dépendances: —
