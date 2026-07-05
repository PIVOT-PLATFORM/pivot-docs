# US42.5.3 — Serveur MCP

**En tant que** développeur intégrateur
**Je veux** exposer les formulaires et leurs réponses comme outils MCP consommables par un assistant IA
**Afin de** permettre à un agent (ex. Claude Code, assistant interne) de créer ou consulter des formulaires sans passer par une intégration API dédiée

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un serveur MCP Forms configuré, when un assistant IA autorisé s'y connecte, then il peut lister les formulaires accessibles et lire leurs réponses via les outils exposés | ⬜ |
| Given une demande de création de formulaire via MCP, when elle est exécutée, then le formulaire créé respecte le même schéma et les mêmes contraintes que via l'éditeur ou l'API REST | ⬜ |
| Error : given une action MCP demandée sur un formulaire hors du périmètre autorisé de l'assistant, when elle est tentée, then elle est refusée explicitement (pas d'exécution partielle silencieuse) | ⬜ |
| Security : gouvernance IA — l'assistant agit avec les droits explicitement délégués par un utilisateur authentifié (pas de compte de service à privilèges larges), chaque action MCP est tracée et attribuable | ⬜ |

## Hors périmètre

- Génération de contenu de formulaire par IA à partir d'une description en langage naturel — couverte séparément par US42.6.1 ; le serveur MCP est le canal d'exposition, pas le moteur de génération

## Notes d'implémentation

- S'appuie sur l'API de formulaires et réponses (US42.5.2) comme couche sous-jacente — le serveur MCP est une exposition supplémentaire, pas une réimplémentation de la logique métier

---
Item Type: US · Parent: F42.5 · Module: forms · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Source: FRM-403 · MoSCoW: Should · Origine: Tally, Formbricks, Jotform
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
