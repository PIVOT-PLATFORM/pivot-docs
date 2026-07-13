# US18.16.1 — Nom de l'activité

**En tant que** chef de projet (pilote d'activité)
**Je veux** saisir le nom de l'activité dans un champ texte préfixé d'un trigramme non effaçable
**Afin de** identifier l'activité de façon unique et cohérente dans les recherches et les activités liées

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Nom de l'activité, when je saisis le nom, then je peux entrer jusqu'à 80 caractères (hors trigramme) et le trigramme (BLD=Build, RUN=Run, GRP=Groupement, TRA=Transverse) est affiché en préfixe non effaçable | ⬜ |
| Given un nom valide saisi, when j'enregistre, then le nom est enregistré avec son trigramme et se retrouve tel quel dans les recherches et les activités liées | ⬜ |
| Error : given un nom commençant par un ou plusieurs espaces, when je valide, then le système bloque et affiche « Espace(s) en début de nom interdit » | ⬜ |
| Error : given un nom déjà existant pour le même type d'activité, when je valide, then le système bloque et affiche « Nom d'activité déjà existant » (BLD-TEST et RUN-TEST restent autorisés car de types différents) | ⬜ |
| Error : given le champ Nom vide ou invalide, when l'écran est affiché, then le bouton Enregistrer/Suivant est grisé | ⬜ |
| Security/Gouvernance : seul le chef de projet pilote de l'activité (ou un administrateur habilité) peut créer ou modifier le nom de l'activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'attribution du trigramme selon le type d'activité (BLD/RUN/GRP/TRA) est fixée à la création et non modifiable ici.
- L'enregistrement global de l'écran Informations générales est couvert par l'US Enregistrer informations générales.

## Notes d'implémentation
- Écran Activité — Informations générales (module pilotage), champ texte obligatoire ≤ 80 caractères hors trigramme.
- Trigramme préfixe non effaçable : BLD, RUN, GRP, TRA ; unicité du nom contrôlée par type d'activité.
- Contrôles bloquants : espace(s) en début de nom, doublon de nom pour un même type.

---
Item Type: US · Parent: F18.16 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.12 Activité — champs Informations générales
Dépendances: —
