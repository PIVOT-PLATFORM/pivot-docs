# US37.1.1 — Réversibilité contractuelle

**En tant que** acheteur
**Je veux** un export complet exploitable (projets, jalons, budgets, décisions, historique) testé pendant le POC, avec une clause de sortie
**Afin de** garantir la portabilité des données, la vie d'un marché dépassant la stabilité des produits

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un portefeuille, when l'acheteur déclenche l'export de réversibilité, then projets, jalons, budgets, décisions et historique sont exportés dans un format exploitable | ⬜ |
| La procédure d'export est exécutable et documentée dès le POC | ⬜ |
| Error : given un export partiel (données manquantes), system le signale et n'affirme pas la complétude | ⬜ |
| Security/Gouvernance : l'export inclut l'historique des décisions et respecte la traçabilité ; clause de sortie documentée | ⬜ |
| A11y : le déclenchement de l'export et son statut (succès/partiel) sont accessibles au clavier et perceptibles sans dépendre uniquement de la couleur, conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le format technique précis de l'export (standard réimportable par un autre PPM) est spécifié par US37.1.5 ; cette US couvre le déclenchement et la complétude de l'export, pas le standard d'échange.
- La clause de sortie contractuelle elle-même (rédaction juridique) est hors du périmètre applicatif ; seule sa disponibilité/documentation est vérifiée ici.
- La restauration/import de ces données dans un autre système n'est pas couverte par cette US (export uniquement).

## Notes d'implémentation
- L'export de réversibilité doit couvrir l'intégralité des entités du schéma `pilotage` rattachées au portefeuille (projets, jalons, budgets, décisions) ainsi que leur historique (pas seulement l'état courant).
- La procédure doit être testable dès la phase POC : prévoir un jeu de données de démonstration exportable pour validation avant signature.
- La détection d'export partiel (donnée manquante) nécessite une vérification de complétude explicite avant de restituer le fichier, pas une simple absence d'erreur technique.
- Frontend `pivot-pilotage-ui` pour le déclenchement de l'export, backend `pivot-pilotage-core` pour la constitution du fichier (FK `public.teams.id` pour le scoping par organisation).

---
Item Type: US · Parent: F37.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Source: PP-029 · MoSCoW: Must · Lot: Lot 1 · Origine: Insight I5 + B8
Profils: Grand groupe, Privée sous droit public, Publique, État
Justification: Dossier §8-I5 : la vie d'un marché dépasse la stabilité des produits
Dépendances: —
