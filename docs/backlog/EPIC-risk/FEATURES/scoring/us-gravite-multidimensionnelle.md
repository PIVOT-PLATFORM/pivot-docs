# US21.2.2 — Gravité multidimensionnelle

**En tant que** Chef de projet, PMO
**Je veux** que la gravité d'un risque soit calculée comme la somme pondérée de ses 6 dimensions d'impact selon le profil du projet
**Afin de** prioriser les risques selon leur criticité

## Contexte

Gravité = somme pondérée des 6 dimensions d'impact selon le profil.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un risque noté sur les 6 dimensions d'impact et un profil de projet avec sa matrice de pondération, when le score de gravité est calculé, then la gravité restituée correspond à la somme pondérée des 6 dimensions selon les poids du profil, et diffère pour un même risque saisi sur deux projets de typologie différente | ⬜ |
| Error : given une dimension d'impact non renseignée ou une pondération manquante pour une dimension du profil, system bloque le calcul de gravité et signale la dimension incomplète plutôt que de produire un score erroné | ⬜ |
| Security : seul un rôle PMO/admin peut modifier la matrice de pondération des impacts d'un profil ; un chef de projet peut noter les dimensions d'un risque mais ne peut pas altérer les poids qui servent au calcul | ⬜ |
| A11y : le détail des 6 dimensions et leur contribution au score de gravité est restitué de façon accessible (tableau structuré avec en-têtes, pas uniquement un graphique) permettant une lecture au clavier et au lecteur d'écran (WCAG 2.1 AA) | ⬜ |

## Hors périmètre
- La définition de la matrice de pondération des impacts elle-même est portée par US21.1.4 (F21.1) ; cette US consomme cette matrice, elle ne la crée pas.
- Le calcul du score global de criticité P × G reste porté par US21.2.1 ; cette US ne remplace pas P, elle raffine G.
- L'ajout d'un facteur détectabilité (mode AMDEC, P × G × D) est traité par US21.2.5.

## Notes d'implémentation
- Dépend de US21.1.4 (Matrice de pondération des impacts) pour la source des poids par dimension et par profil/typologie.
- Dépend de US21.2.1 pour l'intégration de la gravité multidimensionnelle calculée dans le score global P × G.
- Le fait que « la gravité d'un même risque diffère selon la typologie du projet » implique que le calcul doit systématiquement résoudre le profil du projet courant (via `project_ref`, ADR-006/ADR-008) avant d'appliquer les poids — pas de valeur de gravité mise en cache indépendamment du profil.

---
Item Type: US · Parent: F21.2 · Module: risk · Phase: phase-3 · Size: M · Priority: Critical
Stage: Backlog
Dépendances: US21.1.4, US21.2.1
