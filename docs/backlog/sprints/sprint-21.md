# Sprint 21 — E18 Pilotage — Référentiels & socle activité

> ⏸️ **Extrait — produit Pilotage distinct (2026-07-20, [ADR-030](pathname:///pivot-docs/adr/ADR-030-bascule-spring-modulith)).** Ce sprint planifiait un domaine **Pilotage** aujourd'hui **hors trajectoire PIVOT** — sa reprise relève du produit Pilotage extrait (contrat `pivot-core/PILOTAGE-HANDOFF.md`), pas de la roadmap PIVOT. Contenu conservé ci-dessous pour traçabilité historique. Détail : [`sprints/README.md` §Trajectoire PIVOT resserrée](./README.md#trajectoire-pivot-resserrée-après-s16) et [`STATUS.md` §Domaine Pilotage extrait](../STATUS.md).
>
> **Créé le 2026-07-13** — plan de **complétion à 100 % des domaines Pilotage (E18) & Risques (E21)**,
> séquencé **S21→S40** (ordre de priorité : E18 base → E21 Risques → E22 Roadmap → E27 OKR → E38
> Innovation *en surplus*). Vue d'ensemble : [README §Complétion Pilotage & Risques](./README.md).
>
> **Phase** : phase-3 · E18. **Sortie** : les objets de gestion (référentiels), les habilitations et la gestion/recherche d'activités posés comme socle du domaine Pilotage.
>
> **Dépendances** : Socle terminé + EN17 (pivot-core-starter publié). S'appuie sur EN18.1 / EN18.2 / EN18.9 / EN18.10 livrés en S9 (schéma `pilotage`, guard, modèle Application→Projet, profil par défaut).
>
> **Statut** : ⬜ planifié — non démarré. Items encore au stade backlog : **Gate 1 READINESS
> (PO Agent) à réaliser au démarrage du sprint** (DoR — AC Given/When/Then + cas d'erreur + sécurité),
> même précédent que les sprints précédents.

## Items (14)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US18.7.1 | Mettre à jour les objets de gestion (OI, EOTP) | M | High | ⬜ |
| US18.7.2 | Mettre à jour les produits | S | High | ⬜ |
| US18.7.3 | Gérer les référentiels métiers | M | High | ⬜ |
| US18.8.1 | Accéder au menu d'administration | S | High | ⬜ |
| US18.1.1 | Renseigner les informations générales d'une activité | S | High | ⬜ |
| US18.1.2 | Renseigner les informations structurelles d'une activité | S | High | ⬜ |
| US18.1.3 | Contrôler la validité du nom d'activité | S | High | ⬜ |
| US18.1.4 | Consulter la dernière modification d'une activité | XS | Medium | ⬜ |
| US18.1.5 | Identifier rapidement une activité par son trigramme | XS | Medium | ⬜ |
| US18.1.6 | Visualiser les activités liées Parents / Enfants | S | Medium | ⬜ |
| US18.6.1 | Rechercher activités et portefeuilles | S | Medium | ⬜ |
| US18.6.2 | Filtrer par produit associé | XS | Medium | ⬜ |
| US18.6.3 | Sécuriser la navigation | S | Medium | ⬜ |
| EN18.14 | Gestion des habilitations par groupe AD | M | High | ⬜ |

> **Couverture** : ce sprint fait partie de la séquence S21→S40 garantissant **aucune US des
> domaines Pilotage/Risques non planifiée**. Items regroupés par feature ; l'ordre d'attaque suit
> les dépendances ci-dessus.
