# US49.2.1 — Métriques InnerSource

**En tant que** CoE (Centre of Excellence)
**Je veux** consulter des métriques de réutilisation de code entre équipes internes (InnerSource) :
nombre de contributions cross-équipes, dépôts partagés les plus réutilisés, équipes contributrices
**Afin de** mesurer et encourager la diffusion des pratiques InnerSource au sein de la DSI

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des données de contribution cross-équipe ingérées, when un CoE consulte le tableau de bord InnerSource, then il voit le nombre de contributions cross-équipes, les dépôts partagés les plus réutilisés et les équipes contributrices sur une période donnée | ⬜ |
| Given un dépôt partagé disposant de règles de contribution documentées, when un CoE consulte sa fiche, then il voit un lien vers ces règles de contribution | ⬜ |
| Error : given une absence de données de contribution pour la période sélectionnée, system affiche un état vide explicite plutôt qu'une erreur | ⬜ |
| Security : les métriques agrégées ne doivent pas exposer d'information nominative individuelle en dehors du périmètre RACI habilité (cf. EN49.2) — un CoE voit une vue par équipe, pas par contributeur individuel sans droit spécifique | ⬜ |

## Hors périmètre
- Le connecteur d'ingestion détaillé depuis une plateforme Git d'entreprise (GitHub/GitLab
  Enterprise) — cette US porte le tableau de bord de métriques, pas l'implémentation du
  connecteur ; à préciser dans une US ultérieure d'intégration
- La définition et la gouvernance des règles de contribution InnerSource elles-mêmes (contenu
  éditorial, hors périmètre technique de cette US)
- L'attribution de récompenses ou d'incitations liées aux contributions InnerSource

## Notes d'implémentation
- Le rattachement des contributions à une équipe s'appuie sur le référentiel organisationnel
  ([EN49.1](../../ENABLERS/en-referentiel-organisationnel.md))
- Prévoir un modèle de données suffisamment générique pour accueillir une ingestion différée
  (import périodique ou API) sans redévelopper le tableau de bord

---
Item Type: US · Parent: F49.2 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Source: Benchmark « Organisations DSI dans les grands groupes », section 8
Dépendances: EN49.1 · intégration plateforme Git d'entreprise à préciser (hors périmètre détaillé de connecteur)
