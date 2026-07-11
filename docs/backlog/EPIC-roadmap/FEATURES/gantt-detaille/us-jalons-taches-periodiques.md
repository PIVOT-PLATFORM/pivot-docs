# US22.4.6 — Jalons & tâches périodiques

**En tant que** chef de projet
**Je veux** créer des jalons (durée 0) et des tâches périodiques (récurrentes : comité hebdo, etc.)
**Afin de** modéliser points de contrôle et activités récurrentes

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une tâche de durée 0, when elle est créée, then elle s'affiche comme jalon | ⬜ |
| Given une tâche périodique (fréquence, occurrences), when je la crée, then les occurrences sont générées selon le calendrier | ⬜ |
| Error : given une tâche périodique sans fréquence ni nombre d'occurrences valide, then la création est refusée avec un message explicite | ⬜ |
| Security : seul un utilisateur avec un rôle d'édition sur le projet peut créer un jalon ou une tâche périodique ; la génération des occurrences est tracée comme une action unique (pas une par occurrence) dans l'historique | ⬜ |
| A11y : le jalon (symbole losange) et les occurrences d'une tâche périodique sont identifiables dans le Gantt par un libellé texte accessible, pas uniquement par leur forme ou leur couleur | ⬜ |

## Hors périmètre
- La récurrence intelligente basée sur un calendrier externe (ex. réunions synchronisées avec MeetOps) : couverte par US22.8.6
- Le suivi d'avancement individuel de chaque occurrence générée : couvert par US22.4.8
- La modification en masse d'une série d'occurrences (ex. déplacer toute la série) : non détaillée ici, à préciser si besoin lors de l'implémentation

## Notes d'implémentation
- Un jalon est modélisé comme une tâche de durée 0 dans le graphe temporel unique (EN22.1), pas comme une entité séparée, pour rester cohérent avec la vue Roadmap rapide (jalon = objet partagé)
- La génération des occurrences d'une tâche périodique doit respecter le calendrier ouvré (US22.4.5) : une occurrence tombant un jour non travaillé est décalée selon la même règle que les autres tâches
- Prévoir une limite raisonnable au nombre d'occurrences générées en une fois (perf EN22.2) pour éviter une explosion du graphe sur des récurrences longues (ex. comité hebdo sur plusieurs années)

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
