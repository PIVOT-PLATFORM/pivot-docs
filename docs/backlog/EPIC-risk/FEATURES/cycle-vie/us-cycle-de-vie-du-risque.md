# US21.3.1 — Cycle de vie du risque

**En tant que** Chef de projet
**Je veux** faire suivre à chaque risque un cycle de vie à statuts avec transitions tracées
**Afin de** traiter et suivre chaque risque jusqu'à sa clôture

## Contexte

États candidat → actif → maîtrisé → survenu → clos avec transitions tracées.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un risque au statut `candidat`, when le Chef de projet le valide, then le risque passe au statut `actif` et l'horodatage + l'auteur de la transition sont enregistrés | ⬜ |
| Given un risque `actif` dont le score repasse sous le seuil d'appétence après traitement, when le Chef de projet le repasse en `maîtrisé`, then l'historique conserve la transition précédente (pas d'écrasement) | ⬜ |
| Error : given une tentative de transition non autorisée par la machine à états (ex. `clos` → `actif` direct), system rejette la transition avec un statut 409 et un message explicite | ⬜ |
| Security : seul le Chef de projet (ou PMO) assigné au risque peut modifier son statut ; toute transition est journalisée dans l'audit trail avec identité de l'auteur, horodatage et statut source/cible, de façon immuable | ⬜ |
| A11y : le composant de visualisation du statut (badge/timeline) expose le statut courant et l'historique des transitions via des attributs ARIA lisibles par lecteur d'écran (WCAG 2.1 AA) | ⬜ |

## Hors périmètre
- La définition des stratégies de traitement associées à un risque `actif` (4 T) — cf. US21.3.2
- Le déclenchement automatique de statut `survenu` depuis un événement du bus PIVOT — cf. F21.4 (Boucle vivante)
- Les règles de calcul du score de risque déterminant le passage en `actif` — cf. F21.2 (Scoring)

## Notes d'implémentation
- Machine à états explicite côté backend (`pivot-risk-core`) définissant les transitions valides entre les 5 statuts (candidat, actif, maîtrisé, survenu, clos) ; toute transition hors machine est rejetée au niveau service, pas seulement en UI
- Chaque transition génère une entrée d'audit trail immuable (table dédiée ou event sourcing), pré-requis pour les revues de risques (US21.3.5) qui s'appuient sur cet historique
- Le statut `clos` doit rester compatible avec la ré-ouverture éventuelle d'un risque via une nouvelle instance plutôt qu'une réactivation de l'historique existant, afin de préserver l'intégrité de la trace

---
Item Type: US · Parent: F21.3 · Module: risk · Phase: phase-3 · Size: M · Priority: Critical
Stage: Backlog
Dépendances: US21.1.6
