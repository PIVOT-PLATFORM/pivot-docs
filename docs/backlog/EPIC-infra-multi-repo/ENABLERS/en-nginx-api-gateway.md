# EN17.7 — nginx API Gateway — routing par préfixe URL

**Type d'enabler** : infrastructure · routing

**Objectif technique** : Configurer nginx comme point d'entrée unique routant les requêtes vers les
4 JVMs indépendantes de l'architecture multi-repo (`pivot-core`, `pivot-collaboratif-core`,
`pivot-pilotage-core`, `pivot-agilite-core`) par préfixe URL, avec support WebSocket sticky
(`ip_hash`), headers de sécurité et log JSON structuré.

**Justification** : Sans ce routing, les différents backends ne sont pas joignables depuis `pivot-ui`
de manière unifiée — chaque module serait accessible sur un port différent, incompatible avec
l'architecture SPA. C'est aussi le mécanisme de fault isolation : un backend KO ne crashe pas le
gateway global, les autres modules continuent à répondre.

**Critères de complétion** :
- [ ] `nginx.conf` avec routing par préfixe URL vers upstream dédié par module :
  ```nginx
  location /api/auth/        { proxy_pass http://pivot-core:8080; }
  location /api/admin/       { proxy_pass http://pivot-core:8080; }
  location /api/superadmin/  { proxy_pass http://pivot-core:8080; }
  location /api/pilotage/    { proxy_pass http://pivot-pilotage-core:8081; }
  location /api/agilite/     { proxy_pass http://pivot-agilite-core:8082; }
  location /api/collaboratif/ { proxy_pass http://pivot-collaboratif-core:8083; }
  location /ws/pilotage/     { proxy_pass http://pivot-pilotage-core:8081; # ip_hash }
  location /ws/agilite/      { proxy_pass http://pivot-agilite-core:8082;  # ip_hash }
  location /ws/collaboratif/ { proxy_pass http://pivot-collaboratif-core:8083; # ip_hash }
  location /                 { try_files $uri $uri/ /index.html; }  # SPA Angular
  ```
- [ ] Upstream `ip_hash` pour les WebSocket (`/ws/**`) — sticky session au handshake
- [ ] Upstream `round-robin` pour les REST (`/api/**`)
- [ ] `proxy_read_timeout`, `proxy_send_timeout` configurés (défaut 60s, 300s pour WS)
- [ ] Headers WebSocket : `Upgrade`, `Connection` propagés correctement
- [ ] `503` retourné proprement si backend KO — pas de crash global
- [ ] Headers sécurité sur toutes les réponses : `Strict-Transport-Security`, `X-Frame-Options DENY`,
  `X-Content-Type-Options nosniff`, `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy`
- [ ] Redirect `:80 → :443` (HTTPS enforced)
- [ ] Log format JSON structuré (module extractable du préfixe URL)
- [ ] Test : arrêter `pivot-collaboratif-core` → `/api/auth/` répond 200 · `/api/collaboratif/` répond 503

**Dépendances** : EN07.1 (Docker Compose multi-repo), EN17.1–6 (libs partagées)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: core · Phase: Socle (reséquencé 2026-07-07, ex-phase-3)
Stage: Review · Priority: Critical · Sprint: 5 · Done: 2026-07-07 (pivot-ui #114 + pivot-core #170)
