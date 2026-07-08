# Audit — architecture

**Statut :** À compléter
**Dernière révision :** 2026-07-08
**Profil agent responsable :** Architecte Modules (coordination) + Architecte Java/Spring (pivot-core) + Architecte Angular (pivot-ui)

## Résumé

Score de maturité pas encore calculé (`Statut: À compléter`) — cette section liste le contexte
et les points déjà identifiés pour préparer le premier passage d'audit formel, sur la base de
l'état réel des repos constaté début juillet 2026 (extraction `pivot-core-starter`, contrat
gateway nginx, repos modules à des stades de maturité très différents).

## Points d'attention

- [ ] Extraction `fr.pivot:pivot-core-starter` incomplète — seuls les volets `modules` et
      `tenant.TenantContext` sont faits (EN17.1, PR pivot-core#173, mergée 2026-07-08) ; `auth`
      et `team` restent à extraire (issue pivot-core#171). Tant que ce n'est pas terminé, aucun
      repo module ne peut réellement déclarer la dépendance Maven vers le starter.
- [ ] Écart doc/réalité déjà constaté sur cette extraction : plusieurs `TODO-SETUP.md` de repos
      module (`pivot-agilite-core`, `pivot-pilotage-core`) notent que la description du starter
      dans `pivot-core/CLAUDE.md` ("artifact publié via profil `release`") était obsolète avant
      EN17.1 — à revérifier maintenant que l'extraction a commencé, pour confirmer que la doc
      suit bien l'implémentation réelle.
- [ ] Contrat de gateway nginx (`pivot-ui/nginx.conf`) vs. config dev (`pivot-core/compose.yml`)
      — incident réel rencontré le 2026-07-07/08 : le compose dev n'avait pas suivi l'évolution
      du gateway (hostname `pivot-core` attendu, TLS obligatoire). Corrigé par pivot-core#175 +
      pivot-ui#117, mais révèle un risque structurel : la config dev peut diverger silencieusement
      de la config prod tant qu'aucun test n'exerce les deux en CI.
- [ ] `pivot-design-system` — repo différé (stack actée par ADR-007 : Angular CDK + SCSS BEM,
      zéro lib visuelle tierce) mais pas encore créé ; `pivot-ui` gère ses styles en interne en
      attendant. Vérifier que l'intention ADR-007 reste alignée avec l'implémentation provisoire
      au moment de la création réelle du repo.
- [ ] Hétérogénéité de maturité entre repos modules — `pivot-collaboratif-core`/`-ui` ont une
      feature complète en prod (whiteboard EN08.1) pendant que `pivot-agilite-*` et
      `pivot-pilotage-*` sont encore au stade bootstrap (squelette CI/CD, aucune feature métier).
      Vérifier que les décisions d'architecture prises sur collaboratif (précédent réel) sont
      bien répercutées comme référence dans les deux autres avant qu'ils ne divergent.
- [ ] Schéma multi-BDD (`public`/`pilotage`/`agilite`/`collaboratif`) — FK cross-schéma
      autorisées uniquement vers `public` : vérifier que cette règle est réellement respectée
      dans les migrations Flyway de chaque module (pas seulement documentée).

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---------|------|-------|------------------------|
| v1 | 2026-06-20 | — | Initialisation |
| v2 | 2026-07-08 | — | Ajout profil agent responsable |
| v3 | 2026-07-08 | — | Contexte et points d'attention initiaux (préparation premier audit formel) |
