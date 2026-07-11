# US22.3.2 — Échelle de temps floue (trimestres / semestres)

**En tant que** direction
**Je veux** travailler avec un temps flou (trimestre, semestre, « H1/H2 ») plutôt que des dates exactes
**Afin de** rester à l'altitude stratégique sans fausse précision

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une roadmap, when je choisis l'échelle (mois/trimestre/semestre), then les barres s'alignent sur des bornes de période, pas sur des dates au jour | ⬜ |
| Given une initiative sans date précise, when elle est affichée, then aucune date exacte n'est imposée | ⬜ |
| Error : given un changement d'échelle (ex. trimestre → mois), when des initiatives existantes ne peuvent pas être réalignées sans perte d'information, then l'échelle est appliquée sans supprimer ni tronquer les données de période existantes | ⬜ |
| Security : le changement d'échelle est un réglage d'affichage propre à l'utilisateur/à la roadmap ; il ne modifie pas les données du projet consultées par d'autres utilisateurs sans droit d'édition | ⬜ |
| A11y : le sélecteur d'échelle (mois/trimestre/semestre) est utilisable au clavier et son état courant est restitué aux lecteurs d'écran (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- La création et le déplacement des initiatives elles-mêmes — couverts par US22.3.1.
- Les vues Now/Next/Later, qui suppriment l'axe temporel plutôt que de le rendre flou — couvertes par US22.3.3.
- La planification à la date près (calendriers ouvrés, contraintes) — relève du Gantt détaillé (F22.4).

## Notes d'implémentation

- L'échelle floue est une projection d'affichage sur le modèle temporel unique (EN22.1) : les bornes de période (mois/trimestre/semestre) sont calculées, pas stockées comme dates distinctes.
- Le choix d'échelle est un réglage de vue par roadmap, cohérent avec l'altitude pilotée par le profil d'organisation (E40).

---
Item Type: US · Parent: F22.3 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: macro:direction-pilotage
Profils: Tous
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
