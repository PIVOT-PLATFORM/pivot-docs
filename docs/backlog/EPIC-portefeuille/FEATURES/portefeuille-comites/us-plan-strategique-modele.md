# US23.2.6a — Modèle de plan stratégique et contrats d'objectifs

**En tant que** direction
**Je veux** modéliser un plan stratégique et ses contrats d'objectifs (création, édition, cycle de vie)
**Afin de** disposer d'un socle structuré pour décliner les orientations stratégiques dans l'outil

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une direction habilitée, when elle crée un plan stratégique avec un ou plusieurs objectifs (libellé, période, cible), then le plan et ses contrats d'objectifs sont persistés dans le schéma `pilotage` et consultables | ⬜ |
| Given un plan stratégique existant, when la direction modifie un objectif (libellé, cible, échéance), then la modification est enregistrée et horodatée (traçabilité de l'auteur et de la date) | ⬜ |
| Given un plan stratégique, when la direction le clôture, then il passe en statut « clos » et n'accepte plus de nouveaux rattachements (lecture seule) | ⬜ |
| Error : given un objectif sans libellé ou avec une période invalide (échéance antérieure au début), then la création est refusée avec un message d'erreur explicite et aucune entité n'est persistée | ⬜ |
| Security : un membre non habilité (rôle non direction) reçoit 403 en création/modification ; un plan d'un autre tenant renvoie 404 (isolation multi-tenant, pas de fuite d'existence) | ⬜ |
| A11y : le formulaire de création/édition du plan et des objectifs est navigable au clavier, chaque champ porte un `label` associé et les erreurs sont annoncées via `aria-describedby` (RGAA 4 / WCAG 2.1 AA) | ⬜ |

## Hors périmètre
- Le rattachement des projets aux objectifs stratégiques (relève de US23.2.6b).
- La vue de suivi de l'alignement et le statut « non aligné » (relèvent de US23.2.6c).
- La définition et la gouvernance métier des contrats d'objectifs eux-mêmes (processus hors outil) — seul leur suivi dans l'outil est couvert.

## Notes d'implémentation
- Entités à modéliser dans le schéma `pilotage` : `StrategicPlan` et `ObjectiveContract` (un plan porte plusieurs contrats d'objectifs). Backend `pivot-pilotage-core`.
- Le statut « clos » verrouille le plan en lecture seule sans supprimer l'historique des rattachements existants — nécessaire au suivi rétrospectif.
- L'habilitation « direction » réutilise le mécanisme de rôle déjà en place sur le module `pilotage` ; aucun nouveau rôle applicatif n'est introduit ici.

---
Item Type: US · Parent: F23.2 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Dépendances: —
