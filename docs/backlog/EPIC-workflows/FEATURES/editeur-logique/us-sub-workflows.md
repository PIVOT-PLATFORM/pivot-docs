# US21.1.6 — Sub-workflows

**En tant que** maker
**Je veux** créer des sous-workflows réutilisables et appelables entre workflows
**Afin de** factoriser la logique commune et réduire la duplication

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un sous-workflow défini, when un autre workflow l'appelle, then il reçoit les paramètres et retourne son résultat | ⬜ |
| Given un sous-workflow modifié, when il est réutilisé, then tous les appelants bénéficient de la nouvelle version | ⬜ |
| Error : given un appel récursif non borné, system détecte et interrompt la boucle | ⬜ |

---
Item Type: US · Parent: F21.1 · Module: automatisation · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Source: WF-016 · MoSCoW: Should · Lot: Lot 2 · Origine: 3/6 (n8n, Zapier, Gumloop)
Justification: Cahiers EDT/ZAP/PIP
Dépendances: —
