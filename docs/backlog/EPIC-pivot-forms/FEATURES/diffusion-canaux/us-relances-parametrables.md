# US42.3.5 — Relances paramétrables

**En tant que** concepteur de formulaire
**Je veux** relancer les destinataires nommés n'ayant pas encore répondu, manuellement ou automatiquement selon une planification paramétrable
**Afin de** augmenter le taux de réponse sans devoir suivre moi-même qui a répondu

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une diffusion nominative (US42.3.4) en cours, when je déclenche une relance manuelle, then un email de rappel est envoyé aux seuls destinataires n'ayant pas encore répondu | ⬜ |
| Given une planification de relances automatiques (fréquence, nombre max de relances), when les conditions sont atteintes, then une relance automatique est envoyée sans action manuelle | ⬜ |
| Given un destinataire qui répond, when une relance automatique est déjà planifiée pour lui, then elle est annulée — pas de relance après réponse | ⬜ |
| Error : given une planification de relance dont le déclenchement échoue (ex. service d'envoi indisponible), when la fenêtre planifiée passe, then l'échec est journalisé et retenté, pas silencieusement abandonné | ⬜ |
| Security : seul le concepteur du formulaire (ou rôle habilité) peut déclencher une relance manuelle ou modifier la planification automatique | ⬜ |

## Hors périmètre

- La diffusion initiale et les liens personnels par destinataire — couverts par US42.3.4
- Les relances sur le lien partageable public (US42.3.1), qui n'a pas d'identité de destinataire à relancer

## Notes d'implémentation

- Le déclenchement planifié doit être résilient à une instance API redémarrée entre deux relances (verrou applicatif plutôt qu'un timer en mémoire) — même exigence déjà appliquée aux relances SignDoc (E44)

---
Item Type: US · Parent: F42.3 · Module: forms · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Source: PouetPouet v0.31.0 (PR1/2 #240, Formulaires génériques pour PI Planning)
Justification: Livré dans le POC de référence — absent du benchmark socle initial
Dépendances: US42.3.4, EN42.1 (moteur & schéma de formulaire)
