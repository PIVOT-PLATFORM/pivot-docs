# US21.2.4 — Matrice de risques visuelle

**En tant que** Chef de projet
**Je veux** visualiser les risques du projet dans une matrice P × G interactive avec le top risques
**Afin de** prioriser les risques selon leur criticité

## Contexte

Matrice P × G interactive et top risques du projet.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une liste de risques scorés (P × G) sur un projet, when le chef de projet ouvre la matrice de risques, then chaque risque est positionné sur la grille P × G à sa cellule correspondante, est cliquable, et un panneau « top risques » liste les risques les plus critiques du projet | ⬜ |
| Error : given un projet sans aucun risque scoré, system affiche une matrice vide avec un message explicite plutôt qu'une erreur ou une grille cassée | ⬜ |
| Security : la matrice n'affiche que les risques des projets auxquels l'utilisateur a accès (pas de fuite de risques d'un autre projet/portefeuille via le clic sur une cellule ou un lien du top risques) | ⬜ |
| A11y : les cellules de la matrice ne reposent pas uniquement sur la couleur pour indiquer le niveau de criticité (texte, motif ou icône complémentaire), la grille est navigable au clavier, et chaque risque cliquable est exposé à l'aide technique avec un libellé explicite (WCAG 2.1 AA 1.4.1 et 2.1.1) | ⬜ |

## Hors périmètre
- Le calcul du score P × G sous-jacent est produit par US21.2.1 ; cette US se limite à la représentation visuelle et à l'interaction sur ce score déjà calculé.
- L'affichage des seuils d'appétence (zones acceptable/à surveiller/à traiter) sur la matrice s'appuie sur US21.2.3 mais la définition des seuils eux-mêmes n'est pas dans cette US.
- L'export de la matrice dans un rapport formel (PDF, etc.) est couvert par US21.8.5 (Export et rapport de risques), pas ici.

## Notes d'implémentation
- Dépend de US21.2.1 pour la donnée de score P × G positionnant chaque risque dans la grille.
- Le « top risques » doit être calculé à partir du score de criticité (et le cas échéant exposition/vélocité si disponible, cf. US21.2.6) — le tri exact (uniquement P × G vs score ajusté) est à préciser au raffinement technique selon ce qui est déjà livré à ce stade.
- Composant UI consommé depuis le cockpit projet via widget (cf. US21.9.3 « Top risques composable ») : la matrice doit être conçue pour être réutilisable en widget, pas seulement en page pleine.

---
Item Type: US · Parent: F21.2 · Module: risk · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Dépendances: US21.2.1
