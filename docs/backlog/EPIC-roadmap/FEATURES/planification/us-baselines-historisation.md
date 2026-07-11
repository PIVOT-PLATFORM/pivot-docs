# US22.2.5 — Baselines et historisation

**En tant que** chef de projet
**Je veux** figer des références (planning, budget), mesurer les écarts et conserver l'historique des modifications
**Afin de** suivre la dérive par rapport au plan de référence et justifier les évolutions

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet, when le chef de projet fige une baseline, then une référence planning/budget est enregistrée et horodatée | ⬜ |
| L'écart entre l'état courant et la baseline est calculé et visualisable | ⬜ |
| Error : given une baseline déjà figée sur la même période, system demande confirmation avant écrasement | ⬜ |
| Security/Gouvernance : l'historique des modifications est conservé de façon inaltérable (traçabilité) | ⬜ |
| A11y : la visualisation des écarts (planning/budget) n'utilise pas la seule couleur pour distinguer avance/retard et est navigable au clavier (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- Le calcul du chemin critique et des marges (US22.2.2) : cette US se limite à figer une référence et calculer l'écart, pas à recalculer l'ordonnancement
- Les baselines multiples nommées et leur comparaison fine tâche par tâche façon MS Project (US22.4.9 dans le Gantt détaillé) : cette US porte la baseline au niveau socle (F22.2)
- L'export des écarts en rapport formaté (US22.6.4) : cette US expose l'écart à l'écran, l'export est une autre US
- La définition du budget lui-même (montants, postes) : rattachée au module Budget (E26), cette US ne fait que figer/comparer la valeur au moment du gel

## Notes d'implémentation

- La baseline fige un instantané du planning ET du budget associés au projet ; l'horodatage et l'auteur du gel doivent être conservés pour la traçabilité (AC Security/Gouvernance)
- L'historique des modifications doit être append-only (pas d'update/delete destructif) pour garantir l'inaltérabilité exigée par l'AC sécurité
- Le calcul d'écart (courant vs baseline) doit s'appuyer sur le modèle temporel unique (EN22.1) plutôt que sur une copie parallèle des tâches

---
Item Type: US · Parent: F22.2 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: PP-023 · MoSCoW: Must · Lot: Lot 2 · Origine: 2/3 (Sciforma, MS)
Profils: Grand groupe, Privée sous droit public, Publique, État
Justification: Dossier §5.2
Dépendances: —
