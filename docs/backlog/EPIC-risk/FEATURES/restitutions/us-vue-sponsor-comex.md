# US21.8.2 — Vue sponsor / COMEX

**En tant que** Sponsor
**Je veux** une vue synthétique présentant le top 5 des risques, leur tendance récente, la provision pour risques recommandée et les décisions attendues de ma part
**Afin de** arbitrer rapidement sans avoir à consulter le registre de risques détaillé

## Contexte

Top 5, tendance, provision recommandée, décisions attendues.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet ou portefeuille suivi par le Sponsor, when il ouvre la vue sponsor / COMEX, then il voit le top 5 des risques les plus critiques, la tendance d'évolution du risque (US21.5.5), la provision pour risques recommandée (US21.6.2) et la liste des décisions en attente de son arbitrage | ⬜ |
| Given une décision d'arbitrage prise par le Sponsor sur un risque (ex. validation d'une stratégie `Transférer` à fort impact budgétaire), when il la valide depuis la vue, then la décision est enregistrée et le risque n'apparaît plus dans les décisions en attente | ⬜ |
| Error : given un portefeuille sans provision calculée (aucune EMV disponible), system affiche la section provision avec un message indiquant l'absence de donnée plutôt qu'une valeur à zéro trompeuse | ⬜ |
| Security : la vue et les décisions d'arbitrage ne sont accessibles qu'aux utilisateurs ayant le rôle Sponsor sur le périmètre (projet ou portefeuille) concerné ; toute décision prise est tracée dans l'audit trail (auteur, risque, horodatage) | ⬜ |
| A11y : le top 5 et la tendance sont restitués avec une alternative textuelle aux graphiques (valeurs en tableau ou texte descriptif), et les actions d'arbitrage sont accessibles au clavier (WCAG 2.1 AA 1.1.1 et 2.1.1) | ⬜ |

## Hors périmètre
- Le calcul de la tendance et de l'historique — couvert par US21.5.5 ; cette US ne fait que le restituer.
- Le calcul de l'EMV et de la provision recommandée — couverts par US21.6.1 et US21.6.2 ; cette US affiche le résultat.
- Le workflow détaillé de validation d'une stratégie de traitement — couvert par US21.3.2 ; cette vue expose une action d'arbitrage simplifiée qui s'appuie dessus.
- L'export de cette synthèse en document (ex. pour présentation COMEX) — couvert par US21.8.5.

## Notes d'implémentation
- Vue de synthèse portefeuille/projet destinée à un rôle non technique : privilégier peu de chiffres à forte valeur décisionnelle plutôt qu'un registre exhaustif.
- Le périmètre (projet unique ou portefeuille consolidé) dépend du rattachement du Sponsor ; s'appuyer sur la consolidation de portefeuille (US21.5.1) quand le Sponsor couvre plusieurs projets.
- « Décisions attendues » correspond aux risques dont la stratégie de traitement (US21.3.2) requiert une validation à un niveau Sponsor (ex. seuil budgétaire ou criticité au-delà d'un certain seuil d'appétence, US21.2.3) — le déclencheur exact de ce qui remonte en « attente Sponsor » est à préciser au raffinement technique.

---
Item Type: US · Parent: F21.8 · Module: risk · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Dépendances: US21.5.1, US21.6.2
