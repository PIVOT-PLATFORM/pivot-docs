# US41.1.1 — Tour guidé au premier accès

**En tant que** nouvel utilisateur
**Je veux** être accueilli par un **tour guidé** (product tour) qui présente les fonctions clés au premier accès
**Afin de** comprendre l'outil sans documentation externe

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un premier accès, when j'entre dans Pivot / un module, then un tour guidé pas à pas met en avant les fonctions clés (via EN41.1) | ⬜ |
| Given le tour, when je le complète ou le passe (skip), then l'état est mémorisé (pas de répétition) et je peux le relancer depuis l'aide | ⬜ |
| Error : given un tour dont une cible d'interface a été déplacée ou supprimée depuis la dernière mise à jour, when le tour tente de la surligner, then l'étape est ignorée proprement (pas de tour bloqué ni d'élément fantôme surligné dans le vide) | ⬜ |
| Security : l'état de progression du tour est rattaché au compte utilisateur, jamais partagé entre utilisateurs d'un même poste (pas de fuite d'avancement entre comptes) | ⬜ |
| A11y : navigation clavier + lecteur d'écran (WCAG 2.1 AA) ; i18n FR/EN | ⬜ |

## Hors périmètre

- Personnalisation du contenu du tour par l'utilisateur final (réorganiser/masquer des étapes) — le tour est défini par module, pas configurable par l'utilisateur

## Notes d'implémentation

- Le ciblage des éléments d'interface doit être robuste aux évolutions de layout (sélecteurs stables, pas de coordonnées en dur) pour éviter la régression décrite dans l'AC Error

---
Item Type: US · Parent: F41.1 · Module: core · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Profils: Tous
Justification: Formation & onboarding — adoption de Pivot (in-app, supports, présentiel) ; cf. Insight I8 (réseau de référents)
Dépendances: EN41.1 (framework onboarding)
