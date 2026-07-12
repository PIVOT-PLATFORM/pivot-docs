---
title: Cockpits DSI — cycle de vie (arrivée, droits, création d'objets)
sidebar_position: 13
description: Comment une card apparaît, comment un utilisateur arrive sur son cockpit, qui donne les droits, ce qui peut être automatisé, et comment créer des objets (projets, entités agilité…) depuis le shell.
---

Répond au « et concrètement, comment ça vit ? » : la composition d'une card, l'arrivée de
l'utilisateur, l'attribution des droits, ce qui s'automatise, et la **création d'objets** depuis le
shell entre cockpit et modules. S'appuie sur
[ADR-027](pathname:///pivot-docs/adr/ADR-027-modele-organisationnel-unites-equipes) (droits),
[ADR-028](pathname:///pivot-docs/adr/ADR-028-acces-identites-externes) (externe),
[E01](pathname:///pivot-docs/backlog/EPIC-auth-iam/) (JIT), et les enablers
[E51](pathname:///pivot-docs/backlog/EPIC-cockpits/).

## 1. Comment une card apparaît sur un cockpit

Le [moteur de composition (EN51.2)](pathname:///pivot-docs/backlog/EPIC-cockpits/) évalue, pour chaque
card candidate du cockpit de l'utilisateur, une **cascade de décision** — la card apparaît, se
transforme, ou disparaît :

```text
Pour chaque card du cockpit (ordre du registre EN51.3) :
  1. Rôle autorisé (RBAC) ?              non → no-permission (grisée) ou retirée
  2. Périmètre identité (ADR-028) ?       ○ masqué (externe) → retirée · ◑/◐ → mode de rendu
  3. Module porteur activé & livré (E03) ? non → module-wip (placeholder « bientôt »)
  4. Périmètre de partage (ADR-027) ?      la card n'agrège que les équipes/unités dont
                                           l'utilisateur est membre direct — jamais au-delà
  5. Donnée prête ?                        vide → empty · erreur → error · sinon → ready
```

- Les **cards transverses obligatoires** (T : posture sécu, RGPD, RGAA, AGPL, adoption, ROI, santé)
  sont **toujours injectées**, quel que soit le cockpit.
- L'utilisateur **personnalise ensuite** (EN51.4) : épingler / masquer / réordonner / densité —
  persisté, mais **jamais** au point de masquer une card obligatoire.

Une card est donc visible si `cockpit correspond` ∧ `rôle autorisé` ∧ `non entièrement masquée` ; son
**état** dépend de l'activation du module et de la donnée. Le **périmètre de partage** (§3) borne ce
qu'elle agrège — une card n'est jamais une fuite au-delà des équipes de l'utilisateur.

## 2. Comment un utilisateur arrive sur son cockpit

```text
Connexion (mot de passe · Google · OIDC entreprise, E01)
   │
   ├─ 1re connexion OIDC/Google & jitEnabled ? ─► Provisionnement JIT (US01.7.2)
   │      compte User créé, claims mappés (rôle, équipe/unité si fournis par l'IdP)
   │
   ├─ Résolution macro-rôle (taxonomie) ─► archétype JTBD ─► cockpit par défaut
   │      (bijection, EN51.2) sur profil d'organisation par défaut (EN18.10)
   │
   └─ Redirection post-login (US01.1.4) ─► le cockpit se compose (§1)
```

- Le cockpit par défaut est **déterministe** : `macro-rôle → archétype → cockpit`, zéro configuration
  (cf. [cockpits-dsi.md](cockpits-dsi.md)).
- Un utilisateur non provisionné sur un tenant à `jitEnabled: false` reçoit **403** (US01.7.2) — pas
  d'accès implicite.

## 3. Qui donne les droits

Les droits viennent de **cinq sources**, jamais mélangées — c'est la clé pour éviter les fuites
(ADR-027 §1 : accès ressources et autorité managériale propagent en sens **opposés**).

| Droit | Qui le donne | Règle |
| --- | --- | --- |
| **Rôle applicatif** (`ROLE_USER`/`ROLE_ADMIN`…) | claim OIDC au provisioning **ou** admin tenant (E06, `PATCH /admin/users/{id}/role`) | posé à l'identité |
| **Accès aux ressources** (voir un projet, une entité agilité) | le **RESPONSABLE d'équipe** ajoute des membres (`team_members`), repli `ROLE_ADMIN` | **plan Partage** (ADR-027) : strict par équipe, membres **directs**, aucune cascade |
| **Autorité managériale** (valider, escalader) | la position dans l'organigramme (`org_units`) + délégation (`org_delegation`) | **plan Management** (ADR-027) : cumulative vers le haut, couvre le sous-arbre |
| **Modules activés** (quelles cards existent) | admin tenant / **plan** du tenant (E03, superadmin plan→modules) | active un jeu de modules par tenant |
| **Cockpit par défaut & sa gouvernance** | inféré du rôle ; un DSI fixe le cockpit par défaut de ses sous-admins | garde-fou de personnalisation |

Le tout est évalué par l'**autorisation policy-as-code**
([ADR-013](pathname:///pivot-docs/adr/ADR-013-autorisation-externalisee-policy-as-code)). Une
**identité externe** (ADR-028) n'entre jamais par ces mêmes chemins : fragment OIDC externe +
engagement borné, avec la matrice de masquage.

## 4. Peut-on le faire automatiquement ?

**Oui pour le défaut sûr ; validation humaine pour toute élévation.** C'est la ligne de partage.

**Automatisable de bout en bout** (zéro geste manuel) :

- **Provisioning** — JIT à la 1re connexion : les claims de l'IdP (ou SCIM,
  [ADR-004](pathname:///pivot-docs/adr/ADR-004-oidc-multi-tenant)) portent rôle + équipe/unité →
  `User` + appartenance créés automatiquement.
- **Cockpit** — `rôle → macro-rôle → archétype → cockpit par défaut` est déterministe (EN51.2).
- **Modules** — le **plan** du tenant allume son jeu de modules → les cards s'allument, les autres
  restent `module-wip`.
- **Périmètre de partage** — l'appartenance équipe portée par le claim/SCIM donne le scope de partage
  (ADR-027) sans intervention.

**Doit rester humain** (principe de moindre privilège, ADR-028) :

- l'octroi d'un **rôle élevé** (`ROLE_ADMIN`), l'accès à des **données sensibles** (🔴), et
  l'attribution d'**autorité managériale** — un défaut automatique ici serait précisément la « fuite
  d'accès » qu'ADR-027 §1 interdit (« un directeur qui verrait par défaut tous les fichiers de sa
  direction »).

Autrement dit : l'identité qui arrive obtient **automatiquement** son cockpit, ses modules de plan et
son périmètre d'équipe ; tout ce qui **élargit** au-delà passe par un responsable.

## 5. Créer des objets depuis le shell (projets, entités agilité…)

**Principe : les objets vivent dans les modules, jamais dans le core/cockpit**
([ADR-006](pathname:///pivot-docs/adr/ADR-006-multi-repo-architecture), pas de FK inter-modules). Un
projet → schéma `pilotage` ; une session agile → `agilite` ; un tableau → `collaboratif`. Le shell ne
**stocke** rien : il **route** vers le bon module.

### Affordance de création globale (« + Créer »)

Le shell (EN51.4) offre un **quick-create** filtré par **modules activés × droits** de l'utilisateur :

- il ne propose que les types **que l'utilisateur peut créer ici et maintenant** (Projet, Roadmap,
  Session agile, Tableau, Risque…) — un type dont le module est désactivé ou pour lequel l'utilisateur
  n'a pas le droit **n'apparaît pas** (pas un 403 après coup) ;
- il **route** vers le flux de création du module par un **deep-link porteur de contexte** :
  `/{module}/…/new?team={ref}` — l'équipe/unité active (ADR-027, pour le partage) et l'identité (SSO)
  voyagent avec ;
- une card en état `empty` propose la **même** action (ex. *Roadmap* vide → « + Créer une roadmap »).

### Le bouclage création → événement → card

![Création d'objet depuis le shell](diagrams/cockpits-dsi-creation-objet.png)

> Source PlantUML : [`diagrams/cockpits-dsi-creation-objet.puml`](diagrams/cockpits-dsi-creation-objet.puml) — le PNG est généré en CI.

1. L'utilisateur crée l'objet **dans le module** (le module valide les droits et le périmètre).
2. Le module émet `{domaine}.{entité}.created` sur le **bus** (ex. `pilotage.project.created`,
   [catalogue d'événements](pathname:///pivot-docs/events/)).
3. La **projection** du cockpit consomme l'événement → la card se met à jour (`empty` → `ready`).
4. **Corrélation cross-module sans FK** : le `projectRef` propagé par l'événement permet à un autre
   module de s'y rattacher (ex. le module Risques crée un risque lié au projet par `project_ref`).

Ainsi la boucle est fermée : **créer dans le module → événement → la card du cockpit le reflète**. Le
cockpit ne crée pas les objets ; il les **supervise** et **amorce** leur création par deep-link.

### Droits de création

Posés par le **plan de partage** (membre d'une équipe avec un rôle suffisant, ADR-027) **et** le
module activé. Le refus se traduit par l'**absence de l'option** dans le quick-create, pas par une
erreur tardive. Un externe ne crée jamais d'objet de gouvernance (lecture seule, ADR-028).
