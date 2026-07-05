# SPRINTS — PIVOT Platform

Source de vérité pour l'organisation des sprints et l'assignation des US aux branches.

**Règle branche :** `feat/{us-id}-{slug}` par US/Enabler — une branche par item, agents en parallèle sur branches séparées.

---

## Sprint 1 — Auth & Shell MVP ✅ Terminé sauf contact

**Branche :** `feat/us16-3-1-contact`

| US | Titre | 🤖 Dev |
|----|-------|--------|
| US01.1.1 | Connexion email + mot de passe | ✅ |
| US01.1.2 | Déconnexion | ✅ |
| US01.1.3 | Rester connecté (remember-me) | ✅ |
| US01.2.1 | Inscription | ✅ |
| US01.2.2 | Vérification email | ✅ |
| US01.2.3 | Renvoi lien activation | ✅ |
| US01.3.1 | Demande réinitialisation mot de passe | ✅ |
| US01.3.2 | Réinitialisation par token | ✅ |
| US01.4.1 | Confirmation appareil inconnu par OTP | ✅ |
| F01.6 | Connexion Google OAuth2 | ✅ |
| F01.7/F01.8 | OIDC enterprise + JIT + session restore | ✅ |
| US16.1.1 | Navigation principale | ✅ |
| US16.1.2 | Menu utilisateur | ✅ |
| US16.2.1 | Page d'accueil (grille modules) | ✅ |
| US16.4.1 | Thème clair / sombre | ✅ |
| Pages légales | ML + PC + CGU | ✅ |
| Footer + i18n | Footer + Transloco FR/EN | ✅ |
| Dashboard utilisateur | Accueil connecté | ✅ |
| Pages Bientôt disponible | Modules non activés | ✅ |
| **US16.3.1** | **Formulaire de contact** | 🔎 Review |

---

## Sprint 2 — Système de modules + Auth manquant

**Branches :** une branche par US/Enabler — `feat/{us-id}-{slug}` (voir §Règles d'utilisation)
**Scope :** E03 (enablers + admin features) + US01 manquants
**Priorité :** Critical — débloque tous les modules E08–E15

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

---

## Sprint 3 — Espace compte + Administration

**Branches :** une branche par US/Enabler — `feat/{us-id}-{slug}` (voir §Règles d'utilisation)
**Scope :** E02 (espace compte utilisateur) + E06 (administration tenant/superadmin)

| US | Titre | Size | Priorité | 🤖 Dev |
|----|-------|------|----------|--------|
| US02.1.1 | Voir et éditer son profil | M | High | 🔄 |
| US02.1.2 | Préférence de langue | S | Medium | 🔄 In progress |
| US02.2.1 | Changer son mot de passe | M | High | 🔄 |
| US02.2.2 | Changer son adresse email | M | High | 🔎 Review |
| US02.2.3 | Voir et révoquer ses sessions actives | M | Medium | 🔎 Review |
| US02.2.4 | Suppression de compte (RGPD) | M | High | ⬜ |
| US02.3.1 | Export de ses données personnelles | M | High | 🔎 Review |
| US06.1.1 | Liste des utilisateurs du tenant (backend) | M | High | 🔎 Review |
| US06.1.2 | Liste des utilisateurs du tenant (Angular) | M | High | ⬜ |
| US06.1.3 | Modifier le rôle d'un utilisateur | M | High | ⬜ |
| US06.1.4 | Désactiver un compte | S | High | ⬜ |
| US06.1.5 | Réactiver un compte désactivé | S | High | ⬜ |
| US06.2.1 | Créer un tenant | L | Critical | 🔄 In progress |
| US06.2.2 | Désactiver un tenant | M | High | 🔎 Review |
| US06.2.3 | Liste des tenants | M | Medium | 🔄 |

> **Parallélisable :** US02.x ‖ US06.x — dépendances : US06.1.5 après US06.1.4 (et US06.1.2, le bouton vit dans la liste Angular) ; US02.2.4 après US02.2.1 ; US06.1.3/US06.1.4+US06.1.5 après US06.1.2 (UI partagée).
> **Vague 1 (2026-07-05) :** US06.1.1 en Review (`pivot-core` #127 mergée, backend seul — pas de composant `pivot-ui`). US02.1.1, US02.2.1, US06.2.3 en In progress : `pivot-core` mergé (#129, #128, #126) mais `pivot-ui` encore ouvert non mergé (#71, #70, #69 — voir fichiers US pour détail des gates).
> **Vague 2 (2026-07-05) :** US02.2.2, US02.2.3, US02.3.1, US06.2.2 en Review — voir fichiers US pour PR et détail des gates. US02.1.2 et US06.2.1 restent **In progress** : côté US02.1.2, `pivot-core` #130 est sorti de draft (CI en cours) mais pas encore mergé, et `pivot-ui` #72 reste draft ; côté US06.2.1, `pivot-core` #134 est mergé mais `pivot-ui` #76 (stackée sur #69, elle-même draft) reste draft — pas de `Stage: Review` tant que le volet Angular concerné n'est pas sorti de draft. `pivot-core` : PR#126 (US06.2.3), PR#134 (US06.2.1) et PR#135 (US06.2.2) avaient chacune créé indépendamment `SuperAdminTenantController`/`Service` — collision déjà réconciliée en une seule classe (`list()` + `create()` + `checkSlug()` + `updateStatus()`), les trois PR sont mergées sur `main`. **Point d'attention restant :** `pivot-ui` — PR#76 (US06.2.1) est rebasée sur la branche non mergée de PR#69 (US06.2.3) et inclut son commit — fusionner #69 en premier ou ensemble.

---

## Sprint 4 — Infrastructure prod + Auth avancé + Notifications

**Branches :** une branche par US/Enabler — `feat/{us-id}-{slug}` (voir §Règles d'utilisation)
**Scope :** E07 (infra déploiement) + US01 sécurité avancée + EN-NOTIF + US16 restants + US03 SUPER_ADMIN

| US | Titre | Size | Priorité | 🤖 Dev |
|----|-------|------|----------|--------|
| EN07.1 | Docker Compose production | M | Critical | ⬜ |
| EN07.2 | Secret management Docker secrets | M | Critical | ⬜ |
| EN07.5 | deploy.yml GitHub Actions CI/CD vers prod | S | Critical | ⬜ |
| US01.4.2 | Gérer ses appareils de confiance | M | High | ⬜ |
| US01.4.3a | Alerte connexion depuis nouvel appareil | M | High | ⬜ |
| US01.5.1 | Notification email action sensible | M | High | ⬜ |
| EN-NOTIF | Infrastructure notifications in-app | L | High | ⬜ |
| US16.1.3 | Badge notifications | S | Medium | ⬜ |
| US16.2.2 | Section modules à venir | S | Medium | 🔄 |
| US03.3.1 | SUPER_ADMIN définit modules disponibles par plan | M | Medium | ⬜ |
| US03.3.2 | SUPER_ADMIN active/désactive module par tenant (override) | M | Medium | ⬜ |
| US03.3.3 | Admin tenant voit uniquement modules de son plan | S | Medium | ⬜ |
| EN04.1 | Logs structurés JSON + MDC (requestId, tenantId, userId) | S | Medium | ⬜ |
| EN04.2 | Spring Actuator (management port :8081, non routé nginx) | S | Medium | ⬜ |
| EN04.3 | Micrometer + Prometheus scraping `/actuator/prometheus` | S | Medium | ⬜ |
| EN04.4 | Docker HEALTHCHECK + liveness / readiness separation | S | Medium | ⬜ |

> **Blocker :** EN-NOTIF doit précéder US16.1.3. EN07.x validé avant toute release prod. EN04.x parallélisables entre eux.

---

## Sprint 5 — Module Whiteboard (MVP)

**Branches :** une branche par US/Enabler — `feat/{us-id}-{slug}` (voir §Règles d'utilisation)
**Scope :** E08 Whiteboard complet
**Pré-requis :** Sprint 2 terminé + Sprint 4 EN07.x validé + Gate 1 US08.x validé par PO Agent

| US | Titre | Size | Priorité | 🤖 Dev |
|----|-------|------|----------|--------|
| EN08.1 | Isolation WebSocket room par board | M | Critical | ⬜ |
| EN08.2 | Guard Angular module whiteboard | S | Critical | ⬜ |
| US08.1.1 | Utilisateur crée un tableau (backend) | M | Critical | ⬜ |
| US08.1.2 | Utilisateur liste ses tableaux (backend) | M | Critical | ⬜ |
| US08.1.3 | Angular : liste des tableaux | M | Critical | ⬜ |
| US08.1.4 | Renommer un tableau | S | High | ⬜ |
| US08.1.5 | Supprimer un tableau | S | Critical | ⬜ |
| US08.2.1 | Owner partage un tableau par lien public | M | High | ⬜ |
| US08.2.2 | Utilisateur rejoint un tableau via token | M | High | ⬜ |
| US08.2.3 | Angular : UI partage et gestion rôles | M | High | ⬜ |
| US08.3.1 | Connexion WebSocket au canvas | M | Critical | ⬜ |
| US08.3.2 | Angular : canvas whiteboard *(→ décomposer en 08.3.2a/b/c avant impl.)* | XL | Critical | ⬜ |
| US08.3.3 | Undo / Redo sur le canvas | M | High | ⬜ |
| US08.4.1 | Créer un tableau depuis un template | M | Medium | ⬜ |
| US08.5.1 | Présence des participants sur le canvas | M | High | ⬜ |

---

## Sprint 6 — Durcissement & recette MVP 🏁

**Branches :** une branche par US/Enabler — `feat/{us-id}-{slug}` (voir §Règles d'utilisation)
**Scope :** clôture du périmètre MVP — reliquats, dette, recette
**Jalon de sortie :** déclaration **« MVP terminé »** par le mainteneur → déverrouille les sprints 7+

| Item | Titre | Priorité | 🤖 Dev |
|------|-------|----------|--------|
| US16.3.1 | Formulaire de contact (en review depuis Sprint 1 — à sortir) | Critical | 🔎 Review |
| EN05.13-15 | CI/CD Supply-chain restants | High | ⬜ |
| E05 US restantes | 7 US supply-chain | High | ⬜ |
| Dette S2 | Raccorder cache Redis EN03.3 au chemin de lecture statut module | High | ⬜ |
| Dette S2 | Aligner champ `description` API modules avec `PivotModule` | Medium | ⬜ |
| Dette S2 | Dédupliquer `sanitizeReturnUrl` (US01.1.4/01.1.5, pivot-ui) | Low | ⬜ |
| Recette | Passe accessibilité (WCAG 2.1 AA) sur Auth/Shell/Modules/Whiteboard | High | ⬜ |
| Recette | Bug bash MVP complet + recette PO des US `Review` | Critical | ⬜ |

> **Pré-requis du jalon :** rédiger la **Definition of Done MVP** (checklist explicite features/prod/recette) — voir §Zones d'ombre n°1. Sans elle, le verrou §6 du modèle backlog reste une déclaration sans critère.

---

## Sprints 7–12 — Plan phase-3 (conditionnel au jalon « MVP terminé »)

> ⏸️ **Verrou :** ces sprints ne démarrent qu'après la déclaration « MVP terminé » (Sprint 6). Séquencement fondé sur 3 goulots : E17 (aucun module phase-3 ne peut démarrer sans les templates multi-repo), la gouvernance ADR (bus d'événements non spécifié = chemin critique invisible de S9+), et le principe « piloter petit avant de piloter gros » (valider les templates sur l'agilité avant d'engager le domaine Pilotage).
> **Hypothèse de capacité :** ~11-19 items/sprint (vélocité observée S1-S3, agents parallèles).

### Sprint 7 — Fondations phase-3 (E17 + gouvernance ADR)

**Scope :** infrastructure multi-repo complète + mise à jour de la gouvernance d'architecture
**Pré-requis :** E03 terminé · E07 infra prod validée (S4)

| Item | Titre | Priority | 🤖 Dev |
|------|-------|----------|--------|
| EN17.4 | Convention BDD multi-schéma + Flyway baseline | Critical | ⬜ |
| EN17.1 | Publication pivot-core-starter (Maven) | High | ⬜ |
| EN17.2 | Publication @pivot/design-system (npm) — **création du repo `pivot-design-system`** | High | ⬜ |
| EN17.3 | Publication @pivot/ui-core (npm) | High | ⬜ |
| EN17.5 | Template repo pivot-xxx-core | High | ⬜ |
| EN17.6 | Template repo pivot-xxx-ui | High | ⬜ |
| EN17.7 | nginx API Gateway — routing multi-backend par préfixe URL | Critical | ⬜ |
| ADR | Passage ADR-008→016 de « Proposé » à « Accepté » (décision mainteneur actée) | Critical | ⬜ |
| ADR | Rédaction ADR-017 (modèle d'entités catalogue) · ADR-018 (stratégie forks) · **ADR-019 (bus d'événements — bloquant E21/E29/E42/E43)** · ADR-020 (briques natives) | Critical | ⬜ |

> **Parallélisable :** EN17.1 ‖ EN17.2 → EN17.3 → EN17.4 ‖ EN17.5 → EN17.6 · EN17.7 dès EN17.4 stable · rédaction ADR en parallèle de tout le reste.

### Sprint 8 — Pilote multi-repo (agilité) + enforcement taxonomie

**Scope :** premiers modules satellites sur `pivot-agilite-*` — périmètres volontairement petits pour valider les templates EN17.5/6 avant d'engager le domaine Pilotage
**Sortie :** 1er repo satellite en prod + retour d'expérience sur les templates

- E09 Scrum Poker (3 features, 5 US) — rooms, votes temps réel
- E14 La Roue (3 features, 3 US) — tirage pondéré
- E20 Rétrospective (3 features + 2 EN, 5 US) — formats rétro, plan d'action
- Enforcement taxonomie : merge `check-taxonomie.mjs` + câblage `lint:taxonomie` CI + backfill `Rôle:` sur ~700 US/EN (le référentiel mergé n'est appliqué par rien aujourd'hui)

### Sprint 9 — Socle domaine Pilotage

**Scope :** la colonne vertébrale du domaine, pas ses satellites
**Sortie :** une roadmap simple créable de bout en bout

- EN18.1 (schéma `pilotage`) + EN18.9 (modèle Application→Projet)
- E40 Profil & adaptation (6 US) — conditionne le contenu de tous les modules du domaine
- EN22.1 (modèle temporel unique + moteur d'ordonnancement) + EN22.2 (performance Gantt web)
- F22.3 Roadmap rapide (lanes, Now/Next/Later, jalons stratégiques)

### Sprint 10 — Pilotage cœur PPM

**Sortie :** release Pilotage v0 utilisable (roadmap + Gantt + portefeuille consolidé)

- E22 F22.4 Gantt (WBS, dépendances typées, chemin critique) + F22.6 Vues & restitutions
- E23 Portefeuille projets (12 US — tableau de bord RAG, rapports, what-if/business cases ex-E31)

### Sprint 11 — Risques + plan de contrôle sécurité

**Sortie :** registre de risques opérationnel + socle Zero Trust posé

- E21 vague 1 (~28 US) : F21.1 profil & moteur adaptatif, F21.2 scoring, F21.3 cycle de vie & 4T
- E43 vague 1 : EN43.5 (identité), EN43.6 (secrets OpenBao), EN43.7 (autorisation externalisée) — prérequis de tout module manipulant des données sensibles (EN43.13)

### Sprint 12 — Forms + Onboarding

**Sortie :** form-builder livré + onboarding actif sur les modules déjà en prod (S8-S11)

- E42 Pivot Forms (32 US) — brique transverse consommée par E38 (dépôt d'idée) et E29
- EN41.1 Framework d'onboarding in-app + F41.1 (tours guidés, tooltips, checklists)

---

## Backlog post-S12 (non planifié)

- US01.4.3b Alerte IP suspecte (v1-enterprise — nécessite ADR GeoIP) + 4 autres items v1-enterprise
- E10 Daily Standup · E11 Capacity Planning (+ velocity tracking US11.4.1-2) · E12 MeetOps · E13 Cahiers de tests · E15 Équipes (phase-3, `pivot-agilite-*`/`pivot-collaboratif-*`/`pivot-pilotage-*`)
- E19 Module Session (phase-3 — pivot-collaboratif-core/ui) : ⚠️ dépendance de E41 F41.4 (sessions live) et E38 F38.15
- E21 vagues 2+ : F21.4 boucle vivante (dépend ADR-019 bus), F21.5 portefeuille, F21.6 quantitatif/conformité, F21.7 IA gouvernée, F21.8/21.9 restitutions & cockpit
- E24 ADR projet · E25 Commande publique · E26 Budget · E27 OKR (satellites Pilotage, après la v0 S10)
- E28 Intégration open source (dépend ADR-009 accepté S7 + gouvernance forks ADR-018)
- E29 Workflows & Automatisation (78 US — passe DoR à faire au sprint précédant son implémentation)
- E30 Collaboration (86 US — **bloqué par l'arbitrage E08/E30**, voir §Zones d'ombre n°2 ; passe DoR à faire)
- E32–E37, E39 satellites Pilotage (ressources, tâches, IA, gouvernance, intégration SI, licences, chantiers)
- E38 Management de l'innovation (45 US — dépend E42 Forms pour le dépôt d'idée)
- E41 suites : F41.2 centre d'aide, F41.3 supports, F41.4 présentiel (dépend E19), F41.5 catalogue par module (au fil des livraisons), F41.6 mesure d'adoption
- E43 vagues 2+ : EN43.1-4 topologie (BFF/Gateway/Mesh/Egress), EN43.8-13 observabilité & gouvernance

---

## Zones d'ombre à raffiner

Décisions produit / cadrages à traiter **avant** le sprint qui en dépend :

| # | Sujet | Échéance | Détail |
|---|-------|----------|--------|
| 1 | **Definition of Done MVP** | avant S6 | Le jalon « MVP terminé » n'a aucun critère écrit — rédiger la checklist (features, prod, recette PO) qui déclenche le déverrouillage phase-3 |
| 2 | **Arbitrage E08 ↔ E30** | avant S5 | E08 Whiteboard (7 US MVP) recouvre E30 Collaboration (86 US benchmark, canevas inclus) — E08 devient-il le noyau incrémental de E30, ou un MVP jetable ? Construire S5 sans trancher = risque de double travail |
| 3 | **ADR-019 bus d'événements** | avant S9 | Référencé partout (boucle vivante E21, `form.submitted` E42, EN43.8, E29, ADR-008/009) mais aucune ADR ne le spécifie — chemin critique invisible de tout le plan phase-3 |
| 4 | **Statuts ADR-008→016** | S7 | Toutes « Proposé » alors que la décision d'acceptation a été prise (merge E43) — acter dans `docs/adr/` |
| 5 | **Enforcement taxonomie** | S8 | Référentiel mergé mais 0/700 US ne porte de champ `Rôle:`, script et CI exclus volontairement de la PR #65 |
| 6 | **Champ `Profils:` officieux** | S9 | Présent sur 228 US (Pilotage, E41), absent d'E42, non déclaré dans le modèle §2 du README backlog — officialiser ou retirer |
| 7 | **Cockpits sans porteur** | avant S10 | ADR-008 : composition portée par le shell (E16), « à définir après étude UX réelle » — aucune US ne porte ni l'étude ni la composition |
| 8 | **US39.1.7** | S9 | Dernier vestige « hors v2 adaptative, à confirmer » de la dissolution E31 — trancher |
| 9 | **Gate 1 à l'échelle** | continu | 558 US phase-3 devront passer DoR + Gate 1 — prévoir la passe DoR par EPIC au sprint précédant l'implémentation (comme fait sur pilotage/forms/onboarding), pas au fil de l'eau. E29/E30/E21 partiel restent à niveau inégal |
| 10 | **Hygiène repo** | S6 | 3 vulnérabilités Dependabot (1 high) · branche `fix/pages-deploy-settling-delay` en suspens (probablement couverte par #57) · PNG PlantUML cassent le build local |

---

## Règles d'utilisation

1. **Démarrage item :** `git checkout main && git pull && git checkout -b feat/{us-id}-{slug}`
2. **US en cours :** commits atomiques sur `feat/{us-id}-{slug}` — backlog + code + PATCH_NOTES dans chaque commit
3. **Actions parallèles :** plusieurs US du sprint lancées simultanément — **une branche par US/Enabler**, agents séparés
4. **Mise à jour SPRINTS.md :** à chaque changement d'état d'une US (commit sur la branche de l'US)
5. **Fin d'US :** PR `feat/{us-id}-{slug} → main`, autoloop review + CI, Gate 4 ≥ 85
6. **US bloquée :** retour Backlog + note dans ce fichier + commit sur la branche de l'US courante

---

*Dernière mise à jour : 2026-07-06 — plan des sprints 6-12 (durcissement MVP → fondations phase-3 → pilote agilité → domaine Pilotage → risques/sécurité → Forms/onboarding) + backlog post-S12 + zones d'ombre à raffiner*
