# US18.11.3 — Réinitialiser rapidement les champs de saisie

**En tant que** utilisateur final
**Je veux** disposer d'un bouton de réinitialisation à droite du label des champs clés
**Afin de** vider rapidement une valeur sélectionnée sans la corriger manuellement

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un champ clé avec une valeur sélectionnée, when j'observe le label, then un bouton de réinitialisation apparaît à droite du label | ⬜ |
| Given un champ clé sans valeur sélectionnée, when j'observe le label, then aucun bouton de réinitialisation n'est affiché | ⬜ |
| Given une valeur sélectionnée, when je clique sur le bouton de réinitialisation, then le champ est vidé de sa valeur | ⬜ |
| Error : given un champ vidé par réinitialisation puis obligatoire à l'enregistrement, system applique la règle de champ obligatoire (blocage et signalement) | ⬜ |
| Security/Gouvernance : la réinitialisation d'un champ n'affecte que la saisie en cours et ne modifie pas les données persistées tant que l'enregistrement n'est pas effectué | ⬜ |
| A11y : le bouton de réinitialisation est atteignable au clavier et libellé pour lecteur d'écran, conformément à WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La liste précise des champs considérés comme « clés » relève du paramétrage écran par écran.
- La protection contre la perte de saisie et les bulles d'aide sont couvertes par leurs US dédiées.

## Notes d'implémentation
- Bouton de réinitialisation contextuel à droite du label des champs clés (module pilotage) : visible uniquement si une valeur est sélectionnée ; le clic vide la sélection.

---
Item Type: US · Parent: F18.11 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Backlog OPPA (reconstitution v1–v2.1) — US-1103
Dépendances: —
