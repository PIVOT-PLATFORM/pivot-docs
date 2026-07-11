# US22.5.4 — Coûts du plan

**En tant que** contrôleur de gestion SI
**Je veux** calculer les coûts du plan (taux ressources, coûts fixes) et les rapprocher du budget
**Afin de** relier planning et finances

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des taux ressources et coûts fixes, when le plan évolue, then le coût planifié/réel se recalcule | ⬜ |
| Given un coût de plan, when il est consolidé, then il alimente E26 Budget (rapprochement) | ⬜ |
| Error : given un taux ressource ou un coût fixe manquant/invalide, when le coût du plan est recalculé, then la ligne concernée est signalée comme incomplète plutôt que d'être calculée à zéro silencieusement | ⬜ |
| Security : les taux ressources et coûts du plan (données financières sensibles) ne sont visibles que par les rôles habilités (contrôleur de gestion SI, chef de projet autorisé) ; les autres rôles du domaine `pilotage` n'y ont pas accès | ⬜ |
| A11y : les tableaux et totaux de coûts sont restitués de façon structurée (en-têtes de colonnes, totaux annoncés) pour les lecteurs d'écran (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- La saisie et la gestion du budget global du projet — relève d'E26 Budget ; cette US ne fait que le rapprochement/alimentation.
- Le nivellement des ressources qui influence indirectement les coûts — couvert par US22.5.3.
- La gestion des devises multiples ou de la conversion — non traitée ici.

## Notes d'implémentation

- Le coût planifié se calcule à partir des affectations (US22.5.1), des taux ressources et des coûts fixes, rapproché de l'avancement réel (US22.4.8) sur le modèle temporel unique (EN22.1).
- L'alimentation d'E26 Budget se fait via le bus d'événements PIVOT, sans FK inter-modules (cf. README E22 « Interfaces inter-modules & SI », ADR-006/008).
- Fonctionnalité réservée aux profils Grand groupe/Publique/État (cf. frontmatter `Profils`).

---
Item Type: US · Parent: F22.5 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Rôle: controleur-de-gestion-si
Profils: Grand groupe, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
