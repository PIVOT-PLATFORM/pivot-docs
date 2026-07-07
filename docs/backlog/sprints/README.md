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
| [Sprint 5](./sprint-5.md) | Infra multi-repo (E17) + Module Whiteboard (Socle) | 🚀 Démarré (2026-07-07) — Gate 1 passé 25/25 items · Vague 0 (E17) ✅ Terminé 8/8 · Vague 1+ (whiteboard) 🔄 En cours |
| [Sprint 6](./sprint-6.md) | Durcissement & recette Socle 🏁 | ⬜ Non démarré |
| [Sprint 7](./sprint-7.md) | Gouvernance ADR (phase-3) | ⏸️ Verrouillé (post-Socle) |
| [Sprint 8](./sprint-8.md) | Pilote multi-repo (agilité) + enforcement taxonomie | ⏸️ Verrouillé (post-Socle) |
| [Sprint 9](./sprint-9.md) | Socle domaine Pilotage | ⏸️ Verrouillé (post-Socle) |
| [Sprint 10](./sprint-10.md) | Pilotage cœur PPM | ⏸️ Verrouillé (post-Socle) |
| [Sprint 11](./sprint-11.md) | Risques + plan de contrôle sécurité | ⏸️ Verrouillé (post-Socle) |
| [Sprint 12](./sprint-12.md) | Forms (cœur) + framework onboarding | ⏸️ Verrouillé (post-Socle) |
| [Backlog post-S12](./backlog-post-s12.md) | Items non planifiés au-delà du Sprint 12 | — |
| [Zones d'ombre à raffiner](./zones-ombre.md) | Décisions produit/cadrage en attente | — |

---

## Sprints 7–12 — Plan phase-3 (conditionnel au jalon « Socle terminé »)

> ⏸️ **Verrou :** ces sprints ne démarrent qu'après la déclaration « Socle terminé » (Sprint 6). Séquencement fondé sur 2 goulots restants (E17 déplacé en Sprint 5, voir sa note de reséquencement) : la gouvernance ADR (bus d'événements non spécifié = chemin critique invisible de S9+), et le principe « piloter petit avant de piloter gros » (valider les templates issus de Sprint 5 sur l'agilité avant d'engager le domaine Pilotage).
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
