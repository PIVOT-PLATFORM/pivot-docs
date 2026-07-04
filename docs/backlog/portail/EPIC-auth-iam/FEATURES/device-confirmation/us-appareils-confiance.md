# US01.4.2 — Gestion des appareils de confiance

**En tant que** utilisateur
**Je veux** voir et révoquer mes appareils de confiance
**Afin de** contrôler quels appareils ne nécessitent pas de vérification OTP

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| GET /api/auth/devices liste les appareils de confiance (nom, IP, date) | ⬜ |
| DELETE /api/auth/devices/{deviceId} révoque un appareil | ⬜ |
| Page Angular dans l'espace compte affiche la liste | ⬜ |
| Appareil courant mis en évidence (non révocable depuis la liste) | ⬜ |
| Tests TI GET/DELETE /api/auth/devices | ⬜ |
| La réponse GET /api/auth/devices retourne un champ isCurrent: boolean sur l'appareil de la session courante | ⬜ |
| DELETE sur l'appareil courant retourne 403 côté API (protection backend, pas uniquement UI) | ⬜ |
| La révocation d'un appareil déclenche une notification email (US01.5.1) | ⬜ |
| Dépendance explicite : un appareil devient "de confiance" uniquement après confirmation OTP via US01.4.1 | ⬜ |

---
Item Type: US · Parent: F01.4 · Module: auth · Phase: MVP · Size: M · Priority: Medium
Stage: Backlog
