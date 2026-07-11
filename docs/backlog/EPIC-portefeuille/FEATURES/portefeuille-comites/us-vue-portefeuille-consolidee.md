# US23.2.1 — Vue portefeuille consolidée

**En tant que** direction
**Je veux** une vision 360° multi-projets (santé, avancement, phases, jalons et dates clés) avec drill-down
**Afin de** piloter le portefeuille et descendre au détail d'un projet quand nécessaire

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un ensemble de projets, when la direction consulte le portefeuille, then santé, avancement, phases, jalons et dates clés sont consolidés (lecture `plan macro multi-projets`, cf. EN22.1 §e) | ⬜ |
| Given un indicateur consolidé (santé, jalon, avancement), when l'utilisateur active le drill-down, then il navigue vers le détail du projet correspondant (fiche projet existante, module Roadmap E22) sans duplication de contenu | ⬜ |
| Error : given un projet sans indicateur de santé, system le signale comme « non renseigné » (état explicite) plutôt que de l'omettre ou d'afficher une valeur par défaut trompeuse | ⬜ |
| Security : seuls les projets des équipes du tenant de l'utilisateur authentifié apparaissent dans la vue consolidée (isolation multi-tenant, filtrage par `public.teams.id`) | ⬜ |
| Security : given un drill-down (ou un accès direct) vers un projet appartenant à un autre tenant, system retourne 404 (non-divulgation d'existence, jamais 403 exposant la ressource — cf. EN22.1 §Sécurité) | ⬜ |
| Security : given un utilisateur authentifié sans droit de lecture sur un projet de son propre tenant, system retourne 403 | ⬜ |
| A11y : la vue consolidée est conforme RGAA 4 / WCAG 2.1 AA ; les indicateurs de santé/météo ne sont pas restitués uniquement par la couleur (icône/texte associé) | ⬜ |

## Hors périmètre
- La personnalisation de la vue (choix des indicateurs affichés) relève de US23.2.2 (tableaux de bord personnalisables).
- Le calcul détaillé de l'indicateur de santé/météo est défini par US23.2.4 ; cette US consomme l'indicateur, elle ne le calcule pas.
- L'édition des données projet depuis la vue consolidée n'est pas couverte — le drill-down est en lecture, la modification se fait sur la fiche projet.

## Notes d'implémentation
- Vue de synthèse consommant les projets rattachés aux équipes (FK `public.teams.id`) du tenant courant.
- Le drill-down navigue vers la fiche projet existante (module Roadmap, E22) sans dupliquer son contenu.
- Frontend `pivot-pilotage-ui`, consomme `@pivot/ui-core` + `@pivot/design-system`.

---
Item Type: US · Parent: F23.2 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Rôle: macro:direction-pilotage
Source: PP-004 · MoSCoW: Must · Lot: Lot 1 · Origine: Socle 3/3
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Dossier §4
Dépendances: —
