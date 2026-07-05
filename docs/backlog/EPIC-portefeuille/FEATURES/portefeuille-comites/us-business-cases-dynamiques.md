# US23.2.8 — Business cases dynamiques

**En tant que** chef de projet
**Je veux** constituer des dossiers de justification (coûts, bénéfices, risques, alignement) et comparer les versions d'un projet
**Afin de** documenter la décision et suivre l'évolution du dossier d'arbitrage

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet, when un utilisateur crée un business case, then coûts, bénéfices, risques et alignement sont renseignés et enregistrés | ⬜ |
| Les versions successives d'un dossier de justification sont comparables | ⬜ |
| Error : given une version sans donnée de coût ou de bénéfice, system signale le dossier incomplet | ⬜ |
| Security/Gouvernance : l'historique des versions du business case est conservé et horodaté ; seul le chef de projet (ou rôle habilité) rattaché au projet peut créer/modifier un business case | ⬜ |
| A11y : le formulaire de saisie et la vue de comparaison des versions sont conformes RGAA 4 / WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La simulation d'impact portefeuille d'un business case (charge, budget, trésorerie à l'échelle du portefeuille) relève de US23.2.7.
- Le workflow d'approbation formelle du business case (validation par un comité) n'est pas couvert, seule sa constitution et son historique le sont.
- L'export du business case en document normé relève de US23.2.9.

## Notes d'implémentation
- Chaque business case est versionné : une nouvelle version doit conserver l'ancienne pour permettre la comparaison exigée par l'AC nominal, plutôt qu'un simple écrasement.
- Les champs coûts/bénéfices/risques/alignement sont rattachés au projet (E22) et doivent rester cohérents avec les autres indicateurs du portefeuille sans les dupliquer.
- Backend `pivot-pilotage-core`, schéma `pilotage` ; frontend `pivot-pilotage-ui`.

---
Item Type: US · Parent: F23.2 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: Backlog
Source: PP-037 · MoSCoW: Could · Lot: Lot 3 · Origine: Différenciant Sciforma
Profils: Grand groupe, Privée sous droit public, Publique, État
Justification: Dossier §6.2
Dépendances: —
