# US38.3.1 — Pipeline d'innovation (idea → scale)

**En tant que** responsable innovation
**Je veux** visualiser et faire avancer les idées dans un **entonnoir** : idée → concept → POC/expérimentation → projet → **passage à l'échelle**
**Afin de** piloter le flux d'innovation de bout en bout

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une idée retenue, when elle progresse, then elle traverse les étapes de l'entonnoir avec un statut par étape | ⬜ |
| Given le pipeline, when je l'affiche, then je vois le nombre et la valeur des items par étape (funnel) | ⬜ |
| Error : given une tentative de faire avancer un item vers une étape non consécutive (ex. idée → projet sans passer par concept/POC), when elle est déclenchée, then elle est refusée avec message explicite sur l'étape attendue | ⬜ |
| Security : la progression d'un item entre étapes n'est autorisée qu'aux rôles habilités (responsable innovation, comité) ; un contributeur simple ne peut consulter que les items sur lesquels il a un droit de visibilité | ⬜ |
| A11y : la vue funnel (nombre/valeur par étape) encode l'information par un canal autre que la seule couleur (libellé, motif) et reste navigable au clavier (WCAG 2.1 AA) | ⬜ |

## Hors périmètre
- Les décisions de gate elles-mêmes (go/kill/hold/pivot) à chaque changement d'étape : couvertes par US38.3.2, que ce pipeline visualise/déclenche sans en porter la logique de décision
- La conversion finale d'un item « go » en projet du portefeuille (US38.3.3)
- Le calcul des scores/valeur affichés par étape (F38.4) — le pipeline consomme ces valeurs, il ne les calcule pas

## Notes d'implémentation
- Le pipeline visualise les entités `Idea → Concept → Experiment → InnovationItem` du modèle SMI (EN38.1) ; chaque étape a un statut porté par le moteur entonnoir, pas par un champ libre
- Le funnel (nombre + valeur par étape) et les taux de conversion sont calculés par le moteur EN38.1, pas recalculés côté frontend
- La progression entre étapes doit rester cohérente avec les jalons de décision (US38.3.2) : une étape ne s'ouvre qu'après un gate favorable (go) sur l'étape précédente

---
Item Type: US · Parent: F38.3 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: responsable-innovation
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 (modèle SMI & moteur)
