# US21.1.3 — Taxonomie universelle 12 familles

**En tant que** membre de l'équipe projet
**Je veux** « Taxonomie universelle 12 familles »
**Afin de** adapter l'analyse de risque à la nature du projet

## Contexte

Référentiel unique de familles (Technique, Données, Sécurité, Compétences, Fournisseur, Planning, Budget, Périmètre, Gouvernance, Adoption, Conformité, Externe).

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le référentiel de risque, when un membre de l'équipe projet consulte la taxonomie, then les 12 familles universelles (Technique, Données, Sécurité, Compétences, Fournisseur, Planning, Budget, Périmètre, Gouvernance, Adoption, Conformité, Externe) sont listées de façon identique quel que soit le projet ou la typologie | ⬜ |
| Given un risque en cours de création ou d'édition, when l'utilisateur le rattache à une famille, then une seule famille parmi les 12 est sélectionnable et ce rattachement est requis pour enregistrer le risque | ⬜ |
| Error : given une tentative de rattacher un risque à une famille hors de la taxonomie (valeur libre ou obsolète), system rejette l'enregistrement et retourne un message d'erreur listant les 12 familles valides | ⬜ |
| Security : la taxonomie est un référentiel en lecture seule pour tous les rôles applicatifs (Chef de projet, PMO, Archi) ; seul le rôle admin peut modifier la liste des 12 familles, action journalisée car elle impacte la comparabilité inter-projets de l'historique existant | ⬜ |
| A11y : la consultation de la taxonomie et le sélecteur de famille au rattachement d'un risque (libellés des 12 familles, message d'erreur listant les familles valides, navigation clavier) respectent WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La pondération des impacts par famille selon la typologie du projet — couverte par la matrice de pondération (US21.1.4).
- La définition des typologies de projet elles-mêmes et de leurs familles dominantes — couverte par US21.1.2.
- L'agrégation ou la consolidation inter-projets par famille au niveau portefeuille — couverte par F21.5 (Portefeuille & capitalisation).

## Notes d'implémentation
- Référentiel porté par l'entité `RiskFamily` (cf. EN21.1 — schéma Flyway `risk`), les 12 familles sont livrées en données de référence (seed) fixes à l'installation du module.
- C'est le référentiel pivot dont dépendent la bibliothèque de typologies (US21.1.2, familles dominantes), la matrice de pondération (US21.1.4) et l'entité Risk (US21.1.6, rattachement obligatoire à une famille).
- La stabilité de cette liste est structurante pour la comparabilité inter-projets et portefeuille : toute évolution des 12 familles doit être exceptionnelle et tracée (impact sur l'historique de risques déjà classés).

---
Item Type: US · Parent: F21.1 · Module: risk · Phase: phase-3 · Size: S · Priority: Critical
Stage: ⬜
Rôle: macro:ingenierie-developpement
Dépendances: —
