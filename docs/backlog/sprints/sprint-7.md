# Sprint 7 — Gouvernance ADR (phase-3)

> ⏸️→🚀 **Verrou levé (2026-07-09) :** déclaration « Socle terminé » actée par le mainteneur
> (Sprint 6 — Axe 1 100%, Axe 2 écarté par décision explicite, Axe 3 différé à une recette unique
> en fin de tous les sprints, Axe 4 fait). Sprint démarré en parallèle des autres.

**Scope :** mise à jour de la gouvernance d'architecture uniquement — E17 (infrastructure
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

| Item | Titre | Priority | 🤖 Dev |
|------|-------|----------|--------|
| ADR | Passage ADR-008→016 de « Proposé » à « Accepté » (décision mainteneur actée) | Critical | ✅ |
| ADR | Rédaction ADR-023 (modèle d'entités catalogue) · ADR-024 (stratégie forks) · **ADR-025 (bus d'événements — bloquant E21/E29/E42/E43)** · ADR-026 (briques natives) | Critical | ✅ |

> Rédaction ADR parallélisable dans son ensemble. Les 4 ADR sont rédigés et documentés
> (2026-07-09). **Acceptation mainteneur actée le 2026-07-09** — ADR-023 à ADR-026 passés
> `Proposé → Accepté` (`docs/adr/README.md`).
