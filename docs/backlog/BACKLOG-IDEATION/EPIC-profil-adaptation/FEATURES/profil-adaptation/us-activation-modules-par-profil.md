# US40.1.2 — Activation des modules par profil

**En tant que** administrateur de la plateforme
**Je veux** que le profil active/désactive automatiquement modules, packs de conformité et niveau de rigueur
**Afin de** éviter la sur-ingénierie (TPE) comme le sous-équipement (État)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un profil d'organisation, when il est appliqué, then les modules-EPIC du domaine et les packs de conformité pertinents sont activés/désactivés automatiquement | ⬜ |
| Given un profil bas de spectre (TPE), when il est appliqué, then les capacités avancées (AP/CP, PPI, DLP…) sont masquées par défaut | ⬜ |
| Error : given un module désactivé par le profil, when un utilisateur tente d'y accéder, then l'accès est refusé proprement (guard module, réponse 403) | ⬜ |
| Security : le guard module s'appuie sur la classe de souveraineté dérivée du profil (US40.1.3) — un module dont l'hébergement/traitement des données ne respecte pas la classe prescrite ne peut jamais être activé, même par contournement du paramétrage utilisateur | ⬜ |

## Hors périmètre
- L'algorithme de dérivation de la classe de souveraineté n'est pas défini ici — cette US ne fait que consommer le résultat produit par US40.1.3.
- Le questionnaire de cadrage et la capture du profil sont couverts par US40.1.1, pas ici.
- Le parcours de montée en gamme progressive (réactivation de capacités sans re-paramétrage) est traité par US40.1.4.

## Notes d'implémentation
- Backend `pivot-pilotage-core` (schéma Flyway `pilotage`) : le guard module s'exécute au niveau du système de modules (E03) et interroge le profil courant + la classe de souveraineté (US40.1.3) avant d'autoriser l'accès.
- Mapping profil → modules/packs de conformité activés à définir en configuration versionnée (pas en dur), pour permettre l'évolution du catalogue sans migration.
- Le masquage des capacités avancées (AP/CP, PPI, DLP…) pour les profils bas de spectre doit être réversible (cf. US40.1.4 — montée en gamme), pas une suppression de données.
- Dépend de EN18.9 (modèle Application→Projet) pour savoir à quel périmètre appliquer le profil.

---
Item Type: US · Parent: F40.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Source: PP-A02 · MoSCoW: Must · Lot: Lot 1 · Origine: Synthèse v2
Profils: Tous
Justification: Synthèse v2 §7 + Insight I1
Dépendances: EN18.9 (modèle Application→Projet)
