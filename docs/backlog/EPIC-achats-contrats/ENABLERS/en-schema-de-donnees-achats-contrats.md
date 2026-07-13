# EN25.1 — Schéma de données Achats/Contrats

**Type d'enabler** : architecture

**Objectif technique** : Concevoir et provisionner le schéma de données du module Achats/Contrats dans le schéma `pilotage`, couvrant les entités Demande d'achat, Contrat, Fournisseur, Workflow de validation, Rôles et la hiérarchie Direction/Division/Unité, ainsi que leurs relations.

**Justification** : L'ensemble des US du module (demandes d'achat, contrats, profil, habilitations, workflow) repose sur un modèle de données cohérent. Sans schéma structuré, les règles de rattachement, le circuit de validation et le recensement des contrats ne peuvent être implémentés de façon fiable.

**Critères de complétion** :
- [ ] Entités Demande d'achat, Contrat, Fournisseur, Workflow de validation, Rôles et hiérarchie Direction/Division/Unité modélisées avec clés, contraintes et relations.
- [ ] Schéma créé dans le schéma `pilotage` avec migrations versionnées.
- [ ] Index et contraintes d'intégrité (unicité, clés étrangères) posés sur les rattachements et les liens DA ↔ Contrat ↔ Fournisseur.
- [ ] Modèle documenté (dictionnaire de données) et revu.

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given le schéma `pilotage`, when les migrations sont appliquées, then les tables des six familles d'entités existent avec leurs relations et contraintes.
- [ ] Error case: given une demande d'achat référençant un contrat ou une unité inexistante, when l'enregistrement est tenté, then la contrainte d'intégrité rejette l'opération.
- [ ] Security: les accès aux tables respectent le cloisonnement par rattachement (Direction/Division/Unité) et par rôle P/V/CM/A.

---
Item Type: Enabler · Parent: E25 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Rôle: administrateur-plateforme
Source: SPEC_OPDN — module Achats/Contrats (WRAP/OPDN)
Dépendances: —
