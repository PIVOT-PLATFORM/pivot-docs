# US21.8.4 — Vue Contract Manager

**En tant que** Contract Manager
**Je veux** une vue regroupant les risques liés aux fournisseurs et aux contrats, les risques de lock-in, les pénalités encourues et les risques transférés contractuellement
**Afin de** suivre l'exposition contractuelle sans dépouiller le registre de risques complet projet par projet

## Contexte

Risques fournisseurs, lock-in, pénalités, risques transférés par contrat.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des risques rattachés à un Vendor et/ou un Contract (US21.4.5), when le Contract Manager ouvre sa vue, then il voit la liste de ces risques regroupés par fournisseur/contrat, avec distinction des risques `Transférer` (stratégie 4T, US21.3.2) et des risques de lock-in | ⬜ |
| Given un contrat associé à un Vendor arrivant à échéance, when l'événement de réévaluation est émis (US21.4.5), then le risque correspondant est signalé comme « à réévaluer » dans la vue Contract Manager | ⬜ |
| Error : given un Vendor ou Contract sans aucun risque rattaché, system l'affiche dans la vue avec un état « aucun risque connu » plutôt que de l'omettre silencieusement | ⬜ |
| Security : la vue n'affiche que les risques liés aux Vendors/Contracts sur lesquels l'utilisateur a un rôle Contract Manager ou Chef de projet autorisé | ⬜ |
| A11y : le regroupement par fournisseur/contrat est structuré par des titres hiérarchiques exploitables par lecteur d'écran, et le marquage « à réévaluer » ne repose pas uniquement sur la couleur (WCAG 2.1 AA 1.3.1 et 1.4.1) | ⬜ |

## Hors périmètre
- La création/suppression du rattachement risque ↔ Vendor/Contract — couverte par US21.4.5 ; cette vue est en lecture avec navigation vers l'édition.
- La gestion du cycle de vie de Vendor et Contract eux-mêmes (module CLM, Pilotage) — hors périmètre risque.
- Le calcul de concentration de risques multi-fournisseurs (risques systémiques) — couvert par US21.5.2, pas cette vue individuelle.
- L'export de cette vue en rapport formel — couvert par US21.8.5.

## Notes d'implémentation
- Vue de restitution qui s'appuie sur le rattachement risque ↔ Vendor/Contract déjà posé par US21.4.5 (référence `vendor_ref`/`contract_ref` via bus PIVOT, sans FK inter-modules, cf. ADR-006).
- La notion de « lock-in » n'a pas de champ dédié identifié dans le catalogue actuel de l'entité Risk : à clarifier au raffinement technique si elle correspond à une famille de la taxonomie universelle (US21.1.3) ou à un attribut spécifique à ajouter.
- Le signal « à réévaluer » réutilise l'événement de bus déclenché par l'échéance contractuelle déjà décrit dans US21.4.5 ; cette US se limite à l'affichage de ce signal.

---
Item Type: US · Parent: F21.8 · Module: risk · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Dépendances: US21.4.5
