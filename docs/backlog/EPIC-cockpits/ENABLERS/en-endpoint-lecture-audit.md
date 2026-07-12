# EN51.7 — Endpoint de lecture du journal d'audit

**Type d'enabler** : sécurité / API

**Objectif technique** : Exposer une **API de lecture admin/superadmin** de la table `audit_events`
(déjà peuplée par `AuditService` : login, changement de rôle, activation/désactivation module,
désactivation tenant…), avec filtres (tenant / `event_type` / acteur / période) et pagination.

**Justification** : La donnée d'audit **existe et est captée**, mais n'est lisible aujourd'hui que
par un seul utilisateur via l'export RGPD (`AuditEventRepository.findByUserIdOrderByCreatedAtDesc`).
Une card « qui a fait quoi » (journal d'audit, C6) et la traçabilité des accès externes (EN51.5) ont
besoin d'un endpoint de requête.

**Critères de complétion** :
- [ ] `GET /admin/audit-events` (tenant courant) et `/superadmin/audit-events` (cross-tenant), filtres
      + pagination + tri par date.
- [ ] Autorisation stricte (rôle admin/superadmin) ; jamais accessible à une identité externe pure.
- [ ] Données minimisées (pas de `meta` sensible exposé au-delà du nécessaire).
- [ ] Contrat consommé par la card Journal d'audit (F51.2) et par EN51.5 (traçabilité accès externes).
- [ ] Tests : filtres, pagination, contrôle d'accès (403 pour non-admin).

## Notes

- Card 🔴 (Sensible) : masquée par défaut aux externes (cf. matrice) ; l'auditeur externe y accède en
  lecture seule scopée à la période auditée, via le filtre EN51.5.

---
Item Type: Enabler · Parent: E51 · Type: securite · Module: core · Phase: phase-3
Stage: ⬜ · Priority: High
Dépendances: E06 (administration), table `audit_events` (existante)
