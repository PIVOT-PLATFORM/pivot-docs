# US21.2.1 — Score probabilité × gravité

**En tant que** Chef de projet
**Je veux** que chaque risque affiche un score de criticité calculé automatiquement à partir de sa probabilité et de sa gravité
**Afin de** prioriser les risques selon leur criticité

## Contexte

Calcul de criticité de base P(1-5) × G(1-5) → 1-25 avec échelles paramétrables.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un risque avec P et G renseignés sur des échelles de 1 à 5, when le chef de projet enregistre le risque, then le score de criticité (P × G, 1-25) et sa couleur de niveau associée s'affichent automatiquement sur la fiche risque | ⬜ |
| Error : given une valeur de P ou G hors de l'échelle 1-5 (ou non numérique), system rejette la saisie et retourne une erreur de validation (400) sans enregistrer le risque | ⬜ |
| Security : seul un rôle habilité (PMO/admin) peut modifier les bornes ou libellés de l'échelle P/G paramétrable ; un simple contributeur peut saisir P et G sur un risque mais ne peut pas altérer le calcul du score ni le barème sous-jacent | ⬜ |
| A11y : la couleur de niveau de criticité est doublée d'un libellé textuel (ex. « Critique », « Élevé ») pour rester perceptible sans distinction de couleur (WCAG 2.1 AA 1.4.1) | ⬜ |

## Hors périmètre
- La gravité multidimensionnelle (pondération des 6 dimensions d'impact) est traitée par US21.2.2 ; ici G est une valeur simple 1-5.
- La définition des seuils d'appétence (acceptable/à surveiller/à traiter) est traitée par US21.2.3.
- La représentation graphique en matrice P × G est traitée par US21.2.4 ; cette US ne couvre que le calcul et l'affichage du score sur la fiche risque.

## Notes d'implémentation
- Le score de criticité est dérivé (P × G) : il ne doit pas être stocké comme champ libre modifiable indépendamment de P et G, pour garantir l'intégrité du calcul.
- Les échelles P et G doivent être paramétrables (bornes, libellés par cran) au niveau du profil de projet issu de US21.1.1/US21.1.4, sans changer la formule P × G.
- Dépend de US21.1.6 (entité Risk au catalogue) pour disposer des champs P et G sur l'entité.

---
Item Type: US · Parent: F21.2 · Module: risk · Phase: phase-3 · Size: M · Priority: Critical
Stage: Backlog
Dépendances: US21.1.6
