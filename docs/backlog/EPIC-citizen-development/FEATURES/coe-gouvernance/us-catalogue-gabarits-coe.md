# US52.3.1 — Catalogue de gabarits CoE

**En tant que** CoE Citizen Dev
**Je veux** un catalogue transverse de gabarits et composants réutilisables (toutes plateformes citizen dev confondues), accompagné de formation et d'audit périodique
**Afin de** accélérer le développement citoyen conforme aux standards Groupe et réduire la duplication d'efforts entre modules

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un gabarit publié par le CoE Citizen Dev, when un Citizen Developer consulte le catalogue, then il peut le rechercher/filtrer par plateforme (Workflows, Pivot Forms, whiteboard, autre), domaine métier et niveau de risque type | ⬜ |
| Given un gabarit du catalogue, when un Citizen Developer le réutilise dans une application déclarée (US52.1.1), then le lien gabarit-application est tracé pour alimenter le KPI de taux de réutilisation (US52.4.1) | ⬜ |
| Given un module de formation associé à un gabarit ou à une pratique citizen dev, when un Citizen Developer le complète, then sa certification est enregistrée et consultable par le CoE | ⬜ |
| Given un audit périodique du CoE, when il est exécuté, then la conformité des applications utilisant un gabarit du catalogue est vérifiée par rapport à la version du gabarit en vigueur | ⬜ |
| Error : given un gabarit retiré du catalogue (obsolète ou non conforme), system empêche sa réutilisation dans une nouvelle application et signale les applications existantes qui en dépendent encore | ⬜ |
| Security : seul le rôle CoE Citizen Dev peut publier, versionner ou retirer un gabarit du catalogue ; toute publication est tracée avec son auteur | ⬜ |
| A11y : le catalogue de gabarits (recherche, fiche détail, filtres) est navigable au clavier et conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre

- Le contenu technique détaillé de chaque gabarit (ex. modèle de workflow spécifique) — reste porté par le module cible (ex. bibliothèque de modèles US29.1.3 pour Workflows), qui peut référencer ce catalogue transverse comme méta-registre.
- La plateforme de formation elle-même (LMS) — intégration au LMS Groupe existant, non réimplémentée ici.

## Notes d'implémentation

Entité `CoeTemplate` (schéma `pilotage`) : `platform`, `domain`, `version`, `status`
(publié/obsolète/retiré), lien N-N vers `CitizenApp` (US52.1.1) pour tracer la réutilisation.
Entité `CoeTraining` distincte, associée à une pratique ou à un gabarit, avec statut de
certification par utilisateur.

---
Item Type: US · Parent: F52.3 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Dépendances: US52.1.1 (registre transverse, lien gabarit-application) · US52.4.1 (KPI taux de réutilisation) · EN49.2 (rôle CoE Citizen Dev)
