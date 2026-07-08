# Ideation — EPICs hors backlog opérationnel

> Ce dossier contient des EPICs **non opérationnels** : ni Gate 1 atteignable, ni périmètre détaillé
> suffisant pour démarrer une implémentation. Ils représentent des idées de modules ou des extraits
> de benchmark, utiles comme vision à long terme mais pas encore mûrs pour le backlog actif.
>
> **Règle** : aucun item ici ne peut passer à `Stage: Ready` sans décision explicite du mainteneur
> et rédaction complète (périmètre, ACs, DoR §8.2 satisfaite).

## EPICs déplacés ici

| EPIC | Titre | Raison du déplacement |
|------|-------|----------------------|
| [E18](EPIC-pilotage/README.md) | Domaine Pilotage (ombrelle) | Conteneur sans US propres — rôle purement documentaire, pas un EPIC opérationnel |
| [E32](EPIC-ressources-temps/README.md) | Ressources & temps | Généré depuis benchmark CSV, Gate 1 non atteignable en l'état (pas de section Périmètre détaillée) |
| [E33](EPIC-pilotage-taches/README.md) | Collaboration & tâches (pilotage) | Idem E32 |
| [E34](EPIC-pilotage-ia/README.md) | IA & agents (pilotage) | Idem E32 |
| [E35](EPIC-pilotage-gouvernance/README.md) | Gouvernance & sécurité (pilotage) | Idem E32 |
| [E36](EPIC-pilotage-integration-si/README.md) | Intégration SI (pilotage) | Idem E32 |
| [E37](EPIC-pilotage-licences/README.md) | Licences & réversibilité (pilotage) | Idem E32 |
| [E39](EPIC-pilotage-chantiers/README.md) | Chantiers SI (pilotage) | Idem E32 + item "demande-arbitrage" déclaré supprimé par E18 mais toujours présent |
| [E40](EPIC-profil-adaptation/README.md) | Profil & adaptation | Idem E32 |

## Pour réintégrer un EPIC dans le backlog opérationnel

1. Rédiger la section Périmètre complète (intention, valeur, hors-périmètre)
2. Rédiger les ACs Given/When/Then pour chaque US (DoR §8.2)
3. Obtenir la validation explicite du mainteneur
4. Déplacer le dossier EPIC hors de ce répertoire via PR dédiée
