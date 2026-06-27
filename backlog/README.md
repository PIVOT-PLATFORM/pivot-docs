# Backlog PIVOT — Modèle & conventions

> Source de vérité du **modèle** de backlog. Le backlog **opérationnel** vit dans le
> **GitHub Project de l'organisation** `PIVOT-PLATFORM` (« PIVOT Platform »). Tant que le
> produit n'est pas ouvert au public, les items sont des **éléments de Project** (pas encore
> des Issues repo). Les Issues seront créées à l'ouverture publique, reliées aux items.

---

## 1. Hiérarchie (SAFe-aligné)

```
EPIC
 ├── FEATURE      (valeur utilisateur)
 │    └── US      (incrément implémentable)
 └── ENABLER      (travail technique habilitant — même niveau que FEATURE)
      └── US
```

| Niveau | Définition | Exemple |
|--------|-----------|---------|
| **EPIC** | Grande capacité produit/métier. Souvent = un module ou un axe transverse. | `Authentification & IAM`, `Module Whiteboard` |
| **FEATURE** | Fonctionnalité livrable apportant de la valeur utilisateur. | `Login email/password`, `Tableau blanc temps réel` |
| **ENABLER** | Travail technique sans valeur user directe mais nécessaire (architecture, sécurité, infra, dette, recherche/spike). | `Bus d'événements modules`, `Pipeline SLSA L3` |
| **US** | User Story implémentable. Format `En tant que… je veux… afin de…`. | `US-AUTH-002` |

**Clé de nommage** (parent traçable sans Issues) :
`E01` → `F01.1` (feature) / `EN01.1` (enabler) → `US01.1.1` (story).

---

## 2. Champs du Project org

| Champ | Type | Valeurs |
|-------|------|---------|
| **Item Type** | single-select | `Epic` · `Feature` · `Enabler` · `US` (`Type` est un nom réservé GitHub) |
| **Parent** | text | Clé du parent (ex. `E01`, `F01.1`) |
| **Stage** | single-select | `Backlog` · `Ready` · `In progress` · `Review` · `Done` (le champ natif `Status` n'est pas reconfigurable via API) |
| **Human Gate** | single-select | `needs-human-valid` · `human-validated` |
| **Priority** | single-select | `Critical` · `High` · `Medium` · `Low` |
| **Module** | single-select (extensible) | `core` · `auth` · `admin` · `oidc` · `whiteboard` · `session` · `roadmap` · `survey` · `quiz` · *(nouveaux modules ajoutés au fil de l'eau)* |
| **Phase** | single-select | `MVP` · `v1-enterprise` · `phase-3` |
| **Sprint** | single-select | `Sprint 1` … `Sprint N` (planification temporelle) |
| **Size** | single-select | `XS` · `S` · `M` · `L` · `XL` |

---

## 3. Human Gate — démarrage d'implémentation

**Règle absolue : aucune implémentation ne démarre avant que `Human Gate = human-validated`.**

- Toute US naît en `needs-human-valid`.
- Le mainteneur passe l'item à `human-validated` après revue de l'US **et** de ses critères
  d'acceptation (= Breaking Point 1 de `CLAUDE.md`, et ACDD Gate 1 READINESS ≥ 70).
- `human-validated` + `Stage: Ready` = bon pour `In progress`.
- Sans `human-validated`, le Dev Agent **stoppe** et demande la validation.

---

## 4. Templates

### 4.1 EPIC
```markdown
**Intention** : [capacité produit/métier visée]
**Valeur** : [pourquoi, pour qui]
**Périmètre** : [features/enablers couverts]
**Hors périmètre** : [ce que l'Epic ne couvre pas]
**Modules impactés** : pivot-{…}
**Dépendances** : [autres Epics]
```

### 4.2 FEATURE
```markdown
**Description** : [fonctionnalité livrable]
**Bénéfice utilisateur** : [valeur]
**US rattachées** : US…, US…
**Critères de succès (feature-level)** :
- [ ] [résultat observable global]
**Hors périmètre** :
- [ ] […]
```

### 4.3 ENABLER
```markdown
**Type d'enabler** : architecture | infrastructure | sécurité | dette | spike
**Objectif technique** : [ce que ça habilite]
**Justification** : [pourquoi nécessaire avant/pendant les features]
**Critères de complétion** :
- [ ] […]
```

### 4.4 US (User Story)
```markdown
En tant que [admin / utilisateur / participant anonyme]
Je veux [action]
Afin de [bénéfice]

## Critères d'acceptation
- [ ] Given [contexte], when [action], then [résultat observable]
- [ ] Error : given [input invalide], system retourne [erreur / status code]
- [ ] Security : [propriété de sécurité garantie]
- [ ] A11y : [propriété WCAG 2.1 AA garantie] (si composant UI)

## Hors périmètre
- [ ] [ce que cette US ne couvre explicitement PAS]
- [ ] [cas reportés à une autre US / phase]

## Notes d'implémentation
- [contraintes techniques, pistes, fichiers/composants concernés]
- [points de sécurité / RGPD / perf à surveiller]
- [dépendances techniques, contrats d'API/module impactés]

---
Item Type: US · Parent: F… / EN… · Module: {x} · Phase: … · Size: … · Priority: …
Dépendances: …
```

---

## 5. Cycle de vie d'un item

```
Backlog ──(rédaction AC + hors-périmètre + notes)──► Ready
   │                                            │
   │                                   (mainteneur) Human Gate → human-validated
   ▼                                            ▼
needs-human-valid                          In progress ──► Review ──► Done
```

- **Claude** passe un item en `Review` quand Gate 2 (COVERAGE) est vert.
- **Le mainteneur** valide `Review → Done`.
- US bloquée → retour `Backlog` + note.

Voir `CLAUDE.md` (Gates ACDD, Breaking Points, Workflow) pour le détail du cycle de dev.

---

## 6. Phase active — verrou MVP

**La phase active reste `MVP` tant que le mainteneur n'a pas explicitement déclaré le MVP terminé.**

- Seuls les items `Phase: MVP` sont éligibles à `Ready`, `human-validated` et à l'implémentation.
- Les items `v1-enterprise` et `phase-3` existent dans le backlog mais restent en `Backlog`,
  `needs-human-valid` — **non travaillés**, quelle que soit leur priorité.
- Passage à la phase suivante = **décision explicite du mainteneur** (« MVP terminé »),
  qui débloque alors `v1-enterprise`.
- Tant que le verrou MVP est actif : ne rien valider ni implémenter hors `MVP`.

---

## 7. Périmètre cible (vision complète)

Epics transverses + un Epic par module. Modules **activables** et **extensibles**
(de nouveaux modules s'ajoutent sans casser l'existant — voir `architecture/modules-system.md`).

| Axe | Epics (indicatif) | Phase |
|-----|-------------------|-------|
| Plateforme | Système de modules, Observabilité, CI/CD & supply-chain | MVP → v1 |
| Auth & IAM | Auth opaque tokens, OIDC multi-tenant, Rôles & permissions | MVP → v1-enterprise |
| Admin | Activation modules, Gestion utilisateurs, Gestion tenants | MVP → v1-enterprise |
| Modules | whiteboard, session, quiz, survey, roadmap | MVP (1 module) → phase-3 |

Le contenu détaillé (Epics → Features/Enablers → US) est généré dans le Project org et
maintenu par vagues (MVP d'abord, puis v1-enterprise, puis phase-3).

---

## 8. Plan de construction du backlog

### 8.1 Méthode de décomposition

1. **EPIC** — on part de la capacité (module ou axe transverse). On décrit intention, valeur,
   périmètre, hors-périmètre.
2. **Décomposition Epic → FEATURE + ENABLER** :
   - une **Feature** par fonctionnalité à valeur utilisateur ;
   - un **Enabler** par brique technique nécessaire (sécurité, archi, infra, dette, spike).
3. **Décomposition Feature/Enabler → US** : chaque US est un incrément implémentable et testable,
   avec AC + critères de non-acceptation + notes d'implémentation.
4. Chaque US naît `Stage: Backlog` · `Human Gate: needs-human-valid`.

### 8.2 Definition of Ready (avant `human-validated`)

| Niveau | Doit contenir |
|--------|---------------|
| **Epic** | intention, valeur, périmètre, hors-périmètre, modules, dépendances |
| **Feature** | description, bénéfice utilisateur, US rattachées, critères de succès, hors-périmètre |
| **Enabler** | type, objectif technique, justification, critères de complétion |
| **US** | story `En tant que…`, ≥ 1 AC `Given/When/Then`, AC erreur + sécurité (+ A11y si UI), hors-périmètre, notes d'implémentation, champs renseignés (Type/Parent/Module/Phase/Size/Priority) |

> Le mainteneur ne passe `needs-human-valid → human-validated` que si la Definition of Ready
> du niveau est satisfaite (= Breaking Point 1 / ACDD Gate 1).

### 8.3 Ordre de construction (vagues)

| Vague | Contenu | Statut |
|-------|---------|--------|
| **1** | E01 Auth & IAM · E02 Espace compte · E05 CI/CD & supply-chain | ✅ seedé |
| **2** | Plateforme — Système de modules, Observabilité (surtout Enablers) | ⬜ |
| **3** | Admin — Activation modules, Gestion utilisateurs, Gestion tenants | ⬜ |
| **4** | 1er module MVP (whiteboard **ou** session) — Features + US | ⬜ |
| **ult.** | Autres modules, OIDC multi-tenant, RGPD cron/purge… (`v1-enterprise` / `phase-3`, **verrouillés**) | ⬜ |

Chaque vague suit §8.1–8.2 et reste dans `Phase: MVP` tant que le verrou MVP (§6) est actif.

---

## 9. Workflow draft → Issue (automatisé par Claude)

Les items naissent en **draft** (carte Project sans Issue). Un draft ne peut pas porter
de branche/PR ni être fermé par une PR. La conversion en Issue est donc le **déclencheur
d'implémentation**.

### Déclencheur unique : `Human Gate = human-validated`
- **Seul geste humain** : le mainteneur passe l'item `needs-human-valid → human-validated`
  (après revue de la Definition of Ready §8.2 = Breaking Point 1 / ACDD Gate 1).
- Claude **ne pose jamais** `human-validated` lui-même — il le **consomme**.
- **Pas d'automation live** : Claude lit l'état du Project (Human Gate, Stage, Phase) **au
  démarrage de session** et agit en conséquence — il n'y a pas de polling continu.

### Ce que Claude fait dès qu'un item est `human-validated` (et `Phase: MVP`)
1. **Convertit le draft en Issue** dans le repo cible (voir mapping ci-dessous).
   L'item garde sa place, son `Parent` et ses champs dans le Project.
2. **Fait avancer `Stage`** automatiquement :
   - `Backlog/Ready → In progress` au démarrage,
   - `→ Review` quand ACDD Gate 2 (COVERAGE) est vert,
   - le mainteneur valide `Review → Done` (recette).
3. Crée la branche `feat/us-{id}-{slug}` → PR `Closes #issue` → cycle dev de `CLAUDE.md`.

### Mapping Module → repo cible
| Module / nature | Repo |
|-----------------|------|
| backend, BDD, API, sécurité serveur | `pivot-core` |
| UI Angular, front | `pivot-ui` |
| documentation, ADR | `pivot-docs` |

> **1 draft → 1 Issue → 1 repo.** Une US réellement *full-stack* se **scinde** en deux US
> (une `pivot-core`, une `pivot-ui`) sous la même Feature/Enabler — on ne convertit pas un
> draft en deux Issues.

### Garde-fous
- Rien hors `Phase: MVP` n'est converti/implémenté tant que le verrou MVP (§6) est actif.
- Un item sans Definition of Ready (§8.2) reste `needs-human-valid` — non converti.
- US bloquée en cours → retour `Stage: Backlog` + note, conformément à la règle d'escalade
  (`CLAUDE.md`, 2 tentatives max).

### Répartition des rôles
| Acteur | Responsabilité |
|--------|----------------|
| **Mainteneur** | pose `human-validated` · valide `Review → Done` · déclare « MVP terminé » |
| **Claude** | rédige/affine les items · convertit draft → Issue · déplace les `Stage` · implémente |
