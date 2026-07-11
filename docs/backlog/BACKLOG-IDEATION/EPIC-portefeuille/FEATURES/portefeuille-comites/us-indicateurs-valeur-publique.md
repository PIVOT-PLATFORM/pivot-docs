# US23.2.10 — Indicateurs de valeur publique

**En tant que** direction
**Je veux** rattacher aux projets des indicateurs d'impact (transition écologique, égalité territoriale, qualité de service) consolidés en portefeuille
**Afin de** mesurer le 'triple bilan' du portefeuille public au-delà du seul avancement

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet, when des indicateurs d'impact lui sont rattachés, then transition écologique, égalité territoriale et qualité de service sont suivis | ⬜ |
| Les indicateurs d'impact sont consolidés au niveau portefeuille | ⬜ |
| Error : given un indicateur sans valeur mesurée, system l'affiche comme non renseigné | ⬜ |
| Security/Gouvernance : la saisie/modification des indicateurs d'impact n'est accessible qu'aux rôles habilités (direction/PMO) du tenant concerné | ⬜ |
| A11y : les restitutions d'indicateurs sont conformes RGAA 4 / WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La méthodologie de mesure de chaque indicateur (référentiel de calcul de la transition écologique, de l'égalité territoriale, de la qualité de service) est définie hors outil ; cette US se limite au rattachement, au suivi et à la consolidation des valeurs.
- L'intégration de ces indicateurs dans les documents réglementaires générés relève de US23.2.9.
- Les profils concernés sont Publique et État uniquement (cf. frontmatter) — pas de généralisation aux autres profils dans cette US.

## Notes d'implémentation
- "Triple bilan" (Dossier §7-B7) : les trois familles d'indicateurs (écologique, égalité territoriale, qualité de service) doivent être modélisées comme des indicateurs rattachables à un projet, consolidables en portefeuille sans dépendre du RAG/météo déjà existant (US23.2.4), qui reste centré avancement/santé.
- Backend `pivot-pilotage-core`, schéma `pilotage` ; frontend `pivot-pilotage-ui`.

---
Item Type: US · Parent: F23.2 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Low
Stage: ⬜
Rôle: macro:direction-pilotage
Source: PP-059 · MoSCoW: Could · Lot: Lot 4 · Origine: Bonus B7
Profils: Publique, État
Justification: Dossier §7-B7 : le 'triple bilan' du portefeuille public
Dépendances: —
