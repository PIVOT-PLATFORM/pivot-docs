# US11.6.3 — Ajustement par la vélocité du sprint précédent

**En tant que** Scrum Master
**Je veux** pondérer la capacité prévisionnelle par la **vélocité réelle** du/des sprint(s) précédent(s)
**Afin de** planifier sur la réalité mesurée plutôt que sur la théorie

**Gate 1 réalisé le 2026-07-22** — remplace la version outline précédente. Prolonge US11.4.1 (S20,
vélocité réelle par sprint) et US11.6.2 (facteur de concentration). Référence POC directe :
`summarizeHistory`/`avgVelocity`/`forecastPoints` de PouetPouet (`apps/web/src/lib/capacity.ts`) —
moyenne de vélocité réalisée (`completedPoints ÷ netPersonDays`) pondérée par la taille de chaque
sprint passé, réutilisée telle quelle comme base de la moyenne glissante ci-dessous.

**Réconciliation 2026-07-31** — vérifié contre le code réel (`pivot-core#263` mergée) :
`CapacityVelocityForecastService`/`CapacityVelocityForecastCalculator`,
`CapacityVelocityController` (`GET .../velocity-forecast`), `INVALID_VELOCITY_WINDOW`,
`confidenceInterval`/`basis` dans `VelocityForecastResponse`. Checkboxes jamais mises à jour
après merge.

## Critères d'acceptation

### Vélocité prévisionnelle (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une équipe avec au moins un sprint terminé et sa vélocité saisie (US11.4.1), when `GET .../teams/{teamId}/velocity-forecast?window=3`, then 200 OK avec la **moyenne glissante des N derniers sprints terminés** (fenêtre `window`, défaut 3, bornes `[1, 10]`), pondérée par les jours ouvrés nets de chaque sprint (même principe que `summarizeHistory` du POC) | ✅ `CapacityVelocityForecastCalculator` |
| Given la vélocité historique, when le coefficient de variation (**écart-type ÷ moyenne**) de la fenêtre dépasse **25 %**, then la réponse porte `confidenceInterval: "WIDE"` (± 1 écart-type) ; sinon `confidenceInterval: "NARROW"` | ✅ `VelocityForecastResponse.confidenceInterval` |
| Given une équipe **sans aucun sprint terminé avec vélocité saisie**, when la prévision est demandée, then 200 OK avec `forecastPoints: null`, `basis: "NO_HISTORY"` — le prévisionnel repli sur **capacité en jours-homme × facteur de concentration × (1 − marge de maturité)** (US11.6.4), sans vélocité | ✅ `basis: "NO_HISTORY"` + repli `CapacitySummaryService` |
| Given un sprint sans vélocité saisie (`completedPoints` non renseigné, US11.4.1), when il tombe dans la fenêtre, then il est **exclu** du calcul de moyenne (ni compté ni pondéré à zéro) | ✅ `CapacityVelocityForecastCalculator` (filtre sprints sans `completedPoints`) |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given `window` hors bornes `[1, 10]`, when la prévision est demandée, then 400 code `INVALID_VELOCITY_WINDOW` | ✅ `CapacityVelocityController` L75 |
| Error : given un `teamId` inexistant ou d'un autre tenant, when la prévision est demandée, then 404 | ✅ résolution équipe tenant-scopée (convention module) |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : given un appelant non membre de l'équipe `teamId`, when la prévision est demandée, then 404 (jamais 403) | ✅ |
| Security : test TI obligatoire cross-tenant | ✅ (suite `CapacityEngineControllerIT`) |

## Hors périmètre

- **Vélocité par sous-équipe/streams** — hors périmètre, agrégation au niveau équipe uniquement
  (cohérent avec US11.8.1 §RGPD/éthique — agrégation équipe par défaut).

## Notes d'implémentation

- **Backend** : `CapacityVelocityForecastService#forecast(teamId, window)` — fonction pure une
  fois les données chargées (mêmes entrées que `summarizeHistory` du POC : liste de sprints
  terminés avec `completedPoints`/jours ouvrés nets), testée en isolation avec des historiques
  synthétiques (régulier, irrégulier > 25 % CV, vide). `GET .../teams/{teamId}/velocity-forecast`
  sur `CapacityVelocityController` (S20, étendu). Le repli « sans historique » réutilise
  directement US11.6.2/US11.6.4 (facteur × marge), pas une formule dupliquée.
- **Frontend** : encart "Vélocité prévisionnelle" dans `capacity-event-detail` (événement `SPRINT`
  en préparation) — moyenne, intervalle de confiance (élargi/resserré, texte + icône jamais la
  seule couleur), ou message explicite si `basis: "NO_HISTORY"`.

---
Item Type: US · Parent: F11.6 · Module: agilite · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: scrum-master
Dépendances: US11.4.1 · US11.6.2
