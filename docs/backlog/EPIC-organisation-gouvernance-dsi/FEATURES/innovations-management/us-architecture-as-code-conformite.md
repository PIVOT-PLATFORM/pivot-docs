# US49.2.2 — Conformité Architecture as Code

**En tant qu'**Architecte
**Je veux** consulter un tableau de bord de conformité architecturale continue (résultats des
contrôles Architecture as Code / Policy as Code exécutés en CI/CD dans les repos concernés)
**Afin de** suivre en continu le respect des standards d'architecture sans audit manuel ponctuel

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des résultats de contrôles Architecture as Code publiés par un pipeline CI/CD externe, when un Architecte consulte le tableau de bord, then il voit le statut de conformité par repo/composant (conforme, non conforme, dérogation active) et la date du dernier contrôle | ⬜ |
| Given un composant non conforme, when un Architecte consulte le détail, then il voit la règle violée et le lien vers l'exécution CI/CD source | ⬜ |
| Given une dérogation à un standard d'architecture (cf. matrice RACI EN49.2, décision « dérogation à un standard d'architecture »), when elle est enregistrée, then le composant concerné est marqué « dérogation active » plutôt que « non conforme » dans le tableau de bord | ⬜ |
| Error : given l'absence de résultat de contrôle pour un repo/composant déclaré, system l'affiche en statut « non évalué » distinct de « conforme »/« non conforme » | ⬜ |
| Security : l'ingestion des résultats CI/CD externes est authentifiée (le tableau de bord ne doit pas accepter de résultat de conformité non attribuable à un pipeline identifié) | ⬜ |
| A11y : le tableau de bord (liste filtrable par statut, détail de non-conformité) est conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'implémentation des contrôles Policy as Code / Architecture as Code eux-mêmes (OPA ou
  équivalent) — ils vivent dans les pipelines CI/CD des repos concernés ; cette US ne porte que
  l'agrégation et la visualisation des résultats
- Le blocage automatique d'un déploiement en cas de non-conformité (relève des pipelines CI/CD
  eux-mêmes, hors périmètre de ce tableau de bord)
- La définition des standards d'architecture eux-mêmes (relève d'[E50 — Architecture d'entreprise
  & urbanisation](../../../EPIC-architecture-entreprise/README.md))

## Notes d'implémentation
- Le statut « dérogation active » s'appuie sur la matrice RACI définie dans [EN49.2](../../ENABLERS/en-modele-roles-raci.md)
  pour le domaine « Architecture », décision « dérogation à un standard » — l'Accountable de cette
  décision est celui qui peut enregistrer une dérogation
- Prévoir un format d'ingestion ouvert (ex. webhook/API) pour que les pipelines CI/CD des repos
  `pivot-core`/`pivot-ui`/modules puissent publier leurs résultats sans couplage fort au format
  interne du tableau de bord

---
Item Type: US · Parent: F49.2 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: Backlog
Source: Benchmark « Organisations DSI dans les grands groupes », section 8
Dépendances: EN49.2 · pipelines CI/CD externes des repos concernés (hors périmètre d'implémentation des contrôles)
