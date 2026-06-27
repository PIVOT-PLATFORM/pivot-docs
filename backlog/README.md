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
| **Type** | single-select | `Epic` · `Feature` · `Enabler` · `US` |
| **Parent** | text | Clé du parent (ex. `E01`, `F01.1`) |
| **Status** | single-select | `Backlog` · `Ready` · `In progress` · `Review` · `Done` |
| **Human Gate** | single-select | `needs-human-valid` · `validated` |
| **Priority** | single-select | `Critical` · `High` · `Medium` · `Low` |
| **Module** | single-select (extensible) | `core` · `auth` · `admin` · `oidc` · `whiteboard` · `session` · `roadmap` · `survey` · `quiz` · *(nouveaux modules ajoutés au fil de l'eau)* |
| **Phase** | single-select | `MVP` · `v1-enterprise` · `phase-3` |
| **Size** | single-select | `XS` · `S` · `M` · `L` · `XL` |

---

## 3. Human Gate — démarrage d'implémentation

**Règle absolue : aucune implémentation ne démarre tant que `Human Gate = validated`.**

- Toute US naît en `needs-human-valid`.
- Le mainteneur passe l'item à `validated` après revue de l'US **et** de ses critères
  d'acceptation (= Breaking Point 1 de `CLAUDE.md`, et ACDD Gate 1 READINESS ≥ 70).
- `validated` + `Status: Ready` = bon pour `In progress`.
- Sans `validated`, le Dev Agent **stoppe** et demande la validation.

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

## Critères de NON-acceptation (hors périmètre)
- [ ] [ce que cette US ne couvre explicitement PAS]
- [ ] [cas reportés à une autre US / phase]

## Notes d'implémentation
- [contraintes techniques, pistes, fichiers/composants concernés]
- [points de sécurité / RGPD / perf à surveiller]
- [dépendances techniques, contrats d'API/module impactés]

---
Type: US · Parent: F… / EN… · Module: pivot-{x} · Phase: … · Size: … · Priority: …
Dépendances: …
```

---

## 5. Cycle de vie d'un item

```
Backlog ──(rédaction AC + non-AC + notes)──► Ready
   │                                            │
   │                                   (mainteneur) Human Gate → validated
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

- Seuls les items `Phase: MVP` sont éligibles à `Ready`, `validated` et à l'implémentation.
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
