# US38.1.2 — Gouvernance de l'innovation

**En tant que** responsable innovation
**Je veux** structurer la **gouvernance** : rôles (sponsor, comité, champions), instances et cadence de décision (ISO 56002 §5.3)
**Afin de** responsabiliser et rythmer la démarche d'innovation

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la gouvernance, when je la définis, then rôles, comités et cadence de revue sont établis | ⬜ |
| Given un comité d'innovation, when il se réunit, then ses décisions sont tracées et opposables | ⬜ |
| Error : given une tentative de suppression d'un rôle (ex. sponsor) encore assigné à un comité actif, when je la déclenche, then l'opération est refusée tant que le rôle n'a pas été réassigné | ⬜ |
| Security : seul un rôle habilité (ex. responsable innovation, admin du module) peut créer/modifier la structure de gouvernance (rôles, comités, cadence) ; les décisions tracées sont immuables une fois enregistrées (pas de modification a posteriori, seulement un correctif horodaté) | ⬜ |
| A11y : les écrans de configuration de la gouvernance et de saisie des décisions de comité sont navigables au clavier et compatibles lecteur d'écran (WCAG 2.1 AA) | ⬜ |

## Hors périmètre
- La définition de la politique et des axes stratégiques (US38.1.1) — cette US structure qui décide et comment, pas ce qui est décidé
- Les jalons de décision go/kill/hold/pivot au niveau d'un item d'innovation (stage-gate opérationnel) : couverts par US38.3.2, qui réutilise la notion de comité définie ici
- La notification/convocation automatique des membres de comité (calendrier, rappels) — non demandée ici

## Notes d'implémentation
- Les rôles et comités définis ici (sponsor, comité, champions) sont les mêmes acteurs référencés par les décisions de gate en F38.3 (US38.3.2) : le modèle de comité doit être réutilisable, pas dupliqué
- « Décisions tracées et opposables » implique un historique horodaté et non modifiable (auteur, date, motif) au sens de EN38.1 — poser cette traçabilité générique ici évite de la refaire pour chaque type de décision (gate, portefeuille, etc.)
- Cadence de revue : simple déclaration de fréquence/rythme (ex. mensuel, trimestriel) rattachée à un comité, sans moteur de planification de calendrier

---
Item Type: US · Parent: F38.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 (modèle SMI & moteur)
