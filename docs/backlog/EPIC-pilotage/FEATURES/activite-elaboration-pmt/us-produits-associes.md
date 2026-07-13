# US18.17.8 — Produits associés

**En tant que** chef de projet
**Je veux** associer un ou plusieurs produits à l'activité via une liste administrable
**Afin de** rattacher l'activité aux produits concernés selon son type

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ « Produits associés », when j'ouvre la liste, then les valeurs proviennent d'une liste administrable et le champ est obligatoire | ⬜ |
| Given une activité de type Groupement ou Transverse, when je sélectionne des produits, then je peux en choisir plusieurs (multi-sélection) | ⬜ |
| Given une activité de type Build ou Run, when je sélectionne un produit, then une seule valeur est retenue (mono-sélection) | ⬜ |
| Error : given aucun produit sélectionné à l'enregistrement, system bloque (champ obligatoire) | ⬜ |
| Security/Gouvernance : la liste des produits est administrable, seul l'administrateur peut en modifier les valeurs | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'administration de la liste des produits est couverte par les US d'administration des référentiels.

## Notes d'implémentation
- Module pilotage (OPDN), écran Élaboration PMT — informations structurelles, liste obligatoire administrable.
- Cardinalité selon type d'activité : multi pour Groupement/Transverse, mono pour Build/Run.

---
Item Type: US · Parent: F18.17 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.13 Activité — champs Élaboration PMT (informations structurelles)
Dépendances: —
