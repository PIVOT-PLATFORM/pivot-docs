# Sprint 35 — E22 Roadmap — Ressources & interfaces SI

> ⏸️ **Extrait — produit Pilotage distinct (2026-07-20, [ADR-030](pathname:///pivot-docs/adr/ADR-030-bascule-spring-modulith)).** Ce sprint planifiait un domaine **Pilotage** aujourd'hui **hors trajectoire PIVOT** — sa reprise relève du produit Pilotage extrait (contrat `pivot-core/PILOTAGE-HANDOFF.md`), pas de la roadmap PIVOT. Contenu conservé ci-dessous pour traçabilité historique. Détail : [`sprints/README.md` §Trajectoire PIVOT resserrée](./README.md#trajectoire-pivot-resserrée-après-s16) et [`STATUS.md` §Domaine Pilotage extrait](../STATUS.md).
>
> **Créé le 2026-07-13** — plan de **complétion à 100 % des domaines Pilotage (E18) & Risques (E21)**,
> séquencé **S21→S40** (ordre de priorité : E18 base → E21 Risques → E22 Roadmap → E27 OKR → E38
> Innovation *en surplus*). Vue d'ensemble : [README §Complétion Pilotage & Risques](./README.md).
>
> **Phase** : phase-3 · E22. **Sortie** : la gestion des ressources dans le plan et les interfaces inter-modules & SI.
>
> **Dépendances** : Dépend du socle Gantt (S33) et du bus PIVOT.
>
> **Statut** : ⬜ planifié — non démarré. Items encore au stade backlog : **Gate 1 READINESS
> (PO Agent) à réaliser au démarrage du sprint** (DoR — AC Given/When/Then + cas d'erreur + sécurité),
> même précédent que les sprints précédents.

## Items (10)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US22.5.1 | Affecter des ressources aux tâches | L | High | ⬜ |
| US22.5.2 | Courbes de charge & sur-affectation | L | Medium | ⬜ |
| US22.5.3 | Nivellement des ressources | XL | Medium | ⬜ |
| US22.5.4 | Coûts du plan | L | Medium | ⬜ |
| US22.8.1 | Afficher les sprints sur la roadmap | L | High | ⬜ |
| US22.8.2 | Afficher les versions applicatives (releases) sur la timeline | L | High | ⬜ |
| US22.8.3 | Weekends & jours fériés par pays / localité | L | High | ⬜ |
| US22.8.4 | Interconnexion SI d'absences / RH (SAP, Workday…) | XL | High | ⬜ |
| US22.8.5 | Overlays inter-modules Pilotage (risques, budget, décisions, marchés) | L | Medium | ⬜ |
| US22.8.6 | Plage d'événement sur la roadmap → pré-réservation MeetOps | L | Medium | ⬜ |

> **Couverture** : ce sprint fait partie de la séquence S21→S40 garantissant **aucune US des
> domaines Pilotage/Risques non planifiée**. Items regroupés par feature ; l'ordre d'attaque suit
> les dépendances ci-dessus.
