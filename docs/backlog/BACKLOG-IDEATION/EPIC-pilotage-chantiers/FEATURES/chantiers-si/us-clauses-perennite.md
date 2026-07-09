# US39.1.5 — Clauses de pérennité

**En tant que** acheteur
**Je veux** intégrer au marché la feuille de route, le préavis de retrait, la réversibilité testée, la protection tarifaire post-acquisition et un plan de migration (échéance Project Online 30/09/2026 le cas échéant)
**Afin de** sécuriser la pérennité de la solution dans le contrat

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le marché, when les clauses de pérennité sont rédigées, then feuille de route, préavis de retrait, réversibilité testée et protection tarifaire post-acquisition y figurent | ⬜ |
| Un plan de migration est prévu (ex. échéance Project Online 30/09/2026 le cas échéant) | ⬜ |
| Error : given une offre sans clause de réversibilité testée, la grille la déclare non conforme | ⬜ |
| Security/Gouvernance : les clauses de pérennité sont opposables et tracées au contrat | ⬜ |

## Hors périmètre
- L'US ne couvre pas la négociation contractuelle en elle-même ni le choix du prestataire — seulement la définition des clauses de pérennité à intégrer au marché et leur vérification dans les offres.
- Le test effectif de la réversibilité (exécution d'un export/migration réel) n'est pas réalisé ici : cette US exige la clause contractuelle de réversibilité testée, pas la conduite du test lui-même (relève de la conduite du changement / US39.1.6 ou d'une US d'exécution ultérieure).
- Le plan de migration Project Online n'est détaillé ici que comme échéance de référence (30/09/2026) conditionnée au contexte de l'organisme — son exécution concrète n'est pas couverte.

## Notes d'implémentation
- Cette US est un artefact de gouvernance contractuelle (clauses + vérification), pas une fonctionnalité applicative : le livrable attendu est le jeu de clauses type (feuille de route, préavis de retrait, réversibilité testée, protection tarifaire post-acquisition, plan de migration) intégré au dossier de marché.
- L'échéance Project Online (30/09/2026) est indicative et conditionnelle ("le cas échéant") : à confirmer/écarter selon que l'organisme cible utilise effectivement cet outil.
- La déclaration de non-conformité d'une offre sans réversibilité testée doit être objectivable dans la grille de dépouillement, en cohérence avec les autres critères éliminatoires (US39.1.2, US39.1.4).

---
Item Type: US · Parent: F39.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Source: PP-065 · MoSCoW: Must · Lot: Lot 1 · Origine: Insight I5
Profils: Grand groupe, Privée sous droit public, Publique, État
Justification: Dossier §8-I5
Dépendances: —
