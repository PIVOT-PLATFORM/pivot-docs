# EN08.5 — Test de contrat wire whiteboard (source de vérité partagée front/back)

**En tant que** équipe de développement du domaine Collaboratif
**Je veux** un test automatisé, exécuté des deux côtés (backend Spring/STOMP et frontend Angular),
qui vérifie que le vocabulaire et la forme des messages temps réel `card:*`/`board:*`/`connection:*`
sont identiques de part et d'autre
**Afin de** empêcher la classe de bug où le front et le back divergent silencieusement sur le
contrat wire (casse, nom de champ, nom de type, forme de payload) — dérive invisible aux tests
unitaires dont les mocks reproduisent la même hypothèse fausse que le code testé.

## Contexte

La recette v2 (`docs/audits/audit-recette-fonctionnelle.md`, §v2, 2026-07-14) a trouvé **4 bugs
réels (S1–S4)** partageant une cause unique : le front et le back **redéfinissent chacun de leur
côté** le contrat wire (`board.store.ts` d'un côté, `CanvasEventType`/`CanvasActionService` de
l'autre), et chaque mock de test encodait la mauvaise hypothèse plutôt que le contrat réel de
l'autre côté. Aucun de ces bugs n'était visible avant un test contre le vrai réseau/vrai backend :

- **S1** — casse du champ `role` (`"owner"` REST vs `"OWNER"` WS).
- **S2** — nom de champ (`name` lu côté front vs `title` émis côté back).
- **S3** — nom de type wire (`"RESET"` émis vs `'board:resetted'` écouté).
- **S4** — vocabulaire complet `card:*`/`board:*` (`valueOf(toUpperCase())` back vs minuscules
  deux-points front) → toute action carte jetée silencieusement.

`en-modele-card-type.md` (EN08.4) est la **source de vérité humaine** du contrat. Cet enabler la
rend **exécutable** : un test la fige et casse dès qu'un seul côté dérive. La recommandation #1 de l'audit v2
(« test de contrat wire partagé, vérifié par un test automatisé ») devient plus urgente à mesure
que les connecteurs (US08.7.1/.2), les cadres et la facilitation étendent le même contrat.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| **Vocabulaire — backend** : given l'ensemble des types wire de `CanvasEventType`, when le test de contrat s'exécute, then il compare la liste exhaustive des couples `(type entrant, type diffusé)` (ex. `card:create`→`card:created`, `connection:update`→`connection:updated`, `board:join`, `board:cursor`, `board:resetted`, …) à une **liste canonique versionnée** dans le repo ; tout ajout/retrait/renommage non répercuté dans la liste canonique fait échouer le test | ⬜ |
| **Vocabulaire — frontend** : given les types que `board.store`/le transport émettent (`emit`) et écoutent (`on`), when le test de contrat s'exécute, then il les compare à la **même liste canonique** (texte identique à celle du backend et de `en-modele-card-type.md`) ; une dérive unilatérale d'un côté rend le test rouge de l'autre | ⬜ |
| **Forme de payload — génération** : given une instance représentative de chaque DTO sortant (`CardDto`, `CardConnectionDto`, DTO de présence, `board:state`), when le test backend s'exécute, then il **sérialise** cette instance en JSON canonique et l'écrit/vérifie dans un jeu de **fixtures versionnées** — les fixtures sont **générées depuis les vrais DTO**, jamais écrites à la main (élimine la cause racine S1/S2) | ⬜ |
| **Forme de payload — consommation** : given les fixtures JSON canoniques produites par le backend, when le test frontend de réconciliation `board.store` s'exécute, then il est **piloté par ces mêmes fixtures** (pas un mock reconstruit à la main) et vérifie que le front parse exactement les champs/casse/types émis par le back | ⬜ |
| **Synchronisation des fixtures** : given que backend et frontend vivent dans deux repos sans artefact de contrat partagé publié, when les fixtures canoniques changent, then le mécanisme de synchronisation (source unique + script/procédure de copie versionnée, et vérification CI que la copie n'a pas divergé) est **documenté** dans les deux repos et dans `en-modele-card-type.md` | ⬜ |
| **Intégration CI** : given les pipelines existants, when une PR touche le contrat wire, then les deux tests tournent dans les jobs déjà en place (`Tests Backend (TU + TI)` côté core, `Tests (Vitest)` côté ui) — aucun nouveau job requis | ⬜ |
| Error : given un renommage d'un type wire d'un seul côté (ex. `connection:updated`→`connection:changed` côté back uniquement), when les tests de contrat s'exécutent, then au moins un des deux tests échoue explicitement en pointant la divergence (démontré par un test de non-régression ou une note reproductible) | ⬜ |
| Security : le test de contrat n'introduit aucun endpoint ni exposition nouvelle ; les fixtures ne contiennent aucune donnée réelle de tenant/utilisateur (valeurs de test synthétiques uniquement, pas de secret) | ⬜ |

## Hors périmètre

- Refonte du contrat en **artefact partagé publié** (schéma AsyncAPI/OpenAPI généré, package npm/Maven de types de contrat consommé par les deux repos) — évolution future souhaitable qui supprimerait la synchronisation manuelle des fixtures, mais hors du périmètre de cet enabler MVP (noté comme dette d'évolution).
- Contrat des **routes REST** (`BoardResponse`, `MemberResponse`, …) — S1 était côté REST ; cet enabler se concentre sur le **wire STOMP** (cause de S3/S4, la plus structurante pour la parité whiteboard). Un enabler jumeau pour le contrat REST pourra suivre si la même classe de bug s'y reproduit.
- Tests de charge/latence du canal temps réel — couverts par EN30.1 (latence temps réel) et EN30.5 (fluidité boards chargés).

## Notes d'implémentation

- **Deux couches complémentaires.** La couche *vocabulaire* (liste des types wire) est réalisable
  indépendamment de chaque côté et attrape S3/S4 ; la couche *fixtures de payload* (JSON généré
  depuis les vrais DTO, rejoué côté front) attrape S1/S2. Les deux ensemble ferment la classe de bug.
- **Backend = générateur et source de vérité des fixtures.** Un test `pivot-collaboratif-core`
  sérialise via le même `ObjectMapper` que la prod une instance de chaque DTO sortant et fige le
  JSON canonique (assertion contre le fichier committé, régénérable par une propriété/flag de test).
  Le vocabulaire est figé en listant `CanvasEventType.values()` (couples entrant/sortant) contre la
  liste canonique.
- **Frontend = consommateur.** Un test `board.store` charge les fixtures canoniques (copie
  synchronisée dans le repo ui) et pilote la réconciliation ; un test de vocabulaire asserte les
  types émis/écoutés. Les deux listes canoniques (core, ui) doivent rester du texte **identique** à
  la table de contrat de `en-modele-card-type.md`.
- **Synchronisation des fixtures (décision MVP).** Faute d'artefact partagé publié, le backend est
  la source ; les fixtures sont copiées dans le repo ui (script + note versionnée) et une
  vérification CI signale toute divergence. Le passage à un artefact publié (hors périmètre) est la
  cible d'évolution.
- **Anti-régression.** Prévoir la démonstration explicite (test ou procédure reproductible) qu'un
  renommage unilatéral d'un type casse bien le test du côté opposé — sinon le test ne prouve rien.
- Source : recommandation #1 de l'audit de recette fonctionnelle v2 (`docs/audits/audit-recette-fonctionnelle.md`
  §v2, findings S1–S4 et Recommandations). Prévention de la classe de bug de désynchronisation de
  contrat wire front/back.

---
Item Type: Enabler · Parent: E30 · Module: whiteboard · Phase: Socle · Size: M · Priority: High
Stage: ⬜
Source: Recommandation #1 de l'audit de recette fonctionnelle v2 (`docs/audits/audit-recette-fonctionnelle.md` §v2) — prévention de la classe de bug S1–S4 (désynchronisation du contrat wire front/back). Contrat de référence : `en-modele-card-type.md` (EN08.4).
Dépendances: EN08.4 (modèle Card typé + contrats WebSocket — le contrat que ce test fige) ; étend sa couverture aux connecteurs US08.7.1/US08.7.2.
