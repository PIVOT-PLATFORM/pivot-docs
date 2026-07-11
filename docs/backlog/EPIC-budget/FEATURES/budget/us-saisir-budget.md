# US26.1.1 — Saisir le budget d'un projet

**En tant que** chef de projet
**Je veux** saisir le budget alloué à un projet par poste de dépense
**Afin de** suivre la consommation budgétaire tout au long du projet

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet existant, when le chef de projet saisit un budget avec ses postes (humain, matériel, prestation, autre), then le budget est créé via `POST /api/pilotage/roadmap/projects/{id}/budget` et le total affiché est égal à la somme des postes | ⬜ |
| Error : given un poste de dépense avec un montant négatif ou non numérique, system retourne 400 et ne crée aucun budget | ⬜ |
| Security : seul le chef de projet (ou rôle admin) affecté au projet peut créer/modifier le budget ; tout autre utilisateur (y compris lecture seule sur le projet) reçoit 403 | ⬜ |
| A11y : le formulaire de saisie des postes (labels associés aux champs, messages d'erreur annoncés, navigation clavier complète) est conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Suivi de la consommation réelle vs prévue (couvert par US26.1.2)
- Gestion multi-devises avancée (conversion, taux de change) — seule la devise du tenant s'applique
- Révision/versionnage du budget après création initiale (pas de workflow d'approbation)

## Notes d'implémentation
- Postes de dépense fixes à ce stade : humain, matériel, prestation, autre (pas de postes personnalisables)
- Devise configurable au niveau tenant (EUR par défaut), portée par `TenantContext`
- `tenantId` extrait du `TenantContext`, jamais du payload client
- Dépend de US22.1.1 (entité Project) — le budget est rattaché à un `projectId` existant

---
Item Type: US · Parent: F26.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Dépendances: US22.1.1
