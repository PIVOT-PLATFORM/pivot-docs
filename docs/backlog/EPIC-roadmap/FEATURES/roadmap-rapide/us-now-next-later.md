# US22.3.3 — Vue Now / Next / Later

**En tant que** PO
**Je veux** basculer la roadmap en buckets Now / Next / Later (sans axe temporel)
**Afin de** prioriser par horizon quand les dates ne sont pas encore connues

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une roadmap, when je choisis la vue Now/Next/Later, then les initiatives se rangent en colonnes par horizon | ⬜ |
| Given une initiative, when je la glisse d'un bucket à l'autre, then son horizon est mis à jour | ⬜ |
| Error : given une initiative en cours de glisser-déposer, when le déplacement échoue (ex. perte de connexion), then l'initiative reste dans son bucket d'origine et un message d'erreur est affiché | ⬜ |
| Security : seul un utilisateur habilité à éditer la roadmap peut changer l'horizon (bucket) d'une initiative ; les autres profils en ont une vue lecture seule | ⬜ |
| A11y : le changement de bucket est réalisable au clavier (pas uniquement par glisser-déposer à la souris) et l'horizon courant de chaque initiative est restitué aux lecteurs d'écran (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- La vue temporelle avec échelle floue (mois/trimestre/semestre) — couverte par US22.3.2 ; cette US ne couvre que la vue sans axe temporel.
- La création des initiatives — couverte par US22.3.1.
- La définition des critères de priorisation qui déterminent l'horizon initial — laissée à l'appréciation de l'utilisateur, non outillée ici.

## Notes d'implémentation

- La vue Now/Next/Later est une projection alternative sur le même modèle temporel unique (EN22.1) : l'horizon (bucket) est un attribut de l'initiative, pas une structure de données séparée.
- Bascule roadmap temporelle ↔ Now/Next/Later : même jeu d'initiatives, changement de rendu uniquement.

---
Item Type: US · Parent: F22.3 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Should
Stage: ⬜
Profils: Tous
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude par défaut EN18.10 (E40 adaptatif ultérieur)
Dépendances: EN22.1 (modèle temporel unique)
