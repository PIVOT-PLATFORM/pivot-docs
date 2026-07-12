# US52.1.8 — Fiche de clarification : Collaboratif — Whiteboard

En tant qu'**architecte**
Je veux une **fiche de clarification du domaine Whiteboard** (noyau collaboratif E30, ex-E08)
Afin de clarifier le premier **module métier livré** — modèle CRUD, partage par rôle, temps réel et
imports externes.

**Livrable** : `docs/architecture/domaines/whiteboard.md`, conforme au template EN52.1.

**Périmètre du domaine** *(repos pivot-collaboratif-core/-ui · schéma `collaboratif` · module
`collaboratif`)* : tableaux (boards), éléments/cadres, partage & rôles de partage, sessions temps réel
(WS/STOMP), import Klaxoon (`.klx`). Endpoints `/api/collaboratif/**`, `/ws/collaboratif/**`. FK
cross-schéma → `public.tenants`/`public.teams`.

## Critères d'acceptation

- [ ] **Axe 1 — CRUD** : matrice CRUD des boards et éléments (Create/Read/Update/Delete), avec les
      opérations temps réel (WS) distinguées des opérations REST.
- [ ] **Axe 2 — Accès par profil** : accès porté par l'**équipe** propriétaire (renvoi US52.1.3) +
      **rôles de partage** propres au board (owner/éditeur/lecteur — cf. US08.2.3) ; un `USER` non
      partagé = `○` ; gate module `collaboratif` activé requis (renvoi US52.1.5).
- [ ] **Axe 3 — Mécanisme** : point d'application REST **et** WebSocket (auth du handshake STOMP avant
      upgrade) nommés ; isolation schéma `collaboratif` + FK → `public` ; renvoi EN52.2.
- [ ] **Axe 4 — Sources externes** : import Klaxoon (dépôt `.klx`, décompression/repérage d'activités,
      EN30.13 ↓in) référencé depuis EN52.3 — c'est une **source de données externe** entrante.
- [ ] Error case + Security : board accessible hors équipe/partage, action WS non authentifiée, ou
      donnée d'un tenant visible par un autre (fuite cross-schéma) = écarts critiques.
- [ ] `npm run lint` + `npm run build` verts.

## Notes d'implémentation

- Source d'audit : code `pivot-collaboratif-core/-ui` + noyau F08.x/EN08.x (E30). C'est le **patron**
  de fiche pour tous les modules métier des vagues 2-3 (CRUD + partage + WS + import) — la soigner.

---
Item Type: US · Parent: F52.1 · Module: collaboratif · Phase: Socle · Size: L · Priority: High
Stage: ⬜
Dépendances: EN52.1, EN52.2, EN52.3, E30 (noyau F08.x/EN08.x), US52.1.3, US52.1.5
