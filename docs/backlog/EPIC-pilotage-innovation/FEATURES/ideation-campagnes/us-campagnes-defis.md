# US38.2.2 — Campagnes / défis d'innovation

**En tant que** responsable innovation
**Je veux** lancer des **campagnes/défis** thématiques (question, périmètre, échéance, récompense)
**Afin de** orienter l'idéation vers les priorités stratégiques

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un axe stratégique, when je lance une campagne, then thème, consignes, dates et critères sont publiés aux participants ciblés | ⬜ |
| Given une campagne, when elle se clôt, then les idées reçues passent en évaluation (F38.4) | ⬜ |
| Error : given une campagne avec une date de clôture antérieure à la date de lancement, when je tente de la publier, then la publication est refusée avec message explicite | ⬜ |
| Security : seul un rôle habilité (responsable innovation) peut créer/publier/clôturer une campagne ; le ciblage des participants respecte les périmètres d'accès existants (équipe, organisation) sans exposer la campagne hors de sa cible | ⬜ |
| A11y : les écrans de création de campagne et de consultation par les participants ciblés sont utilisables au clavier et compatibles lecteur d'écran (WCAG 2.1 AA) | ⬜ |

## Hors périmètre
- La capture et l'enrichissement des idées elles-mêmes (US38.2.1) — cette US ne couvre que le cadrage et le cycle de vie de la campagne
- Le vote communautaire sur les idées reçues pendant la campagne (US38.2.3)
- L'évaluation multicritère des idées reçues à la clôture (F38.4) — cette US se contente de déclencher le passage en évaluation

## Notes d'implémentation
- La campagne (`Campaign` dans EN38.1) se rattache à un `AxeStrategique` existant (US38.1.1) ; elle ne peut pas exister sans axe stratégique associé
- La clôture de campagne déclenche le passage des idées reçues en évaluation (F38.4) via le moteur SMI — pas un simple changement de statut visuel, mais un point d'intégration explicite avec la Feature évaluation
- Le ciblage des participants (« diffusée aux participants ciblés ») réutilise le modèle d'équipes/organisation existant, sans introduire de nouveau système de permissions ad hoc

---
Item Type: US · Parent: F38.2 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 (modèle SMI & moteur)
