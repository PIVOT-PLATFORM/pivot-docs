# US23.2.2 — Tableaux de bord personnalisables

**En tant que** PMO
**Je veux** des tableaux de bord synthétiques et détaillés par profil, avec alertes sur les points de tension
**Afin d'** offrir à chaque profil la vue adaptée et remonter les signaux à surveiller

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un profil, when l'utilisateur ouvre son tableau de bord, then une vue synthétique ou détaillée adaptée au profil s'affiche | ⬜ |
| Des alertes sont déclenchées et affichées sur les points de tension (retard, dépassement, surcharge) | ⬜ |
| Error : given un indicateur sans données, system l'affiche comme indisponible plutôt que vide | ⬜ |
| Security : la personnalisation d'un tableau de bord (widgets, alertes) est propre à l'utilisateur et n'est visible/modifiable que par lui (ou son rôle) | ⬜ |
| A11y : les tableaux de bord sont conformes RGAA 4 / WCAG 2.1 AA (alertes non uniquement couleur) | ⬜ |

## Hors périmètre
- La définition des seuils métier déclenchant une alerte (retard, dépassement, surcharge) est traitée au niveau du calcul source (US23.2.4 météo), pas dans cette US qui se limite à l'affichage/personnalisation.
- Le partage de tableaux de bord entre utilisateurs n'est pas couvert.
- La création de rapports exportables à partir du tableau de bord relève de US23.1.2.

## Notes d'implémentation
- Personnalisation par profil : la configuration du layout (widgets sélectionnés, disposition) est persistée par utilisateur dans le schéma `pilotage`.
- Les alertes s'appuient sur les indicateurs déjà calculés par les autres US du portefeuille (avancement, météo) — pas de nouveau moteur de calcul ici.
- Frontend `pivot-pilotage-ui`, consomme `@pivot/ui-core` + `@pivot/design-system`.

---
Item Type: US · Parent: F23.2 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Rôle: officier-responsable-pmo
Source: PP-006 · MoSCoW: Must · Lot: Lot 1 · Origine: Socle 3/3
Profils: Tous
Justification: Dossier §4
Dépendances: —
