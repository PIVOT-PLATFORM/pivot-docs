# US23.2.4 — Météo et indicateurs normalisés

**En tant que** direction
**Je veux** un indicateur synthétique d'état par projet (météo) remonté en portefeuille selon des règles homogènes
**Afin de** comparer la santé des projets sur une base normalisée

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet et un jeu de données de pilotage complet, when son indicateur météo est calculé, then il suit des règles homogènes définies au niveau portefeuille (mêmes seuils pour tous les profils, base normalisée) et l'API/entité renvoie une valeur météo réutilisable par US23.2.1 et US23.2.2 | ⬜ |
| Given les indicateurs météo de plusieurs projets, when la vue portefeuille les consomme, then chaque indicateur est remonté et agrégé sans recalcul divergent par vue | ⬜ |
| Error : given des données insuffisantes pour calculer la météo (avancement ou dates manquants), system renvoie un état « indéterminé » explicite plutôt qu'une météo par défaut trompeuse | ⬜ |
| Security : les règles de calcul de la météo ne peuvent être modifiées que par un rôle habilité (PMO/admin portefeuille) ; given une tentative de modification par un rôle non habilité (chef de projet seul), system retourne 403 | ⬜ |
| Security : given une requête sur la météo d'un projet appartenant à un autre tenant, system retourne 404 (non-divulgation d'existence) ; le calcul est toujours filtré par tenant | ⬜ |
| A11y : l'indicateur météo n'est pas restitué uniquement par la couleur (icône/libellé associé), conforme RGAA 4 / WCAG 2.1 AA | ⬜ |

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
Stage: ⬜
Rôle: macro:direction-pilotage
Source: PP-024 · MoSCoW: Should · Lot: Lot 1 · Origine: PM généralisé
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Cahier PM EF-PIL-02
Dépendances: —
