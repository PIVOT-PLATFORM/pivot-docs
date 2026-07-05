# US23.1.2 — Générer un rapport d'avancement du portefeuille

**En tant que** responsable pilotage
**Je veux** générer un rapport d'avancement périodique du portefeuille
**Afin de** le partager avec les parties prenantes

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une période et une équipe, when le responsable demande le rapport, then GET `/api/pilotage/portfolio/report?format=json\|csv` retourne un rapport contenant liste des projets, statut, avancement %, jalons prochains et projets en retard, filtré selon les critères | ⬜ |
| Given `format=csv`, when le rapport est généré, then le fichier est correctement formaté avec en-têtes de colonnes et peut être ouvert dans un tableur | ⬜ |
| Error : given un `format` non supporté (ni `json` ni `csv`), system retourne 400 avec message d'erreur explicite | ⬜ |
| Security : le rapport n'inclut que les projets des équipes du tenant de l'utilisateur authentifié (même périmètre que US23.1.1) | ⬜ |
| A11y : le bouton d'export CSV et l'aperçu JSON dans la vue Angular sont accessibles au clavier et annoncés par lecteur d'écran | ⬜ |

## Hors périmètre
- L'envoi automatique/programmé du rapport (email périodique) n'est pas couvert — génération à la demande uniquement.
- Le format PDF n'est pas inclus dans cette US (seulement `json` et `csv`).
- La personnalisation du contenu du rapport (choix des colonnes) n'est pas couverte.

## Notes d'implémentation
- Réutilise les mêmes données et le même périmètre de sécurité que US23.1.1 (tableau de bord), dont cette US dépend.
- Backend `pivot-pilotage-core`, endpoint `GET /api/pilotage/portfolio/report`, génération CSV via une lib de streaming pour éviter de charger tout le portefeuille en mémoire sur les gros tenants.
- Frontend `pivot-pilotage-ui` : bouton d'export déclenchant le téléchargement du CSV, aperçu JSON affiché dans un panneau dédié.

---
Item Type: US · Parent: F23.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Dépendances: US23.1.1
