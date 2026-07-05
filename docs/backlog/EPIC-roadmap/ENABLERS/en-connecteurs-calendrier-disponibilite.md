# EN22.3 — Connecteurs calendrier & disponibilité (fériés, absences SI RH)

**Type d'enabler** : infrastructure · intégration

**Objectif technique** : Alimenter le moteur d'ordonnancement ([EN22.1](en-modele-temporel-unique.md)) en **temps ouvré réel** :
- **Référentiels de jours fériés** par pays / localité (connecteur fournisseur type API de fériés, ou table administrable), **weekend configurable** par région (ex. vendredi–samedi).
- **SI RH / absences** (SAP SuccessFactors, SAP HCM, Workday, Lucca, ADP…) → import des indisponibilités ressources (congés, RTT, arrêts) — **minimisation RGPD** (périodes seules, pas les motifs).
- Normalisation en **calendriers** (projet/ressource) et **indisponibilités** consommés par l'ordonnancement et le nivellement.

Sert aussi de socle aux **interfaces inter-modules** (F22.8) : consommation via le **bus d'événements PIVOT** et **deep-links**, **sans FK inter-modules** (ADR-006/008).

**Justification** : planifier faux (fériés/absences ignorés) décrédibilise l'outil ; les grands comptes et le secteur public exigent l'interconnexion RH/absences et les calendriers légaux.

**Critères de complétion** :
- [ ] Connecteur fériés par pays/localité (rafraîchissement annuel) + weekend configurable par région
- [ ] Connecteur(s) SI RH/absences (au moins un pivot type SAP) → indisponibilités ressources, RGPD-minimisé
- [ ] Normalisation calendriers/indisponibilités → moteur d'ordonnancement & nivellement
- [ ] Socle bus/deep-links pour les overlays inter-modules (F22.8) — jetons chiffrés, flux tracés

---
Item Type: Enabler · Parent: E22 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Rôle: ingenieur-plateforme
Profils: Tous
Justification: Temps ouvré réel (fériés/weekends/absences) + socle interfaces inter-modules (F22.8)
Dépendances: EN22.1 (moteur d'ordonnancement) · E03 Ressources & temps · bus PIVOT (ADR-008)
