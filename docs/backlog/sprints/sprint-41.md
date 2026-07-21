# Sprint 41 — Raffinage & clarification des domaines (Vague 1 : Socle)

> **Reséquencé (2026-07-13)** : ce sprint de raffinage occupait auparavant le **Sprint 21**. Il est
> **repoussé après la complétion des domaines Pilotage & Risques** (S21→S40) à la demande du
> mainteneur — la complétion à 100 % de ces domaines prend la priorité sur le raffinage documentaire.
> Contenu (framework EN52.1-3 + 9 fiches Socle) **inchangé**, seul son rang de séquencement a bougé.
>
> **Objet** : ouvrir le programme de **raffinage** demandé — « raffiner énormément tout ce qui a été
> fait avant » — en rendant **chaque domaine déjà livré parfaitement clair** sur quatre axes :
> **CRUD**, **qui a accès (par profil)**, **comment on y accède**, **d'où viennent les infos (API
> externes & sources)**. Vague 1 = **domaines Socle** ; Pilotage en **S42**, Agilité/Collaboratif +
> synthèse en **S43** (cf. [E52](../EPIC-clarification-domaines/README.md)).
>
> **Nature du sprint** : livrables **documentaires** dans `pivot-docs` (`docs/architecture/domaines/`).
> Aucun code applicatif, aucun changement de contrat d'API — on **documente l'existant** et on
> **relève les écarts** (droit non appliqué serveur, source externe non tracée) en findings à
> arbitrer, jamais de correctif unilatéral.
>
> **Remplacement** : ce sprint **remplace** l'ancien Sprint 14 « Cockpits DSI ». L'EPIC E51 Cockpits
> reste intacte et est **reséquencée** en [backlog post-S19](./backlog-post-s12.md) (queue non
> planifiée), à replanifier après la vague de raffinage.
>
> **Statut** : ⬜ planifié — non démarré. Framework (EN52.1-3) faisable immédiatement, fiches
> Socle enchaînées derrière.
>
> ⚠️ **Incohérence corrigée (2026-07-21)** : cette section indiquait encore "Séquencé après S20",
> un reliquat d'une version antérieure du plan, alors que le paragraphe ci-dessus dit "repoussé
> après S21→S40". Par ailleurs, le domaine Pilotage a depuis été extrait de PIVOT (2026-07-20,
> ADR-030) — S21→S40 n'est donc plus le jalon d'entrée pertinent ; le séquencement réel de S41
> reste à trancher par le mainteneur (voir `sprints/README.md` §Domaine Pilotage extrait).

**Sortie :** un **référentiel de clarification des domaines Socle** — 1 template + 1 référentiel
d'accès consolidé + 1 registre des API externes + **9 fiches de domaine** (Identités/IAM, Espace
compte, Tenants & Équipes, Administration, Système de modules, Shell & notifications, Observabilité &
audit, Whiteboard, Infra & CI/CD), chacune répondant aux 4 axes.

## Les 4 axes (rappel du contrat de fiche — [EN52.1](../EPIC-clarification-domaines/ENABLERS/en-template-fiche-domaine.md))

| # | Axe | Question | Notation |
|---|-----|----------|----------|
| 1 | Entités & CRUD | *Quoi ?* | `C R U D` / `—` / `(scope)` |
| 2 | Accès par profil | *Qui ?* | `●` autorisé / `◑` conditionnel / `○` interdit |
| 3 | Mécanisme d'accès | *Comment ?* | point d'application serveur nommé (guard/annotation/filtre) |
| 4 | API externes & sources | *D'où ?* | sens `↓in`/`↑out`/`↕`, protocole, secret, dev/prod |

## Scope

- **Framework (faisable maintenant, à livrer en premier)** : EN52.1 (template + conventions),
  EN52.2 (référentiel d'accès consolidé : rôles système/équipe/portées/mécanismes/mapping taxonomie),
  EN52.3 (registre des API externes & sources de données).
- **Fiches de domaine Socle (F52.1)** : US52.1.1 à US52.1.9 — une fiche par domaine livré.

## Items

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| EN52.1 | Template de fiche de domaine & conventions de matrices | M | Critical | ⬜ |
| EN52.2 | Référentiel d'accès consolidé (qui / comment) | M | Critical | ⬜ |
| EN52.3 | Registre des API externes & sources de données (d'où) | M | High | ⬜ |
| US52.1.1 | Fiche — Identités & IAM *(E01 · auth)* | M | Critical | ⬜ |
| US52.1.2 | Fiche — Espace compte *(E02 · core)* | S | High | ⬜ |
| US52.1.3 | Fiche — Tenants & Équipes *(E17 · core)* | M | Critical | ⬜ |
| US52.1.4 | Fiche — Administration *(E06 · admin)* | M | Critical | ⬜ |
| US52.1.5 | Fiche — Système de modules *(E03 · core)* | S | High | ⬜ |
| US52.1.6 | Fiche — Shell, navigation & notifications *(E16 · core)* | S | Medium | ⬜ |
| US52.1.7 | Fiche — Observabilité & audit *(E04 · core)* | M | High | ⬜ |
| US52.1.8 | Fiche — Collaboratif · Whiteboard *(E30 noyau · collaboratif)* | L | High | ⬜ |
| US52.1.9 | Fiche — Infrastructure, CI/CD & sources externes *(E05/E07/E17 · core)* | M | Medium | ⬜ |

> **Vagues suivantes (hors S41)** — F52.2 domaines Pilotage (Sprint 42, après recette S21-S40) ·
> F52.3 domaines Agilité/Collaboratif + **synthèse transverse** (Sprint 43 : matrice d'accès
> plateforme complète, cartographie des flux externes consolidée, liste des écarts arbitrés).

## Ordre d'attaque suggéré

1. **EN52.1** (template + conventions) — bloque toutes les fiches, à livrer en premier.
2. **EN52.2 + EN52.3** (référentiel d'accès + registre externes) en parallèle — les deux socles
   référencés par les 9 fiches (axes 3 et 4).
3. **US52.1.3 Tenants & Équipes** puis **US52.1.5 Système de modules** — fiches des **portées**
   (tenant/équipe/module) que les autres fiches citent pour l'axe « accès ».
4. **US52.1.1 / .4 / .7** (Identités, Administration, Audit) — le triangle sensible « qui a accès ».
5. **US52.1.2 / .6 / .8 / .9** — comptes, shell, whiteboard (patron des modules métier), infra.

## Pré-requis d'amorçage

- Gate 1 READINESS sur les 12 items avant tout Dev Agent (les US de fiches naissent en stub — DoR à
  compléter au démarrage, gabarit E44-E50).
- Confirmer au Gate 1 : la notation des matrices (`●/◑/○`, `C/R/U/D`) est-elle figée par EN52.1 avant
  la première fiche ? (dépendance dure : oui.)
- Rappel : chaque fiche **documente et relève des écarts** ; tout correctif applicatif détecté est un
  finding à ouvrir séparément (branche `fix/…` hors E52), jamais traité dans la fiche.
