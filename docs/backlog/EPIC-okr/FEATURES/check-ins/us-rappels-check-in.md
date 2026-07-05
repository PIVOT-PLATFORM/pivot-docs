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

---
Item Type: US · Parent: F27.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Rôle: officier-responsable-pmo
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
