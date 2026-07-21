# Activités template du whiteboard — brainstorming, icebreaker, rétrospective

## Contexte

- **Issue** : `pivot-ui` [#254](https://github.com/PIVOT-PLATFORM/pivot-ui/issues/254) — le panneau
  « Activités » exposait sept entrées cliquables dont quatre sans aucun effet
- **PR frontend** : `pivot-ui` [#257](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/257)
  (`fix/whiteboard-activities-wiring`) — Gate 4 = 92/100, mergée le 2026-07-21 (`f5f6470`)
- **PR backend** : aucune. Aucune entité, aucune migration, aucun changement de contrat.
- **Gate 2 COVERAGE** : 1271 tests Vitest `collaboratif-ui` + 159 `design-system`, 71 E2E Playwright
- **Rattachement backlog** : F30.3 — Facilitation & ateliers (E30, `phase-3`). **Aucune US de sprint** :
  ces activités ne créent aucune entité serveur, donc leur livraison n'anticipe pas le déverrouillage
  de la phase-3. Le reste de F30.3 (dont US30.3.8 Séquençage d'atelier) demeure `⬜`.
- **Dépend de** : US08.8.1 (cadres), US08.3.3 (undo/redo canvas)

---

## Périmètre — pourquoi trois activités et pas quatre

Le catalogue du panneau compte sept entrées. Trois étaient déjà câblées (`timer` → US08.12.1,
`dotvote` → US08.12.2, `quiz` → PR #246). Sur les quatre restantes :

| Activité | Décision | Raison |
|---|---|---|
| Brainstorming, Icebreaker, Rétrospective | **Livrées** | Ce sont des *dispositions de canvas*. Elles se composent de primitives déjà persistées et diffusées (`frame:create` + `frame:update`) et n'ont besoin d'aucun état serveur. |
| Sondage (`poll`) | **Désactivée** | Exige des réponses par participant agrégées en direct, donc une entité du schéma `collaboratif`. Seuls `V4__vote.sql` (vote) et `V9__quiz.sql` (quiz) existent. |

Critère retenu : une activité est `available` si elle possède déjà un backend **ou** si elle est
exprimable comme template de canvas pur. Le sondage ne remplit ni l'un ni l'autre — il reste
désactivé plutôt que livré à moitié.

## Spec fonctionnelle

### Templates (`activity-templates.ts`)

- **Rétrospective** : trois cadres titrés côte à côte — « Ce qui a bien marché », « À améliorer »,
  « Plan d'action »
- **Brainstorming** : un cadre « Brainstorming — vos idées »
- **Icebreaker** : un cadre « Icebreaker — la question du jour »
- Les trois présélectionnent l'outil post-it, pour écrire sans étape supplémentaire.
- Les titres sont portés comme **clés Transloco**, jamais comme littéraux : la résolution a lieu dans
  le composant hôte, le module de templates reste exempt de chaînes destinées à l'utilisateur.
- La rangée est centrée sur le **centre du viewport courant**
  (`StructuredCanvasComponent.viewportCentre()`), non sur l'origine du tableau : un template lancé
  après un panoramique atterrit dans le champ de vision.
- Les positions sont **arrondies à l'entier** — voir la contrainte d'appariement ci-dessous.

### État indisponible (a11y)

- Une activité non disponible rend son entrée `disabled` avec un badge textuel « Bientôt disponible »,
  et n'émet jamais `launch`. L'état n'est pas signalé par la seule opacité (WCAG SC 1.4.1).
- L'atténuation visuelle porte sur le glyphe et le libellé, **jamais sur le badge** : une opacité
  globale faisait passer son contraste sous 4,5:1 (SC 1.4.3).
- Sur un tableau en lecture seule (`VIEWER`), **toutes** les activités sont désactivées, raccourcis
  « récemment utilisées » compris — toute activité mute le tableau, un lecteur n'en lancera aucune.
- Même parti pris que la modale de paramètres du tableau (US08.2.4).

## Spec technique — création des cadres

### Contrainte : les échos ne sont ni ordonnés ni corrélables

Côté `pivot-core` (`CanvasActionService`), `frame:create` **ne fait pas transiter de `clientTag`**,
contrairement à `card:create`. L'écho `frame:created` est donc le seul moyen d'apprendre l'id faisant
autorité d'un cadre — et ces échos **ne reviennent pas dans l'ordre d'émission**.

Envoyer les trois créations d'une rétrospective en rafale rendait donc impossible de savoir quel écho
correspondait à quel cadre. Constaté en recette : les titres tournaient d'un cadre à l'autre.

### Réponse : `BoardStore.addTitledFrames`

- Les `frame:create` partent **un par un**, chacun attendant son propre écho. L'ordre devient
  trivialement garanti. Coût : un aller-retour par cadre.
- Le cadre en vol est identifié par **la position émise**, si bien que le cadre d'un autre
  participant — `frame:created` est diffusé à toute la salle — ne peut pas consommer un titre en
  attente. D'où l'arrondi des positions : la comparaison est exacte, et le centre du viewport est
  fractionnaire dès que le tableau a été zoomé.
- Le lot forme **une seule entrée d'historique** : un clic, un `Ctrl+Z`.
- **Rejeu (`redo`)** : `redo()` remet l'entrée sur la pile d'annulation *avant* de rejouer. Le run
  rejoué ne ré-empile donc pas — sans quoi l'entrée serait dupliquée et `pushHistory` viderait la
  pile de rétablissement, avalant un `Ctrl+Y` ultérieur. Les ids sont rafraîchis à chaque passage,
  de sorte qu'une annulation vise toujours les cadres qui existent réellement.
- **Délai de garde de 10 s** : `frame:create` n'est ni une action de cycle de vie ni `guaranteed`.
  Émis socket fermée, il est abandonné en silence ; un refus serveur ne renvoie rien. Sans cette
  échéance le run resterait bloqué indéfiniment, les cadres déjà créés hors de l'historique, et
  l'attente périmée pourrait plus tard réclamer un cadre étranger à la même position.
- **Réentrance** : un run en cours fait ignorer le suivant. Deux runs entrelacés laisseraient le
  premier orphelin, ses échos restants consommant une entrée d'annulation destinée à une création
  manuelle.

## Sécurité

- Aucune activité ne contourne `isReadonly()` : la vérification a lieu côté store **et** l'UI ne
  présente pas d'affordance actionnable à un `VIEWER`.
- La création passe exclusivement par les événements board existants ; l'autorité serveur et
  l'isolation tenant sont inchangées.
- Aucun nouvel endpoint, aucune nouvelle entité, aucune migration.

## Traçabilité des tests

| Comportement | Test |
|---|---|
| Rétrospective → 3 cadres, titrés dans l'ordre | `board.store.spec.ts` — run sérialisé · E2E `activities.spec.ts` |
| Cadre d'un autre participant ignoré pendant un run | `board.store.spec.ts` · E2E (cadre étranger intercalé à chaque étape) |
| `Ctrl+Z` annule tout le template | `board.store.spec.ts` — undo groupé |
| `redo` ne duplique pas l'entrée d'historique | `board.store.spec.ts` |
| Écho jamais reçu → run clos, créés annulables | `board.store.spec.ts` (timers simulés) |
| Second template pendant un run → ignoré | `board.store.spec.ts` |
| Sondage désactivé, n'émet jamais `launch` | `activities-panel.component.spec.ts` · E2E |
| Lecture seule → tout désactivé | `activities-panel.component.spec.ts` · `board-page.component.spec.ts` |
| Coordonnées entières | `board-page.component.spec.ts` · `activity-templates.spec.ts` |

**Recette manuelle** (backend + Postgres + STOMP réels, pas de mock) : rétrospective après zoom → trois
cadres titrés dans le bon ordre · `Ctrl+Z` annule le template entier · `Ctrl+Y` le restaure avec ses
titres · `Ctrl+Z` de nouveau l'annule · icebreaker → cadre titré, outil post-it actif · persistance
vérifiée après rechargement · aucune erreur console.

> Les trois défauts bloquants de cette PR (titres tournants, undo/redo désaligné, `redo` corrompant la
> pile) ont été trouvés **en recette et en revue, pas par la CI** : ils exigent au moins trois cadres et
> un vrai serveur pour se manifester.

## Dette connue — hors périmètre

`pendingFrameHistory` reste apparié en **FIFO** pour les créations manuelles de cadres, alors que
`frame:created` est diffusé à toute la salle : le cadre d'un autre participant peut consommer une
entrée d'annulation. Défaut **pré-existant**, non introduit par cette PR, mais de même cause racine —
l'absence de `clientTag` sur `frame:create`. Le corriger à la source suppose de le faire transiter
côté `pivot-core` (`CanvasActionService`), donc une PR backend dédiée. À arbitrer.

## Reste à faire sur F30.3

Le sondage (`poll`) reste la seule activité du catalogue sans implémentation. Le livrer suppose une
entité `collaboratif` (question, réponses par participant, agrégat temps réel) sur le modèle de
`V9__quiz.sql` — donc le déverrouillage de la `phase-3` et une US dédiée.
