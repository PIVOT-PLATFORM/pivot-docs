# US38.5.2 — Équilibre & allocation de ressources

**En tant que** responsable innovation
**Je veux** **allouer des ressources** (budget, personnes) aux innovations et suivre la consommation par horizon
**Afin de** investir de façon délibérée et pas seulement sur l'urgent

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un budget d'innovation, when je l'alloue, then la répartition par horizon/type est visible et comparée à une cible | ⬜ |
| Given la consommation, when elle évolue, then l'écart à la cible d'allocation est suivi | ⬜ |
| Error : given une allocation dont le montant dépasse le budget total disponible, when je valide, then l'allocation est rejetée avec un message explicite (pas d'enregistrement en dépassement silencieux) | ⬜ |
| Security : seul le responsable innovation (ou rôle habilité budget) peut modifier une allocation ; la consultation de la consommation budgétaire est restreinte aux rôles autorisés à voir les données financières de l'innovation | ⬜ |

## Hors périmètre
- La vue de répartition par horizon elle-même (graphique H1/H2/H3) : couverte par US38.5.1, cette US ajoute la dimension budget/ressources sur cette vue
- La gestion fine de la paie ou du temps-homme détaillé (feuille de temps) : hors SMI, cette US suit une allocation de ressources à la maille innovation, pas au grain individu/jour
- Les cibles d'allocation par horizon ne sont pas calculées automatiquement ; elles sont saisies/paramétrées, pas recommandées par un algorithme

## Notes d'implémentation
- L'allocation porte sur budget ET personnes (ressources humaines) — modéliser au moins un type « budget » et un type « effectif/temps », cohérents avec le modèle SMI d'EN38.1
- La « cible » d'allocation par horizon est une donnée de paramétrage (probablement au niveau politique d'innovation, cf. US38.1.1) ; sans cible définie, afficher la consommation brute sans comparaison plutôt qu'un écart à zéro qui induirait en erreur
- Donnée sensible : le montant budgétaire alloué à chaque innovation peut relever de la confidentialité stratégique — cohérent avec le traitement Security d'US38.7.1 (PI) sur la sensibilité des données SMI

---
Item Type: US · Parent: F38.5 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: responsable-innovation
Profils: Grand groupe, Publique, État
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 (modèle SMI & moteur)
