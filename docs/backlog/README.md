---
slug: /
sidebar_position: 0
sidebar_label: "Vue d'ensemble"
---

# Backlog PIVOT — Modèle & conventions

> Source de vérité du **modèle** de backlog. Le backlog opérationnel vit dans les fichiers
> markdown de **`pivot-docs/backlog/`**. L'état des sprints et l'avancement des US sont dans
> **`docs/backlog/sprints/`** (un fichier par sprint). Toute mise à jour d'état se commit sur la branche de l'US en cours.

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
Stage: ⬜
Dépendances: …
```

| Champ | Valeurs |
|-------|---------|
| **Item Type** | `Epic` · `Feature` · `Enabler` · `US` |
| **Parent** | Clé du parent (ex. `E01`, `F01.1`) |
| **Stage** | `⬜` (pas encore terminé) · `✅` (Done — recette mainteneur passée). États de travail intermédiaires (Ready/In progress/Review, §5) : internes à la session, jamais persistés ici — vérifier l'état réel branche/PR GitHub |
| **Priority** | `Critical` · `High` · `Medium` · `Low` |
| **Module** | `core` · `auth` · `admin` · `oidc` · `pilotage` · `agilite` · `collaboratif` (extensible par domaine) |
| **Phase** | `Socle` · `v1-enterprise` · `phase-3` |
| **Size** | `XS` · `S` · `M` · `L` · `XL` |
| **Profils** *(optionnel)* | `TPE` · `PME` · `Grand groupe` · `Privée sous droit public` · `Publique` · `État` · `Tous` — profils d'organisation ([E40](pathname:///pivot-docs/backlog/EPIC-profil-adaptation/)) pour lesquels l'item est applicable ; combinable (liste). Porté par 228 US du domaine Pilotage (backlog PPM v2 adaptative) et E41 — absent = non discriminant par profil |

---

## 3. Challenge PO — démarrage d'implémentation

**Gate 1 = 100 requis avant implémentation — calculé et validé par le PO Agent (Claude).**

| Transition (état interne, non persisté) | Qui | Condition |
|------------|-----|-----------|
| `Backlog → Ready` | **Claude** (PO Agent) | DoR §8.2 satisfaite + Gate 1 = 100 |
| `Ready → In progress` | **Claude** (Dev Agent) | Immédiat une fois `Ready` atteint |

- Gate 1 < 100 → PO Agent réécrit/clarifie les ACs → recalculer → procéder dès = 100.
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
|---------|--------|
| Given [contexte], when [action], then [résultat observable] | ⬜ |
| Error : given [input invalide], system retourne [erreur / status code] | ⬜ |
| Security : [propriété de sécurité garantie] | ⬜ |
| A11y : [propriété WCAG 2.1 AA garantie] (si composant UI) | ⬜ |

---
Item Type: US · Parent: F… / EN… · Module: {x} · Phase: … · Size: … · Priority: …
Stage: ⬜
Dépendances: …
```

---

## 5. Cycle de vie d'un item

```text
Backlog ──(PO Agent : DoR + Gate 1 = 100)──► Ready ──(Dev Agent)──► In progress
                                                                          │
                                                                     (implémentation + autoloop PR)
                                                                          │
Done ◄──(mainteneur : merge PR)────────────── Review ◄───────────────────┘
```

> Ces 4 états (Backlog/Ready/In progress/Review) sont des **états de travail internes** à la
> session Claude — reflétés par l'état réel de la branche/PR GitHub (`gh pr view`, `gh pr list`),
> jamais persistés dans le frontmatter. Le champ `Stage` du fichier US ne porte que 2 valeurs
> (§2) : `⬜` tout au long de ce cycle, `✅` uniquement au Done.

| Transition | Qui | Condition |
|------------|-----|-----------|
| `Backlog → Ready` | **Claude** (PO Agent) | DoR §8.2 satisfaite + Gate 1 = 100 |
| `Ready → In progress` | **Claude** (Dev Agent) | Immédiat |
| `In progress → Review` | **Claude** | PR autoloop terminé (Gate 4 = 100/100, CI verte, max 20 boucles) |
| `Review → Done` | **Mainteneur** | Merge PR + recette — **jamais Claude** |

- US bloquée → retour `Backlog` (état interne) + note dans `docs/backlog/sprints/sprint-{N}.md` ; `Stage` reste `⬜`.
- `Stage` ne change qu'à la création (`⬜`) et au Done (`✅` — mainteneur uniquement) — commit sur la branche de l'US.

---

## 6. Phase active — verrou Socle

**La phase active reste `Socle` tant que le mainteneur n'a pas explicitement déclaré le Socle terminé.**

- Seuls les items `Phase: Socle` sont éligibles à `Ready` et à l'implémentation.
- Les items `v1-enterprise` et `phase-3` existent dans le backlog mais restent `Stage: ⬜` — **non travaillés**.
- Passage à la phase suivante = **décision explicite du mainteneur** (« Socle terminé »).

---

## 7. Périmètre cible (vision complète)

| Axe | Epics (indicatif) | Phase |
|-----|-------------------|-------|
| Plateforme | Système de modules, Observabilité, CI/CD & supply-chain | Socle → v1 |
| Auth & IAM | Auth opaque tokens, OIDC multi-tenant, Rôles & permissions | Socle → v1-enterprise |
| Admin | Activation modules, Gestion utilisateurs, Gestion tenants | Socle → v1-enterprise |
| Modules | whiteboard, session, quiz, survey, roadmap | Socle (1 module) → phase-3 |

---

## 8. Plan de construction du backlog

### 8.1 Méthode de décomposition

1. **EPIC** — on part de la capacité (module ou axe transverse). On décrit intention, valeur, périmètre, hors-périmètre.
2. **Décomposition Epic → FEATURE + ENABLER** : une Feature par fonctionnalité à valeur utilisateur ; un Enabler par brique technique nécessaire.
3. **Décomposition Feature/Enabler → US** : chaque US est un incrément implémentable et testable, avec AC + notes d'implémentation.
4. Chaque US naît `Stage: ⬜` (état interne `Backlog`).

### 8.2 Definition of Ready (Gate 1 — avant `In progress`)

| Niveau | Doit contenir |
|--------|---------------|
| **Epic** | intention, valeur, périmètre, hors-périmètre, modules, dépendances |
| **Feature** | description, bénéfice utilisateur, US rattachées, critères de succès, hors-périmètre |
| **Enabler** | type, objectif technique, justification, critères de complétion |
| **US** | story `En tant que…`, ≥ 1 AC `Given/When/Then`, AC erreur + sécurité (+ A11y si UI), hors-périmètre, notes d'implémentation, champs frontmatter renseignés |

> Le PO Agent vérifie la DoR et calcule Gate 1. Score = 100 → implémentation immédiate (état
> interne `Ready` — `Stage` frontmatter reste `⬜`).

### 8.3 Ordre de construction (vagues)

| Vague | Contenu | Statut |
|-------|---------|--------|
| **1** | E01 Auth & IAM · E02 Espace compte · E05 CI/CD & supply-chain | ✅ seedé |
| **2** | Plateforme — Système de modules, Observabilité (surtout Enablers) | ⬜ |
| **3** | Admin — Activation modules, Gestion utilisateurs, Gestion tenants | ⬜ |
| **4** | 1er module Socle (whiteboard **ou** session) — Features + US | ⬜ |
| **ult.** | Autres modules, OIDC multi-tenant, RGPD (`v1-enterprise` / `phase-3`, **verrouillés**) | ⬜ |

---

## 9. Structure des fichiers markdown

```text
pivot-docs/backlog/
├── sprints/                ← état des sprints, assignation US, avancement (1 fichier par sprint)
│   ├── README.md           ← index + règles d'utilisation
│   └── sprint-{N}.md
├── README.md               ← ce fichier — modèle & conventions
├── EPIC-auth-iam/
│   ├── README.md           ← description de l'epic
│   └── FEATURES/
│       ├── login/
│       │   ├── us-connexion-email.md
│       │   └── us-deconnexion.md
│       └── ...
├── EPIC-module-session/
│   └── ...
└── ...
```

**Règles de fichiers :**
- 1 fichier par US / Enabler — nommage `us-{slug}.md` ou `en-{slug}.md`
- Frontmatter en pied de fichier (champs §2)
- `Stage` (`⬜`/`✅`, §2) mis à jour uniquement à la création et au Done, committé sur la branche de l'US — les états intermédiaires (§5) ne touchent pas ce champ

---

## 10. Démarrage de session Claude

Au démarrage de chaque session, Claude :

1. Lit `pivot-docs/docs/backlog/sprints/README.md` — identifie le sprint courant, ouvre son fichier `sprint-{N}.md`
2. Lit les fichiers US du sprint courant — filtre celles `Stage: ⬜` (pas encore Done), Phase Socle uniquement
3. Pour chaque US `⬜` éligible, vérifie l'état réel côté GitHub (`gh pr list`/`gh pr view`, branche `feat/{us-id}-{slug}`) pour situer l'état interne (§5) :
   - PR ouverte → reprend là où elle en est (autoloop review/CI si pas encore Review, sinon attend le mainteneur)
   - Branche existante sans PR → reprend l'implémentation (`In progress`)
   - Rien encore → PO Agent vérifie DoR + Gate 1 (`Ready`) → implémente si = 100

**Priorité :** Critical → High → Medium → Low. Phase Socle uniquement tant que verrou actif (§6).

---

## 11. Autoloop PR — cycle par US

Après implémentation d'une US sur `feat/{us-id}-{slug}` :

1. Ouvrir une PR (ou draft PR)
2. **Autoloop** (20 itérations max) :
   - **Review neutre** — Expert PR Review : cohérence architecture, AC couverts, sécurité, dette, a11y
   - **Corrections** — appliquées sur la branche, commit `fix({scope}): ...`
   - **CI** — `mvn verify -q` + `npx tsc --noEmit` + `npm run lint` + `npm run test:ci` + build prod = 0 erreur
   - **Corrections CI** — si échec, corriger et relancer
   - **Convergence** — Gate 4 = 100/100 ET CI verte → sortir de la boucle
3. **Gate 4 = 100/100** → sortir la PR de draft + signal mainteneur "PR prête" (état interne `Review`, §5 — `Stage` reste `⬜`)
4. **Blocage 20 boucles** → Breaking Point 2 (label `needs-human-review`, escalade mainteneur)

---

## Répartition des rôles

| Acteur | Responsabilité |
|--------|----------------|
| **Mainteneur** | merge PR (`Review → Done`) + recette → passe `Stage: ⬜ → ✅` · déclare « Socle terminé » |
| **Claude** | rédige/affine items · challenge ACs (PO Agent) · implémente · ouvre PR · autoloop review+CI · écrit `Stage: ⬜` à la création · **jamais `✅`** |
