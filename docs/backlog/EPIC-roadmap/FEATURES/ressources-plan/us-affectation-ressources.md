# US22.5.1 — Affecter des ressources aux tâches

**En tant que** chef de projet
**Je veux** affecter des ressources (travail/matériel/coût) aux tâches avec des unités d'affectation
**Afin de** relier le plan aux personnes et aux moyens

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une tâche, when j'affecte une ressource à N %, then le travail est réparti selon la relation durée/unités | ⬜ |
| Given une ressource affectée à plusieurs tâches, when je consulte sa charge, then le cumul est visible | ⬜ |
| Error : given une affectation avec des unités hors plage valide (ex. 0 % ou > 100 % sans autoriser explicitement le sur-engagement), when je valide, then l'affectation est rejetée avec un message explicite | ⬜ |
| Security : given un chef de projet sans droit sur le projet ou l'équipe (E15) de la ressource visée, when il tente d'affecter cette ressource, then l'action est refusée (contrôle d'autorisation serveur, pas seulement masquage UI) | ⬜ |

## Hors périmètre

- Le calcul et l'affichage de la courbe de charge période par période et la détection de sur-affectation : couverts par [US22.5.2](us-charge-suraffectation.md).
- La résolution automatique ou manuelle des sur-affectations (décalage des tâches) : couverte par [US22.5.3](us-nivellement-ressources.md).
- Le calcul du coût de l'affectation (taux ressource × travail) : couvert par [US22.5.4](us-couts-plan.md) — cette US se limite à la relation travail/durée/unités.
- La gestion du référentiel des ressources elles-mêmes (création, taux, calendrier individuel) : relève d'EN18/E03 Ressources & temps, pas de cette US.

## Notes d'implémentation

- L'entité **Affectation** (Ressource, unités, travail) fait partie du modèle temporel unique porté par [EN22.1](../../ENABLERS/en-modele-temporel-unique.md) — schéma `pilotage`, pas de double stockage entre roadmap et Gantt.
- La relation durée/unités/travail suit la règle MS Project (Travail = Durée × Unités), avec recalcul selon le mode de planification (auto/manuel, US22.4.2).
- La ressource affectée peut être de type travail, matériel ou coût (cf. EN22.1) — chaque type a une sémantique d'unités différente à respecter dans la validation.
- Dépend d'EN22.1 (modèle temporel unique) ; s'articule avec E15 (équipes transverses, rattachement projet↔équipe) pour la vérification des droits d'affectation.

---
Item Type: US · Parent: F22.5 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
