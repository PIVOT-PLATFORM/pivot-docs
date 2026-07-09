# US27.4.2 — Statut & tendance (ON_TRACK / AT_RISK / OFF_TRACK)

**En tant que** responsable pilotage
**Je veux** obtenir un **statut** (ON_TRACK · AT_RISK · OFF_TRACK · DONE) et une **tendance**, calculés par l'écart entre avancement réel et **rythme attendu**
**Afin de** détecter tôt les OKR qui dérapent

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'avancement d'un KR et le temps écoulé du cycle, when le statut se calcule, then il compare l'avancement au **pace attendu** (proratisé) → ON_TRACK / AT_RISK / OFF_TRACK | ⬜ |
| Given plusieurs check-ins, when j'affiche la tendance, then l'évolution (amélioration/dégradation) est visible | ⬜ |
| Given confiance basse + avancement en retard, then l'OKR est signalé prioritairement dans la liste « à risque » | ⬜ |
| Error : given un OKR sans aucun check-in enregistré, when le statut se calcule, then un statut neutre par défaut est retourné (pas d'erreur, pas de division par zéro sur le pace attendu) | ⬜ |
| Security : given la liste « à risque », when un utilisateur la consulte, then elle n'expose que les OKR visibles dans son périmètre (tenant/équipe) et respecte la confidentialité des OKR individuels (cf. US27.10.2) | ⬜ |
| A11y : le statut (ON_TRACK/AT_RISK/OFF_TRACK) et la tendance ne sont pas véhiculés uniquement par la couleur (icône/texte associé), conformément WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La saisie du check-in (valeur, confiance, commentaire) elle-même (cf. US27.4.1) — cette US ne fait que calculer/afficher à partir des check-ins existants
- L'envoi de rappels liés à un statut dégradé (cf. US27.4.3)
- Le scoring final 0.0–1.0 de fin de cycle et le grading (cf. F27.5)

## Notes d'implémentation
- Calcul porté par le moteur EN27.1 (statut ON_TRACK/AT_RISK/OFF_TRACK/DONE via pace attendu) ; cette US expose ce calcul en lecture (dashboard, liste à risque) à partir des `CheckIn` historisés (US27.4.1).
- Le pace attendu se déduit de la position temporelle dans le `Cycle` (proratisation linéaire par défaut) comparée à l'avancement réel du `KeyResult`.
- La priorisation de la liste « à risque » doit combiner deux signaux indépendants (retard d'avancement ET confiance déclarée basse), pas seulement l'un des deux.

---
Item Type: US · Parent: F27.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Profils: Tous
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: US27.4.1
