# Backlog post-S19 (non planifié)

> **Re-tri 2026-07-10 :** les satellites Pilotage à valeur (E24 ADR · E26 Budget · E27 OKR socle ·
> E23 vague 2) ont été **remontés en [Sprint 20](./sprint-20.md)** — voir aussi la §Queue idéation
> en bas de page (E40 profil adaptatif + E18 EN18.3-8, promotion = décision mainteneur).

- US01.4.3b Alerte IP suspecte (v1-enterprise — nécessite ADR GeoIP) + 4 autres items v1-enterprise
- E10 Daily Standup · E11 Capacity Planning (+ velocity tracking US11.4.1-2) · E12 MeetOps · E13 Cahiers de tests · E15 Équipes (phase-3, `pivot-agilite-*`/`pivot-collaboratif-*`/`pivot-pilotage-*`)
- E19 Module Session (phase-3 — pivot-collaboratif-core/ui) : ⚠️ dépendance de E41 F41.4 (sessions live) et E38 F38.15
- E21 vagues 2+ : US21.2.5/21.2.6 (AMDEC, exposition & vélocité), F21.4 boucle vivante (dépend ADR-019 bus), F21.5 portefeuille, F21.6 quantitatif/conformité, F21.7 IA gouvernée, F21.8/21.9 restitutions & cockpit
- E22 vagues 2+ : US22.6.3/22.6.4 (mise en forme, exports), F22.5 ressources dans le plan, F22.7 interop MS Project, F22.8 interfaces inter-modules & SI, EN22.3 connecteurs calendrier
- E23 vague 2 : ~~US23.2.3 revues/comités, US23.2.5 programmes, US23.2.6 plans stratégiques~~ **→ [Sprint 20](./sprint-20.md)** · restent ici : US23.2.7/23.2.8 what-if & business cases (ex-E31), US23.2.9/23.2.10 livrables & valeur publique (idéation)
- ~~E24 ADR projet · E26 Budget · E27 OKR~~ **→ [Sprint 20](./sprint-20.md)** (satellites Pilotage à valeur, remontés au re-tri 2026-07-10) · E27 F27.4-10 (check-ins, scoring, gouvernance) + E26 F26.2 vague 2 restent post-S20 · **E25 Commande publique** reste en idéation (`BACKLOG-IDEATION`)
- E28 Intégration open source (dépend ADR-009 accepté S7 + gouvernance forks ADR-018)
- E29 Workflows & Automatisation (78 US — passe DoR à faire au sprint précédant son implémentation)
- E30 Collaboration (86 US benchmark hors noyau F08.x/EN08.x déjà en Socle, ex-E08 — arbitrage résolu, voir [§Zones d'ombre n°2](./zones-ombre.md) ; passe DoR à faire)
- E32–E37, E39 satellites Pilotage (ressources, tâches, IA, gouvernance, intégration SI, licences, chantiers)
- E38 Management de l'innovation (45 US — dépend E42 Forms pour le dépôt d'idée)
- E41 suites : US41.1.2-4 (tooltips, checklist, quoi de neuf), F41.2 centre d'aide, F41.3 supports, F41.4 présentiel (dépend E19), F41.5 catalogue par module (au fil des livraisons), F41.6 mesure d'adoption
- E42 vague 2 : US42.2.5 multilingue, US42.3.3 enquêtes in-app, US42.4.3 réponses partielles, US42.5.2/42.5.3 API & MCP, F42.6 IA, F42.7 gouvernance, F42.8 souveraineté + EN42.2, F42.9-11
- E43 vagues 2+ : EN43.1-4 topologie (BFF/Gateway/Mesh/Egress), EN43.8-13 observabilité & gouvernance
- **E51 Cockpits DSI** *(déprogrammé du Sprint 14 le 2026-07-12 — remplacé par le raffinage E52)* :
  ossature EN51.1-5 (composant card, moteur de composition, shell, filtre d'accès interne/externe) +
  cards Socle v0 F51.1 + cards gouvernance F51.2 (enablers données EN51.6-10 : télémétrie, audit,
  code-scanning, portefeuille, ITSM) + cards modules WIP F51.3 + ADR-028 (accès & identités externes).
  EPIC intacte — à replanifier après la vague de clarification des domaines (E52). La fiche
  d'observabilité E52 (US52.1.7) prépare naturellement la card Santé/Audit de ce futur sprint.

---

## Queue idéation — Pilotage (promotion = décision explicite du mainteneur)

> Reséquencés **après toute la valeur pilotage** au re-tri du 2026-07-10 (`STATUS.md` §Décisions
> ouvertes). Ne démarrent qu'après une décision explicite du mainteneur de les sortir de
> `BACKLOG-IDEATION` — voir aussi [Sprint 9 §Re-tri](./sprint-9.md#re-tri-2026-07-10--valeur-pilotage-avant-idéation).

- **E40 — Profil adaptatif** (US40.1.1 profil d'organisation, US40.1.2 activation modules par profil,
  US40.1.3 classe de souveraineté, US40.1.4 modularité & montée en gamme, US40.1.5 articulation
  capillarité, US40.1.6 pack double contrainte). Se greffe sur **EN18.10 profil par défaut** (Sprint 9)
  qui a servi de couture de découplage. `BACKLOG-IDEATION/EPIC-profil-adaptation`.
- **E18 EN18.3-8 — Habillage entreprise** : EN18.3 Cloud/SaaS RGPD · EN18.4 Localisation FR/RGAA ·
  EN18.5 Perf de consolidation · EN18.6 Administration sans code · EN18.7 Hébergement France/UE ·
  EN18.8 Option on-premise. `BACKLOG-IDEATION/EPIC-pilotage` (le socle EN18.1/18.2/18.9 en est extrait
  au démarrage de Sprint 9).
