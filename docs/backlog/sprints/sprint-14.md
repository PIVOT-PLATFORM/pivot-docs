# Sprint 14 — Cockpits DSI (framework + cards Socle v0)

> **Objet** : rendre les cockpits d'administration DSI réels et utiles **même quand les modules sont
> WIP**. On livre l'ossature ([E51](../EPIC-cockpits/README.md)) puis les cards branchées sur les
> briques déjà livrées ; les cards de modules non prêts se rendent en état `module-wip`.
>
> **Additif** : ce sprint ne modifie aucun item des Sprints 1-13. Il consomme des briques Socle
> déjà mergées (E01/E03/E04/E06) et les livrables Pilotage de S9-S10.
>
> **Statut** : ⬜ planifié — non démarré. Séquencé après S13 ; les enablers EN51.1-5 et les cards
> F51.1 sont faisables immédiatement (données déjà exposées, cf. audit de faisabilité).

**Sortie :** un cockpit d'administration composable de bout en bout, affichant les **4 cards Socle
v0** réelles (Identités, Activation domaines, Santé instance, Roadmap) + les cards de modules WIP en
placeholder — sur profil d'organisation par défaut (EN18.10).

## Scope

- **Ossature (faisable maintenant)** : EN51.1 (composant Card + états dont `module-wip`), EN51.2
  (moteur de composition), EN51.3 (contrat du catalogue), EN51.4 (shell/hôte), EN51.5 (filtre
  d'accès interne/externe).
- **Cards Socle v0 (faisables maintenant)** : US51.1.1 à US51.1.4.
- **Déblocage de cards gouvernance (enablers de données)** : EN51.6 (télémétrie d'usage — levier
  n°1), EN51.7 (lecture audit), EN51.8 (code-scanning), EN51.9 (agrégat portefeuille). Les cards
  F51.2 qui en dépendent suivent une fois l'enabler livré (dans ce sprint si capacité, sinon S15).

## Items

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| EN51.1 | Composant Card & tous ses états (dont `module-wip`) | M | Critical | ⬜ |
| EN51.2 | Moteur de composition de cockpit | M | Critical | ⬜ |
| EN51.3 | Contrat / registre du catalogue de cards | M | Critical | ⬜ |
| EN51.4 | Shell / hôte de cockpit | L | High | ⬜ |
| EN51.5 | Filtre d'accès interne / externe & masquage | L | Critical | ⬜ |
| US51.1.1 | Card Identités & sessions | S | High | ⬜ |
| US51.1.2 | Card Activation des domaines | S | High | ⬜ |
| US51.1.3 | Card Santé de l'instance | M | High | ⬜ |
| US51.1.4 | Card Roadmap | S | Medium | ⬜ |
| EN51.6 | Couche de télémétrie d'usage *(levier — débloque adoption/usage)* | L | High | ⬜ |
| EN51.7 | Endpoint de lecture du journal d'audit | M | High | ⬜ |
| EN51.8 | Intégration GitHub Code-Scanning | M | Medium | ⬜ |
| EN51.9 | Agrégat portefeuille cross-projet | M | Medium | ⬜ |

> **Cards gouvernance v0 (F51.2)** — Journal d'audit *(EN51.7)*, Correctifs sécurité *(EN51.8)*,
> Santé du portefeuille *(EN51.9)*, Adoption globale *(EN51.6)* — à ouvrir dès que leur enabler de
> données est mergé ; portées en fin de sprint si capacité, sinon reportées.
>
> **Cards modules WIP (F51.3)** — restent en backlog E51, rendues `module-wip`, activées US par US au
> fil de la livraison de leur module porteur (agilité E10/E11, budget E26, risques E21/E43, données,
> formation E41, feedback E46…).

## Ordre d'attaque suggéré

1. EN51.1 + EN51.3 (composant + contrat) en parallèle — fondations sans dépendance.
2. EN51.2 (moteur) puis EN51.4 (shell) — consomment 1 & 3.
3. EN51.5 (filtre d'accès) — avant toute card exposant de la donnée sensible.
4. US51.1.1-4 (cards Socle) une fois le moteur + shell + filtre en place.
5. EN51.6-9 (enablers de données) en parallèle du bloc cards, chacun débloquant une card F51.2.

## Pré-requis d'amorçage

- Gate 1 READINESS sur les 13 items avant tout Dev Agent.
- Confirmer le point de branchement de la santé actuator (`:8081` non `/api`, cf. US51.1.3) et la
  stratégie code-scanning (API live vs ingestion SARIF, cf. EN51.8) au Gate 1.
