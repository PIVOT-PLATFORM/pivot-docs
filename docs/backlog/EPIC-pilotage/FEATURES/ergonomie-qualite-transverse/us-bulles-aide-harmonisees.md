# US18.11.1 — Bénéficier de bulles d'aide harmonisées

**En tant que** utilisateur final
**Je veux** disposer de bulles d'information mises en forme et harmonisées sur les formulaires
**Afin de** comprendre les champs à renseigner sans quitter l'écran

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un formulaire (informations générales, informations structurelles, budget, jalons, risques), when je survole ou active une bulle d'aide, then une information mise en forme et harmonisée s'affiche | ⬜ |
| Given l'ensemble des formulaires du module, when je compare les bulles d'aide, then leur présentation (style, positionnement, déclenchement) est cohérente d'un écran à l'autre | ⬜ |
| Error : given une bulle d'aide sans contenu défini pour un champ, system n'affiche pas d'infobulle vide | ⬜ |
| Security/Gouvernance : le contenu des bulles d'aide est informatif et n'expose aucune donnée métier sensible au-delà des habilitations de l'utilisateur | ⬜ |
| A11y : les bulles d'aide sont accessibles au clavier et restituées par lecteur d'écran, conformément à WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La rédaction du contenu métier de chaque bulle relève du paramétrage / de la documentation, pas de cette US.
- Les mécanismes de protection contre la perte de saisie et de réinitialisation des champs sont couverts par leurs US dédiées.

## Notes d'implémentation
- Bulles d'information harmonisées sur les formulaires (module pilotage) : informations générales, structurelles, budget, jalons, risques.

---
Item Type: US · Parent: F18.11 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Backlog OPPA (reconstitution v1–v2.1) — US-1101
Dépendances: —
