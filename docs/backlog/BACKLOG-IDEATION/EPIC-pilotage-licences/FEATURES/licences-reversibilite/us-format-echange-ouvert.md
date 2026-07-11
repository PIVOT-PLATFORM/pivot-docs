# US37.1.5 — Format d'échange ouvert

**En tant que** acheteur
**Je veux** un standard d'export/import de portefeuilles entre PPM (projets, jalons, budgets, décisions)
**Afin de** limiter le risque de lock-in juridique lié à la remise en concurrence

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un portefeuille, when l'acheteur l'exporte au format ouvert, then projets, jalons, budgets et décisions sont exportés dans un standard réimportable | ⬜ |
| Un portefeuille exporté par un autre PPM au même standard peut être importé | ⬜ |
| Error : given un fichier non conforme au standard, system rejette l'import avec un diagnostic | ⬜ |
| Security/Gouvernance : les décisions exportées conservent leur horodatage et traçabilité | ⬜ |

## Hors périmètre
- La définition du standard elle-même (adoption d'un format existant du secteur PPM vs format Pivot propriétaire ouvert) est une décision préalable qui conditionne l'implémentation — cette US ne couvre que l'export/import conforme au standard retenu, pas son élaboration.
- L'interopérabilité avec un PPM tiers n'implémentant pas ce standard n'est pas garantie.
- Cette US est distincte de la réversibilité contractuelle (US37.1.1) : elle porte sur le format technique d'échange, pas sur la clause contractuelle de sortie.

## Notes d'implémentation
- Le format d'export/import doit couvrir a minima projets, jalons, budgets et décisions du schéma `pilotage`, avec un identifiant de version de standard pour permettre l'évolution.
- Le diagnostic de rejet à l'import doit être suffisamment explicite pour identifier la ou les entités non conformes (pas un simple rejet global du fichier).
- L'export doit préserver l'horodatage d'origine des décisions (pas régénérer une nouvelle date à l'export) pour garantir la traçabilité exigée par l'AC sécurité.

---
Item Type: US · Parent: F37.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Low
Stage: ⬜
Rôle: acheteur-informatique
Source: PP-060 · MoSCoW: Could · Lot: Lot 4 · Origine: Bonus B8
Profils: Grand groupe, Privée sous droit public, Publique, État
Justification: Dossier §7-B8 : risque juridique pour l'acheteur soumis à remise en concurrence
Dépendances: —
