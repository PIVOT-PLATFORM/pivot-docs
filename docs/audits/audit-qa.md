# Audit — qa

**Statut :** À compléter
**Dernière révision :** 2026-07-08
**Profil agent responsable :** Expert QA

## Résumé

Score de maturité pas encore calculé (`Statut: À compléter`) — cette section liste le contexte
et les points déjà identifiés pour préparer le premier passage d'audit formel, sur la base de
la couverture de tests réelle constatée par repo début juillet 2026.

## Points d'attention

- [ ] Couverture E2E hétérogène entre les `-ui` : `pivot-ui` et `pivot-collaboratif-ui`
      exécutent Playwright contre un vrai backend GHCR ; `pivot-agilite-ui` a explicitement
      retiré cette dépendance (PR agilite-ui#12, "unneeded pivot-core backend dependency") ;
      `pivot-pilotage-ui` n'a pas encore d'E2E (bootstrap, aucune page réelle à tester). Décider
      si ces écarts sont des choix produits assumés ou des trous de couverture à combler.
- [ ] E2E `pivot-collaboratif-ui` non fiable en pratique depuis la release v1.0.0 de
      `pivot-collaboratif-core` (2026-07-06) — échoue avec `docker: denied` (accès GHCR
      cross-repo non accordé, voir audit CI/CD). Le check n'est pas encore un required check
      donc ne bloque pas les merges, mais fausse la confiance donnée à ce signal QA en attendant
      la correction côté permissions.
- [ ] Tests Testcontainers non vérifiables en sandbox agent — la PR pivot-core#173 (EN17.1) a
      documenté explicitement l'impossibilité de valider les IT `AbstractIntegrationTest` en
      environnement Claude Code sandboxé (Docker-in-Docker/Ryuk injoignable), en s'appuyant sur
      la CI GitHub réelle à la place. Point structurel pour tout futur agent autonome, pas
      spécifique à cette PR — documenter la limitation une fois pour éviter de la redécouvrir.
- [ ] Mutation testing — PITest (Java) et Stryker (Angular) sont volontairement non bloquants
      (`continue-on-error`) ; Stryker sur `pivot-ui` a déjà dû être déplacé en cron hebdomadaire
      pour timeout sur les PR auth (voir `audit-cicd.md`). Vérifier si les repos modules
      atteignent des volumes de test similaires nécessitant le même traitement.
- [ ] Seuils de couverture Gate 2 (≥85 %) — seuils identiques déclarés dans tous les repos,
      mais jamais vérifiés de façon consolidée multi-repo à ce jour.

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---------|------|-------|------------------------|
| v1 | 2026-06-20 | — | Initialisation |
| v2 | 2026-07-08 | — | Ajout profil agent responsable |
| v3 | 2026-07-08 | — | Contexte et points d'attention initiaux (préparation premier audit formel) |
