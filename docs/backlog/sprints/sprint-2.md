# Sprint 2 — Système de modules + Auth manquant

**Branches :** une branche par US/Enabler — `feat/{us-id}-{slug}` (voir [§Règles d'utilisation](./README.md#règles-dutilisation))
**Scope :** E03 (enablers + admin features) + US01 manquants
**Priorité :** Critical — débloque tous les modules collaboratifs (noyau F08.x/EN08.x sous E30, E09–E15)

| US | Titre | Size | Priorité | 🤖 Dev |
|----|-------|------|----------|--------|
| EN03.1 | PivotModule interface + registre backend | S | Critical | ✅ |
| EN03.2 | Guard Angular moduleGuard + status API | S | Critical | ✅ |
| EN03.3 | Cache Redis statut modules TTL 60s | S | Critical | ✅ |
| EN03.4 | Contrat de module frontend TypeScript | XS | Critical | ✅ |
| US03.1.1 | Admin active un module pour son tenant | M | Critical | ✅ |
| US03.1.2 | Admin désactive un module pour son tenant | M | Critical | ✅ |
| US03.2.1 | UI liste modules disponibles avec statut | M | High | ✅ |
| US03.2.2 | Guard Angular bloque accès module désactivé | S | Critical | ✅ |
| US01.1.4 | Redirection post-login | S | High | ✅ |
| US01.1.5 | Expiration session + auto-logout | M | High | ✅ |
| US01.2.4 | Politique robustesse mot de passe | S | High | ✅ |

> **Sprint 2 terminé.** Statuts resynchronisés le 2026-07-04 après audit du code sur `main` (pivot-core + pivot-ui) : les 11 items étaient déjà mergés, testés et déployés — le tableau affichait encore `🔎 Review`/`⬜` par retard de mise à jour. EN03.2 et US03.2.2 partagent la même implémentation (`module.guard.ts`, un seul guard pour les deux IDs de backlog).
>
> **Parallélisable :** EN03.1+EN03.3 (backend) ‖ EN03.2+EN03.4 (frontend) ‖ US01.x (auth, indépendants de E03 côté code)
