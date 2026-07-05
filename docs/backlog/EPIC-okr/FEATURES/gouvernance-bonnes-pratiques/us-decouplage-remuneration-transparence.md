# US27.10.1 — Découplage rémunération & transparence

**En tant que** DSI
**Je veux** **découpler les OKR de l'évaluation/rémunération** et rendre les OKR **transparents par défaut**, avec des garde-fous anti-patterns
**Afin de** préserver l'ambition (pas de sandbagging) et la confiance, conformément à la doctrine Doerr

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un OKR, when il est exploité, then il **n'est pas** utilisé comme critère automatique d'évaluation/rémunération individuelle (séparation documentée) | ⬜ |
| Given les OKR d'un cycle, when la transparence est activée, then ils sont visibles dans l'organisation par défaut (sauf OKR marqués confidentiels) | ⬜ |
| Given des anti-patterns (OKR = to-do list, > 5 O/KR, sandbagging), when détectés, then un garde-fou/alerte pédagogique est affiché | ⬜ |

---
Item Type: US · Parent: F27.10 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Rôle: directeur-des-systemes-d-information
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
