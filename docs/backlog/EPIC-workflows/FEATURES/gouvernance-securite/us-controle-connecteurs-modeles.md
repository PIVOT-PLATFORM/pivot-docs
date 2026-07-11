# US29.7.3 — Contrôle des connecteurs et modèles

**En tant que** administrateur
**Je veux** appliquer des politiques type DLP (allowlist/blocage de connecteurs, apps et modèles IA) par environnement ou équipe
**Afin de** prévenir les fuites de données et le shadow IT

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une politique DLP, when un maker tente d'utiliser un connecteur bloqué, then l'action est refusée | ⬜ |
| Given une allowlist par équipe/environnement, when un workflow utilise un modèle IA, then seuls les modèles autorisés sont accessibles | ⬜ |
| Security/Gouvernance : les tentatives d'usage non conformes sont journalisées | ⬜ |

---
Item Type: US · Parent: F29.7 · Module: automatisation · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Source: WF-025 · MoSCoW: Must · Lot: Lot 2 · Origine: 4/6 (PA DLP, Zapier, Gumloop, AP) + I3/I5
Justification: Dossier §5.2 + §8-I3 : par politique outillée, pas par circulaire
Dépendances: —
