# Sprint 9 — Socle technique Pilotage + Roadmap v0

> ✅ **Verrou Socle levé (2026-07-10)** — voir [`sprint-8.md`](./sprint-8.md). Pilotage reste
> séquencé **après la livraison du REX templates de Sprint 8** (pilote agilité) : *« piloter petit
> avant de piloter gros »* (voir [README §Séquencement](./README.md#sprints-713--plan-phase-3-conditionnel-au-jalon--socle-terminé-)).

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

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| EN18.1 | Schéma Flyway `pilotage` + entités JPA (Application, Project, Milestone…) | M | Critical | ⬜ |
| EN18.2 | Guard Angular module pilotage | S | Critical | ⬜ |
| EN18.9 | Modèle Application → Projet | M | High | ⬜ |
| EN18.10 | **Profil d'organisation par défaut (altitude fixe, sans adaptation)** — couture de découplage d'E40 *(net-new 2026-07-10)* | S | Critical | ⬜ |
| EN22.1a | Schéma temporel `pilotage` (11 tables) *(ex-EN22.1 XL, scindé 2026-07-10)* | L | Critical | ⬜ |
| EN22.1b | Moteur CPM & API (`schedule`/`reSchedule` incrémental) | L | Critical | ⬜ |
| EN22.1c | Jalon partagé, agrégation, dérivation de vues & événements | L | Critical | ⬜ |
| EN22.2 | Performance & collaboration web du Gantt | XL | High | ⬜ |
| US22.3.1 | Créer une roadmap rapide | M | High | ⬜ |
| US22.3.2 | Échelle de temps floue (trimestres/semestres) | S | High | ⬜ |
| US22.3.3 | Vue Now / Next / Later | M | Should | ⬜ |
| US22.3.4 | Jalons stratégiques | S | High | ⬜ |
| US22.3.5 | Partage & export de la roadmap | S | Should | ⬜ |

## Pré-requis d'amorçage (première action, avant tout Dev Agent)

1. **Extraire EN18.1/18.2/18.9 de `BACKLOG-IDEATION/EPIC-pilotage` vers le backlog opérationnel**
   (promotion partielle d'E18 : socle technique uniquement ; EN18.3-8 restent en idéation) —
   PR `pivot-docs` dédiée, liens entrants/sortants vérifiés + `npm run build` vert (précédent liens
   cassés : commit `f26f4ab`).
2. **Rédiger EN18.10** (profil par défaut) dans le backlog opérationnel — enabler net-new.
3. **Gate 1 (PO Agent)** sur les 4 enablers socle + EN22.1/22.2 + US22.3.x — DoR complet, ACs
   Given/When/Then, erreur + sécurité. Ces fiches étaient des stubs (`ACs à détailler au Gate 1`).

> **Blocker :** EN18.1 précède tout · EN18.10 précède l'activation des features (évite la dépendance
> dure à E40) · EN22.1a→b→c (contrat figé) précèdent F22.3 et tout le Sprint 10. E40 (profil adaptatif) **n'est plus un
> prérequis** de ce sprint — reséquencé en queue idéation.
