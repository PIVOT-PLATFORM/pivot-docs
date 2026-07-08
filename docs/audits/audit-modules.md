# Audit — modules

**Statut :** À compléter
**Dernière révision :** 2026-07-08
**Profil agent responsable :** Architecte Modules

## Résumé

Score de maturité pas encore calculé (`Statut: À compléter`) — cette section liste le contexte
et les points déjà identifiés pour préparer le premier passage d'audit formel, sur la base du
contrat `PivotModule` documenté et de son état d'implémentation réel constaté début juillet 2026.

## Points d'attention

- [ ] Contrat `PivotModule` (`getId`/`getName`/`getVersion`/`isEnabled(TenantContext)`) —
      vérifier que chaque module `-core` l'implémente réellement et de façon homogène ; état
      constaté : `pivot-collaboratif-core` a un `WhiteboardModuleCheck`/
      `DefaultWhiteboardModuleCheck` fonctionnel, à confirmer sur `agilite-core`/`pilotage-core`
      (encore bootstrap).
- [ ] Cache Redis d'activation (`module:{tenantId}:{moduleId}`, TTL 60s, invalidation à chaque
      changement d'état) — vérifier l'invalidation réelle sur un changement d'état admin, pas
      seulement l'expiration passive du TTL.
- [ ] Côté Angular, le contrat `ModuleGuard`/`ModuleStatusService` doit venir de
      `@pivot-platform/ui-core` — **ce package n'existe pas encore** (workflow de publication en
      échec, voir audit dépendances/CI-CD). Conséquence concrète déjà documentée dans
      `pivot-collaboratif-ui/CLAUDE.md` : `whiteboardModuleGuard` est un stub `of(true)` qui
      laisse tout passer — aucun module n'est donc réellement bloquable côté frontend
      aujourd'hui, malgré la règle absolue "module désactivé = routes inaccessibles".
  - [ ] Risque associé : si une US du domaine collaboratif (ou tout autre module) est livrée
        avant que ce stub soit remplacé, vérifier explicitement qu'aucune UI de module désactivé
        n'est réellement exposée en attendant.
- [ ] Isolation inter-module — règle "aucune logique inter-module directe, bus d'événements
      typés uniquement" : aucun cas de couplage direct détecté à ce jour, mais pas encore vérifié
      systématiquement sur le code réel des modules avancés (collaboratif).
- [ ] Changement de contrat de module = hard block Gate 4 partout — vérifier rétroactivement
      qu'aucun changement de contrat n'a été mergé sans la coordination cross-repo exigée.

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---------|------|-------|------------------------|
| v1 | 2026-06-20 | — | Initialisation |
| v2 | 2026-07-08 | — | Ajout profil agent responsable |
| v3 | 2026-07-08 | — | Contexte et points d'attention initiaux (préparation premier audit formel) |
