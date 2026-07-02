# US20.2.1 — Formats de rétrospective prédéfinis et format custom

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.

**En tant que** Scrum Master
**Je veux** choisir parmi des formats de rétro prédéfinis ou créer un format sur mesure
**Afin d'** adapter le format de la rétro au contexte de l'équipe

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| GET `/api/agilite/retro/formats` retourne les formats système (4 prédéfinis) + formats custom du tenant | ⬜ |
| Format = liste ordonnée de colonnes (nom, couleur, description, icône optionnelle) | ⬜ |
| Start/Stop/Continue : 3 colonnes (Commencer · Arrêter · Continuer) | ⬜ |
| KIF/KAF : 2 colonnes (Kept It Famous · Killed A Feature) | ⬜ |
| 4L : 4 colonnes (Liked · Learned · Lacked · Longed For) | ⬜ |
| Mad/Sad/Glad : 3 colonnes (Frustrant · Décevant · Satisfaisant) | ⬜ |
| Format CUSTOM : POST `.../formats` crée un format tenant (2–8 colonnes) | ⬜ |
| Test : format system non modifiable (immutable) | ⬜ |

---
Item Type: US · Parent: F20.2 · Module: agilite · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Dépendances: US20.1.1
