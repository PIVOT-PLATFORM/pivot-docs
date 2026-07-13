# US18.15.6 — Header de l'activité

**En tant que** chef de projet
**Je veux** disposer d'un en-tête d'activité rappelant ses informations clés
**Afin de** garder le contexte de l'activité visible en naviguant entre les onglets

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une activité ouverte, when je consulte le header, then il affiche Nom, Pilote, Statut, Météo, Pôle/Usine et Typologie principale | ⬜ |
| Given l'onglet Informations structurelles, Risques, Jalons ou Budget, when je l'affiche, then le header de l'activité est visible | ⬜ |
| Given l'onglet Informations générales, when je l'affiche, then le header de l'activité est absent | ⬜ |
| Error : given une information d'en-tête non renseignée, system affiche le header sans valeur erronée et laisse l'onglet consultable | ⬜ |
| Security/Gouvernance : le header est en lecture seule et reflète les données réelles de l'activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La saisie/modification des champs affichés dans le header est couverte par les onglets concernés.

## Notes d'implémentation
- Module pilotage (OPDN), en-tête d'activité affiché sur les onglets Informations structurelles, Risques, Jalons et Budget.
- Champs du header : Nom, Pilote, Statut, Météo, Pôle/Usine, Typologie principale ; header non affiché sur l'onglet Informations générales.

---
Item Type: US · Parent: F18.15 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.11 Création d'une activité
Dépendances: —
