# US22.8.2 — Afficher les versions applicatives (releases) sur la timeline

**En tant que** chef de projet
**Je veux** afficher les versions d'une Application (chaque Projet = une version, cf. EN18.9) en bandes de release avec leurs jalons de mise en production
**Afin de** visualiser la trajectoire de release d'un produit à travers ses versions

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une Application avec plusieurs Projet-versions, when j'ouvre sa vue release, then chaque version apparaît en bande datée avec son jalon de MEP | ⬜ |
| Given une version, when sa date de MEP change, then la timeline de l'Application se recalcule | ⬜ |
| Given plusieurs applications, when je filtre par application, then seules ses versions s'affichent | ⬜ |
| Error : given une Application sans aucun Projet-version rattaché, when j'ouvre sa vue release, then un état vide explicite est affiché (pas d'erreur, pas de bande fantôme) | ⬜ |
| Security : la vue release d'une Application n'affiche que les Projet-versions sur lesquels l'utilisateur a un droit de lecture (héritage des permissions projet) | ⬜ |
| A11y : les bandes de release et jalons de MEP restent identifiables par leur libellé/date (pas uniquement par la couleur), navigables au clavier | ⬜ |

## Hors périmètre
- Gestion du cycle de vie applicatif (création/dépréciation d'Application) : porté par EN18.9, pas par cette US
- Déclenchement technique de la mise en production (CI/CD, déploiement) : hors E22, la roadmap ne fait qu'afficher le jalon
- Comparaison multi-applications sur une même timeline (roadmap consolidée) : au-delà du filtre simple demandé ici

## Notes d'implémentation
- S'appuie sur la relation 1 Application → 1..n Projet définie par EN18.9 (chaque Projet = une version) ; la vue release est une lecture agrégée de ces Projets sur l'axe temporel unique (EN22.1)
- Le recalcul de la timeline au changement de date de MEP réutilise le moteur d'ordonnancement d'EN22.1 (pas de logique de recalcul dédiée)
- Le filtre par application doit rester performant même avec un grand nombre de versions historiques (cf. contrainte de performance EN22.2)

---
Item Type: US · Parent: F22.8 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Profils: Tous
Justification: Interopérabilité / interfaces inter-modules & SI (ADR-010, bus PIVOT + deep-links ADR-006/008)
Dépendances: EN22.1 · EN18.9 (Application→Projet)
