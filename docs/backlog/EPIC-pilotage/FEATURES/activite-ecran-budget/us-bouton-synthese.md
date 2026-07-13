# US18.18.8 — Bouton Synthèse (afficher/rétracter toutes les lignes)

**En tant que** contrôleur de gestion SI (profil budget)
**Je veux** basculer tous les tableaux entre vue détaillée et vue synthèse via un bouton
**Afin de** ne visualiser que les totaux ou le détail selon mon besoin

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le bouton Synthèse, when je l'active, then seule la ligne total de chaque tableau est conservée (tableaux rétractés) | ⬜ |
| Given le bouton Synthèse, when je le désactive, then toutes les lignes des tableaux sont de nouveau affichées | ⬜ |
| Given l'ouverture de l'écran, when les tableaux s'affichent, then par défaut ils sont repliés | ⬜ |
| Error : given un tableau sans ligne détaillée, system affiche uniquement sa ligne total sans erreur | ⬜ |
| Security/Gouvernance : l'affichage synthèse/détail ne modifie aucune donnée et respecte les droits de consultation | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le déploiement/rétractation individuel d'un tableau via son chevron, couvert par l'US Tableau budgétaire.

## Notes d'implémentation
- Module pilotage (OPDN), écran Budget, bouton Synthèse.
- Ne garde que la ligne total de chaque tableau ; par défaut les tableaux sont repliés.

---
Item Type: US · Parent: F18.18 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: SPEC_OPDN — B.15 Activité — écran Budget
Dépendances: —
