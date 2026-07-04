# EN07.2 — Secret management Docker secrets

**Type d'enabler** : sécurité · infrastructure

**Critères de complétion** :
- [ ] Tous les secrets injectés via Docker secrets (fichiers `/run/secrets/`) ou variables d'env chiffrées
- [ ] Zéro secret en clair dans `docker-compose.prod.yml` ou images
- [ ] `.env.example` documenté avec toutes les variables requises
- [ ] Spring Boot lit les secrets via `${SECRET_FILE_PATH}` ou profil `prod`
- [ ] Rotation des secrets : procédure documentée

**Statut** : ⬜ À faire — Gate: Backlog

---
Item Type: Enabler · Parent: E07 · Type: sécurité · Module: core · Phase: MVP
Stage: Backlog · Priority: Critical
