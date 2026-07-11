# US22.7.4 — Import/export Primavera P6 (XER / P6 XML)

**En tant que** chef de projet
**Je veux** importer et exporter des plannings Oracle Primavera P6 (formats .xer et P6 XML)
**Afin de** interopérer avec l'outil de référence des grands projets d'ingénierie

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un fichier .xer ou P6 XML, when je l'importe, then WBS, activités, relations, contraintes, calendriers et ressources sont restitués | ⬜ |
| Given un plan PIVOT, when je l'exporte en P6 XML, then il se ré-ouvre dans Primavera sans perte structurante | ⬜ |
| Given des champs propres à P6 non mappables, then un rapport d'import les liste | ⬜ |
| Error : given un fichier .xer corrompu, un encodage/format invalide ou une version P6 non supportée (ex. .xer d'une version P6 antérieure/postérieure aux versions testées), when je tente l'import, then l'import est rejeté avec un message précis et aucune donnée partielle n'est créée | ⬜ |
| Security : le fichier importé est validé/assaini avant traitement (limite de taille, parsing XML sans résolution d'entités externes pour prévenir le XXE sur P6 XML) ; import réservé aux rôles disposant du droit d'écriture sur le Projet cible | ⬜ |

## Hors périmètre
- Synchronisation continue/bidirectionnelle avec Primavera après l'import ou l'export (chaque opération est un instantané ponctuel)
- Import/export des modules Primavera hors planification (risques P6, portefeuilles P6, EPS complet) — seuls WBS/activités/relations/contraintes/calendriers/ressources du plan sont couverts
- Support d'autres formats Primavera que `.xer` et P6 XML (ex. `.pcxml` legacy)

## Notes d'implémentation
- `.xer` est un format texte tabulaire propriétaire Oracle (versionné, ex. `k` lignes par table) ; P6 XML est un schéma XML documenté — s'appuyer sur une librairie tierce éprouvée plutôt qu'un parseur maison, dans la même logique que MPXJ pour MS Project (US22.7.1)
- Mapping cible le modèle temporel unique EN22.1 : WBS Primavera → Phase, activité → Tâche, relation typée → Dépendance ; les champs P6 spécifiques sans équivalent (ex. certains codes d'activité) alimentent le rapport de non-mappage plutôt que d'être silencieusement perdus
- Cette US est priorisée pour les profils Grand groupe/Publique/État (grands projets d'ingénierie) — pas nécessaire pour PME (cf. altitude par profil E40)

---
Item Type: US · Parent: F22.7 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Profils: Grand groupe, Publique, État
Justification: Interopérabilité / interfaces inter-modules & SI (ADR-010, bus PIVOT + deep-links ADR-006/008)
Dépendances: EN22.1 (modèle temporel unique)
