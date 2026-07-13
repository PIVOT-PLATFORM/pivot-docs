# US08.13.4 — Réinitialisation du canvas (contrat temps réel & sémantique de données)

**En tant que** propriétaire d'un tableau
**Je veux** réinitialiser le canvas (supprimer tout le contenu graphique) avec une diffusion temps réel à tous les participants
**Afin de** repartir d'un canvas vide tout en conservant délibérément les définitions de champs personnalisés et l'historique de vote

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given je suis **OWNER** du tableau (garde stricte `role === 'OWNER'`), when je déclenche la réinitialisation (via le point d'entrée REST d'US08.2.4 et/ou l'événement temps réel `board:reset`), then le contenu graphique du canvas est supprimé et l'opération est confirmée | ⬜ |
| Given un EDITOR ou un VIEWER, when il tente de déclencher la réinitialisation (REST ou WS `board:reset`), then l'action est refusée (403 côté REST ; l'événement WS est ignoré) — la garde est **stricte OWNER**, contrairement à `canWrite` qui autorise l'EDITOR sur les autres mutations du canvas | ⬜ |
| Given une réinitialisation autorisée, when elle est appliquée, then la suppression est **atomique** (transaction) et respecte l'ordre des clés étrangères : `connections` → `cards` → `frames` (les connexions d'abord, puis les cartes, puis les cadres) | ⬜ |
| Given la réinitialisation a réussi, when la transaction est commit, then un événement `board:resetted` (**aucun payload**) est diffusé **inconditionnellement** à **toute la room** `/topic/board/{boardId}` (émetteur inclus), et les clients vident leur canvas en temps réel | ⬜ |
| Given une réinitialisation, when elle est appliquée, then elle **ne purge PAS** `BoardField`, `CardFieldValue`, `BoardVoteSession` ni `BoardVote` — ces données **survivent** au reset. C'est une **décision consciente** (parité §6.10) : un tableau réinitialisé conserve ses définitions de champs personnalisés et son historique de vote ; ce n'est pas un oubli mais la reproduction délibérée du comportement du POC de référence | ⬜ |
| Given des `CardFieldValue`/`BoardVote` référençant des cartes supprimées par le reset, when le reset a eu lieu, then leur survie est assumée telle quelle (parité §6.10) — cette US ne comble pas d'éventuels orphelins et documente ce choix ; toute évolution (purge ou nettoyage) relèverait d'une US ultérieure explicite, pas de cette parité | ⬜ |
| Error : given un `boardId` inexistant, hors du tenant courant, ou dont l'appelant n'est pas membre, when le reset REST est appelé, then 404 (convention anti-énumération), jamais une réponse distinguant « existe mais interdit » de « n'existe pas » pour un non-membre | ⬜ |
| Error : given une erreur en cours de suppression (ex. panne base), when la transaction échoue, then rollback complet (aucune suppression partielle : ni connexions, ni cartes, ni cadres) et **aucun** `board:resetted` n'est diffusé | ⬜ |
| Security : `tenantId` et `userId` résolus exclusivement depuis le SecurityContext (token opaque) — jamais depuis le path/query/body ; la garde OWNER est évaluée côté serveur à partir du rôle réel (REST : rôle membership ; WS : `boardRoles[boardId]` de la session socket), jamais d'un rôle transmis par le client | ⬜ |
| Security : la réinitialisation exige une confirmation explicite côté UI (déjà posée par US08.2.4, dialog dédié distinct de la suppression) — pas de reset en un clic, pour limiter la perte de contenu accidentelle | ⬜ |
| A11y : la confirmation de reset est un `role="dialog"` `aria-modal="true"` avec piège à focus et fermeture par Échap (US08.2.4) ; la disparition du contenu du canvas est annoncée via `role="status"` (« Tableau réinitialisé ») pour les technologies d'assistance | ⬜ |
| Tests TI : reset (OWNER → 200/OK + suppression atomique connexions→cartes→cadres + `board:resetted` émis room entière sans payload ; EDITOR → 403 ; VIEWER → 403 ; non-membre → 404 ; cross-tenant → 404) ; **assertion explicite** que `BoardField`/`CardFieldValue`/`BoardVoteSession`/`BoardVote` **subsistent** après reset ; rollback sur échec (aucune suppression partielle, aucun broadcast) | ⬜ |
| Tests Vitest : confirmation avant reset, vidage du canvas à la réception de `board:resetted`, refus de l'entrée de menu reset pour EDITOR/VIEWER | ⬜ |

## Hors périmètre

- Le point d'entrée REST du reset (`POST .../reset`, modal Paramètres OWNER, câblage bouton, i18n `whiteboard.board.reset`) — **déjà défini** par US08.2.4 ; cette US en **complète** le contrat temps réel et la sémantique de données, sans le redéfinir
- Purge ou nettoyage de `BoardField`/`CardFieldValue`/`BoardVoteSession`/`BoardVote` au reset — **délibérément hors scope** (parité §6.10 : ces données survivent) ; toute purge future = US dédiée
- Reset partiel (garder certains éléments) — le reset est total sur le contenu graphique (connexions/cartes/cadres)
- Undo/restauration après reset — non couvert (le reset est destructif et confirmé)

## Notes d'implémentation

- Cette US **complète** US08.2.4 (qui définit le point d'entrée REST du reset, la modal OWNER et le câblage du bouton `whiteboard.board.reset`) : elle spécifie le **contrat temps réel** (`board:reset` déclencheur / `board:resetted` broadcast) et la **sémantique exacte des données** (ordre FK + survie des champs/votes)
- Backend `pivot-collaboratif-core`, module whiteboard (schéma `collaboratif`) :
  - Suppression atomique en transaction, ordre FK strict : `connections` (`CardConnection`) → `cards` (`Card`) → `frames` (`Frame`) — parité §3.8 (ligne 475)
  - Garde **stricte OWNER** : côté WS, équivalent `socket.data.boardRoles?.[boardId] !== 'OWNER'` → refus (ni EDITOR ni VIEWER) ; côté REST, 403 pour tout non-owner — divergence assumée vs `canWrite` (qui accepte EDITOR sur les autres mutations)
  - Broadcast **inconditionnel** `board:resetted` **sans payload** à la room entière `/topic/board/{boardId}` (émetteur inclus)
  - **Décision §6.10 (ligne 962) matérialisée en AC** : le reset ne purge ni `BoardField`, ni `CardFieldValue`, ni `BoardVoteSession`, ni `BoardVote` — comportement reproduit délibérément depuis le POC ; documenté comme choix conscient, pas comme gap silencieux
- Stack : Spring Boot + STOMP ; realtime `/topic/board/{boardId}` ; tenant/user depuis SecurityContext ; 404 anti-énumération ; rôles OWNER/EDITOR/VIEWER
- Frontend `pivot-collaboratif-ui` : réutilise la confirmation et le bouton de reset d'US08.2.4 ; à réception de `board:resetted`, vidage du canvas (même canal STOMP qu'EN08.1/US08.1.5, cohérent avec `BOARD_DELETED`)
- i18n : réutilisation de `whiteboard.board.reset` (existante) + `whiteboard.board.reset.status` (annonce `role="status"`)

---
Item Type: US · Parent: F08.13 · Module: whiteboard · Phase: Socle · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §3.8 + décision §6.10) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08
Dépendances: US08.2.4 (point d'entrée REST du reset, modal OWNER, câblage bouton — contrat complété ici), EN08.1 (isolation room WS, canal STOMP reset)
