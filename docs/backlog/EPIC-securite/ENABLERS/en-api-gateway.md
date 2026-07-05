# EN43.2 — API Gateway (nord-sud)

**Type d'enabler** : architecture · sécurité

**Contexte** : Point d'entrée unique et contrôlé du trafic entrant (utilisateur/externe → portail — trafic « nord-sud »). Rien n'entre sans passer par là.

**Critères de complétion** :
- [ ] Authentification systématique en entrée (token utilisateur validé)
- [ ] Limitation de débit et quotas anti-abus
- [ ] WAF actif (règles OWASP de base)
- [ ] Validation de schéma des requêtes
- [ ] Terminaison TLS 1.2+ en entrée

**Dépendances** : ADR-004 (identité), EN01.1 (opaque tokens)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: architecture · Module: securite · Phase: phase-3
Stage: Backlog · Priority: Highest
