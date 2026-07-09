# EN28.3 — Contrat d'intégration PivotAdapter

**Type d'enabler** : plateforme · contrat

**Contexte** : Interface commune (ADR-009 §4) à six capacités — identité, entités, événements, santé, liens profonds, thème. C'est le même contrat, que la brique candidate se traduise en adaptateur ou reste native (cf. EN28.7). Étendu d'un socle de sécurité par la checklist d'admission de module (E43 — Sécurité & Zero Trust, EN43.13) : un module qui ne la satisfait pas reste en mode Lien.

**Critères de complétion** :
- [ ] Interface `PivotAdapter` définie et publiée (identité, entités, événements, santé, liens profonds, thème)
- [ ] Suite de tests de contrat automatisée
- [ ] Un adaptateur conforme passe la suite de tests de contrat

**Extension prévue (benchmark plateforme développeur, `pivot-benchmarks/plateforme-developpeur/dossier-synthese-plateforme-developpeur.md` §8.2, pivot-benchmarks#1)** : F28.11 (scorecards, scaffolding self-service, TechDocs) réutilise ce contrat comme socle plutôt que d'en créer un parallèle, cohérent avec le principe ADR-009 « même contrat, que la brique soit adaptateur ou native ».

**Dépendances** : EN28.2 (catalogue d'entités étendu)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E28 · Type: plateforme · Module: socle · Phase: phase-3
Stage: ⬜ · Priority: Highest
