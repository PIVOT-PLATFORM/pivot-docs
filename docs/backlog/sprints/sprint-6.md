# Sprint 6 — Durcissement & recette Socle 🏁

**Branches :** une branche par US/Enabler — `feat/{us-id}-{slug}` (voir [§Règles d'utilisation](./README.md#règles-dutilisation))
**Scope :** clôture du périmètre Socle — reliquats, dette, recette
**Jalon de sortie :** déclaration **« Socle terminé »** par le mainteneur → déverrouille les sprints 7+

| Item | Titre | Priorité | 🤖 Dev |
|------|-------|----------|--------|
| EN07.3 | ActiveMQ persistence KahaDB | High | ⬜ |
| EN07.4 | PgBouncer session mode configuration prod | High | 🔄 In progress |
| US05.13.1 | ZAP baseline planifié | High | ⬜ |
| US05.13.2 | ZAP full scan + rapport | High | ⬜ |
| US05.14.1 | Required checks pivot-core | High | ⬜ |
| US05.14.2 | Required checks pivot-ui | High | ⬜ |
| US05.14.3 | Required checks pivot-docs | High | ⬜ |
| US05.15.1 | Composite action setup partagée — **AC bloquée** : cible "pivot-platform (ou repo dédié)" contredit la règle établie (`pivot-platform/` n'est pas un repo) ; décision de repo cible requise avant Gate 1 | Medium | ⛔ Bloqué |
| US05.15.2 | Aligner workflows `pivot-ui` sur conventions `pivot-core` — dépend d'US05.15.1 | Medium | ⛔ Bloqué |
| Dette S2 | Aligner champ `description` API modules avec `PivotModule` | Medium | 🔄 In progress |
| Dette S2 | Dédupliquer `sanitizeReturnUrl` (US01.1.4/01.1.5, pivot-ui) | Low | 🔄 In progress |
| Recette | Passe accessibilité (WCAG 2.1 AA) sur Auth/Shell/Modules/Whiteboard | High | ⬜ |
| Recette | Bug bash Socle complet + recette PO des US `Review` | Critical | ⬜ |
| EN08.3 | Authentification réelle cross-service `pivot-collaboratif-core` (bearer token opaque `pivot-core`, remplace le stub headers `X-Pivot-User-Id`/`X-Pivot-Tenant-Id`, `ADR-022`) — [détail](../EPIC-collaboration/ENABLERS/en-auth-cross-service-collaboratif.md) | Critical | ⬜ |

> **EN17.1** retiré de ce tableau (2026-07-08) : vérifié `Done` — `pivot-core#171` fermée, les 5
> volets (`db`/`modules`/`tenant`/`team`/`auth`) extraits et livrés (PR #167/#173/#177/#180),
> `ADR-022` tranche le volet `auth`. **Dette S2 "cache Redis EN03.3"** retiré également : vérifié
> déjà implémenté et câblé (`ModuleActivationCacheService`, consommé par
> `ModuleController.getModuleStatus()`) — aucun travail restant.
>
> **Noyau whiteboard (E30, F08.x/EN08.x)** reste porté par `sprint-5.md` (Vague 1+), pas dupliqué
> ici — mais sa complétion (17/17 `Done`) est un pré-requis du jalon « Socle terminé » au même
> titre que les items ci-dessus. État à date (2026-07-08, resynchronisé depuis le frontmatter de
> chaque fichier — voir `EPIC-collaboration/README.md` §Suivi noyau) : **17 Review · 0 In
> progress · 0 Ready · 0 Done** — tout le noyau a du code mergé, `Done` reste réservé à la
> recette PO du mainteneur.

## Definition of Done — Socle

*Rédigée le 2026-07-08 en réponse à [§Zones d'ombre n°1](./zones-ombre.md) : le jalon n'avait
aucun critère écrit. Checklist proposée, en 4 axes — à valider/amender par le mainteneur avant
de servir de base à la déclaration « Socle terminé ».*

Le mainteneur déclare « Socle terminé » quand les 4 axes suivants sont à 100% :

### Axe 1 — Features (code)

- [ ] E01–E07, E16 : 100% des US/Enablers `Phase: Socle` en `Stage: Done`
- [x] E17 : 8/8 enablers `Done` — **EN17.1 confirmé terminé le 2026-07-08** (5 volets extraits,
      `pivot-core#171` fermée, `ADR-022` tranche le volet `auth`)
- [ ] E30 noyau F08.x/EN08.x : 17/17 items `Done` — **état actuel : 0/17**, mais **17/17 en
      `Review`** (tout le code est mergé, reste la recette PO du mainteneur — voir
      `EPIC-collaboration/README.md` §Suivi noyau, resynchronisé le 2026-07-08)
- [ ] E07 : EN07.3 (ActiveMQ persistence) + EN07.4 (PgBouncer session mode) sortis de `Backlog`
      — EN07.4 en cours (voir tableau ci-dessus)
- [ ] EN08.3 (auth cross-service `pivot-collaboratif-core`, tracé le 2026-07-08) — bloquant pour
      la recette E30 (un utilisateur ne peut pas utiliser le tableau blanc sans, cf. détail
      de l'Enabler), dépend de l'acceptation formelle d'`ADR-022`

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
- Si les items encore `Backlog`/`In progress` (US05.13-15.x, EN07.3, EN08.3, E30 noyau — recette
  PO) doivent être **terminés** avant la déclaration, ou si le mainteneur préfère en **basculer
  certains explicitement en dette différée hors Socle** — décision de scope, pas de cohérence
  documentaire. Mise à jour 2026-07-08 (soir) : E17 et la dette S2 "cache Redis" sont en réalité
  déjà terminés (retirés du tableau ci-dessus, la version précédente de cette checklist les
  comptait à tort comme restants) ; le noyau whiteboard a désormais 17/17 items en code mergé
  (`Review`), plus proche de la ligne d'arrivée que la précédente estimation "0/17" ne le
  suggérait — mais EN08.3 (nouvellement tracé) est un blocage fonctionnel réel pour la recette
  E30, pas juste documentaire.
- Repo cible pour US05.15.1 (composite action CI partagée) — décision non prise, bloque
  également US05.15.2 qui en dépend.
