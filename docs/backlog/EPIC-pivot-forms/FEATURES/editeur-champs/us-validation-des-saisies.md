# US42.1.3 — Validation des saisies

**En tant que** concepteur de formulaire
**Je veux** définir des règles de validation par champ (obligatoire, format e-mail/nombre/regex, bornes min-max, message d'erreur personnalisé)
**Afin de** garantir la qualité des réponses collectées avant même leur soumission

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un champ marqué obligatoire ou contraint par un format/une borne, when le répondant soumet une valeur non conforme, then la soumission est bloquée et le message d'erreur configuré par le concepteur s'affiche au niveau du champ | ⬜ |
| Given une règle regex invalide saisie par le concepteur (ex. expression non compilable), when il tente de l'enregistrer, then l'éditeur refuse et explique l'erreur de syntaxe | ⬜ |
| Error : given un formulaire sans aucun message d'erreur personnalisé sur un champ contraint, when une saisie invalide est soumise, then un message par défaut générique et compréhensible s'affiche (jamais de champ vide ni d'erreur technique brute) | ⬜ |
| Security : la validation de format/bornes est appliquée côté serveur en plus du client (une requête API directe ne peut pas contourner les règles) | ⬜ |
| A11y : le message d'erreur est associé au champ via `aria-describedby` et annoncé par le lecteur d'écran au moment de l'échec | ⬜ |

## Hors périmètre

- Validation croisée entre plusieurs champs (ex. date de fin > date de début) — relève de la logique conditionnelle (US42.2.1), pas de la validation champ par champ
- Détection sémantique de contenu (ex. langage inapproprié) — hors périmètre, cf. anti-spam (US42.7.4) pour la modération

## Notes d'implémentation

- Les règles de validation font partie du schéma de champ porté par EN42.1 ; la validation serveur doit rejouer exactement les mêmes règles que le client pour éviter toute divergence

---
Item Type: US · Parent: F42.1 · Module: forms · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Source: FRM-003 · MoSCoW: Must · Origine: Socle 6/6
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
