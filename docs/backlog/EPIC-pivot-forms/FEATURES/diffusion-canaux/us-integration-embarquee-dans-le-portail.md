# US42.3.2 — Intégration embarquée dans le portail

**En tant que** développeur d'un module PIVOT
**Je veux** embarquer un formulaire directement dans une page du portail (composant embed, pas un simple lien externe)
**Afin de** proposer une saisie sans rupture de contexte pour l'utilisateur du module hôte

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un formulaire publié, when il est embarqué dans une page PIVOT via le composant d'intégration, then il hérite du thème de la page hôte et s'affiche sans re-chargement de page complet | ⬜ |
| Given un formulaire embarqué qui se termine (soumission), when la confirmation s'affiche, then elle reste dans le composant embed, sans redirection qui ferait perdre le contexte de la page hôte | ⬜ |
| Error : given un formulaire embarqué supprimé ou dépublié après intégration dans une page hôte, when la page hôte est chargée, then le composant affiche un état vide explicite plutôt qu'une erreur JavaScript qui casserait la page hôte | ⬜ |
| Security : le composant d'intégration s'exécute en isolation (sandbox) — un script du formulaire ne peut pas accéder au DOM ou aux cookies de la page hôte, et réciproquement | ⬜ |

## Hors périmètre

- Embed sur un site tiers hors du portail PIVOT (ex. site public externe) — hors périmètre de cette US, qui couvre l'intégration intra-portail

## Notes d'implémentation

- Le composant d'intégration consomme la capacité « Liens profonds » et « Thème » du contrat d'intégration PIVOT (ADR-009) ; l'isolation sandbox est requise même en intra-portail pour limiter la surface d'attaque XSS

---
Item Type: US · Parent: F42.3 · Module: forms · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Source: FRM-202 · MoSCoW: Must · Origine: Typeform, Tally, Formbricks
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
