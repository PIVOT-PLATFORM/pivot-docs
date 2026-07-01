---
slug: /
sidebar_position: 0
sidebar_label: "Vue d'ensemble"
---

# Backlog PIVOT — Modèle & conventions

> Source de vérité du **modèle** de backlog. Le backlog opérationnel vit dans les fichiers
> markdown de **`pivot-docs/backlog/`**. L'état des sprints et l'avancement des US sont dans
> **`SPRINTS.md`**. Toute mise à jour d'état se commit sur la branche de l'US en cours.

---

## 1. Hiérarchie (SAFe-aligné)

```text
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
| **ENABLER** | Travail technique sans valeur user directe mais nécessaire (architecture, sécurité, infra, dette, spike). | `Bus d'événements modules`, `Pipeline SLSA L3` |
| **US** | User Story implémentable. Format `En tant que… je veux… afin de…`. | `US01.1.1` |

**Clé de nommage :** `E01` → `F01.1` (feature) / `EN01.1` (enabler) → `US01.1.1` (story).

---

## 2. Champs (frontmatter markdown)

Chaque fichier US porte en pied de fichier les métadonnées suivantes :

```text
Item Type: US · Parent: F… / EN… · Module: {x} · Phase: … · Size: … · Priority: …
Stage: Backlog
Dépendances: …
```

| Champ | Valeurs |
|-------|---------|
| **Item Type** | `Epic` · `Feature` · `Enabler` · `US` |
| **Parent** | Clé du parent (ex. `E01`, `F01.1`) |
| **Stage** | `Backlog` · `Ready` · `In progress` · `Review` · `Done` |
| **Priority** | `Critical` · `High` · `Medium` · `Low` |
| **Module** | `core` · `auth` · `admin` · `oidc` · `whiteboard` · `session` · `roadmap` · `survey` · `quiz` |
| **Phase** | `MVP` · `v1-enterprise` · `phase-3` |
| **Size** | `XS` · `S` · `M` · `L` · `XL` |

---

## 3. Challenge PO — démarrage d'implémentation

**Gate 1 ≥ 70 requis avant implémentation — calculé et validé par le PO Agent (Claude).**

| Transition | Qui | Condition |
|------------|-----|-----------|
| `Backlog → Ready` | **Claude** (PO Agent) | DoR §8.2 satisfaite + Gate 1 ≥ 70 |
| `Ready → In progress` | **Claude** (Dev Agent) | Immédiat après `Stage: Ready` |

- Gate 1 < 70 → PO Agent réécrit/clarifie les ACs → recalculer → procéder dès ≥ 70.
- AC ambigus en cours d'implémentation → PO Agent clarifie → jamais d'interprétation unilatérale.
- Pas de blocage humain — Claude est autonome de A à Z sur la validation des ACs.

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

| Critère | 🤖 Dev |
|---------|--------|-------|
| Given [contexte], when [action], then [résultat observable] | ⬜ |
| Error : given [input invalide], system retourne [erreur / status code] | ⬜ |
| Security : [propriété de sécurité garantie] | ⬜ |
| A11y : [propriété WCAG 2.1 AA garantie] (si composant UI) | ⬜ |

---
Item Type: US · Parent: F… / EN… · Module: {x} · Phase: … · Size: … · Priority: …
Stage: Backlog
Dépendances: …
```

---

## 5. Cycle de vie d'un item

```text
Backlog ──(PO Agent : DoR + Gate 1 ≥ 70)──► Ready ──(Dev Agent)──► In progress
                                                                          │
                                                                     (implémentation + autoloop PR)
                                                                          │
Done ◄──(mainteneur : merge PR)────────────── Review ◄───────────────────┘
```

| Transition | Qui | Condition |
|------------|-----|-----------|
| `Backlog → Ready` | **Claude** (PO Agent) | DoR §8.2 satisfaite + Gate 1 ≥ 70 |
| `Ready → In progress` | **Claude** (Dev Agent) | Immédiat |
| `In progress → Review` | **Claude** | PR autoloop terminé (Gate 4 vert, CI verte, max 10 boucles) |
| `Review → Done` | **Mainteneur** | Merge PR — **jamais Claude** |

- US bloquée → retour `Backlog` + note dans SPRINTS.md.
- Mise à jour du frontmatter (`Stage`) dans le fichier US à chaque transition — commit sur la branche de l'US.

---

## 6. Phase active — verrou MVP

**La phase active reste `MVP` tant que le mainteneur n'a pas explicitement déclaré le MVP terminé.**

- Seuls les items `Phase: MVP` sont éligibles à `Ready` et à l'implémentation.
- Les items `v1-enterprise` et `phase-3` existent dans le backlog mais restent en `Backlog`, `needs-human-valid` — **non travaillés**.
- Passage à la phase suivante = **décision explicite du mainteneur** (« MVP terminé »).

---

## 7. Périmètre cible (vision complète)

| Axe | Epics (indicatif) | Phase |
|-----|-------------------|-------|
| Plateforme | Système de modules, Observabilité, CI/CD & supply-chain | MVP → v1 |
| Auth & IAM | Auth opaque tokens, OIDC multi-tenant, Rôles & permissions | MVP → v1-enterprise |
| Admin | Activation modules, Gestion utilisateurs, Gestion tenants | MVP → v1-enterprise |
| Modules | whiteboard, session, quiz, survey, roadmap | MVP (1 module) → phase-3 |

---

## 8. Plan de construction du backlog

### 8.1 Méthode de décomposition

1. **EPIC** — on part de la capacité (module ou axe transverse). On décrit intention, valeur, périmètre, hors-périmètre.
2. **Décomposition Epic → FEATURE + ENABLER** : une Feature par fonctionnalité à valeur utilisateur ; un Enabler par brique technique nécessaire.
3. **Décomposition Feature/Enabler → US** : chaque US est un incrément implémentable et testable, avec AC + notes d'implémentation.
4. Chaque US naît `Stage: Backlog`.

### 8.2 Definition of Ready (Gate 1 — avant `In progress`)

| Niveau | Doit contenir |
|--------|---------------|
| **Epic** | intention, valeur, périmètre, hors-périmètre, modules, dépendances |
| **Feature** | description, bénéfice utilisateur, US rattachées, critères de succès, hors-périmètre |
| **Enabler** | type, objectif technique, justification, critères de complétion |
| **US** | story `En tant que…`, ≥ 1 AC `Given/When/Then`, AC erreur + sécurité (+ A11y si UI), hors-périmètre, notes d'implémentation, champs frontmatter renseignés |

> Le PO Agent vérifie la DoR et calcule Gate 1. Score ≥ 70 → `Stage: Ready` → implémentation immédiate.

### 8.3 Ordre de construction (vagues)

| Vague | Contenu | Statut |
|-------|---------|--------|
| **1** | E01 Auth & IAM · E02 Espace compte · E05 CI/CD & supply-chain | ✅ seedé |
| **2** | Plateforme — Système de modules, Observabilité (surtout Enablers) | ⬜ |
| **3** | Admin — Activation modules, Gestion utilisateurs, Gestion tenants | ⬜ |
| **4** | 1er module MVP (whiteboard **ou** session) — Features + US | ⬜ |
| **ult.** | Autres modules, OIDC multi-tenant, RGPD (`v1-enterprise` / `phase-3`, **verrouillés**) | ⬜ |

---

## 9. Structure des fichiers markdown

```text
pivot-docs/backlog/
├── SPRINTS.md              ← état des sprints, assignation US, avancement
├── README.md               ← ce fichier — modèle & conventions
├── EPIC-auth-iam/
│   ├── README.md           ← description de l'epic
│   └── FEATURES/
│       ├── login/
│       │   ├── us-connexion-email.md
│       │   └── us-deconnexion.md
│       └── ...
├── EPIC-whiteboard/
│   └── ...
└── ...
```

**Règles de fichiers :**
- 1 fichier par US / Enabler — nommage `us-{slug}.md` ou `en-{slug}.md`
- Frontmatter en pied de fichier (champs §2)
- Mise à jour `Stage` dans le fichier à chaque transition, committée sur la branche de l'US

---

## 10. Démarrage de session Claude

Au démarrage de chaque session, Claude :

1. Lit `pivot-docs/docs/backlog/SPRINTS.md` — identifie le sprint courant
2. Lit les fichiers US du sprint courant — vérifie `Stage` et `Phase`
3. Pour chaque US `Stage: In progress` → reprend la branche existante, vérifie l'état de la PR
4. Pour chaque US `Stage: Ready` → lance l'implémentation (branche `feat/{us-id}-{slug}`)
5. Pour chaque US `Stage: Backlog` éligible (Phase MVP, priorité) → PO Agent vérifie DoR + Gate 1 → passe `Ready` → implémente

**Priorité :** Critical → High → Medium → Low. Phase MVP uniquement tant que verrou actif (§6).

---

## 11. Autoloop PR — cycle par US

Après implémentation d'une US sur `feat/{us-id}-{slug}` :

1. Ouvrir une PR (ou draft PR)
2. **Autoloop** (10 itérations max) :
   - **Review neutre** — Expert PR Review : cohérence architecture, AC couverts, sécurité, dette, a11y
   - **Corrections** — appliquées sur la branche, commit `fix({scope}): ...`
   - **CI** — `mvn verify -q` + `npx tsc --noEmit` + `npm run lint` + `npm run test:ci` + build prod = 0 erreur
   - **Corrections CI** — si échec, corriger et relancer
   - **Convergence** — Gate 4 ≥ 85 ET CI verte → sortir de la boucle
3. **Gate 4 vert** → mettre `Stage: Review` dans le frontmatter US + signal mainteneur "PR prête"
4. **Blocage 10 boucles** → Breaking Point 2 (label `needs-human-review`, escalade mainteneur)

---

## Répartition des rôles

| Acteur | Responsabilité |
|--------|----------------|
| **Mainteneur** | merge PR (`Review → Done`) · déclare « MVP terminé » |
| **Claude** | rédige/affine items · challenge ACs (PO Agent) · implémente · ouvre PR · autoloop review+CI · met à jour `Stage` dans frontmatter · **jamais `Done`** |
