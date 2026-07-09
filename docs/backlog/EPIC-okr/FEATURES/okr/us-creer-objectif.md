# US27.1.1 — Créer des objectifs et résultats-clés (OKR)

**En tant que** manager / responsable pilotage
**Je veux** créer des OKR (Objectives & Key Results) pour mon équipe ou mon tenant
**Afin de** aligner les équipes sur des objectifs mesurables

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un cycle ouvert, when je crée un objectif (titre, description, période, owner : entreprise/équipe/individu), then il est créé en statut brouillon avec 1 à 5 Key Results (titre, unité, baseline, cible, valeur actuelle) | ⬜ |
| Given un objectif créé, when son statut se calcule, then il vaut ON_TRACK / AT_RISK / OFF_TRACK selon l'avancement pondéré des KR (cf. EN27.1) | ⬜ |
| Error : given un objectif sans aucun Key Result ou avec plus de 5 KR, when je le soumets, then l'API retourne 400 avec le détail de la contrainte violée | ⬜ |
| Security : given un utilisateur, when il crée un objectif, then il ne peut le rattacher qu'à son propre tenant et à une équipe sur laquelle il a un rôle autorisé (manager/responsable pilotage) | ⬜ |
| A11y : formulaire de création d'objectif conforme WCAG 2.1 AA (labels associés, navigation clavier, erreurs annoncées) | ⬜ |

## Hors périmètre
- Le suivi et la mise à jour de la valeur des KR après création (cf. US27.1.2)
- Le typage engageant/aspirationnel et les garde-fous de volume au-delà de la limite 1–5 KR (cf. US27.1.4)
- Les types de KR (métrique/jalon/booléen/%) et leur mode de calcul détaillé (cf. US27.1.3)
- L'alignement sur un objectif parent (cf. F27.3)

## Notes d'implémentation
- Entités `Objective` / `KeyResult` du schéma `pilotage` posées par EN27.1 — cette US couvre uniquement la création initiale.
- Le cycle (trimestriel/annuel) doit être ouvert (non gelé/clôturé, cf. US27.2.1) pour autoriser la création ; sinon 409.
- L'objectif naît en statut brouillon ; son statut ON_TRACK/AT_RISK/OFF_TRACK n'est pertinent qu'une fois le cycle validé (gel) et des check-ins réalisés — avant cela, un statut par défaut neutre est affiché.
- Isolation tenant/équipe : mêmes règles de scoping que le reste du domaine `pilotage` (FK → `public.teams.id`, pas de FK inter-modules — ADR-008).

---
Item Type: US · Parent: F27.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
