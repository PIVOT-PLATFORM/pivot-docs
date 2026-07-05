# ADR-009 — Cadre d'intégration open source

**Date :** 2026-07-04
**Statut :** Proposé
**Décideurs :** Architecte plateforme, Lead intégration, RSSI, Responsable juridique, Product Owner
**Contexte technique :** organisation `PIVOT-PLATFORM` (`pivot-core`, `pivot-ui`, `pivot-docs`, `pivot-benchmarks`)

---

## Contexte

PIVOT construit aujourd'hui chaque module en natif, dans `pivot-core`/`pivot-ui` (ADR-003, ADR-006). Ce cadre ajoute un second mode, complémentaire : intégrer des outils open source matures via des adaptateurs, pour couvrir plus de domaines fonctionnels sans tout réécrire. **Le mix modules natifs + connecteurs externes est le modèle cible — c'est l'innovation de ce cadre, pas un remplacement du natif.**

Ne sont pas remises en cause : ADR-002 (licence AGPL-3.0 du noyau), ADR-004 (architecture agnostique à l'IdP, Keycloak comme défaut auto-hébergé).

## Décision

### 1. Quatre modes d'intégration

| Mode | Ce que PIVOT fait | Quand |
|------|-------------------|-------|
| **Lien** | SSO + lien profond + widget de statut. L'outil tel quel. | Défaut |
| **Adaptateur** | Un plugin traduit l'API de l'outil dans le modèle commun PIVOT. Aucune modification en amont. | Voir critère §2 |
| **Fork contributif** | Fork éphémère pour développer une fonctionnalité *générique* + PR upstream immédiate. | Fonctionnalité manquante en amont |
| **Natif** | Code propre à PIVOT. | Valeur unique, ou si aucun adaptateur n'est possible/rentable |

**Règle d'or anti-divergence :** aucune modification *PIVOT-spécifique* ne rentre dans un fork. Tout patch doit être upstream-able, sinon il va dans un adaptateur.

### 2. Critère : adaptateur ou natif ?

Un adaptateur est construit quand **(a)** c'est techniquement possible via le contrat à six capacités (§4), **et** **(b)** c'est moins coûteux qu'un redéveloppement natif complet. Sinon : natif. Ce critère s'applique brique par brique, décidé au cas par cas par le comité d'architecture — il ne préjuge pas d'avance du résultat pour un domaine donné.

### 3. Règle de licences amont/aval

Le noyau PIVOT reste AGPL-3.0 (ADR-002, inchangée). Trois règles simples :

- Chaque outil tiers garde sa licence d'origine — PIVOT ne la modifie ni ne la conteste.
- Chaque adaptateur/connecteur écrit par PIVOT est publié en AGPL-3.0, comme `pivot-core`.
- Toute amélioration générique utile à un projet amont part en fork éphémère puis PR upstream — jamais gardée comme patch interne.

Les adaptateurs parlent aux outils tiers par API/webhooks, pas par liaison de code : pas de mélange de licences à l'intérieur d'un même binaire, donc pas de matrice de compatibilité à faire brique par brique.

### 4. Contrat d'intégration à six capacités

| Capacité | Rôle |
|---|---|
| Identité | Accepter le SSO PIVOT, ne jamais gérer ses comptes |
| Entités | Déclarer au catalogue ce que la brique contient |
| Événements | Émettre/consommer sur le bus (« tâche finie », « décision prise ») |
| Santé | Exposer un statut lisible par le portail (`/health`) |
| Liens profonds | Ouvrir « le projet X » directement dans l'outil |
| Thème | Respecter les tokens du design-system |

```typescript
export interface PivotAdapter {
  id: string;
  supportsUpstream: string;            // ">=14.0 <16"
  auth: { mode: "oidc" | "saml" | "token-proxy"; };
  toEntities(raw: UpstreamPayload): PivotEntity[];
  toEvents(hook: UpstreamWebhook): PivotEvent[];
  onEvent?(evt: PivotEvent): Promise<void>;
  health(): Promise<{ status: "up" | "degraded" | "down"; version: string; }>;
  deepLink(entityRef: string): string;
  theme?: PivotThemeTokens;
}
```

Modèle d'entités du catalogue : `Project · Portfolio · Contract · Vendor · Team · Capacity · Decision(ADR) · Requirement · Epic`.

### 5. Sélection par domaine (illustrative)

> ⚠️ Licences à vérifier au dépôt avant industrialisation (règle de fond en §3, indépendante du domaine).
> **Natif et OSS coexistent** : la colonne *Alternative* n'est pas un choix exclusif du *Retenu* — chaque instanciation active, dans son portail, le ou les outils dont elle a besoin (cf. « Alternatives écartées » et backlog `EPIC-integration-open-source`).

| Domaine | Retenu | Licence | Mode | Alternative (également intégrable) |
|---|---|---|---|---|
| Portail / catalogue | PIVOT natif | — | Natif | — |
| Identité & SSO | Keycloak (défaut — ADR-004 inchangée) | Apache-2.0 | Lien | Zitadel (souverain) |
| Secrets | OpenBao | MPL-2.0 | Lien | Infisical |
| SCM & CI/CD | GitLab CE | MIT | Adaptateur | Forgejo (souverain-léger) |
| Pilotage de portefeuille (PPM, Gantt) | OpenProject | GPL-3.0 | Adaptateur | ProjeQtOr (🇫🇷) — coexiste avec le module natif `pilotage` |
| Delivery agile (backlog, sprints) | Plane | AGPL-3.0 | Adaptateur | Taiga (mature UE) |
| Rétrospectives | Scrumlr | — | Lien | — coexiste avec le module natif `retrospective` |
| **Planning poker** | **PIVOT natif** | — | Natif | — (marché OSS vide) |
| **Whiteboard** | **PIVOT natif** (module existant) | — | Natif | Excalidraw, tldraw (adaptateurs embed) — coexistent avec le natif |
| Documents collaboratifs | Docs (La Suite numérique) | MIT | Adaptateur | Nextcloud |
| Formulaires / quiz / sondages | Formbricks | AGPL-3.0 | Adaptateur | LimeSurvey — coexiste avec les modules natifs `session`/`forms` |
| Base de données no-code | Baserow | MIT | Adaptateur | NocoDB |
| Wiki | BookStack | MIT | Lien | — (Outline écarté : licence BSL non-OSI) |
| Workflows | n8n | fair-code (SUL) | Adaptateur | Activepieces (MIT, MCP natif) |
| Orchestration data | Kestra | Apache-2.0 | Adaptateur | Apache Airflow |
| BI | Metabase | AGPL-3.0 | Adaptateur | Apache Superset |
| Analytics d'usage | Matomo | GPL-3.0 | Lien | Plausible |
| Messagerie | Element / Matrix | AGPL-3.0 | Lien | Rocket.Chat |
| Signature électronique | Documenso | AGPL-3.0 | Adaptateur | Docuseal |
| **CLM (cycle de vie contractuel)** | **PIVOT natif** | — | Natif | — vide côté OSS |

### 6. Organisation des dépôts (cible illustrative)

```text
pivot-platform/
├── pivot-core/          # noyau natif : catalogue, identité, bus, contrat
├── pivot-plugins/        # adaptateurs (un dossier par brique)
│   └── adapter-<outil>/
├── pivot-native/         # briques natives (poker, clm)
└── forks/                # forks contributifs — éphémères, une PR en vol
    └── upstream-<brique>/
```

Fork : `git subtree` par défaut (submodule pour les très gros amonts). Cycle de vie : fork → branche `feature/<besoin>` → PR upstream → fusionnée = le fork meurt, ou refusée = documenté + adaptateur préféré à un rebase permanent. Resynchronisation hebdomadaire minimum ; chaque fork porte un `FORK.md` (PR, raison, condition de mort, responsable).

## Alternatives écartées

- Tout réécrire en natif : coût prohibitif, réinvention de fonctionnalités déjà matures ailleurs.
- Forker et diverger sans discipline : dette mortelle à trois ans.
- Exclure par défaut un adaptateur au seul motif qu'un module natif existe déjà pour le même besoin : natif et OSS **coexistent** (§5) — c'est l'instanciation qui choisit, dans son portail, quel(s) outil(s) activer. Le whiteboard illustre ce principe : le natif PIVOT reste la référence, mais Excalidraw/tldraw sont des adaptateurs disponibles en complément, pas des concurrents à exclure.

## Conséquences

- **Positif :** intégration en jours/semaines sur les domaines où un adaptateur est retenu ; amont maintenu par sa communauté ; réversibilité préservée ; le natif existant (whiteboard, planning poker) n'est pas remis en cause.
- **Négatif :** coût récurrent d'intendance upstream (resync, PR, veille licences) — nécessite un rôle dédié (« upstream steward »).
- **Interdit :** forker pour ajouter du code propriétaire non reversé ; construire un adaptateur qui contourne le critère §2 par confort plutôt que par calcul coût/faisabilité.

## Points ouverts

**Résolu (revue PO du backlog, 2026-07-05).** Les recoupements entre adaptateur OSS et module natif — Pilotage/OpenProject, Session-Forms/Formbricks, Rétrospective/Scrumlr, Whiteboard/Excalidraw — ne sont plus arbitrés au niveau plateforme par exclusion par défaut : natif et OSS **coexistent**, chaque instanciation active ce dont elle a besoin dans son portail (§5). Concrétisé au backlog par les features F28.6–F28.9 de `EPIC-integration-open-source`.

## ADR à produire

| ADR | Objet | Priorité |
|---|---|---|
| ADR-009 | Règle de licences amont/aval (formalisation de §3) | P0 |
| ADR-017 | Modèle d'entités du catalogue, réconcilié avec le schéma `public.teams` (ADR-006) | P0 |
| ADR-018 | Stratégie Git des forks (submodule vs subtree vs package) | P1 |
| ADR-019 | Bus d'événements et schéma d'événements inter-briques | P1 |
| ADR-020 | Briques natives à construire (planning poker, CLM) et périmètre | P2 |

*(ADR-010 : attribuée entre-temps à un sujet indépendant, roadmap/Gantt — sans lien avec cette section ; le choix du fournisseur d'identité reste couvert par ADR-004. ADR-011 à ADR-016 : famille Sécurité & Zero Trust, cf. `docs/adr/README.md`.)*

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-07-04 | Décision initiale |
| v1.1 | 2026-07-05 | Retrait des noms « mycélium » et « Backstage » (titre, §4, §5) ; principe de coexistence natif/OSS explicité (§5, Alternatives écartées) ; Points ouverts résolus (Pilotage/Session-Forms/Rétrospective/Whiteboard coexistent avec leurs adaptateurs) ; ajout d'une colonne Alternative en §5 ; SCM & CI/CD (GitLab CE) déjà présent, désormais concrétisé au backlog (F28.10) |
| v1.2 | 2026-07-05 | Correction de la note « ADR à produire » : la mention « Pas d'ADR-010 » était devenue fausse une fois ADR-010 attribué au modèle temporel roadmap/Gantt (sujet indépendant) — reformulée pour lever l'ambiguïté |
