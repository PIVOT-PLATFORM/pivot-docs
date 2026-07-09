# US41.4.3 — Certification interne & communauté

**En tant que** responsable formation
**Je veux** délivrer une **certification interne** (utilisateur / référent) et animer une **communauté d'utilisateurs**
**Afin de** reconnaître les compétences et entretenir l'adoption dans la durée

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un parcours réussi (quiz/évaluation), when il est validé, then une certification interne (badge/attestation) est délivrée | ⬜ |
| Given la communauté, when un utilisateur y participe, then il accède aux échanges, bonnes pratiques et nouveautés | ⬜ |
| Error : given un quiz de certification échoué, when le résultat est communiqué, then l'utilisateur peut le retenter après un délai raisonnable, avec un retour sur les points à revoir (pas un simple échec sans suite) | ⬜ |
| Security : une attestation ne peut être délivrée qu'après validation réelle du quiz (score enregistré côté serveur) — pas de certification auto-déclarée par le front-end | ⬜ |

## Hors périmètre

- Certification externe/officielle reconnue hors de l'organisation — cette US couvre uniquement la reconnaissance interne au tenant

## Notes d'implémentation

- Le quiz de certification réutilise le moteur de scoring de Pivot Forms (E42, US42.2.2), cohérent avec le parcours e-learning (US41.3.2)

---
Item Type: US · Parent: F41.4 · Module: core · Phase: phase-3 · Size: S · Priority: Low
Stage: ⬜
Profils: Tous
Justification: Formation & onboarding — adoption de Pivot (in-app, supports, présentiel) ; cf. Insight I8 (réseau de référents)
Dépendances: EN41.1 (framework onboarding)
