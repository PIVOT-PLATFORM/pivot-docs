---
sidebar_position: 1
sidebar_label: "Bilan consolidé"
---

# Bilan consolidé des audits — PIVOT Platform

## Dernière mise à jour : 2026-07-08 — premier cycle complet (11/11 audits formels publiés)

## Sources : tous les rapports `docs/audits/*.md`

---

## Règle de mise à jour

Ce fichier est mis à jour **uniquement** après la publication d'un audit formel réel sur un des
11 domaines (score calculé sur un vrai passage, jamais un brouillon de scaffolding) — jamais en
avance, jamais avec un score inventé. Protocole de publication → skill `pivot-audit-format`
(`.project/skills/skill-audit-format.yaml`). Chaque publication met à jour trois endroits en
cohérence : le fichier de domaine (`docs/audits/audit-{domaine}.md`), ce bilan, et
[PLAN-ACTION.md](PLAN-ACTION.md).

---

## Vue d'ensemble

| Audit | Statut | Score | Tendance | Dernière révision | Avis PROD |
|---|---|---|---|---|---|
| Architecture | Audité | 6.2/10 | — (premier) | v2 — 2026-07-08 | Dette maîtrisée, non bloquante pour l'existant — bloquante pour l'isolation tenant réelle tant que auth/team ne sont pas extraits |
| CI/CD / DevSecOps | Audité | 6.8/10 | — (premier) | v2 — 2026-07-08 | Pas de bloquant prod ; canal de divulgation sécurité (SECURITY.md) à corriger en urgence |
| Cybersécurité | Audité | 3.3/10 | — (premier) | v2 — 2026-07-08 | **NON PROD-READY** — bloquant CRITIQUE (VULN-001) sur `pivot-collaboratif-core` |
| Base de données | Audité | 7.3/10 | — (premier) | v2 — 2026-07-08 | Pas en prod — 2 décisions d'architecture à trancher avant données réelles / intégration `pivot-core-starter` |
| Modules | Audité | 5.4/10 | — (premier) | v2 — 2026-07-08 | Aucune brèche active — dette d'intégration EN17.1 non terminée |
| QA / Tests | Audité | 6.5/10 | — (premier) | v2 — 2026-07-08 | Dette maîtrisée, pas bloquant prod |
| RGPD | Audité | 6.2/10 | — (premier) | v2 — 2026-07-08 | **2 CRITIQUES actifs** à corriger avant tout contrôle externe ou mise à l'échelle commerciale |
| UX / Accessibilité | Audité | 6.8/10 | — (premier) | v2 — 2026-07-08 | Non bloquant pour l'usage actuel — à traiter avant exposition publique élargie |
| Dépendances / Supply chain | Audité | 7.0/10 | — (premier) | v2 — 2026-07-08 | Aucun blocage — surface de production propre |
| Observabilité | Audité | 4.5/10 | — (premier) | v2 — 2026-07-08 | `pivot-core` solide mais aveugle (zéro alerte) ; modules `-core` sans aucune brique avant déploiement |
| Backlog | Audité | 7.2/10 | — (premier) | v2 — 2026-07-08 | Dette de cohérence maîtrisée, pas bloquante — zéro item fantôme sur les 8 repos |

**Score moyen : 6.1/10** (11/11 audits formels publiés, premier cycle — pas de tendance historique
possible).

---

## Nouveaux findings depuis le dernier bilan

Premier bilan réel (aucune version précédente n'avait de contenu) — tout ce qui suit est donc
"nouveau" par construction. Liste complète des CRITIQUE + HIGH (108 findings au total tous
niveaux confondus, détail complet par domaine dans chaque `audit-{domaine}.md`, plan d'action
consolidé dans [PLAN-ACTION.md](PLAN-ACTION.md)) :

| ID | Audit | Description | Sévérité | Statut |
|---|---|---|---|---|
| VULN-001 | Cybersécurité | Authentification WS/REST totalement absente sur `pivot-collaboratif-core` — identité dérivée d'en-têtes HTTP spoofables (`X-Pivot-User-Id`/`X-Pivot-Tenant-Id`), non filtrés par nginx | CRITIQUE (CVSS 10.0) | ⬜ À faire |
| RGPD-CRIT-01 | RGPD | Rétention `audit_events` promise publiquement ("1 an glissant") mais jamais purgée techniquement — aucun `@Scheduled` ne la traite | CRITIQUE | ⬜ À faire |
| RGPD-CRIT-02 | RGPD | Purge jamais câblée sur 6 tables PII (devices/tokens) — méthodes `deleteExpired()` écrites mais jamais invoquées | CRITIQUE | ⬜ À faire |
| — | Architecture | Contrat `pivot-core-starter` partiel — `auth`/`team` inexistants, `TenantContextHolder`/`@TenantAware` documentés mais absents du code | HIGH | ⬜ À faire |
| — | Architecture | Table `public.teams`/`team_members` inexistante — bloque la convention FK cross-schéma documentée (recoupe finding BDD ci-dessous) | HIGH | ⬜ À faire |
| — | Architecture | Whiteboard sans authentification réelle — `RequestPrincipalResolver` dérive l'identité de headers HTTP non signés (recoupe VULN-001 ci-dessus, trouvé indépendamment par 2 audits) | HIGH | ⬜ À faire |
| CICD-001 | CI/CD | Liens de signalement `SECURITY.md` morts (404 confirmé) sur `pivot-core` **et** `pivot-ui` — canal de divulgation cassé | HIGH (P0) | ⬜ À faire |
| CICD-002 | CI/CD | Gouvernance GHCR cross-repo fragile — 2 couples publisher/consumer cassés sur 3 tentés | HIGH | ⬜ À faire |
| VULN-002 | Cybersécurité | Un VIEWER (lecture seule) peut dessiner sur le canvas whiteboard temps réel — contournement RBAC (`CanvasActionService`) | HIGH (CVSS 7.1) | ⬜ À faire |
| — | Base de données | Incompatibilité de type `UUID` (`collaboratif`) vs `BIGINT` (`public`) — bloquera la FK cross-schéma documentée dès qu'elle sera ajoutée | HIGH | ⬜ À faire |
| — | Base de données | `public.teams`/`team_members` documentés mais absents (recoupe finding Architecture ci-dessus) | HIGH | ⬜ À faire |
| MOD-001 | Modules | `@pivot-platform/ui-core` publié le 2026-07-07 mais `whiteboardModuleGuard` (stub `of(true)`) jamais remplacé | HIGH | ⬜ À faire |
| MOD-002 | Modules | Extraction `pivot-core-starter` (EN17.1) mergée mais ~20% faite — contredit par une ligne de `sprint-5.md` | HIGH | ⬜ À faire |
| — | QA | Seuil Gate 2 documenté (85%) vs réellement appliqué (80%, tous les `pom.xml`) — écart doc/config systémique jamais vérifié avant cet audit | HIGH | ⬜ À faire |
| — | QA | E2E `pivot-collaboratif-ui` : 15/15 échecs, cause racine documentée (`denied`) déjà obsolète (réalité : `manifest unknown`) | HIGH | ⬜ À faire |
| — | RGPD | Absence de registre Art. 30 consolidé — information dispersée entre politique de confidentialité, schéma, backlog | HIGH | ⬜ À faire |
| — | RGPD | Effacement/export ne se propagent pas au module collaboratif — aucun event cross-repo, aucun scheduler | HIGH | ⬜ À faire |
| — | UX | Modals `pivot-collaboratif-ui` déclarent `role="dialog"` mais n'implémentent aucun focus trap réel — TSDoc mensonger | HIGH | ⬜ À faire |
| — | UX | Lighthouse CI `pivot-collaboratif-ui` audite une URL qui ne correspond à aucune route réelle — faux sentiment de sécurité CI | HIGH | ⬜ À faire |
| — | Dépendances | `piscina` RCE via `@angular/build` (dev-only, CVSS 8.1) présent uniquement sur `pivot-ui`, absent des 3 repos `-ui` sœurs — dérive de lockfile confirmée | HIGH | ⬜ À faire |
| — | Dépendances | 4 repos sur 8 sans fichier `LICENSE` malgré `AGPL-3.0-or-later` déclarée | HIGH | ⬜ À faire |
| — | Observabilité | Aucun Prometheus/Grafana/Alertmanager déployé nulle part — instrumentation pure, zéro alerte même pour `pivot-core` en prod | HIGH (P0) | ⬜ À faire |
| — | Observabilité | Health groups readiness/liveness non répliqués dans les 3 modules `-core` | HIGH | ⬜ À faire |
| — | Observabilité | Actuator sans port de management isolé dans les 3 modules `-core` | HIGH | ⬜ À faire |
| — | Observabilité | Logs structurés JSON absents des 3 modules `-core` (0 occurrence `LoggerFactory`/`@Slf4j`) | HIGH | ⬜ À faire |
| — | Observabilité | `audit_events` non intégré dans les modules `-core` (`pivot-core-starter` pas encore dépendance) | HIGH | ⬜ À faire |
| — | Backlog | `sprints/README.md` surestime E17 Vague 0 ("8/8 Terminé" affiché vs 2/8 réel `Stage: Done`) | HIGH | ⬜ À faire |
| — | Backlog | `EPIC-collaboration/README.md` auto-contradictoire — tableau de resync mal classé + résumé chiffré incohérent | HIGH | ⬜ À faire |
| — | Backlog | `US16.1.1` (navbar) : AC déclarés faits sans test — 50% de couverture réelle | HIGH | ⬜ À faire |

**42 findings MEDIUM et 37 findings LOW/INFO supplémentaires** ne sont pas repris individuellement
ici (détail complet dans chaque `audit-{domaine}.md` et dans les sections 🟡/🔵 de
[PLAN-ACTION.md](PLAN-ACTION.md)) — aucune troncature silencieuse : ces comptes sont exhaustifs
par domaine, seule leur énumération ligne par ligne est renvoyée aux rapports sources pour ne pas
alourdir ce bilan.

**2 findings trouvés indépendamment par deux audits différents** (convergence, pas duplication —
signal de fiabilité) : le gap `teams`/`team_members` (Architecture + BDD) et l'absence
d'authentification réelle du whiteboard (Architecture + Cybersécurité, ce dernier l'ayant quantifié
en CVSS 10.0).

---

## Synthèse chiffrée

| Priorité | Total | ✅ Fait | ⬜ À faire | 🔄 En attente | ❌ Bloqué |
|---|---|---|---|---|---|
| P0 (≈ CRITIQUE) | 3 | 0 | 3 | 0 | 0 |
| P1 (≈ HIGH) | 26 | 0 | 26 | 0 | 0 |
| P2 (≈ MEDIUM) | 42 | 0 | 42 | 0 | 0 |
| P3 (≈ LOW/INFO) | 37 | 0 | 37 | 0 | 0 |
| **Total** | **108** | **0** | **108** | **0** | **0** |

> Mapping P0-P3 ≈ CRITIQUE-HIGH-MEDIUM-LOW approximatif — certains domaines (Architecture, Backlog)
> priorisent par effort/risque plutôt que par sévérité stricte. Détail réel par domaine dans
> [PLAN-ACTION.md](PLAN-ACTION.md).

---

## Verdict

**Plateforme non prod-ready en l'état — un bloquant CRITIQUE unique domine tout le reste.**

`pivot-core` et `pivot-ui` (le shell mature de la plateforme) ressortent de ce premier cycle
d'audit avec un niveau de maturité réel et confirmé de façon convergente par plusieurs audits
indépendants (architecture, cybersécurité, dépendances, QA) : discipline de code, isolation
tenant, gestion des tokens, couverture de tests, hygiène des dépendances — tous nettement
au-dessus de la moyenne pour ce stade de développement.

Le point qui domine tout le reste : **`pivot-collaboratif-core` (le seul module métier
réellement en développement actif, whiteboard EN08.x) tourne aujourd'hui sans authentification
réelle** — trouvé et quantifié indépendamment par l'audit Architecture (comme risque structurel)
et l'audit Cybersécurité (CVSS 10.0, VULN-001). Tant que ce point n'est pas corrigé, la
plateforme dans son ensemble n'est pas déployable en production, quel que soit le score des 10
autres domaines. Les 2 CRITIQUES RGPD (rétention de données jamais purgée malgré un engagement
public) sont le second point à traiter avant tout contrôle externe.

Le reste de la dette (108 findings au total, dont 26 HIGH) est réel mais actionnable — aucun
autre domaine ne présente de bloquant CRITIQUE, et chaque audit confirme des bonnes pratiques
solides en plus de ses findings. Priorité de traitement recommandée : VULN-001 (cyber) et les 2
CRITIQUES RGPD d'abord, puis les HIGH cross-référencés entre domaines (gap `teams`/`team_members`,
gouvernance GHCR, canal SECURITY.md).
