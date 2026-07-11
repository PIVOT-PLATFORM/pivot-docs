# US14.2.1 — Effectuer un tirage pondéré anti-repeat

**En tant que** animateur
**Je veux** effectuer un tirage aléatoire pondéré anti-repeat
**Afin d'** éviter que le même participant soit tiré deux fois de suite

Prolonge US14.1.1 (roue/entrées/poids déjà en place, marqueur `lastDrawnEntryId` posé à `null` sur
`wheel` en prévision de cette US). Ne couvre que le tirage lui-même — diffusion temps réel
(WebSocket) et animation de rotation sont hors périmètre, couvertes par US14.3.1.

## Critères d'acceptation

### Tirage pondéré (backend `pivot-agilite-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une roue accessible à l'appelant avec ≥ 1 entrée, when `POST /api/agilite/wheels/{wheelId}/spin` (corps optionnel, voir AC anti-repeat ci-dessous), then l'API répond 201 avec `{ wheelId, entryId, label, drawnAt, antiRepeatMode }` — `entryId`/`label` désignant l'entrée tirée, `drawnAt` l'horodatage serveur (ISO-8601), `antiRepeatMode` le mode effectivement appliqué (`"exclude"` ou `"reduced_weight"`) | ⬜ |
| Given le tirage réalisé, when la réponse est construite, then `wheel.lastDrawnEntryId` est mis à jour en base avec l'`entryId` tiré (persistant, lu par le tirage suivant pour l'anti-repeat, et par US14.3.1 pour l'affichage) | ⬜ |
| Given une roue dont toutes les entrées ont un poids égal (ex. toutes à 1, cas par défaut d'US14.1.1), when de nombreux tirages sont effectués sans anti-repeat actif (`lastDrawnEntryId` nul), then chaque entrée a une probabilité de tirage sensiblement égale (référence : test statistique ci-dessous) | ⬜ |
| Given une roue dont les entrées ont des poids différents (1 à 10, ex. `[1, 2, 3, 4]`), when le tirage est effectué, then la probabilité de sélection de chaque entrée est proportionnelle à son poids parmi la somme des poids effectifs de la roue (poids effectif = poids nominal, sauf ajustement anti-repeat ci-dessous) | ⬜ |
| Given l'algorithme de sélection pondérée, when il est implémenté, then il est exposé comme une fonction pure testable indépendamment de la persistance (prend en entrée la liste des entrées, leurs poids effectifs, et une source aléatoire injectable — voir Notes d'implémentation) — condition nécessaire au test statistique ci-dessous sans dépendre de Testcontainers pour 1000 itérations | ⬜ |

### Anti-repeat (configurable exclude / poids réduit)

> **Clarification Gate 1 (ambiguïté du stub) :** le mode anti-repeat est un **paramètre de la
> requête `spin`**, pas un champ persistant ajouté au modèle `wheel` d'US14.1.1 (qui ne le prévoit
> pas — voir Hors périmètre). Chaque appel `spin` choisit son mode ; l'animateur ré-applique le
> même choix à chaque tirage côté frontend s'il veut de la cohérence dans une session donnée.

| Critère | 🤖 Dev |
|---------|--------|
| Given un corps de requête omis ou `{}` sur `POST /spin`, when le tirage est effectué, then le mode anti-repeat appliqué est `reduced_weight` (défaut serveur) | ⬜ |
| Given un corps `{ "antiRepeatMode": "reduced_weight" }` et `wheel.lastDrawnEntryId` non nul et référençant une entrée existante de la roue, when le tirage est effectué, then le poids effectif de cette entrée pour ce tirage est `max(1, floor(poids / 5))` (division entière, plancher 1) — toutes les autres entrées gardent leur poids nominal | ⬜ |
| Given un corps `{ "antiRepeatMode": "exclude" }` et `wheel.lastDrawnEntryId` non nul et référençant une entrée existante de la roue, when le tirage est effectué, then le poids effectif de cette entrée pour ce tirage est `0` (exclue du pool de tirage) | ⬜ |
| Given `antiRepeatMode = "exclude"` et la roue ne contenant qu'une seule entrée, laquelle est `wheel.lastDrawnEntryId`, when le tirage est effectué, then l'exclusion est ignorée pour ce tirage (repli automatique : le pool ne peut pas être vidé intégralement) et cette entrée unique est tirée normalement — jamais d'erreur bloquante tant que la roue a ≥ 1 entrée | ⬜ |
| Given `wheel.lastDrawnEntryId` nul (aucun tirage précédent, ou premier tirage de la roue) ou référençant une entrée qui n'existe plus (supprimée depuis via `PUT /wheels/{id}`), when le tirage est effectué, then aucun ajustement anti-repeat n'est appliqué (tous les poids nominaux, comme un premier tirage) | ⬜ |

### Historique des tirages

| Critère | 🤖 Dev |
|---------|--------|
| Given chaque tirage réalisé avec succès, when le résultat est calculé, then une ligne est persistée en BDD (schéma `agilite`, nouvelle table `wheel_draw`) avec au minimum `wheelId`, `entryId`, `timestamp` (`drawnAt`) — voir Notes d'implémentation pour le schéma complet (inclut un `label` figé, voir justification) | ⬜ |
| Given une roue accessible à l'appelant ayant au moins un tirage, when `GET /api/agilite/wheels/{wheelId}/draws` (sans paramètre), then la réponse 200 liste les 20 derniers tirages (`entryId`, `label`, `drawnAt`), triés du plus récent au plus ancien | ⬜ |
| Given le paramètre `?limit=N` sur `GET .../draws`, when `N` est un entier entre 1 et 100, then la réponse contient au maximum `N` tirages (les plus récents) | ⬜ |
| Given une roue accessible sans aucun tirage effectué, when `GET .../draws`, then la réponse 200 renvoie une liste vide (pas d'erreur) | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given une roue avec 0 entrée (ne devrait pas se produire — US14.1.1 interdit une roue sans entrée à la création/mise à jour ; garde défensive uniquement), when `POST /spin`, then 409 `{ code: "EMPTY_WHEEL" }` — jamais de division par zéro sur la somme des poids | ⬜ |
| Error : given un corps `{ "antiRepeatMode": "<valeur invalide>" }` (ni `"exclude"` ni `"reduced_weight"`), when `POST /spin`, then 400 `{ code: "INVALID_ANTI_REPEAT_MODE" }` | ⬜ |
| Error : given `?limit=` avec une valeur non entière, `< 1` ou `> 100`, when `GET .../draws`, then 400 `{ code: "INVALID_LIMIT" }` | ⬜ |
| Error : given un `wheelId` inexistant, appartenant à un autre tenant, ou dont l'appelant n'est pas membre de l'équipe, when `POST /spin` ou `GET /draws`, then 404 (même convention anti-énumération qu'US14.1.1 — jamais 403) | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : `tenantId`/`userId` résolus exclusivement depuis le principal authentifié (`RequestPrincipal`, token porteur) sur `spin` et `draws` — jamais acceptés depuis le corps, un query param ou un header custom | ⬜ |
| Security : `{wheelId}` du path systématiquement vérifié comme appartenant au tenant **et** à l'équipe de l'appelant avant tout traitement (`spin`, `draws`) → 404 sinon, réutilisant la vérification d'accès d'US14.1.1 (`WheelService`/`WheelNotFoundException`) | ⬜ |
| Security : test TI cross-tenant obligatoire sur `POST /spin` et `GET /draws` | ⬜ |
| Security : le corps de `POST /spin` n'accepte que le champ `antiRepeatMode` (valeurs enum strictes) — aucun champ permettant d'influencer `wheelId`/`entryId`/poids depuis la requête (le tirage est entièrement calculé serveur, jamais fourni par le client) | ⬜ |

### Tests statistiques (non-régression de l'algorithme pondéré)

| Critère | 🤖 Dev |
|---------|--------|
| Given une roue de 4 entrées de poids `[1, 2, 3, 4]` (somme 10) et aucun ajustement anti-repeat, when la fonction de sélection pondérée est invoquée 1000 fois indépendamment (TU pur, pas de TI/Testcontainers), then la fréquence observée de chaque entrée reste à ± 5 points de pourcentage de sa part théorique (10 %/20 %/30 %/40 %) — un tirage uniforme (bug ignorant les poids) donnerait 25 % chacun et échouerait cette assertion sur au moins une entrée | ⬜ |
| Given une roue de 2 entrées de poids égal (5 et 5) et l'entrée A marquée `lastDrawnEntryId`, when 1000 tirages indépendants sont simulés en mode `reduced_weight` (poids effectif de A = `max(1, 5/5)` = 1, B reste à 5, part théorique de A ≈ 1/6 ≈ 16,7 %), then la fréquence observée de A reste à ± 5 points de la part théorique (soit environ 11,7 %–21,7 %) et est significativement inférieure à 50 % | ⬜ |
| Given la même roue en mode `exclude`, when 1000 tirages indépendants sont simulés avec A marquée `lastDrawnEntryId`, then A n'est jamais sélectionnée (0 occurrence sur 1000) | ⬜ |

### Frontend (`pivot-agilite-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| Given la page de détail d'une roue avec ≥ 1 entrée, when l'utilisateur clique sur le bouton « Lancer le tirage », then le bouton est désactivé le temps de la requête (`POST /spin`) pour empêcher un double-tirage par double-clic | ⬜ |
| Given la réponse 201 du tirage, when elle revient, then le nom (`label`) de l'entrée tirée s'affiche visuellement de façon proéminente (zone dédiée, pas seulement un toast éphémère) | ⬜ |
| Given une erreur réseau ou 5xx sur `POST /spin`, when la requête échoue, then un toast d'erreur (`role="alert"`) s'affiche, le bouton « Lancer le tirage » redevient actif, et aucun état de résultat obsolète n'est laissé affiché comme s'il s'agissait du nouveau tirage | ⬜ |
| Given un sélecteur de mode anti-repeat exposé dans l'UI (`exclude` / poids réduit, défaut poids réduit), when l'utilisateur le change, then la valeur choisie est envoyée dans `antiRepeatMode` du prochain `POST /spin` — pas de persistance de ce choix côté serveur (voir Hors périmètre), un simple état de composant (signal) suffit | ⬜ |
| Given un historique des tirages affiché sur la page (alimenté par `GET .../draws`), when un nouveau tirage réussit, then la liste affichée est rafraîchie pour inclure le nouveau tirage en tête | ⬜ |

### A11y

| Critère | 🤖 Dev |
|---------|--------|
| A11y : la zone de résultat du tirage est une région `aria-live="polite"` (mise à jour de texte, pas de contenu supprimé/recréé) — le lecteur d'écran annonce automatiquement le nom de l'entrée tirée sans que l'utilisateur ait à naviguer jusqu'à la zone | ⬜ |
| A11y : le bouton « Lancer le tirage » et le sélecteur de mode anti-repeat sont entièrement navigables au clavier, focus visible, libellés associés (`for`/`aria-labelledby`) | ⬜ |
| A11y : l'état désactivé du bouton pendant la requête est exposé (`aria-disabled` ou `disabled` natif + libellé « Tirage en cours » via Transloco, pas seulement un indicateur visuel) | ⬜ |
| A11y : tous les libellés (bouton, sélecteur, messages, historique) externalisés via Transloco (`fr.json`/`en.json`) — aucune chaîne littérale dans les templates | ⬜ |

## Hors périmètre

- Diffusion temps réel du résultat (WebSocket/STOMP, `SPIN_RESULT` sur `/topic/collaboratif/roue/{wheelId}`) — couverte par US14.3.1, qui dépend de cette US et consomme directement la forme de réponse `{ wheelId, entryId, label, drawnAt }` définie ici
- Animation de rotation de la roue (rotation CSS avant affichage du résultat, durée configurable 3–5 s) — couverte par US14.3.1 ; cette US affiche le résultat dès réception de la réponse HTTP, sans animation obligatoire (une transition simple est acceptable mais non spécifiée ici)
- Persistance du mode anti-repeat par défaut au niveau de la roue (champ sur `wheel`) — décision Gate 1 : paramètre de requête uniquement (voir clarification ci-dessus), pas d'évolution du modèle `wheel` d'US14.1.1 dans cette US
- Purge, rétention limitée ou TTL de la table `wheel_draw` — toutes les lignes sont conservées indéfiniment ; seule la restitution via `GET .../draws` est bornée par `limit`
- Rejeu collectif synchronisé entre plusieurs participants regardant le même tirage — nécessite US14.3.1
- Pagination complète (curseur/offset) de l'historique des tirages — `limit` simple (tri par date décroissante) suffit au volume attendu, cohérent avec l'absence de pagination des roues elles-mêmes (US14.1.1)
- Statistiques agrégées par participant (nombre de fois tiré, etc.) — hors périmètre produit actuel

## Notes d'implémentation

- **Backend** `pivot-agilite-core` (schéma Flyway `agilite`, pliage dans `V1__schema_init.sql`
  tant que la BETA n'est pas déclarée — voir CLAUDE.md du repo) :
  - Nouvelle table `agilite.wheel_draw` : `id UUID PK`, `wheel_id UUID NOT NULL` (FK →
    `agilite.wheel.id` `ON DELETE CASCADE` — l'historique disparaît avec la roue), `entry_id UUID`
    (FK → `agilite.wheel_entry.id` `ON DELETE SET NULL` — une entrée peut être retirée plus tard
    via `PUT /wheels/{id}`, la ligne d'historique doit survivre), `entry_label VARCHAR(150) NOT
    NULL` (label figé au moment du tirage — évite de perdre l'information si l'entrée est
    supprimée ensuite, même logique de snapshot que `wheel_entry.label` pour les entrées
    `team_member`), `drawn_at TIMESTAMPTZ NOT NULL DEFAULT now()`. Index sur `(wheel_id, drawn_at
    DESC)` pour la requête `GET .../draws`.
  - `WheelController` (existant, US14.1.1) : ajoute `POST /{wheelId}/spin` et
    `GET /{wheelId}/draws`, délègue à un nouveau service dédié `WheelDrawService` (package
    `fr.pivot.agilite.wheel`) plutôt que d'alourdir `WheelService` — réutilise
    `WheelService`/`WheelRepository` pour la résolution d'accès (même 404 anti-énumération
    qu'US14.1.1, pas de duplication de cette logique).
  - Algorithme de sélection pondérée : méthode pure (ex. `WeightedEntrySelector.select(List<entry
    id + poids effectif>, RandomGenerator)`), sans dépendance Spring/JPA — instanciable et
    testable en TU pur pour les 1000 itérations du test statistique (pas de Testcontainers dans
    la boucle statistique, uniquement dans un TI séparé, à faible volume, qui vérifie le câblage
    HTTP/BDD/persistance de bout en bout).
  - Nouvelles exceptions : `WheelEmptyException` (409, `EMPTY_WHEEL`) ; validation
    `antiRepeatMode`/`limit` via `WheelValidationException` existante (codes
    `INVALID_ANTI_REPEAT_MODE`/`INVALID_LIMIT`) ou bean validation selon le point d'entrée le
    plus naturel — cohérent avec le style d'erreur déjà posé par `GlobalExceptionHandler`
    (US14.1.1).
  - Réponse `POST /spin` : `WheelSpinResponse(UUID wheelId, UUID entryId, String label, Instant
    drawnAt, String antiRepeatMode)` — forme exacte consommée telle quelle par US14.3.1 pour le
    broadcast WebSocket `SPIN_RESULT`.
  - Réponse `GET /draws` : liste de `WheelDrawResponse(UUID entryId, String label, Instant
    drawnAt)` (pas de `wheelId` redondant dans chaque élément, déjà dans le path).
- **Frontend** `pivot-agilite-ui` : étend la feature `wheels/` existante (page de détail de roue à
  créer si absente, US14.1.1 n'ayant livré que liste/formulaire) — bouton de tirage, zone de
  résultat `aria-live`, sélecteur de mode anti-repeat (signal Angular local), historique des
  tirages (`GET .../draws`), toasts succès/erreur en réutilisant le pattern déjà établi par
  US14.1.1.
- **Convention réutilisée** : 404 anti-énumération cross-tenant/cross-équipe (US14.1.1) appliquée
  telle quelle à `spin`/`draws`, pas de nouvelle logique d'accès à écrire.

---
Item Type: US · Parent: F14.2 · Module: agilite · Repo: pivot-agilite-core/ui · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: animateur-facilitateur
Dépendances: US14.1.1
