# US38.13.2 — Venture board & financement par paliers

**En tant que** venture board / sponsor
**Je veux** un **venture board interne** qui finance par **paliers conditionnés** (tranches), à la manière d'un VC interne
**Afin de** investir progressivement selon les preuves, comme un fonds de capital-risque

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet intrapreneurial, when le venture board statue, then un financement par **tranches** (déblocage conditionné à des jalons/metrics) est décidé et tracé | ⬜ |
| Given un palier non atteint, when la revue a lieu, then le financement suivant est **suspendu/réorienté** (discipline VC) | ⬜ |
| Error : given une demande de déblocage de tranche sans décision de revue préalable, when elle est soumise, then elle est rejetée (pas de déblocage hors process de revue) | ⬜ |
| Security : seuls les membres du venture board (rôle dédié) peuvent statuer sur un déblocage/suspension de tranche ; chaque décision de financement est tracée et non modifiable a posteriori (piste d'audit) | ⬜ |

## Hors périmètre
- L'exécution comptable/bancaire du versement des fonds : cette US couvre la décision et la traçabilité, pas l'intégration financière
- La composition et la gouvernance du venture board lui-même (nomination des membres) : gérée hors de cette US (gouvernance de l'innovation, US38.1.2)
- Le financement externe via CVC ou partenaires : couvert par US38.13.4 (écosystème start-up & CVC)

## Notes d'implémentation
- S'appuie sur EN38.1 (modèle SMI) : chaque tranche est liée à des jalons/metrics du parcours d'incubation (US38.13.1) et au stage-gate (F38.3)
- La décision « suspendu/réorienté » doit rester tracée avec la justification (metrics non atteints) pour audit ultérieur
- Le montant des tranches est une donnée sensible : mêmes précautions de confidentialité que pour le portefeuille (E23)

---
Item Type: US · Parent: F38.13 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: Backlog
Profils: Grand groupe, Publique, État
Justification: SMI — fonctionnalités innovantes (IA gouvernée, intelligence collective, corporate venturing)
Dépendances: EN38.1 · EN38.2 (moteur IA & graphe)
