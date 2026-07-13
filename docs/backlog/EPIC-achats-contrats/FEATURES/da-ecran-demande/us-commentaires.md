# US25.4.17 — Commentaires

**En tant que** administrateur de la plateforme
**Je veux** disposer d'un champ Commentaires réservé aux administrateurs
**Afin de** annoter une DA sans interrompre son workflow

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un administrateur, when il ouvre une DA, then le champ Commentaires lui est visible et modifiable | ⬜ |
| Given un administrateur, when il modifie le commentaire d'une DA en cours, then la modification est enregistrée sans interrompre le workflow | ⬜ |
| Error : given un utilisateur non administrateur (P, V ou CM), system ne lui affiche pas le champ Commentaires et ne l'autorise pas à le modifier | ⬜ |
| Security/Gouvernance : champ réservé à l'administrateur (A) uniquement — matrice P/V/CM/A = NON/NON/NON/OUI | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le résumé de la demande, saisi par le prescripteur (US dédiée).

## Notes d'implémentation
- Écran de la demande d'achat (module WRAP/OPDN), champ texte Commentaires visible et modifiable par les seuls administrateurs.
- Modification possible sur une DA en cours sans interruption du workflow.

---
Item Type: US · Parent: F25.4 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: administrateur-plateforme
Source: SPEC_OPDN — B.4 Demandes d'achats — écran de la demande
Dépendances: —
