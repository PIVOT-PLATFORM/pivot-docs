# ADR-002 — Licence AGPL-3.0

**Statut :** Accepté
**Date :** 2026-06-20

## Contexte

Choix de la licence open-source pour PIVOT. L'objectif est de permettre l'auto-hébergement libre tout en protégeant contre les forks SaaS fermés.

## Décision

**Licence :** GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later)

## Raisons

- **Copyleft fort + réseau** : toute modification déployée sur un serveur (SaaS) doit être publiée sous AGPL — contrairement à GPL qui ne couvre pas l'usage réseau
- **Protection anti-lock-in** : un hébergeur commercial ne peut pas proposer PIVOT as-a-Service sans publier ses modifications
- **Cohérence vision** : PIVOT vise à être une alternative libre aux SaaS propriétaires (Klaxoon, Kahoot…) — AGPL est aligné
- vs MIT/Apache : trop permissif, permettrait des forks fermés propriétaires
- vs GPL : ne couvre pas l'usage réseau (lacune comblée par AGPL)

## Conséquences

- Les contributeurs doivent accepter que leurs contributions soient sous AGPL
- Les entreprises voulant une licence propriétaire devront négocier un accord commercial (dual licensing possible futur)
- Incompatible avec certaines bibliothèques propriétaires — vérifier chaque dépendance

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-06-20 | Décision initiale |
