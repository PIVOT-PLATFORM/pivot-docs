# US21.10.6 — Extraction automatique des FR critiques (règle DIT)

**En tant que** Chef de projet appliquant la méthode DIT
**Je veux** une liste construite automatiquement des Facteurs de Risque les plus critiques
**Afin de** concentrer l'effort de traitement sur l'essentiel

## Contexte

Hérité de SANDRA (US-15, EN-06). La méthode DIT applique une règle de sélection précise : un FR est
« critique » si sa **criticité résultante `> 8`**, ou **`= 8` avec résultat `> 3`**. La liste est
triée par criticité résultante décroissante et accompagne chaque FR de ses actions. Cette règle est
distincte des seuils d'appétence généraux (US21.2.3).

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des FR cotés sur un projet en profil DIT, when le chef de projet ouvre la liste des FR critiques, then elle contient exactement les FR dont la criticité résultante est `> 8`, ou `= 8` avec résultat `> 3`, triés par criticité résultante décroissante | ⬜ |
| Given un FR critique, when il est listé, then ses actions rattachées (US21.3.3) et son responsable sont affichés en regard | ⬜ |
| Given un projet sans date de réunion / séminaire renseignée, when la liste est demandée, then elle est vide (aucune cotation exploitable) | ⬜ |
| Error : given une criticité résultante non calculable pour un FR (cotation absente), when la liste est construite, then le FR est exclu sans erreur bloquante et l'absence est signalée | ⬜ |
| Security : la liste respecte les habilitations et l'isolation par tenant ; un FR d'un autre tenant n'y apparaît jamais (cross-tenant → 404) | ⬜ |
| A11y : le caractère critique et le rang sont exprimés en texte (pas uniquement par couleur), et la liste est navigable au clavier (WCAG 2.1 AA 1.4.1) | ⬜ |

## Hors périmètre
- La définition des seuils d'appétence configurables (acceptable / à surveiller / à traiter) est portée par US21.2.3 ; cette US implémente la règle de seuil fixe propre à DIT.
- Le calcul de la criticité résultante amont est traité par US21.10.5.
- La restitution graphique par rôle relève de F21.8.

## Notes d'implémentation
- Remplace la macro SANDRA `Image45_QuandClic` (filtre + tri) par une règle de sélection
  centralisée et testable ; les bornes `8` et `3` du barème DIT sont paramétrables au niveau du
  profil (US21.1.1) sans changer la logique de tri.
- La condition « vide si aucune date de réunion » réutilise la gestion des périodes (US21.5.5) :
  pas de période initialisée → pas de cotation → liste vide.

---
Item Type: US · Parent: F21.10 · Module: risk · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Dépendances: US21.10.5 · US21.3.3 · US21.2.3
