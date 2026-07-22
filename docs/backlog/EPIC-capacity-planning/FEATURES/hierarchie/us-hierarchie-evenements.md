# US11.3.1 — Créer une hiérarchie d'événements (Sprint sous PI Planning)

**En tant que** Release Train Engineer
**Je veux** organiser les Sprints sous un PI Planning
**Afin de** visualiser la capacité à plusieurs niveaux (PI / Sprint)

**Gate 1 réalisé le 2026-07-22** — remplace le stub outline précédent. Prolonge US11.1.1
(`parentEventId` posé à la création) et US11.1.2 (agrégation dans le résumé de capacité).

**Architecture — indépendant de `PiCycle`/`PiIteration` (E50 PI Planning)** : voir US11.1.1
§Architecture — cette hiérarchie (`CapacityEvent` de type `PI_PLANNING` avec des enfants
`SPRINT`/`RELEASE`) est un concept de capacité propre à ce module, sans lien de schéma avec
`fr.pivot.agilite.pi.PiCycle`/`PiIteration` (Program Increment SAFe, `pivot-core#259`) — un
utilisateur peut avoir un `PiCycle` et un `CapacityEvent` de type `PI_PLANNING` représentant le
même PI réel côté métier, sans qu'aucune donnée ne soit partagée entre les deux au socle.

## Critères d'acceptation

### Rattachement (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un événement `PI_PLANNING` accessible sans parent lui-même, when un événement `SPRINT`/`RELEASE`/`CUSTOM` est créé avec `parentEventId` le référençant (US11.1.1), then il devient un enfant de ce PI | ⬜ |
| Given un événement déjà parent (a lui-même un `parentEventId`), when il est proposé comme `parentEventId` d'un autre événement, then refusé — **profondeur maximale 2 niveaux** (voir Cas d'erreur) | ⬜ |
| Given un événement `PI_PLANNING`, when il est proposé comme parent, then accepté uniquement si son propre `type` est `PI_PLANNING` (voir US11.1.1 — un Sprint ne peut pas avoir un Sprint pour parent) | ⬜ |

### Lecture agrégée

| Critère | 🤖 Dev |
|---------|--------|
| Given un événement `PI_PLANNING`, when `GET /api/agilite/capacity/events/{piId}/children`, then 200 OK avec ses événements enfants (Sprints/Releases), triés par `startDate` | ⬜ |
| Given un événement `PI_PLANNING` avec enfants, when son résumé de capacité est demandé (`GET .../events/{id}/summary`, US11.1.2), then la capacité nette agrégée = somme des capacités nettes de chaque enfant (jours et points) | ⬜ |
| Given un enfant supprimé (`DELETE .../events/{childId}`, US11.1.1), when le résumé du PI parent est recalculé, then l'agrégation reflète immédiatement le retrait | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given un `parentEventId` référençant un événement qui a lui-même un parent, when création, then 400 code `MAX_DEPTH_EXCEEDED` | ⬜ |
| Error : given un `parentEventId` référençant un événement dont le `type` n'est pas `PI_PLANNING`, when création, then 400 code `INVALID_PARENT_EVENT` (même code qu'US11.1.1 — cas particulier de la même validation) | ⬜ |
| Error : given un `id` de PI inexistant/autre tenant, when `GET .../children`, then 404 | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : `tenantId`/`userId` résolus exclusivement depuis le `RequestPrincipal` | ⬜ |
| Security : given un appelant sans lien avec le PI, when `GET .../children`, then 404 (jamais 403) | ⬜ |
| Security : test TI obligatoire cross-tenant sur `GET .../events/{piId}/children` et sur la validation `parentEventId` cross-tenant à la création | ⬜ |

### A11y (frontend `pivot-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| A11y : vue hiérarchie expandable — utilise un `<button>` natif avec `aria-expanded` pour chaque nœud PI, jamais une zone cliquable sans sémantique de bouton | ⬜ |
| A11y : tous les libellés externalisés via Transloco | ⬜ |

## Hors périmètre

- **Profondeur > 2 niveaux** (ex. Programme → PI → Sprint) — non spécifié, hors socle.
- **Déplacement d'un enfant d'un PI à un autre** après création — supprimer et recréer si besoin,
  pas d'endpoint de ré-affectation dédié pour ce lot.

## Notes d'implémentation

- **Backend** : validation de profondeur et de type dans `CapacityEventService#create` (US11.1.1)
  — pas de nouvelle entité, `parentEventId` déjà porté par `CapacityEvent`. Agrégation
  d'US11.1.2 étendue : `CapacityCalculator#summarize` détecte la présence d'enfants et délègue
  (récursion à 1 niveau, la profondeur max garantit l'absence de boucle). `CapacityEventController`
  étendu (`GET .../events/{piId}/children`).
- **Frontend** : composant `capacity-hierarchy` — arbre expandable PI → Sprints, réutilisé dans
  `capacity-event-detail` pour les événements `PI_PLANNING`. UX inspirée du POC de référence
  PouetPouet (`apps/web/src/app/(app)/capacity/[id]/page.tsx`, section parent/enfants) adaptée aux
  tokens `@pivot/design-system`.

---
Item Type: US · Parent: F11.3 · Module: agilite · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: release-train-engineer
Dépendances: US11.1.1
