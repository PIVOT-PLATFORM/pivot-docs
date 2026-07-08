# EN17.9 — Compose dev : modules satellites manquants

**Type d'enabler** : infrastructure · dev experience

**Objectif technique** : Ajouter `pivot-pilotage-core`, `pivot-agilite-core` et
`pivot-collaboratif-core` comme services du `compose.yml` de développement (`pivot-core`), au
même titre que `backend`/`frontend`/`postgres`/`redis`/`mailpit` déjà présents.

**Justification** : `pivot-ui/nginx.conf` (EN17.7) route déjà `/api/pilotage/`, `/api/agilite/`,
`/api/collaboratif/` et leurs équivalents `/ws/**` vers `pivot-pilotage-core:8081`,
`pivot-agilite-core:8082`, `pivot-collaboratif-core:8083` — mais `compose.yml` ne démarrait
jamais ces trois services. En dev, la gateway répondait donc systématiquement 503 sur ces
préfixes (comportement de repli documenté par EN17.7, mais qui masquait un vrai gap : aucun
développeur ne pouvait faire tourner la stack complète localement). Trouvé en vérifiant l'état
réel de `compose.yml` (2026-07-08) — absent du backlog jusqu'ici, gap confirmé, pas une
duplication d'un enabler existant.

**Critères de complétion** :
- [x] Service `pivot-pilotage-core` dans `compose.yml` — build `../pivot-pilotage-core`, nom de
  service = hostname attendu par nginx (pas d'alias réseau nécessaire, contrairement à `backend`)
- [x] Service `pivot-agilite-core` dans `compose.yml` — même pattern
- [x] Service `pivot-collaboratif-core` dans `compose.yml` — même pattern
- [x] Chaque service pointe vers le `postgres`/`redis` partagés du compose dev (`pivot_dev`,
  schéma dédié par module via `hibernate.default_schema`) par override d'environnement — même
  convention que le service `backend` existant
- [x] Healthcheck par service — `wget` (présent dans l'image `eclipse-temurin:*-jre-alpine` de
  chacun des trois Dockerfiles, vérifié), ciblant `/actuator/health` **avec le context-path
  inclus** : aucun des trois modules n'isole aujourd'hui son actuator sur un
  `management.server.port` séparé (contrairement à `pivot-core`, cf. `audit-observabilite.md`),
  donc l'actuator répond sous le même préfixe que l'API
- [x] Bug connexe corrigé en cours de route : `pivot-pilotage-core` déclarait
  `context-path: /api` au lieu de `/api/pilotage` — nginx proxifie sans réécriture de préfixe
  (même pattern que `pivot-collaboratif-core`, déjà correct), donc tout endpoint métier futur
  aurait été inaccessible via la gateway sans ce correctif (`pivot-pilotage-core#18`)
- [x] `frontend` (nginx) dépend désormais des trois services satellites en plus de `backend`
- [x] Vérification réelle bout-en-bout (pas seulement `docker compose config`) :
  `docker compose up -d --build` → les 3 services démarrent `healthy` ;
  `curl http://localhost/api/{pilotage,agilite,collaboratif}/actuator/health` → `200` via la
  gateway nginx pour les 3

**Hors périmètre (trouvé en cours de route, suivi séparément)** : `pivot-core` (`backend`)
présente un bug Flyway pré-existant, sans rapport avec ce changement — checksum de
`V1__schema_init.sql` non-déterministe entre le premier `migrate()` réussi et tous les
`validate()` suivants, reproduit sur une image identique (bytes du fichier de migration
vérifiés identiques via `sha256sum`, pas de doublon de migration, pas de construction
PL/pgSQL). Signalé au mainteneur, pas corrigé par cet Enabler.

**Dépendances** : EN17.7 (nginx API Gateway — routing déjà en place, ce qui manquait était
uniquement le démarrage des backends côté compose dev)

**Statut** : ✅ Done — `pivot-core#179`

---
Item Type: Enabler · Parent: E17 · Type: infrastructure · Module: core · Phase: Socle
Stage: Review · Priority: High · Sprint: 5 · Done: 2026-07-08 (pivot-core #179 + pivot-pilotage-core #18)
