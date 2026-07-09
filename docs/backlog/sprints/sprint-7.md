# Sprint 7 — Gouvernance ADR (phase-3) + Migration BFF Auth

> ⏸️→🚀 **Verrou levé (2026-07-09) :** déclaration « Socle terminé » actée par le mainteneur
> (Sprint 6 — Axe 1 100%, Axe 2 écarté par décision explicite, Axe 3 différé à une recette unique
> en fin de tous les sprints, Axe 4 fait). Sprint démarré en parallèle des autres.

**Scope :** mise à jour de la gouvernance d'architecture — E17 (infrastructure
multi-repo) déplacé vers **Sprint 5, Vague 0** (2026-07-07) : son README d'épique documentait déjà
une condition de déclenchement propre (« E03 Done », pas « Socle terminé »), incompatible avec le
verrou post-Socle qu'imposait sa place dans ce sprint alors que le repo cible du noyau whiteboard
Socle (`pivot-collaboratif-core/-ui`, ADR-006) en dépend. Détail → `sprint-5.md` §Reséquencement E17.
**Pré-requis :** E03 terminé · E07 infra prod validée (S4)

> **Correction de numérotation ADR (2026-07-09) :** les ADR-017 à ADR-020 initialement visés ici
> ont été réattribués entre-temps à la vague Protection des données (`pivot-docs#144`,
> 2026-07-08) — cf. note dans `docs/adr/README.md`. Les 4 sujets ci-dessous reprennent donc les
> premiers numéros libres : **ADR-023** (modèle d'entités catalogue), **ADR-024** (stratégie
> forks), **ADR-025** (bus d'événements), **ADR-026** (briques natives).
>
> **Reséquencement E01 (2026-07-10)** : EN01.14 à EN01.18 (migration BFF — `ClientRegistrationRepository`
> dynamique, Spring Session JDBC, Keycloak embarqué, rework auth frontend, retrait PKCE Angular,
> voir [ADR-004 v2](../../adr/ADR-004-oidc-multi-tenant.md)/[ADR-005 v2](../../adr/ADR-005-opaque-tokens.md))
> sont `Phase: v1-enterprise`, pas `phase-3` — leur place « par défaut » était `backlog-post-s12.md`
> (après Sprint 12), ce qui n'a pas de sens pour un chantier qui réécrit de l'auth déjà livrée
> (`EN01.1/EN01.2/EN01.10/EN01.11`, tous Done) et débloque l'argument de vente « SSO enterprise »
> en avant-vente grand compte. Sprint 7 est le premier sprint déverrouillé après Socle : c'est donc
> le placement « au plus tôt » compatible avec le verrou post-Socle, plutôt qu'une nouvelle
> numérotation de sprint (qui aurait décalé 6 fichiers et toutes leurs références croisées — voir
> discussion avec le mainteneur). Gate 1 (DoR) pas encore passé sur ces 5 items — `Stage: ⬜`
> inchangé (état interne `Backlog`) tant que le PO Agent ne les a pas challengés.

| Item | Titre | Priority | 🤖 Dev |
|------|-------|----------|--------|
| ADR | Passage ADR-008→016 de « Proposé » à « Accepté » (décision mainteneur actée) | Critical | ✅ |
| ADR | Rédaction ADR-023 (modèle d'entités catalogue) · ADR-024 (stratégie forks) · **ADR-025 (bus d'événements — bloquant E21/E29/E42/E43)** · ADR-026 (briques natives) | Critical | ✅ |
| EN01.14 | [ClientRegistrationRepository dynamique par tenant](../EPIC-auth-iam/ENABLERS/en-oidc-client-registration-dynamique.md) | High | ⬜ |
| EN01.15 | [Migration auth interne vers Spring Session JDBC](../EPIC-auth-iam/ENABLERS/en-session-spring-jdbc.md) | High | ⬜ |
| EN01.16 | [Keycloak embarqué optionnel](../EPIC-auth-iam/ENABLERS/en-keycloak-embarque.md) | Medium | ⬜ |
| EN01.17 | [Rework Angular auth infra (BFF)](../EPIC-auth-iam/ENABLERS/en-frontend-auth-bff-rework.md) | High | ⬜ |
| EN01.18 | [Retrait PKCE hand-rolled Angular](../EPIC-auth-iam/ENABLERS/en-retrait-pkce-angular.md) | High | ⬜ |

> Rédaction ADR parallélisable dans son ensemble. Les 4 ADR sont rédigés et documentés
> (2026-07-09). **Acceptation mainteneur actée le 2026-07-09** — ADR-023 à ADR-026 passés
> `Proposé → Accepté` (`docs/adr/README.md`). EN01.14 bloque EN01.16/17/18 (séquencement interne) ;
> EN01.15 est indépendante et parallélisable avec EN01.14.
