# US42.2.5 — Multilingue

**En tant que** concepteur de formulaire
**Je veux** décliner un même formulaire en plusieurs langues (FR/EN a minima), avec assistance à la traduction
**Afin de** collecter des réponses fiables auprès de répondants non francophones sans dupliquer le formulaire

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un formulaire disposant d'une traduction EN, when un répondant l'ouvre avec une préférence de langue EN, then le formulaire s'affiche en anglais (libellés, messages d'erreur, options de champs) | ⬜ |
| Given un champ ajouté après une traduction déjà réalisée, when le concepteur consulte les langues du formulaire, then le champ manquant en traduction est signalé (pas de silence sur un texte non traduit) | ⬜ |
| Error : given une langue demandée par le répondant non disponible pour ce formulaire, when il l'ouvre, then il reçoit la langue par défaut du formulaire plutôt qu'un formulaire cassé ou vide | ⬜ |

## Hors périmètre

- Traduction automatique par IA des réponses libres du répondant — hors périmètre (cf. synthèse IA gouvernée, US42.6.2, qui reste distincte)
- Détection automatique de la langue du répondant au-delà des préférences navigateur/tenant déjà supportées par le portail — hors périmètre

## Notes d'implémentation

- La « traduction assistée » ne signifie pas une génération IA non supervisée des libellés — reste un texte proposé, validé par le concepteur avant publication (cohérent avec le principe IA minimale de PIVOT)

---
Item Type: US · Parent: F42.2 · Module: forms · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Source: FRM-105 · MoSCoW: Could · Origine: Formbricks (AI), Qualtrics
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
