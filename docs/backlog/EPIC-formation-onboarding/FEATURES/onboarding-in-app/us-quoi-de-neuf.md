# US41.1.4 — « Quoi de neuf » (nouveautés in-app)

**En tant que** utilisateur
**Je veux** consulter un panneau **« Quoi de neuf »** présentant les nouveautés et changements récents
**Afin de** adopter les nouvelles fonctionnalités sans les manquer

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une nouvelle version, when je me connecte, then les nouveautés pertinentes pour mon rôle/mes modules sont présentées | ⬜ |
| Given une nouveauté, when je l'ai vue, then elle n'est plus signalée (lu/non-lu) | ⬜ |
| Error : given un utilisateur n'ayant pas accès à un module dont une nouveauté est publiée, when le panneau s'affiche, then cette nouveauté n'apparaît pas (filtrage par droits, pas de fuite d'information sur des modules non activés) | ⬜ |
| A11y : le badge « non-lu » n'est pas uniquement porté par la couleur (icône/texte associé) ; le panneau est navigable au clavier | ⬜ |

## Hors périmètre

- Notification push/e-mail des nouveautés hors de l'in-app — hors périmètre, ce canal reste in-app uniquement

## Notes d'implémentation

- Le filtrage par rôle/module s'appuie sur la taxonomie des rôles et le catalogue de modules activés du tenant, pas une liste de diffusion générique

---
Item Type: US · Parent: F41.1 · Module: core · Phase: phase-3 · Size: S · Priority: Low
Stage: ⬜
Rôle: utilisateur-final
Profils: Tous
Justification: Formation & onboarding — adoption de Pivot (in-app, supports, présentiel) ; cf. Insight I8 (réseau de référents)
Dépendances: EN41.1 (framework onboarding)
