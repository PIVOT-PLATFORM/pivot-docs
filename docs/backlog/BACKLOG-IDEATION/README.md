# Ideation — EPICs hors backlog opérationnel

> Ce dossier contient des EPICs **non opérationnels** : ni Gate 1 atteignable, ni périmètre détaillé
> suffisant pour démarrer une implémentation. Ils représentent des idées de modules ou des extraits
> de benchmark, utiles comme vision à long terme mais pas encore mûrs pour le backlog actif.
>
> **Règle** : aucun item ici ne peut passer à `Stage: Ready` sans décision explicite du mainteneur
> et rédaction complète (périmètre, ACs, DoR §8.2 satisfaite).

## EPICs entiers déplacés ici

| EPIC | Titre | Raison du déplacement |
|------|-------|----------------------|
| [E18](EPIC-pilotage/README.md) | Domaine Pilotage (ombrelle) | Conteneur sans US propres — rôle purement documentaire, pas un EPIC opérationnel |
| [E25](EPIC-commande-publique/README.md) | Commande publique | Niche secteur public français (appels d'offres), périmètre décalé vs POC PouetPouet (workflow achat interne) — décision ouverte D1 résolue : en idéation |
| [E32](EPIC-ressources-temps/README.md) | Ressources & temps | Généré depuis benchmark CSV, Gate 1 non atteignable en l'état (pas de section Périmètre détaillée) |
| [E33](EPIC-pilotage-taches/README.md) | Collaboration & tâches (pilotage) | Idem E32 |
| [E34](EPIC-pilotage-ia/README.md) | IA & agents (pilotage) | Idem E32 |
| [E35](EPIC-pilotage-gouvernance/README.md) | Gouvernance & sécurité (pilotage) | Idem E32 |
| [E36](EPIC-pilotage-integration-si/README.md) | Intégration SI (pilotage) | Idem E32 |
| [E37](EPIC-pilotage-licences/README.md) | Licences & réversibilité (pilotage) | Idem E32 |
| [E39](EPIC-pilotage-chantiers/README.md) | Chantiers SI (pilotage) | Idem E32 + item "demande-arbitrage" déclaré supprimé par E18 mais toujours présent |
| [E40](EPIC-profil-adaptation/README.md) | Profil & adaptation | Idem E32 |

## Éléments partiels d'EPICs opérationnels

Ces items proviennent d'EPICs qui **restent dans le backlog opérationnel** mais dont certaines features ou US ont été identifiées comme hors scope ou insuffisamment matures :

| Source | Élément | Raison |
|--------|---------|--------|
| E28 — Intégration OSS | F28.6 Pilotage de portefeuille (OpenProject/ProjeQtOr) | Doublon avec E22/E23 natifs |
| E28 — Intégration OSS | F28.9 Whiteboard adaptateur (Excalidraw/tldraw) | Doublon avec E30 natif |
| E28 — Intégration OSS | F28.10 SCM & CI/CD | Hors domaine PIVOT |
| E28 — Intégration OSS | F28.11 Plateforme développeur | Hors domaine PIVOT |
| E29 — Workflows | F29.10 RPA & process intelligence | Hors scope (RPA desktop + process mining) |
| E29 — Workflows | F29.14 Chantiers SI | Méta-gouvernance SI, pas des features produit |
| E38 — Pilotage innovation | F38.14 Intelligence collective avancée | Trop spéculatif (marchés prédictifs, sérendipité, Black-Scholes) |
| E38 — Pilotage innovation | US38.13.2 Venture board & financement | Modèle VC interne, hors scope PME |
| E38 — Pilotage innovation | US38.13.4 Lien écosystème start-up & CVC | Deal flow / M&A, hors scope PIVOT |
| E38 — Pilotage innovation | US38.7.1 Propriété intellectuelle / brevets | Trop niche (INPI/EPO) |
| E38 — Pilotage innovation | EN38.2 Moteur IA & graphe | Over-ambitious, dépend de F38.14 déplacée |
| E23 — Portefeuille | US23.2.9 Livrables d'instance générés | Secteur public uniquement |
| E23 — Portefeuille | US23.2.10 Indicateurs de valeur publique | Secteur public uniquement |
| E26 — Budget | US26.2.2 Budgets pluriannuels PPI | Secteur public uniquement |
| E26 — Budget | US26.2.4 Interface ERP finance | Dépendance externe lourde, portée insuffisante |
| E26 — Budget | US26.2.5 Suivi des subventions | Secteur public uniquement |
| E26 — Budget | US26.2.6 Simulation AP/CP | Secteur public uniquement |
| E30 — Collaboration | US30.14.3 Traduction simultanée | Spéculatif, dépendance IA |
| E30 — Collaboration | US30.14.5 Pont physique-numérique continu | Spéculatif, infrastructure non définie |
| E41 — Formation | US41.5.14 Onboarding commande publique | E25 en idéation |

## Pour réintégrer un EPIC dans le backlog opérationnel

1. Rédiger la section Périmètre complète (intention, valeur, hors-périmètre)
2. Rédiger les ACs Given/When/Then pour chaque US (DoR §8.2)
3. Obtenir la validation explicite du mainteneur
4. Déplacer le dossier EPIC hors de ce répertoire via PR dédiée
