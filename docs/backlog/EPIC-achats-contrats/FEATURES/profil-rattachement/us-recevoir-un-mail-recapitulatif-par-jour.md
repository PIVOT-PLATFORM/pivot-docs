# US25.2.3 — Recevoir un mail récapitulatif par jour

**En tant que** responsable des marchés (vérificateur/valideur principal)
**Je veux** activer une préférence de récapitulatif quotidien des DA à valider
**Afin de** recevoir un seul mail par jour au lieu d'un mail par demande

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given mon profil de vérificateur/valideur principal, when j'active la coche « mail récapitulatif quotidien », then je recevrai un récapitulatif journalier des DA à valider au lieu d'un mail par DA | ⬜ |
| Given la coche désactivée, when des DA me sont soumises, then je reçois un mail par DA | ⬜ |
| Given la coche activée, when la journée écoulée comporte des DA à valider, then un seul mail récapitulatif regroupe l'ensemble de ces DA | ⬜ |
| Error : given aucune DA à valider sur la journée, system n'envoie pas de mail récapitulatif | ⬜ |
| Security/Gouvernance : préférence réservée aux vérificateurs/valideurs principaux — le prescripteur n'y a pas accès (P=NON) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le mécanisme d'envoi et l'heure d'expédition du récapitulatif (couverts par l'enabler Notifications e-mail).

## Notes d'implémentation
- Coche de préférence dans le profil, disponible pour le vérificateur/valideur principal.
- Alternative au mail unitaire par DA. Module WRAP/OPDN.

---
Item Type: US · Parent: F25.2 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: responsable-des-marches
Source: SPEC_OPDN — B.2 Profil utilisateur & rattachement
Dépendances: —
