# US42.4.2 — Restitution visuelle

**En tant que** concepteur de formulaire
**Je veux** une restitution graphique agrégée par question (répartition des choix, moyenne des échelles, nuage de mots pour le texte libre)
**Afin de** lire les tendances d'un formulaire sans exporter les données vers un autre outil

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un formulaire ayant reçu des réponses, when j'ouvre la restitution, then chaque type de champ affiche une visualisation adaptée (barres pour choix unique/multiple, moyenne+distribution pour échelle/NPS, liste pour texte libre) | ⬜ |
| Given un filtre de période ou de segment appliqué sur le tableau de réponses (US42.4.1), when la restitution est consultée, then elle reflète le même sous-ensemble filtré | ⬜ |
| Error : given un formulaire sans aucune réponse encore reçue, when la restitution est ouverte, then un état vide explicite s'affiche (pas de graphique cassé ni de division par zéro) | ⬜ |
| Security : la restitution respecte le même RBAC que le tableau de réponses (US42.4.1) — un non-membre du formulaire (ou une requête cross-tenant) reçoit un 404, pas un 403 ; pas de vue publique de la restitution sans configuration explicite | ⬜ |
| A11y : chaque visualisation graphique expose une alternative accessible (tableau de données équivalent ou description textuelle des valeurs agrégées) exploitable au lecteur d'écran ; l'information n'est jamais portée par la seule couleur (libellés/motifs sur les barres et segments) ; les contrastes respectent WCAG AA | ⬜ |

## Hors périmètre

- Tableaux de bord croisant plusieurs formulaires ou d'autres sources de données PIVOT — relève d'un outil BI (cf. E28 Intégration open source, Metabase), pas de Forms
- Restitution en temps réel pendant que le répondant saisit — hors périmètre

## Notes d'implémentation

- Le seuil au-delà duquel un texte libre bascule en nuage de mots plutôt qu'en liste brute est à définir avec le design-system, pas figé dans cette US

---
Item Type: US · Parent: F42.4 · Module: forms · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Source: FRM-302 · MoSCoW: Must · Origine: Socle 6/6
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
