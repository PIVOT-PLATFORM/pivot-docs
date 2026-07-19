# Sprints — PIVOT Platform

Source de vérité pour l'organisation des sprints et l'assignation des US aux branches. Un fichier
par sprint — voir [pourquoi](#pourquoi-un-fichier-par-sprint) en bas de page.

**Règle branche :** `feat/{us-id}-{slug}` par US/Enabler — une branche par item, agents en parallèle sur branches séparées.

---

## Sommaire

| Sprint | Titre | Statut |
|--------|-------|--------|
| [Sprint 1](./sprint-1.md) | Auth & Shell Socle | ✅ Terminé sauf contact |
| [Sprint 2](./sprint-2.md) | Système de modules + Auth manquant | ✅ Terminé |
| [Sprint 3](./sprint-3.md) | Espace compte + Administration | 🔎 15/15 mergées — en attente de recette |
| [Sprint 4](./sprint-4.md) | Infrastructure prod + Auth avancé + Notifications | ✅ 16/16 mergées |
| [Sprint 5](./sprint-5.md) | Infra multi-repo (E17) + Module Whiteboard (Socle) | 🔎 Dev terminé — Vague 0 (E17) 10/10 mergés (EN17.1 clos 2026-07-08, `pivot-core#171` fermée) · Vague 1+ (whiteboard) 17/17 mergés · en attente de recette mainteneur |
| [Sprint 6](./sprint-6.md) | Durcissement & recette Socle 🏁 | ✅ Socle terminé (déclaré 2026-07-09 — Axe 2 écarté, Axe 3 différé en fin de tous les sprints) |
| [Sprint 7](./sprint-7.md) | Gouvernance ADR (phase-3) + Migration BFF Auth (EN01.14-18) | 🔄 Gouvernance ADR ✅ Terminé (2026-07-09) — ADR-008→016 et ADR-023→026 tous Accepté · Migration BFF (EN01.14-18) ⬜ pas démarrée |
| [Sprint 8](./sprint-8.md) | Pilote multi-repo (agilité) + enforcement taxonomie | ✅ Terminé (2026-07-11) — templates satellites validés (EN17.11), TAXO-2 fait, écart ADR-026 §2 comblé (US09.2.3) |
| [Sprint 9](./sprint-9.md) | Socle **technique** Pilotage + Roadmap v0 *(re-trié 2026-07-10)* | 🔓 Débloqué (2026-07-11, Sprint 8 clos — REX satisfait) — E40 (profil adaptatif) sorti → queue idéation |
| [Sprint 10](./sprint-10.md) | Parité whiteboard visible (remédiation Socle) — favoris, corbeille, recherche, paramètres tableau *(nouveau 2026-07-13)* | ✅ Terminé (2026-07-16) — 4/4 US mergées (collaboratif-core #66) + recette mainteneur validée, 3 correctifs recette mergés (collaboratif-ui #124, pivot-ui #204) |
| [Sprint 11](./sprint-11.md) | Parité whiteboard — Fondation modèle `Card` (EN08.4) *(nouveau 2026-07-13)* | ⬜ planifié — bloquant S12-43 |
| [Sprint 12](./sprint-12.md) | Parité whiteboard — Objets typés & connecteurs (F08.6/F08.7) | ⬜ planifié |
| [Sprint 13](./sprint-13.md) | Parité whiteboard — Cadres, organisation, champs (F08.8/F08.9/F08.10) | 🟡 en cours (2026-07-16) — cadres (US08.8.1/.2) + organisation backend (US08.9.1/.2) livrés dans `collaboratif` main **hors convention** (recette en attente) ; z-order (US08.9.3) + champs (US08.10.1/.2) restants — voir sprint-13.md |
| [Sprint 14](./sprint-14.md) | Parité whiteboard — Canvas UX & présence (F08.11/F08.5) | ⬜ planifié |
| [Sprint 15](./sprint-15.md) | Parité whiteboard — Facilitation : minuteur, vote (F08.12) | ✅ Terminé (2026-07-16) — US08.12.1/2 câblées UI + recette live (collaboratif-ui #126, enabler /me collaboratif-core #89) |
| [Sprint 16](./sprint-16.md) | Parité whiteboard — Cycle de vie & partage (F08.13/US08.2.5) | ⬜ planifié |
| [Sprint 17](./sprint-17.md) | Pilotage cœur PPM | ⏸️ Extrait — produit Pilotage distinct (hors trajectoire PIVOT) |
| [Sprint 18](./sprint-18.md) | Risques + plan de contrôle sécurité | 🔓 Débloqué — **reste dans PIVOT** (E21 Risques, schéma `risk`) |
| [Sprint 19](./sprint-19.md) | Forms (cœur) + framework onboarding | 🔓 Débloqué — **reste dans PIVOT** (E42 Forms, E41 onboarding) |
| [Sprint 20](./sprint-20.md) | Satellites Pilotage à valeur (E24 ADR · E26 Budget · E27 OKR · E23 v2) *(nouveau 2026-07-10)* | ⏸️ Extrait — produit Pilotage distinct (hors trajectoire PIVOT) |
| [Sprint 21](./sprint-21.md) | E18 Pilotage — Référentiels & socle activité (14) | ⏸️ Extrait — produit Pilotage distinct (hors trajectoire PIVOT) |
| [Sprint 22](./sprint-22.md) | E18 Pilotage — Création d'une activité (13) | ⏸️ Extrait — produit Pilotage distinct (hors trajectoire PIVOT) |
| [Sprint 23](./sprint-23.md) | E18 Pilotage — Informations générales & portefeuille (13) | ⏸️ Extrait — produit Pilotage distinct (hors trajectoire PIVOT) |
| [Sprint 24](./sprint-24.md) | E18 Pilotage — Activité : Élaboration PMT (19) | ⏸️ Extrait — produit Pilotage distinct (hors trajectoire PIVOT) |
| [Sprint 25](./sprint-25.md) | E18 Pilotage — Activité : écran Budget (19) | ⏸️ Extrait — produit Pilotage distinct (hors trajectoire PIVOT) |
| [Sprint 26](./sprint-26.md) | E18 Pilotage — Activité : écran Jalons (17) | ⏸️ Extrait — produit Pilotage distinct (hors trajectoire PIVOT) |
| [Sprint 27](./sprint-27.md) | E18 Pilotage — Gestion budgétaire & jalons (16) | ⏸️ Extrait — produit Pilotage distinct (hors trajectoire PIVOT) |
| [Sprint 28](./sprint-28.md) | E18 Pilotage — Portefeuilles d'activités (14) | ⏸️ Extrait — produit Pilotage distinct (hors trajectoire PIVOT) |
| [Sprint 29](./sprint-29.md) | E18 Pilotage — Reporting, intégrations & qualité (15) | ⏸️ Extrait — produit Pilotage distinct (hors trajectoire PIVOT) |
| [Sprint 30](./sprint-30.md) | E18 Pilotage — Habillage entreprise (6) | ⏸️ Extrait — produit Pilotage distinct (hors trajectoire PIVOT) |
| [Sprint 31](./sprint-31.md) | E21 Risques — Boucle vivante, portefeuille & quantitatif (19) | 🔓 planifié — **reste dans PIVOT** (E21 Risques, schéma `risk`) |
| [Sprint 32](./sprint-32.md) | E21 Risques — IA, restitutions, cockpit & méthode DIT (13) | 🔓 planifié — **reste dans PIVOT** (E21 Risques, schéma `risk`) |
| [Sprint 33](./sprint-33.md) | E22 Roadmap — Socle Gantt & PPM (11) | ⏸️ Extrait — produit Pilotage distinct (hors trajectoire PIVOT) |
| [Sprint 34](./sprint-34.md) | E22 Roadmap — Interopérabilité MS Project & vues (11) | ⏸️ Extrait — produit Pilotage distinct (hors trajectoire PIVOT) |
| [Sprint 35](./sprint-35.md) | E22 Roadmap — Ressources & interfaces SI (10) | ⏸️ Extrait — produit Pilotage distinct (hors trajectoire PIVOT) |
| [Sprint 36](./sprint-36.md) | E27 OKR — Cadence, alignement, check-ins & scoring (15) | ⏸️ Extrait — produit Pilotage distinct (hors trajectoire PIVOT) |
| [Sprint 37](./sprint-37.md) | E27 OKR (dashboards) + Satellites Pilotage (16) | ⏸️ Extrait — produit Pilotage distinct (hors trajectoire PIVOT) |
| [Sprint 38](./sprint-38.md) | E38 Innovation — Stratégie, idéation & stage-gate (14) | ⏸️ Extrait — produit Pilotage distinct (hors trajectoire PIVOT) |
| [Sprint 39](./sprint-39.md) | E38 Innovation — Portefeuille & écosystème (13) | ⏸️ Extrait — produit Pilotage distinct (hors trajectoire PIVOT) |
| [Sprint 40](./sprint-40.md) | E38 Innovation — IA, communautés & événements (14) | ⏸️ Extrait — produit Pilotage distinct (hors trajectoire PIVOT) |
| [Sprint 41](./sprint-41.md) | Raffinage E52 — Vague 1 Socle *(ex-S14, repoussé)* | ⬜ planifié |
| *Sprint 42* | Raffinage E52 — Vague 2 Pilotage *(fichier créé à l'ouverture)* | 📋 planifié |
| *Sprint 43* | Raffinage E52 — Vague 3 Agilité/Collaboratif + synthèse *(fichier créé à l'ouverture)* | 📋 planifié |
| [Backlog post-S19](./backlog-post-s12.md) | Queue non planifiée — dont **idéation** : E40 profil adaptatif | — |
| [Zones d'ombre à raffiner](./zones-ombre.md) | Décisions produit/cadrage en attente | — |

> ⚠️ **Domaine Pilotage extrait de PIVOT (2026-07-20, [ADR-030](pathname:///pivot-docs/adr/ADR-030-bascule-spring-modulith)).**
> L'ancien programme « Complétion 100 % Pilotage & Risques (S21→S40) » planifiait un domaine
> **sortant** : le domaine **Pilotage** est désormais extrait vers un **produit distinct** (contrat
> `pivot-core/PILOTAGE-HANDOFF.md`). En conséquence, les blocs **Pilotage** de cette trajectoire —
> **E18** (S17, S20-S30), **E22** Roadmap (S33-S35), **E27** OKR (S36-S37), **E38** Innovation
> (S38-S40) et **E13** Cahiers de tests — sont **hors trajectoire PIVOT** (marqués `⏸️ Extrait` dans
> le Sommaire ci-dessus). Leur reprise relève du produit Pilotage extrait, plus de la roadmap PIVOT.
>
> **Reste dans la trajectoire PIVOT** : **E21 Risques** (S18, S31, S32 — schéma `risk`,
> `pivot-risk-core`, à ne pas confondre avec Pilotage), **E42 Forms** + **E41 onboarding** (S19),
> et le plan de contrôle **sécurité** (S18). Détail par bloc :
> [§Complétion Pilotage & Risques](#complétion-100--pilotage--risques-s21s40) et
> [§Trajectoire PIVOT resserrée](#trajectoire-pivot-resserrée-après-s16). Classification objective
> (extraits vs restent) : [`STATUS.md` §Domaine Pilotage — EXTRAIT de PIVOT](../STATUS.md).
>
> **Programme de raffinage ([E52](../EPIC-clarification-domaines/README.md), repoussé après S40)** :
> Vague 1 domaines Socle (**Sprint 41**, ex-S14) → Vague 2 Pilotage (Sprint 42) → Vague 3
> Agilité/Collaboratif + synthèse transverse (Sprint 43). Les fichiers `sprint-42.md`/`sprint-43.md`
> seront créés à l'ouverture de leur vague.
>
> **Piste whiteboard — parité complète PouetPouet (Sprints 38-43, nouveau 2026-07-13)** : décision
> mainteneur d'absorber **tout** le spec de référence `Détails tableau blanc backlog.md` dans le
> Socle E08 (lève le verrou `phase-3`, cf. [zone d'ombre #11](./zones-ombre.md) tranchée). Piste
> **prioritaire pour les prochains travaux de dev**, en tête de la file whiteboard (après la parité
> visible du Sprint 10) : **S11** fondation modèle `Card` (bloquant) → **S12** objets & connecteurs
> → **S13** cadres/organisation/champs → **S14** canvas UX & présence → **S15** facilitation
> (minuteur/vote) → **S16** cycle de vie & partage. La file Pilotage (S21→S40) est **décalée**
> derrière cette piste. Détail par item : `EPIC-collaboration/README.md` §Suivi noyau F08.x + la
> matrice de traçabilité `EPIC-collaboration/COUVERTURE-SPEC-REFERENCE.md`.

---

## Sprints 7–9, 17–20 — Plan phase-3 (conditionnel au jalon « Socle terminé »)

> ⚠️ **Superseded (2026-07-20) — Pilotage extrait de PIVOT ([ADR-030](pathname:///pivot-docs/adr/ADR-030-bascule-spring-modulith)).**
> Ce plan historique séquençait toute la « valeur pilotage » (S9 → S17 → S20…). Le domaine Pilotage
> étant désormais **extrait vers un produit distinct**, S17 et S20 (comme S21-S30, S33-S40) sont
> **hors trajectoire PIVOT** ; ne restent dans PIVOT que S18 (Risques + sécurité) et S19
> (Forms + onboarding). Le texte ci-dessous est conservé pour l'historique. Voir
> [§Trajectoire PIVOT resserrée](#trajectoire-pivot-resserrée-après-s16).

<!-- séparateur de blockquotes (MD028) -->

> ✅ **Verrou Socle levé (2026-07-10)** — déclaration « Socle terminé » actée (Sprint 6), gouvernance
> ADR terminée (Sprint 7, dont **ADR-025** bus d'événements/schéma inter-briques, Accepté — le
> goulot invisible de chemin critique dès S9+). Ces sprints sont désormais **débloqués** ; seule
> contrainte de séquencement restante : le principe « piloter petit avant de piloter gros »
> (valider les templates satellites issus de Sprint 5 sur l'agilité — **Sprint 8** — avant
> d'engager le domaine Pilotage en Sprint 9). **Sprint 8 clos le 2026-07-11** — les deux goulots
> sont maintenant levés, Sprint 9 démarre.
>
> **Re-tri du 2026-07-10 — valeur pilotage avant idéation :** le domaine Pilotage était bâti sur deux
> blocs d'idéation qui bloquaient son démarrage et n'apportaient pas de valeur directe :
> - **E40 profil adaptatif** (US40.1.1-6) était en tête de Sprint 9. Couplage roadmap→profil **mou**
>   (le profil ne pilote que le curseur d'altitude + l'activation des features) → **découplé** via
>   **EN18.10 profil par défaut** ; E40 reséquencé en **queue idéation** (se greffe plus tard).
> - **E18 EN18.3-8** (Cloud/SaaS RGPD, RGAA, perf, admin sans code, hébergement FR/UE, on-premise) =
>   habillage entreprise → **queue idéation**. Seul le **socle technique EN18.1/18.2/18.9 (+ EN18.10)**
>   reste en Sprint 9 (extraction de l'idéation + Gate 1 = 1re action du sprint).
>
> Résultat : toute la valeur pilotage (S9 roadmap → S17 Gantt/portefeuille → S18 risques → **S20
> satellites E24/E26/E27 + E23 v2**) passe **avant** les deux blocs d'idéation (E40, EN18.3-8),
> désormais relégués en [`backlog-post-s12.md`](./backlog-post-s12.md). Promotion hors idéation d'E40
> et EN18.3-8 = décision explicite du mainteneur (voir `STATUS.md` §Décisions ouvertes).
>
> **Superseded (2026-07-13)** : le mainteneur a demandé la **complétion à 100 % des domaines Pilotage
> & Risques**. **EN18.3-8 (habillage entreprise) sont réintégrés** au plan (Sprint 30) — voir
> [§Complétion Pilotage & Risques](#complétion-100--pilotage--risques-s21s40) ci-dessous. Seul **E40
> profil adaptatif** reste en queue idéation.
>
> **Hypothèse de capacité :** ~11-19 items/sprint (vélocité observée S1-S3, agents parallèles).

---

## Complétion 100 % Pilotage & Risques (S21→S40)

> ⚠️ **Trajectoire en grande partie hors PIVOT depuis le 2026-07-20.** Ce programme avait été établi
> le **2026-07-13** pour planifier *« 100 % des domaines Pilotage et Risques »*. Depuis
> [ADR-030](pathname:///pivot-docs/adr/ADR-030-bascule-spring-modulith), le domaine **Pilotage est extrait vers un
> produit distinct** (contrat `pivot-core/PILOTAGE-HANDOFF.md`). Les blocs Pilotage ci-dessous
> planifiaient donc un domaine **sortant** : ils sont **conservés pour traçabilité** mais marqués
> **Extrait — hors trajectoire PIVOT**. Seul le bloc **E21 Risques** (schéma `risk`) reste dans PIVOT.

| Sprints | Bloc | EPICs / périmètre | Items | Statut trajectoire |
|---------|------|-------------------|-------|--------------------|
| **S21–S30** | **E18 Pilotage — la base** | référentiels & socle activité → création → informations générales → PMT → budget → jalons → gestion budget/jalons → portefeuilles → reporting/intégrations/qualité → habillage entreprise | 146 | ⏸️ **Extrait** — produit Pilotage distinct |
| **S31–S32** | **E21 Risques** (module PIVOT) | boucle vivante · portefeuille · quantitatif/conformité · IA gouvernée · restitutions · cockpit · méthode DIT · EN21.4 | 32 | ✅ **Reste dans PIVOT** (schéma `risk`) |
| **S33–S35** | **E22 Roadmap** | socle Gantt & PPM · interopérabilité MS Project · vues · ressources · interfaces SI · EN22.3/4 | 32 | ⏸️ **Extrait** — produit Pilotage distinct |
| **S36–S37** | **E27 OKR** | cadence · alignement · check-ins · scoring · CFR · intégrations · dashboards · gouvernance · EN27.2 | 19 | ⏸️ **Extrait** — produit Pilotage distinct |
| **S37** | **Satellites Pilotage** | E23 (what-if/business cases) · E24 ADR · E26 budget · E13 cahiers de tests | 12 | ⏸️ **Extrait** — produit Pilotage distinct |
| **S38–S40** | **E38 Innovation** | modèle SMI · stratégie · idéation · stage-gate · évaluation · portefeuille · expérimentation · open innovation · IA · communautés · événements · ISO 56000 | 41 | ⏸️ **Extrait** — produit Pilotage distinct |
| **puis S41–S43** | **Raffinage E52** (repoussé) | Vague 1 Socle (ex-S14) → Vague 2 Pilotage → Vague 3 Agilité/synthèse | — | 🔄 Socle/Agilité restent ; volet Pilotage à rejuger |

**Note de couverture** : la garantie initiale « aucune US/Enabler Pilotage laissée hors sprint »
**ne s'applique plus à la trajectoire PIVOT** — les items Pilotage sont désormais du ressort du
produit extrait (voir `PILOTAGE-HANDOFF.md`). Pour ce qui **reste dans PIVOT** (E21 Risques,
S31-S32 ; + le volet Risques de S18), les items étaient au stade backlog `⬜` ; leur **Gate 1
READINESS (DoR)** est réalisé au démarrage de chaque sprint (même protocole que S8-S20). Les
dépendances externes (bus PIVOT ADR-025, socles S9-S20) conditionnent l'ordre d'attaque, rappelé
dans chaque fichier de sprint.

## Trajectoire PIVOT resserrée (après S16)

> Suite à l'extraction du domaine Pilotage ([ADR-030](pathname:///pivot-docs/adr/ADR-030-bascule-spring-modulith),
> décision mainteneur 2026-07-20), la trajectoire PIVOT est **resserrée** sur ses modules propres.
> Après la piste whiteboard (jusqu'à **S16**), ce qui reste **effectivement dans PIVOT** :

| Domaine | EPIC | Sprints | Cible |
|---------|------|---------|-------|
| **Risques** | E21 | S18 (+ plan de contrôle sécurité), S31, S32 | `pivot-risk-core` / schéma `risk` |
| **Forms** | E42 | S19 (cœur) | module PIVOT |
| **Onboarding** | E41 | S19 (framework) | module PIVOT |
| **Sécurité & Zero Trust** | E43 | S18 (plan de contrôle) + backlog | transverse PIVOT |
| **Clarification des domaines** | E52 | S41 (Vague 1 Socle) — volets Agilité/Collaboratif ; volet Pilotage à rejuger | transverse PIVOT (raffinage) |
| Whiteboard / Collaboration | E08 / E30 | S10→S16 | Socle / module PIVOT |

Le domaine **Pilotage n'apparaît plus** dans la trajectoire PIVOT : E18/E22/E23/E24/E26/E27/E38/E13
sont extraits (voir Sommaire et [`STATUS.md` §Domaine Pilotage — EXTRAIT de PIVOT](../STATUS.md)).

## Règles d'utilisation

1. **Démarrage item :** `git checkout main && git pull && git checkout -b feat/{us-id}-{slug}`
2. **US en cours :** commits atomiques sur `feat/{us-id}-{slug}` — backlog + code dans chaque commit
3. **Actions parallèles :** plusieurs US du sprint lancées simultanément — **une branche par US/Enabler**, agents séparés
4. **Mise à jour du sprint courant :** à chaque changement d'état d'une US, dans le fichier `sprint-{N}.md` du sprint courant (commit sur la branche de l'US)
5. **Fin d'US :** PR `feat/{us-id}-{slug} → main`, autoloop review + CI, Gate 4 = 100/100
6. **US bloquée :** retour Backlog + note dans le fichier du sprint courant + commit sur la branche de l'US courante

## Pourquoi un fichier par sprint

Avant juillet 2026, tout vivait dans un unique `SPRINTS.md`. Avec plusieurs Dev Agents en parallèle
sur des US différentes, chacun met à jour ce même fichier à chaque changement d'état — collision
quasi systématique. Un fichier par sprint confine la contention au **sprint courant** : les sprints
clos ou pas encore démarrés ne bougent plus et ne sont jamais touchés par un agent en cours de
travail sur un autre sprint.

---

*Dernière mise à jour : 2026-07-06 — split de l'ancien `SPRINTS.md` en un fichier par sprint (`docs/backlog/sprints/`) pour réduire la contention entre agents parallèles.*

*Sortie du domaine Pilotage de la trajectoire PIVOT — 2026-07-20 (décision mainteneur, [ADR-030](pathname:///pivot-docs/adr/ADR-030-bascule-spring-modulith)) : le domaine Pilotage est extrait vers un produit distinct (`pivot-core/PILOTAGE-HANDOFF.md`). Sprints marqués `⏸️ Extrait — produit Pilotage distinct (hors trajectoire PIVOT)` dans le Sommaire : S17, S20, S21-S30 (E18), S33-S35 (E22), S36-S37 (E27 + satellites E23/E24/E26/E13), S38-S40 (E38). Restent dans PIVOT : S18 (E21 Risques + sécurité), S19 (E42 Forms + E41 onboarding), S31-S32 (E21 Risques, schéma `risk`). Aucune ligne de sprint supprimée ; fichiers `sprint-17.md`…`sprint-40.md` non modifiés (follow-up : bandeau par fichier). Nouvelle section [§Trajectoire PIVOT resserrée](#trajectoire-pivot-resserrée-après-s16).*
