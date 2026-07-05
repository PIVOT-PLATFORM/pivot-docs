# US22.7.3 — Format d'échange ouvert (réversibilité)

**En tant que** DSI
**Je veux** exporter/importer dans un format ouvert documenté (au-delà de MS Project) pour la réversibilité
**Afin de** garantir la portabilité anti lock-in (cf. PP-060)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un portefeuille, when je l'exporte au format ouvert, then projets/jalons/tâches/dépendances/baselines/décisions sont inclus et ré-importables | ⬜ |
| Given le format, when il est publié, then il est documenté et versionné | ⬜ |
| Error : given un fichier corrompu, un JSON structurellement invalide ou un numéro de version de schéma non supporté (trop ancien ou plus récent que la version connue), when je tente l'import, then l'import est rejeté avec un message précisant le numéro de version attendu vs reçu, sans créer de données partielles | ⬜ |
| Security : l'export ne contient que les projets/données auxquels l'utilisateur exportant a accès (pas de fuite inter-tenant/inter-équipe) ; l'import est réservé aux rôles disposant du droit d'écriture sur le portefeuille cible | ⬜ |

## Hors périmètre
- Interopérabilité avec des formats tiers propriétaires (MS Project, Primavera — couverts par US22.7.1/2/4)
- Migration automatique d'anciennes versions du format ouvert vers la version courante (l'US garantit le rejet propre en cas de version non supportée, pas une conversion automatique — un futur enabler de migration pourrait l'ajouter)
- Chiffrement du fichier exporté (le format documente la structure, pas le transport/stockage sécurisé du fichier)

## Notes d'implémentation
- Le format est un JSON versionné et documenté publiquement (numéro de version de schéma explicite dans le fichier, ex. champ `formatVersion`) — c'est le format de référence pour la réversibilité anti lock-in (PP-060), distinct des formats d'échange avec outils tiers
- Le schéma doit couvrir l'intégralité du modèle temporel unique EN22.1 (Projet → Phase → Tâche → Jalon → Dépendance) + baselines + décisions (overlay E24), pas un sous-ensemble
- Publier le schéma (ex. JSON Schema) versionné à côté de la documentation, pour permettre à des tiers de valider leurs fichiers avant import

---
Item Type: US · Parent: F22.7 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
