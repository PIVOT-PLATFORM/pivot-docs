# EN42.1 — Moteur & schéma de formulaire

**Type d'enabler** : architecture

**Objectif technique** : Le cœur du form-builder — modèle et moteurs réutilisables :
- **Schéma de formulaire** (champs typés, validation, multi-pages/sections, i18n) et **schéma de réponse**.
- **Moteur de logique conditionnelle** (affichage/masquage, branchements, sauts) + **calculs/scoring** (quiz).
- **Pré-remplissage** (URL/API, hidden fields, recall) et **réponses partielles** (reprise).
- **Thème** : consommation des tokens `--pv-*` du design-system (capacité « Thème » du contrat d'intégration).
- **Événements & API** : `form.submitted` au **bus PIVOT** (FRM-404), **webhooks** (FRM-401), **API** (FRM-402), **MCP** (FRM-403).

**Justification** : socle commun consommé par les autres modules (dont le SMI E38 F38.15) ; l'orchestration aval (tâche/risque/contrat) est portée par le **bus** et le module **Workflow (E29)**, pas par Forms.

**Critères de complétion** :
- [ ] Schéma formulaire/réponse (types, validation, multi-pages, i18n) + thème `--pv-*`
- [ ] Moteur logique conditionnelle + calculs/scoring
- [ ] Pré-remplissage, réponses partielles, hidden fields/recall
- [ ] `form.submitted` au bus PIVOT + webhooks / API / MCP

---
Item Type: Enabler · Parent: E42 · Module: forms · Phase: phase-3 · Size: XL · Priority: Critical
Stage: ⬜
Justification: Moteur commun du form-builder (schéma, logique, scoring, thème, événements)
Dépendances: E03 Système de modules · E17 Infrastructure multi-repo · bus PIVOT (ADR-025, implémentation EN28.4 ⬜)
