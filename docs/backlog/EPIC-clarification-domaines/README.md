# E52 — Clarification & raffinage des domaines

**Intention** : rendre **chaque domaine déjà livré** (Socle S1-S8, puis Pilotage S9-S13) parfaitement
lisible sur quatre axes — **quelles entités et quel CRUD**, **qui y a accès (par profil)**, **comment
on y accède (mécanisme d'autorisation)**, **d'où viennent les données (API externes & sources)**.

**Valeur** : le backlog a construit vite et large ; il manque une **vue transverse consolidée** par
domaine. Sans elle, chaque nouvelle US ré-invente les règles d'accès, les frontières de données et
les intégrations externes se documentent au coup par coup, et une revue sécurité/RGPD ne dispose
d'aucune matrice de référence. E52 produit cette **source de vérité par domaine** — un artefact
vérifiable, pas de code neuf.

**Périmètre** : un **framework** (template de fiche, référentiel d'accès consolidé, registre des API
externes) + **une fiche de clarification par domaine**. Découpé en vagues, une par sprint, **à partir
du Sprint 14**.

**Hors périmètre** :
- Aucune fonctionnalité neuve, aucun changement de contrat d'API — E52 **documente l'existant** et
  **relève les écarts** (ex. droit non appliqué côté serveur, source externe non tracée) sous forme
  de findings à arbitrer, jamais de correctif unilatéral.
- L'adaptation **par profil d'organisation** (E40, queue idéation) — E52 raisonne sur les **profils
  utilisateur / rôles métier** (taxonomie DSI + rôles système), pas sur les profils d'organisation.
- Les domaines **non encore livrés** (modules phase-3 non démarrés) — ils seront clarifiés à leur
  propre livraison, pas rétro-documentés ici.

**Modules impactés** : livrables documentaires dans **pivot-docs** (`docs/architecture/domaines/`) ;
décrivent `pivot-core`, `pivot-ui`, `pivot-*-core/-ui`, `pivot-design-system`. Aucun commit applicatif.

**Dépendances** :
- Taxonomie des rôles — [`docs/taxonomie/roles.json`](pathname:///pivot-docs/taxonomie/) (14 domaines, ~100 rôles métier).
- Schéma de rôles système + BDD multi-schéma — [architecture cible](pathname:///pivot-docs/architecture/) (`SUPER_ADMIN`/`ADMIN`/`USER`/`GUEST`).
- ADR-025 (bus d'événements inter-briques), ADR-005 (opaque tokens), ADR-028 (accès & identités externes).

---

## Les quatre axes de clarification (le contrat d'une fiche)

Chaque **fiche de domaine** répond, dans cet ordre, aux quatre questions de la demande :

| # | Axe | Question | Livrable dans la fiche |
|---|-----|----------|------------------------|
| 1 | **Entités & CRUD** | *Quoi ?* | Liste des entités/agrégats (table + schéma BDD) et **matrice CRUD** — pour chaque entité, les opérations Create/Read/Update/Delete réellement exposées, l'endpoint REST et le module porteur |
| 2 | **Accès par profil** | *Qui ?* | **Matrice d'accès** entité × opération × profil — rôle système (`SUPER_ADMIN`/`ADMIN`/`USER`/`GUEST`), rôle d'équipe, et profil métier (taxonomie) → `● autorisé` / `◑ conditionnel (périmètre)` / `○ interdit` |
| 3 | **Mécanisme d'accès** | *Comment ?* | *Comment* l'accès est obtenu et **appliqué** : mécanisme d'auth (opaque token / OIDC), portée (plateforme/tenant/équipe/session), **gate d'activation module**, isolation tenant, point d'application (guard Angular, annotation Spring Security, filtre serveur) |
| 4 | **API externes & sources** | *D'où ?* | **Registre** des systèmes externes que le domaine consomme ou alimente : source, données récupérées/émises, protocole, sens du flux, secret/authentification, dev vs prod |

> **Notation matrices** (fixée par EN52.1) : accès `● / ◑ / ○` (repris de la convention EN51.5) ;
> CRUD noté `C R U D` (opération présente) / `—` (absente) / `(scope)` (restreint au périmètre).

---

## Structure

### Enablers — framework (Vague 1, Sprint 14)

| Enabler | Rôle | Livrable |
|---------|------|----------|
| [EN52.1 — Template de fiche & conventions de matrices](ENABLERS/en-template-fiche-domaine.md) | Gabarit reproductible des 4 axes + notations + index | `docs/architecture/domaines/_template-fiche-domaine.md` + `README.md` |
| [EN52.2 — Référentiel d'accès consolidé](ENABLERS/en-referentiel-acces-consolide.md) | *Qui / comment* transverse : rôles système ↔ rôles d'équipe ↔ portées ↔ profils taxonomie ↔ point d'application | `docs/architecture/referentiel-acces.md` |
| [EN52.3 — Registre des API externes & sources de données](ENABLERS/en-registre-api-externes.md) | *D'où* transverse : carte unique de toutes les intégrations externes | `docs/architecture/registre-api-externes.md` |

### Features — fiches par domaine

- **F52.1 — Fiches des domaines Socle** *(Vague 1, Sprint 14)* — 9 fiches :
  - [US52.1.1 — Identités & IAM](FEATURES/fiches-socle/us-fiche-identites-iam.md) *(E01 · auth)*
  - [US52.1.2 — Espace compte](FEATURES/fiches-socle/us-fiche-espace-compte.md) *(E02 · core)*
  - [US52.1.3 — Tenants & Équipes](FEATURES/fiches-socle/us-fiche-tenants-equipes.md) *(E17/core)*
  - [US52.1.4 — Administration](FEATURES/fiches-socle/us-fiche-administration.md) *(E06 · admin)*
  - [US52.1.5 — Système de modules](FEATURES/fiches-socle/us-fiche-systeme-modules.md) *(E03 · core)*
  - [US52.1.6 — Shell, navigation & notifications](FEATURES/fiches-socle/us-fiche-shell-ux.md) *(E16 · core)*
  - [US52.1.7 — Observabilité & audit](FEATURES/fiches-socle/us-fiche-observabilite-audit.md) *(E04 · core)*
  - [US52.1.8 — Collaboratif — Whiteboard](FEATURES/fiches-socle/us-fiche-whiteboard.md) *(E30 noyau · collaboratif)*
  - [US52.1.9 — Infrastructure, CI/CD & sources externes](FEATURES/fiches-socle/us-fiche-infra-cicd.md) *(E05/E07/E17 · core)*
- **F52.2 — Fiches des domaines Pilotage** *(Vague 2, Sprint 15 — stub)* : roadmap (E22), portefeuille
  (E23), risques (E21), budget (E26), OKR (E27), ADR projet (E24), forms (E42). Ouvertes une fois les
  domaines Pilotage recettés (S9-S13) — Gate 1 au démarrage de S15.
- **F52.3 — Fiches Agilité/Collaboratif + consolidation** *(Vague 3, Sprint 16 — stub)* : domaines
  agilité (E09-E11, E19, E20, E50) au fil de leur livraison + **synthèse transverse** (matrice
  d'accès plateforme complète, cartographie des flux externes consolidée, liste des écarts arbitrés).

---

## Programme multi-sprint

> « À partir du Sprint 14, raffiner énormément tout ce qui a été fait avant. » E52 est le véhicule de
> ce raffinage. Une vague = un sprint ; on ne clarifie que des domaines **déjà livrés** (pas de
> rétro-doc de l'inexistant).

| Vague | Sprint | Contenu | Statut |
|-------|--------|---------|--------|
| 1 | [Sprint 14](../sprints/sprint-14.md) | Framework (EN52.1-3) + 9 fiches Socle (F52.1) | ⬜ planifié |
| 2 | Sprint 15 | Fiches Pilotage (F52.2) — après recette S9-S13 | ⬜ stub |
| 3 | Sprint 16 | Fiches Agilité/Collaboratif (F52.3) + synthèse transverse | ⬜ stub |

## Statut global

⬜ Socle · transverse (raffinage) — **Vague 1 planifiée en [Sprint 14](../sprints/sprint-14.md)**. Créé
le 2026-07-12 en remplacement du Sprint 14 Cockpits DSI (E51 reséquencé en
[backlog post-S12](../sprints/backlog-post-s12.md)).
