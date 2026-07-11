# Sprints — PIVOT Platform

Source de vérité pour l'organisation des sprints et l'assignation des US aux branches. Un fichier
par sprint — voir [pourquoi](#pourquoi-un-fichier-par-sprint) en bas de page.

**Règle branche :** `feat/{us-id}-{slug}` par US/Enabler — une branche par item, agents en parallèle sur branches séparées.

---

## Sommaire

| Sprint | Titre | Statut |
|--------|-------|--------|
| [Sprint 1](./sprint-1.md) | Auth & Shell Socle | ✅ Terminé sauf contact |
| [Sprint 2](./sprint-2.md) | Système de modules + Auth manquant | ✅ Terminé |
| [Sprint 3](./sprint-3.md) | Espace compte + Administration | 🔎 15/15 mergées — en attente de recette |
| [Sprint 4](./sprint-4.md) | Infrastructure prod + Auth avancé + Notifications | ✅ 16/16 mergées |
| [Sprint 5](./sprint-5.md) | Infra multi-repo (E17) + Module Whiteboard (Socle) | 🚀 Démarré (2026-07-07) — Gate 1 passé 25/25 items · Vague 0 (E17) 🔄 7/8 (EN17.1 partiel, voir `pivot-core#171`) · Vague 1+ (whiteboard) 🔄 En cours |
| [Sprint 6](./sprint-6.md) | Durcissement & recette Socle 🏁 | ✅ Socle terminé (déclaré 2026-07-09 — Axe 2 écarté, Axe 3 différé en fin de tous les sprints) |
| [Sprint 7](./sprint-7.md) | Gouvernance ADR (phase-3) + Migration BFF Auth (EN01.14-18) | 🔄 Gouvernance ADR ✅ Terminé (2026-07-09) — ADR-008→016 et ADR-023→026 tous Accepté · Migration BFF (EN01.14-18) ⬜ pas démarrée |
| [Sprint 8](./sprint-8.md) | Pilote multi-repo (agilité) + enforcement taxonomie | ✅ Terminé (2026-07-11) — templates satellites validés (EN17.11), TAXO-2 fait, écart ADR-026 §2 comblé (US09.2.3) |
| [Sprint 9](./sprint-9.md) | Socle **technique** Pilotage + Roadmap v0 *(re-trié 2026-07-10)* | 🔓 Débloqué (2026-07-11, Sprint 8 clos — REX satisfait) — E40 (profil adaptatif) sorti → queue idéation |
| [Sprint 10](./sprint-10.md) | Pilotage cœur PPM | 🔓 Débloqué (suite S9) — inchangé au re-tri |
| [Sprint 11](./sprint-11.md) | Risques + plan de contrôle sécurité | 🔓 Débloqué — inchangé au re-tri |
| [Sprint 12](./sprint-12.md) | Forms (cœur) + framework onboarding | 🔓 Débloqué — inchangé au re-tri |
| [Sprint 13](./sprint-13.md) | Satellites Pilotage à valeur (E24 ADR · E26 Budget · E27 OKR · E23 v2) *(nouveau 2026-07-10)* | 🔓 Débloqué (suite S9-S11) — remonté de post-S12, **avant** la queue idéation |
| [Backlog post-S12](./backlog-post-s12.md) | Queue non planifiée — dont **idéation** : E40 profil adaptatif, EN18.3-8 habillage entreprise | — |
| [Zones d'ombre à raffiner](./zones-ombre.md) | Décisions produit/cadrage en attente | — |

---

## Sprints 7–13 — Plan phase-3 (conditionnel au jalon « Socle terminé »)

> ✅ **Verrou Socle levé (2026-07-10)** — déclaration « Socle terminé » actée (Sprint 6), gouvernance
> ADR terminée (Sprint 7, dont **ADR-025** bus d'événements/schéma inter-briques, Accepté — le
> goulot invisible de chemin critique dès S9+). Ces sprints sont désormais **débloqués** ; seule
> contrainte de séquencement restante : le principe « piloter petit avant de piloter gros »
> (valider les templates satellites issus de Sprint 5 sur l'agilité — **Sprint 8** — avant
> d'engager le domaine Pilotage en Sprint 9). **Sprint 8 clos le 2026-07-11** — les deux goulots
> sont maintenant levés, Sprint 9 démarre.
>
> **Re-tri du 2026-07-10 — valeur pilotage avant idéation :** le domaine Pilotage était bâti sur deux
> blocs d'idéation qui bloquaient son démarrage et n'apportaient pas de valeur directe :
> - **E40 profil adaptatif** (US40.1.1-6) était en tête de Sprint 9. Couplage roadmap→profil **mou**
>   (le profil ne pilote que le curseur d'altitude + l'activation des features) → **découplé** via
>   **EN18.10 profil par défaut** ; E40 reséquencé en **queue idéation** (se greffe plus tard).
> - **E18 EN18.3-8** (Cloud/SaaS RGPD, RGAA, perf, admin sans code, hébergement FR/UE, on-premise) =
>   habillage entreprise → **queue idéation**. Seul le **socle technique EN18.1/18.2/18.9 (+ EN18.10)**
>   reste en Sprint 9 (extraction de l'idéation + Gate 1 = 1re action du sprint).
>
> Résultat : toute la valeur pilotage (S9 roadmap → S10 Gantt/portefeuille → S11 risques → **S13
> satellites E24/E26/E27 + E23 v2**) passe **avant** les deux blocs d'idéation (E40, EN18.3-8),
> désormais relégués en [`backlog-post-s12.md`](./backlog-post-s12.md). Promotion hors idéation d'E40
> et EN18.3-8 = décision explicite du mainteneur (voir `STATUS.md` §Décisions ouvertes).
>
> **Hypothèse de capacité :** ~11-19 items/sprint (vélocité observée S1-S3, agents parallèles).

---

## Règles d'utilisation

1. **Démarrage item :** `git checkout main && git pull && git checkout -b feat/{us-id}-{slug}`
2. **US en cours :** commits atomiques sur `feat/{us-id}-{slug}` — backlog + code dans chaque commit
3. **Actions parallèles :** plusieurs US du sprint lancées simultanément — **une branche par US/Enabler**, agents séparés
4. **Mise à jour du sprint courant :** à chaque changement d'état d'une US, dans le fichier `sprint-{N}.md` du sprint courant (commit sur la branche de l'US)
5. **Fin d'US :** PR `feat/{us-id}-{slug} → main`, autoloop review + CI, Gate 4 = 100/100
6. **US bloquée :** retour Backlog + note dans le fichier du sprint courant + commit sur la branche de l'US courante

## Pourquoi un fichier par sprint

Avant juillet 2026, tout vivait dans un unique `SPRINTS.md`. Avec plusieurs Dev Agents en parallèle
sur des US différentes, chacun met à jour ce même fichier à chaque changement d'état — collision
quasi systématique. Un fichier par sprint confine la contention au **sprint courant** : les sprints
clos ou pas encore démarrés ne bougent plus et ne sont jamais touchés par un agent en cours de
travail sur un autre sprint.

---

*Dernière mise à jour : 2026-07-06 — split de l'ancien `SPRINTS.md` en un fichier par sprint (`docs/backlog/sprints/`) pour réduire la contention entre agents parallèles.*
