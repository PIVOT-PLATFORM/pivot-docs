# US44.3.1 — Finaliser et consulter l'audit trail

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant qu'** organisateur d'une signature
**Je veux** recevoir le document finalisé une fois tous les signataires passés, et consulter le journal horodaté de toutes les actions
**Afin de** disposer d'une preuve opposable de la signature

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Une fois tous les signataires terminés, génération du PDF final (signatures incrustées, non modifiable) | ⬜ |
| Certificat numérique embarqué : hash SHA-256 du document + horodatage | ⬜ |
| Audit trail non modifiable : création, envoi, consultation, signature, refus, finalisation — horodatés avec identité et IP | ⬜ |
| Audit trail exportable en PDF séparé | ⬜ |
| Notification à tous les participants avec le document final en pièce jointe | ⬜ |
| Archivage automatique du document final (interface E45 PDF Manager) | ⬜ |
| Security : le document final et son audit trail ne sont plus modifiables après finalisation | ⬜ |

---
Item Type: US · Parent: F44.3 · Module: signdoc · Repo: pivot-signdoc-core/ui · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Dépendances: US44.2.1 (signature de tous les signataires) · Interface E45 PDF Manager (archivage)
