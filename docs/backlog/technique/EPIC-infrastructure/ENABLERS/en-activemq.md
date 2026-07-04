# EN07.3 — ActiveMQ persistence KahaDB (multi-repo)

**Type d'enabler** : infrastructure · messaging

**Critères de complétion** :
- [ ] ActiveMQ Classic configuré avec KahaDB (persistence des messages)
- [ ] Volume Docker monté sur `/var/lib/activemq/data`
- [ ] Topics STOMP isolés par domaine :
  - `/topic/pilotage/**` → souscrit par `pivot-pilotage-core` uniquement
  - `/topic/agilite/**` → souscrit par `pivot-agilite-core` uniquement
  - `/topic/collaboratif/**` → souscrit par `pivot-collaboratif-core` uniquement
- [ ] `enableStompBrokerRelay()` configuré dans **chaque** module-core (pas dans pivot-core)
- [ ] Dead Letter Queue (DLQ) configurée par domaine (`DLQ.pilotage`, `DLQ.agilite`, `DLQ.collaboratif`)
- [ ] Limites mémoire/disque configurées (memoryUsage, storeUsage)
- [ ] Console ActiveMQ :8161 non exposée à nginx (accès interne uniquement)
- [ ] pivot-core NE souscrit PAS à ActiveMQ (pas de WS dans le shell)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E07 · Type: infrastructure · Module: core · Phase: MVP
Stage: Backlog · Priority: High
