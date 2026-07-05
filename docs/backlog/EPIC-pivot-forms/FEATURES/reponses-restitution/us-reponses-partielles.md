# US42.4.3 — Réponses partielles

**En tant que** répondant
**Je veux** que ma saisie en cours soit sauvegardée automatiquement et reprenable si je quitte le formulaire avant la fin
**Afin de** ne pas perdre mes réponses en cas de fermeture accidentelle ou d'interruption

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une saisie en cours sur un formulaire multi-pages, when je ferme l'onglet et rouvre le même lien, then mes réponses déjà saisies sont restaurées | ⬜ |
| Given un formulaire terminé et soumis, when je rouvre le lien, then il n'y a pas de proposition de reprise (la soumission finale est définitive, pas de confusion avec un brouillon) | ⬜ |
| Error : given une réponse partielle expirée (au-delà d'une durée de rétention de brouillon), when le répondant tente de la reprendre, then le formulaire redémarre proprement à vide plutôt que d'afficher une erreur | ⬜ |
| Security : une réponse partielle n'est reprenable que depuis le même lien/contexte (cookie de session ou token de reprise), jamais devinable ou accessible par un tiers | ⬜ |

## Hors périmètre

- Édition d'une réponse déjà soumise définitivement — hors périmètre (relève d'un futur droit de rectification RGPD, pas de la reprise de brouillon)

## Notes d'implémentation

- La durée de rétention des brouillons doit être cohérente avec la politique de rétention générale (US42.7.3) — pas un mécanisme de conservation séparé et sans limite

---
Item Type: US · Parent: F42.4 · Module: forms · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Source: FRM-304 · MoSCoW: Should · Origine: Formbricks, Typeform
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
