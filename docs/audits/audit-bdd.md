# Audit — bdd

**Statut :** À compléter
**Dernière révision :** 2026-06-20
**Profil agent responsable :** Architecte BDD PostgreSQL

## Résumé

Score de maturité pas encore calculé (`Statut: À compléter`) — cette section liste le contexte
et les points déjà identifiés pour préparer le premier passage d'audit formel, sur la base de
l'architecture multi-schéma réelle et d'un incident rencontré en session le 2026-07-07.

## Points d'attention

- Schéma multi-BDD — une seule instance PostgreSQL partagée, un schéma par module
      (`public`/`pilotage`/`agilite`/`collaboratif`), FK cross-schéma autorisées uniquement vers
      `public` (`teams.id`/`tenants.id`). Vérifier que chaque migration Flyway module respecte
      bien cette règle (pas de FK directe vers un autre schéma module).
- Convention "V1 unique avant la BETA" — tout changement de schéma plié dans l'unique
      `V1__schema_init.sql` plutôt que des migrations incrémentales, tant que rien n'est en prod
      (règle explicite `pivot-core/CLAUDE.md`). Vérifier que les repos modules (`agilite-core`,
      `collaboratif-core`, `pilotage-core`) suivent la même convention, pas seulement pivot-core.
- Incident réel rencontré le 2026-07-07 (cette session) : changement du contenu de
      `V1__schema_init.sql` sur `main` → `FlywayValidateException: Migration checksum mismatch`
      sur toute base de dev locale déjà migrée avec l'ancienne version. Comportement attendu vu
      la convention V1 unique, mais aucune doc développeur ne prévient de la nécessité de reset
      la base locale (`docker compose down && docker volume rm ... && docker compose up`) à
      chaque évolution du schéma pré-BETA — à documenter dans le setup dev (`pivot-docs/docs/setup/`).
- Seeds de test (`V2__test_seeds.sql`, chargées uniquement sous profil Spring `test`) —
      vérifiées présentes et fonctionnelles sur `pivot-core` (5 comptes : super_admin/admin/
      user/unverified/blocked). Vérifier l'équivalent sur les repos modules dès qu'ils auront un
      schéma réel (`agilite-core`/`pilotage-core` sont encore bootstrap, pas de schéma métier).
- Index et performance — aucune revue de plan de requêtes n'a encore été faite sur les
      tables à forte volumétrie potentielle (`audit_events`, `access_tokens`) ; à prévoir une
      fois du trafic réel observé plutôt qu'en pré-optimisation.

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---------|------|-------|------------------------|
| v1 | 2026-06-20 | — | Initialisation |
