# Sprint 15 — Parité whiteboard — Facilitation (minuteur, vote)

**Branches :** une branche par US — `feat/{us-id}-{slug}` (voir [§Règles d'utilisation](./README.md#règles-dutilisation))
**Scope :** 2 items de **parité complète** whiteboard — facilitation Socle : minuteur partagé et
vote / dot-vote, suite à la décision mainteneur du 2026-07-13 d'absorber tout le spec de référence
`Détails tableau blanc backlog.md` (POC PouetPouet) dans le Socle E08 (lève le verrou phase-3, zone
d'ombre #11). `Phase: Socle`, module whiteboard.
**Jalon d'entrée :** dépend du modèle `Card` typé (EN08.4, Sprint 11) — le vote s'ancre sur des
cartes typées et le minuteur diffuse son état via les contrats WS du modèle.

## Contexte

Suite de la fondation posée au Sprint 11 (EN08.4, modèle `Card` typé). Ce sprint livre les deux
capacités de **facilitation Socle** présentes dans le spec de référence PouetPouet : le minuteur
partagé et le vote / dot-vote. Il absorbe les Features benchmark US30.3.1 (vote structuré) et
US30.3.2 (minuteur partagé).

| Item | Titre | Priority | Size | 🤖 Dev |
|------|-------|----------|------|--------|
| [US08.12.1](../EPIC-collaboration/FEATURES/facilitation-socle/us-minuteur-partage.md) | Minuteur partagé (facilitation) | Medium | M | ✅ |
| [US08.12.2](../EPIC-collaboration/FEATURES/facilitation-socle/us-vote-dot-vote.md) | Vote / dot-vote (facilitation) | Medium | L | ✅ |

## Notes de séquencement

- Les deux items (minuteur, vote) sont parallélisables entre agents — branches séparées, domaines
  fonctionnels disjoints.
- **Réactions temps réel (US30.11.1) et commentaires ancrés (US30.2.3) restent `phase-3`** : absents
  du spec de référence PouetPouet, ils ne font pas partie du périmètre de facilitation Socle absorbé.
- Gate 1 (PO Agent, DoR) à effectuer au démarrage de chaque item.

## Dépendances

- Dépend de : **Sprint 11 (EN08.4)** — modèle `Card` typé + contrats WS. Bloquant pour les deux
  items (le vote s'ancre sur des cartes, le minuteur diffuse via les contrats WS).
- Repo cible inchangé (`pivot-collaboratif-core`/`pivot-collaboratif-ui`).

---
*Créé le 2026-07-13, suite à la décision mainteneur d'absorber le spec de référence
`Détails tableau blanc backlog.md` (POC PouetPouet) dans le Socle E08 — parité complète, Sprints
38-43.*
