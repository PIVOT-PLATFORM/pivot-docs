# ADR-028 — Accès & identités externes : qu'est-ce qu'un « externe » et que voit-il ?

**Date :** 2026-07-12
**Statut :** Proposé
**Décideurs :** Architecte plateforme, RSSI, Product Owner, Mainteneur
**Contexte technique :** `pivot-core` (OIDC/IAM, `public.teams`/`public.org_units`, `audit_events`), tous les `pivot-xxx-core` (scoping par projet/équipe), [E51 — Cockpits DSI](pathname:///pivot-docs/backlog/EPIC-cockpits/) (EN51.5 filtre d'accès), matrice de sensibilité des cards ([cockpits-dsi-bijection.md](pathname:///pivot-docs/specs/EPIC-shell-ux/cockpits-dsi-bijection))

---

## Contexte

La matrice de visibilité des cards distingue trois classes d'identité — **Interne** (🏛),
**Interne externalisé** (🏛🔗) et **Externe pur** (🔗) — et fait dépendre l'exposition de chaque card
de cette classe. Mais le terme « externe » n'était jusqu'ici **pas défini** au niveau du système :
ni ce qu'est techniquement une identité externe, ni comment elle s'authentifie, ni la frontière
exacte de ce qu'elle voit au sein d'un projet et de la couche transverse.

Sans cette définition, la règle « 🟢 opérationnel-dans-le-scope → ◑ / 🟢 global → ◐ » et le masquage
des cards 🔴 restent des conventions d'UI, non un contrôle d'accès vérifiable. Le risque est double :
**fuite de patrimoine** (un prestataire voit la cartographie ou les finances hors de sa mission) et
**incohérence** (chaque module réinvente sa notion d'externe).

## Décision

### 1. Définition — une identité externe est un principal authentifié, hors organisation, à périmètre borné

Un **externe** est un principal qui :

- **possède un compte** dans le fournisseur d'identité (OIDC ou autre), **jamais** un accès anonyme
  ou un lien partagé non authentifié ;
- est rattaché à une **organisation d'origine distincte** du tenant (prestataire, éditeur, infogérant,
  auditeur, régulateur) ;
- porte un **engagement** : un périmètre contractuel (tenant / projet(s) / équipe(s)) et une **durée**.

On distingue **Interne externalisé** (un rôle DSI tenu par un externe — même cockpit fonctionnel,
identité externe) de **Externe pur** (organisation tierce agissant depuis l'extérieur).

### 2. Authentification — fragment d'identité externe séparé

Les identités externes s'authentifient via un **fragment externe** dédié du fournisseur d'identité
(realm / connexion OIDC distincte des collaborateurs), de sorte que :

- l'appartenance « externe » est portée par l'identité elle-même (claim), pas devinée ;
- la révocation en fin de mission est un geste sur ce fragment (cohérent avec le **time-box**) ;
- aucun externe n'emprunte le chemin d'authentification des collaborateurs internes.

Cohérent avec [ADR-004](pathname:///pivot-docs/adr/ADR-004-oidc-multi-tenant) (OIDC multi-tenant) et
[ADR-022](pathname:///pivot-docs/adr/ADR-022-principal-authentification-minimal-partage).

### 3. Accès **au sein des projets** — scoping serveur par engagement

L'accès d'un externe est **borné à l'engagement**, appliqué **côté serveur** (pas seulement masqué
côté UI) :

- il ne reçoit que les données des **projets/équipes/tenant de son contrat** ;
- sur ces projets, la visibilité de chaque card suit la **matrice de sensibilité** (● / ◑ / ◐ / ○) ;
- une card 🔴 (finances, posture sécurité, IAM, audit, RH, patrimoine) est **○ masquée** par défaut —
  la donnée sensible **ne transite pas** vers un client externe ;
- **lecture seule** : aucune action de gouvernance (activation, invitation, désactivation) ;
- toute consultation externe est **journalisée** (`audit_events`).

### 4. Accès **transverse** — minimal et agrégé

La couche transverse (santé, sécurité, RGPD, RGAA, AGPL, adoption, ROI) est **toujours présente pour
l'interne**, mais pour un externe :

- les cards transverses 🔴 (posture sécurité, ROI) sont **○ masquées** ;
- les cards transverses 🟢/🟡 non sensibles (RGAA, AGPL, santé agrégée) peuvent être **◐ agrégées**
  quand la mission le justifie (ex. auditeur RGAA) ;
- jamais d'accès transverse « par défaut » élargi : l'externe ne voit du transverse que ce que son
  engagement exige explicitement.

### 5. Principe directeur — minimiser la fuite de données et de patrimoine

En cas de doute sur la classification d'une card ou l'étendue d'un engagement, le système choisit
l'option **la plus restrictive**. La règle 🟢→externe (◑ opérationnel-scope / ◐ global) est une
**borne haute**, pas un droit acquis : un engagement plus étroit réduit encore l'exposition.

## Conséquences

- **EN51.5** (filtre d'accès interne/externe) implémente ce contrat ; **EN51.3** (contrat du
  catalogue) porte la sensibilité et la visibilité par classe.
- Le fournisseur d'identité doit exposer un **fragment externe** et un claim d'appartenance.
- Chaque `pivot-xxx-core` applique le scoping par engagement au niveau de ses endpoints (pas
  d'exposition large « filtrée à l'affichage »).
- Cohérent avec [ADR-013](pathname:///pivot-docs/adr/ADR-013-autorisation-externalisee-policy-as-code)
  (autorisation policy-as-code) et [ADR-019](pathname:///pivot-docs/adr/ADR-019-dlp-applicatif-exfiltration-api)
  (DLP / anti-exfiltration).

## Alternatives écartées

- **Externe = simple rôle RBAC interne restreint** — écarté : ne distingue pas l'organisation
  d'origine, ne borne pas dans le temps, et fait reposer la sécurité sur l'exhaustivité du masquage UI.
- **Liens de partage non authentifiés pour les externes** — écarté : incompatible avec la
  traçabilité, la révocation et la minimisation de fuite.
