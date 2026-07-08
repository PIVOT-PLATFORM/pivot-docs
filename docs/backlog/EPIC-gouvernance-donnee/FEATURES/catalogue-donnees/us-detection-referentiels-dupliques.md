# US51.1.2 — Détection de référentiels dupliqués

En tant que Data Owner ou CDO Groupe (rôle rattaché au référentiel partagé EN49.2)
Je veux que le système signale quand plusieurs domaines de données déclarés se recoupent (une même entité — ex. « client » — déclarée par au moins deux systèmes source distincts)
Afin de détecter les référentiels dupliqués entre métiers et déclencher un arbitrage de gouvernance, sans dépendre d'une réconciliation technique

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given au moins deux domaines de données déclarés avec un nom d'entité identique ou explicitement rapproché (ex. « Client » déclaré par le SI A et le SI B), when le système évalue le catalogue, then une alerte de duplication est générée, listant les domaines et systèmes source concernés | ⬜ |
| Given une alerte de duplication générée, when un Data Owner ou le CDO Groupe la consulte, then il peut la qualifier (confirmer la duplication, la rejeter comme faux positif, ou l'associer à une décision de convergence future) | ⬜ |
| Given une alerte qualifiée « confirmée », when elle est affichée dans le Data Catalog, then son statut et sa justification restent visibles et tracés (auteur, date) | ⬜ |
| Error : given un rapprochement de domaines proposé sur la seule base d'une similarité de nom sans confirmation humaine, system ne le fait jamais remonter comme duplication « confirmée » automatiquement — seule une qualification humaine peut porter ce statut | ⬜ |
| Security : seul un Data Owner/Data Steward ou un rôle d'administration du tenant (EN49.2) peut qualifier une alerte de duplication ; toute autre tentative retourne 403 | ⬜ |
| A11y : la liste des alertes de duplication et leur qualification respectent WCAG 2.1 AA (statuts non portés uniquement par la couleur, navigation clavier) | ⬜ |

## Hors périmètre

- **Réconciliation technique/matching d'entités** (fusion, déduplication algorithmique de
  données) : relève d'un outil MDM dédié, explicitement **hors périmètre PIVOT** — cette US ne
  fait que **signaler** la duplication déclarée, jamais la résoudre techniquement.
- Import automatique de données réelles depuis les systèmes source pour comparer les
  enregistrements — la détection reste au niveau déclaratif (métadonnées des domaines), pas au
  niveau des données elles-mêmes.
- Toute automatisation qui fusionnerait ou synchroniserait des référentiels sans intervention
  humaine.

## Notes d'implémentation

- Alerte de duplication = entité `DonneeReferentielDuplicationAlerte` (schéma `pilotage`), liée à
  ≥ 2 `DonneeDomaine` (US51.1.1) par une relation de rapprochement, avec statut
  (`Détectée`/`Confirmée`/`Rejetée`/`Convergence planifiée`).
- Heuristique de détection au niveau métadonnées (nom d'entité, mots-clés déclarés) — pas de
  comparaison de données réelles.

---
Item Type: US · Parent: F51.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Dépendances: US51.1.1 (Inventaire des domaines de données) · EN49.2 (rôle Data Owner/CDO qualifiant les alertes)
