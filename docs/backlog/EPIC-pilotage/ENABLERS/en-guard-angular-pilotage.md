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

**Statut** : ⬜ À faire — dépend de EN03.2 (Stage: Done, non bloquant)

---
Item Type: Enabler · Parent: E18 · Type: architecture · Module: pilotage · Phase: phase-3 · Size: S · Priority: Critical
Stage: Backlog
Dépendances: EN03.2 (moduleGuard générique, Stage: Done)
