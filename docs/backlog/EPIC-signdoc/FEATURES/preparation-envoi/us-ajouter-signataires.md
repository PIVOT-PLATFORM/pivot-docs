# US44.1.2 — Ajouter des signataires et envoyer les invitations

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** organisateur d'une signature
**Je veux** ajouter des signataires par email (internes ou externes, sans compte requis), assigner les champs à chacun et choisir un ordre séquentiel ou parallèle
**Afin d'** envoyer le document en signature à toutes les parties prenantes

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Ajout de signataires par email, rôle (SIGNER / APPROVER / VIEWER) | ⬜ |
| Ordre de signature configurable : séquentiel ou parallèle | ⬜ |
| Envoi : chaque signataire reçoit un lien unique à usage unique (token) | ⬜ |
| Document passe en statut `PENDING` après envoi | ⬜ |
| Rappels automatiques configurables aux signataires en attente (fréquence par défaut + réglable) — benchmark : standard chez DocuSign/Dropbox Sign/Yousign | ⬜ |
| Sécurité : token de signataire non devinable, à usage unique, expirable | ⬜ |

---
Item Type: US · Parent: F44.1 · Module: signdoc · Repo: pivot-signdoc-core/ui · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Dépendances: US44.1.1 (préparation du document)
