# EN17.7 — nginx API Gateway — routing par préfixe URL

**Type d'enabler** : infrastructure · routing

**Contexte** : L'architecture multi-repo déploie 4 JVMs indépendantes. nginx doit router chaque requête vers
le backend correspondant selon son préfixe URL. C'est le mécanisme de fault isolation.

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
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: core · Phase: phase-3
Stage: Backlog · Priority: High
