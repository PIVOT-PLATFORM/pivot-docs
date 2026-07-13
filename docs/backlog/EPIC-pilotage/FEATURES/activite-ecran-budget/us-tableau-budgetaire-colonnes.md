# US18.18.4 — Tableau budgétaire (colonnes)

**En tant que** contrôleur de gestion SI (profil budget)
**Je veux** disposer d'un tableau budgétaire par compte présentant toutes les colonnes descriptives et les montants annuels
**Afin de** lire et saisir le détail de chaque ligne budgétaire

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un tableau budgétaire, when il s'affiche, then un chevron permet de déployer/rétracter et les colonnes Titre-Produit, Bénéficiaire, Priorité-Typologie, Objet de gestion-Structure, Phase, Nature, Contrat, Année N/N+1/N+2, icône commentaire de ligne et icône Dupliquer sont présentes | ⬜ |
| Given la colonne Priorité-Typologie, when elle s'affiche, then elle montre « PX » avec une infobulle ; la colonne Contrat affiche le N° en 1re ligne et le Libellé en 2e ligne | ⬜ |
| Given les colonnes Année N/N+1/N+2, when elles s'affichent, then les montants sont numériques en k€, éditables à la volée, limités à 7 digits + 1 décimale après le point ; les lignes sont ordonnées par Phase et un total par année est affiché | ⬜ |
| Given l'icône commentaire de ligne, when je clique dessus, then une pop-up s'ouvre ; l'icône Dupliquer permet de dupliquer la ligne | ⬜ |
| Error : given une saisie de montant hors format (plus de 7 digits ou plus d'1 décimale après le point), system n'accepte pas la valeur | ⬜ |
| Security/Gouvernance : les onglets Élaboration PMT et Photos financières sont en lecture seule sauf pour les profils GPP-CGO | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'écran de saisie/édition complet d'une ligne, couvert par les US Création / Modifier une ligne.

## Notes d'implémentation
- Module pilotage (OPDN), écran Budget, tableau budgétaire par compte.
- Colonnes : Titre-Produit, Bénéficiaire, Priorité-Typologie (PX + infobulle), Objet de gestion-Structure, Phase, Nature, Contrat (N° / Libellé), Année N/N+1/N+2 (k€, édition à la volée, 7 digits + 1 décimale), commentaire de ligne (pop-up), Dupliquer ; tri par Phase ; total par année ; lecture seule Élab PMT et Photos financières sauf GPP-CGO.

---
Item Type: US · Parent: F18.18 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: SPEC_OPDN — B.15 Activité — écran Budget
Dépendances: —
