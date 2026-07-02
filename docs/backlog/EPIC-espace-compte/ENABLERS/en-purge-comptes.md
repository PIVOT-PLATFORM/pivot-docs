# EN02.4 — Purge des comptes inactifs

**Type d'enabler** : RGPD · infrastructure

**Critères de complétion** :
- [ ] Job planifié (@Scheduled) identifie comptes inactifs depuis N mois (configurable)
- [ ] Purge : anonymisation des données personnelles + suppression token sessions
- [ ] Log structuré JSON pour chaque compte purgé
- [ ] Paramètre `account.inactivity-purge-months` en configuration

**Statut** : ⏸️ v1-enterprise

---
Item Type: Enabler · Parent: E02 · Type: RGPD · Module: auth · Phase: v1-enterprise
Stage: Backlog · Priority: Low
