# EN-I18N — Convention i18n des modules : scope Transloco embarqué par lib

**Type d'enabler** : architecture · transversal

**Objectif technique** : Établir la convention formelle par laquelle **chaque lib UI de module
(`pivot-xxx-ui`) possède son propre scope Transloco et embarque ses traductions dans son bundle
npm**, de sorte qu'aucun host (`pivot-ui` ou tout futur shell) n'ait jamais à recopier ou
maintenir les traductions d'un module qu'il charge en lazy-loading.

**Justification** : L'éditeur de tableau blanc (`@pivot-platform/collaboratif-ui`) affichait ses
libellés en clés i18n brutes (`whiteboard.board.untitled`, `whiteboard.toolbar.*`, …) — la lib
émettait des clés Transloco globales sans scope ni loader, et le shell devait recopier
manuellement l'arbre `whiteboard.*` complet dans son catalogue. Ce couplage host↔lib a dérivé
au passage de la lib en `0.2.0` (57 clés ajoutées, non recopiées). Un correctif ponctuel
(`pivot-ui` PR #188 — recomplète les clés côté shell) **pérennise le couplage** plutôt que de le
résoudre : chaque futur module (`pilotage`, `agilite`, …) reproduirait le même problème dès
qu'il gagnerait une UI. Cet enabler acte la solution pérenne et générique — voir
[ADR-029](pathname:///pivot-docs/adr/ADR-029-i18n-modules-scope-transloco) — et vaut pour tous les
modules, présents et futurs.

**Critères de complétion** :
- [x] Chaque lib UI de module porte son propre scope Transloco (nommé d'après sa clé de module),
      enregistré via sa fonction `provideXxxUi()` au moyen d'un `InlineLoader` — traductions
      compilées dans le bundle npm de la lib, aucun asset externe côté host
- [ ] Implémentation de référence — PR pivot-collaboratif-ui #93 (draft, en attente de merge), scope `whiteboard`
- [ ] Test anti-fuite côté host (`pivot-ui`) : assertion qu'aucune clé de namespace de module
      (`whiteboard`, `pilotage`, `agilite`, …) n'existe dans le catalogue global du shell
- [ ] Catalogue global de `pivot-ui` nettoyé du sous-arbre `whiteboard` — clôture de
      `pivot-ui` PR #188
- [x] [ADR-029](pathname:///pivot-docs/adr/ADR-029-i18n-modules-scope-transloco) publié —
      décision, alternatives écartées (assets copiés par le host ; i18n servi par le backend du
      module) et conséquences actées
- [ ] Skill i18n frontend mise à jour (les libs de module ownent leur scope ; les hosts ne
      recopient jamais)

**Statut** : ⬜ En cours — implémentation de référence `pivot-collaboratif-ui` PR #93 (draft, en attente de merge),
convention actée par ADR-029 ; nettoyage `pivot-ui` (retrait du sous-arbre `whiteboard`, test
anti-fuite) et mise à jour de la skill i18n en attente de leur PR dédiée dans leurs repos
respectifs (isolation par repo — une PR par repo concerné).

---
Item Type: Enabler · Parent: E03 (transversal) · Type: architecture · Module: core · Phase: Socle
Stage: ⬜ · Priority: High
Dépendances: EN03.4 (contrat de module frontend) · pivot-collaboratif-ui PR #93 (impl. de référence)
