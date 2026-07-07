# E44 — SignDoc (signature électronique)

## Objectif

Signature électronique de documents auto-hébergée : dépôt d'un PDF, positionnement des champs de signature, invitation des signataires (internes ou externes, sans compte requis), signature en ligne séquentielle ou parallèle, certification et audit trail inviolable. Inspiration : DocuSign, YouSign.

## Repo cible (architecture multi-repo)

- Backend : **`pivot-signdoc-core`** (à créer — schéma Flyway `signdoc`, FK → `public.teams.id`)
- Frontend : **`pivot-signdoc-ui`** (à créer — consomme `@pivot/ui-core` + `@pivot/design-system`)
- **Pré-requis EN17 :** pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase

⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "Socle terminé" par le mainteneur

## Périmètre (phase-3)

### Features

- **F44.1 — Préparation et envoi du document**
  - US44.1.1 : Préparer un document et positionner les champs de signature
  - US44.1.2 : Ajouter des signataires et envoyer les invitations
- **F44.2 — Signature côté destinataire**
  - US44.2.1 : Signer un document via lien sécurisé (avec ou sans compte PIVOT)
- **F44.3 — Finalisation et audit**
  - US44.3.1 : Finaliser le document signé et consulter l'audit trail

### Enablers

- **EN44.1** — Stockage chiffré des documents (source + finalisé) et horodatage du certificat numérique

## Hors périmètre

- **Bibliothèque documentaire générale** (collections, tags, recherche, annotations, manipulation PDF) — portée par [E45 PDF Manager](pathname:///pivot-docs/backlog/EPIC-pdf-manager/). SignDoc importe un document depuis E45 comme source, mais **possède son propre stockage** (EN44.1) pour le document source figé, le PDF final et l'audit trail — dissociés du cycle de vie mutable d'un document E45 (versioning, édition) par exigence d'immuabilité probatoire, pas par duplication involontaire.
- **Signature qualifiée (QES) via tiers certifié** — reste hors scope v1, cf. niveaux eIDAS (Simple/Avancé uniquement en v1).

## Modules impactés

`signdoc` (pivot-signdoc-core + pivot-signdoc-ui)

## Dépendances

- Dépend de : E03 Système de modules (EN03.1 PivotModule interface)
- Dépend de : E17 Infrastructure multi-repo
- Interface avec : **E45 PDF Manager** — sélection d'un document source, archivage du document signé (via bus PIVOT, pas de FK inter-modules — ADR-006/008)
- Interface avec : **E12 MeetOps** — joindre un document signé à un compte-rendu de réunion

## Statut global

⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **Enablers** | |
| EN44.1 — Stockage chiffré des documents | ⬜ |
| **F44.1 — Préparation et envoi** | |
| [US44.1.1 — Préparer un document et positionner les champs](FEATURES/preparation-envoi/us-preparer-document.md) | ⬜ |
| [US44.1.2 — Ajouter des signataires et envoyer les invitations](FEATURES/preparation-envoi/us-ajouter-signataires.md) | ⬜ |
| **F44.2 — Signature destinataire** | |
| [US44.2.1 — Signer un document via lien sécurisé](FEATURES/signature-destinataire/us-signer-document.md) | ⬜ |
| **F44.3 — Finalisation et audit** | |
| [US44.3.1 — Finaliser et consulter l'audit trail](FEATURES/finalisation-audit/us-finaliser-audit-trail.md) | ⬜ |

---
Item Type: Epic · Clé: E44 · Phase: phase-3 · Module: signdoc
Stage: Backlog · Priority: Medium
