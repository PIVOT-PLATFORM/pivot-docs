# US49.1.1 — Cartographie de l'organisation

**En tant que** DSI Groupe
**Je veux** modéliser mes unités organisationnelles (DSI Groupe, DSI métier, DSI centrale,
directions métier, départements, équipes) sous forme de hiérarchie et y rattacher mes équipes
existantes
**Afin de** disposer d'un référentiel organisationnel unique, réutilisable par les autres domaines
de gouvernance (architecture, données, citizen dev, cybersécurité)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une organisation vide, when la DSI Groupe crée une unité organisationnelle (nom, type, unité parente optionnelle), then l'unité apparaît dans la hiérarchie à la position attendue | ⬜ |
| Given une hiérarchie d'unités existante, when la DSI Groupe rattache une équipe ([E15](../../../EPIC-equipes/README.md)) à une unité organisationnelle, then ce rattachement est visible dans la cartographie et daté | ⬜ |
| Given une unité organisationnelle avec des équipes rattachées, when la DSI Groupe consulte la vue d'organigramme, then elle voit la hiérarchie complète des unités et les équipes qui y sont rattachées | ⬜ |
| Error : given une tentative de rattachement d'une unité organisationnelle à elle-même ou à l'un de ses descendants, system refuse l'opération et signale un cycle | ⬜ |
| Security : seuls les rôles habilités (DSI Groupe, administrateur d'organisation) peuvent créer/modifier une unité organisationnelle ou un rattachement — lecture seule pour les autres rôles consultant la cartographie | ⬜ |
| A11y : l'écran de cartographie (arborescence, formulaire de création/rattachement) est conforme WCAG 2.1 AA (navigation clavier, structure de titres, labels associés) | ⬜ |

## Hors périmètre
- La définition des rôles et de la matrice RACI eux-mêmes — couverte par [EN49.2](../../ENABLERS/en-modele-roles-raci.md)
- La sélection d'un modèle de gouvernance SI — couverte par [US49.1.2](us-selection-modele-gouvernance.md)
- L'import automatisé d'un organigramme depuis un SIRH externe (non couvert, potentiel enrichissement ultérieur)

## Notes d'implémentation
- S'appuie sur l'entité `OrgUnit` et le rattachement personne/équipe définis dans [EN49.1](../../ENABLERS/en-referentiel-organisationnel.md)
- Le rattachement d'une équipe s'appuie sur le modèle équipe existant d'[E15 — Équipes transverses](../../../EPIC-equipes/README.md) — pas de duplication du modèle équipe
- La détection de cycle doit être vérifiée côté serveur avant écriture, pas uniquement côté formulaire UI (cf. AC Error)

---
Item Type: US · Parent: F49.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Source: Benchmark « Organisations DSI dans les grands groupes », section 1
Dépendances: EN49.1, EN49.2
