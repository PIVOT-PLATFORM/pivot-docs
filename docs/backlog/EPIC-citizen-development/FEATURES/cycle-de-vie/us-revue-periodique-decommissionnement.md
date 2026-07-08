# US52.2.3 — Revue périodique & décommissionnement

**En tant que** CoE Citizen Dev
**Je veux** un contrôle annuel automatique des applications citoyennes, une alerte en cas d'inactivité et un mécanisme de bascule vers l'IT classique ou de décommissionnement
**Afin de** éviter l'accumulation de dette organisationnelle (applications orphelines ou obsolètes) sans intervention manuelle systématique

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une application en statut « Exploitation », when la date anniversaire de sa dernière revue est atteinte, then un contrôle annuel automatique est déclenché et notifié au propriétaire et au CoE Citizen Dev | ⬜ |
| Given une application, when aucune activité n'est détectée pendant une période configurable (ex. 90 jours), then une alerte d'inactivité est générée et adressée au propriétaire | ⬜ |
| Given une application jugée critique lors de la revue périodique, when le CoE Citizen Dev et le DSI Groupe/Architecture décident sa bascule, then son statut passe à « Industrialisation IT classique » et une US de transfert vers un module core est tracée | ⬜ |
| Given une application inactive sans réponse du propriétaire au-delà d'un délai configurable après alerte, when le CoE Citizen Dev valide le décommissionnement, then l'application passe au statut « Décommissionné » et son accès est désactivé | ⬜ |
| Error : given un propriétaire qui n'existe plus (compte désactivé, départ), system signale l'application comme orpheline dans le registre transverse et bloque son renouvellement de revue tant qu'un nouveau propriétaire n'est pas assigné | ⬜ |
| Security : le décommissionnement d'une application de niveau orange/rouge est soumis à une confirmation explicite du RSSI si l'application manipule des données sensibles/critiques | ⬜ |
| A11y : les notifications d'alerte (inactivité, revue due) sont accessibles via le centre de notifications standard de PIVOT, compatibles lecteur d'écran | ⬜ |

## Hors périmètre

- La définition du niveau de criticité déclenchant une bascule IT classique — dérive du niveau de risque déjà porté par US52.2.1/US52.2.2, non redéfinie ici.
- La migration technique effective vers un module IT classique — hors périmètre de cet EPIC, gérée comme un projet dans le domaine Pilotage une fois la décision de bascule tracée.

## Notes d'implémentation

Job planifié (annuel) sur l'entité `CitizenApp` : détection d'inactivité par absence d'événement
d'usage remonté par le module d'origine (Workflows, Pivot Forms, etc.) sur la fenêtre configurée.
Statuts de cycle de vie couverts : Exploitation → Revue périodique → (Bascule IT classique |
Décommissionné). Détection d'orphelinage réutilise le principe déjà présent côté Workflows
(US29.14.5 — flux orphelins), généralisé ici à toutes les plateformes.

---
Item Type: US · Parent: F52.2 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US52.1.1 (registre transverse) · US52.2.2 (validation proportionnée) · US29.14.5 (CoE et gouvernance citoyenne — détection de flux orphelins, module Workflows, principe généralisé ici) · EN49.2 (rôles CoE, RSSI, DSI Groupe/Architecture)
