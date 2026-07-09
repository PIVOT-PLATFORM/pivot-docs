# US23.2.6 — Pilotage des plans stratégiques

**En tant que** direction
**Je veux** prolonger le portefeuille vers les plans stratégiques et contrats d'objectifs (déclinaison, suivi, alignement)
**Afin de** relier les projets aux orientations stratégiques et suivre leur alignement

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un plan stratégique, when la direction le décline, then les projets sont rattachés aux objectifs stratégiques | ⬜ |
| L'alignement et l'avancement des projets sont suivis au regard des contrats d'objectifs | ⬜ |
| Error : given un projet sans rattachement stratégique, system le signale comme non aligné | ⬜ |
| Security/Gouvernance : seule la direction (rôle habilité) peut créer/modifier un plan stratégique ou un contrat d'objectifs ; le rattachement d'un projet reste traçable | ⬜ |
| A11y : les vues de suivi stratégique sont conformes RGAA 4 / WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La définition et la gouvernance des contrats d'objectifs eux-mêmes (processus métier hors outil) ne sont pas couvertes, seul leur suivi dans l'outil l'est.
- Le calcul détaillé de l'avancement d'un projet reste porté par les indicateurs existants (météo US23.2.4, avancement US23.1.1) — cette US ne fait qu'y ajouter la dimension d'alignement stratégique.
- Les scénarios de simulation d'impact sur les objectifs stratégiques relèvent de US23.2.7.

## Notes d'implémentation
- US de taille XL et priorité Could — plus grosse maille du portefeuille : rattache les projets (E22) à des plans stratégiques/contrats d'objectifs, entités à modéliser dans le schéma `pilotage`.
- Le rattachement projet ↔ plan stratégique doit rester cohérent avec la hiérarchie programme/projets de US23.2.5 si les deux sont utilisées conjointement.
- Frontend `pivot-pilotage-ui`, consomme `@pivot/ui-core` + `@pivot/design-system`.

---
Item Type: US · Parent: F23.2 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Medium
Stage: ⬜
Source: PP-048 · MoSCoW: Could · Lot: Lot 4 · Origine: Différenciant Virage (Strat Monitor, toutes les ARS)
Profils: Grand groupe, Publique, État
Justification: Dossier §6.1
Dépendances: —
