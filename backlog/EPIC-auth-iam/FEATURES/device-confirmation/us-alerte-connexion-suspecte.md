# US01.4.3a — Alerte connexion suspecte (appareil inconnu)

**En tant que** utilisateur
**Je veux** recevoir une alerte email quand une connexion depuis un nouvel appareil inconnu est détectée
**Afin de** réagir rapidement en cas de compromission

## Critères d'acceptation

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| Détection basée sur le fingerprint d'appareil inconnu (hors géolocalisation IP — périmètre MVP uniquement) | ⬜ | ⬜ |
| Email d'alerte envoyé avec : appareil, date/heure, lien "Pas moi" (OTP à usage unique TTL 1h) | ⬜ | ⬜ |
| Pas d'alerte si appareil de confiance déjà connu | ⬜ | ⬜ |
| Alerte journalisée (audit event SuspiciousLoginDetected) | ⬜ | ⬜ |
| Tests TU SuspiciousLoginService (mock fingerprint inconnu) | ⬜ | ⬜ |
| Détection basée uniquement sur le fingerprint d'appareil (pas de géolocalisation IP en MVP) | ⬜ | ⬜ |
| Le fingerprint d'appareil de confiance est stocké en BDD (lié au userId, pas uniquement côté client). Suppression du cookie n'entraîne pas la suppression de l'approbation BDD | ⬜ | ⬜ |
| Le lien "Pas moi" dans l'email est un OTP à usage unique (TTL 1h) qui redirige vers une page de ré-authentification complète (mot de passe actuel obligatoire) — ne déclenche pas directement de changement sans authentification | ⬜ | ⬜ |
| Pas d'alerte si appareil de confiance déjà connu en BDD (pas basé sur cookie seul) | ⬜ | ⬜ |

---
Item Type: US · Parent: F01.4 · Module: auth · Phase: MVP · Size: S · Priority: Medium · Note: US01.4.3b (alerte IP/géo) → v1-enterprise
Human Gate: human-validated · Stage: Backlog
