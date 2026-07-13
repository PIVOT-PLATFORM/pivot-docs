# US18.16.3 — Météo du projet

**En tant que** chef de projet (pilote d'activité)
**Je veux** sélectionner la météo du projet dans une liste mono-sélection obligatoire à code couleur
**Afin de** communiquer visuellement le niveau de risque de l'activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Météo du projet, when j'ouvre la liste, then je peux choisir une seule valeur parmi : Sans objet (texte gris), Bonne (texte vert), Risque faible (texte orange clair), Risque élevé (texte rouge) | ⬜ |
| Given une nouvelle activité en création, when l'écran s'affiche, then la météo est initialisée à « Sans objet » (valeur par défaut) | ⬜ |
| Given l'import des activités en production, when les activités sont créées, then elles sont initialisées avec la météo « Sans objet » | ⬜ |
| Error : given le champ Météo non renseigné à l'enregistrement, then le système bloque (champ obligatoire) et le bouton Enregistrer/Suivant reste grisé | ⬜ |
| Security/Gouvernance : seul le chef de projet pilote de l'activité (ou un administrateur habilité) peut modifier la météo du projet | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA ; l'information de risque n'est pas véhiculée uniquement par la couleur (libellé texte associé) | ⬜ |

## Hors périmètre
- Les agrégations ou tableaux de bord consolidant la météo au niveau portefeuille ne sont pas couverts ici.
- L'enregistrement global de l'écran est couvert par l'US Enregistrer informations générales.

## Notes d'implémentation
- Écran Activité — Informations générales (module pilotage), liste déroulante obligatoire mono-sélection.
- 4 valeurs avec couleur de texte : Sans objet (gris, défaut), Bonne (vert), Risque faible (orange clair), Risque élevé (rouge).
- Initialisation « Sans objet » à la création et à l'import de production.

---
Item Type: US · Parent: F18.16 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.12 Activité — champs Informations générales
Dépendances: —
