# US38.5.1 — Portefeuille d'innovation (horizons H1/H2/H3)

**En tant que** responsable innovation / COMEX
**Je veux** visualiser le **portefeuille d'innovation** par **horizons (H1 cœur / H2 adjacent / H3 rupture)** et par type (incrémental/adjacent/radical)
**Afin de** équilibrer le court terme et les paris de rupture (modèle 3 horizons)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given les innovations actives, when j'ouvre le portefeuille, then elles se répartissent par horizon H1/H2/H3 et par type | ⬜ |
| Given un déséquilibre (ex. tout en H1), when il est détecté, then il est signalé | ⬜ |
| Error : given aucune innovation classée par horizon, when j'ouvre le portefeuille, then un état vide explicite s'affiche (pas d'erreur silencieuse ni de graphique vide non expliqué) | ⬜ |
| Security : la vue portefeuille n'est accessible qu'aux rôles habilités (responsable innovation, COMEX) ; un utilisateur sans droit sur le SMI ne peut ni consulter ni exporter le portefeuille | ⬜ |
| A11y : la répartition par horizon/type (graphique) est doublée d'une table de données consultable au clavier et par lecteur d'écran (pas d'information portée uniquement par la couleur) | ⬜ |

## Hors périmètre
- L'allocation de ressources (budget/personnes) par horizon : couverte par US38.5.2
- Le calcul du score ou du classement des innovations : couvert par US38.4.1 (scoring multicritère)
- Le passage d'une innovation d'un horizon à un autre n'est pas un workflow d'approbation dans cette US (simple reclassement)

## Notes d'implémentation
- Le classement H1/H2/H3 et le type (incrémental/adjacent/radical) sont portés par le modèle SMI défini dans EN38.1 ; cette US consomme ces données, elle ne redéfinit pas la taxonomie
- La détection de « déséquilibre » nécessite une cible de répartition (ex. % attendu par horizon) — si aucune cible n'est configurée, ne pas afficher d'alerte plutôt que de comparer à une valeur arbitraire
- Vue destinée à un usage COMEX : privilégier une lecture rapide (synthèse visuelle) plutôt qu'un tableau exhaustif

---
Item Type: US · Parent: F38.5 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Profils: Grand groupe, Publique, État
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 (modèle SMI & moteur)
