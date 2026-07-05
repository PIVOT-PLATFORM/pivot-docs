# US42.7.4 — Anti-spam & intégrité

**En tant que** DSI
**Je veux** filtrer les soumissions frauduleuses (bots/spam) sur les liens publics et tracer chaque modification du formulaire
**Afin de** garantir que les réponses collectées et le formulaire lui-même sont dignes de confiance

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un lien de formulaire public, when une soumission automatisée (bot) est détectée (honeypot, rate-limit, challenge), then elle est rejetée sans être comptabilisée dans les réponses | ⬜ |
| Given une modification du formulaire (ajout/suppression de champ, changement de règle), when elle est enregistrée, then elle apparaît dans un journal avec auteur, date et nature du changement | ⬜ |
| Error : given un pic de soumissions légitimes ressemblant à un pattern de spam (ex. campagne virale), when le filtrage anti-bot se déclenche, then les faux positifs restent limités par un réglage de sensibilité ajustable, pas un blocage binaire non configurable | ⬜ |
| Security : les réponses sont chiffrées au repos ; le journal des modifications est lui-même immuable (append-only), pas modifiable a posteriori par un administrateur du formulaire | ⬜ |

## Hors périmètre

- Modération de contenu sémantique des réponses (langage inapproprié, désinformation) — hors périmètre, cf. Hors périmètre de la validation des saisies (US42.1.3)

## Notes d'implémentation

- Le journal des modifications du formulaire est distinct du journal de purge (US42.7.3) — l'un trace les changements de structure, l'autre les cycles de vie des réponses

---
Item Type: US · Parent: F42.7 · Module: forms · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Source: FRM-704 · MoSCoW: Should · Origine: Jotform, Qualtrics
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
