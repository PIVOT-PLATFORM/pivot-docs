# US22.1.1 — Créer et gérer un projet sur la roadmap

**En tant que** chef de projet / responsable pilotage
**Je veux** créer un projet sur la roadmap avec ses dates, statut et jalons
**Afin de** visualiser le portefeuille et la timeline des initiatives

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un nom, une description, une dateDebut et une dateFin, when je crée un projet (POST `/api/pilotage/roadmap/projects`), then le projet est créé avec le statut `DRAFT` par défaut et rattaché soit à une équipe (FK → `public.teams.id`) soit au portefeuille global du tenant | ⬜ |
| Given un projet existant, when je modifie son statut (DRAFT · ACTIVE · ON_HOLD · COMPLETED · CANCELLED), ses dates ou sa description (PUT `.../projects/{id}`), then les changements sont persistés et horodatés | ⬜ |
| Given un projet, when je le supprime, then il est retiré du portefeuille (soft delete si des jalons/dépendances y sont déjà rattachés, cf. US22.1.3) | ⬜ |
| Error : given une dateFin antérieure à la dateDebut, system rejette la création/modification avec 400 et un message explicite | ⬜ |
| Security : le tenantId est extrait du TenantContext (jamais du body) ; un utilisateur ne peut créer/modifier que les projets de son tenant, et seuls les rôles habilités (chef de projet, responsable pilotage) peuvent modifier le statut | ⬜ |
| A11y : le formulaire de création/édition (dates, statut) est utilisable au clavier avec labels associés (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- La vue Gantt et l'affichage des jalons/dépendances sur une timeline (US22.1.2, US22.1.3)
- La définition de jalons et de dépendances entre projets (US22.1.3)
- Les modèles de projets réutilisables (US22.2.4)
- Le rattachement multi-Application (une US22.1.1 crée un projet simple ; la relation Application → Projet est gérée par EN18.9)

## Notes d'implémentation

- Le projet est l'entité racine du schéma `pilotage` (EN18.1) ; il est le point d'ancrage du modèle temporel unique (EN22.1 : `Projet ─< Phase ─< Tâche`) — cette US ne crée que le `Projet`, sans Phase/Tâche.
- FK `teams.id` vers `public.teams` (schéma partagé) : respecter la contrainte « pas de FK inter-domaine » (ADR-006/008) — validation applicative du `teamId`, pas de contrainte SQL cross-schéma.
- Rattachement à une `Application` : cf. [EN18.9](../../../EPIC-pilotage/ENABLERS/en-modele-application-projet.md) — 1 Application → 1..n Projet.
- Le passage à `CANCELLED`/`COMPLETED` doit être compatible avec les futures US de baseline (US22.2.5, US22.4.9) : ne pas bloquer la lecture d'un projet clos.

---
Item Type: US · Parent: F22.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
