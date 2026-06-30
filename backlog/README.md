# Backlog PIVOT — Modèle & conventions

> Source de vérité du **modèle** de backlog. Le backlog opérationnel vit dans les fichiers
> markdown de **`pivot-docs/backlog/`**. L'état des sprints et l'avancement des US sont dans
> **`SPRINTS.md`**. Toute mise à jour d'état se commit sur la branche de l'US en cours.

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
| **ENABLER** | Travail technique sans valeur user directe mais nécessaire (architecture, sécurité, infra, dette, spike). | `Bus d'événements modules`, `Pipeline SLSA L3` |
| **US** | User Story implémentable. Format `En tant que… je veux… afin de…`. | `US01.1.1` |

**Clé de nommage :** `E01` → `F01.1` (feature) / `EN01.1` (enabler) → `US01.1.1` (story).

---

## 2. Champs (frontmatter markdown)

Chaque fichier US porte en pied de fichier les métadonnées suivantes :

```
Item Type: US · Parent: F… / EN… · Module: {x} · Phase: … · Size: … · Priority: …
Human Gate: needs-human-valid · Stage: Backlog
Dépendances: …
```

| Champ | Valeurs |
|-------|---------|
| **Item Type** | `Epic` · `Feature` · `Enabler` · `US` |
| **Parent** | Clé du parent (ex. `E01`, `F01.1`) |
| **Stage** | `Backlog` · `Ready` · `In progress` · `Review` · `Done` |
| **Human Gate** | `needs-human-valid` · `human-validated` · `human-reject` |
| **Priority** | `Critical` · `High` · `Medium` · `Low` |
| **Module** | `core` · `auth` · `admin` · `oidc` · `whiteboard` · `session` · `roadmap` · `survey` · `quiz` |
| **Phase** | `MVP` · `v1-enterprise` · `phase-3` |
| **Size** | `XS` · `S` · `M` · `L` · `XL` |

---

## 3. Human Gate — démarrage d'implémentation

**Règle absolue : aucune implémentation ne démarre avant que `Human Gate = human-validated`.**

| Valeur | Posé par | Signification |
|--------|----------|---------------|
| `needs-human-valid` | Claude (à la création) | En attente de revue mainteneur |
| `human-validated` | Mainteneur **seul** | AC et périmètre validés — implémentation autorisée |
| `human-reject` | Mainteneur **seul** | Rejeté — AC ambigus, périmètre incorrect ; retravailler avant nouvelle soumission |

- Toute US / Enabler naît en `needs-human-valid`.
- `human-validated` + `Stage: Ready` = bon pour `In progress`.
- `human-reject` → Claude **stoppe**, ouvre un dialogue PO pour challenger et corriger l'AC. Repasse à `needs-human-valid` après réécriture.
- Claude **ne pose jamais** `human-validated` ni `human-reject` — consommation uniquement.
- Le mainteneur met à jour le frontmatter du fichier US et commit sur la branche courante.

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

| Critère | 🤖 Dev | ✅ PO |
|---------|--------|-------|
| Given [contexte], when [action], then [résultat observable] | ⬜ | ⬜ |
| Error : given [input invalide], system retourne [erreur / status code] | ⬜ | ⬜ |
| Security : [propriété de sécurité garantie] | ⬜ | ⬜ |
| A11y : [propriété WCAG 2.1 AA garantie] (si composant UI) | ⬜ | ⬜ |

---
Item Type: US · Parent: F… / EN… · Module: {x} · Phase: … · Size: … · Priority: …
Human Gate: needs-human-valid · Stage: Backlog
Dépendances: …
```

---

## 5. Cycle de vie d'un item

```
Backlog ──(Claude : rédaction AC + DoR)──► Ready ──(mainteneur : human-validated)──► In progress
                                                                                           │
                                                                                      (Claude : implémentation + autoloop PR)
                                                                                           │
Done ◄──(mainteneur : merge PR)──────────── Review ◄────────────────────────────────────────┘
```

| Transition | Qui | Condition |
|------------|-----|-----------|
| `Backlog → Ready` | **Claude** | Definition of Ready §8.2 satisfaite |
| `Ready → In progress` | **Claude** | Après `Human Gate = human-validated` par le mainteneur |
| `In progress → Review` | **Claude** | PR autoloop terminé (Gate 4 vert, CI verte, max 10 boucles) |
| `Review → Done` | **Mainteneur** | Merge PR — **jamais Claude** |

- US bloquée → retour `Backlog` + note dans SPRINTS.md.
- Mise à jour du frontmatter (`Stage`, `Human Gate`) dans le fichier US à chaque transition — commit sur la branche de l'US.

---

## 6. Phase active — verrou MVP

**La phase active reste `MVP` tant que le mainteneur n'a pas explicitement déclaré le MVP terminé.**

- Seuls les items `Phase: MVP` sont éligibles à `Ready`, `human-validated` et à l'implémentation.
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
4. Chaque US naît `Stage: Backlog` · `Human Gate: needs-human-valid`.

### 8.2 Definition of Ready (avant `human-validated`)

| Niveau | Doit contenir |
|--------|---------------|
| **Epic** | intention, valeur, périmètre, hors-périmètre, modules, dépendances |
| **Feature** | description, bénéfice utilisateur, US rattachées, critères de succès, hors-périmètre |
| **Enabler** | type, objectif technique, justification, critères de complétion |
| **US** | story `En tant que…`, ≥ 1 AC `Given/When/Then`, AC erreur + sécurité (+ A11y si UI), hors-périmètre, notes d'implémentation, champs frontmatter renseignés |

> Le mainteneur ne passe `needs-human-valid → human-validated` que si la Definition of Ready est satisfaite (= Breaking Point 1 / ACDD Gate 1).

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

```
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
- Mise à jour `Stage` et `Human Gate` dans le fichier à chaque transition, committée sur la branche de l'US

---

## 10. Démarrage de session Claude

Au démarrage de chaque session, Claude :

1. Lit `pivot-docs/backlog/SPRINTS.md` — identifie le sprint courant et les US `In progress` ou `Ready`
2. Lit les fichiers US du sprint courant — vérifie `Human Gate` et `Stage`
3. Pour chaque US `human-validated` + `Stage: Ready` → lance l'implémentation (branche `feat/{us-id}-{slug}`)
4. Pour chaque US `Stage: In progress` → reprend la branche existante, vérifie l'état de la PR
5. Ne travaille pas les US `needs-human-valid` — attend la validation mainteneur

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
| **Mainteneur** | pose `human-validated` dans le frontmatter US · merge PR (`Review → Done`) · déclare « MVP terminé » |
| **Claude** | rédige/affine les items · implémente · ouvre PR · autoloop review+CI · met à jour `Stage` dans frontmatter · **jamais `Done`** |
