# EN41.1b — API d'enregistrement de parcours & progression

**Type d'enabler** : architecture · backend (`pivot-core`, schéma `core`)

**Objectif technique** : Fournir l'**API serveur** qui enregistre les **définitions de parcours** d'onboarding (un parcours par module, branchement F41.5) et **persiste la progression par utilisateur** : étape courante, étapes complétées, tour passé (skip), complétion. L'API permet la **reprise** d'un parcours interrompu (même utilisateur, autre session ou autre appareil) et expose l'état au moteur client (EN41.1a). La progression est **rattachée au compte utilisateur et au tenant** (isolation multi-tenant), jamais partagée entre utilisateurs.

**Justification** : Le moteur d'affichage (EN41.1a) ne tient l'état qu'en mémoire ; sans persistance serveur, aucun onboarding ne survit à un rechargement ni ne se reprend d'un appareil à l'autre. Cette API est le point de branchement des parcours par module (F41.5) et la source des signaux de complétion consommés par l'analytics (EN41.1d).

**Hors-périmètre** :
- Rendu client des étapes / tooltips / checklists — EN41.1a.
- Règles décidant **si** un parcours doit s'afficher (rôle / module / première visite) — EN41.1c.
- Agrégation analytique et métriques d'adoption — EN41.1d (consomme les signaux de complétion, ne les stocke pas ici sous forme agrégée).

**Critères de complétion** :
- [ ] Enregistrement d'un **parcours par module** (branchement F41.5) : définition versionnée, étapes ordonnées, contenu i18n.
- [ ] Persistance de la **progression par utilisateur** : étape courante, étapes complétées, statut (en cours / passé / complété), horodatage.
- [ ] **Reprise** : un parcours interrompu se recharge à la bonne étape sur une nouvelle session / un autre appareil du même utilisateur.
- [ ] État exposé au moteur client (EN41.1a) via API, rattaché au couple `(utilisateur, tenant)`.
- [ ] Isolation multi-tenant systématique (404 non-membre / cross-tenant) sur la lecture et l'écriture de progression.

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un parcours enregistré pour un module, when l'utilisateur avance dans le tour côté client (EN41.1a), then l'API persiste sa progression (étape courante, étapes complétées) rattachée à `(utilisateur, tenant)`.
- [ ] Given un utilisateur ayant interrompu un parcours, when il rouvre le module sur une autre session ou un autre appareil, then l'API restitue l'état exact et le moteur reprend à l'étape non terminée (pas de redémarrage à zéro).
- [ ] Given un parcours entièrement parcouru ou explicitement passé (skip), when l'utilisateur revient, then l'API le signale complété/passé et le parcours ne se relance pas automatiquement (mais reste relançable à la demande depuis l'aide).
- [ ] Error case: given une écriture de progression référençant un parcours ou une étape inexistant(e), when l'API la reçoit, then elle retourne `404` (ressource introuvable) et n'enregistre aucune progression orpheline.
- [ ] Security: given un utilisateur authentifié ciblant la progression d'un autre utilisateur ou d'un tenant dont il n'est pas membre / cross-tenant, when il lit ou écrit, then l'API retourne `404` (isolation systématique) ; l'écriture d'une **définition** de parcours est réservée à un rôle habilité (admin / éditeur de contenu), sinon `403`.

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E41 · Module: core · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Dépendances: EN41.1a (moteur d'affichage in-app)
