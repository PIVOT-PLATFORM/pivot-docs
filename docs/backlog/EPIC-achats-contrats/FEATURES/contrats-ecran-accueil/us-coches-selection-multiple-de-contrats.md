# US25.5.11 — Coches pour la sélection multiple de contrats

**En tant que** administrateur plateforme
**Je veux** disposer de coches pour sélectionner plusieurs contrats
**Afin de** préparer des actions groupées comme la modification en masse

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un administrateur (local ou global), when il consulte la liste des contrats, then des coches de sélection sont affichées sur les lignes | ⬜ |
| Given des contrats cochés, when je modifie le filtre de la liste, then les éléments sélectionnés restent affichés même si le filtre change | ⬜ |
| Error : given un utilisateur non administrateur, system n'affiche pas les coches de sélection multiple | ⬜ |
| Security/Gouvernance : les coches ne sont visibles que pour les administrateurs local et global (A) ; ni P, ni V, ni CM (NON/NON/NON/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'action de modification groupée est couverte par l'US Modification des contrats en masse.

## Notes d'implémentation
- Écran d'accueil des contrats (module OPDN, B.5), coches de sélection réservées aux administrateurs (local + global).
- Persistance de la sélection lors du changement de filtre.

---
Item Type: US · Parent: F25.5 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: administrateur-plateforme
Source: SPEC_OPDN — B.5 Contrats — écran d'accueil
Dépendances: —
