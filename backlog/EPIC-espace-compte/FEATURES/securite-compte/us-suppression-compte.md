# US02.2.4 — Suppression de compte (RGPD)

**En tant que** utilisateur
**Je veux** pouvoir supprimer définitivement mon compte
**Afin d'** exercer mon droit à l'effacement (RGPD Art.17)

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| DELETE /api/account confirme suppression avec mot de passe actuel | ⬜ | ⬜ |
| Données personnelles anonymisées ou supprimées selon politique RGPD | ⬜ | ⬜ |
| Tous les tokens de session révoqués immédiatement | ⬜ | ⬜ |
| Email de confirmation de suppression envoyé | ⬜ | ⬜ |
| Délai de grâce configurable (ex: 30 jours avant purge effective) | ⬜ | ⬜ |
| Page Angular avec confirmation par mot de passe + alerte irréversibilité | ⬜ | ⬜ |
| Audit event enregistré (AccountDeleted) | ⬜ | ⬜ |
| Pour comptes à auth_mode OIDC (sans mot de passe local) : confirmation via OTP 6 chiffres envoyé par email (TTL 10min). DELETE /api/account sans confirmation valide → 403 | ⬜ | ⬜ |
| Dès la demande de suppression (avant fin du délai de grâce) : tous tokens révoqués immédiatement, compte passe en statut PENDING_DELETION inaccessible en lecture par les admins | ⬜ | ⬜ |
| Politique RGPD précise : email anonymisé en deleted-{uuid}@pivot.invalid, prénom/nom mis à null, avatar supprimé, sessions révoquées, audit events conservés 1 an puis purgés | ⬜ | ⬜ |
| Pendant le délai de grâce, compte désactivé (401 à toute connexion). L'utilisateur peut annuler via lien dans l'email | ⬜ | ⬜ |
| Email de confirmation avec date effective de suppression envoyé dès la demande | ⬜ | ⬜ |
| Bannière persistante pendant le délai de grâce rappelle la date de suppression effective et propose "Annuler la suppression" | ⬜ | ⬜ |
| Dialog de confirmation en 2 étapes : (1) alerte irréversibilité avec liste des données supprimées, (2) saisie mot de passe pour confirmer | ⬜ | ⬜ |
| Bouton de suppression finale libellé "Supprimer définitivement mon compte" — pas "Confirmer" générique. Bouton de couleur destructive (rouge) | ⬜ | ⬜ |
| Dialog : role="alertdialog", aria-modal="true", aria-labelledby="dialog-title" (titre : "Suppression définitive du compte"), focus trap actif dès ouverture | ⬜ | ⬜ |
| Fermeture dialog possible via Échap ; focus retourné sur le bouton déclencheur | ⬜ | ⬜ |
| Tous textes internalisés dans account.deletion.* (fr.json / en.json) | ⬜ | ⬜ |

## Hors périmètre
- Réactivation → US02.2.5 (v1-enterprise)

---
Item Type: US · Parent: F02.2 · Module: auth · Phase: MVP · Size: M · Priority: Medium
Human Gate: human-validated · Stage: Backlog
