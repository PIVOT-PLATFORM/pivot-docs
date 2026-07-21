# Sprint 27 — E18 Pilotage — Gestion budgétaire & jalons (logique métier)

> ⏸️ **Extrait — produit Pilotage distinct (2026-07-20, [ADR-030](pathname:///pivot-docs/adr/ADR-030-bascule-spring-modulith)).** Ce sprint planifiait un domaine **Pilotage** aujourd'hui **hors trajectoire PIVOT** — sa reprise relève du produit Pilotage extrait (contrat `pivot-core/PILOTAGE-HANDOFF.md`), pas de la roadmap PIVOT. Contenu conservé ci-dessous pour traçabilité historique. Détail : [`sprints/README.md` §Trajectoire PIVOT resserrée](./README.md#trajectoire-pivot-resserrée-après-s16) et [`STATUS.md` §Domaine Pilotage extrait](../STATUS.md).
>
> **Créé le 2026-07-13** — plan de **complétion à 100 % des domaines Pilotage (E18) & Risques (E21)**,
> séquencé **S21→S40** (ordre de priorité : E18 base → E21 Risques → E22 Roadmap → E27 OKR → E38
> Innovation *en surplus*). Vue d'ensemble : [README §Complétion Pilotage & Risques](./README.md).
>
> **Phase** : phase-3 · E18. **Sortie** : la logique métier transverse budget + jalons, au-delà des écrans de saisie.
>
> **Dépendances** : Alimente les écrans Budget (S25) et Jalons (S26).
>
> **Statut** : ⬜ planifié — non démarré. Items encore au stade backlog : **Gate 1 READINESS
> (PO Agent) à réaliser au démarrage du sprint** (DoR — AC Given/When/Then + cas d'erreur + sécurité),
> même précédent que les sprints précédents.

## Items (16)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US18.2.1 | Créer une ligne budgétaire | M | High | ⬜ |
| US18.2.2 | Modifier une ligne budgétaire | M | High | ⬜ |
| US18.2.3 | Dupliquer une ligne budgétaire | S | Medium | ⬜ |
| US18.2.4 | Supprimer une ligne budgétaire | S | High | ⬜ |
| US18.2.5 | Classer et filtrer les données budgétaires | S | Medium | ⬜ |
| US18.2.6 | Naviguer entre les années | XS | Medium | ⬜ |
| US18.2.7 | Distinguer numéro et libellé de contrat | XS | Medium | ⬜ |
| US18.2.8 | Consulter la dernière modification budgétaire | XS | Medium | ⬜ |
| US18.3.1 | Piloter les jalons du cycle (J4–J7, PMPG) | M | High | ⬜ |
| US18.3.2 | Valider un jalon avec date de passage obligatoire | S | High | ⬜ |
| US18.3.3 | Gérer le jalon CEN | S | High | ⬜ |
| US18.3.4 | Gérer le jalon J7 « Mise en Service (MES) » | M | High | ⬜ |
| US18.3.5 | Gérer le jalon J6 « Mise en Production (MEP) » | S | Medium | ⬜ |
| US18.3.6 | Filtrer / isoler un jalon dans la vue planning | XS | Medium | ⬜ |
| US18.3.7 | Réinitialiser les champs de jalon (vue planning) | XS | Medium | ⬜ |
| US18.3.8 | Accéder aux revues de sécurisation (Jalons B, C, D) | XS | Medium | ⬜ |

> **Couverture** : ce sprint fait partie de la séquence S21→S40 garantissant **aucune US des
> domaines Pilotage/Risques non planifiée**. Items regroupés par feature ; l'ordre d'attaque suit
> les dépendances ci-dessus.
