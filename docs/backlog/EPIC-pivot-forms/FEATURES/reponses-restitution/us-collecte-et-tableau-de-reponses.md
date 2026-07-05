# US42.4.1 — Collecte et tableau de réponses

**En tant que** concepteur de formulaire
**Je veux** consulter les réponses collectées dans un tableau filtrable et les exporter en CSV/Excel
**Afin de** exploiter les données en dehors de Forms (analyse, partage, archivage)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un formulaire ayant reçu des réponses, when j'ouvre le tableau de réponses, then je peux filtrer/trier par champ et par date de soumission | ⬜ |
| Given un filtre appliqué sur le tableau, when je lance un export CSV/Excel, then l'export ne contient que les lignes filtrées, pas l'intégralité des réponses | ⬜ |
| Error : given un export demandé sur un très gros volume de réponses, when il dépasse un seuil de taille, then l'export est proposé de façon asynchrone (lien de téléchargement différé) plutôt que de bloquer ou d'échouer silencieusement | ⬜ |
| Security : l'accès au tableau et à l'export est réservé aux propriétaires/collaborateurs déclarés du formulaire (RBAC) — un export ne doit jamais être accessible par URL directe non authentifiée | ⬜ |

## Hors périmètre

- Restitution graphique agrégée — couverte séparément par US42.4.2
- Rétention et purge des réponses au-delà de la politique définie — couvertes par US42.7.3

## Notes d'implémentation

- Le tableau consomme le schéma de réponse porté par EN42.1 ; l'export doit respecter les mêmes règles RBAC que la consultation, pas un chemin de contournement

---
Item Type: US · Parent: F42.4 · Module: forms · Phase: phase-3 · Size: M · Priority: Critical
Stage: Backlog
Source: FRM-301 · MoSCoW: Must · Origine: Socle 6/6
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
