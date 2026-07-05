# US21.9.1 — Corréler un risque à son projet via le bus PIVOT

**En tant que** module Gestion des risques
**Je veux** rattacher chaque risque à un projet par un `project_ref` propagé via le bus PIVOT
**Afin de** relier risques et pilotage sans FK inter-modules (cf. ADR-006 / ADR-008)

## Contexte

Le chaînon d'intégration entre le domaine Pilotage (E18) et le module Risque (E21). Conformément à l'ADR-006 (« jamais de FK inter-modules »), la corrélation risque ↔ projet passe par un identifiant logique `project_ref` alimenté par les événements du bus, et non par une FK `risk → pilotage.projects`.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un risque créé (US21.1.6) sur un projet existant, when il est rattaché à ce projet, then il porte un `project_ref` (identifiant logique) sans FK vers le schéma `pilotage` | ⬜ |
| Given un événement `project.created` ou `project.archived` publié sur le bus PIVOT, when le module risque le consomme, then le référentiel local des projets (`project_ref` connus) est mis à jour en conséquence | ⬜ |
| Error : given un événement bus portant un `project_ref` inconnu du référentiel local, system conserve le risque et le marque « projet non résolu » plutôt que de le rejeter ou de bloquer le traitement | ⬜ |
| Security : un risque n'est visible que pour les utilisateurs habilités sur le tenant du projet correspondant à son `project_ref` | ⬜ |

## Hors périmètre
- La navigation UI entre fiche projet et risques (onglet, deep-link) — couverte par US21.9.2.
- L'émission d'événements par le module risque (`risk.raised`, etc.) — traitée par US21.4.1/US21.4.4 (Boucle vivante).
- La définition de l'entité Project et de son cycle de vie — portée par E22 Roadmap / domaine Pilotage, hors périmètre risque.
- La résolution manuelle ou automatique a posteriori d'un `project_ref` marqué « non résolu » — cette US se limite à ne pas le rejeter ; la reconciliation ultérieure n'est pas détaillée ici.

## Notes d'implémentation
- Corrélation par référence logique uniquement (`project_ref`), jamais de FK inter-modules (cf. ADR-006) — cohérent avec le pattern déjà retenu pour Vendor/Contract (US21.4.5).
- Dépend de US21.1.6 pour l'existence du champ de rattachement sur l'entité Risk, et de US21.4.1 pour l'adaptateur bus déjà en place (EN21.3) consommant les événements Pilotage.
- Le référentiel local des `project_ref` (nom, statut, tenant) doit rester une simple projection en lecture du domaine Pilotage — pas de duplication de logique métier projet côté risque.

---
Item Type: US · Parent: F21.9 · Module: risk · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US21.1.6, US21.4.1
