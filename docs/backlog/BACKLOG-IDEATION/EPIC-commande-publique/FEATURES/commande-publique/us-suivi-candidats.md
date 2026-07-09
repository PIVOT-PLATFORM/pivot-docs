# US25.1.2 — Suivre les candidats et analyser les offres

**En tant que** responsable achats
**Je veux** enregistrer les candidats et leurs offres pour une consultation
**Afin d'** analyser et comparer les propositions reçues

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une consultation en statut PUBLIEE ou EN_COURS_ANALYSE, when POST `.../consultations/{id}/candidates` avec raison sociale, contact, montantOffre et délai, then le candidat et son offre sont enregistrés et rattachés à la consultation | ⬜ |
| Given une grille d'analyse avec critères pondérés (prix, délai, technique, références) et les offres des candidats, when le calcul de score est déclenché, then chaque candidat obtient un score par critère et un score global, et la vue de comparaison affiche le tableau candidats × critères avec classement | ⬜ |
| Error : given une grille dont la somme des poids des critères ≠ 100%, system retourne 400 et refuse d'activer la grille | ⬜ |
| Error : given un candidat ajouté sur une consultation en statut ATTRIBUEE, INFRUCTUEUSE ou ANNULEE, system retourne 409 | ⬜ |
| Security : la confidentialité entre candidats est garantie tant que la consultation n'est pas ATTRIBUEE — un candidat externe ne peut jamais accéder à l'offre, au score ou aux informations d'un candidat concurrent ; la vue de comparaison et les scores détaillés sont réservés au rôle responsable achats/pilotage du tenant, jamais exposés aux candidats eux-mêmes | ⬜ |
| Security : les données personnelles des candidats (raison sociale, contact) sont marquées comme données personnelles RGPD et purgeables (droit à l'effacement) une fois la consultation clôturée et le délai légal de conservation écoulé | ⬜ |
| A11y : le tableau de comparaison candidats × critères (scores, classement) est navigable au clavier et structuré sémantiquement (en-têtes de colonnes/lignes) pour être restitué correctement par un lecteur d'écran | ⬜ |

## Hors périmètre
- La création de la consultation elle-même (US25.1.1)
- La décision d'attribution et la notification des candidats (US25.1.3)
- L'import automatisé des offres depuis une plateforme de dématérialisation externe

## Notes d'implémentation
- Entités `Candidate`/`Offer`/`ScoringGrid` (critères pondérés) dans le schéma `pilotage`, FK vers `Consultation` (US25.1.1)
- Le cloisonnement candidat-candidat n'est pas qu'un filtre d'affichage frontend : l'API doit refuser toute requête d'un identifiant candidat sur les données d'un autre candidat (contrôle d'accès au niveau resource, pas seulement UI)
- Validation du poids total de la grille (=100%) à faire côté backend avant tout calcul de score, pas uniquement côté formulaire
- Purge RGPD à articuler avec la politique de rétention du domaine Pilotage (durée à définir avec le DPO au Gate 1)

---
Item Type: US · Parent: F25.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Dépendances: US25.1.1
