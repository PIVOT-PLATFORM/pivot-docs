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
| [Sprint 10](./sprint-10.md) | Pilotage cœur PPM | 🔓 Débloqué (suite S9) — inchangé au re-tri |
| [Sprint 11](./sprint-11.md) | Risques + plan de contrôle sécurité | 🔓 Débloqué — inchangé au re-tri |
| [Sprint 12](./sprint-12.md) | Forms (cœur) + framework onboarding | 🔓 Débloqué — inchangé au re-tri |
| [Sprint 13](./sprint-13.md) | Satellites Pilotage à valeur (E24 ADR · E26 Budget · E27 OKR · E23 v2) *(nouveau 2026-07-10)* | 🔓 Débloqué (suite S9-S11) — remonté de post-S12, **avant** la queue idéation |
| [Sprint 14](./sprint-14.md) | E18 Pilotage — Référentiels & socle activité (14) | ⬜ planifié |
| [Sprint 15](./sprint-15.md) | E18 Pilotage — Création d'une activité (13) | ⬜ planifié |
| [Sprint 16](./sprint-16.md) | E18 Pilotage — Informations générales & portefeuille (13) | ⬜ planifié |
| [Sprint 17](./sprint-17.md) | E18 Pilotage — Activité : Élaboration PMT (19) | ⬜ planifié |
| [Sprint 18](./sprint-18.md) | E18 Pilotage — Activité : écran Budget (19) | ⬜ planifié |
| [Sprint 19](./sprint-19.md) | E18 Pilotage — Activité : écran Jalons (17) | ⬜ planifié |
| [Sprint 20](./sprint-20.md) | E18 Pilotage — Gestion budgétaire & jalons (16) | ⬜ planifié |
| [Sprint 21](./sprint-21.md) | E18 Pilotage — Portefeuilles d'activités (14) | ⬜ planifié |
| [Sprint 22](./sprint-22.md) | E18 Pilotage — Reporting, intégrations & qualité (15) | ⬜ planifié |
| [Sprint 23](./sprint-23.md) | E18 Pilotage — Habillage entreprise (6) | ⬜ planifié |
| [Sprint 24](./sprint-24.md) | E21 Risques — Boucle vivante, portefeuille & quantitatif (19) | ⬜ planifié |
| [Sprint 25](./sprint-25.md) | E21 Risques — IA, restitutions, cockpit & méthode DIT (13) | ⬜ planifié |
| [Sprint 26](./sprint-26.md) | E22 Roadmap — Socle Gantt & PPM (11) | ⬜ planifié |
| [Sprint 27](./sprint-27.md) | E22 Roadmap — Interopérabilité MS Project & vues (11) | ⬜ planifié |
| [Sprint 28](./sprint-28.md) | E22 Roadmap — Ressources & interfaces SI (10) | ⬜ planifié |
| [Sprint 29](./sprint-29.md) | E27 OKR — Cadence, alignement, check-ins & scoring (15) | ⬜ planifié |
| [Sprint 30](./sprint-30.md) | E27 OKR (dashboards) + Satellites Pilotage (16) | ⬜ planifié |
| [Sprint 31](./sprint-31.md) | E38 Innovation — Stratégie, idéation & stage-gate (14) | ⬜ planifié |
| [Sprint 32](./sprint-32.md) | E38 Innovation — Portefeuille & écosystème (13) | ⬜ planifié |
| [Sprint 33](./sprint-33.md) | E38 Innovation — IA, communautés & événements (14) | ⬜ planifié |
| [Sprint 34](./sprint-34.md) | Raffinage E52 — Vague 1 Socle *(ex-S14, repoussé)* | ⬜ planifié |
| *Sprint 35* | Raffinage E52 — Vague 2 Pilotage *(fichier créé à l'ouverture)* | 📋 planifié |
| *Sprint 36* | Raffinage E52 — Vague 3 Agilité/Collaboratif + synthèse *(fichier créé à l'ouverture)* | 📋 planifié |
| [Sprint 37](./sprint-37.md) | Parité whiteboard visible (remédiation Socle) — favoris, corbeille, recherche, paramètres tableau *(nouveau 2026-07-13)* | ⬜ planifié — Gate 1 à passer au démarrage |
| [Sprint 38](./sprint-38.md) | Parité whiteboard — Fondation modèle `Card` (EN08.4) *(nouveau 2026-07-13)* | ⬜ planifié — bloquant S39-43 |
| [Sprint 39](./sprint-39.md) | Parité whiteboard — Objets typés & connecteurs (F08.6/F08.7) | ⬜ planifié |
| [Sprint 40](./sprint-40.md) | Parité whiteboard — Cadres, organisation, champs (F08.8/F08.9/F08.10) | ⬜ planifié |
| [Sprint 41](./sprint-41.md) | Parité whiteboard — Canvas UX & présence (F08.11/F08.5) | ⬜ planifié |
| [Sprint 42](./sprint-42.md) | Parité whiteboard — Facilitation : minuteur, vote (F08.12) | ⬜ planifié |
| [Sprint 43](./sprint-43.md) | Parité whiteboard — Cycle de vie & partage (F08.13/US08.2.5) | ⬜ planifié |
| [Backlog post-S12](./backlog-post-s12.md) | Queue non planifiée — dont **idéation** : E40 profil adaptatif | — |
| [Zones d'ombre à raffiner](./zones-ombre.md) | Décisions produit/cadrage en attente | — |

> **Complétion 100 % Pilotage & Risques (S14→S33)** — plan établi le 2026-07-13 : les sprints
> **S14 à S33** planifient l'intégralité des **282 items restants** des domaines **Pilotage (E18)**
> et **Risques (E21)**, ordre de priorité **E18 base → E21 Risques → E22 Roadmap → E27 OKR → E38
> Innovation (*en surplus*)**, satellites (E23/E24/E26/E13) intercalés. Détail par bloc :
> [§Complétion Pilotage & Risques](#complétion-100--pilotage--risques-s14s33).
>
> **Programme de raffinage ([E52](../EPIC-clarification-domaines/README.md), repoussé après S33)** :
> Vague 1 domaines Socle (**Sprint 34**, ex-S14) → Vague 2 Pilotage (Sprint 35) → Vague 3
> Agilité/Collaboratif + synthèse transverse (Sprint 36). Les fichiers `sprint-35.md`/`sprint-36.md`
> seront créés à l'ouverture de leur vague.
>
> **Piste whiteboard — parité complète PouetPouet (Sprints 38-43, nouveau 2026-07-13)** : décision
> mainteneur d'absorber **tout** le spec de référence `Détails tableau blanc backlog.md` dans le
> Socle E08 (lève le verrou `phase-3`, cf. [zone d'ombre #11](./zones-ombre.md) tranchée). Piste
> **prioritaire pour les prochains travaux de dev**, en tête de la file whiteboard (après la parité
> visible du Sprint 37) : **S38** fondation modèle `Card` (bloquant) → **S39** objets & connecteurs
> → **S40** cadres/organisation/champs → **S41** canvas UX & présence → **S42** facilitation
> (minuteur/vote) → **S43** cycle de vie & partage. La file Pilotage (S14→S33) est **décalée**
> derrière cette piste. Détail par item : `EPIC-collaboration/README.md` §Suivi noyau F08.x + la
> matrice de traçabilité `EPIC-collaboration/COUVERTURE-SPEC-REFERENCE.md`.

---

## Sprints 7–13 — Plan phase-3 (conditionnel au jalon « Socle terminé »)

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
> Résultat : toute la valeur pilotage (S9 roadmap → S10 Gantt/portefeuille → S11 risques → **S13
> satellites E24/E26/E27 + E23 v2**) passe **avant** les deux blocs d'idéation (E40, EN18.3-8),
> désormais relégués en [`backlog-post-s12.md`](./backlog-post-s12.md). Promotion hors idéation d'E40
> et EN18.3-8 = décision explicite du mainteneur (voir `STATUS.md` §Décisions ouvertes).
>
> **Superseded (2026-07-13)** : le mainteneur a demandé la **complétion à 100 % des domaines Pilotage
> & Risques**. **EN18.3-8 (habillage entreprise) sont réintégrés** au plan (Sprint 23) — voir
> [§Complétion Pilotage & Risques](#complétion-100--pilotage--risques-s14s33) ci-dessous. Seul **E40
> profil adaptatif** reste en queue idéation.
>
> **Hypothèse de capacité :** ~11-19 items/sprint (vélocité observée S1-S3, agents parallèles).

---

## Complétion 100 % Pilotage & Risques (S14→S33)

> Plan établi le **2026-07-13** à la demande du mainteneur : *« modifie les sprints de 14 à N pour
> inclure 100 % des domaines Pilotage et Risques »*. Périmètre = domaine **Pilotage (E18)** dans son
> intégralité + module **Risques (E21)**. Ordre de priorité imposé : **E18 la base → E22 Roadmap →
> E27 OKR → E38 Innovation *en surplus*** ; E21 Risques placé juste après la base E18 (2ᵉ domaine
> nommé) ; satellites (E23/E24/E26/E13) intercalés. **282 items** restants, ~11-19 par sprint.

| Sprints | Bloc | EPICs / périmètre | Items |
|---------|------|-------------------|-------|
| **S14–S23** | **E18 Pilotage — la base** | référentiels & socle activité → création → informations générales → PMT → budget → jalons → gestion budget/jalons → portefeuilles → reporting/intégrations/qualité → habillage entreprise | 146 |
| **S24–S25** | **E21 Risques** (2ᵉ domaine nommé) | boucle vivante · portefeuille · quantitatif/conformité · IA gouvernée · restitutions · cockpit · méthode DIT · EN21.4 | 32 |
| **S26–S28** | **E22 Roadmap** (priorité 2) | socle Gantt & PPM · interopérabilité MS Project · vues · ressources · interfaces SI · EN22.3/4 | 32 |
| **S29–S30** | **E27 OKR** (priorité 3) | cadence · alignement · check-ins · scoring · CFR · intégrations · dashboards · gouvernance · EN27.2 | 19 |
| **S30** | **Satellites Pilotage** | E23 (what-if/business cases) · E24 ADR · E26 budget · E13 cahiers de tests | 12 |
| **S31–S33** | **E38 Innovation** — *en surplus* | modèle SMI · stratégie · idéation · stage-gate · évaluation · portefeuille · expérimentation · open innovation · IA · communautés · événements · ISO 56000 | 41 |
| **puis S34–S36** | **Raffinage E52** (repoussé) | Vague 1 Socle (ex-S14) → Vague 2 Pilotage → Vague 3 Agilité/synthèse | — |

**Garantie de couverture** : à l'issue de S33, **aucune US/Enabler des domaines Pilotage (E18) et
Risques (E21) n'est laissée hors sprint**. Les items étaient au stade backlog `⬜` ; leur **Gate 1
READINESS (DoR)** est réalisé au démarrage de chaque sprint (même protocole que S8-S13). Les
dépendances externes (bus PIVOT ADR-025, `pivot-core-starter` publié, socles S9-S13) conditionnent
l'ordre d'attaque, rappelé dans chaque fichier de sprint.

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
