# Sprint 5 — Infrastructure multi-repo (E17) + Module Whiteboard (Socle E30, ex-E08)

**Branches :** une branche par US/Enabler — `feat/{us-id}-{slug}` (voir [§Règles d'utilisation](./README.md#règles-dutilisation))
**Scope :** Vague 0 — E17 (infrastructure multi-repo) rapatrié depuis Sprint 7, dans la mesure
nécessaire pour démarrer le noyau whiteboard sur son repo cible réel · Vague 1+ — noyau F08.x/EN08.x
complet, désormais hébergé sous [`EPIC-collaboration`](../EPIC-collaboration/README.md) (E30),
`Phase: Socle` propre, non verrouillé par le reste d'E30
**Pré-requis :** Sprint 2 terminé (E03 module system Done — condition de déclenchement d'E17 par
son propre README) + Sprint 4 EN07.x validé (recette maintainer ✅ 2026-07-07) + Gate 1 US08.x
validé par PO Agent ✅ + Gate 1 EN17.x validé par PO Agent ✅ (voir notes du 2026-07-07)
**Note de reséquencement (2026-07-07) :** voir §Reséquencement E17 ci-dessous — E17 déplacé de
Sprint 7 vers ce sprint, en Vague 0, pour lever l'incohérence détectée entre le repo cible
`pivot-collaboratif-core/-ui` (ADR-006, README E30) et son verrouillage nominal post-Socle
(ancien Sprint 7).

## Vague 0 — Infrastructure multi-repo (E17, rapatrié de Sprint 7)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| EN17.8 | Incubation design system dans `pivot-ui` (déjà démarrable, aucun repo créé) | M | Critical | ✅ Done — pivot-ui PR #111 mergée |
| EN17.4 | Convention BDD multi-schéma + Flyway baseline | S | Critical | ✅ Done — pivot-core PR #167 mergée (ModuleFlywayConfigurer factory) |
| EN17.1 | Publication `pivot-core-starter` (Maven, extraction depuis `pivot-core`) | L | Critical | ✅ Done — pivot-core PR #167 mergée |
| EN17.2 | Publication `@pivot/design-system` (npm) — création repo `pivot-design-system`, déclenchée par la création de `pivot-collaboratif-ui` (1er repo module UI) | M | Critical | ✅ Done — [`@pivot-platform/design-system@0.1.0`](https://github.com/PIVOT-PLATFORM/pivot-design-system/pkgs/npm/design-system) publié sur GitHub Packages (2026-07-07) |
| EN17.5 | Template repo `pivot-xxx-core` (formalisé à partir du scaffolding réel de `pivot-collaboratif-core`) | S | High | ✅ Done — [`pivot-template-core`](https://github.com/PIVOT-PLATFORM/pivot-template-core) créé (2026-07-07) |
| EN17.6 | Template repo `pivot-xxx-ui` (formalisé à partir du scaffolding réel de `pivot-collaboratif-ui`) | S | High | ✅ Done — [`pivot-template-ui`](https://github.com/PIVOT-PLATFORM/pivot-template-ui) créé (2026-07-07) |
| EN17.3 | Publication `@pivot-platform/ui-core` (npm, consomme `@pivot/design-system` publié) | M | Critical | ✅ Done |
| EN17.7 | nginx API Gateway — routing multi-backend par préfixe URL (rend `pivot-collaboratif-core` joignable) | M | Critical | ✅ Done — pivot-ui PR #114 + pivot-core PR #170 mergées |

> **Ordre de dépendance Vague 0 :** EN17.8 ‖ EN17.4 ‖ EN17.1 (aucune dépendance mutuelle) →
> création de `pivot-collaboratif-core`/`pivot-collaboratif-ui` (consomment EN17.1 respectivement
> rien encore) → EN17.2 (déclenché par la création de `pivot-collaboratif-ui`, extrait le contenu
> incubé en EN17.8) → EN17.5/EN17.6 (template formalisé après coup, non bloquant pour la suite) →
> EN17.3 (consomme EN17.2 publié) → EN17.7 (dès EN17.1 + EN17.3 stables, pour le routing réel).

## Vague 1+ — Module Whiteboard (Socle), sur `pivot-collaboratif-core`/`pivot-collaboratif-ui`

| US | Titre | Size | Priorité | 🤖 Dev |
|----|-------|------|----------|--------|
| EN08.1 | Isolation WebSocket room par board | M | Critical | ⬜ |
| EN08.2 | Guard Angular module whiteboard | S | Critical | ⬜ |
| US08.1.1 | Utilisateur crée un tableau (backend) | M | Critical | 🔄 |
| US08.1.2 | Utilisateur liste ses tableaux (backend) | M | Critical | 🔄 |
| US08.1.3 | Angular : liste des tableaux | M | Critical | ⬜ |
| US08.1.4 | Renommer un tableau | S | High | 🔄 |
| US08.1.5 | Supprimer un tableau | S | Critical | 🔄 |
| US08.2.1 | Owner partage un tableau par lien public | M | High | ⬜ |
| US08.2.2 | Utilisateur rejoint un tableau via token | M | High | ⬜ |
| US08.2.3 | Angular : UI partage et gestion rôles | M | High | ⬜ |
| US08.3.1 | Connexion WebSocket au canvas | M | Critical | ⬜ |
| US08.3.2a | Angular : canvas whiteboard — composant local & outils de dessin | XL | High | ⬜ |
| US08.3.2b | Angular : canvas whiteboard — synchronisation STOMP & états connexion | M | High | ⬜ |
| US08.3.2c | Angular : canvas whiteboard — présence des participants (curseurs) | S | Medium | ⬜ |
| US08.3.3 | Undo / Redo sur le canvas | M | High | ⬜ |
| US08.4.1 | Créer un tableau depuis un template | M | Medium | ⬜ |
| US08.5.1 | Présence des participants sur le canvas | M | High | ⬜ |

## Reséquencement E17 (2026-07-07)

Incohérence détectée au démarrage de session : `EPIC-collaboration/README.md` (§Repo cible) et
ADR-006 fixent `pivot-collaboratif-core`/`pivot-collaboratif-ui` comme cible du noyau whiteboard,
sous réserve d'E17 — mais E17 vivait entièrement dans Sprint 7, verrouillé « post-Socle » (derrière
Sprint 6 + déclaration mainteneur). Le noyau whiteboard F08.x/EN08.x est pourtant explicitement
`Phase: Socle`, non verrouillé — un item Socle ne peut pas dépendre d'un prérequis phase-3 verrouillé
post-Socle sans blocage circulaire.

Le README de l'épique E17 lui-même contredisait déjà le verrou Sprint 7 : sa condition de
déclenchement documentée est « prérequis Socle non bloquant · déclencher quand E03 (module system)
est Done » — pas une déclaration « Socle terminé ». E03 est Done depuis Sprint 2. **Décision** :
rapatrier EN17.1–EN17.8 dans ce sprint (Vague 0), avant le noyau whiteboard (Vague 1+), conformément
à la condition de déclenchement déjà documentée par E17 — pas une invention nouvelle, une correction
d'un verrou sur-conservateur qui ne correspondait pas à sa propre epic. Sprint 7 recentré sur la
gouvernance ADR (ADR-008→016 acceptation, ADR-017–020) uniquement — voir `sprint-7.md`.

Repos `pivot-pilotage-core/-ui`, `pivot-agilite-core/-ui` déjà créés sur GitHub
(2026-07-06) par anticipation, avant que ces prérequis EN17 soient satisfaits — écart constaté,
non bloquant pour ce sprint (ils restent vides tant qu'E17 n'est pas fait), mais à garder en tête :
ne pas les scaffolder avant que Sprint 5 Vague 0 ne soit terminé et le template EN17.5/17.6 stable.

> **Gate 1 — READINESS Vague 1+ (2026-07-07) :** PO Agent a passé en revue la DoR des 17 items du
> noyau whiteboard (2 Enablers EN08.1/EN08.2 + 15 US, dont US08.3.2 déjà décomposée en
> 08.3.2a/b/c). Tous ≥ 70/100 après complétion des ACs manquants (essentiellement sections
> `Hors périmètre`/`Notes d'implémentation` absentes, AC erreur/sécurité/A11y incomplets) —
> **`Stage: Backlog → Ready` sur les 17 fichiers**. Détail par item et conventions transverses posées
> (404 non-membre/cross-tenant vs 403 rôle insuffisant, contrat d'événements WS unique
> `JOIN/LEAVE/DRAW/CURSOR_MOVE/UNDO`, hard-delete US08.1.5) → PR `pivot-docs`. Chevauchement
> US08.5.1 ↔ US08.3.2c (deux specs de panneau participants) détecté et tranché : panneau de présence
> porté exclusivement par US08.5.1, US08.3.2c ne rend que l'overlay de curseurs. Un point produit
> reste ouvert, non bloquant pour Gate 1 mais à trancher avant l'implémentation : TTL par
> défaut/maximal du token de partage (US08.2.1) — voir sa section Notes d'implémentation. Le fichier
> `us-canvas-angular.md` (US08.3.2 pré-décomposition) reste `Stage: Decomposed`, hors score Gate 1.
>
> **Gate 1 — READINESS Vague 0 (2026-07-07) :** PO Agent a passé en revue la DoR des 8 enablers E17
> (EN17.1–EN17.8). Tous satisfont le DoR Enabler (Type · Objectif technique · Justification ·
> Critères de complétion), score ≥ 70/100 — critères techniques précis et testables, dépendances
> claires, aucune ambiguïté bloquante. Scores individuels : EN17.1 82 · EN17.2 80 · EN17.3 78 ·
> EN17.4 86 · EN17.5 76 · EN17.6 75 · EN17.7 85 · EN17.8 82 — **`Stage: Backlog → Ready` sur les
> 8 fichiers**. Priorités alignées sur le tableau Vague 0 (EN17.1/17.2/17.3/17.4/17.7/17.8 →
> Critical ; EN17.5/17.6 → High, formalisés après coup sur scaffolding réel). DoR complétée sur cette
> branche : ajout des sections `Objectif technique` et `Justification` manquantes dans chaque fiche.
>
> Recette manuelle Sprint 4 EN07.x confirmée par le mainteneur le 2026-07-07 — second volet du
> prérequis levé. Sprint 5 démarre à cette session par la Vague 0 (E17), voir §Reséquencement E17.
>
> **Revue de parité concurrentielle (2026-07-07, suite du Gate 1) :** benchmark Miro/Klaxoon/
> Microsoft Whiteboard sur les fonctionnalités déjà planifiées. Décision du mainteneur : ne pas
> rouvrir le verrou Socle (sticky notes, connecteurs, commentaires, vote, réactions restent
> `phase-3` — voir `zones-ombre.md` #11). US08.3.2a enrichie en conséquence (couleur, sélection
> multiple, duplication, copier/coller, groupement, guides d'alignement) sans nouveau type d'objet
> — Size relevé L → XL, l'Architect Agent devra juger d'une décomposition avant Gate 2. Incohérence
> corrigée au passage sur US08.3.2b (AC citait encore DRAW/ERASE/MOVE/RESIZE comme 4 types STOMP
> distincts, contredisant le contrat unique déjà posé en Notes d'implémentation).
>
> **Avancement Vague 0 (2026-07-07, session 2) :** 6/8 enablers EN17 terminés.
> ✅ EN17.8 — design system incubé dans pivot-ui (branche `projects/design-system/`, angular.json)
> ✅ EN17.4 — ModuleFlywayConfigurer + ModuleSchemaIsolation (pivot-core PR #167)
> ✅ EN17.1 — pivot-core-starter publié sur GitHub Packages Maven (pivot-core PR #167)
> ✅ EN17.5 — template repo `pivot-template-core` créé (PIVOT-PLATFORM/pivot-template-core, pivot-docs PR #105)
> ✅ EN17.3 — `@pivot-platform/ui-core` publié sur GitHub Packages npm (pivot-ui PR #112)
> ✅ EN17.7 — nginx API Gateway multi-module (pivot-ui PR #114 + pivot-core PR #170, 2026-07-07)
> ✅ EN17.2 — `@pivot-platform/design-system` publié sur GitHub Packages npm (pivot-design-system PR #1, 2026-07-07)
> ✅ EN17.6 — template repo `pivot-template-ui` créé (PIVOT-PLATFORM/pivot-template-ui, 2026-07-07)
