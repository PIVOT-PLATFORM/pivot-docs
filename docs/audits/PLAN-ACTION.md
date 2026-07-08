---
sidebar_position: 2
sidebar_label: "Plan d'action"
---

# Plan d'action consolidé — PIVOT Platform

## Mis à jour le 2026-07-08 — premier cycle complet (11/11 audits formels publiés, 108 findings actifs)

## Sources : 11 domaines `docs/audits/*.md` (voir [README.md](README.md))

---

## Légende statuts

| Statut | Signification |
|---|---|
| ✅ **Fait** | Corrigé et livré (mergé sur `main`) |
| 🔄 **En attente** | Implémenté mais non validé (recette, confirmation BDD/CI) |
| ⬜ **À faire** | Identifié, non commencé |
| ❌ **Bloqué** | Dépendance externe (prestataire, décision juridique, budget) |

---

## Protocole d'alimentation

Après chaque audit formel publié (`docs/audits/audit-{domaine}.md`), reporter ici chaque finding
actif (sévérité ≥ LOW retenue) avec le **même ID** que dans le rapport de domaine (`VULN-XXX` ou
équivalent propre au domaine), dans la section de sévérité correspondante, au format :

| ID | Audit | Description | Fichier(s) | Sprint | Statut |
|---|---|---|---|---|---|

Un finding résolu reste dans ce plan jusqu'au cycle suivant (marqué ✅), puis est retiré à la
publication d'audit suivante sur le même domaine — l'historique complet reste dans
`docs/audits/audit-{domaine}.md` (section "Statut des findings/dettes historiques").

> **Note sur ce premier cycle** : CRITIQUE et HIGH sont intégralement détaillés ci-dessous (29
> findings). MEDIUM (42) et LOW/INFO (37) sont comptés par domaine mais renvoyés à chaque
> `audit-{domaine}.md` plutôt que ré-énumérés ligne par ligne ici — pas une troncature silencieuse,
> un choix pour garder ce plan consolidé lisible ; chaque domaine reste exhaustif dans son propre
> rapport.

---

## 🔴 CRITICAL

| ID | Audit | Description | Fichier(s) | Sprint | Statut |
|---|---|---|---|---|---|
| VULN-001 | Cybersécurité | Authentification WS/REST totalement absente sur `pivot-collaboratif-core` (CVSS 10.0) — identité dérivée d'en-têtes `X-Pivot-User-Id`/`X-Pivot-Tenant-Id` spoofables, non filtrés par nginx | `StompHandshakeInterceptor.java`, `RequestPrincipalResolver.java`, `pivot-collaboratif-ui/nginx.conf` | Non planifié | ⬜ À faire |
| RGPD-CRIT-01 | RGPD | Rétention `audit_events` promise publiquement ("1 an glissant") mais jamais purgée — aucun `@Scheduled` | `CleanupScheduler.java`, `V1__schema_init.sql:280`, `privacy.component.ts:50` | Non planifié | ⬜ À faire |
| RGPD-CRIT-02 | RGPD | Purge jamais câblée sur 6 tables PII (devices/tokens) — méthodes `deleteExpired()` écrites, jamais invoquées | `trusted_devices`, `device_verify_tokens`, `password_reset_tokens`, `email_verifications`, `email_change_requests`, `suspicious_login_tokens` | Non planifié | ⬜ À faire |

---

## 🟠 HIGH / P0-P1

| ID | Audit | Description | Sprint | Statut |
|---|---|---|---|---|
| — | Architecture | Contrat `pivot-core-starter` partiel — `auth`/`team` inexistants, `TenantContextHolder`/`@TenantAware` documentés mais absents | Non planifié | ⬜ À faire |
| — | Architecture | Table `public.teams`/`team_members` inexistante — bloque la FK cross-schéma documentée (recoupe BDD) | Non planifié | ⬜ À faire |
| — | Architecture | Whiteboard sans authentification réelle (recoupe VULN-001 cyber) | Non planifié | ⬜ À faire |
| CICD-001 | CI/CD | Liens `SECURITY.md` morts (404) sur `pivot-core` et `pivot-ui` — canal de divulgation cassé | Non planifié | ⬜ À faire |
| CICD-002 | CI/CD | Gouvernance GHCR cross-repo fragile — 2 couples cassés sur 3 | Non planifié | ⬜ À faire |
| VULN-002 | Cybersécurité | VIEWER peut dessiner sur le canvas temps réel — contournement RBAC (CVSS 7.1) | Non planifié | ⬜ À faire |
| — | Base de données | Incompatibilité `UUID` (collaboratif) vs `BIGINT` (public) — bloquera la FK cross-schéma | Non planifié | ⬜ À faire |
| — | Base de données | `public.teams`/`team_members` documentés mais absents (recoupe Architecture) | Non planifié | ⬜ À faire |
| MOD-001 | Modules | `@pivot-platform/ui-core` publié mais `whiteboardModuleGuard` stub jamais remplacé | Non planifié | ⬜ À faire |
| MOD-002 | Modules | Extraction `pivot-core-starter` (EN17.1) ~20% faite, contredite par `sprint-5.md` | Non planifié | ⬜ À faire |
| — | QA | Seuil Gate 2 documenté 85% vs réellement appliqué 80% (tous `pom.xml`) | Non planifié | ⬜ À faire |
| — | QA | E2E `pivot-collaboratif-ui` 15/15 échecs, cause documentée obsolète | Non planifié | ⬜ À faire |
| — | RGPD | Absence de registre Art. 30 consolidé | Non planifié | ⬜ À faire |
| — | RGPD | Effacement/export ne se propagent pas au module collaboratif | Non planifié | ⬜ À faire |
| — | UX | Modals `pivot-collaboratif-ui` sans focus trap réel malgré `role="dialog"` | Non planifié | ⬜ À faire |
| — | UX | Lighthouse CI `pivot-collaboratif-ui` audite une route inexistante | Non planifié | ⬜ À faire |
| — | Dépendances | `piscina` RCE dev-only (CVSS 8.1) — dérive de lockfile `pivot-ui` vs 3 repos sœurs | Non planifié | ⬜ À faire |
| — | Dépendances | 4 repos/8 sans fichier `LICENSE` malgré AGPL-3.0 déclarée | Non planifié | ⬜ À faire |
| — | Observabilité | Aucun Prometheus/Grafana/Alertmanager déployé nulle part | Non planifié | ⬜ À faire |
| — | Observabilité | Health groups readiness/liveness non répliqués dans les 3 modules `-core` | Non planifié | ⬜ À faire |
| — | Observabilité | Actuator sans port de management isolé dans les 3 modules `-core` | Non planifié | ⬜ À faire |
| — | Observabilité | Logs structurés JSON absents des 3 modules `-core` | Non planifié | ⬜ À faire |
| — | Observabilité | `audit_events` non intégré dans les modules `-core` | Non planifié | ⬜ À faire |
| — | Backlog | `sprints/README.md` surestime E17 Vague 0 (8/8 affiché vs 2/8 réel) | Non planifié | ⬜ À faire |
| — | Backlog | `EPIC-collaboration/README.md` auto-contradictoire | Non planifié | ⬜ À faire |
| — | Backlog | `US16.1.1` navbar : AC déclarés faits sans test (50% couverture réelle) | Non planifié | ⬜ À faire |

---

## 🟡 MEDIUM / P1-P2

**42 findings au total** — détail complet dans chaque rapport de domaine, non ré-énuméré ici :

| Audit | Findings MEDIUM |
|---|---|
| Architecture | 4 |
| CI/CD | 5 |
| Cybersécurité | 5 |
| Base de données | 3 |
| Modules | 1 |
| QA | 4 |
| RGPD | 2 |
| UX | 3 |
| Dépendances | 5 |
| Observabilité | 3 |
| Backlog | 7 |

---

## 🔵 LOW / P2-P3

**37 findings au total** — détail complet dans chaque rapport de domaine, non ré-énuméré ici :

| Audit | Findings LOW/INFO |
|---|---|
| Architecture | 3 |
| CI/CD | 3 |
| Cybersécurité | 8 |
| Base de données | 3 |
| Modules | 2 |
| QA | 4 |
| RGPD | 4 |
| UX | 4 |
| Dépendances | 4 |
| Observabilité | 1 |
| Backlog | 1 |

---

## ⚪ INFO / P3-Post-live

_Voir tables LOW ci-dessus — les rapports de domaine ne distinguent pas systématiquement LOW et
INFO comme deux tiers séparés (convention `skill-audit-format` : "LOW/INFO" unifié)._

---

## Tableau de synthèse

| Priorité | Total | ✅ Fait | ⬜ À faire | 🔄 En attente | ❌ Bloqué |
|---|---|---|---|---|---|
| 🔴 CRITICAL | 3 | 0 | 3 | 0 | 0 |
| 🟠 HIGH P0-P1 | 26 | 0 | 26 | 0 | 0 |
| 🟡 MEDIUM P1-P2 | 42 | 0 | 42 | 0 | 0 |
| 🔵 LOW P2-P3 | 37 | 0 | 37 | 0 | 0 |
| **Total** | **108** | **0** | **108** | **0** | **0** |

---

## Roadmap

Priorité de traitement recommandée à l'issue de ce premier cycle (à trancher/planifier par le
mainteneur, aucun de ces items n'est encore affecté à un sprint) :

1. **VULN-001** (cyber, CVSS 10.0) — bloquant absolu avant tout déploiement de
   `pivot-collaboratif-core`. Corrélé au finding Architecture sur l'absence d'authentification
   whiteboard : même cause racine, deux audits indépendants convergents.
2. **RGPD-CRIT-01 / RGPD-CRIT-02** — rétention de données non appliquée malgré un engagement
   public ; risque réglementaire direct, effort de correction faible (S, pattern déjà existant).
3. **CICD-001** (SECURITY.md morts) — correctif trivial (un lien par fichier), impact élevé sur un
   mécanisme de sécurité production actif.
4. **Gap `teams`/`team_members`** — trouvé indépendamment par Architecture et BDD : bloque la
   convention FK cross-schéma documentée pour les 3 modules dès qu'ils en auront besoin.
5. Reste des 26 HIGH, puis 42 MEDIUM / 37 LOW selon la capacité de chaque équipe de domaine — voir
   le plan d'action détaillé (P0-P3) de chaque `audit-{domaine}.md`.
