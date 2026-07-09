# US44.2.1 — Signer un document via lien sécurisé

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** signataire (avec ou sans compte PIVOT)
**Je veux** ouvrir le document depuis mon lien unique, le lire, remplir mes champs assignés et signer
**Afin de** valider le document sans échange papier

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Accès au document sans compte PIVOT via le lien unique du signataire | ⬜ |
| Prévisualisation multi-pages du document dans le navigateur | ⬜ |
| Remplissage des champs assignés, signature (dessin ou typographie) | ⬜ |
| Confirmation d'identité (OTP email) avant validation de la signature | ⬜ |
| Niveau de vérification d'identité renforcée (au-delà de l'OTP email) à qualifier au Gate 1 selon la sensibilité du document — benchmark Yousign (différenciateur anti-fraude natif) | ⬜ |
| En séquentiel, le signataire suivant n'est notifié qu'après la signature du précédent | ⬜ |
| Un signataire peut refuser avec motif obligatoire — notifie immédiatement l'organisateur | ⬜ |
| Error : token expiré ou déjà utilisé → accès refusé explicite | ⬜ |
| Security : token à usage unique, invalidé après signature ou refus | ⬜ |

---
Item Type: US · Parent: F44.2 · Module: signdoc · Repo: pivot-signdoc-core/ui · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Dépendances: US44.1.2 (envoi des invitations)
