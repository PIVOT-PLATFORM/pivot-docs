# US18.19.15 — Affichage des jalons (grisés)

**En tant que** chef de projet (pilote d'activité)
**Je veux** que les jalons soient grisés selon leur état
**Afin de** distinguer visuellement les jalons figés de ceux encore éditables

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un jalon quelconque, when l'écran s'affiche, then il est non grisé par défaut | ⬜ |
| Given un jalon sans date de passage, when l'écran s'affiche, then il n'est pas grisé | ⬜ |
| Given un jalon A/B/C/D validé, when l'écran s'affiche, then il est grisé | ⬜ |
| Given un jalon autre que A/B/C/D dont la date de passage est dépassée, when l'écran s'affiche, then il est grisé | ⬜ |
| Error : given un jalon A/B/C/D non validé mais à date dépassée, system ne le grise pas (le grisage A/B/C/D dépend de la validation, pas de la date) | ⬜ |
| Security/Gouvernance : le grisage est un état d'affichage, sans incidence sur les droits de l'utilisateur | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le dégrisage via le bouton « Modifier » est couvert par l'US « Modifier un jalon grisé ».

## Notes d'implémentation
- Règles de grisage (module pilotage, onglet Jalon) : non grisé par défaut ; jalon sans date jamais grisé ; grisé si A/B/C/D validés ou si autre jalon à date de passage dépassée.

---
Item Type: US · Parent: F18.19 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.16 Activité — écran Jalons
Dépendances: —
