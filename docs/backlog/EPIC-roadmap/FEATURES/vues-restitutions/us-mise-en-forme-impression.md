# US22.6.3 — Mise en forme & impression

**En tant que** chef de projet
**Je veux** mettre en forme (styles de barres, jalons, lignes de référence) et imprimer/exporter avec en-têtes et échelle
**Afin de** produire des livrables lisibles pour les instances

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un Gantt, when je personnalise les styles de barres, then l'affichage et l'export reflètent la mise en forme | ⬜ |
| Given une impression, when je définis l'échelle et la période, then le rendu paginé est fidèle | ⬜ |
| Given des en-têtes/pieds de page (logo, titre, date, pagination), when je les configure, then ils apparaissent sur chaque page imprimée/exportée | ⬜ |
| Error : given une période d'impression plus large que le format papier sélectionné, system avertit avant impression et propose un ajustement d'échelle | ⬜ |
| Security : la mise en forme personnalisée (styles, en-têtes) est propre au tenant/projet et n'est pas visible ou modifiable par un autre tenant | ⬜ |
| A11y : l'aperçu avant impression est navigable au clavier et les options de mise en forme sont correctement étiquetées (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- La génération de rapports de synthèse (Excel, avancement, écarts) : couverte par US22.6.4
- Le choix de la vue à imprimer (Gantt, chronologie, calendrier…) : la vue est sélectionnée via US22.6.1, cette US ne fait que la mettre en forme et l'imprimer
- L'export vers des formats d'interopérabilité externes (MS Project, Primavera…) : hors périmètre, couvert par F22.7
- La définition des lignes de référence (baselines) elles-mêmes : cette US affiche des lignes de référence déjà existantes (US22.2.5), elle ne les crée pas

## Notes d'implémentation

- Les styles de mise en forme (couleurs de barres, formes de jalons, lignes de référence) doivent être persistés par projet/vue pour être réappliqués à l'export et à l'impression sans ressaisie
- La pagination à l'impression doit gérer le découpage temporel (une période par page) et le découpage WBS (arborescence tâches) de façon cohérente avec la volumétrie visée par EN22.2
- Réutiliser le moteur de rendu du Gantt (EN22.2) pour l'aperçu avant impression, plutôt que de dupliquer un rendu spécifique à l'impression

---
Item Type: US · Parent: F22.6 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
