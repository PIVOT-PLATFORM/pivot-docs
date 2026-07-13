# US25.6.17 — Affectation des rôles

**En tant que** contract manager
**Je veux** affecter un « Contract Manager - Vérification » et des suppléants au contrat via une liste de recherche de noms
**Afin de** attribuer les droits de gestion du contrat et alimenter l'étape de contrôle CM du workflow

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la zone Affectation des rôles, when j'ajoute un « Contract Manager - Vérification » ou un suppléant, then je le sélectionne via une liste de recherche de noms | ⬜ |
| Given un contrat avec Contrôle CM à Oui, when j'enregistre sans « Contract Manager - Vérification », then le système bloque (le CM Vérification est obligatoire dans ce cas) | ⬜ |
| Given un utilisateur identifié comme Contract Manager sur le contrat, when l'affectation est enregistrée, then il obtient les droits de gestionnaire de contrat sur la structure liée au contrat, avec héritage division → unités | ⬜ |
| Given un nom sélectionné, when je le supprime de la liste, then l'affectation correspondante est retirée | ⬜ |
| Error : given un contrat avec Contrôle CM à Oui et aucun « Contract Manager - Vérification » affecté, system bloque l'enregistrement (champ obligatoire) | ⬜ |
| Security/Gouvernance : saisie ouverte à P/V/CM/A (NON/NON/OUI/OUI) ; l'affectation confère au CM identifié les droits de gestionnaire de contrat sur la structure liée (héritage division → unités) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La coche « Contrôle CM » elle-même (voir US Contrôle CM) et la construction du workflow des DA sur contrat.
- La gestion globale des droits / profils en administration.

## Notes d'implémentation
- Écran des contrats (module OPDN), ajout d'un « Contract Manager - Vérification » (obligatoire si Contrôle CM = Oui) et de suppléant(s) via liste de recherche de noms.
- Un CM identifié obtient les droits de gestionnaire de contrat sur la structure liée au contrat (héritage division → unités) ; suppression des noms sélectionnés possible.

---
Item Type: US · Parent: F25.6 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: contract-manager
Source: SPEC_OPDN — B.6 Contrats — écran des contrats
Dépendances: —
