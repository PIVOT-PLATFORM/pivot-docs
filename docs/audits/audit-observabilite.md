# Audit — observabilité

**Statut :** À compléter
**Dernière révision :** 2026-07-08
**Profil agent responsable :** Expert DevSecOps

## Résumé

Audit de la couverture d'observabilité (logs structurés, métriques, health checks) sur les
repos backend (`pivot-core` + modules `-core`) et frontend (`pivot-ui` + modules `-ui`).

Catégorie absente jusqu'ici bien que `skill-observability.yaml` soit chargé dans chaque repo et
que l'infrastructure existe déjà : Spring Actuator (groupes `readiness`/`liveness` incluant
`db`/`redis`/`flyway`), Micrometer/Prometheus, logs JSON structurés
(`logstash-logback-encoder`), table `audit_events` pour les événements métier sensibles (auth,
admin).

## Points d'attention

- [ ] Cohérence des health groups (`readiness`/`liveness`) entre `pivot-core` et les modules
      `-core` — vérifier que chaque module suit le même modèle que `pivot-core`
      (`readinessState,db,redis,flyway` / `livenessState`)
- [ ] Couverture des logs structurés côté modules `-core` récemment bootstrappés
      (`pivot-agilite-core`, `pivot-pilotage-core`) — à comparer avec `pivot-core` (référence)
- [ ] `audit_events` — événements sensibles couverts (`LOGIN_SUCCESS`/`LOGIN_BLOCKED`/
      `LOGIN_UNVERIFIED_EMAIL` déjà vus dans les seeds `pivot-core`) : lister les événements
      manquants (ex. actions admin, changement de rôle, activation/désactivation module)
- [ ] Dashboards/alerting réels branchés sur Prometheus, ou seulement instrumentation exposée
      sans consommateur en aval — à clarifier

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---------|------|-------|------------------------|
| v1 | 2026-07-08 | — | Initialisation |
