# US29.1.8 — Édition collaborative temps réel

**En tant que** maker
**Je veux** que plusieurs personnes puissent éditer le même workflow simultanément, en voyant les curseurs et modifications des autres en temps réel
**Afin de** concevoir des automatisations à plusieurs sans se marcher dessus ni écraser le travail d'un collègue

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un workflow ouvert par plusieurs makers, when l'un d'eux modifie une étape, then les autres voient la modification et la position du curseur sans rechargement de page | ⬜ |
| Given deux makers modifiant la même étape en quasi-simultané, when leurs changements se rencontrent, then la convergence est automatique sans écrasement silencieux ni blocage exclusif | ⬜ |
| Error : given une perte de connexion pendant l'édition, system resynchronise l'état du workflow sans perte des modifications déjà propagées | ⬜ |

---
Item Type: US · Parent: F29.1 · Module: automatisation · Phase: phase-3 · Size: XL · Priority: Low
Stage: ⬜
Rôle: citizen-developer
Source: — (hors CSV WF-### initial) · MoSCoW: Could · Lot: Lot 4 · Origine: Différenciant Power Automate (RPA, 2026) généralisé
Justification: Ajouté lors du raffinage benchmark 2026-07-08 — cahier Power Automate EF-RPA-04 (« collaboration temps réel des créateurs ») mentionne la co-édition uniquement pour les flux RPA, mais aucun des 6 outils ne l'offre sur l'éditeur de workflow général ; recoupé avec l'ADN collaboratif de PIVOT (whiteboard temps réel — voir EPIC-collaboration). Absent du dossier de synthèse (non repris en §5) faute de porter sur plus d'un outil — écart identifié par lecture croisée des cahiers individuels
Dépendances: —

## Note d'implémentation (à valider par le mainteneur)

Aucune ADR ne tranche aujourd'hui le modèle de synchronisation temps réel à utiliser pour l'éditeur
de workflows (distinct du modèle retenu pour le whiteboard collaboratif — à réévaluer plutôt qu'à
dupliquer par défaut). Deux familles de solutions dominent le marché 2026 pour ce type d'éditeur
structuré (pas du texte libre) : la transformation opérationnelle centralisée (le serveur arbitre
l'ordre final, plus simple à raisonner sur des données structurées avec validation serveur) et les
types de données répliquées sans conflit (convergence garantie sans serveur arbitre, meilleure
tolérance à la coupure réseau, plus complexe sur un graphe de nœuds typés). Question ouverte pour le
mainteneur : réutiliser le mécanisme de synchronisation du whiteboard (EPIC-collaboration) une fois
choisi, ou trancher indépendamment pour l'éditeur de workflows dont le modèle de données (graphe de
nœuds typés, pas un canevas libre) diffère structurellement.
