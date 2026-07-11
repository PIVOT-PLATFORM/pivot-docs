# EN41.1c — Ciblage rôle / module / étape

**Type d'enabler** : architecture · règles d'affichage (frontend + backend)

**Objectif technique** : Fournir la couche de **ciblage** décidant **quel** contenu d'onboarding s'affiche, **à qui** et **quand** : règles d'affichage conditionnel selon le **rôle** (taxonomie des rôles), le **module activé** (E03), l'**étape** du parcours et la **première visite** (ou le profil d'organisation E40). Le moteur (EN41.1a) rend ; la progression (EN41.1b) persiste ; le ciblage arbitre l'éligibilité d'un parcours ou d'une étape pour un utilisateur donné et retourne au client la liste des tours/tooltips à présenter.

**Justification** : Sans ciblage, tous les utilisateurs verraient tout le contenu sans distinction de rôle, de module activé ni d'ancienneté → onboarding hors sujet et intrusif. Le ciblage garantit un contenu pertinent et non répétitif, condition d'adoption réelle.

**Hors-périmètre** :
- Rendu des étapes — EN41.1a.
- Stockage de l'avancement et reprise — EN41.1b.
- Mesure de l'adoption / analytics — EN41.1d.
- Moteur de profil adaptatif E40 lui-même (verrouillé en idéation) : EN41.1c **consomme** le profil résolu (défaut ou E40), sans l'implémenter.

**Critères de complétion** :
- [ ] Règles de ciblage par **rôle** (taxonomie des rôles), **module activé** (E03), **étape** et **première visite** / profil d'organisation (E40, via contrat de résolution).
- [ ] Résolution d'éligibilité : pour un `(utilisateur, tenant, module)`, retourne l'ensemble des parcours/tooltips éligibles et à ne pas répéter.
- [ ] Un contenu ciblé sur un module **non activé** pour le tenant n'est jamais présenté.
- [ ] Un contenu ciblé sur un rôle n'est présenté qu'aux utilisateurs portant ce rôle.
- [ ] Isolation multi-tenant systématique (404 non-membre / cross-tenant) sur la résolution d'éligibilité.

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un parcours ciblé sur un rôle et un module activé, when un utilisateur portant ce rôle ouvre le module pour la première fois, then le ciblage le déclare éligible et le moteur présente le parcours.
- [ ] Given un parcours ciblé sur un module **non activé** pour le tenant, when un utilisateur de ce tenant ouvre l'application, then le ciblage exclut ce parcours (jamais présenté).
- [ ] Given un utilisateur ayant déjà complété ou passé un parcours (état lu via EN41.1b), when le ciblage réévalue l'éligibilité, then le parcours n'est plus présenté automatiquement (pas de répétition), tout en restant relançable à la demande.
- [ ] Error case: given une règle de ciblage référençant un rôle ou un module inexistant, when le ciblage l'évalue, then la règle est rejetée / ignorée avec une erreur explicite, sans exposer de contenu par défaut non ciblé.
- [ ] Security: given un utilisateur authentifié interrogeant l'éligibilité pour un tenant dont il n'est pas membre / cross-tenant, when il appelle la résolution, then `404` (isolation systématique) ; la **définition** des règles de ciblage est réservée à un rôle habilité (admin / éditeur de contenu), sinon `403`.

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E41 · Module: core · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Dépendances: EN41.1a (moteur d'affichage in-app) · EN41.1b (API parcours & progression) · E03 Système de modules · E40 (profil d'organisation, via contrat de résolution)
