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

### Backend — contrat figé (pivot-pilotage-core, PR [`#39`](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/39))

Non documenté par la PR backend elle-même — contrat vérifié dans son diff et figé ici pour qu'un
futur agent frontend puisse s'y brancher sans deviner, même convention que les autres US de F22.3
(lanes/initiatives US22.3.1, jalons US22.3.4, partage US22.3.5).

**L'horizon est un attribut de l'initiative, pas une structure séparée** (même principe EN22.1
« modèle temporel unique » que `fuzzyPeriodStart`/`End` et `Milestone.date`) : `InitiativeResponse`/
`CreateInitiativeRequest` portent désormais un champ `horizon: "NOW" | "NEXT" | "LATER" | null`
(nullable — `null` pour toute initiative jamais explicitement triée ; le serveur applique `NOW`
par défaut à la création si le champ est omis).

**Endpoints REST** (préfixe nginx `/api/pilotage`, cf. `pivot-pilotage-core/CLAUDE.md`) :

| Méthode | Chemin | Auth | Body | Succès | Erreurs |
|---------|--------|------|------|--------|---------|
| `GET` | `/tenants/{tenantId}/teams/{teamId}/projects/{projectId}/roadmap/horizon-view` | Authentifié | — | `200` `HorizonViewResponse{buckets: HorizonBucketResponse[], unbucketed: InitiativeResponse[]}` où `HorizonBucketResponse{horizon, initiatives}` | `404` (projet non visible) |
| `PATCH` | `/tenants/{tenantId}/teams/{teamId}/projects/{projectId}/roadmap/initiatives/{initiativeId}/horizon` | Authentifié, gate `RoadmapEditPolicy` | `UpdateInitiativeHorizonRequest{horizon}` — **champ obligatoire**, contrairement aux autres PATCH roadmap (placement, jalon) qui acceptent tout champ optionnel | `200` `InitiativeResponse` mis à jour | `400` (`horizon` null/absent), `403` (fail-closed aujourd'hui, voir ci-dessous), `404` (projet ou initiative non visible) |

**« Jamais perdue » (AC1 « même jeu d'initiatives que la vue temporelle »).** `unbucketed` liste
explicitement toute initiative dont `horizon` est `null` — le contrat garantit qu'aucune initiative
n'est silencieusement exclue de cette vue simplement parce qu'elle n'a jamais été triée. Il
n'existe **aucun moyen** de repasser une initiative à `horizon: null` depuis ce endpoint PATCH
(champ obligatoire) : une fois triée, une initiative ne peut plus redevenir « non classée » par
cette UI — cohérent avec l'absence d'AC demandant l'inverse.

**Sécurité.** Réutilise `RoadmapEditPolicy` tel quel (même policy que le placement d'initiative et
les jalons, US22.3.1/US22.3.4) — câblé aujourd'hui en fail-closed (`DenyAllRoadmapEditPolicy`,
`PATCH .../horizon` toujours `403`) le temps que `pivot-core-starter` publie l'appartenance
projet/équipe. `GET .../horizon-view` est en lecture seule, accessible à tout utilisateur
authentifié ayant accès au projet (même posture que `listInitiatives`).

**Frontend (`pivot-pilotage-ui`, PR [`#25`](https://github.com/PIVOT-PLATFORM/pivot-pilotage-ui/pull/25), mergée).**
`RoadmapApiService.getHorizonView`/`updateHorizon`, nouveau `NowNextLaterBoardComponent` (3
colonnes + colonne « non triée »), sélecteur de vue sur `RoadmapBoardComponent`. Glisser-déposer
souris (Pointer Events natifs, pas de CDK DragDrop — ADR-007) et clavier (flèches gauche/droite
entre colonnes), rollback optimiste sur échec réseau, aucun gating de rôle côté client (le
fail-closed backend + rollback est la seule autorité, AC sécurité), horizon restitué aux lecteurs
d'écran (AC A11y, WCAG 2.1 AA).

---
Item Type: US · Parent: F22.3 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Should
Stage: ⬜
Rôle: product-owner
Profils: Tous
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude par défaut EN18.10 (E40 adaptatif ultérieur)
Dépendances: EN22.1 (modèle temporel unique)
