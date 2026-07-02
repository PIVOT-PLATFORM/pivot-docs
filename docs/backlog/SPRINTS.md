# SPRINTS — PIVOT Platform

Source de vérité pour l'organisation des sprints et l'assignation des US aux branches.

**Règle branche :** `feat/{us-id}-{slug}` par US/Enabler — une branche par item, agents en parallèle sur branches séparées.

---

## Sprint 1 — Auth & Shell MVP ✅ Terminé

**Branche :** `feat/us16-3-1-contact`

| US | Titre | 🤖 Dev |
|----|-------|--------|-------|
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
| **US16.3.1** | **Formulaire de contact** | ✅ |

---

## Sprint 2 — Système de modules + Auth manquant

**Branches :** une branche par US/Enabler — `feat/{us-id}-{slug}` (voir §Règles d'utilisation)
**Scope :** E03 (enablers + admin features) + US01 manquants
**Priorité :** Critical — débloque tous les modules E08–E15

| US | Titre | Size | Priorité | 🤖 Dev |
|----|-------|------|----------|--------|-------|
| EN03.1 | PivotModule interface + registre backend | S | Critical | ⬜ |
| EN03.2 | Guard Angular moduleGuard + status API | S | Critical | ⬜ |
| EN03.3 | Cache Redis statut modules TTL 60s | S | Critical | ⬜ |
| EN03.4 | Contrat de module frontend TypeScript | XS | Critical | ✅ |
| US03.1.1 | Admin active un module pour son tenant | M | Critical | ⬜ |
| US03.1.2 | Admin désactive un module pour son tenant | M | Critical | ⬜ |
| US03.2.1 | UI liste modules disponibles avec statut | M | High | ⬜ |
| US03.2.2 | Guard Angular bloque accès module désactivé | S | Critical | ⬜ |
| US01.1.4 | Redirection post-login | S | High | ⬜ |
| US01.1.5 | Expiration session + auto-logout | M | High | ⬜ |
| US01.2.4 | Politique robustesse mot de passe | S | High | ⬜ |

> **Parallélisable :** EN03.1+EN03.3 (backend) ‖ EN03.2+EN03.4 (frontend) ‖ US01.x (auth, indépendants de E03 côté code)

---

## Sprint 3 — Espace compte + Administration

**Branches :** une branche par US/Enabler — `feat/{us-id}-{slug}` (voir §Règles d'utilisation)
**Scope :** E02 (espace compte utilisateur) + E06 (administration tenant/superadmin)

| US | Titre | Size | Priorité | 🤖 Dev |
|----|-------|------|----------|--------|-------|
| US02.1.1 | Voir et éditer son profil | M | High | ⬜ |
| US02.1.2 | Préférence de langue | S | Medium | ⬜ |
| US02.2.1 | Changer son mot de passe | M | High | ⬜ |
| US02.2.2 | Changer son adresse email | M | High | ⬜ |
| US02.3.1 | Voir ses sessions actives | M | Medium | ⬜ |
| US02.3.2 | Demander la suppression de son compte | M | High | ⬜ |
| US02.3.3 | Exporter ses données personnelles | M | High | ⬜ |
| US06.1.1 | Liste des utilisateurs du tenant (backend) | M | High | ⬜ |
| US06.1.2 | Liste des utilisateurs du tenant (Angular) | M | High | ⬜ |
| US06.1.3 | Modifier le rôle d'un utilisateur | M | High | ⬜ |
| US06.1.4 | Désactiver un compte | S | High | ⬜ |
| US06.1.5 | Réactiver un compte désactivé | S | High | ⬜ |
| US06.2.1 | Créer un tenant | L | Critical | ⬜ |
| US06.2.2 | Désactiver un tenant | M | High | ⬜ |
| US06.2.3 | Liste des tenants | M | Medium | ⬜ |

> **Parallélisable :** US02.x ‖ US06.x — dépendances : US06.1.5 après US06.1.4 ; US02.3.2 après US02.2.1

---

## Sprint 4 — Infrastructure prod + Auth avancé + Notifications

**Branches :** une branche par US/Enabler — `feat/{us-id}-{slug}` (voir §Règles d'utilisation)
**Scope :** E07 (infra déploiement) + US01 sécurité avancée + EN-NOTIF + US16 restants + US03 SUPER_ADMIN

| US | Titre | Size | Priorité | 🤖 Dev |
|----|-------|------|----------|--------|-------|
| EN07.1 | Docker Compose production | M | Critical | ⬜ |
| EN07.2 | Nginx proxy + SSL/TLS | M | Critical | ⬜ |
| EN07.5 | Health checks + readiness probes | S | Critical | ⬜ |
| US01.4.2 | Gérer ses appareils de confiance | M | High | ⬜ |
| US01.4.3a | Alerte connexion depuis nouvel appareil | M | High | ⬜ |
| US01.5.1 | Notification email action sensible | M | High | ⬜ |
| EN-NOTIF | Infrastructure notifications in-app | L | High | ⬜ |
| US16.1.3 | Badge notifications | S | Medium | ⬜ |
| US16.2.2 | Section modules à venir | S | Medium | ⬜ |
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
|----|-------|------|----------|--------|-------|
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

## Backlog sprint 6+ (non planifié)

- US01.4.3b Alerte IP suspecte (v1-enterprise — nécessite ADR GeoIP)
- E05 CI/CD Supply-chain restants (EN05.13-15 + 7 US)
- E04 Observabilité — EN04.1–4 planifiés Sprint 4
- E09–E15 Modules phase-3 (verrouillés — migreront vers `pivot-agilite-*` / `pivot-collaboratif-*`)
- E12 MeetOps (phase-3 — pivot-collaboratif-core/ui)
- E13 Cahiers de tests (phase-3 — pivot-pilotage-core/ui)
- E18 Module Pilotage (phase-3 — pivot-pilotage-core/ui) : roadmap, portefeuille, ADR, budget, OKR, risques, commande publique
- E19 Module Session (phase-3 — pivot-collaboratif-core/ui) : QUIZ multijoueur, POLL, WORDCLOUD, BRAINSTORM, QA, VOTE
- E20 Module Retrospective (phase-3 — pivot-agilite-core/ui)
- E11 velocity tracking : US11.4.1-2 (burndown, veloicte) a planifier avec E11

---

## Backlog phase-3 — Infrastructure multi-repo (E17)

**Pré-requis :** E03 Système de modules terminé · E07 infra prod validée

| Enabler | Titre | Priority | 🤖 Dev |
|---------|-------|----------|--------|
| EN17.4 | Convention BDD multi-schéma + Flyway baseline | Critical | ⬜ |
| EN17.1 | Publication pivot-core-starter (Maven) | High | ⬜ |
| EN17.2 | Publication @pivot/design-system (npm) | High | ⬜ |
| EN17.3 | Publication @pivot/ui-core (npm) | High | ⬜ |
| EN17.5 | Template repo pivot-xxx-core | High | ⬜ |
| EN17.6 | Template repo pivot-xxx-ui | High | ⬜ |
| EN17.7 | nginx API Gateway — routing multi-backend par préfixe URL | Critical | ⬜ |

> **Parallélisable :** EN17.1 ‖ EN17.2 (indépendants) → EN17.3 (dépend de EN17.2) → EN17.4 ‖ EN17.5 → EN17.6 (dépend de EN17.2+3) · EN17.7 peut démarrer dès EN17.4 stable

---

## Règles d'utilisation

1. **Démarrage item :** `git checkout main && git pull && git checkout -b feat/{us-id}-{slug}`
2. **US en cours :** commits atomiques sur `feat/{us-id}-{slug}` — backlog + code + PATCH_NOTES dans chaque commit
3. **Actions parallèles :** plusieurs US du sprint lancées simultanément — **une branche par US/Enabler**, agents séparés
4. **Mise à jour SPRINTS.md :** à chaque changement d'état d'une US (commit sur la branche de l'US)
5. **Fin d'US :** PR `feat/{us-id}-{slug} → main`, autoloop review + CI, Gate 4 ≥ 85
6. **US bloquée :** retour Backlog + note dans ce fichier + commit sur la branche de l'US courante

---

*Dernière mise à jour : 2026-07-02*
