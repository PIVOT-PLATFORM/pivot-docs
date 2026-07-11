# US22.3.1 — Créer une roadmap rapide

**En tant que** direction / PO
**Je veux** poser des initiatives sur des lanes (thème / équipe / objectif) sans créer de tâches, en quelques minutes
**Afin de** communiquer une direction vite, en réunion, sans granularité opérationnelle

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une roadmap vide, when j'ajoute une initiative sur une lane, then une barre est créée sans exiger de tâches ni de dates précises | ⬜ |
| Given une initiative, when je la déplace/redimensionne à la souris, then sa période (approximative) est mise à jour immédiatement | ⬜ |
| Error : given une initiative sans lane cible, when je tente de l'enregistrer, then l'action est rejetée et un message indique qu'une lane est requise | ⬜ |
| Security : seul un utilisateur ayant accès au projet/portefeuille concerné peut créer ou modifier une initiative sur sa roadmap | ⬜ |
| A11y : création et déplacement possibles au clavier (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- La définition de l'échelle de temps (mois/trimestre/semestre) — couverte par US22.3.2.
- Les vues Now/Next/Later et les jalons stratégiques — couvertes respectivement par US22.3.3 et US22.3.4.
- Toute planification fine (tâches, WBS, dépendances typées) : hors altitude « roadmap rapide », relève du Gantt détaillé (F22.4).

## Notes d'implémentation

- L'initiative créée ici est une vue « macro » posée sur le même graphe temporel que le Gantt (EN22.1) — pas d'entité séparée ni de double saisie.
- Le déplacement/redimensionnement à la souris doit rester possible sans imposer de date au jour près (cf. échelle floue, US22.3.2).
- Fonctionnalité activée selon le profil d'organisation (TPE/PME en priorité, cf. README E22 §« Altitude pilotée par le profil »).

---
Item Type: US · Parent: F22.3 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: macro:direction-pilotage, product-owner
Profils: Tous
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
