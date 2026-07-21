# Sprint 22 — E18 Pilotage — Création d'une activité

> ⏸️ **Extrait — produit Pilotage distinct (2026-07-20, [ADR-030](pathname:///pivot-docs/adr/ADR-030-bascule-spring-modulith)).** Ce sprint planifiait un domaine **Pilotage** aujourd'hui **hors trajectoire PIVOT** — sa reprise relève du produit Pilotage extrait (contrat `pivot-core/PILOTAGE-HANDOFF.md`), pas de la roadmap PIVOT. Contenu conservé ci-dessous pour traçabilité historique. Détail : [`sprints/README.md` §Trajectoire PIVOT resserrée](./README.md#trajectoire-pivot-resserrée-après-s16) et [`STATUS.md` §Domaine Pilotage extrait](../STATUS.md).
>
> **Créé le 2026-07-13** — plan de **complétion à 100 % des domaines Pilotage (E18) & Risques (E21)**,
> séquencé **S21→S40** (ordre de priorité : E18 base → E21 Risques → E22 Roadmap → E27 OKR → E38
> Innovation *en surplus*). Vue d'ensemble : [README §Complétion Pilotage & Risques](./README.md).
>
> **Phase** : phase-3 · E18. **Sortie** : le parcours de création d'une activité de bout en bout.
>
> **Dépendances** : Dépend du socle S21 (référentiels) et d'EN18.9 (modèle Application→Projet). EN18.12/EN18.13 sont des ajustements de champ à réaliser avec l'écran de création.
>
> **Statut** : ⬜ planifié — non démarré. Items encore au stade backlog : **Gate 1 READINESS
> (PO Agent) à réaliser au démarrage du sprint** (DoR — AC Given/When/Then + cas d'erreur + sécurité),
> même précédent que les sprints précédents.

## Items (13)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US18.15.1 | Débuter la création d'une nouvelle activité | L | High | ⬜ |
| US18.15.2 | Règle de nommage à la création d'une activité | M | High | ⬜ |
| US18.15.3 | Historique des modifications (logs) des informations générales et structurelles | S | Medium | ⬜ |
| US18.15.4 | Affichage du dernier porteur de modification | XS | Medium | ⬜ |
| US18.15.5 | Afficher le créateur de l'activité | XS | Medium | ⬜ |
| US18.15.6 | Header de l'activité | S | Medium | ⬜ |
| US18.15.7 | Affichage d'une activité | M | High | ⬜ |
| US18.15.8 | Suppression d'une activité | M | High | ⬜ |
| US18.15.9 | Dupliquer une activité | M | Low | ⬜ |
| US18.15.10 | Message d'avertissement au changement d'écran/onglet sans enregistrement | M | High | ⬜ |
| US18.4.1 | Gérer les principaux risques et parades | S | High | ⬜ |
| EN18.12 | Retirer les jalons ABC/BC de la création | S | Medium | ⬜ |
| EN18.13 | Renommage du champ « Bénéficiaire (MOA) » | M | Medium | ⬜ |

> **Couverture** : ce sprint fait partie de la séquence S21→S40 garantissant **aucune US des
> domaines Pilotage/Risques non planifiée**. Items regroupés par feature ; l'ordre d'attaque suit
> les dépendances ci-dessus.
