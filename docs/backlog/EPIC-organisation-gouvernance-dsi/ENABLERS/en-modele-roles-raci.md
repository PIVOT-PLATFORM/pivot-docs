# EN49.2 — Modèle de rôles & RACI

**Type d'enabler** : architecture (contrat transverse — socle de gouvernance du domaine Pilotage)

**Objectif technique** : Poser le modèle de **rôles génériques** et la **matrice RACI
configurable par domaine/décision** qui sert de référentiel de gouvernance à l'ensemble des EPICs
issus du benchmark « Organisations DSI dans les grands groupes ». Ce modèle **expose un contrat
de rôles réutilisable** — [E50 — Architecture d'entreprise & urbanisation](../../EPIC-architecture-entreprise/README.md),
[E51 — Gouvernance de la donnée](../../EPIC-gouvernance-donnee/README.md), [E52 — Gouvernance
Citizen Development](../../EPIC-citizen-development/README.md) et [E53 — Cybersécurité &
conformité SI](../../EPIC-cyber-conformite-si/README.md) y font référence dans leurs propres AC
plutôt que de redéfinir des rôles ad hoc.

**Rôles génériques** (référentiel de base, extensible) :
- **Sponsor métier** — porte le besoin métier, arbitre les priorités côté direction métier
- **CDO** (Chief Data Officer) — pilote la stratégie et la gouvernance de la donnée
- **RSSI** — responsable de la sécurité des systèmes d'information
- **Architecte** (d'entreprise) — garant de la cohérence et de la conformité architecturale
- **CoE** (Centre of Excellence) — référent transverse d'une pratique (data, citizen dev,
  architecture…), anime les standards et l'accompagnement
- **DSI Groupe** — pilotage SI au niveau du groupe, arbitrage transverse
- **DSI métier** — pilotage SI au niveau d'une direction métier ou d'une business unit
- **DSI centrale** — fonctions SI mutualisées/transverses (hub dans un modèle Hub & Spoke)

**Matrice RACI** : configurable par **domaine** (ex. Architecture, Données, Citizen Development,
Cybersécurité, Organisation) et par **type de décision** au sein de ce domaine (ex. « dérogation à
un standard d'architecture », « classification d'une donnée sensible », « publication d'une
application citizen dev », « traitement d'un incident de sécurité majeur ») ; chaque cellule
(rôle × domaine × décision) porte une valeur **R/A/C/I** (Responsible / Accountable / Consulted /
Informed). Un domaine/type de décision est déclaré par l'EPIC consommateur (E50/E51/E52/E53), qui
vient peupler ses propres lignes de matrice via ce contrat plutôt que de définir sa propre notion
de rôle.

**Justification** : sans un référentiel de rôles et une matrice RACI communs, chacun des EPICs
E50/E51/E52/E53 redéfinirait sa propre nomenclature de rôles (incohérence terminologique,
duplication de modèle de données, RACI non comparables entre domaines). Centraliser ce contrat
dans E49 garantit une gouvernance DSI lisible de bout en bout, tous domaines confondus.

**Critères de complétion** :
- [ ] Entité `Role` (schéma `pilotage`) portant les rôles génériques listés ci-dessus, extensible
      (un client peut ajouter ses propres rôles sans casser le contrat)
- [ ] Rattachement `Role` ↔ personne/`OrgUnit` (EN49.1) — un rôle est porté par une personne dans
      le contexte d'une unité organisationnelle
- [ ] Entité `RaciMatrix` : dimensions `domaine`, `type de décision`, `role_id`, valeur `R/A/C/I`
- [ ] API/contrat exposé (au sens ADR-006 — pas de FK inter-schéma) permettant à E50/E51/E52/E53
      de lire les rôles génériques et de déclarer leurs propres lignes de matrice RACI par domaine
- [ ] Contrainte de cohérence : au plus un `Accountable` par (domaine, type de décision)
- [ ] Test Testcontainers validant la contrainte d'unicité de l'Accountable et la lecture
      cross-module du contrat de rôles

---
Item Type: Enabler · Parent: E49 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: Backlog
Source: Benchmark « Organisations DSI dans les grands groupes », section 1
Justification: Contrat de rôles/RACI partagé — évite la redéfinition ad hoc de rôles dans E50/E51/E52/E53
Dépendances: EN49.1 (référentiel organisationnel) · E01 Authentification & IAM (utilisateurs porteurs des rôles)
