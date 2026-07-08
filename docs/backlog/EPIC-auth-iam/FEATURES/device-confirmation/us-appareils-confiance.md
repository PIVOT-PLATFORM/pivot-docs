# US01.4.2 — Gestion des appareils de confiance

**En tant que** utilisateur
**Je veux** voir et révoquer mes appareils de confiance
**Afin de** contrôler quels appareils ne nécessitent pas de vérification OTP

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| GET /api/auth/devices liste les appareils de confiance (nom, IP, date) | ✅ |
| DELETE /api/auth/devices/{deviceId} révoque un appareil | ✅ |
| Page Angular dans l'espace compte affiche la liste | ✅ |
| Appareil courant mis en évidence (non révocable depuis la liste) | ✅ |
| Tests TI GET/DELETE /api/auth/devices | ✅ |
| La réponse GET /api/auth/devices retourne un champ isCurrent: boolean sur l'appareil de la session courante | ✅ |
| DELETE sur l'appareil courant retourne 403 côté API (protection backend, pas uniquement UI) | ✅ |
| La révocation d'un appareil déclenche une notification email (US01.5.1) | 🔄 |
| Dépendance explicite : un appareil devient "de confiance" uniquement après confirmation OTP via US01.4.1 | ✅ |

## Notes de livraison

- Implémenté : `pivot-core` PR [#152](https://github.com/PIVOT-PLATFORM/pivot-core/pull/152) (Gate 4 self-évalué : 100/100, `MERGE_AUTONOMOUS`) · `pivot-ui` PR [#100](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/100) (Gate 4 self-évalué : 93/100, `MERGE_AUTONOMOUS` — seule perte de points : spec Playwright différée, cf. précédent US02.2.3 "sessions actives" qui n'en a pas non plus, écran équivalent en couverture Vitest seule).
- Réutilise l'entité `TrustedDevice`/`TrustedDeviceService`/`TrustedDeviceRepository` existante (US01.4.1) — lecture/suppression uniquement, aucune nouvelle logique d'octroi de confiance. Le champ `ip_address` (déjà présent dans `V1__schema_init.sql` mais non mappé) a été ajouté à l'entité et n'est renseigné qu'à la confirmation OTP (`trust()`), jamais mis à jour ensuite — mêmes sémantiques que `SessionDto.ip` (IP à la création, pas une valeur "live").
- "Appareil courant" résolu via le même mécanisme que les sessions actives (US02.2.3) : id de l'`AccessToken` de la requête courante (`TokenAuthenticationFilter.CURRENT_TOKEN_ID_ATTRIBUTE`), puis comparaison de son `deviceFingerprint` à celui de chaque appareil de confiance — il n'existe pas de header/cookie dédié au fingerprint sur les requêtes hors login.
- **AC "notification email" (🔄 partiel)** : dépend de US01.5.1 (`SecurityNotificationService`), implémentée en parallèle par un autre agent — absente de `origin/main` à la fin de cette implémentation. `TrustedDeviceService.revokeDevice(...)` publie un événement de domaine `fr.pivot.auth.event.TrustedDeviceRevokedEvent` via `ApplicationEventPublisher` après suppression de l'appareil ; aucun listener n'est encore branché. **Point d'intégration ouvert** pour qui termine US01.5.1 — pas un raccourci silencieux, documenté explicitement dans la PR pivot-core #152. Cette US repassera à `Stage: Done` seulement une fois le listener branché et vérifié (ou le PO acceptera explicitement l'event-driven fallback comme définition de "notification déclenchée" — à trancher en recette).

---
Item Type: US · Parent: F01.4 · Module: auth · Phase: Socle · Size: M · Priority: Medium
Stage: Review
Gate 5 : `pivot-core` PR [#152](https://github.com/PIVOT-PLATFORM/pivot-core/pull/152) (Gate 4 = 100/100) · `pivot-ui` PR [#100](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/100) (Gate 4 = 93/100), spec figée `docs/specs/EPIC-auth-iam/us01-4-2-gestion-appareils-confiance.md` (rétroactif, 2026-07-08)
