# EN28.5 — Design-system et thème pour adaptateurs

**Type d'enabler** : plateforme · thème

**Contexte** : Les tokens `--pv-*` et le shell thémé (dark/light) doivent être consommables par tous les plugins — natifs comme adaptateurs — pour respecter la capacité « Thème » du contrat (ADR-009 §4).

**Critères de complétion** :
- [ ] Tokens `--pv-*` publiés et documentés pour un usage hors `pivot-ui`
- [ ] Un plugin (adaptateur ou natif) hérite des tokens
- [ ] Aucun hexadécimal codé en dur dans un adaptateur

**Dépendances** : EN28.1 (portail Backstage)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E28 · Type: plateforme · Module: mycelium · Phase: phase-3
Stage: Backlog · Priority: Highest
