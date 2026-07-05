# US27.1.4 — OKR engageant vs aspirationnel + garde-fous

**En tant que** responsable pilotage
**Je veux** typer un objectif **engageant (committed, cible 1.0)** ou **aspirationnel (moonshot, cible ~0.7)** et respecter les garde-fous de volume
**Afin de** distinguer l'attendu du stretch et éviter la dérive (OKR ≠ liste de tâches)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un objectif, when je le crée, then je choisis son type (engageant ou aspirationnel) qui fixe la cible de score attendue (1.0 vs ~0.7) | ⬜ |
| Given une équipe, when elle dépasse **5 objectifs** ou un O dépasse **5 KR**, then une alerte de bonne pratique est levée (recommandé 3–5 / 3–5) | ⬜ |
| Given un KR ressemblant à une tâche binaire de projet, then un garde-fou suggère d'en faire une **initiative** rattachée (cf. US27.6.1) | ⬜ |
| Error : given un objectif existant, when son type (engageant/aspirationnel) est changé en cours de cycle, then l'impact sur la cible de score et le grading est signalé avant confirmation (pas de recalcul silencieux) | ⬜ |
| Security : seul le owner de l'objectif (ou un rôle habilité) peut modifier son type engageant/aspirationnel | ⬜ |
| A11y : le sélecteur de type d'objectif et les alertes de garde-fou sont utilisables au clavier et le statut (engageant/aspirationnel, alerte) n'est pas porté par la seule couleur | ⬜ |

## Hors périmètre
- Le calcul du score lui-même en fonction du type (formule, sweet spot) — couvert par US27.5.1
- La détection automatique fine du sandbagging par analyse statistique — hors état de l'art demandé, le garde-fou reste un seuil de volume + une suggestion déclarative
- La doctrine générale de découplage rémunération/transparence — couverte par US27.10.1

## Notes d'implémentation
- Le type engageant/aspirationnel est un attribut de l'Objective (modèle EN27.1) fixé à la création, modifiable ensuite avec les garde-fous d'impact décrits ci-dessus
- Les seuils de garde-fous (5 objectifs, 5 KR) sont des recommandations affichées, pas des blocages durs — cohérent avec le principe « pas de blocage humain, alerte pédagogique »
- Le garde-fou « KR ressemblant à une tâche binaire » s'appuie sur une heuristique simple (ex. KR de type booléen sans mesure de résultat) et redirige vers le mécanisme d'initiative de US27.6.1

---
Item Type: US · Parent: F27.1 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: Backlog
Profils: Tous
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: US27.1.1
