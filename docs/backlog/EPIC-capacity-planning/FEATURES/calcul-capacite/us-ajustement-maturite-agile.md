# US11.6.4 — Ajustement par la maturité agile

**En tant que** Scrum Master / Coach agile
**Je veux** moduler les paramètres (facteur de concentration, marge d'incertitude, fiabilité de la vélocité) selon le **niveau de maturité agile** de l'équipe
**Afin de** adapter la prudence de la planification au niveau réel de l'équipe

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un niveau de maturité, when je le renseigne, then les défauts chiffrés s'appliquent : **peu mature → focus 60 % / marge 20 %** · **en cours → focus 70 % / marge 10 %** · **performante → focus 80 % / marge 5 %** (défaut global si non renseigné : **focus 70 % / marge 15 %**) | ⬜ |
| Given la capacité nette et la marge, when l'engagement recommandé est calculé, then **engagement = capacité nette × (1 − marge)** (ex. équipe peu mature : 80 % de la capacité nette) | ⬜ |
| Given une équipe peu mature, when je planifie, then la marge (20 %) est appliquée et **explicitement signalée** ; les valeurs restent surchargeables manuellement | ⬜ |
| Given une maturité qui progresse, when elle est mise à jour, then focus ↑ et marge ↓ selon le barème (évolution tracée) | ⬜ |

---
Item Type: US · Parent: F11.6 · Module: agilite · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Dépendances: US11.6.2 · US11.6.3
