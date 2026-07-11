# US22.7.2 — Export MS Project & Excel

**En tant que** chef de projet
**Je veux** exporter le plan au format MS Project (.xml MSPDI) et en Excel
**Afin de** interopérer avec l'écosystème MS Project et éviter le lock-in

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un plan, when je l'exporte en .xml MSPDI, then il se ré-ouvre dans MS Project sans perte majeure (tâches/dép./ressources/calendriers) | ⬜ |
| Given un aller-retour import→export, when je le compare, then aucune donnée structurante n'est perdue | ⬜ |
| Error : given un plan contenant une entité non représentable dans le schéma MSPDI (ex. dépendance ou champ propre à PIVOT), when j'exporte, then l'export aboutit quand même et un rapport signale les éléments dégradés/omis (jamais un fichier .xml silencieusement invalide) | ⬜ |
| Security : seul un utilisateur ayant accès en lecture au Projet peut déclencher l'export ; le fichier généré n'inclut pas de données d'autres Projets ni de champs internes non pertinents pour MS Project | ⬜ |

## Hors périmètre
- Export vers `.mpp` binaire (seul `.xml` MSPDI est exporté ; `.mpp` reste import-only, cf. US22.7.1)
- Export Excel avec mise en forme/graphiques avancés (couvert par US22.6.3/US22.6.4 vues & restitutions ; ici l'Excel est un export de données tabulaire)
- Synchronisation continue post-export (export = instantané figé, pas un lien vivant)

## Notes d'implémentation
- Réutiliser la même librairie de sérialisation MSPDI que l'import (US22.7.1, ex. MPXJ) pour garantir la symétrie du mapping EN22.1 → MSPDI
- Le test de non-régression "aller-retour import→export" doit être un test automatisé comparant les entités du modèle temporel unique avant/après, pas une vérification manuelle dans MS Project
- L'export Excel réutilise le même mapping de colonnes que US22.7.5 (tableur & données) pour éviter deux implémentations divergentes

---
Item Type: US · Parent: F22.7 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
