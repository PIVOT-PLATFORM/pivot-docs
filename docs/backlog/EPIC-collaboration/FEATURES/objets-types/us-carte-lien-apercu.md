# US08.6.5 — Carte lien (LINK) + aperçu OpenGraph

**En tant que** utilisateur-final (OWNER ou EDITOR) d'un tableau blanc
**Je veux** coller une URL pour créer une carte lien (type `LINK`) dont l'aperçu (titre, description, image, nom du site) est récupéré côté serveur de façon asynchrone et diffusé à tous les participants
**Afin de** partager des ressources web enrichies et lisibles sur le canvas, à parité complète avec le POC PouetPouet

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un tableau où je suis OWNER/EDITOR, when je colle une URL seule (texte reconnu comme URL) sur le canvas, then une carte de type `LINK` est créée avec l'URL en `content`, et `card:created` (objet complet) est diffusé à toute la room `/topic/whiteboard/{boardId}` (émetteur inclus) | ⬜ |
| Given une carte LINK vient d'être créée (ou une carte TEXT/LABEL dont le contenu contient une URL, cf. US08.6.1/.2), when l'enrichissement OpenGraph est déclenché, then le serveur effectue un fetch **asynchrone non bloquant** de la page cible et, au retour, diffuse `card:meta_updated {id, meta}` à **toute la room** avec `meta = {title, description, image, siteName}` | ⬜ |
| Given le fetch OpenGraph, when le serveur récupère la page, then il applique les caps exacts (§7) : corps HTML lu **au maximum 100 000 octets**, **5 redirections max**, **timeout 5000 ms**, et `description` tronquée à **300 caractères** | ⬜ |
| Given une carte LINK/TEXT dont le contenu contenait une URL et un aperçu, when je mets à jour son contenu (`card:update`) en retirant toute URL (regex `https?://[^\s<>"']+` ne matche plus), then `meta` est explicitement remis à `null` et `card:meta_updated {id, meta:null}` est **quand même** diffusé à toute la room (l'aperçu disparaît chez tous les participants) | ⬜ |
| Given une carte LINK existante non verrouillée, when j'envoie `card:move`/`card:resize`/`card:delete`, then les mêmes gardes que les autres cartes s'appliquent (garde `locked=false` dans le `WHERE` pour move/resize, lecture explicite de `locked` pour delete) et les broadcasts correspondants sont émis à **toute la room** (émetteur inclus — pas d'exclusion, cf. US08.6.1) | ⬜ |
| Error : given une URL dont le fetch échoue (timeout 5000 ms dépassé, DNS/connexion en erreur, statut non-2xx, corps illisible), when l'enrichissement est tenté, then l'échec est **absorbé silencieusement** (aucune exception propagée, la carte LINK reste avec `meta=null`) — jamais de `*:error` dédié, la carte reste utilisable avec l'URL brute | ⬜ |
| Error : given une page dont le corps dépasse 100 000 octets, when le fetch lit la réponse, then la lecture est **coupée à 100 000 octets** et le parsing OG se fait sur ce fragment (pas de lecture illimitée en mémoire) | ⬜ |
| Security : `tenantId`, `userId` et rôle résolus exclusivement depuis le `SecurityContext` (token opaque) — jamais depuis le path/body/payload STOMP ; toute mutation `card:*` sur un LINK exige `canWrite` (OWNER/EDITOR), VIEWER refusé silencieusement | ⬜ |
| Security : le fetch OpenGraph sortant est **protégé contre le SSRF** — les URL résolvant vers des adresses privées/loopback/link-local/métadonnées cloud (RFC 1918, `127.0.0.0/8`, `169.254.0.0/16`, `::1`, `fd00::/8`, `169.254.169.254`) sont **refusées** ; seuls `http`/`https` sont autorisés (pas `file://`, `gopher://`, etc.) ; la limite de **5 redirections** est appliquée en revalidant la cible à chaque saut (pas de redirection vers une adresse interne) | ⬜ |
| Security : le fetch respecte des limites de ressources strictes (timeout 5000 ms, corps 100 000 octets, 5 redirections) pour empêcher un déni de service par URL malveillante ; `meta.image` n'est stockée que comme URL (pas de re-téléchargement d'octets arbitraires côté serveur au-delà du parsing HTML) | ⬜ |
| Security : les champs `meta` (`title`/`description`/`image`/`siteName`) sont **assainis** avant diffusion/rendu (échappement HTML, validation que `meta.image` est une URL `http`/`https` bien formée) — pas d'injection XSS via des balises OpenGraph malveillantes | ⬜ |
| A11y : la carte LINK rendue est un lien accessible (`<a>` avec `aria-label` = titre OG ou URL), activable au clavier (Entrée) ; l'image d'aperçu porte un `alt` (titre ou nom du site) ; tant que `meta` est `null`, la carte affiche l'URL brute lisible, sans état de chargement piégeant le focus | ⬜ |
| Tests TI (`pivot-collaboratif-core`) : fetch OG nominal → `card:meta_updated` avec les 4 champs ; caps (corps > 100 000 o coupé, timeout 5000 ms, ≥ 5 redirections stoppées, description > 300 car tronquée) ; échec fetch → `meta` reste null, pas d'exception ; SSRF (URL vers 127.0.0.1 / 169.254.169.254 / IP privée → refus) ; retrait d'URL sur `card:update` → `meta_updated` avec null ; VIEWER → refus silencieux | ⬜ |
| Tests Vitest (`pivot-collaboratif-ui`) : collage URL → carte LINK ; rendu de l'aperçu à réception de `card:meta_updated` ; disparition de l'aperçu quand `meta:null` reçu ; état « URL brute » avant enrichissement ; assainissement des champs meta au rendu | ⬜ |

## Hors périmètre

- Aperçu vidéo enrichi / lecteur embarqué (embed YouTube/Vimeo playable) — hors Socle, non présent dans le modèle de référence (le POC ne stocke qu'un cache OG `{title,description,image,siteName}`)
- Re-téléchargement et hébergement côté serveur de l'image d'aperçu (`meta.image` reste une URL référencée, pas un blob rapatrié)
- Rafraîchissement périodique / invalidation du cache OG — l'enrichissement est déclenché à la création et à chaque `card:update` modifiant l'URL, pas sur un TTL
- Types TEXT/LABEL/SHAPE/IMAGE/TABLE — US08.6.1/.2/.3/.4/.6 (US08.6.1 et .2 **déclenchent** cet enrichissement à la détection d'URL, la mécanique OG elle-même est ici)
- Collage d'image ou de tableur — US08.6.4 / US08.6.6

## Notes d'implémentation

- **Backend `pivot-collaboratif-core`** : `LINK` est une valeur de l'enum `CardType` (EN08.4). Le cache OpenGraph est porté par `Card.meta` (JSON nullable `{title, description, image, siteName}`), rempli **en asynchrone** après `card:create`/`card:update` — cohérent §1.5/§3.4. Service dédié équivalent à `og-fetch.ts` du POC.
- **Déclenchement (§3.4)** : enrichissement lancé si `type=LINK` (content non vide) **ou** `type=TEXT`/`LABEL` avec URL détectée (regex `https?://[^\s<>"']+`). Non bloquant : la carte est créée/mise à jour immédiatement, l'aperçu arrive dans un second temps via `card:meta_updated`. Sur `card:update` sans URL → `meta ← null` explicite + émission quand même.
- **Caps exacts (§7)** : corps HTML **100 000 octets** max (lecture tronquée), **5 redirections** max, **timeout 5000 ms**, `description` tronquée à **300 caractères**. Ces valeurs sont reprises telles quelles du POC (`og-fetch.ts`).
- **Correctif §6 / renforcement sécurité** : le POC réalise un fetch sortant sans garde SSRF explicite documentée. PIVOT **ajoute une protection SSRF** (blocage des cibles privées/loopback/link-local/métadonnées cloud, schémas `http`/`https` uniquement, revalidation à chaque redirection) et **assainit** les champs `meta` avant diffusion — flaggé dans les AC Security. C'est un point où la parité comportementale (aperçu OG) est conservée mais où un défaut de sécurité potentiel est corrigé plutôt que reproduit.
- **Broadcast** : `card:meta_updated {id, meta}` → **room entière** (tous les participants voient l'aperçu apparaître/disparaître), cohérent §3.4.
- **Réutilisation des contrats** : `card:create/move/resize/update/delete` d'EN08.4/US08.6.1 pour le type `LINK`. **Pas d'asymétrie de portée de broadcast** sur move/resize (corrigé, voir US08.6.1 — le helper `broadcast()` d'EN08.4 n'exclut jamais l'émetteur).
- i18n : clés `whiteboard.card.link.*` (fr.json / en.json).

---
Item Type: US · Parent: F08.6 · Module: whiteboard · Phase: Socle · Size: L · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Source: Parité complète vs POC PouetPouet (`Détails tableau blanc backlog.md` §1.5, §3.4, §6, §7) — décision mainteneur d'absorption intégrale du spec de référence dans le Socle E08 ; absorbe US30.1.11 (liens enrichis). **AC réalignées le 2026-07-14 (Gate 1 PO Agent)** contre le contrat WebSocket réel — voir US08.6.1 (topic `/topic/whiteboard/{boardId}`, pas d'exclusion émetteur).
Dépendances: EN08.4 (modèle Card typé, enum `CardType.LINK`, `Card.meta` JSON + contrats WebSocket `card:*`/`card:meta_updated`) + EN08.1 (isolation WS room) + US08.6.1 (contrats `card:*` mutualisés, détection d'URL dans TEXT en amont)
