# US29.13.4 — Recette automatisée

**En tant que** développeur
**Je veux** générer des tests de non-régression, des environnements de test à données synthétiques/anonymisées et une exécution à blanc certifiée
**Afin de** tester les workflows autrement qu'en production ('CI/CD du workflow')

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un workflow, when je génère la recette, then des tests de non-régression sont produits | ⬜ |
| Given un environnement de test, when il est provisionné, then il utilise des données synthétiques/anonymisées | ⬜ |
| Security/Gouvernance : aucune donnée de production réelle n'est utilisée dans les tests | ⬜ |

---
Item Type: US · Parent: F29.13 · Module: automatisation · Phase: phase-3 · Size: XL · Priority: Low
Stage: ⬜
Source: WF-069 · MoSCoW: Could · Lot: Lot 4 · Origine: Bonus B4
Justification: Dossier §7-B4 : aujourd'hui on teste en production
Dépendances: —
