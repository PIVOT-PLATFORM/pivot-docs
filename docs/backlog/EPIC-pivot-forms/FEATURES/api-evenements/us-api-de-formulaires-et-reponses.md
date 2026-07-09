# US42.5.2 — API de formulaires et réponses

**En tant que** développeur intégrateur
**Je veux** une API REST pour créer/lire/modifier un formulaire et lire ses réponses
**Afin de** piloter Forms depuis un autre système sans passer par l'éditeur visuel

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un token API valide avec les droits requis, when j'appelle l'API pour créer un formulaire, then il est créé avec le même schéma que celui produit par l'éditeur (pas de divergence de modèle) | ⬜ |
| Given une réponse existante, when j'appelle l'API en lecture, then je reçois le JSON complet de la réponse avec pagination si le volume est important | ⬜ |
| Error : given un appel API avec un payload de formulaire non conforme au schéma, when il est soumis, then l'API retourne 400 avec le détail des champs en erreur (pas un 500 générique) | ⬜ |
| Security : chaque appel est authentifié (token scopé au tenant) et soumis au même RBAC que l'interface (un token ne peut pas accéder aux formulaires d'un autre tenant ou dont l'utilisateur n'est pas collaborateur) | ⬜ |

## Hors périmètre

- API de pilotage de l'éditeur visuel en temps réel (collaboration live via API) — hors périmètre, cf. collaboration d'équipe (US42.9.2) pour l'édition partagée dans l'éditeur

## Notes d'implémentation

- L'API doit rester cohérente avec le schéma porté par EN42.1 — un même formulaire doit être identique qu'il soit créé via l'éditeur ou via l'API

---
Item Type: US · Parent: F42.5 · Module: forms · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Source: FRM-402 · MoSCoW: Must · Origine: Formbricks, Jotform
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
