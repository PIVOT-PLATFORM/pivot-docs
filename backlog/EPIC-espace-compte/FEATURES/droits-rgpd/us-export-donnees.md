# US02.3.1 — Export de ses données personnelles

**En tant que** utilisateur
**Je veux** exporter toutes mes données personnelles stockées par PIVOT
**Afin d'** exercer mon droit à la portabilité (RGPD Art.20)

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| POST /api/account/export déclenche génération d'une archive (JSON ou ZIP) | ⬜ | ⬜ |
| Archive contient : profil, sessions, audit events, données modules | ⬜ | ⬜ |
| Lien de téléchargement envoyé par email (TTL 24h) | ⬜ | ⬜ |
| Traitement asynchrone (pas de blocage UI) | ⬜ | ⬜ |
| Rate limit : 1 export / 24h par utilisateur | ⬜ | ⬜ |
| Page Angular avec bouton "Demander mon export" + statut | ⬜ | ⬜ |
| Audit event enregistré (DataExportRequested) | ⬜ | ⬜ |
| Lien de téléchargement requiert session authentifiée ET vérifie que userId de la session = userId propriétaire de l'export. Tentative par un autre userId → 403 | ⬜ | ⬜ |
| Téléchargement via endpoint authentifié /api/account/export/download/{exportToken} — pas de lien signé public (pas de S3 presigned URL sans auth) | ⬜ | ⬜ |
| L'archive contient uniquement les données dont l'utilisateur est le sujet. Les audit events inclus ne contiennent pas de données personnelles d'autres utilisateurs (email admin → rôle ou ID anonymisé) | ⬜ | ⬜ |
| MVP : l'archive contient profil, sessions, audit events. Données des modules collaboratifs dans une phase ultérieure | ⬜ | ⬜ |
| Si demande en cours ou < 24h écoulées, bouton disabled avec message : "Prochain export disponible à HH:MM" | ⬜ | ⬜ |
| Après clic, page affiche état "Demande reçue" avec estimation ("Vous recevrez un email dans quelques minutes") | ⬜ | ⬜ |
| En cas d'erreur backend, toast "error" localisé + bouton redevient actif | ⬜ | ⬜ |
| Pendant soumission, bouton disabled + spinner | ⬜ | ⬜ |
| Bouton disabled (rate limit) : aria-disabled="true" + motif expliqué dans aria-describedby | ⬜ | ⬜ |
| Changements d'état de la page annoncés via aria-live="polite" | ⬜ | ⬜ |
| Tous textes internalisés dans account.rgpd.export.* (fr.json / en.json) | ⬜ | ⬜ |

---
Item Type: US · Parent: F02.3 · Module: auth · Phase: MVP · Size: M · Priority: Medium
Human Gate: human-validated · Stage: Backlog
