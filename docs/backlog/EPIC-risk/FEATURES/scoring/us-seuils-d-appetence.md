# US21.2.3 — Seuils d'appétence

**En tant que** PMO, Sponsor
**Je veux** définir des seuils d'appétence au risque (acceptable / à surveiller / à traiter) par projet ou par portefeuille
**Afin de** prioriser les risques selon leur criticité

## Contexte

Définir les seuils (acceptable/à surveiller/à traiter) par projet ou portefeuille.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des seuils d'appétence configurés pour un projet ou un portefeuille, when un risque atteint ou dépasse le seuil « à traiter », then il est automatiquement signalé comme à traiter (statut/badge visible sur la fiche risque et dans les listes) | ⬜ |
| Error : given une tentative de configuration de seuils incohérents (ex. seuil « à surveiller » supérieur au seuil « à traiter »), system rejette la configuration et retourne une erreur de validation explicite | ⬜ |
| Security : seuls PMO et Sponsor peuvent créer ou modifier les seuils d'appétence d'un projet ou d'un portefeuille ; un chef de projet ou contributeur ne peut que consulter les seuils en vigueur | ⬜ |
| A11y : le badge de signalement (acceptable/à surveiller/à traiter) associe un libellé textuel à tout code couleur, pour rester compréhensible sans perception des couleurs (WCAG 2.1 AA 1.4.1) | ⬜ |

## Hors périmètre
- Le calcul du score de criticité (P × G) auquel les seuils sont comparés est produit par US21.2.1 ; cette US ne recalcule pas la criticité, elle la compare à des bornes configurées.
- La représentation visuelle en matrice des risques par rapport aux seuils est traitée par US21.2.4.
- La consolidation multi-projets des risques au niveau portefeuille (agrégation, risques systémiques) est traitée par F21.5 ; ici les seuils portefeuille servent uniquement de référence de comparaison, pas d'agrégation.

## Notes d'implémentation
- Dépend de US21.2.1 pour disposer du score de criticité 1-25 servant de base à la comparaison aux seuils.
- Les seuils doivent être définissables à deux granularités distinctes (projet et portefeuille) ; en cas de configuration aux deux niveaux, la règle de priorité (projet prime sur portefeuille, ou inverse) doit être explicitée lors du raffinement technique.
- Le franchissement d'un seuil est un déclencheur naturel pour l'événement `risk.threshold.exceeded` émis sur le bus PIVOT (cf. EN21.3), à corréler lors de l'implémentation de F21.4.

---
Item Type: US · Parent: F21.2 · Module: risk · Phase: phase-3 · Size: S · Priority: High
Stage: Backlog
Dépendances: US21.2.1
