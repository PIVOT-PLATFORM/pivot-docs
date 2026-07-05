# US27.3.1 — Arbre d'alignement (O ↔ O, KR → O parent)

**En tant que** responsable pilotage
**Je veux** aligner un objectif sur un objectif parent et **rattacher un KR à l'objectif de niveau supérieur** auquel il contribue
**Afin de** rendre visible la chaîne « stratégie → exécution »

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un objectif, when je l'aligne, then je choisis un objectif parent ; la relation forme un **arbre d'alignement** (sans cycle) | ⬜ |
| Given un KR, when il contribue à un O de niveau supérieur, then le lien de contribution est explicite et remonte l'avancement | ⬜ |
| Error : given un alignement créant un cycle, then il est refusé (400 avec le chemin de cycle détecté) | ⬜ |
| Security : given un utilisateur, when il aligne un objectif sur un parent, then l'opération n'est autorisée que si l'objectif parent est visible dans son tenant (pas d'alignement inter-tenant) | ⬜ |
| A11y : l'arbre d'alignement (représentation visuelle) est navigable au clavier et propose une alternative textuelle (liste hiérarchique) pour les lecteurs d'écran | ⬜ |

## Hors périmètre
- La déclinaison organisationnelle entreprise → équipe → individu et le mode bottom-up de proposition (cf. US27.3.2)
- La carte d'alignement globale (vue graphe, dépendances inter-équipes, détection d'orphelins) (cf. US27.3.3)
- Le calcul détaillé de l'agrégation pondérée du score au niveau objectif (cf. F27.5 / EN27.1)

## Notes d'implémentation
- Entité `Alignment` (Objective parent) posée par EN27.1 — cette US couvre la création/validation du lien et la détection de cycle (parcours du graphe à l'insertion, ex. DFS depuis le parent visé).
- Le rattachement KR → O parent est un lien de contribution distinct de l'alignement O↔O ; il doit permettre la remontée d'avancement dans le moteur de scoring (EN27.1) sans dupliquer la donnée source du KR.
- La contrainte anti-cycle doit être vérifiée côté serveur (pas seulement UI) à chaque création/modification d'`Alignment`.

---
Item Type: US · Parent: F27.3 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
