# Sprint 6 — Durcissement & recette Socle 🏁

**Branches :** une branche par US/Enabler — `feat/{us-id}-{slug}` (voir [§Règles d'utilisation](./README.md#règles-dutilisation))
**Scope :** clôture du périmètre Socle — reliquats, dette, recette
**Jalon de sortie :** déclaration **« Socle terminé »** par le mainteneur → déverrouille les sprints 7+

| Item | Titre | Priorité | 🤖 Dev |
|------|-------|----------|--------|
| EN17.1 | Reste de l'extraction `pivot-core-starter` — `modules`/`tenant`/`auth` à déplacer, `team` à implémenter (jamais fait, bloque la FK cross-schéma EN17.4) — [pivot-core#171](https://github.com/PIVOT-PLATFORM/pivot-core/issues/171) | Critical | 🔄 In progress |
| EN07.3 | ActiveMQ persistence KahaDB | High | ⬜ |
| EN07.4 | PgBouncer session mode configuration prod | High | ⬜ |
| EN05.13-15 | CI/CD Supply-chain restants | High | ⬜ |
| E05 US restantes | 7 US supply-chain | High | ⬜ |
| Dette S2 | Raccorder cache Redis EN03.3 au chemin de lecture statut module | High | ⬜ |
| Dette S2 | Aligner champ `description` API modules avec `PivotModule` | Medium | ⬜ |
| Dette S2 | Dédupliquer `sanitizeReturnUrl` (US01.1.4/01.1.5, pivot-ui) | Low | ⬜ |
| Recette | Passe accessibilité (WCAG 2.1 AA) sur Auth/Shell/Modules/Whiteboard | High | ⬜ |
| Recette | Bug bash Socle complet + recette PO des US `Review` | Critical | ⬜ |

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
