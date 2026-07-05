# US35.1.1 — Droits par rôle et périmètre

**En tant que** DSI
**Je veux** définir des rôles fins (élus, direction, PMO, MOA, MOE, métiers, externes) avec des périmètres de visibilité
**Afin de** garantir que chaque profil n'accède qu'aux données autorisées

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un rôle (élu, direction, PMO, MOA, MOE, métier ou externe) rattaché à un utilisateur, when celui-ci consulte le portefeuille de projets, then seules les données incluses dans son périmètre de visibilité (projets, programmes, portefeuilles autorisés) lui sont retournées | ⬜ |
| Given un administrateur, when il modifie l'attribution de rôle ou de périmètre d'un utilisateur, then le changement s'applique immédiatement à ses accès suivants (pas de droits résiduels de l'ancien périmètre) | ⬜ |
| Error : given une requête (API ou UI) ciblant une ressource hors du périmètre de l'utilisateur, system refuse l'accès avec un statut 403 et journalise la tentative | ⬜ |
| Security : le contrôle de périmètre est appliqué côté serveur sur chaque endpoint exposant des données de pilotage (pas uniquement un masquage côté UI) — un utilisateur ne peut obtenir, par API directe ou export, aucune donnée hors de son périmètre | ⬜ |
| Security : les attributions et modifications de rôle/périmètre sont tracées de façon non répudiable (auteur, cible, ancien/nouveau périmètre, horodatage) et consultables en audit | ⬜ |
| A11y : l'écran d'administration des rôles et périmètres (formulaire d'attribution, tableau des utilisateurs) est conforme WCAG 2.1 AA (navigation clavier, labels associés, contraste) | ⬜ |

## Hors périmètre
- Définition du référentiel d'identités et de l'authentification elle-même (SSO, MFA) — couverte par US35.1.4 (SSO et audit)
- Étiquetage de sensibilité au niveau tâche et DLP associé — couvert par US35.1.6
- Classification de portefeuille par niveau de sensibilité et alignement hébergement — couvert par US35.1.5
- Gestion des demandes d'accès en self-service ou workflow d'approbation (hors scope de cette US, potentiel enrichissement ultérieur)

## Notes d'implémentation
- Modèle de rôles fins attendu : élus, direction, PMO, MOA, MOE, métiers, externes — chaque rôle porte un périmètre de visibilité (projet/programme/portefeuille) distinct du rôle lui-même (rôle = ce qu'on peut faire, périmètre = sur quoi)
- Le contrôle de périmètre doit être appliqué en profondeur dans `pivot-pilotage-core` (schéma Flyway `pilotage`), pas seulement en filtrage de vue côté `pivot-pilotage-ui` — toute requête doit être scopée par périmètre au niveau de la couche d'accès aux données
- FK attendue vers `public.teams.id` pour le rattachement des périmètres — vérifier la cohérence avec le modèle de rôles/permissions déjà en place dans le socle Auth & IAM (E01) avant de dupliquer un mécanisme
- Le journal des tentatives refusées et des changements d'attribution alimente potentiellement l'export d'audit de US35.1.4 (SSO et audit) — prévoir un format d'événement compatible

---
Item Type: US · Parent: F35.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: Backlog
Source: PP-010 · MoSCoW: Must · Lot: Lot 1 · Origine: Socle 3/3
Profils: Tous
Justification: Dossier §4
Dépendances: —
