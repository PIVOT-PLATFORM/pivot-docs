# US22.7.9 — Export documents & présentation (PDF, PNG/SVG, PowerPoint)

**En tant que** PMO
**Je veux** exporter la roadmap / le Gantt en PDF, image (PNG/SVG) et en PowerPoint (.pptx) éditable
**Afin de** produire des livrables d'instance et de communication

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une vue, when je l'exporte en PDF/PNG/SVG, then le rendu est fidèle (barres, jalons, chemin critique) | ⬜ |
| Given une roadmap, when je l'exporte en .pptx, then chaque lane/jalon devient un objet éditable dans PowerPoint | ⬜ |
| Error : given une vue vide (aucune tâche/jalon) ou un plan trop volumineux pour tenir sur un rendu unique (ex. 10 000+ tâches, cf. EN22.2), when j'exporte, then l'export aboutit quand même avec un rendu paginé/adapté (ou un message explicite invitant à filtrer/zoomer), jamais un fichier vide ou une erreur silencieuse | ⬜ |
| Security : l'export ne contient que les données du Projet auquel l'utilisateur exportant a accès (pas de fuite d'autres projets/lanes dans le même document) | ⬜ |
| A11y : le déclenchement de l'export (choix du format, lancement) est intégralement pilotable au clavier et le résultat de l'opération (succès/échec) est annoncé aux lecteurs d'écran (WCAG 2.1 AA) — l'accessibilité du contenu du PDF/image généré n'est pas couverte par cette US | ⬜ |

## Hors périmètre
- Accessibilité du document généré lui-même (PDF taggé, alt-text SVG) — hors périmètre, seule l'accessibilité du déclenchement d'export dans l'UI PIVOT est couverte
- Import depuis PDF/PNG/SVG/PowerPoint (export uniquement, aucun import n'est prévu depuis ces formats)
- Modèles de mise en page PowerPoint personnalisables par l'utilisateur (un template PIVOT standard suffit pour cette US)

## Notes d'implémentation
- Le rendu PDF/PNG/SVG doit réutiliser le moteur de rendu Gantt web (EN22.2, virtualisé pour 10 000+ tâches) pour garantir la fidélité visuelle plutôt que reconstruire un renderer d'export séparé
- L'export `.pptx` éditable (lanes/jalons en objets PowerPoint natifs, pas une image plate) nécessite de générer le XML Open XML (OOXML) sous-jacent — s'appuyer sur une librairie tierce (ex. PptxGenJS ou équivalent) plutôt qu'un générateur maison
- Cette US porte sur la roadmap rapide (lanes, F22.3) et le Gantt détaillé (barres/chemin critique, F22.4) — le rendu doit s'adapter à la vue active au moment de l'export

---
Item Type: US · Parent: F22.7 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: officier-responsable-pmo
Profils: Tous
Justification: Interopérabilité / interfaces inter-modules & SI (ADR-010, bus PIVOT + deep-links ADR-006/008)
Dépendances: EN22.1 (modèle temporel unique)
