# US03.3.2 — SUPER_ADMIN active/désactive un module par tenant (override)

**En tant que** SUPER_ADMIN
**Je veux** forcer l'activation ou désactivation d'un module pour un tenant spécifique (hors plan)
**Afin de** gérer des cas particuliers (test, support, contractuel)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| POST /api/superadmin/tenants/{tenantId}/modules/{moduleId}/override active ou désactive en override | ✅ |
| Requiert ROLE_SUPER_ADMIN | ✅ |
| Override enregistré en BDD (priorité sur le plan) | ✅ |
| Audit event `ModuleOverrideSet` avec superAdminId | ✅ |
| Body de la requête POST spécifié : { enabled: boolean } | ✅ |
| DELETE /api/superadmin/tenants/{tenantId}/modules/{moduleId}/override supprime l'override (le module revient au comportement du plan) | ✅ |
| Audit event ModuleOverrideRemoved enregistré lors de la suppression d'un override | ✅ |

## Notes de livraison

- Implémenté : `pivot-core` PR [#159](https://github.com/PIVOT-PLATFORM/pivot-core/pull/159) — Gate 4 (Merge confidence) auto-évalué 100/100, CI verte (Tests Backend TU+TI, SonarCloud Quality Gate, Checkstyle/SpotBugs, Gitleaks, CodeQL, Semgrep, Trivy).
- **Décision de conception** : nouvelle table dédiée `module_overrides` (distincte de `module_activations`, EN03.1) plutôt qu'un flag ajouté à la table existante. Les deux tables portent des niveaux d'autorité différents (admin du tenant vs SUPER_ADMIN plateforme) — les fusionner en une seule ligne aurait permis à l'un d'écraser silencieusement l'autre. `ModuleActivationService#isEnabled` compose désormais les deux sources (override prioritaire, repli sur `module_activations`) ; l'admin de tenant peut continuer à activer/désactiver son module même sous override actif — son choix est persisté (il "prendra effet" une fois l'override retiré) mais ne change rien à ce qui est effectivement servi tant que l'override reste en place.
- **Dépendance US03.3.1** (`pivot-core` PR #153, plans/modules par plan, non mergée au moment de cette implémentation) — **aucune dépendance de schéma réelle** : `module_overrides` est indépendante de `plans`/`plan_modules`/`tenants.billing_plan_id`. US03.3.1 documente elle-même que l'enforcement plan → activation n'est pas encore câblé dans `isEnabled()` (scope explicitement différé) ; en son absence, "revenir au comportement du plan" (AC du DELETE) est donc implémenté comme "revenir au comportement `module_activations` actuel" — cohérent avec la même simplification déjà actée côté US03.1.x. `mvn verify` passe en isolation sur la branche de cette US, sans avoir besoin d'intégrer #153 — l'ordre de merge entre les deux PR est indifférent côté schéma/tests.
- Réutilise les événements existants `ModuleActivatedEvent`/`ModuleDeactivatedEvent` (pas de nouveau type ajouté au `sealed` `ModuleLifecycleEvent`) pour l'invalidation du cache Redis (`ModuleActivationCacheService`) — ces événements documentent une transition de l'état *effectif* d'un module, quelle qu'en soit la cause (admin de tenant ou override SUPER_ADMIN).
- Refactor associé : extraction d'un `@MappedSuperclass` (`TenantModuleRecord`) partagé par `ModuleActivation` et `ModuleOverride` — corrige une duplication de code détectée par le Quality Gate SonarCloud (54 % de `ModuleOverride.java` dupliqué avec `ModuleActivation.java`), sans changement de schéma ni de comportement.
- Point signalé au mainteneur (non bloquant) : `ModuleActivationService#isEnabled(Long, String)`, méthode exportée dans `pivot-core-starter` et potentiellement consommée par les implémentations `PivotModule#isEnabled` des repos modules externes, voit sa résolution interne étendue (override en premier, repli inchangé). Signature identique, comportement strictement inchangé pour tout tenant/module sans override — l'interface `PivotModule` elle-même (le contrat de module au sens CLAUDE.md) n'est pas modifiée.
- Frontend Angular (écran super-admin de gestion des overrides) : hors périmètre de cette US — PR `pivot-ui` dédiée, non planifiée à ce jour.

---
Item Type: US · Parent: F03.3 · Module: core · Phase: Socle · Size: S · Priority: High
Stage: ✅
