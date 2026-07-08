# US49.1.2 — Sélection d'un modèle de gouvernance

**En tant que** DSI Groupe
**Je veux** choisir et documenter, parmi le catalogue des 5 modèles de gouvernance SI (gouvernance
fédérée, Hub & Spoke, Platform + Marketplace interne, Team Topologies, Product Operating Model),
celui qui correspond à mon organisation, avec une justification
**Afin de** formaliser mon choix de gouvernance et pouvoir le réviser au fil du temps

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le catalogue des 5 modèles de gouvernance (EN49.3), when la DSI Groupe sélectionne un modèle et saisit une justification, then ce choix est enregistré et daté comme le modèle actif de l'organisation | ⬜ |
| Given un modèle de gouvernance déjà adopté, when la DSI Groupe consulte l'historique, then elle voit tous les modèles précédemment adoptés avec leurs dates et justifications | ⬜ |
| Given un modèle actif, when la DSI Groupe sélectionne un nouveau modèle, then l'ancien modèle est archivé (pas supprimé) et le nouveau devient actif | ⬜ |
| Error : given une tentative de sélection sans justification renseignée, system refuse l'enregistrement et signale le champ manquant | ⬜ |
| Security : seuls les rôles habilités (DSI Groupe, Sponsor métier selon EN49.2) peuvent modifier le modèle de gouvernance actif — les autres rôles ont un accès en lecture seule | ⬜ |
| A11y : l'écran de sélection (liste de fiches modèle, formulaire de justification) est conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La réimplémentation fonctionnelle du modèle choisi (ex. marketplace API pour Platform +
  Marketplace, portail développeur pour Team Topologies) — cette US reste documentaire
- La comparaison automatisée/recommandation algorithmique d'un modèle en fonction du profil
  d'organisation (non couvert, potentiel enrichissement avec [E40 — Profil & adaptation](../../../EPIC-profil-adaptation/README.md))

## Notes d'implémentation
- S'appuie sur l'entité `GovernanceModel` et son rattachement à l'organisation, définis dans [EN49.3](../../ENABLERS/en-catalogue-modeles-gouvernance.md)
- Le contrôle d'habilitation (AC Security) s'appuie sur le modèle de rôles défini dans [EN49.2](../../ENABLERS/en-modele-roles-raci.md)

---
Item Type: US · Parent: F49.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Source: Benchmark « Organisations DSI dans les grands groupes », section 1
Dépendances: EN49.1, EN49.2, EN49.3
