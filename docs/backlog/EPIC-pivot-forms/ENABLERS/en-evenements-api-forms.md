# EN42.1c — Événements & API (soumission, webhooks)

**Type d'enabler** : intégration

**Objectif technique** : Exposer les points de sortie du module Forms : **collecte et API de
réponses** (création/lecture des réponses au schéma d'EN42.1a), **émission de l'événement
`form.submitted`** sur le **bus PIVOT** (topic `forms.events.form.submitted`, ADR-025) à chaque
soumission, et **webhooks sortants** vers des systèmes tiers avec protection **anti-SSRF**.
L'orchestration aval (créer une tâche/un risque/un contrat) n'est **pas** dans Forms : Forms émet
l'événement, le bus et Workflow (E29) orchestrent.

> ℹ️ **Gap documenté** : le **runtime** du bus (EN28.4, `EPIC-integration-open-source`) n'est pas
> encore livré (cf. ADR-025). Cet enabler produit et publie `form.submitted` selon le contrat
> ADR-025 (durabilité, at-least-once, minimisation du payload) ; en l'absence du broker,
> l'émission est encapsulée derrière l'abstraction de publication et testable via un double, sans
> perte d'événement à rétablissement.

**Justification** : Forms ne crée de la valeur transverse que s'il expose ses réponses (API) et
notifie les consommateurs (bus + webhooks) sans les coupler à son implémentation. Isoler cette
couche d'intégration protège le cœur (schéma EN42.1a, moteur EN42.1b) de toute dépendance directe
aux consommateurs et concentre la conformité ADR-025 et l'anti-SSRF en un seul lot.

**Hors-périmètre** :
- Modèle de formulaire et validation (EN42.1a)
- Logique conditionnelle et scoring (EN42.1b)
- Thème et intégration embarquée (EN42.1d)
- **Orchestration aval** d'une soumission (tâche/risque/contrat) — portée par le bus et Workflow
  (E29), jamais par Forms
- Runtime du bus d'événements lui-même (EN28.4) — consommé, pas implémenté ici

**Critères de complétion** :
- [ ] Collecte des réponses + API (création d'une réponse validée par EN42.1a, lecture des
  réponses d'un formulaire) filtrée par tenant
- [ ] Émission de `form.submitted` sur le bus PIVOT (topic `forms.events.form.submitted`,
  ADR-025) à chaque soumission, derrière une abstraction de publication (durable, at-least-once)
- [ ] **Minimisation du payload** : le payload de `form.submitted` ne transporte pas le contenu
  complet d'une réponse si le formulaire est classifié sensible (référence + métadonnées)
- [ ] Webhooks sortants configurables par formulaire, déclenchés à la soumission, avec réémission
  en cas d'échec temporaire (au moins une livraison)
- [ ] **Anti-SSRF** sur les webhooks : validation de l'URL cible (schéma autorisé, blocage des
  adresses privées/loopback/link-local/métadonnées cloud, résolution DNS contrôlée)
- [ ] Résilience : l'indisponibilité du bus ou d'un endpoint webhook ne perd pas l'événement (rejeu
  à rétablissement) et n'interrompt pas la collecte

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un formulaire publié et une réponse valide, when la réponse est soumise via l'API,
  then elle est persistée et un événement `form.submitted` est publié sur le topic
  `forms.events.form.submitted` avec le tenant et la référence de réponse.
- [ ] Given un formulaire classifié sensible, when `form.submitted` est émis, then le payload ne
  contient qu'une référence et des métadonnées, jamais le contenu complet des saisies.
- [ ] Given un webhook configuré vers une URL publique valide, when une réponse est soumise, then
  la charge utile est livrée à l'endpoint, avec réémission en cas d'échec temporaire.
- [ ] Error case: given un webhook dont l'URL cible une adresse privée/loopback/métadonnées cloud
  (ex. `169.254.169.254`, `127.0.0.1`, `10.0.0.0/8`), when la livraison est tentée, then elle est
  bloquée par la protection anti-SSRF (`400`/refus) et journalisée, sans requête sortante émise.
- [ ] Security: l'API de réponses et les webhooks sont cloisonnés par tenant — une réponse ou un
  formulaire d'un autre tenant est traité comme inexistant (`404` non-membre/cross-tenant, jamais
  `403` révélateur) ; un membre sans le rôle requis pour lire les réponses reçoit `403`.

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E42 · Module: forms · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Justification: Émission `form.submitted` (bus PIVOT, ADR-025) + collecte/API de réponses + webhooks sortants anti-SSRF (issu de la décomposition d'EN42.1 XL)
Dépendances: EN42.1a (schéma & validation de formulaire) · bus PIVOT (ADR-025 ; runtime EN28.4 = gap documenté)
