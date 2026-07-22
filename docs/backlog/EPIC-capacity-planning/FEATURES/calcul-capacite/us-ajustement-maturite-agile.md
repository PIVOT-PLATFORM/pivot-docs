# US11.6.4 — Ajustement par la maturité agile

**En tant que** Scrum Master / Coach agile
**Je veux** moduler les paramètres (facteur de concentration, marge d'incertitude, fiabilité de la vélocité) selon le **niveau de maturité agile** de l'équipe
**Afin de** adapter la prudence de la planification au niveau réel de l'équipe

**Gate 1 réalisé le 2026-07-22** — remplace la version outline précédente. Prolonge US11.6.2/
US11.6.3. **Sans équivalent direct dans le POC de référence PouetPouet** — le module `capacity`
du POC n'a pas de notion de maturité agile/marge par palier (`focusFactor`/`pointsPerPersonDay`
y sont des paramètres bruts sans barème) ; les valeurs par défaut ci-dessous viennent de l'EPIC
PIVOT lui-même (`EPIC-capacity-planning/README.md` §Modèle de calcul), conçues directement à
partir de ce barème.

## Critères d'acceptation

### Maturité agile (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une équipe, when `PATCH .../teams/{teamId}/capacity-maturity` avec `{ maturity }` (`FORMING` \| `NORMING` \| `PERFORMING`), then le niveau est enregistré et les défauts chiffrés s'appliquent aux événements de cette équipe : **`FORMING` → focus 60 % / marge 20 %** · **`NORMING` → focus 70 % / marge 10 %** · **`PERFORMING` → focus 80 % / marge 5 %** | ⬜ |
| Given une équipe sans maturité renseignée, when la capacité se calcule, then le **défaut global** s'applique : focus 70 % / marge 15 % | ⬜ |
| Given un `focusFactorPercent` explicitement saisi au niveau événement ou membre (US11.6.2), when il coexiste avec une maturité renseignée, then **la saisie explicite prévaut** sur le défaut dérivé de la maturité (la maturité ne fournit qu'un défaut, jamais une valeur imposée) | ⬜ |
| Given la capacité nette et la marge effective, when l'**engagement recommandé** est calculé, then `engagement = capacité nette × (1 − marge)` | ⬜ |
| Given une équipe `FORMING` (marge 20 %), when un événement de cette équipe affiche sa capacité, then la marge appliquée est **signalée explicitement** dans la réponse (`marginPercent`, `maturitySource: "TEAM_MATURITY" \| "DEFAULT"`) — jamais silencieuse | ⬜ |
| Given la maturité d'une équipe, when elle est mise à jour (ex. `FORMING` → `NORMING`), then l'historique des changements est tracé (`CapacityTeamMaturityHistory` — date, ancienne/nouvelle valeur, auteur) | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given `maturity` hors énumération `{FORMING, NORMING, PERFORMING}`, when mise à jour, then 400 code `INVALID_MATURITY` | ⬜ |
| Error : given un `teamId` inexistant ou d'un autre tenant, when mise à jour/lecture, then 404 | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : given un appelant non membre de l'équipe `teamId`, when mise à jour/lecture de la maturité, then 404 (jamais 403) | ⬜ |
| Security : test TI obligatoire cross-tenant | ⬜ |

## Hors périmètre

- **Évaluation automatique de la maturité** (ex. à partir d'un score dérivé des rétrospectives ou
  de la régularité de vélocité) — saisie manuelle uniquement pour ce lot.

## Notes d'implémentation

- **Backend** : nouvelle entité `CapacityTeamMaturity` (`id`, `tenantId`, `teamId` unique,
  `maturity` enum `CapacityMaturityLevel{FORMING,NORMING,PERFORMING}`, `updatedAt`, `updatedBy`)
  et `CapacityTeamMaturityHistory` (append-only, mêmes champs + `previousMaturity`) — migration
  additive, même fichier que le reste du lot. `CapacityMaturityDefaults` (classe pure, table de
  correspondance maturité → focus/marge, testée en isolation, même posture que
  `CapacityCalculator`). `CapacityTeamMaturityService#update/getEffectiveDefaults`.
  `CapacityMaturityController` (`/teams/{teamId}/capacity-maturity`).
- **Frontend** : sélecteur de maturité dans les paramètres d'équipe (page équipe existante ou
  nouvel onglet `capacity-team-settings`, à trancher en implémentation selon ce qui existe déjà
  côté gestion d'équipe) ; badge marge/focus effectif affiché sur `capacity-event-detail` avec sa
  source (maturité équipe vs défaut global).

---
Item Type: US · Parent: F11.6 · Module: agilite · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: scrum-master, coach-agile
Dépendances: US11.6.2 · US11.6.3
