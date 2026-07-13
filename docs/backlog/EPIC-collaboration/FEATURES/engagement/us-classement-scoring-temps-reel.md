# US30.11.4 — Classement et scoring temps réel des parcours

**En tant que** formateur
**Je veux** afficher un classement (leaderboard) temps réel et des statistiques de réussite par question sur un parcours gamifié / quiz
**Afin d'** animer une évaluation interactive à grand nombre (recyclage, sûreté, onboarding) et mesurer l'acquisition

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un parcours ou quiz en cours, when les participants répondent, then un classement temps réel s'actualise et est projetable pour l'ensemble du groupe | ⬜ |
| Given un parcours terminé, when le formateur consulte les résultats, then il obtient le taux de réussite par question et par participant | ⬜ |
| Error : given une entrée invalide ou une coupure réseau, system préserve les scores et affiche un état cohérent à la reconnexion | ⬜ |
| Security/Gouvernance : anonymisation possible du classement et respect RGPD sur les scores nominatifs | ⬜ |

---
Item Type: US · Parent: F30.11 · Module: collaboratif · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Rôle: animateur-facilitateur
Source: Étude interne Klaxoon (EDF) 2026-07 · MoSCoW: Could · Lot: Lot 3 · Origine: Écart terrain (enjeu sûreté/formation)
Justification: Étude interne §3.4 : modes Aventure/Mission, « classement temps réel, taux de réussite par question » (~800 pers., recyclage Performance Humaine) = trou dur du repli Microsoft — complète US30.11.2 (Aventure), sans leaderboard/scoring
Dépendances: US30.11.2 (parcours gamifié), US30.3.6 (quiz et sondages)
