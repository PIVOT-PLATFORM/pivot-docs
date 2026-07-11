# US22.5.3 — Nivellement des ressources

**En tant que** chef de projet
**Je veux** niveler les ressources (leveling) automatiquement ou manuellement pour résoudre les sur-affectations
**Afin de** obtenir un planning tenable en capacité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des sur-affectations, when je lance le nivellement, then les tâches sont décalées/retardées selon les priorités pour lisser la charge | ⬜ |
| Given un nivellement, when il est appliqué, then je peux le prévisualiser et l'annuler | ⬜ |
| Error : given un nivellement qui ne peut pas résoudre toutes les sur-affectations (contraintes trop fortes), when il est lancé, then le système signale les sur-affectations résiduelles plutôt que d'échouer silencieusement | ⬜ |
| Security : seul un utilisateur habilité à planifier le projet (chef de projet, PMO) peut lancer ou appliquer un nivellement ; l'action modifie le planning partagé et doit être tracée (auteur, date) | ⬜ |
| A11y : la prévisualisation du nivellement (avant/après) est restituée de façon exploitable sans souris (navigation clavier, alternative textuelle aux décalages visuels) (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- La détection et la visualisation des sur-affectations elles-mêmes — couvertes par US22.5.2.
- La définition des priorités entre tâches utilisées par l'algorithme de nivellement — dépend des priorités déjà posées sur le projet, non redéfinies ici.
- Le nivellement inter-projets (portefeuille) — cette US couvre le nivellement au sein d'un projet.

## Notes d'implémentation

- Le nivellement agit sur le modèle temporel unique (EN22.1) : décalage des tâches/dates, propagation aux dépendances et jalons partagés avec la roadmap rapide.
- La prévisualisation implique de calculer un état candidat sans l'appliquer (diff avant/après) avant confirmation ; l'annulation doit restaurer l'état précédent (baseline ou undo dédié).
- Fonctionnalité réservée aux profils Grand groupe/Publique/État (cf. frontmatter `Profils`) — le nivellement est jugé « peu utile en TPE » (cf. README E22).

---
Item Type: US · Parent: F22.5 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Profils: Grand groupe, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
