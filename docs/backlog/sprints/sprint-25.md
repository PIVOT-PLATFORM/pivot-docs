# Sprint 25 — E18 Pilotage — Activité : écran Budget

> ⏸️ **Extrait — produit Pilotage distinct (2026-07-20, [ADR-030](pathname:///pivot-docs/adr/ADR-030-bascule-spring-modulith)).** Ce sprint planifiait un domaine **Pilotage** aujourd'hui **hors trajectoire PIVOT** — sa reprise relève du produit Pilotage extrait (contrat `pivot-core/PILOTAGE-HANDOFF.md`), pas de la roadmap PIVOT. Contenu conservé ci-dessous pour traçabilité historique. Détail : [`sprints/README.md` §Trajectoire PIVOT resserrée](./README.md#trajectoire-pivot-resserrée-après-s16) et [`STATUS.md` §Domaine Pilotage extrait](../STATUS.md).
>
> **Créé le 2026-07-13** — plan de **complétion à 100 % des domaines Pilotage (E18) & Risques (E21)**,
> séquencé **S21→S40** (ordre de priorité : E18 base → E21 Risques → E22 Roadmap → E27 OKR → E38
> Innovation *en surplus*). Vue d'ensemble : [README §Complétion Pilotage & Risques](./README.md).
>
> **Phase** : phase-3 · E18. **Sortie** : l'écran Budget d'une activité complet.
>
> **Dépendances** : Dépend de S24 (PMT) ; la logique budgétaire transverse (F18.2) est livrée en parallèle en S27.
>
> **Statut** : ⬜ planifié — non démarré. Items encore au stade backlog : **Gate 1 READINESS
> (PO Agent) à réaliser au démarrage du sprint** (DoR — AC Given/When/Then + cas d'erreur + sécurité),
> même précédent que les sprints précédents.

## Items (19)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US18.18.1 | Affichage de l'écran Budget | S | High | ⬜ |
| US18.18.2 | Affichage de l'onglet PDS Pluriannuel | M | High | ⬜ |
| US18.18.3 | Affichage de l'onglet Élaboration PMT | M | High | ⬜ |
| US18.18.4 | Tableau budgétaire (colonnes) | L | High | ⬜ |
| US18.18.5 | Affichage de l'onglet Photo financière | M | Medium | ⬜ |
| US18.18.6 | Liste déroulante de sélection des photos financières | S | Medium | ⬜ |
| US18.18.7 | Bouton de mise à jour des données des tableaux | S | Medium | ⬜ |
| US18.18.8 | Bouton Synthèse (afficher/rétracter toutes les lignes) | XS | Medium | ⬜ |
| US18.18.9 | Barre de recherche | S | Medium | ⬜ |
| US18.18.10 | Dupliquer une ligne budgétaire | S | Medium | ⬜ |
| US18.18.11 | Modifier une ligne budgétaire (onglet PDS Pluriannuel) | M | High | ⬜ |
| US18.18.12 | Modifier une ligne budgétaire (onglets Élaboration PMT / Photos financières) | M | Medium | ⬜ |
| US18.18.13 | Supprimer une ligne budgétaire | M | High | ⬜ |
| US18.18.14 | Enregistrer (onglets PDS Pluriannuel et Élaboration PMT) | M | High | ⬜ |
| US18.18.15 | Bouton « + Ligne budgétaire » — création d'une nouvelle ligne | L | High | ⬜ |
| US18.18.16 | Enregistrer — onglet Photo financière | M | Medium | ⬜ |
| US18.18.17 | Historique des modifications (logs) — Budget | M | Medium | ⬜ |
| US18.18.18 | Historique des modifications — onglets PDS / ELAB_PMT | S | Medium | ⬜ |
| US18.18.19 | Comparaison des photos financières | M | Low | ⬜ |

> **Couverture** : ce sprint fait partie de la séquence S21→S40 garantissant **aucune US des
> domaines Pilotage/Risques non planifiée**. Items regroupés par feature ; l'ordre d'attaque suit
> les dépendances ci-dessus.
