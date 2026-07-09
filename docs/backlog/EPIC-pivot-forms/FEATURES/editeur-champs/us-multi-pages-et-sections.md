# US42.1.4 — Multi-pages et sections

**En tant que** concepteur de formulaire
**Je veux** découper un formulaire long en plusieurs pages/sections, avec une barre de progression visible du répondant
**Afin de** réduire la charge cognitive et l'abandon sur les formulaires à beaucoup de champs

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un formulaire à plusieurs pages, when le répondant navigue entre pages (suivant/précédent), then la progression s'affiche et les réponses déjà saisies sont conservées | ⬜ |
| Given une page contenant des champs obligatoires non remplis, when le répondant tente de passer à la page suivante, then la navigation est bloquée et les champs en cause sont mis en évidence | ⬜ |
| Error : given une navigation directe par URL vers une page non atteignable dans l'ordre normal (ex. saut de logique conditionnelle non satisfaite), when elle est tentée, then le répondant est ramené à la page valide la plus proche | ⬜ |
| Security : l'état d'avancement (page courante, réponses saisies) est rattaché à la session du répondant, jamais accessible en modifiant un identifiant dans l'URL | ⬜ |
| A11y : la barre de progression annonce l'étape courante et le total au lecteur d'écran (ex. « Page 2 sur 4 ») | ⬜ |

## Hors périmètre

- Réordonnancement dynamique des pages en fonction des réponses (au-delà des sauts conditionnels déjà couverts par US42.2.1) — hors périmètre

## Notes d'implémentation

- S'appuie sur le mécanisme de réponses partielles (US42.4.3) pour la persistance de la progression entre pages, y compris en cas de fermeture accidentelle de l'onglet

---
Item Type: US · Parent: F42.1 · Module: forms · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Source: FRM-004 · MoSCoW: Must · Origine: Jotform, Tally, Google
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
