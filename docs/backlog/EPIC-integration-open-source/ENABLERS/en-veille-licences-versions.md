# EN28.13 — Veille licences & versions

**Type d'enabler** : gouvernance · sécurité

**Contexte** : Automatiser la veille sur les versions et licences des outils tiers intégrés (Renovate/Dependabot), y compris le cas d'un changement de licence d'un outil déjà intégré. Distinct d'EN05.5 (Dependabot sur les dépendances propres de PIVOT) : ici la cible est le parc d'outils adaptés (OpenProject, Plane, n8n…), pas les librairies de `pivot-core`/`pivot-ui`.

**Critères de complétion** :
- [ ] Renovate/Dependabot configuré sur le suivi des versions amont des outils adaptés
- [ ] Alerte de dérive amont (nouvelle version majeure)
- [ ] Alerte en cas de changement de licence d'un outil déjà intégré

**Dépendances** : EN28.9 (ADR-009, règle de licences)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E28 · Type: gouvernance · Module: gouvernance · Phase: phase-3
Stage: Backlog · Priority: Medium
Rôle: responsable-de-la-securite-si
