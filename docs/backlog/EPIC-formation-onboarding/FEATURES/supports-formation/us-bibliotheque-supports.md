# US41.3.1 — Bibliothèque de supports (guides, vidéos, tutoriels)

**En tant que** utilisateur / formateur
**Je veux** accéder à une **bibliothèque de supports** : guides PDF, **vidéos**, tutoriels pas à pas, par module et par rôle
**Afin de** apprendre au format qui convient et disposer de supports partageables

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la bibliothèque, when je filtre par module/rôle/niveau, then les supports correspondants s'affichent | ⬜ |
| Given un support, when il est publié, then il est versionné et daté (à jour vs obsolète signalé) | ⬜ |
| Error : given un support marqué obsolète suite à une évolution du module concerné, when un utilisateur le consulte, then un bandeau signale l'obsolescence avec un lien vers la version à jour si elle existe | ⬜ |
| Security : le partage d'un support (lien externe) respecte la classification du tenant — un guide interne à un tenant n'est pas exposé publiquement par défaut | ⬜ |
| A11y : vidéos sous-titrées, guides accessibles (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- Production des supports eux-mêmes (tournage vidéo, rédaction) — cette US couvre la bibliothèque et sa consultation, pas le processus éditorial

## Notes d'implémentation

- Le marquage obsolète/à jour doit être rattaché à une version de module, pas seulement une date, pour rester fiable après une montée de version

---
Item Type: US · Parent: F41.3 · Module: core · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Profils: Tous
Justification: Formation & onboarding — adoption de Pivot (in-app, supports, présentiel) ; cf. Insight I8 (réseau de référents)
Dépendances: EN41.1 (framework onboarding)
