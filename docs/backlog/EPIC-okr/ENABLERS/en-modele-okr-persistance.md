# EN27.1a — Modèle OKR & persistance (schéma `pilotage`)

**Type d'enabler** : architecture

**Objectif technique** : Poser le modèle de données OKR de l'état de l'art et sa persistance
Flyway au schéma `pilotage` : entités `Cycle`, `Objective`, `KeyResult`, `Alignment`,
`Initiative`, `CheckIn` avec leurs contraintes d'intégrité, sans aucune logique de calcul (le
moteur d'avancement/score/statut relève d'EN27.1b).

Entités (schéma `pilotage`) :

```text
Cycle (trimestriel | annuel, ouvert/gelé/clôturé)
Objective (qualitatif, type engageant|aspirationnel, owner : entreprise|équipe|individu)
   ├─< KeyResult (type métrique|jalon|booléen|%, baseline/actuel/cible, unité, poids)
   ├─< Alignment (référence Objective parent) — arbre, contrainte anti-cycle en EN27.1c
   ├─< Initiative (lien logique vers projet/epic — le « comment », pas de FK inter-modules)
   └─< CheckIn (valeur, confiance, commentaire, horodaté)
```

**Justification** : Fondation persistante indispensable à tout le reste du module OKR — aucun
moteur, connecteur ni écran ne peut exister sans le modèle et ses tables. Isole la partie
« schéma + repositories » du parent XL pour un lot livrable et testable indépendamment.

**Critères de complétion** :
- [ ] Migration Flyway créant `cycle`, `objective`, `key_result`, `alignment`, `initiative`,
  `check_in` au schéma `pilotage` (types, contraintes `NOT NULL`, énumérations, index)
- [ ] Colonne de rattachement au `tenant` sur chaque table racine et propagation par jointure
  (isolation multi-tenant au niveau persistance)
- [ ] Entités JPA + repositories Spring Data pour chaque agrégat, sans logique de calcul
- [ ] Contrainte de cardinalité recommandée 3–5 KR par Objective vérifiée à l'écriture (garde-fou
  volume, rejet au-delà d'un plafond configurable)
- [ ] Champ `owner` typé (`entreprise` | `équipe` | `individu`) et `confidentialité` sur
  `Objective` individuel (support RGPD, exploité par EN27.1d et les US gouvernance)

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un tenant valide et un `Cycle` ouvert, when je persiste un `Objective` avec 3
  `KeyResult`, then l'agrégat est enregistré au schéma `pilotage` et relu à l'identique.
- [ ] Given un `Objective` déjà porteur de 5 `KeyResult`, when j'en ajoute un 6e au-delà du
  plafond configuré, then l'écriture est rejetée avec une erreur de validation métier.
- [ ] Error case: given une insertion de `KeyResult` avec un `cible` absent ou une `unité`
  incohérente avec le `type`, when la persistance est tentée, then une contrainte d'intégrité
  rejette l'écriture (`400`) sans créer de ligne orpheline.
- [ ] Error case: given une lecture d'un `Objective` inexistant ou appartenant à un autre tenant,
  when le repository est interrogé, then aucune donnée n'est renvoyée (`404` côté service appelant,
  jamais de fuite cross-tenant).
- [ ] Security: isolation multi-tenant garantie au niveau persistance — toute requête est filtrée
  par le tenant courant ; un `Objective`/`KeyResult` d'un autre tenant est invisible et se comporte
  comme inexistant (`404` non-membre/cross-tenant, jamais `403` révélateur d'existence).

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E27 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Profils: Tous
Justification: Modèle de données + persistance OKR au schéma `pilotage` — fondation du module (issu de la décomposition d'EN27.1 XL)
Dépendances: EN18.1 (schéma `pilotage`) · EN18.2 (guard)
