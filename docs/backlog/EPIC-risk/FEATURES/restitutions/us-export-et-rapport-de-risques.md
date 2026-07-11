# US21.8.5 — Export et rapport de risques

**En tant que** PMO, Chef de projet
**Je veux** exporter le registre de risques au format CSV ou PDF et générer un rapport d'instance formaté
**Afin de** partager l'état des risques avec des parties prenantes n'ayant pas accès direct à l'outil (comités, audits, archivage)

## Contexte

Export CSV/PDF du registre et rapport d'instance.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet avec un registre de risques qualifiés, when le PMO ou le Chef de projet déclenche l'export CSV, then un fichier contenant l'ensemble des risques du projet (identifiant, score, statut, stratégie, owner, échéance) est généré et téléchargeable | ⬜ |
| Given le même contexte, when l'utilisateur déclenche la génération du rapport d'instance (PDF), then un document formaté incluant matrice, top risques et plans d'action en cours est produit, cohérent avec la vue chef de projet (US21.8.1) | ⬜ |
| Error : given un projet sans aucun risque à exporter, system refuse l'export avec un message explicite (registre vide) plutôt que de générer un fichier vide silencieusement | ⬜ |
| Security : l'export et le rapport ne contiennent que les risques des projets auxquels l'utilisateur a accès ; l'action d'export est tracée dans l'audit trail (auteur, projet, format, horodatage) | ⬜ |
| A11y : le déclenchement de l'export (bouton, choix de format) est pilotable au clavier et le résultat de l'opération (succès/échec) est annoncé aux technologies d'assistance (WCAG 2.1 AA 2.1.1 et 4.1.3) | ⬜ |

## Hors périmètre
- Le contenu détaillé et la mise en page de chacune des vues par rôle (chef de projet, sponsor, etc.) — couverts par leurs US respectives (US21.8.1 à US21.8.4) ; cette US assemble et exporte, sans redéfinir leur contenu.
- La planification automatique ou récurrente de rapports (envoi périodique programmé) — non couverte, l'export est déclenché à la demande.
- L'export au niveau portefeuille consolidé (multi-projets) — cette US couvre l'export par projet ; l'export consolidé s'appuierait sur US21.5.1 si demandé ultérieurement.

## Notes d'implémentation
- Le contenu du rapport d'instance (PDF) doit rester cohérent avec les données déjà restituées par la vue chef de projet (US21.8.1) : matrice (US21.2.4), top risques, plans d'action (US21.3.3) — pas de recalcul indépendant.
- L'export CSV du registre doit inclure a minima les champs déjà portés par l'entité Risk au catalogue (US21.1.6) : identifiant, score, statut de cycle de vie (US21.3.1), stratégie de traitement (US21.3.2), owner, échéance.
- Génération PDF : à cadrer techniquement (librairie serveur vs génération côté client) au raffinement technique — dépendance potentielle avec l'infrastructure multi-repo `pivot-risk-core`.

---
Item Type: US · Parent: F21.8 · Module: risk · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: officier-responsable-pmo, chef-de-projet
Dépendances: US21.3.1
