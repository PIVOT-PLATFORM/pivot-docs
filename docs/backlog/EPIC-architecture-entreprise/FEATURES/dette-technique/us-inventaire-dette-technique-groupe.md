# US50.4.1 — Inventaire de la dette technique Groupe

**En tant que** DSI Groupe
**Je veux** agréger et prioriser la dette technique remontée depuis plusieurs applications/équipes
**Afin de** piloter la réduction de la dette technique à l'échelle du SI Groupe

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des éléments de dette technique remontés par plusieurs applications/équipes, when ils sont consolidés, then une vue agrégée par application et par organisation est disponible | ⬜ |
| Given un élément de dette technique consolidé, when il est priorisé (critique / élevée / moyenne / faible), then la priorisation est tracée et visible au niveau Groupe | ⬜ |
| Error : given un élément de dette remonté sans rattachement à une application cartographiée, system refuse l'agrégation de cet élément | ⬜ |
| Security : seuls les rôles habilités (Architecte, DSI Groupe) peuvent définir la priorisation Groupe ; une équipe peut remonter sa propre dette sans disposer du droit de priorisation Groupe | ⬜ |

## Hors périmètre
- L'exécution des outils d'analyse de code (ex. SonarQube) et d'inventaire de dépendances n'est pas dans le périmètre PPM — cette US consomme leurs résultats remontés, elle ne les exécute pas.
- La dette technique suivie au niveau d'un seul module (déjà gérée localement par chaque module/équipe) n'est pas redéfinie ici : seule son **agrégation** à l'échelle du SI Groupe l'est.

## Notes d'implémentation
- Chaque élément de dette technique se rattache à une application cartographiée par [US50.1.1](../cartographie-applicative/us-inventaire-applications.md).
- Alimentation possible par des outils externes (SonarQube, inventaire de dépendances) via import ou API ; le choix technique d'intégration reste hors périmètre backlog PPM, à définir à l'implémentation.

---
Item Type: US · Parent: F50.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Dépendances: US50.1.1 (rattachement application)
