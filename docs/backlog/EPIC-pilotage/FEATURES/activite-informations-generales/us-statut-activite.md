# US18.16.2 — Statut de l'activité

**En tant que** chef de projet (pilote d'activité)
**Je veux** sélectionner le statut de l'activité dans une liste mono-sélection obligatoire
**Afin de** refléter l'état d'avancement de l'activité dans le pilotage

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le champ Statut, when j'ouvre la liste, then je peux choisir une seule valeur parmi : À organiser, Prévisionnel, En cours, Terminé, Surbooking, Suspendu, Abandonné, Archivé | ⬜ |
| Given une valeur de statut sélectionnée, when j'enregistre, then le statut retenu est associé à l'activité | ⬜ |
| Error : given le champ Statut non renseigné à l'enregistrement, then le système bloque (champ obligatoire) et le bouton Enregistrer/Suivant reste grisé | ⬜ |
| Security/Gouvernance : seul le chef de projet pilote de l'activité (ou un administrateur habilité) peut modifier le statut | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Les règles métier découlant d'un statut (bascule automatique, verrouillage d'écrans) ne sont pas couvertes ici.
- L'enregistrement global de l'écran est couvert par l'US Enregistrer informations générales.

## Notes d'implémentation
- Écran Activité — Informations générales (module pilotage), liste déroulante obligatoire mono-sélection.
- Valeurs de liste : À organiser, Prévisionnel, En cours, Terminé, Surbooking, Suspendu, Abandonné, Archivé.

---
Item Type: US · Parent: F18.16 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.12 Activité — champs Informations générales
Dépendances: —
