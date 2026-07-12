# EN51.6 — Couche de télémétrie d'usage

**Type d'enabler** : architecture / données

**Objectif technique** : Capturer et **persister** des événements d'usage métier (ouverture de
module, création/participation à une session, action clé) dans un magasin interrogeable, pour alimenter
les cards d'**adoption** et d'**usage**. Distinct des métriques techniques Micrometer/Prometheus
(E04), qui sont opérationnelles et non métier.

**Justification** : C'est le **chaînon manquant à plus fort levier** identifié à l'audit de
faisabilité — son absence bloque à elle seule 5-6 cards (Adoption globale, Usage whiteboard/live/quiz,
Adoption par direction métier, et les futures cards d'usage des modules). Aujourd'hui, le whiteboard
ne tient qu'une présence **en mémoire** (`ConcurrentHashMap`), non persistée.

**Critères de complétion** :
- [ ] Contrat d'événement d'usage (`event_type`, tenant, module, acteur pseudonymisé, horodatage,
      `meta` JSONB), aligné sur `ADR-025` (bus d'événements inter-briques).
- [ ] Persistance interrogeable (table dédiée + endpoint d'agrégation par tenant/module/période).
- [ ] Émission depuis au moins une brique existante (whiteboard collaboratif) en preuve de bout en
      bout.
- [ ] RGPD by design : pseudonymisation, rétention bornée, agrégation par défaut (pas de nominatif
      dans les cards d'adoption).
- [ ] Agrégats prêts pour une card : nb de sessions / actifs / tendance sur période.

## Notes

- Débloque F51.2 (Adoption globale) et une grande partie de F51.3 (cards d'usage des modules) sans
  attendre que chaque module réinvente sa propre télémétrie.

---
Item Type: Enabler · Parent: E51 · Type: donnees · Module: core · Phase: phase-3
Stage: ⬜ · Priority: High
Dépendances: ADR-025 (bus d'événements), E30 (whiteboard — 1re source d'événements)
