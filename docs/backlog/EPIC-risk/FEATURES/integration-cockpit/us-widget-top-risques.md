# US21.9.3 — Widget « Top risques » composable dans un cockpit

**En tant que** chef de projet (et autres rôles)
**Je veux** un widget « Top 3 risques » exposé par le module Risque, intégrable dans mon cockpit
**Afin de** voir mes risques majeurs sans quitter ma vue projet / portefeuille

## Contexte

Brique de composition des **cockpits** (ADR-008). Le module Risque expose un widget autonome (top risques par criticité pour un `project_ref` ou un portefeuille) que le shell (E16) compose dans le cockpit du rôle concerné. Le widget est alimenté par le bus / l'API Risque, jamais par accès direct au schéma.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un `project_ref` ou un portefeuille donné en paramètre du widget, when le cockpit (shell E16) l'affiche, then le widget « Top 3 risques » liste les risques les plus critiques (score P × G, US21.2.1) pour ce périmètre | ⬜ |
| Given un item du widget, when l'utilisateur clique dessus, then il est redirigé vers le détail du risque correspondant dans le module Risque (deep-link) | ⬜ |
| Given le widget déjà affiché, when un événement `risk.raised` ou `risk.threshold.exceeded` est publié sur le bus PIVOT pour le périmètre affiché, then le widget se met à jour sans rechargement complet du cockpit | ⬜ |
| Error : given la source de données Risque indisponible (API en erreur ou timeout), system affiche le widget en état dégradé avec un message explicite, sans faire échouer le chargement du reste du cockpit | ⬜ |
| A11y : la criticité de chaque risque n'est pas portée uniquement par la couleur (badge + libellé texte complémentaire), et chaque item est accessible au clavier avec un intitulé explicite pour lecteur d'écran (WCAG 2.1 AA 1.4.1) | ⬜ |

## Hors périmètre
- Le calcul du score P × G et le classement des risques les plus critiques — produit par US21.2.1 / US21.2.4 (Matrice de risques visuelle), déjà conçue pour être réutilisable en widget.
- La vue détaillée du risque ouverte par le deep-link — portée par les vues de restitution existantes (F21.8), pas par cette US.
- Le mécanisme de composition générique des cockpits (registre de widgets, layout du shell) — porté par E16, hors périmètre du module Risque qui ne fait qu'exposer le widget.
- L'agrégation multi-projets en mode portefeuille elle-même — produite par US21.5.1 (Consolidation de portefeuille), consommée ici comme source de données quand le widget est paramétré par portefeuille.

## Notes d'implémentation
- Dépend de US21.9.1 pour la résolution du `project_ref` et de US21.2.4, qui prévoit déjà explicitement une matrice/top risques conçue pour être réutilisable en widget composable.
- Le widget consomme uniquement l'API du module Risque et le bus PIVOT (`risk.raised`, `risk.threshold.exceeded`) — jamais d'accès direct au schéma `risk` depuis le shell ou un autre module, conformément à ADR-008.
- La mise à jour temps réel sur événement bus doit être un abonnement léger côté widget (pas de polling), cohérent avec l'architecture événementielle déjà retenue pour la boucle vivante (F21.4).

---
Item Type: US · Parent: F21.9 · Module: risk · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Dépendances: US21.9.1, US21.2.4
