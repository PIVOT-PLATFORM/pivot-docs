# US19.2.2 — Vue participant en temps réel (affichage adapté au type d'activité)

**En tant que** participant
**Je veux** voir une interface adaptée au type d'activité de la session
**Afin de** interagir de façon intuitive selon le contexte (quiz, poll, wordcloud, etc.)

**Gate 1 réalisé le 2026-07-23** — remplace le stub outline précédent. Prolonge US19.2.1.

**Correction de périmètre (Gate 1)** : le stub d'origine listait le routage pour 5 types
(QUIZ/POLL/WORDCLOUD/BRAINSTORM/QA) et sa liste de dépendances s'arrêtait à `US19.3.5` — omission
du 6ᵉ type `VOTE` (`US19.3.6`), déjà corrigée sur `US19.1.1`. Corrigé ici aussi : le routage
couvre les 6 types, dépendances étendues à `US19.3.6`.

**Architecture — `EN19.3` (garde de module Angular) déjà posé, pas à construire** (Gate 1 —
constat direct dans le code) : le mécanisme `moduleGuard()` existe déjà et `'session'` figure
**déjà** dans `MODULE_IDS` du shell (`pivot-ui/src/app/app.routes.ts`), actuellement routé vers
`ComingSoonComponent` en placeholder — exactement le même état que `whiteboard`/`agilite` avant
leur bascule respective (`EN17.10`/`EN18`). `EN19.3` ne demande donc **aucune infrastructure
nouvelle** : il s'agit uniquement de remplacer l'entrée `session` de `MODULE_IDS` par une route
dédiée `SESSION_ROUTE` avec `loadChildren: loadSessionModule` (nouveau loader à écrire, calqué
mot pour mot sur `loadWhiteboardModule`/`loadAgiliteModule`), `canActivate: [moduleGuard('session')]`
inchangé. Le moduleId réel est **`'session'`**, pas `'collaboratif'` comme l'écrivait le stub
d'origine de l'EPIC (`EPIC-module-session/README.md`) — écart terminologique corrigé ici.

## Critères d'acceptation

### Routage (frontend `pivot-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| Given l'entrée `session` de `MODULE_IDS` (`app.routes.ts`), when elle est remplacée, then une route `SESSION_ROUTE` (`path: 'session'`, `canActivate: [moduleGuard('session')]`, `loadChildren: loadSessionModule`) mène au module réel `@pivot-platform/collaboratif-ui` (sous-arbre session), même pattern que `WHITEBOARD_ROUTE`/`AGILITE_ROUTE` | ⬜ |
| Given `loadSessionModule`, when l'import dynamique échoue (chunk manquant/erreur réseau après déploiement), then `ModuleLoadErrorComponent` s'affiche au lieu d'une page blanche silencieuse (même AC que `loadWhiteboardModule`) | ⬜ |
| Given `session.type`, when la vue participant se charge, then le composant d'activité adapté est chargé en lazy-load : QUIZ → `session-activity-quiz`, POLL → `session-activity-poll`, WORDCLOUD → `session-activity-wordcloud`, BRAINSTORM → `session-activity-brainstorm`, QA → `session-activity-qa`, VOTE → `session-activity-vote` | ⬜ |

### Contrat générique d'activité (frontend `pivot-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| Given l'état `SESSION_PAUSED` diffusé (US19.1.2), when reçu par n'importe quel composant d'activité, then l'interaction est désactivée et un écran de pause générique s'affiche par-dessus (composant partagé `session-paused-overlay`, pas dupliqué par type) | ⬜ |
| Given l'état `SESSION_ENDED`, when reçu, then l'interaction est désactivée définitivement, redirection vers la vue résultats (`US19.4.1`) | ⬜ |
| Given une reconnexion STOMP (perte réseau puis retour), when elle survient, then l'état de la session est rechargé depuis l'API REST (`GET .../sessions/{id}`, pas uniquement le flux WS) avant de ré-abonner aux topics — aucun état visuel obsolète affiché entre la perte et la reconnexion | ⬜ |
| Given un participant qui n'a pas encore répondu à l'activité courante, when il rejoint en cours de session, then il voit l'état actuel (question en cours pour QUIZ, options pour POLL, etc.) plutôt qu'un état vide | ⬜ |

## Hors périmètre

- **Mode hors-ligne** (queue de réponses en attente de reconnexion) — non spécifié, une action tentée hors connexion échoue explicitement (message d'erreur), pas de file d'attente silencieuse.

## Notes d'implémentation

- **Backend** : aucun endpoint propre à cette US — consomme les endpoints de `US19.1.x`/`US19.2.1`/`US19.3.x`.
- **Frontend** : `projects/pivot-ui/src/app/core/modules/session-module-loader.ts` (`loadSessionModule`, calqué sur `loadWhiteboardModule`), mise à jour de `app.routes.ts` (`MODULE_IDS` perd `'session'`, nouvelle `SESSION_ROUTE` ajoutée au tableau final comme `WHITEBOARD_ROUTE`/`AGILITE_ROUTE`). Côté `collaboratif-ui` : `session-participant-shell` (charge le composant d'activité selon `session.type`, gère `session-paused-overlay`, la redirection fin de session, et le rechargement d'état à la reconnexion STOMP) + les 6 composants d'activité eux-mêmes détaillés dans chaque `US19.3.x`.

---
Item Type: US · Parent: F19.2 · Module: collaboratif · Phase: phase-3 · Size: XL · Priority: Critical
Stage: ⬜
Rôle: utilisateur-final
Dépendances: US19.2.1, US19.3.1 → US19.3.6
