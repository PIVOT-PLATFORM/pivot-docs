# EN52.1 — Template de fiche de domaine & conventions de matrices

**Type d'enabler** : architecture (documentaire)

**Objectif technique** : figer le **gabarit reproductible** d'une fiche de clarification de domaine
(les 4 axes) et les **conventions de notation** des matrices, pour que les 9 fiches Socle (F52.1) —
et les vagues suivantes — soient homogènes, comparables et mécaniquement relisables.

**Justification** : sans template imposé en tête de vague, chaque fiche divergerait de forme et la
synthèse transverse (F52.3) serait impossible à consolider. C'est l'enabler de fondation d'E52 : il
se livre **avant** toute fiche.

## Livrables

- `docs/architecture/domaines/_template-fiche-domaine.md` — gabarit vierge des 4 axes.
- `docs/architecture/domaines/README.md` — index des fiches + rappel des conventions + lien vers
  EN52.2 (référentiel d'accès) et EN52.3 (registre API externes).

## Structure imposée d'une fiche (les 4 axes)

```markdown
# Domaine {Nom} — fiche de clarification

> EPIC(s) source · repos · schéma BDD · module d'activation

## 1. Entités & CRUD
| Entité | Table (schéma) | Endpoint(s) | C | R | U | D | Notes |
Notation CRUD : lettre = opération exposée · `—` = absente · `(scope)` = restreinte au périmètre.

## 2. Accès par profil
| Entité·opération | SUPER_ADMIN | ADMIN (tenant) | USER | GUEST | Rôle d'équipe | Profil métier (taxonomie) |
Notation accès : `●` autorisé · `◑` conditionnel (périmètre/propriété) · `○` interdit.

## 3. Mécanisme d'accès (« comment on y accède »)
- Mécanisme d'auth (opaque token SHA-256 / OIDC PKCE) · portée (plateforme/tenant/équipe/session)
- Gate d'activation module · isolation tenant (TenantContext) · appartenance équipe
- Point d'application : guard Angular / annotation Spring Security / filtre serveur — nommé précisément

## 4. API externes & sources de données (« d'où viennent les infos »)
| Système externe | Données | Sens (↓in/↑out) | Protocole | Auth/secret | Dev | Prod |
Renvoie au registre consolidé EN52.3 pour les intégrations partagées.

## 5. Écarts relevés (findings, non corrigés)
Droit non appliqué côté serveur, source non tracée, incohérence CRUD/UI — à arbitrer (jamais de fix ici).
```

## Conventions de notation (source de vérité)

- **CRUD** : `C R U D` présents / `—` absent / `(scope)` restreint (ex. `R(propre)` = lecture de ses
  propres objets uniquement).
- **Accès** : `●` autorisé · `◑` conditionnel (préciser la condition en note : périmètre tenant,
  propriété de l'objet, appartenance équipe, time-box externe) · `○` interdit. Notation alignée sur
  [EN51.5](../../EPIC-cockpits/ENABLERS/en-filtre-acces-interne-externe.md).
- **Profils** : colonne « rôle système » (obligatoire) + « rôle d'équipe » + « profil métier »
  (id de [`roles.json`](pathname:///pivot-docs/taxonomie/) quand une restriction métier réelle
  existe ; sinon `Tous les USER du tenant`).
- **Sens de flux** : `↓in` (PIVOT récupère), `↑out` (PIVOT émet), `↕` (bidirectionnel).

## Critères de complétion

- [ ] Given un rédacteur de fiche, when il ouvre le template, then les 5 sections (4 axes + écarts)
      sont présentes avec en-têtes de tableaux pré-remplis et notations rappelées en légende.
- [ ] Le README index liste les 9 fiches Socle prévues (liens, même si fiches non encore écrites) et
      pointe vers EN52.2 et EN52.3.
- [ ] Les notations `●/◑/○` et `C/R/U/D/—/(scope)` sont définies une seule fois, dans le README, et
      référencées (pas redupliquées) par chaque fiche.
- [ ] Error case : une fiche qui omettrait un des 4 axes est détectable — le template porte un
      commentaire `<!-- axe obligatoire -->` sur chaque section.
- [ ] Security : le template impose la section « Point d'application » (guard/annotation nommé) — une
      fiche ne peut pas décrire un accès sans dire *où* il est vérifié côté serveur.
- [ ] `npm run lint` + `npm run build` verts (markdownlint + cspell + naming + Docusaurus).

## Notes

- Le template est **documentaire** : il vit dans `docs/architecture/`, pas dans le backlog. Le fichier
  US/enabler d'E52 ne fait que le spécifier ; le livrable réel est la page d'architecture.
- Pas d'ADR requis — EN52.1 ne décide rien d'architectural, il normalise une restitution.

---
Item Type: Enabler · Parent: E52 · Type: architecture · Module: core · Phase: Socle
Stage: ⬜ · Priority: Critical
Dépendances: taxonomie/roles.json, architecture/platform-overview (schéma de rôles + BDD multi-schéma)
