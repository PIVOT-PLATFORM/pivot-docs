# EN25.3 — Habilitations par rattachement AD & rôles workflow

**Type d'enabler** : sécurité

**Objectif technique** : Implémenter le moteur d'habilitations du module : mapping code AD → Direction/Division/Unité, attribution des rôles workflow P/V/CM/A, gestion des détachements, héritage descendant Direction → Division → Unité, et droits du Contract Manager hérités du niveau du contrat.

**Justification** : Toutes les vues et actions du module sont filtrées selon le rattachement et le rôle. La cohérence des habilitations (y compris détachements et héritages) est indispensable pour le respect de la matrice d'accès et l'exactitude du périmètre visible par chaque utilisateur.

**Critères de complétion** :
- [ ] Mapping des codes AD Microsoft vers la hiérarchie Direction/Division/Unité.
- [ ] Résolution des rôles P/V/CM/A à partir des groupes/attributs AD et des données du module.
- [ ] Prise en charge des détachements (utilisateur rattaché à plusieurs unités).
- [ ] Héritage descendant Direction → Division → Unité et droits CM alignés sur le niveau du contrat.

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un utilisateur rattaché à une Direction, when le moteur calcule ses droits, then il hérite du périmètre des Divisions et Unités rattachées.
- [ ] Error case: given un code AD non mappé, when le moteur résout les habilitations, then aucun droit n'est accordé et l'anomalie est journalisée.
- [ ] Security: un Contract Manager n'obtient que les droits correspondant au niveau (Direction/Division/Unité) de ses contrats ; aucun accès hors périmètre de rattachement.

---
Item Type: Enabler · Parent: E25 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Rôle: administrateur-plateforme
Source: SPEC_OPDN — module Achats/Contrats (WRAP/OPDN)
Dépendances: —
