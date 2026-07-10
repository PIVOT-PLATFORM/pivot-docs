# EN18.2 — Guard Angular module pilotage

**Type d'enabler** : architecture

**Objectif technique** : Empêcher l'accès à l'UI et au bundle Angular des modules du domaine
Pilotage (E22 Roadmap, E23 Portefeuille, E24 ADR projet, E25 Commande publique, E26 Budget, E27
OKR, E13 Cahiers de tests) lorsque le module `pilotage` est désactivé pour le tenant courant, avant
que le composant ne soit instancié.

**Justification** : Le `moduleGuard` (EN03.2) est générique — chaque domaine module (whiteboard,
agilité, pilotage) l'instancie avec son propre `moduleId`, cf. précédent `EN08.2` (guard whiteboard).
Sans cette instanciation pour `pilotage`, les routes du domaine resteraient accessibles même
tenant désactivé.

**Critères de complétion** :
- [ ] `moduleGuard('pilotage')` appliqué sur la route racine `/pilotage` (et ses sous-routes E22/
      E23/E24/E25/E26/E27/E13)
- [ ] Si module désactivé → redirection `/home` + toast "Module non disponible"
- [ ] Bundle Angular pilotage non chargé si désactivé (lazy-loading respecté)
- [ ] Tests Vitest guard pilotage (enabled=true, enabled=false)

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un tenant où le module `pilotage` est activé (status API → `{enabled:true}`), when un utilisateur authentifié navigue vers `/pilotage` (ou une sous-route E22/E23/E24/E25/E26/E27/E13), then `moduleGuard('pilotage')` autorise la route et le composant cible est instancié.
- [ ] Given un tenant où le module `pilotage` est désactivé (status API → `{enabled:false}`), when un utilisateur authentifié navigue vers `/pilotage` ou une sous-route, then `moduleGuard('pilotage')` bloque la navigation, redirige vers `/home` et affiche le toast « Module non disponible ».
- [ ] Given le module `pilotage` désactivé, when l'utilisateur tente d'atteindre `/pilotage`, then le bundle Angular lazy-loaded du domaine n'est jamais téléchargé (aucune requête du chunk `pilotage`), le guard résolvant avant le chargement du module.
- [ ] Given `moduleGuard('pilotage')` déclaré sur la route racine `/pilotage`, when on inspecte le routing, then chaque sous-route de domaine (E22/E23/E24/E25/E26/E27/E13) hérite du guard via `canActivate`/`canMatch`, sans qu'aucune ne soit accessible en contournement.
- [ ] Given une suite Vitest sur `moduleGuard('pilotage')`, when les tests s'exécutent avec un stub status `enabled=true` puis `enabled=false`, then le cas `true` retourne `true` (navigation autorisée) et le cas `false` retourne `false` + redirection `/home` + toast.
- [ ] Error case: given un appel à `GET /api/modules/pilotage/status` qui échoue (404 moduleId absent, 401 non authentifié, ou timeout/erreur réseau), when le guard évalue la route, then le comportement est fail-closed, strictement identique à un refus (`false` + redirection + toast), sans jamais accorder l'accès par défaut — couvert par un test Vitest dédié.
- [ ] Security: given deux tenants A (activé) et B (désactivé), when un utilisateur de B — authentifié, résolvant le même `moduleId 'pilotage'` — navigue vers `/pilotage`, then la décision est résolue pour le tenant courant (B) et l'accès est refusé (aucune activation cross-tenant) ; l'endpoint status est appelé en `no-store` (EN03.2) pour qu'un changement d'activation/tenant ne serve pas une réponse en cache.

**Statut** : ⬜ À faire — dépend de EN03.2 (Stage: Done, non bloquant)

---
Item Type: Enabler · Parent: E18 · Type: architecture · Module: pilotage · Phase: phase-3 · Size: S · Priority: Critical
Stage: ⬜
Dépendances: EN03.2 (moduleGuard générique, Stage: Done)
