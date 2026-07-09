# US27.4.3 — Rappels de check-in (notifications)

**En tant que** responsable pilotage
**Je veux** recevoir des **rappels** de check-in (in-app et, si activé, Slack/Teams/e-mail) selon la cadence
**Afin de** ancrer la routine de mise à jour sans la subir

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une cadence de check-in, when l'échéance approche, then un rappel est envoyé aux owners (in-app + canal configuré via bus PIVOT) | ⬜ |
| Given un canal externe (Slack/Teams) configuré, when le rappel part, then l'owner peut faire un check-in léger depuis le canal | ⬜ |
| Given la désactivation des rappels par l'owner, then ils cessent (opt-out) | ⬜ |
| Error : given un canal externe (Slack/Teams) mal configuré ou dont le webhook est invalide, when le rappel doit partir, then l'échec est journalisé et le rappel in-app reste envoyé (dégradation gracieuse, pas de blocage silencieux) | ⬜ |
| Security : given un rappel envoyé vers un canal externe, when il contient l'état d'un OKR individuel confidentiel, then son contenu est minimisé (lien vers l'app plutôt que détail de la valeur) pour respecter la confidentialité (cf. US27.10.2) | ⬜ |

## Hors périmètre
- La saisie du check-in lui-même (cf. US27.4.1) — cette US ne fait que notifier
- Le calcul de la cadence attendue et du statut/tendance (cf. US27.4.2), consommés tels quels pour déclencher le rappel
- La configuration générale des connecteurs Slack/Teams/e-mail (bus PIVOT), qui est un pré-requis plateforme hors périmètre de cette US

## Notes d'implémentation
- S'appuie sur le connecteur « rappels de check-in (bus PIVOT → Slack/Teams) » prévu par EN27.1 ; cette US couvre la logique de déclenchement (échéance approchant selon la cadence du `Cycle`/`KeyResult`) et l'opt-out par owner.
- Le rappel « léger » depuis un canal externe (répondre directement dans Slack/Teams) nécessite une action différée qui doit retomber sur les mêmes règles de validation que le check-in standard (US27.4.1) — pas de contournement des contrôles.
- L'opt-out doit être persistant par owner (préférence utilisateur), pas seulement une désactivation ponctuelle d'une notification.

---
Item Type: US · Parent: F27.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
