# EN25.5 — Notifications e-mail

**Type d'enabler** : architecture

**Objectif technique** : Mettre en place le service de notifications e-mail du module : mail unitaire au vérificateur/valideur suivant, récapitulatif quotidien (envoi à 17h), notification de validation finale au prescripteur et notifications suppléant, le tout piloté par les préférences du profil utilisateur.

**Justification** : Le circuit de validation repose sur des notifications fiables pour informer le bon acteur au bon moment. La modulation par préférences (récapitulatif quotidien, suppléance, validation finale) évite la sur-sollicitation et garantit le respect des choix des utilisateurs.

**Critères de complétion** :
- [ ] Envoi du mail unitaire au vérificateur/valideur suivant du workflow.
- [ ] Génération et envoi du récapitulatif quotidien à 17h pour les valideurs ayant activé la préférence.
- [ ] Notification de validation finale au prescripteur selon sa préférence.
- [ ] Notifications de suppléance conditionnées à la préférence du suppléant.

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un valideur ayant activé le récapitulatif quotidien, when la tâche de 17h s'exécute et qu'il a des DA à valider, then il reçoit un unique mail récapitulatif au lieu d'un mail par DA.
- [ ] Error case: given l'indisponibilité du service de messagerie, when une notification doit partir, then l'échec est journalisé et l'envoi est retenté sans perte de notification.
- [ ] Security: chaque notification n'est adressée qu'au destinataire habilité (valideur suivant, prescripteur propriétaire, suppléant désigné) et respecte ses préférences de profil.

---
Item Type: Enabler · Parent: E25 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Source: SPEC_OPDN — module Achats/Contrats (WRAP/OPDN)
Dépendances: —
