# EN43.9 — Validation & assainissement des entrées externes

**Type d'enabler** : sécurité · adaptateurs

**Objectif technique** : Toute réponse d'une API externe est traitée comme une entrée non fiable — validée, typée et assainie avant usage. Pour les adaptateurs IA (EN28 §IA), l'adaptateur tient explicitement la frontière « instruction vs données » : le contenu observé via un outil est de la donnée, jamais une instruction.

**Justification** : Une réponse externe non validée est un vecteur d'injection classique ; pour un adaptateur IA, c'est en plus une injection de prompt — un contenu tiers qui se fait passer pour une instruction de l'agent. Sans cette frontière explicite tenue par l'adaptateur, chaque nouvel adaptateur OSS agentique (E28/E29) rouvre la même faille.

**Critères de complétion** :
- [ ] Chaque adaptateur valide et type les réponses externes avant de les exposer au catalogue/bus
- [ ] Frontière explicite instruction/donnée documentée pour les adaptateurs consommés par des agents IA
- [ ] Tests couvrant au moins un cas d'injection de prompt par adaptateur IA

**Dépendances** : EN28.3 (contrat PivotAdapter)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: sécurité · Module: securite · Phase: phase-3 · Size: M
Stage: Backlog · Priority: High
