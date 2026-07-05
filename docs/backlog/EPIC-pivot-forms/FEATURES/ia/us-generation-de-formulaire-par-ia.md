# US42.6.1 — Génération de formulaire par IA

**En tant que** concepteur de formulaire
**Je veux** décrire mon besoin en langage naturel et obtenir un premier brouillon de formulaire généré
**Afin de** partir d'une base éditable plutôt que d'un formulaire vide

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une description en langage naturel du besoin, when je lance la génération, then un formulaire brouillon (champs, types, libellés) s'ouvre dans l'éditeur, entièrement modifiable avant publication | ⬜ |
| Given un formulaire généré, when je le consulte, then rien n'est publié automatiquement — la génération produit un brouillon, jamais un formulaire live sans validation humaine | ⬜ |
| Error : given une description trop vague ou hors périmètre (ex. sans rapport avec un formulaire de collecte), when la génération est lancée, then l'IA signale l'ambiguïté et demande une reformulation plutôt que de produire un formulaire non pertinent | ⬜ |
| Gouvernance IA : humain dans la boucle (validation obligatoire avant publication), traçabilité de la génération (prompt et modèle utilisés conservés), non-entraînement sur les données du tenant, localisation du traitement (principe « IA minimale » PIVOT) | ⬜ |

## Hors périmètre

- Génération de la logique conditionnelle ou du scoring à partir du langage naturel — la génération initiale couvre champs/types/libellés, la logique reste configurée manuellement (US42.2.1, US42.2.2)
- Modification en langage naturel d'un formulaire existant (« ajoute un champ email ») — hors périmètre de cette itération, qui couvre la création initiale

## Notes d'implémentation

- Le brouillon généré doit produire le même schéma que EN42.1, pas un format intermédiaire propre à l'IA à reconvertir

---
Item Type: US · Parent: F42.6 · Module: forms · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Source: FRM-501 · MoSCoW: Should · Origine: Standard 2026 (Typeform, Jotform, Tally...)
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
