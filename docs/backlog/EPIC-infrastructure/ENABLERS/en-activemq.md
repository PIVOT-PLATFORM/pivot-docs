# EN07.3 — ActiveMQ persistence KahaDB (multi-repo)

**Type d'enabler** : infrastructure · messaging

**Objectif technique** : Garantir qu'aucun message du bus événementiel PIVOT (STOMP/ActiveMQ,
cross-module) n'est perdu au redémarrage/crash du broker, en persistant sur disque (KahaDB) au
lieu du mode volatile actuel, et isoler les topics par domaine pour empêcher qu'un module reçoive
les événements d'un autre.

**Justification** : Le broker ActiveMQ du compose dev (EN17.9) tourne en mode volatile et sans
isolation de topics — acceptable en dev, mais en l'état : perte de message silencieuse au moindre
restart en prod, et risque de couplage involontaire entre domaines (pilotage/agilite/collaboratif)
via le bus partagé. Pré-requis du jalon « Socle terminé » (`sprint-6.md` Axe 1 — Prod).

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
Item Type: Enabler · Parent: E07 · Type: infrastructure · Module: core · Phase: Socle
Stage: Ready · Priority: High
