# EN51.4 — Shell / hôte de cockpit

**Type d'enabler** : UI

**Objectif technique** : La page qui **héberge** un cockpit : layout par défaut selon l'archétype,
grille de cards responsive, règle des 3 secondes (bandeau de statut en haut, puis KPI, puis
drill-down), et **personnalisation encadrée** (réorganiser, épingler, masquer, densité) dans les
garde-fous du moteur.

**Justification** : Le composant card (EN51.1) et le moteur (EN51.2) produisent des cards ; il faut
un contenant pour les disposer. Sans hôte, pas de cockpit consultable. Réutilise le pattern shell
d'E16 (navigation, dashboard).

**Critères de complétion** :
- [ ] Route `/cockpit` (ou intégrée au dashboard admin) rendant un cockpit composé par EN51.2.
- [ ] Layout par défaut par archétype (ordre des cards défini par le contrat EN51.3).
- [ ] Règle des 3 s : bandeau de statut (santé, incidents, alertes conformité, correctifs sécu en
      attente) en tête ; l'état « OK » aussi lisible que l'état « alerte ».
- [ ] Personnalisation encadrée : épingler / masquer / réorganiser / densité, **persistée par
      utilisateur**, sans jamais masquer une card obligatoire.
- [ ] Gouvernance de la perso : un admin peut définir le cockpit par défaut de ses sous-admins.
- [ ] Responsive + WCAG 2.1 AA (navigation clavier, focus, ARIA sur la grille).

## Notes

- Ne dépend d'aucun module fonctionnel : un cockpit vide de modules affiche les cards Socle + les
  cards `module-wip`, ce qui est un état **valide** et informatif, pas une page d'erreur.

---
Item Type: Enabler · Parent: E51 · Type: ui · Module: core · Phase: phase-3
Stage: ⬜ · Priority: High
Dépendances: EN51.1, EN51.2, E16 (shell existant)
