# US21.2.5 — Mode AMDEC (détectabilité)

**En tant que** Dev, Data
**Je veux** pouvoir activer un facteur de détectabilité (P × G × D) pour les typologies de projet où la détection tardive d'un risque est déterminante
**Afin de** prioriser les risques selon leur criticité

## Contexte

Ajouter la détectabilité (P × G × D) pour les typologies où la détection tardive prime.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une typologie de projet configurée en mode AMDEC (ex. Dev, Data), when un risque de ce projet est scoré, then le facteur détectabilité D (1-5) s'ajoute au calcul et le score de criticité restitué est P × G × D à la place de P × G | ⬜ |
| Error : given un projet en mode AMDEC dont un risque n'a pas de détectabilité renseignée, system empêche le calcul du score AMDEC et signale la valeur D manquante plutôt que de retomber silencieusement sur P × G | ⬜ |
| Security : seul un rôle habilité (PMO/admin) peut activer ou désactiver le mode AMDEC pour une typologie de projet ; ce changement de mode de calcul de criticité ne doit pas être accessible à un simple contributeur | ⬜ |
| A11y : le score AMDEC (P × G × D) est distingué du score standard (P × G) par un libellé explicite sur la fiche risque, pas seulement par une convention visuelle | ⬜ |

## Hors périmètre
- Le calcul du score standard P × G reste porté par US21.2.1 ; cette US ajoute un mode alternatif optionnel, elle ne remplace pas le calcul par défaut pour les typologies non-AMDEC.
- La sélection des typologies concernées (quelles typologies de projet activent le mode AMDEC) s'appuie sur la bibliothèque de typologies de US21.1.2, pas définie ici.
- L'affichage du score AMDEC dans la matrice visuelle (échelle 1-125 vs 1-25) est à traiter au niveau de US21.2.4 lors du raffinement, pas dans cette US.

## Notes d'implémentation
- Dépend de US21.2.1 pour la base du calcul P × G à laquelle s'ajoute le facteur D.
- Le mode AMDEC est un paramètre par typologie de projet (probablement porté par le profil issu de US21.1.1/US21.1.3), pas un paramètre global de l'instance — deux projets de typologies différentes peuvent coexister avec/sans AMDEC actif.
- L'échelle de détectabilité D (1-5, où une détectabilité élevée aggrave la criticité ou l'inverse selon convention AMDEC standard — détectabilité faible = risque élevé) doit être explicitée et documentée pour éviter toute ambiguïté de sens lors de la saisie.

---
Item Type: US · Parent: F21.2 · Module: risk · Phase: phase-3 · Size: S · Priority: Medium
Stage: Backlog
Dépendances: US21.2.1
