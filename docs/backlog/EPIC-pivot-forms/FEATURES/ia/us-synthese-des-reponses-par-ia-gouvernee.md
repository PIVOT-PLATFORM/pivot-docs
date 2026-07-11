# US42.6.2 — Synthèse des réponses par IA (gouvernée)

**En tant que** Product Owner
**Je veux** obtenir une synthèse thématique des réponses, y compris des verbatims en texte libre
**Afin de** dégager les tendances d'une enquête à fort volume de réponses sans les lire une à une

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un formulaire avec un volume significatif de réponses en texte libre, when je lance la synthèse, then les thèmes récurrents et des verbatims représentatifs s'affichent, avec un lien vers chaque réponse source citée | ⬜ |
| Given une synthèse produite, when je la consulte, then elle est marquée explicitement comme générée par IA et reste à valider avant tout usage externe (rapport, décision) | ⬜ |
| Error : given un volume de réponses trop faible pour dégager des thèmes fiables, when la synthèse est demandée, then l'outil l'indique plutôt que de forcer une synthèse peu fiable présentée comme certaine | ⬜ |
| Gouvernance IA : humain dans la boucle (validation avant diffusion), traçabilité (verbatims sourcés, pas de synthèse non attribuable), non-entraînement sur les réponses du tenant, localisation du traitement (principe « IA minimale » PIVOT) | ⬜ |

## Hors périmètre

- Synthèse cross-formulaires (agrégation de plusieurs enquêtes différentes) — hors périmètre, une synthèse porte sur un seul formulaire
- Analyse de sentiment utilisée pour une décision automatisée (ex. score RH individuel) — exclue par principe de gouvernance IA

## Notes d'implémentation

- Les réponses classifiées sensibles (cf. US42.7.1) doivent pouvoir exclure explicitement la synthèse IA au niveau du formulaire, pas seulement au niveau du tenant

---
Item Type: US · Parent: F42.6 · Module: forms · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Rôle: product-owner
Source: FRM-502 · MoSCoW: Could · Origine: Formbricks (privacy-first AI)
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
