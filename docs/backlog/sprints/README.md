# Sprints — PIVOT Platform

Source de vérité pour l'organisation des sprints et l'assignation des US aux branches. Un fichier
par sprint — voir [pourquoi](#pourquoi-un-fichier-par-sprint) en bas de page.

**Règle branche :** `feat/{us-id}-{slug}` par US/Enabler — une branche par item, agents en parallèle sur branches séparées.

---

## Sommaire

| Sprint | Titre | Statut |
|--------|-------|--------|
| [Sprint 1](./sprint-1.md) | Auth & Shell Socle | ✅ Terminé (14/14) — contact (US16.3.1) livré aussi (core #112, ui #48/#87), recette restante |
| [Sprint 2](./sprint-2.md) | Système de modules + Auth manquant | ✅ Terminé |
| [Sprint 3](./sprint-3.md) | Espace compte + Administration | 🔎 15/15 mergées — en attente de recette |
| [Sprint 4](./sprint-4.md) | Infrastructure prod + Auth avancé + Notifications | ✅ 16/16 mergées |
| [Sprint 5](./sprint-5.md) | Infra multi-repo (E17) + Module Whiteboard (Socle) | 🔎 Dev terminé — Vague 0 (E17) 10/10 mergés (EN17.1 clos 2026-07-08, `pivot-core#171` fermée) · Vague 1+ (whiteboard) 17/17 mergés · en attente de recette mainteneur |
| [Sprint 6](./sprint-6.md) | Durcissement & recette Socle 🏁 | ✅ Socle terminé (déclaré 2026-07-09 — Axe 2 écarté, Axe 3 différé en fin de tous les sprints) |
| [Sprint 7](./sprint-7.md) | Gouvernance ADR (phase-3) + Migration BFF Auth (EN01.14-18) | 🔄 Gouvernance ADR ✅ Terminé (2026-07-09) — ADR-008→016 et ADR-023→026 tous Accepté · Migration BFF (EN01.14-18) ⬜ pas démarrée |
| [Sprint 8](./sprint-8.md) | Pilote multi-repo (agilité) + enforcement taxonomie | ✅ Terminé (2026-07-11) — templates satellites validés (EN17.11), TAXO-2 fait, écart ADR-026 §2 comblé (US09.2.3) ; ⚠️ tableau détaillé du fichier jamais resynchronisé après la déclaration, voir sprint-8.md |
| [Sprint 10](./sprint-10.md) | Parité whiteboard visible (remédiation Socle) — favoris, corbeille, recherche, paramètres tableau *(nouveau 2026-07-13)* | ✅ Terminé (2026-07-16) — 4/4 US mergées (collaboratif-core #66) + recette mainteneur validée, 3 correctifs recette mergés (collaboratif-ui #124, pivot-ui #204) |
| [Sprint 11](./sprint-11.md) | Parité whiteboard — Fondation modèle `Card` (EN08.4) *(nouveau 2026-07-13)* | 🔎 Code livré et fusionné (`collaboratif-core#68`) — **recette mainteneur restante**, `Stage` reste ⬜ (réconcilié 2026-07-20, voir sprint-11.md) |
| [Sprint 12](./sprint-12.md) | Parité whiteboard — Objets typés & connecteurs (F08.6/F08.7) | 🔎 9/9 items code-complets (constaté dans `pivot-core`/`pivot-ui` le 2026-07-20) — recette mainteneur restante, voir sprint-12.md |
| [Sprint 13](./sprint-13.md) | Parité whiteboard — Cadres, organisation, champs (F08.8/F08.9/F08.10) | 🟡 en cours (2026-07-16) — cadres (US08.8.1/.2) + organisation backend (US08.9.1/.2) livrés dans `collaboratif` main **hors convention** (recette en attente) ; z-order (US08.9.3) + champs (US08.10.1/.2) restants — voir sprint-13.md |
| [Sprint 14](./sprint-14.md) | Parité whiteboard — Canvas UX & présence (F08.11/F08.5) | 🔎 10/10 items code-complets — les trois manques du 2026-07-20 ont été livrés depuis (US08.11.1 `ui#241`, US08.11.4 `ui#247`, US08.11.2 `ui#253`) ; US08.11.8 (verrouillage d'axe) ajoutée en cours de sprint le 2026-07-21 (`ui#256`) — **recette mainteneur restante**, réconcilié 2026-07-21, voir sprint-14.md |
| [Sprint 15](./sprint-15.md) | Parité whiteboard — Facilitation : minuteur, vote (F08.12) | ✅ Terminé (2026-07-16) — US08.12.1/2 câblées UI + recette live (collaboratif-ui #126, enabler /me collaboratif-core #89) |
| [Sprint 16](./sprint-16.md) | Parité whiteboard — Cycle de vie & partage (F08.13/US08.2.5) | 🟡 5/6 items code-complets — ✅ **US08.2.5 (inviter par email) ré-implémentée dans le modulith** (core #236 + ui #237, la régression de bascule est résorbée) ; reste US08.13.2 (brouillon de template) — **backend livré** (core #251), front à faire — réconcilié 2026-07-21, voir sprint-16.md |
| [Sprint 17](./sprint-17.md) | Agilité — Scrum Poker (finition) + Référentiel Équipes | 🔎 6/6 US poker code-complètes (2026-07-21, core#253+ui#259) — recette ; EN09.2/EN15.7 bloqués sur EN28.14 non planifié, voir sprint-17.md |
| [Sprint 18](./sprint-18.md) | Agilité — Daily Standup + La Roue | 🔎 E10 Daily Standup 5/5 US code-complètes (core#255+ui#262) + E14 La Roue 3/3 US déjà code-complètes (aucun gap AC) — recette ; EN10.1/EN14.1 bloqués sur EN28.14 non planifié, voir sprint-18.md |
| [Sprint 19](./sprint-19.md) | Agilité — Rétrospective + PI Planning | 🔎 E50 PI Planning 3/3 US retenues code-complètes (core#259+ui#264) — recette ; E20 Rétrospective déjà code-complète (reconciliation pivot-docs#298 en attente de fusion) ; EN20.3/US50.2.1/EN50.1 bloqués, voir sprint-19.md |
| [Sprint 20](./sprint-20.md) | Agilité — Capacity Planning (v1) | 🔎 7/7 US code-complètes (core#261+ui#266) — recette ; voir sprint-20.md |
| [Sprint 21](./sprint-21.md) | Agilité — Capacity Planning (v2) | ⬜ planifié |
| [Sprint 22](./sprint-22.md) | Collaboration — Module Session (QUIZ/POLL/WORDCLOUD/BRAINSTORM/QA/VOTE) | ⬜ planifié |
| [Sprint 23](./sprint-23.md) | Collaboration — MeetOps + Mini-jeux | ⬜ planifié |
| [Sprint 24](./sprint-24.md) | Collaboration — E30 Canevas & objets (étendus) | ⬜ planifié |
| [Sprint 25](./sprint-25.md) | Collaboration — E30 Temps réel + Modèles | ⬜ planifié |
| [Sprint 26](./sprint-26.md) | Collaboration — E30 Facilitation & ateliers + Engagement | ⬜ planifié |
| [Sprint 27](./sprint-27.md) | Collaboration — E30 Diagrammes + Partage/admin + Plateformes | ⬜ planifié |
| [Sprint 28](./sprint-28.md) | Collaboration — E30 Sécurité & gouvernance | ⬜ planifié |
| [Sprint 29](./sprint-29.md) | Collaboration — E30 IA + Continuum & intégrations | ⬜ planifié |
| [Sprint 30](./sprint-30.md) | Collaboration — E30 Innovation + Chantiers SI | ⬜ planifié |
| [Sprint 31](./sprint-31.md) | Collaboration — E30 Extensibilité + Enablers transverses | ⬜ planifié |
| [Sprint 32](./sprint-32.md) | Raffinage E52 — Clarté domaines Agilité & Collaboration (4 axes) | 📋 planifié — clôture |
| [Backlog post-S16](./backlog-post-s12.md) | Queue non planifiée — dont **idéation** : E40 profil adaptatif | — |
| [Zones d'ombre à raffiner](./zones-ombre.md) | Décisions produit/cadrage en attente | — |

> **Sprint 9 — supprimé.** L'ancien « Socle technique Pilotage + Roadmap v0 » relevait du domaine
> Pilotage, désormais extrait de PIVOT ([ADR-030](pathname:///pivot-docs/adr/ADR-030-bascule-spring-modulith)). Le numéro S9 est
> laissé **vacant** pour ne pas re-séquencer les sprints whiteboard actifs S10→S16.

<!-- séparateur de blocs de citation (MD028) -->

> ⚠️ **Recentrage de la trajectoire post-S16 (2026-07-21, décision mainteneur).** Le domaine
> **Pilotage** ayant été extrait vers un produit distinct (ADR-030, contrat
> `pivot-core/PILOTAGE-HANDOFF.md`), **tous les sprints Pilotage sont retirés** et le plan post-S16
> est recentré **exclusivement sur la complétion à 100 % des domaines Agilité et Collaboration**
> (nouveau programme **S17→S31** ci-dessous). Les domaines qui ne sont ni Agilité ni Collaboration —
> **Risques** (E21), **Forms** (E42), **Onboarding** (E41), **Sécurité** (E43) — **sortent du plan de
> sprints** (EPICs conservés dans le backlog, à rejuger séparément). Classification et journal :
> [`STATUS.md`](../STATUS.md).

---

## Complétion 100 % Agilité & Collaboration (S17→S31)

> **Établi le 2026-07-21** (PO Agent + Scrum Master + Architecte Modules, à la demande du mainteneur :
> *« retirer tout le Pilotage, compléter à 100 % l'Agilité et la Collaboration »*). Remplace l'ancien
> programme « Complétion 100 % Pilotage & Risques (S21→S40) », caduc depuis l'extraction du Pilotage.
>
> **Cible** : modulith `pivot-core` (modules `fr.pivot.agilite.*` / `fr.pivot.collaboratif.*`) +
> `pivot-ui` (ADR-030). Les README d'EPIC référencent encore les anciens repos `pivot-agilite-core`/
> `pivot-collaboratif-core` (archivés) — le rebranding de ces README est un follow-up séparé.
>
> **Ordre** : Agilité d'abord (plus petit, E09 déjà partiellement codé), puis Collaboration.
> **Hypothèse de capacité** : ~11-14 items/sprint (agents parallèles). Chaque item reste `⬜` ;
> **Gate 1 READINESS (DoR)** réalisé au démarrage de chaque sprint.

**Bloc Agilité — 49 items** (E15 Équipes n'apporte qu'`EN15.7` : le reste du référentiel Équipes
EN15.1-6 est spec-only, à écrire en fichiers backlog au Gate 1 de S17)

| Sprint | EPICs / périmètre | Items |
|--------|-------------------|-------|
| **S17** | E09 Scrum Poker (finition/recette) + E15 Équipes (`EN15.7`) | 8 |
| **S18** | E10 Daily Standup + E14 La Roue | 10 |
| **S19** | E20 Rétrospective + E50 PI Planning | 13 |
| **S20** | E11 Capacity Planning — v1 | 7 |
| **S21** | E11 Capacity Planning — v2 | 11 |

**Bloc Collaboration — 125 items net-new (le noyau whiteboard Socle F08.x est déjà séquencé S10→S16)**

| Sprint | EPICs / périmètre | Items |
|--------|-------------------|-------|
| **S22** | E19 Module Session (QUIZ/POLL/WORDCLOUD/BRAINSTORM/QA/VOTE) | 13 |
| **S23** | E12 MeetOps + E47 Mini-jeux | 9 |
| **S24** | E30 F30.1 Canevas & objets (étendus) | 13 |
| **S25** | E30 F30.2 Temps réel + F30.4 Modèles | 11 |
| **S26** | E30 F30.3 Facilitation & ateliers + F30.11 Engagement | 14 |
| **S27** | E30 F30.5 Diagrammes + F30.8 Partage/admin + F30.10 Plateformes | 12 |
| **S28** | E30 F30.9 Sécurité & gouvernance | 12 |
| **S29** | E30 F30.6 IA + F30.7 Continuum & intégrations | 11 |
| **S30** | E30 F30.14 Innovation + F30.15 Chantiers SI | 13 |
| **S31** | E30 F30.12 Extensibilité + 14 enablers EN30.x transverses | 17 |
| **S32** | Raffinage E52 — clarté domaines Agilité & Collaboration (documentaire, fiches à formaliser au Gate 1) | 8 |

**Note de couverture** : cette séquence S17→S31 garantit **aucune US/Enabler des domaines Agilité et
Collaboration laissée hors sprint**. Deux exclusions explicites : (1) le **noyau whiteboard Socle
F08.x/EN08.x** est couvert séparément par la piste parité S10→S16 ; (2) **F30.13 « Licences & modèle
éco. »** est hors scope — PIVOT n'a pas de modèle payant. Les items restent au stade backlog `⬜` ;
leur Gate 1 READINESS (DoR — AC Given/When/Then + cas d'erreur + sécurité) est réalisé au démarrage
de chaque sprint.

## Trajectoire PIVOT resserrée (après S16)

> Suite à l'extraction du domaine Pilotage ([ADR-030](pathname:///pivot-docs/adr/ADR-030-bascule-spring-modulith)) et au
> recentrage du 2026-07-21, la trajectoire PIVOT post-S16 est **exclusivement** dédiée à la complétion
> des domaines Agilité et Collaboration :

| Domaine | EPICs | Sprints | Cible |
|---------|-------|---------|-------|
| **Agilité** | E09, E10, E11, E14, E20, E50 (+ E15 référentiel) | S17→S21 | modulith `pivot-core` (`fr.pivot.agilite.*`) + `pivot-ui` |
| **Collaboration** | E30 (reste F30.x), E19, E12, E47 | S22→S31 | modulith `pivot-core` (`fr.pivot.collaboratif.*`) + `pivot-ui` |
| **Whiteboard (noyau Socle)** | E08 / E30 F08.x | S10→S16 (parité en cours) | Socle / module PIVOT |
| **Clarification des domaines** | E52 | S32 (clôture, Agilité & Collaboration) | transverse PIVOT (raffinage) |

**Hors plan de sprints** (EPICs conservés au backlog, à rejuger séparément) : **E21 Risques**,
**E42 Forms**, **E41 Onboarding**, **E43 Sécurité & Zero Trust**. Le domaine **Pilotage**
(E18/E22/E23/E24/E26/E27/E38/E13) est **extrait** vers un produit distinct — voir
[`STATUS.md`](../STATUS.md) et `pivot-core/PILOTAGE-HANDOFF.md`.

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

*Dernière mise à jour : 2026-07-21.*

*Recentrage « Complétion 100 % Agilité & Collaboration » — 2026-07-21 (PO Agent + Scrum Master +
Architecte Modules, décision mainteneur). Retrait de tous les sprints Pilotage (ex-S17, S20-S30,
S33-S40 — E18/E22/E27/E38) et des sprints hors périmètre Agilité/Collaboration (ex-S18 Risques+sécurité,
ex-S19 Forms+onboarding, ex-S31/S32 Risques) ; suppression de l'ex-S9 (socle technique Pilotage).
Nouveau programme contigu S17→S31 couvrant 100 % de l'Agilité (49 items : E09/E10/E11/E14/E20/E50 +
E15 référentiel) et de la Collaboration (125 net-new : E30 reste F30.x + E19 + E12 + E47), clôturé
par un raffinage E52 Agilité/Collaboration en S32. Exclusions : noyau whiteboard Socle F08.x (déjà
séquencé S10→S16) et F30.13 Licences (pas de modèle payant). EPICs Risques/Forms/Onboarding/Sécurité
retirés du plan mais conservés au backlog. Traçabilité Pilotage : `pivot-core/PILOTAGE-HANDOFF.md` +
[ADR-030](pathname:///pivot-docs/adr/ADR-030-bascule-spring-modulith).*
