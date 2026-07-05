# US23.2.4 — Météo et indicateurs normalisés

**En tant que** direction
**Je veux** un indicateur synthétique d'état par projet (météo) remonté en portefeuille selon des règles homogènes
**Afin de** comparer la santé des projets sur une base normalisée

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet, when son indicateur météo est calculé, then il suit des règles homogènes définies au niveau portefeuille | ⬜ |
| L'indicateur de chaque projet est remonté et agrégé en vue portefeuille | ⬜ |
| Error : given des données insuffisantes pour calculer la météo, system affiche un état indéterminé explicite | ⬜ |
| Security : les règles de calcul de la météo ne peuvent être modifiées que par un rôle habilité (PMO/admin portefeuille), pas par un chef de projet seul | ⬜ |
| A11y : l'indicateur météo n'est pas restitué uniquement par la couleur (RGAA) | ⬜ |

## Hors périmètre
- La personnalisation des règles de calcul par tenant/organisation n'est pas incluse — règles homogènes fixées au niveau portefeuille pour cette US.
- L'historisation de l'évolution de la météo dans le temps (tendance) n'est pas couverte.
- La consommation de l'indicateur dans les tableaux de bord et la vue consolidée est traitée respectivement par US23.2.2 et US23.2.1 ; cette US ne couvre que le calcul et la remontée.

## Notes d'implémentation
- Le calcul homogène doit s'appliquer à tous les projets du portefeuille indépendamment de leur profil, pour garantir la comparabilité (cf. objectif "base normalisée").
- Sert de source à US23.2.1 (vue consolidée) et US23.2.2 (tableaux de bord) — le calcul doit être exposé via une API/entité réutilisable plutôt que dupliqué dans chaque vue.
- Backend `pivot-pilotage-core`, schéma `pilotage`.

---
Item Type: US · Parent: F23.2 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: Backlog
Source: PP-024 · MoSCoW: Should · Lot: Lot 1 · Origine: PM généralisé
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Cahier PM EF-PIL-02
Dépendances: —
