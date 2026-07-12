# EN52.2 — Référentiel d'accès consolidé (qui / comment, transverse)

**Type d'enabler** : sécurité / architecture (documentaire)

**Objectif technique** : produire la **carte d'accès unique** de la plateforme — le squelette commun
que chaque fiche de domaine (axes 2 et 3) référence au lieu de le réécrire. Répond, une fois pour
toutes, à *qui a un droit* et *comment ce droit est obtenu et appliqué*.

**Justification** : les règles d'accès sont aujourd'hui éparpillées (guards Angular, annotations
Spring, `moduleGuard`, `TenantContext`, rôles d'équipe). Sans référentiel consolidé, chaque fiche
re-documenterait le même socle et les matrices par domaine ne seraient pas comparables. EN52.2 est le
dénominateur commun des axes « qui » et « comment ».

## Livrable

`docs/architecture/referentiel-acces.md`, contenant :

### 1. Rôles système (source : schéma de rôles cible)

| Rôle | Portée | Obtention | Ce qu'il ouvre |
|------|--------|-----------|----------------|
| `ROLE_SUPER_ADMIN` | Plateforme | Provisionnement plateforme | Gestion tenants, config globale |
| `ROLE_ADMIN` | Tenant | Attribué par un admin du tenant | Activation modules, gestion utilisateurs du tenant |
| `ROLE_USER` | Tenant | Inscription / JIT OIDC | Usage des modules activés |
| `ROLE_GUEST` | Session | Lien de session live (anonyme) | Participation éphémère |

### 2. Rôles d'équipe (`public.team_members`)

Distincts des rôles système : un `USER` peut être `owner`/`member` d'une équipe → droits sur les
objets **portés par l'équipe** (whiteboards, roadmaps…). Le référentiel fixe la liste et la sémantique.

### 3. Portées & isolation

- **Tenant** — `TenantContext` (lib `pivot-core-starter`), FK cross-schéma → `public.tenants`.
- **Équipe** — appartenance via `team_members`.
- **Session** — jeton de session live pour `GUEST`.
- **Module** — `moduleGuard` (Angular) + statut `modules_state` : un domaine désactivé → 403 API + bundle non chargé.

### 4. Mécanismes d'authentification

| Mécanisme | Contexte | Détail |
|-----------|----------|--------|
| Opaque token SHA-256 | Auth interne email/password | Token 256-bit, hash en BDD (`access_tokens`), en mémoire client uniquement, max 5 sessions ([ADR-005](pathname:///pivot-docs/adr/ADR-005-opaque-tokens)) |
| OIDC PKCE S256 | Tenants IdP externe | Validation JWKS côté Spring, multi-tenant, JIT provisioning |

### 5. Points d'application (où le droit est vérifié)

Table de correspondance : rôle/portée → **artefact d'enforcement** (guard Angular nommé, annotation
`@PreAuthorize`/filtre Spring Security, `moduleGuard`, intercepteur WebSocket handshake). C'est la
colonne « comment » que les fiches réutilisent.

### 6. Mapping profils métier ↔ rôles système

Projection de la [taxonomie DSI](pathname:///pivot-docs/taxonomie/) (14 domaines, ~100 rôles) sur les
4 rôles système : par défaut tout rôle métier → `USER` ; les rôles de gouvernance (DSI, RSSI, PMO…)
→ candidats `ADMIN` selon le tenant. Le référentiel **documente** cette projection sans la figer en
code (PIVOT n'implémente pas les 100 rôles — c'est une grille de lecture pour les fiches et une
future RBAC fine, cf. [EN-rbac-roles](../../EPIC-securite/ENABLERS/en-rbac-roles.md)).

## Critères de complétion

- [ ] Given une fiche de domaine, when elle décrit un accès, then elle peut renvoyer à une ligne du
      référentiel (rôle, portée, mécanisme, point d'application) sans la redéfinir.
- [ ] Les 4 rôles système, les rôles d'équipe, les 4 portées et les 2 mécanismes d'auth sont chacun
      décrits avec **obtention** et **point d'application** nommé.
- [ ] Le mapping taxonomie → rôles système est présent et explicitement marqué « grille de lecture,
      non implémentée » pour ne pas laisser croire à une RBAC à 100 rôles livrée.
- [ ] Security : chaque mécanisme cite son point d'application serveur (pas seulement le guard UI).
- [ ] Cohérence : aucune contradiction avec le schéma de rôles de `architecture/platform-overview.md`
      ni avec ADR-005 — les divergences éventuelles sont listées en findings.
- [ ] `npm run lint` + `npm run build` verts.

## Notes

- EN52.2 **consolide et référence l'existant** ; il ne crée pas de nouveau rôle. Toute règle
  souhaitable mais non implémentée est un finding, pas une décision.
- Interaction future : ce référentiel est le point d'ancrage naturel d'une RBAC fine (E43/E-rbac) et
  de la bijection profils↔cockpits (E51) — liens tracés, pas de couplage introduit.

---
Item Type: Enabler · Parent: E52 · Type: securite · Module: core · Phase: Socle
Stage: ⬜ · Priority: Critical
Dépendances: EN52.1, ADR-005 (opaque tokens), taxonomie/roles.json, architecture/platform-overview
