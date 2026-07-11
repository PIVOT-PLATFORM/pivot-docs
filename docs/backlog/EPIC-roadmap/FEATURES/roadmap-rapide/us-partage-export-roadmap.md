# US22.3.5 — Partage & export de la roadmap

**En tant que** direction
**Je veux** partager la roadmap par lien et l'exporter en image / PDF pour un comité
**Afin de** diffuser la direction hors de l'outil sans capture d'écran

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une roadmap, when je l'exporte, then un PNG/PDF fidèle (lanes, jalons, périodes) est produit | ⬜ |
| Given un lien de partage lecture seule, when un destinataire l'ouvre, then il voit la roadmap sans pouvoir l'éditer | ⬜ |
| Error : given un lien de partage révoqué ou expiré, when un destinataire tente de l'ouvrir, then l'accès est refusé avec un message explicite (pas d'affichage partiel de la roadmap) | ⬜ |
| Security : le lien de partage lecture seule ne doit exposer que les données de la roadmap concernée (pas d'autres projets/portefeuilles) et doit pouvoir être révoqué à tout moment par un utilisateur habilité | ⬜ |
| A11y : la page consultée via le lien de partage respecte les mêmes exigences WCAG 2.1 AA que la roadmap éditable (navigation clavier, contrastes) | ⬜ |

## Hors périmètre

- L'édition collaborative ou les commentaires sur la roadmap partagée — le lien est strictement lecture seule.
- Les autres formats d'export (MS Project, Excel, iCalendar…) — couverts par F22.7 (Interopérabilité).
- La planification d'envois récurrents (ex. export automatique hebdomadaire) — non couverte, export à la demande uniquement.

## Notes d'implémentation

- L'export PNG/PDF doit être fidèle au rendu affiché (lanes, jalons, périodes) au moment de l'export — génération côté serveur ou capture du rendu client à définir en conception technique.
- Le lien de partage lecture seule nécessite un mécanisme de token/permission dédié, distinct des rôles applicatifs classiques, pour permettre un accès sans compte au destinataire.

### Décision d'architecture — export PNG/PDF : capture côté client

Gate 1 laissait le choix ouvert ("génération côté serveur ou capture du rendu client à définir en
conception technique") — tranché côté `pivot-pilotage-core` (PO Agent + Architecte) : **capture
côté client**, dans `pivot-pilotage-ui`. Le rendu de la roadmap (lanes, jalons, périodes) existe
déjà côté frontend ; dupliquer cette logique de rendu côté serveur (moteur headless type
Puppeteer/wkhtmltopdf, ou reconstruction manuelle du layout en PDF) serait coûteux à maintenir et
risquerait de diverger visuellement du rendu réellement affiché (AC "export fidèle au rendu
réel") — pour une US `Should`/`Size: S`, le rapport coût/valeur ne le justifie pas. **Conséquence :
le backend n'a aucun rôle dans la génération de l'export elle-même** — sa seule contribution est
d'exposer des données de lecture correctes et complètes, y compris pour un destinataire de lien de
partage sans session (voir endpoint public ci-dessous), consommées par le frontend qui effectue la
capture (DOM/canvas → PNG, impression navigateur ou lib type `jsPDF`/`html2canvas` → PDF — choix
technique précis délégué à `pivot-pilotage-ui`, hors périmètre backend).

### Backend — contrat figé (pivot-pilotage-core, PR [`#36`](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/36))

Gate 1 laissait le mécanisme de lien de partage ouvert ("nécessite un mécanisme de
token/permission dédié") — décisions PO Agent + Architecte prises côté `pivot-pilotage-core` et
consignées ici pour qu'un futur agent frontend (`pivot-pilotage-ui`) puisse s'y brancher sans
deviner.

**Token de partage.** Réplique exactement le pattern `fr.pivot.auth.entity.AccessToken` /
`CryptoUtils.sha256` déjà en production côté `pivot-core` : un token brut opaque (256 bits
`SecureRandom`, hex-encodé sur 64 caractères) est généré à la création et retourné **une seule
fois** dans la réponse — jamais persisté. Seul son hash SHA-256 (`token_hash`, 64 caractères hex)
est stocké, dans une nouvelle petite table `pilotage.roadmap_share_link` (id, tenant_id, team_id,
project_id NOT NULL `ON DELETE CASCADE` vers `pilotage.project`, token_hash UNIQUE, created_at,
revoked_at nullable, expires_at nullable). Pas de colonne `updated_at` : un lien n'est jamais
« modifié », seulement révoqué (capturé par `revoked_at`), même posture que `AccessToken`.
Liveness = fonction pure de `revoked_at`/`expires_at`, jamais un enum `status` séparé à
synchroniser.

**Endpoints REST** (préfixe nginx `/api/pilotage`, cf. `pivot-pilotage-core/CLAUDE.md`) :

| Méthode | Chemin | Auth | Body | Succès | Erreurs |
|---------|--------|------|------|--------|---------|
| `POST` | `/tenants/{tenantId}/teams/{teamId}/projects/{projectId}/roadmap/share-links` | Authentifié, gate `RoadmapEditPolicy` | `CreateShareLinkRequest{expiresAt?}` | `201` `CreateShareLinkResponse{id, token, createdAt, expiresAt}` — **le seul moment où le token brut est exposé** | `400` (`SHARE_LINK_EXPIRY_INVALID` si `expiresAt` n'est pas strictement futur), `403`, `404` (projet non visible) |
| `GET` | `/tenants/{tenantId}/teams/{teamId}/projects/{projectId}/roadmap/share-links` | Authentifié, gate `RoadmapEditPolicy` | — | `200` `ShareLinkResponse[]{id, createdAt, expiresAt, revokedAt, active}` (jamais le token/hash), plus récent d'abord | `403`, `404` |
| `DELETE` | `/tenants/{tenantId}/teams/{teamId}/projects/{projectId}/roadmap/share-links/{shareLinkId}` | Authentifié, gate `RoadmapEditPolicy` | — | `204` — **idempotent** (révoquer un lien déjà révoqué/expiré est un succès silencieux, pas une erreur) | `403`, `404` (lien introuvable sur ce projet) |
| `GET` | `/public/roadmap-shares/{token}` | **Aucune** — le token est la seule protection | — | `200` `RoadmapShareViewResponse{projectName, lanes: LaneResponse[], initiatives: InitiativeResponse[]}` | `404` `{code: "SHARE_LINK_INVALID", message}` si le token est inconnu, révoqué **ou** expiré — les trois cas sont **délibérément non distingués** (non-disclosure : un destinataire qui essaie de deviner des tokens ne doit pas pouvoir apprendre si un token a existé puis a été révoqué, vs. n'a jamais existé) |

**Isolation stricte par projet (AC sécurité).** `project_id NOT NULL` + `ON DELETE CASCADE` dans le
schéma — un lien ne peut structurellement pointer que vers un seul projet, jamais un portefeuille
ou un tenant entier. L'endpoint public ne porte **aucun** segment `tenantId`/`teamId`/`projectId`
dans son URL (contrairement à tous les autres endpoints roadmap-rapide) : le destinataire ne
connaît que le token, jamais les identifiants internes — c'est `RoadmapShareService` qui résout
tenant/team/project à partir du hash du token.

**Révocation (AC sécurité "à tout moment par un utilisateur habilité").** Réutilise
`RoadmapEditPolicy` tel quel (US22.3.1) — même population que « qui peut éditer cette roadmap ».
Câblé aujourd'hui en fail-closed (`DenyAllRoadmapEditPolicy`, toujours `403`) le temps que
`pivot-core-starter` publie l'appartenance projet/équipe, comme le reste du contrôleur roadmap.

**Erreur explicite sans affichage partiel (AC erreur).** `ShareLinkAccessDeniedException` (404 +
corps `{code: "SHARE_LINK_INVALID", message: "Ce lien de partage est invalide, expiré ou a été
révoqué."}`) — le contrôleur public n'a **aucune** méthode de mutation et ne renvoie jamais de
sous-ensemble de la roadmap : soit la vue complète (lanes + initiatives), soit un refus complet.

**A11y.** Hors périmètre backend — la page de consultation par lien de partage relève de
`pivot-pilotage-ui`, mêmes exigences WCAG 2.1 AA que la roadmap éditable (AC), aucun impact sur ce
contrat REST.

---
Item Type: US · Parent: F22.3 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Should
Stage: ⬜
Rôle: macro:direction-pilotage
Profils: Tous
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude par défaut EN18.10 (E40 adaptatif ultérieur)
Dépendances: EN22.1 (modèle temporel unique)
