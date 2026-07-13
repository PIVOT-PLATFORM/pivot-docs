# US52.1.6 — Fiche de clarification : Shell, navigation & notifications

En tant qu'**architecte**
Je veux une **fiche de clarification du domaine Shell & UX** (E16)
Afin de clarifier ce que le shell applicatif expose lui-même (hors modules) et par quel canal l'info y
arrive.

**Livrable** : `docs/architecture/domaines/shell-ux.md`, conforme au template EN52.1.

**Périmètre du domaine** *(repo pivot-ui · lib `@pivot/ui-core` · schéma `public` pour la persistance
côté core)* : navigation principale + menu utilisateur, page d'accueil (grille modules), thème
clair/sombre, formulaire de contact, notifications in-app + badge, section « modules à venir », pages
légales/« bientôt disponible ». Endpoints `/api/notifications/**`, `/api/contact` (à confirmer).

## Critères d'acceptation

- [ ] **Axe 1 — CRUD** : matrice CRUD des notifications in-app (R/marquer-lu par le `USER` destinataire ;
      création = système/autres domaines) et du formulaire de contact (Create → envoi). Thème/nav =
      préférences (renvoi US52.1.2), non re-décrits.
- [ ] **Axe 2 — Accès par profil** : un `USER` lit **ses** notifications (`R(propre)`) ; le contact est
      ouvert (préciser authentifié vs anonyme) ; nav filtrée par modules activés (renvoi US52.1.5).
- [ ] **Axe 3 — Mécanisme** : point d'application des notifications (destinataire = propriétaire) nommé ;
      la nav consomme le statut module (`moduleGuard`) — renvoi EN52.2/US52.1.5.
- [ ] **Axe 4 — Sources externes** : SMTP (envoi du formulaire de contact ↑out) référencé depuis EN52.3.
- [ ] Error case + Security : notification d'un utilisateur lisible par un autre, ou contact non
      rate-limité (spam), = écarts.
- [ ] `npm run lint` + `npm run build` verts.

## Notes d'implémentation

- Source d'audit : code `pivot-ui`/`@pivot/ui-core` + `pivot-core` (notifications, contact) + E16.
  US16.3.1 (contact) et US16.1.3 (badge) sont en Review — la fiche documente l'état mergé.

---
Item Type: US · Parent: F52.1 · Module: core · Phase: Socle · Size: S · Priority: Medium
Stage: ⬜
Dépendances: EN52.1, EN52.2, EN52.3, E16, US52.1.2, US52.1.5
