# US42.3.3 — Enquêtes in-app ciblées

**En tant que** Product Owner
**Je veux** déclencher une micro-enquête ciblée dans un module PIVOT selon un événement ou un attribut utilisateur (ex. après complétion d'une tâche, pour un rôle donné)
**Afin de** recueillir un feedback contextuel au bon moment plutôt qu'une enquête générique envoyée à froid

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une règle de déclenchement (événement du bus + attribut de ciblage), when l'événement se produit pour un utilisateur correspondant au ciblage, then la micro-enquête s'affiche in-app à cet utilisateur | ⬜ |
| Given un utilisateur ayant déjà répondu ou explicitement fermé l'enquête, when le même événement se reproduit, then l'enquête ne se re-déclenche pas (pas de sur-sollicitation) | ⬜ |
| Error : given un événement de déclenchement mal formé ou un attribut de ciblage inconnu, when il est reçu, then l'enquête ne se déclenche pas et l'incident est journalisé (pas de crash du module hôte) | ⬜ |
| Security : le ciblage par attribut utilisateur respecte le principe de minimisation — pas de collecte d'attributs au-delà de ce qui sert strictement le ciblage configuré | ⬜ |

## Hors périmètre

- Enquêtes déclenchées par email/notification push hors du contexte in-app — hors périmètre (couvert par la diffusion par lien, US42.3.1)
- A/B testing du contenu de l'enquête selon le segment — hors périmètre

## Notes d'implémentation

- S'abonne aux événements du bus PIVOT émis par les modules hôtes (ADR-008) — pas de couplage direct à un module particulier, le ciblage reste générique (rôle/attribut), cohérent avec « pas de FK inter-modules » (ADR-006)

---
Item Type: US · Parent: F42.3 · Module: forms · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Rôle: product-owner
Source: FRM-203 · MoSCoW: Could · Origine: Différenciant Formbricks
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
