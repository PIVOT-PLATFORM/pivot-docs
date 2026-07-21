# Sprint 28 — Collaboration — E30 Sécurité & gouvernance

> **Créé le 2026-07-21** — plan de **complétion à 100 % des domaines Agilité & Collaboration**,
> séquencé **S17→S31** (Agilité d'abord, puis Collaboration). Vue d'ensemble :
> [README §Complétion Agilité & Collaboration](./README.md).
>
> **Phase** : phase-3 · E30 Collaboration. **Sortie** : le socle sécurité et gouvernance du
> whiteboard (SSO, chiffrement, RGPD, audit, DLP, résidence UE, réversibilité, SCIM, stockage
> tenant, souveraineté) est complet.
>
> **Cible** : modulith `pivot-core` (module `fr.pivot.collaboratif.*`) + `pivot-ui` (ADR-030).
>
> **Dépendances** : s'appuie sur le noyau whiteboard Socle F08.x/EN08.x (Sprints 10-16).
>
> **Statut** : ⬜ planifié — non démarré. **Gate 1 READINESS (PO Agent) à réaliser au démarrage
> du sprint** (DoR — AC Given/When/Then + cas d'erreur + sécurité), même protocole que les sprints précédents.

## Items (12)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US30.9.1 | SSO d'entreprise | M | Critical | ⬜ |
| US30.9.2 | Chiffrement | M | Critical | ⬜ |
| US30.9.3 | Conformité RGPD | L | Critical | ⬜ |
| US30.9.4 | Politique d'accès externes | S | High | ⬜ |
| US30.9.5 | Journaux d'audit | M | High | ⬜ |
| US30.9.6 | Classification et DLP | L | High | ⬜ |
| US30.9.7 | Résidence des données UE | M | High | ⬜ |
| US30.9.8 | Réversibilité des données | L | High | ⬜ |
| US30.9.9 | Provisionnement SCIM | M | High | ⬜ |
| US30.9.10 | Stockage dans le tenant | XL | Medium | ⬜ |
| US30.9.11 | Mode hors ligne (boîtier local) | XL | Medium | ⬜ |
| US30.9.12 | Hébergement souverain / air-gap | XL | Medium | ⬜ |

> **Couverture** : ce sprint fait partie de la séquence S17→S31 garantissant **aucune US/Enabler des
> domaines Agilité/Collaboration non planifiée**. Items regroupés par feature ; l'ordre d'attaque suit les dépendances.
