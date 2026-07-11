# US41.4.2 — Kit de formation présentielle & sessions live

**En tant que** référent / formateur
**Je veux** disposer d'un **kit d'animation présentielle** (déroulé, exercices, jeux de données de démo) et animer des **sessions live** via le module Session (E19)
**Afin de** animer des formations en salle ou à distance, homogènes et prêtes à l'emploi

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un kit de formation, when je prépare une session, then j'ai un déroulé minuté, des exercices et un tenant/jeu de données de démonstration | ⬜ |
| Given une session live, when je l'anime, then je m'appuie sur le module **Session (E19)** (quiz, sondage, vote) pour l'interactivité | ⬜ |
| Given une session terminée, when elle se clôt, then la présence et la complétion sont enregistrées (F41.6) | ⬜ |
| Error : given un jeu de données de démonstration corrompu ou désynchronisé de la version courante du module (ex. champs renommés), when le référent l'utilise en session, then l'incohérence est détectée avant la session (validation du kit), pas découverte en direct devant les participants | ⬜ |
| Security : le tenant/jeu de données de démonstration est isolé des données réelles des tenants clients — jamais de mélange entre données de démo et données de production | ⬜ |

## Hors périmètre

- Outil de visioconférence propre à Pivot — la session live s'appuie sur le module Session (E19) existant, pas un nouveau moteur

## Notes d'implémentation

- Le kit doit être versionné en cohérence avec le module concerné, pour éviter la dérive décrite dans l'AC Error à chaque montée de version

---
Item Type: US · Parent: F41.4 · Module: core · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-cle-referent-metier, formateur-ingenieur-pedagogique
Profils: Tous
Justification: Formation & onboarding — adoption de Pivot (in-app, supports, présentiel) ; cf. Insight I8 (réseau de référents)
Dépendances: US41.3.1 · E19 (Session)
