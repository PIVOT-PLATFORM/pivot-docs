# US25.1.1 — Créer et gérer une consultation (appel d'offres)

**En tant que** responsable achats / pilotage
**Je veux** créer une consultation ou appel d'offres
**Afin de** suivre le processus de commande publique de bout en bout

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un objet, un type (APPEL_OFFRES, MARCHE_NEGOCIES, ACCORD_CADRE, CONSULTATION_SIMPLE), une datePublication et une dateLimiteCandidature, when POST `/api/pilotage/procurement/consultations`, then la consultation est créée en statut DRAFT avec une référence générée et rattachée au tenant courant | ⬜ |
| Given une consultation existante, when son statut passe de DRAFT à PUBLIEE, EN_COURS_ANALYSE, ATTRIBUEE, INFRUCTUEUSE ou ANNULEE, then la transition est appliquée et horodatée | ⬜ |
| Error : given une dateLimiteCandidature antérieure ou égale à la datePublication, system retourne 400 | ⬜ |
| Error : given une consultation d'un autre tenant, system retourne 404 (pas de fuite d'existence cross-tenant) | ⬜ |
| Security : la création, modification et consultation d'une consultation sont réservées aux rôles habilités (responsable achats / pilotage) du tenant propriétaire ; tenantId extrait du TenantContext, jamais du payload client | ⬜ |
| A11y : le formulaire de création/édition de consultation (type, dates, objet) est utilisable au clavier, avec labels associés et messages d'erreur de validation annoncés aux lecteurs d'écran | ⬜ |

## Hors périmètre
- L'enregistrement des candidats et de leurs offres (US25.1.2)
- L'attribution du marché et la notification des candidats (US25.1.3)
- La publication effective sur une plateforme de dématérialisation externe (BOAMP, profil acheteur) — hors périmètre POC

## Notes d'implémentation
- Entité `Consultation` dans le schéma Flyway `pilotage` (EN18.1), FK vers `public.teams.id` comme les autres entités du domaine
- Machine à états explicite pour les statuts (DRAFT → PUBLIEE → EN_COURS_ANALYSE → ATTRIBUEE/INFRUCTUEUSE/ANNULEE) ; transitions invalides à rejeter en 409
- Isolation multi-tenant via TenantContext (pattern EN18.2 guard `moduleId: 'pilotage'`), à couvrir par un test TI dédié (consultation d'un autre tenant → 404)

---
Item Type: US · Parent: F25.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
