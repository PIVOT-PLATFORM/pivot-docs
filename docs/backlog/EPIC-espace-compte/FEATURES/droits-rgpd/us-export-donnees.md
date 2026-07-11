# US02.3.1 — Export de ses données personnelles

**En tant que** utilisateur
**Je veux** exporter toutes mes données personnelles stockées par PIVOT
**Afin d'** exercer mon droit à la portabilité (RGPD Art.20)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| POST /api/account/export déclenche génération d'une archive (JSON ou ZIP) | ✅ |
| Archive contient : profil, sessions, audit events, données modules | ✅ *(profil/sessions/audit events — données modules différées, cf. ligne Socle ci-dessous)* |
| Lien de téléchargement envoyé par email (TTL 24h) | ✅ |
| Traitement asynchrone (pas de blocage UI) | ✅ *(Spring `@Async`, pas de nouvelle queue)* |
| Rate limit : 1 export / 24h par utilisateur | ✅ |
| Page Angular avec bouton "Demander mon export" + statut | ✅ |
| Audit event enregistré (DataExportRequested) | ✅ |
| Lien de téléchargement requiert session authentifiée ET vérifie que userId de la session = userId propriétaire de l'export. Tentative par un autre userId → 403 | ✅ |
| Téléchargement via endpoint authentifié /api/account/export/download/{exportToken} — pas de lien signé public (pas de S3 presigned URL sans auth) | ✅ |
| L'archive contient uniquement les données dont l'utilisateur est le sujet. Les audit events inclus ne contiennent pas de données personnelles d'autres utilisateurs (email admin → rôle ou ID anonymisé) | ✅ *(testé à 3 niveaux : unitaire, octets d'archive, bout-en-bout)* |
| Socle : l'archive contient profil, sessions, audit events. Données des modules collaboratifs dans une phase ultérieure | ✅ |
| Si demande en cours ou < 24h écoulées, bouton disabled avec message : "Prochain export disponible à HH:MM" | ✅ |
| Après clic, page affiche état "Demande reçue" avec estimation ("Vous recevrez un email dans quelques minutes") | ✅ |
| En cas d'erreur backend, toast "error" localisé + bouton redevient actif | ✅ |
| Pendant soumission, bouton disabled + spinner | ✅ |
| Bouton disabled (rate limit) : aria-disabled="true" + motif expliqué dans aria-describedby | ✅ |
| Changements d'état de la page annoncés via aria-live="polite" | ✅ |
| Tous textes internalisés dans account.rgpd.export.* (fr.json / en.json) | ✅ |

## Notes de livraison

- Implémenté : `pivot-core` PR [#133](https://github.com/PIVOT-PLATFORM/pivot-core/pull/133) (Gate 2 self-évalué : 95/100) · `pivot-ui` PR [#75](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/75) (Gate 2 self-évalué : 98/100).
- `GET /api/account/export/status` ajouté au-delà des deux endpoints littéralement cités par l'AC, pour permettre l'affichage "Prochain export disponible à HH:MM" côté frontend — à confirmer par le PO.
- Téléchargement authentifié implémenté côté Angular via `HttpClient` en `responseType: 'blob'` (l'en-tête Authorization ne peut pas être porté par un simple lien `<a href>`) déclenchant l'enregistrement navigateur.
- Stockage de l'archive : filesystem local (cohérent avec le choix pour les avatars, US02.1.1).

---
Item Type: US · Parent: F02.3 · Module: auth · Phase: Socle · Size: M · Priority: Medium
Stage: ✅
Rôle: utilisateur-final
Gate 5 : `pivot-core` PR [#133](https://github.com/PIVOT-PLATFORM/pivot-core/pull/133) (Gate 4 = 97/100) · `pivot-ui` PR [#75](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/75) (Gate 4 = 94/100), spec figée `docs/specs/EPIC-espace-compte/us02-3-1-export-donnees.md` (rétroactif, 2026-07-08)
