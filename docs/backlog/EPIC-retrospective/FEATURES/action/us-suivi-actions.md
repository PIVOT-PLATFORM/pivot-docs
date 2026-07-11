# US20.3.2 — Revoir les actions de la rétro précédente au démarrage

**En tant que** Scrum Master
**Je veux** afficher les actions ouvertes de la rétro précédente au démarrage de la nouvelle rétro
**Afin d'** assurer la continuité et le suivi des engagements pris

## Contexte

S'appuie entièrement sur US20.3.1 : `agilite.retro_actions`, `RetroActionController`,
`PATCH /retro/actions/{actionId}` (déjà livré, transitions de statut libres, sans restriction de
phase de session). Cette US n'ajoute qu'un endpoint de lecture filtrée côté backend — la
mécanique de mise à jour de statut est intégralement réutilisée telle quelle. Côté frontend,
« warm-up » est une vue d'accueil affichée avant la phase `CONTRIBUTION`, pas une nouvelle valeur
de `RetroPhase` — la session reste créée directement en `CONTRIBUTION` (US20.1.1), le warm-up est
un état transitoire purement côté client entre l'ouverture de la session et le premier rendu de
la phase de contribution.

## Critères d'acceptation

- [ ] Given une équipe possédant des actions au statut `A_FAIRE` ou `EN_COURS`, issues de
      n'importe quelle session de rétro passée (y compris `CLOSED`), when
      `GET /retro/teams/{teamId}/retro/pending-actions`, then 200 — liste strictement filtrée sur
      `status IN (A_FAIRE, EN_COURS)`, triée par échéance croissante (actions sans échéance en
      dernier), même format de réponse que `GET /retro/teams/{teamId}/actions` (US20.3.1).
- [ ] Given une équipe sans aucune action `A_FAIRE`/`EN_COURS`, when
      `GET .../retro/pending-actions`, then 200 avec une liste vide (pas 404 — l'équipe existe,
      elle n'a simplement aucune action en cours).
- [ ] Given un appelant qui n'est pas membre de `{teamId}`, when `GET .../retro/pending-actions`,
      then 404 (jamais 403 — cohérence avec le reste du module `retro/*`).
- [ ] Given le facilitateur ouvre une session de rétro fraîchement créée et que l'équipe a au
      moins une action `A_FAIRE`/`EN_COURS`, when le client charge la session, then une vue
      « warm-up » s'affiche en premier, listant ces actions avec leur statut — accessible avant
      tout accès à l'interface de la phase `CONTRIBUTION`.
- [ ] Given la vue warm-up affichée, when le facilitateur marque une action `TERMINEE` ou
      `ABANDONNEE` depuis cette vue, then la mise à jour utilise `PATCH /retro/actions/{actionId}`
      (endpoint US20.3.1, aucune modification ni restriction de phase supplémentaire nécessaire).
- [ ] Given une équipe sans aucune action `A_FAIRE`/`EN_COURS` (liste `pending-actions` vide),
      when le facilitateur ouvre la session, then la vue warm-up est sautée automatiquement —
      accès direct à l'interface de la phase `CONTRIBUTION`.
- [ ] Given une action créée à l'origine dans la session A, closed (`TERMINEE`/`ABANDONNEE`)
      depuis la vue warm-up de la session B (une session ultérieure de la même équipe), when on
      consulte l'historique de la session A, then l'action apparaît toujours rattachée à la
      session A (`sessionId` inchangé) — le `PATCH` ne modifie jamais `sessionId`, seulement
      `status` (déjà garanti par l'implémentation US20.3.1, aucun changement requis côté backend).
- [ ] Security : `teamId` extrait exclusivement du `RequestPrincipal` résolu du token porteur,
      jamais du body/query/header — même règle transversale que tout endpoint `/api/agilite/*`.

---
Item Type: US · Parent: F20.3 · Module: agilite · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: scrum-master
Dépendances: US20.3.1
