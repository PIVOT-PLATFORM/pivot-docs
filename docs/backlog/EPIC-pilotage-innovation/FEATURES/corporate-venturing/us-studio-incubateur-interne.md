# US38.13.1 — Studio / incubateur interne

**En tant que** responsable innovation
**Je veux** gérer un **studio/incubateur interne** : parcours d'incubation (jalons, ressources dédiées, temps alloué) pour les projets intrapreneuriaux
**Afin de** donner un cadre et des moyens aux innovations de rupture

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une innovation retenue, when elle entre en incubation, then un parcours (jalons, ressources, temps alloué, sponsor) est instancié | ⬜ |
| Given un incubé, when il progresse, then ses jalons conditionnent la poursuite (lien stage-gate F38.3) | ⬜ |
| Error : given un jalon d'incubation sans sponsor ni ressource assignée, when on tente de le valider, then la validation est bloquée tant que ces informations manquent | ⬜ |
| Security : seuls le responsable innovation et le sponsor désigné du projet incubé peuvent modifier son parcours (jalons, ressources, temps alloué) ; les autres utilisateurs ont un accès en lecture seule | ⬜ |
| A11y : le suivi du parcours d'incubation (jalons, statut, ressources) est consultable au clavier et restitué correctement par lecteur d'écran (rôles ARIA sur la timeline/les étapes) | ⬜ |

## Hors périmètre
- La gestion RH/administrative de l'affectation des personnes (contrats, mobilité) : seul le temps alloué déclaratif est suivi, pas l'intégration SIRH
- Le financement par tranches du projet incubé : couvert par US38.13.2 (venture board & financement par paliers), pas par cette US
- La sortie d'incubation vers une entité juridique séparée : couverte par US38.13.3 (spin-off/spin-in)

## Notes d'implémentation
- S'appuie sur EN38.1 (modèle SMI) : le parcours d'incubation instancie un sous-ensemble d'étapes du stage-gate (F38.3) avec jalons dédiés à l'incubation
- Le sponsor et les ressources allouées doivent être des références vers des personnes/équipes existantes (pas de duplication d'annuaire)
- Le lien avec le financement par paliers (US38.13.2) se fait via l'InnovationItem incubé, sans coupler les modèles

---
Item Type: US · Parent: F38.13 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Profils: Grand groupe, Publique, État
Justification: SMI — fonctionnalités innovantes (IA gouvernée, intelligence collective, corporate venturing)
Dépendances: EN38.1 · EN38.2 (moteur IA & graphe)
