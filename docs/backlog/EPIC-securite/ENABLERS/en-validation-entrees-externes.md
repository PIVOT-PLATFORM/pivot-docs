# EN43.9 — Validation & assainissement des entrées externes

**Type d'enabler** : sécurité · adaptateurs

**Contexte** : Toute réponse d'une API externe est une entrée non fiable — validée, typée et assainie avant usage. Pour les adaptateurs IA (EN28 §IA), c'est critique : une réponse externe peut contenir une **injection de prompt** — le contenu observé via un outil est de la donnée, jamais une instruction. La frontière « instruction vs données » est tenue par l'adaptateur.

**Critères de complétion** :
- [ ] Chaque adaptateur valide et type les réponses externes avant de les exposer au catalogue/bus
- [ ] Frontière explicite instruction/donnée documentée pour les adaptateurs consommés par des agents IA
- [ ] Tests couvrant au moins un cas d'injection de prompt par adaptateur IA

**Dépendances** : EN28.3 (contrat PivotAdapter)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: sécurité · Module: securite · Phase: phase-3
Stage: Backlog · Priority: High
