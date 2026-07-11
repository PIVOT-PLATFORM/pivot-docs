# US38.2.1 — Capturer & enrichir des idées

**En tant que** contributeur
**Je veux** **capturer une idée** (problème, solution, bénéfice attendu) et l'**enrichir** collaborativement (commentaires, compléments)
**Afin de** ne perdre aucune idée et la faire mûrir collectivement

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une idée, when je la soumets, then elle est enregistrée avec métadonnées (auteur, axe, pièces jointes) et statut « nouvelle » | ⬜ |
| Given une idée, when des pairs contribuent, then commentaires et enrichissements sont historisés | ⬜ |
| Error : given une idée soumise sans titre ou sans description, when je valide le formulaire, then la soumission est rejetée avec les champs manquants signalés | ⬜ |
| Security : la modification/suppression d'une idée n'est autorisée qu'à son auteur ou à un rôle habilité (responsable innovation) ; les pièces jointes sont scannées/validées (type, taille) avant stockage | ⬜ |
| A11y : soumission accessible (WCAG 2.1 AA) ; i18n FR/EN | ⬜ |

## Hors périmètre
- La modération/évaluation des idées soumises (scoring, décision go/kill) : couverte par F38.4 et F38.3
- Le rattachement d'une idée à une campagne/défi spécifique (US38.2.2) — cette US couvre la capture « libre » d'idée, hors campagne
- Le vote/classement communautaire sur les idées (US38.2.3)

## Notes d'implémentation
- L'idée est la première entité opérationnelle du modèle SMI (EN38.1, `Idea`), rattachée optionnellement à un `AxeStrategique` (US38.1.1) dès la capture
- Les pièces jointes réutilisent le mécanisme de stockage de fichiers existant du socle (mêmes contraintes de taille/type que les autres modules) plutôt qu'un nouveau pipeline dédié
- Les commentaires/enrichissements sont historisés (append-only) pour tracer la maturation collective de l'idée, sans édition destructive des contributions passées

---
Item Type: US · Parent: F38.2 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Profils: Tous
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 (modèle SMI & moteur)
