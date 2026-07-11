# US42.2.3 — Champs masqués et pré-remplissage

**En tant que** concepteur de formulaire
**Je veux** définir des champs cachés et pré-remplir des champs visibles depuis un paramètre d'URL, une API ou une valeur déjà connue (recall)
**Afin de** contextualiser un formulaire (ex. campagne, projet, tenant) sans redemander une information déjà disponible

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un lien de formulaire portant un paramètre déclaré comme champ caché, when le répondant l'ouvre, then la valeur est capturée sans être visible ni modifiable par le répondant | ⬜ |
| Given un champ visible pré-rempli par API/recall, when le répondant l'ouvre, then la valeur est proposée et reste modifiable par le répondant sauf si le concepteur l'a explicitement verrouillée | ⬜ |
| Error : given un paramètre d'URL de pré-remplissage absent ou malformé, when le formulaire s'ouvre, then le champ correspondant reste vide (comportement standard), sans erreur bloquante affichée au répondant | ⬜ |
| Security : les champs cachés ne doivent jamais transporter de donnée sensible en clair dans une URL partageable (pas de PII en query string) — validé à la conception du formulaire | ⬜ |
| A11y : un champ visible verrouillé après pré-remplissage expose son état non modifiable aux technologies d'assistance (`aria-readonly`/`aria-disabled` selon le cas) et reste annoncé avec sa valeur au parcours clavier | ⬜ |

## Hors périmètre

- Enrichissement du pré-remplissage par appel à un service tiers en temps réel pendant la saisie — hors périmètre, seul l'appel à l'ouverture du formulaire est couvert

## Notes d'implémentation

- Le mécanisme de pré-remplissage s'appuie sur le même schéma de champ qu'EN42.1 ; cohérent avec le principe « pas de FK inter-modules » (ADR-006) — un ID de contexte transmis en paramètre reste un identifiant logique, pas une jointure

---
Item Type: US · Parent: F42.2 · Module: forms · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Source: FRM-103 · MoSCoW: Should · Origine: Typeform, Formbricks, Tally
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
