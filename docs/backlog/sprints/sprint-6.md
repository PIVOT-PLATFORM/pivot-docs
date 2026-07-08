# Sprint 6 — Durcissement & recette Socle 🏁

**Branches :** une branche par US/Enabler — `feat/{us-id}-{slug}` (voir [§Règles d'utilisation](./README.md#règles-dutilisation))
**Scope :** clôture du périmètre Socle — reliquats, dette, recette
**Jalon de sortie :** déclaration **« Socle terminé »** par le mainteneur → déverrouille les sprints 7+

## Lancement (2026-07-09)

Gate 1 (PO Agent) passé sur les items éligibles Phase Socle : `Stage: Backlog → Ready` pour
EN07.3, US05.13.1, US05.13.2, US05.15.1, US05.15.2 (Enabler EN07.3 complété avec Objectif
technique + Justification, absents à l'origine). Agents dev lancés en parallèle sur ces 5 items
(isolation git worktree côté `pivot-core`, évite les conflits inter-agents sur les fichiers
partagés — `compose.yml`, workflows CI).

**Volontairement exclus de ce lancement** (voir tableau ci-dessous pour le détail) :
- **EN07.4** (PgBouncer) — déjà assignée à un mainteneur humain (`leo-brgn`,
  `pivot-core#185`) : lancer un agent dessus reproduirait la collision déjà vécue sur
  `pivot-ui#121`/`#122`. `Stage: Ready` quand même mis à jour (DoR complète), pas de conflit sur
  le fait qu'elle soit prête — seulement sur qui l'implémente.
- **US05.14.1-3** (branch protection required-checks) — modifient une config de repo partagée
  hors du flux PR normal (paramètres GitHub, pas du code revu). Hors périmètre d'un lancement
  autonome sans confirmation explicite du mainteneur.
- **Dette S2** Redis cache + dédup `sanitizeReturnUrl` — aucun ticket dédié (juste des lignes
  narratives dans `STATUS.md`), pas de DoR à évaluer. Nécessitent une US/Enabler en bonne et due
  forme avant tout lancement.
- **Recette** (a11y, bug bash) — tâches humaines par nature, non déléguables à un agent dev.

| Item | Titre | Priorité | 🤖 Dev |
|------|-------|----------|--------|
| EN17.1 | Reste de l'extraction `pivot-core-starter` — `modules`/`tenant`/`auth`/`team` extraits (PR #167/#173/#177/#180), `pivot-core#171` fermée | Critical | ✅ Review (recette mainteneur → Done) |
| EN07.3 | ActiveMQ persistence KahaDB | High | 🔄 In progress |
| EN07.4 | PgBouncer session mode configuration prod — [pivot-core#185](https://github.com/PIVOT-PLATFORM/pivot-core/issues/185), assignée à leo-brgn | High | ⬜ (assignée, hors lancement agent — évite collision) |
| US05.13.1 | ZAP baseline planifié | Medium | 🔄 In progress |
| US05.13.2 | ZAP full scan + rapport | Medium | 🔄 In progress |
| US05.14.1-3 | Required checks core/ui/docs (branch protection) | High/Medium | ⬜ — hors lancement agent, config repo partagée : attend confirmation explicite mainteneur |
| US05.15.1 | Composite action setup partagée | Medium | 🔄 In progress |
| US05.15.2 | Aligner workflows ui sur conventions core | Medium | 🔄 In progress |
| Dette S2 | Raccorder cache Redis EN03.3 au chemin de lecture statut module | High | ⬜ — pas de ticket dédié, hors lancement |
| Dette S2 | Aligner champ `description` API modules avec `PivotModule` | Medium | ✅ Done — [pivot-core#184](https://github.com/PIVOT-PLATFORM/pivot-core/pull/184) |
| Dette S2 | Dédupliquer `sanitizeReturnUrl` (US01.1.4/01.1.5, pivot-ui) | Low | ⬜ — pas de ticket dédié, hors lancement |
| Recette | Passe accessibilité (WCAG 2.1 AA) sur Auth/Shell/Modules/Whiteboard | High | ⬜ — recette humaine |
| Recette | Bug bash Socle complet + recette PO des US `Review` | Critical | ⬜ — recette humaine |

> **Noyau whiteboard (E30, F08.x/EN08.x)** reste porté par `sprint-5.md` (Vague 1+), pas dupliqué
> ici — mais sa complétion (17/17 `Done`) est un pré-requis du jalon « Socle terminé » au même
> titre que les items ci-dessus. État à date (2026-07-08, voir `EPIC-collaboration/README.md`
> §Suivi noyau) : 0/17 `Done` — 12 Review · 2 In progress · 5 Ready.

## Definition of Done — Socle

*Rédigée le 2026-07-08 en réponse à [§Zones d'ombre n°1](./zones-ombre.md) : le jalon n'avait
aucun critère écrit. Checklist proposée, en 4 axes — à valider/amender par le mainteneur avant
de servir de base à la déclaration « Socle terminé ».*

Le mainteneur déclare « Socle terminé » quand les 4 axes suivants sont à 100% :

### Axe 1 — Features (code)

- [ ] E01–E07, E16 : 100% des US/Enablers `Phase: Socle` en `Stage: Done`
- [ ] E17 : 8/8 enablers `Done` — **reste : EN17.1** (extraction `modules`/`tenant`/`auth`/`team`,
      voir tableau ci-dessus et [pivot-core#171](https://github.com/PIVOT-PLATFORM/pivot-core/issues/171))
- [ ] E30 noyau F08.x/EN08.x : 17/17 items `Done` — **état actuel : 0/17** (12 Review, 2 In
      progress, 5 Ready — voir `EPIC-collaboration/README.md` §Suivi noyau, resynchronisé
      régulièrement vu le rythme d'avancement)
- [ ] E07 : EN07.3 (ActiveMQ persistence) + EN07.4 (PgBouncer session mode) sortis de `Backlog`

### Axe 2 — Prod

- [ ] Déploiement stable sur l'environnement cible (GCP Cloud Run ou équivalent — cf. E07)
- [ ] Healthchecks verts, aucun incident P0/P1 ouvert
- [ ] Migrations Flyway appliquées sans erreur sur l'environnement de prod/staging

> Axe non vérifiable depuis `pivot-docs` (repo sans code applicatif) — à confirmer par les
> experts infra `pivot-core`/`pivot-ui` avant la déclaration.

### Axe 3 — Recette PO (mainteneur)

- [ ] E02 (Espace compte) — recette
- [ ] E04 (Observabilité) — recette
- [ ] E06 (Administration) — recette
- [ ] E07 (EN07.1/EN07.2/EN07.5) — recette
- [ ] US01.4.2 / US01.4.3a / US01.5.1 (Auth avancé) — recette
- [ ] US16.1.3 (badge notifs), US16.2.2 (modules à venir), US16.3.1 (contact) — recette
- [ ] EN-NOTIF + US03.3.1-3 (notifications, plans SUPER_ADMIN) — recette

### Axe 4 — Hygiène (zones-ombre n°10)

- [ ] Vulnérabilités Dependabot résolues (3 signalées à date, dont 1 high)
- [ ] Branche `fix/pages-deploy-settling-delay` nettoyée (ou confirmée couverte par #57)
- [ ] Build local PNG PlantUML non bloquant pour les contributeurs (contournement identifié :
      régénération manuelle via le jar CI — à documenter si le besoin est récurrent)

### Ce que cette checklist ne tranche pas

- Le contenu exact des seuils de l'Axe 2 — dépend de décisions d'infra/SRE hors backlog markdown.
- Si les items encore `Backlog`/`In progress` (EN05.13-15, EN07.3/4, EN17.1 restant, E30 noyau)
  doivent être **terminés** avant la déclaration, ou si le mainteneur préfère en **basculer
  certains explicitement en dette différée hors Socle** — décision de scope, pas de cohérence
  documentaire. Vu l'écart actuel (0/17 sur le noyau whiteboard, 7 US E05 jamais commencées),
  cette checklist suggère que le jalon est encore loin, pas imminent.
