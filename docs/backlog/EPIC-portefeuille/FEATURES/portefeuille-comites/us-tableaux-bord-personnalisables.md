# US23.2.2 — Tableaux de bord personnalisables

**En tant que** PMO
**Je veux** des tableaux de bord synthétiques et détaillés par profil, avec alertes sur les points de tension
**Afin d'** offrir à chaque profil la vue adaptée et remonter les signaux à surveiller

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un profil et un layout personnalisé persisté, when l'utilisateur ouvre son tableau de bord, then une vue synthétique ou détaillée adaptée au profil s'affiche avec ses widgets configurés | ⬜ |
| Given des indicateurs source (avancement, météo) en état de tension (retard, dépassement, surcharge), when le tableau de bord est rendu, then des alertes correspondantes sont déclenchées et affichées sur les widgets concernés | ⬜ |
| Given une modification du layout (ajout/retrait de widget, disposition), when l'utilisateur enregistre, then la configuration est persistée par utilisateur dans le schéma `pilotage` et rechargée à la prochaine ouverture | ⬜ |
| Error : given un indicateur sans données, system l'affiche comme « indisponible » (état explicite) plutôt que vide ou nul | ⬜ |
| Error : given une configuration de widget invalide (widget inconnu, disposition hors bornes) à l'enregistrement, system retourne 400 avec message explicite et ne persiste pas | ⬜ |
| Security : la personnalisation d'un tableau de bord (widgets, alertes) est propre à l'utilisateur et n'est visible/modifiable que par lui ; given un accès à la configuration d'un autre utilisateur, system retourne 404 (non-divulgation) | ⬜ |
| Security : seuls les indicateurs des projets des équipes du tenant de l'utilisateur authentifié alimentent le tableau de bord (isolation multi-tenant, `public.teams.id`) | ⬜ |
| A11y : les tableaux de bord sont conformes RGAA 4 / WCAG 2.1 AA ; les alertes ne sont pas restituées uniquement par la couleur (icône/texte associé) et sont annoncées par lecteur d'écran | ⬜ |

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
