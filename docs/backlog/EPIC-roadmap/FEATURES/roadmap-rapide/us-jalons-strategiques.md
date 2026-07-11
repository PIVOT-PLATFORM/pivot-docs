# US22.3.4 — Jalons stratégiques

**En tant que** direction
**Je veux** poser des jalons stratégiques (go/no-go, livraisons clés) partagés avec la vue Gantt
**Afin de** matérialiser les points de décision sur la roadmap

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une roadmap, when j'ajoute un jalon, then il est visible sur la roadmap ET sur le Gantt (même objet, cf. EN22.1) | ⬜ |
| Given un jalon, when sa date change côté Gantt, then la roadmap reflète le changement | ⬜ |
| Error : given un jalon sans date ou avec une date hors des bornes du projet, when je tente de l'enregistrer, then l'action est rejetée avec un message explicite | ⬜ |
| Security : seul un utilisateur habilité à éditer le projet (ex. direction, PO) peut créer/déplacer un jalon stratégique ; les autres rôles du domaine `pilotage` en ont une vue lecture seule | ⬜ |
| A11y : les jalons sont identifiables sur la roadmap sans dépendre uniquement de la couleur (icône/label) et accessibles au clavier (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- La gestion des dépendances entre jalons/projets (flèches, cycles) — couverte par US22.1.3.
- La création de jalons périodiques ou récurrents — couverte par US22.4.6 (Gantt détaillé).
- Le calcul d'impact d'un déplacement de jalon sur le planning (chemin critique) — couvert par F22.2/F22.4.

## Notes d'implémentation

- Le jalon est l'objet partagé entre roadmap rapide et Gantt détaillé (EN22.1) : un seul enregistrement, deux rendus (barre roadmap vs. losange Gantt) — aucune duplication ni synchronisation manuelle.
- La propagation bidirectionnelle (Gantt ↔ roadmap) doit passer par la même source de vérité pour éviter tout état incohérent entre les deux vues.

---
Item Type: US · Parent: F22.3 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: macro:direction-pilotage
Profils: Tous
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
