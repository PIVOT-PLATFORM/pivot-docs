# Sprint 38 — Parité whiteboard — Fondation modèle Card

**Branches :** une branche par US — `feat/{us-id}-{slug}` (voir [§Règles d'utilisation](./README.md#règles-dutilisation))
**Scope :** 1 enabler fondateur du chantier de **parité complète** whiteboard — modèle `Card`
typé remplaçant l'objet `DRAW` générique d'US08.3.2a, suite à la décision mainteneur du 2026-07-13
d'absorber tout le spec de référence `Détails tableau blanc backlog.md` (POC PouetPouet) dans le
Socle E08 (lève le verrou phase-3, zone d'ombre #11). `Phase: Socle`, module whiteboard.
**Jalon d'entrée :** s'appuie sur EN08.1 (isolation WS room) et US08.3.2a (canvas local, objet
`DRAW`) déjà `Stage: ✅ Done` (Sprint 5, Vague 1+) — cet enabler en généralise le modèle d'objet.

## Contexte

La décision mainteneur du 2026-07-13 étend le périmètre Socle whiteboard **au-delà** de la parité
visible du Sprint 37 : elle rapatrie l'intégralité du spec de réimplémentation fine du POC
PouetPouet (`Détails tableau blanc backlog.md`) dans E08, ce qui **lève le verrou `phase-3`** posé
par la zone d'ombre #11. Ce chantier se déroule sur les **Sprints 38 à 43**.

Le Sprint 38 en est la **fondation bloquante** : l'enabler **EN08.4** introduit le modèle `Card`
typé (avec ses contrats WebSocket) qui remplace l'objet `DRAW` générique livré par US08.3.2a. Tous
les objets typés, connecteurs, cadres, champs personnalisés et fonctions de facilitation des
Sprints 39-43 s'appuient sur ce modèle — **rien ne peut démarrer avant EN08.4**.

| Item | Titre | Priority | Size | 🤖 Dev |
|------|-------|----------|------|--------|
| [EN08.4](../EPIC-collaboration/ENABLERS/en-modele-card-type.md) | Modèle `Card` typé + contrats WebSocket temps réel | Critical | L | ⬜ |

## Notes de séquencement

- **EN08.4 est bloquant** : prérequis de **tous** les Sprints 39 à 43. Il remplace l'objet `DRAW`
  générique d'US08.3.2a (`Done`) par le modèle `Card` typé — cette révision ne concerne aucune
  donnée de production (Socle non encore en usage réel), pas de migration de données au-delà du
  schéma.
- Sprint mono-item volontairement isolé : la fondation modèle doit être stabilisée et mergée avant
  d'ouvrir les branches des objets typés en parallèle (Sprint 39+).
- Gate 1 (PO Agent, DoR) à effectuer au démarrage de l'item comme pour tout sprint — ce fichier ne
  préjuge pas d'un Gate 1 déjà passé au niveau sprint.

## Dépendances

- Dépend de : **EN08.1** (isolation WebSocket room par board) et **US08.3.2a** (canvas local,
  outils de dessin, objet `DRAW`) — déjà `Stage: ✅ Done`.
- Repo cible inchangé (`pivot-collaboratif-core`/`pivot-collaboratif-ui`), mêmes conventions
  d'accès (tenantId via SecurityContext, isolation WS room par board) que le reste de F08.x.
- **Bloque :** Sprints 39, 40, 41, 42, 43 (tous les objets typés reposent sur le modèle `Card`).

---
*Créé le 2026-07-13, suite à la décision mainteneur d'absorber le spec de référence
`Détails tableau blanc backlog.md` (POC PouetPouet) dans le Socle E08 — parité complète, Sprints
38-43.*
