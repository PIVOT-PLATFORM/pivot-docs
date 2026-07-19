# ADR-030 — Bascule Spring Modulith : internalisation des domaines dans le Socle

**Date :** 2026-07-17
**Statut :** Accepté (rédigé a posteriori — vagues 1 à 4 déjà mergées)
**Décideurs :** Architecte plateforme, Architecte Modules, Mainteneur
**Contexte technique :** `pivot-core` (Socle backend), `pivot-ui` (Socle frontend),
anciens repos `pivot-{agilite,collaboratif,pilotage}-{core,ui}` et `pivot-design-system`,
[ADR-006](ADR-006-multi-repo-architecture.md) (architecture multi-repo, **supersédée par le présent
ADR pour les domaines métier**), [ADR-007](ADR-007-design-system-angular-cdk.md) (design system),
[ADR-022](ADR-022-principal-authentification-minimal-partage.md) (`pivot-core-starter`),
`pivot-core/PILOTAGE-HANDOFF.md` (contrat de reprise pilotage). Implémentation de référence :
`pivot-core` PR #226/#227/#228, `pivot-ui` PR #205/#206, `pivot-infra` PR #9.

---

## Contexte

L'architecture initiale ([ADR-006](ADR-006-multi-repo-architecture.md)) donnait à chaque domaine
métier **un repo backend et un repo frontend séparés** (`pivot-agilite-core`/`-ui`,
`pivot-collaboratif-core`/`-ui`, `pivot-pilotage-core`/`-ui`), chacun déployé dans sa propre JVM /
son propre process, consommant `pivot-core-starter` (Maven) et `@pivot/ui-core` (npm) publiés par
le Socle, et communiquant via une gateway nginx (`/api/{domaine}` → service dédié).

Ce découpage a montré ses coûts à l'échelle réelle : duplication massive de la CI/CD (résolue par
ailleurs via [`pivot-cicd`](pathname:///pivot-docs/backlog/EPIC-cicd-supply-chain/) — EN05.17),
starter privé à publier/consommer à chaque itération, versions à synchroniser entre repos, latence
et pool de connexions multipliés par process, et une **friction de développement** (cloner et lancer
6+ repos siblings pour un écosystème local). Aucun domaine n'exploitait réellement l'isolation
runtime au niveau process — les frontières utiles sont **logiques** (modules), pas physiques.

## Décision

Basculer vers une architecture **Spring Modulith** : les domaines métier deviennent des **modules
internes** du Socle, packagés dans un artefact unique et déployés en un seul process, tout en
conservant des **frontières de modules vérifiées** (test `ApplicationModules.verify()`) et
l'isolation des données par **schéma PostgreSQL dédié**.

Mise en œuvre en quatre vagues (EN53) :

| Vague | PR | Effet |
|-------|-----|-------|
| **EN53.1** | `pivot-core#226` | `agilite` absorbé → module Maven interne `pivot-core/agilite/` (`fr.pivot.agilite.*`) |
| **EN53.2** | `pivot-core#227` | `collaboratif` absorbé → module Maven interne `pivot-core/collaboratif/` (`fr.pivot.collaboratif.*`) |
| **EN53.3** | `pivot-core#228`, `pivot-ui#205`, `pivot-infra#9` | `pilotage` **retiré** de PIVOT — extrait vers un produit distinct (`PILOTAGE-HANDOFF.md`) |
| **EN53.4** | `pivot-ui#206` | Libs Angular (`agilite-ui`, `collaboratif-ui`, `design-system`) rapatriées dans le workspace unique `pivot-ui/projects/*` |

Le module `app` (`pivot-core-app`) agrège les modules internes et produit le JAR exécutable unique.
Les modules restent **activables par tenant** (catalogue de modules inchangé) et n'ont **aucune
dépendance croisée** (agilite ⇎ collaboratif ; chacun ne dépend que du starter `fr.pivot.core.*`).

Le domaine **Pilotage quitte PIVOT** : les repos `pivot-pilotage-*` restent la source d'extraction
(historique git préservé), voir le contrat de reprise `pivot-core/PILOTAGE-HANDOFF.md`. Les actions
irréversibles (extraction git réelle, archivage, `DROP SCHEMA pilotage`) attendent une décision
explicite du mainteneur.

## Conséquences

**Positives**
- Un seul artefact backend / un seul workspace frontend à builder, versionner, déployer.
- Frontières de modules **explicites et testées** (aucun import croisé, exclusion du shell/starter documentée dans `ModularityTests`).
- Fin de la publication/consommation du starter et des libs npm privées entre domaines.
- Écosystème local simplifié (un `pivot-core` + un `pivot-ui`).
- Isolation des données conservée (schémas `public` / `agilite` / `collaboratif`, migrations Flyway par module dans une JVM unique).

**Coûts / dette (état transitionnel au 2026-07-19)**
- **Bascule de déploiement non terminée.** Le code est internalisé et le backend sert bien
  `/api/{agilite,collaboratif}` (vérifié : contexte Spring + Flyway des 3 schémas dans une JVM,
  endpoints en 403 = présents & sécurisés). **Mais** `pivot-core/compose.yml` build encore les
  services standalone `../pivot-{agilite,collaboratif}-core`, et le nginx `pivot-ui` (dev **et** prod
  Cloud Run) route toujours `/api/{agilite,collaboratif}` vers ces services. Tant que ce routage
  n'est pas basculé vers le backend, les repos archivés restent le chemin runtime actif et le code
  est **dupliqué** (risque de divergence). → **Vague de suivi à planifier.**
- **Écart de portage.** `collaboratif` a été absorbé au niveau `V6` ; le repo source était à `V7`
  (US08.2.5 — invite par email + gouvernance des rôles + notifications). Cette feature n'appartient
  pas à un sprint terminé (Sprint 16 planifié) mais reste du code réel dans le repo archivé, à
  reprendre proprement au démarrage du Sprint 16.
- Les anciens repos (`pivot-{agilite,collaboratif,pilotage}-{core,ui}`, `pivot-design-system`) sont
  **archivés** (lecture seule) ; leur contenu vit désormais dans le Socle.

**Impacts documentaires** — la roadmap et l'architecture décrites dans `pivot-docs` doivent refléter :
domaines = modules internes (plus de repos séparés), extraction de Pilotage (revoir Sprints 17-40 du
backlog qui planifiaient ce domaine), `[ADR-006](ADR-006-multi-repo-architecture.md)` supersédé pour
les domaines métier.

## Alternatives écartées

- **Statu quo multi-repo** — coût de coordination/CI/publication jugé disproportionné vs le bénéfice
  d'isolation process, non exploité.
- **Monorepo sans frontières** — perte des garanties de modularité ; le Modulith conserve les
  frontières testées sans le coût multi-process.
