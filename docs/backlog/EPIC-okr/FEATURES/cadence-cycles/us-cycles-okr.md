# US27.2.1 — Cycles OKR (trimestriel / annuel)

**En tant que** responsable pilotage
**Je veux** gérer des **cycles OKR** (trimestriel, annuel) avec ouverture, phase de **gel** (draft → validé) et **clôture**
**Afin de** cadencer la démarche et figer les OKR une fois alignés

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un cycle (ex. Q1 2026), when je l'ouvre, then les OKR y sont rattachés en statut brouillon puis validés (gel) | ⬜ |
| Given un cycle validé, when il est en cours, then les objectifs ne changent plus de définition (seuls les check-ins évoluent) | ⬜ |
| Given une fin de cycle, when je le clôture, then le scoring final est déclenché (cf. F27.5) et le cycle passe en lecture seule | ⬜ |
| Error : given un cycle déjà gelé ou clôturé, when une tentative de modification de la définition d'un objectif est faite, then l'API retourne 409 | ⬜ |
| Security : given un utilisateur, when il ouvre, gèle ou clôture un cycle, then seul un rôle responsable pilotage (ou admin tenant) peut effectuer ces transitions d'état | ⬜ |

## Hors périmètre
- L'imbrication annuel/trimestriel et le report (carry-over) d'un OKR non atteint (cf. US27.2.2)
- Le détail du calcul de scoring final déclenché à la clôture (cf. F27.5)
- La définition des OKR eux-mêmes (cf. US27.1.1)

## Notes d'implémentation
- Entité `Cycle` (trimestriel | annuel, ouvert/gelé/clôturé) posée par EN27.1 — cette US couvre les transitions d'état du cycle et leurs effets de bord (verrouillage des objectifs, déclenchement du scoring).
- Le gel (draft → validé) doit être une transition explicite et non un effet de bord de la première validation d'objectif ; une fois gelé, toute tentative de modification de la définition d'un `Objective` rattaché doit être bloquée côté API (pas seulement UI).
- La clôture passe le cycle en lecture seule : seuls les champs d'historique (check-ins passés, scoring final) restent consultables, aucune écriture métier n'est plus acceptée hors ce qui est prévu par F27.5.

---
Item Type: US · Parent: F27.2 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Profils: Tous
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
