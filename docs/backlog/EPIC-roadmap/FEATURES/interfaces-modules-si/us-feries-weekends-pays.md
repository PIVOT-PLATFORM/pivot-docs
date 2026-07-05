# US22.8.3 — Weekends & jours fériés par pays / localité

**En tant que** chef de projet
**Je veux** appliquer les weekends et jours fériés d'un pays / d'une localité (import d'un fournisseur de fériés, weekend configurable par région)
**Afin de** planifier sur le temps réellement ouvré, où que soit l'équipe

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un pays/région, when je l'associe à un calendrier, then ses jours fériés sont importés (fournisseur type API fériés) et exclus de l'ordonnancement | ⬜ |
| Given une localité à weekend non standard (ex. vendredi–samedi), when je la configure, then l'ordonnancement respecte ce weekend | ⬜ |
| Given une équipe multi-pays, when des tâches sont réparties, then chaque tâche/ressource suit le calendrier de sa localité | ⬜ |
| Given une mise à jour du référentiel de fériés (année N+1), when elle est publiée, then les calendriers se rafraîchissent | ⬜ |
| Error : given le fournisseur de fériés indisponible ou renvoyant des données invalides lors du rafraîchissement, when la synchro échoue, then le dernier référentiel connu est conservé et l'échec est signalé (pas de calendrier vidé/corrompu) | ⬜ |
| Security : la configuration d'un calendrier (pays, weekend non standard) est réservée aux rôles habilités (chef de projet / PMO) ; les calendriers restent scoped au tenant | ⬜ |
| A11y : le sélecteur de pays/localité et le paramétrage du weekend sont utilisables au clavier, avec libellés explicites pour lecteur d'écran | ⬜ |

## Hors périmètre
- Gestion fine des jours fériés d'entreprise/site (ponts, fermetures internes) au-delà du référentiel légal pays/région
- Édition manuelle ligne à ligne du calendrier de fériés (l'US couvre l'import fournisseur, pas un éditeur de calendrier custom)
- Arbitrage de conflit entre calendriers de localités différentes sur une même tâche multi-sites (couvert par le nivellement de ressources, F22.5)

## Notes d'implémentation
- Connecteur fournisseur de fériés (ou table administrable) porté par EN22.3, avec rafraîchissement annuel a minima
- Le calendrier normalisé (jours ouvrés/fériés/weekend par région) est consommé par le moteur d'ordonnancement d'EN22.1 — pas de logique de calcul de jours ouvrés dupliquée côté UI
- Le weekend configurable par région (ex. vendredi–samedi) doit être un paramètre du calendrier, pas une constante codée en dur

---
Item Type: US · Parent: F22.8 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Profils: Tous
Justification: Interopérabilité / interfaces inter-modules & SI (ADR-010, bus PIVOT + deep-links ADR-006/008)
Dépendances: EN22.1 · EN22.3 (connecteurs calendrier)
