# US27.5.3 — Rétrospective OKR (learnings)

**En tant que** responsable pilotage
**Je veux** mener une **rétrospective** d'OKR (ce qui a marché, learnings, à reconduire/abandonner)
**Afin de** améliorer la démarche cycle après cycle (au-delà du seul score)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un cycle clôturé, when j'ouvre la rétrospective, then je capture learnings et décisions (reconduire, abandonner, reformuler) | ⬜ |
| Given une décision de reconduction, when je l'applique, then l'OKR est reporté au cycle suivant (cf. US27.2.2) | ⬜ |
| Error : given un cycle non encore clôturé, when j'essaie d'ouvrir sa rétrospective, then l'action est refusée avec un message explicite (la rétrospective suit la clôture, cf. US27.5.2) | ⬜ |
| Security : seuls l'owner de l'OKR et les rôles habilités (manager, PMO) peuvent saisir/modifier les learnings et décisions de rétrospective d'un OKR donné | ⬜ |
| A11y : le formulaire de capture des learnings et des décisions (reconduire/abandonner/reformuler) est utilisable au clavier avec libellés explicites | ⬜ |

## Hors périmètre
- Le déclenchement de la clôture de cycle et le figeage des scores — couverts par US27.5.2 (prérequis)
- Le report technique de l'OKR au cycle suivant (création de la nouvelle période) — mécanique portée par US27.2.2, cette US ne fait que déclencher la décision
- L'analyse automatisée ou l'IA suggérant des learnings — la capture reste déclarative, saisie par les utilisateurs

## Notes d'implémentation
- S'appuie sur le récapitulatif de clôture produit par US27.5.2 comme point d'entrée (liste des OKR avec leur statut final)
- La décision « reconduire » déclenche la mécanique de report au cycle suivant définie par US27.2.2 ; « abandonner »/« reformuler » n'a pas d'effet sur le cycle suivant au-delà de la trace de décision
- Dépendance directe sur EN27.1 pour le modèle Cycle/Objective, déjà indiquée en frontmatter

---
Item Type: US · Parent: F27.5 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: Backlog
Profils: Tous
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
