# US37.1.3 — Segmentation des licences

**En tant que** acheteur
**Je veux** des profils différenciés (consultation / contribution terrain / pilotage / PMO) avec une tarification adaptée et un coût complet simulé par population
**Afin de** maîtriser le TCO et éviter l'empilement tarifaire documenté

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des populations d'utilisateurs, when l'acheteur configure les profils, then consultation, contribution terrain, pilotage et PMO ont une tarification distincte | ⬜ |
| Le coût complet est simulable par population d'utilisateurs | ⬜ |
| Error : given une simulation sans effectif renseigné pour une population, system la signale comme incomplète | ⬜ |
| Security/Gouvernance : l'attribution des profils est tracée et respecte les périmètres | ⬜ |
| A11y : le configurateur de profils et le simulateur de coût sont utilisables au clavier et conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La grille tarifaire précise associée à chaque profil (montants) relève d'une décision commerciale, pas d'un calcul applicatif figé dans cette US.
- Le paiement/la facturation effective liée aux profils n'est pas couvert (simulation de coût uniquement, pas de tunnel de facturation).
- L'offre d'entrée basique gratuite est traitée par US37.1.4 ; cette US couvre la segmentation des profils payants au-delà du niveau basique.

## Notes d'implémentation
- Les profils (consultation / contribution terrain / pilotage / PMO) doivent s'appuyer sur le modèle de rôles/permissions existant du module pilotage plutôt qu'introduire un système de droits parallèle.
- Le simulateur de coût complet par population nécessite de connaître l'effectif par profil : la validation d'entrée doit bloquer/signaler une population sans effectif renseigné avant de produire un résultat.
- L'attribution de profil à un utilisateur doit être tracée (audit) et rattachée à l'organisation (FK `public.teams.id`) pour respecter l'isolation multi-tenant.
- Frontend `pivot-pilotage-ui` pour le configurateur de profils et le simulateur, consommant `@pivot/ui-core` + `@pivot/design-system`.

---
Item Type: US · Parent: F37.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Source: PP-034 · MoSCoW: Must · Lot: Lot 1 · Origine: Insight I8
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Dossier §8-I8 : empilement MS ~60-70 $/util. documenté
Dépendances: —
