# Sprint 9 — Socle technique Pilotage + Roadmap v0

> ✅ **Verrou Socle levé (2026-07-10)** — voir [`sprint-8.md`](./sprint-8.md). Pilotage reste
> séquencé **après la livraison du REX templates de Sprint 8** (pilote agilité) : *« piloter petit
> avant de piloter gros »* (voir [README §Séquencement](./README.md#sprints-79-1720--plan-phase-3-conditionnel-au-jalon--socle-terminé-)).
>
> 🏁 **Terminé (2026-07-11)** : socle technique (EN18.1/18.2/18.9/18.10, EN22.1a/b/c) et roadmap
> rapide v0 (US22.3.1 à 3.5) mergés — backend `pivot-pilotage-core` et frontend
> `pivot-pilotage-ui`. Retrofit `team_id` (13 tables) effectué en cours de sprint après détection
> d'un écart avec le pattern agilite validé au Sprint 8. **Release `pivot-pilotage-ui` v0.1.0**
> déclenchée sur le dernier merge. `Stage` frontmatter de chaque item reste `⬜` jusqu'à la recette
> mainteneur individuelle.

**Scope :** la colonne vertébrale **technique** du domaine + la roadmap v0. Pas les satellites, et
**pas le profil adaptatif** (E40) — voir §Re-tri ci-dessous.
**Sortie :** une roadmap simple créable de bout en bout, sur un **profil par défaut** (altitude fixe).

## Re-tri (2026-07-10) — valeur pilotage avant idéation

Ce sprint était bâti sur deux blocs d'**idéation** qui bloquaient le démarrage :

- **E40 profil adaptatif** (US40.1.1-6) — était en tête, `Critical`. Le couplage roadmap→profil est
  **mou** (le profil ne fait que piloter le *curseur d'altitude* roadmap↔Gantt et l'activation des
  features via PP-A02, cf. `EPIC-roadmap/README.md` §Altitude). → **retiré de ce sprint**, remplacé
  par **EN18.10 (profil par défaut, altitude fixe)** qui sert de couture. E40 se greffera dessus
  plus tard (queue idéation, [`backlog-post-s12.md`](./backlog-post-s12.md)).
- **EN18.3-8** (Cloud/SaaS RGPD, localisation RGAA, perf consolidation, admin sans code, hébergement
  FR/UE, on-premise) — habillage entreprise, hors valeur pilotage. → restent en queue idéation.

Ne reste ici que le **socle technique non spéculatif** : EN18.1/18.2/18.9 (+ EN18.10). Ces fiches
vivent encore dans `BACKLOG-IDEATION/EPIC-pilotage` (conteneur E18 mis en idéation le 2026-07-09) —
leur **extraction + Gate 1 est la première action du sprint** (voir §Pré-requis d'amorçage), avant
toute implémentation.

## Items

> **EN22.2 reséquencé vers Sprint 10 (2026-07-11)** : dépend du Gantt UI (US22.4.x) qui n'existe
> pas encore — ne peut pas être implémenté avant. Voir `sprint-10.md`.

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| EN18.1 | Schéma Flyway `pilotage` + entités JPA (Application, Project, Milestone…) | M | Critical | ✅ mergé ([pivot-pilotage-core#23](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/23)) |
| EN18.2 | Guard Angular module pilotage | S | Critical | ✅ mergé ([pivot-pilotage-ui#15](https://github.com/PIVOT-PLATFORM/pivot-pilotage-ui/pull/15)) |
| EN18.9 | Modèle Application → Projet | M | High | ✅ mergé ([pivot-pilotage-core#28](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/28)) |
| EN18.10 | **Profil d'organisation par défaut (altitude fixe, sans adaptation)** — couture de découplage d'E40 *(net-new 2026-07-10)* | S | Critical | ✅ mergé ([pivot-pilotage-core#27](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/27), retrofit `team_id` [#30](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/30)) |
| EN22.1a | Schéma temporel `pilotage` (11 tables) *(ex-EN22.1 XL, scindé 2026-07-10)* | L | Critical | ✅ mergé ([pivot-pilotage-core#24](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/24)) |
| EN22.1b | Moteur CPM & API (`schedule`/`reSchedule` incrémental) | L | Critical | ✅ mergé ([pivot-pilotage-core#25](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/25)) |
| EN22.1c | Jalon partagé, agrégation, dérivation de vues & événements | L | Critical | ✅ mergé ([pivot-pilotage-core#26](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/26)) |
| US22.3.1 | Créer une roadmap rapide | M | High | ✅ mergé (backend [pivot-pilotage-core#32](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/32), frontend [pivot-pilotage-ui#17](https://github.com/PIVOT-PLATFORM/pivot-pilotage-ui/pull/17)) |
| US22.3.2 | Échelle de temps floue (trimestres/semestres) | S | High | ✅ mergé (frontend seul, projection d'affichage — [pivot-pilotage-ui#19](https://github.com/PIVOT-PLATFORM/pivot-pilotage-ui/pull/19)) |
| US22.3.3 | Vue Now / Next / Later | M | Should | ✅ mergé (backend [pivot-pilotage-core#39](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/39), frontend [pivot-pilotage-ui#25](https://github.com/PIVOT-PLATFORM/pivot-pilotage-ui/pull/25)) |
| US22.3.4 | Jalons stratégiques | S | High | ✅ mergé (backend [pivot-pilotage-core#37](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/37), frontend [pivot-pilotage-ui#22](https://github.com/PIVOT-PLATFORM/pivot-pilotage-ui/pull/22)) |
| US22.3.5 | Partage & export de la roadmap | S | Should | ✅ mergé (backend [pivot-pilotage-core#36](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/36), frontend [pivot-pilotage-ui#23](https://github.com/PIVOT-PLATFORM/pivot-pilotage-ui/pull/23)) |

## Pré-requis d'amorçage (première action, avant tout Dev Agent)

1. **Extraire EN18.1/18.2/18.9 de `BACKLOG-IDEATION/EPIC-pilotage` vers le backlog opérationnel**
   (promotion partielle d'E18 : socle technique uniquement ; EN18.3-8 restent en idéation) —
   PR `pivot-docs` dédiée, liens entrants/sortants vérifiés + `npm run build` vert (précédent liens
   cassés : commit `f26f4ab`).
2. **Rédiger EN18.10** (profil par défaut) dans le backlog opérationnel — enabler net-new.
3. **Gate 1 (PO Agent)** sur les 4 enablers socle + EN22.1 + US22.3.x — DoR complet, ACs
   Given/When/Then, erreur + sécurité. Ces fiches étaient des stubs (`ACs à détailler au Gate 1`).

> **Blocker :** EN18.1 précède tout · EN18.10 précède l'activation des features (évite la dépendance
> dure à E40) · EN22.1a→b→c (contrat figé) précèdent F22.3 et tout le Sprint 10. E40 (profil adaptatif) **n'est plus un
> prérequis** de ce sprint — reséquencé en queue idéation. EN22.2 reséquencé vers Sprint 10 (dépend
> du Gantt UI, US22.4.x — voir note ci-dessus).
