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
- [x] ActiveMQ Classic configuré avec KahaDB (persistence des messages)
- [x] Volume Docker monté sur `/var/lib/activemq/data`
- [x] Topics STOMP isolés par domaine (convention hiérarchie par points, ex. `/topic/pilotage.event`
      — le wildcard `>` d'ActiveMQ, nécessaire à la policyEntry DLQ, ne matche que des segments
      séparés par des points, pas des slashes) :
  - `/topic/pilotage.**` → souscrit par `pivot-pilotage-core` uniquement
  - `/topic/agilite.**` → souscrit par `pivot-agilite-core` uniquement
  - `/topic/collaboratif.**` → souscrit par `pivot-collaboratif-core` uniquement
- [x] `enableStompBrokerRelay()` configuré dans **chaque** module-core (pas dans pivot-core)
- [x] Dead Letter Queue (DLQ) configurée par domaine (`DLQ.pilotage`, `DLQ.agilite`, `DLQ.collaboratif`)
- [x] Limites mémoire/disque configurées (memoryUsage, storeUsage)
- [x] Console ActiveMQ :8161 non exposée à nginx — enforcement structurel en prod (réseau
      `pivot-net-data` uniquement, aucun port publié), pas juste l'absence d'un location nginx
- [x] pivot-core NE souscrit PAS à ActiveMQ (pas de WS dans le shell)

**Implémentation** :
[pivot-core#193](https://github.com/PIVOT-PLATFORM/pivot-core/pull/193) (broker, KahaDB, compose
dev/prod, `ci.yml` compose-validate étendu),
[pivot-pilotage-core#21](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/21),
[pivot-agilite-core#19](https://github.com/PIVOT-PLATFORM/pivot-agilite-core/pull/19),
[pivot-collaboratif-core#35](https://github.com/PIVOT-PLATFORM/pivot-collaboratif-core/pull/35)
(un `enableStompBrokerRelay()` par module-core) — les 4 mergées.

**Statut** : ✅ Review — recette mainteneur → Done

---
Item Type: Enabler · Parent: E07 · Type: infrastructure · Module: core · Phase: Socle
Stage: Review · Priority: High
