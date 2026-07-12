# US23.2.2 — Tableaux de bord personnalisables

## Contexte

- **US** : `docs/backlog/EPIC-portefeuille/FEATURES/portefeuille-comites/us-tableaux-bord-personnalisables.md`
  (F23.2 — Portefeuille, EPIC-portefeuille), Sprint 10
- **PR** : `pivot-pilotage-core`
  [#60](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/60)
  (`feat/us23-2-2-dashboards-personnalisables`) — backend uniquement, `pivot-pilotage-ui` restant
- **Dernier commit au moment du figeage** : `pivot-pilotage-core` `0f74b02` — `feat(portfolio):
  US23.2.2 — tableaux de bord personnalisables`
- **Commit de merge** : `ef52f76` (mergé 2026-07-12T14:01:13Z)
- **Gate 4 MERGE_CONFIDENCE** : `pivot-pilotage-core` 100/100 — MERGE_AUTONOMOUS
- **Dépend de** : EN18.9 (`ApplicationConsolidationService`, déjà mergé, réutilisé pour 2 des 3
  widgets) ; aucune dépendance dure sur US23.2.1/US23.2.4 (découplage volontaire, voir § Spec
  fonctionnelle)
- Closes #52

---

## Spec fonctionnelle

Package `fr.pivot.pilotage.dashboard` — dashboards personnalisables par utilisateur (E23
Portefeuille, F23.2 portefeuille-comites).

### Persistance

Deux tables nouvelles dans le schéma `pilotage` :

- **`pilotage.dashboard_config`** (1 par tenant/team/user — `UNIQUE (tenant_id, team_id,
  user_id)`) : `profile` (label libre, pas d'enum), `view_mode` (`SYNTHETIC`/`DETAILED`).
- **`pilotage.dashboard_widget`** (0..N par dashboard, `ON DELETE CASCADE`) : catalogue fermé de
  3 types (`widget_type CHECK IN ('PORTFOLIO_STATUS_SUMMARY','WEATHER_ALERTS','STRATEGIC_MILESTONES')`),
  disposition sur une grille 4 colonnes (`grid_row`/`grid_column`/`grid_width`/`grid_height`,
  bornée par `CHECK` : `grid_column` 0..3, `grid_width`/`grid_height` 1..4,
  `grid_column + grid_width <= 4`), `application_id NOT NULL REFERENCES pilotage.application(id)
  ON DELETE CASCADE` (tous les widgets actuels sont scopés à une Application).

`user_id` sans FK — restriction CLAUDE.md : FK cross-schéma uniquement vers
`public.tenants(id)`/`public.teams(id)`, jamais `public.users(id)` ; même principe de « référence
logique » déjà utilisé par `pilotage.assignment.resource_ref`.

### Catalogue de 3 widgets

- `PORTFOLIO_STATUS_SUMMARY` — répartition des projets par `ProjectPlanningStatus`, réutilise
  EN18.9 (`ApplicationConsolidationService`) inchangé.
- `STRATEGIC_MILESTONES` — jalons stratégiques de l'application, même source EN18.9.
- `WEATHER_ALERTS` — 100 % SPI (`PortfolioIndicatorSource`), aucune donnée propre ; s'affiche
  « indisponible » tant qu'aucune source réelle n'est branchée.

### Alertes de tension (AC2)

Seam SPI `PortfolioIndicatorSource` (mirroring `ApplicationDataContributor` d'EN18.9) :
`indicatorFor(tenantId, applicationId, kind)` où `kind ∈ {PROGRESS, WEATHER}`. Seul
`NoOpPortfolioIndicatorSource` (toujours vide) est câblé aujourd'hui — les seuils métier
(« retard, dépassement, surcharge ») sont explicitement délégués à la future US23.2.4 météo,
jamais inventés ici. Chaque snapshot (`PortfolioIndicatorSnapshot`) porte un `AlertLevel`
(`NONE`/`WARNING`/`CRITICAL`) et un label texte obligatoire — jamais de couleur seule (A11y AC).

### Découplage documenté

- **US23.2.1** (vue portefeuille consolidée, PR parallèle #65, non mergée au moment de
  l'implémentation) : non bloquant — les widgets lisent directement EN18.9, pas un agrégat
  multi-application hypothétique.
- **US23.2.4** (météo) : seam SPI, aucune logique de seuil inventée ici.

### Endpoints REST (gap-era)

`GET`/`PUT /tenants/{tenantId}/teams/{teamId}/users/{userId}/dashboard` —
`tenantId`/`teamId`/`userId` en path variables explicites (pas de `TenantContext`, CLAUDE.md
§gap) :

- **GET** : retourne le layout de l'utilisateur, ou un défaut frais (jamais persisté) si aucun
  n'existe — `viewMode=SYNTHETIC`, `widgets` vides, `profile`/`updatedAt` `null`.
- **PUT** : remplace intégralement le layout (profil, viewMode, liste complète de widgets) —
  full-replace, pas de CRUD par widget ; toute la requête est validée avant toute écriture (AC
  error 400, rien persisté sur un widget invalide).

### Décision PO Agent notable (AC sécurité)

L'AC « accès à la configuration d'un autre utilisateur → 404 » est implémentée comme **200 avec
le layout propre à l'utilisateur du chemin, ou un défaut frais uniforme si absent — jamais le
layout réel d'un autre utilisateur** — plutôt qu'un 404 littéral. Rationale documentée dans le
JavaDoc de `DashboardController` : un split 404/200 révélerait lui-même si un `userId` a un
dashboard configuré (oracle) ; l'uniformité « own-or-default » est une posture de non-divulgation
au moins aussi forte. Signalé explicitement pour arbitrage humain si un 404 littéral est préféré.

---

## Contrat technique

### Fichiers introduits/modifiés — `pivot-pilotage-core` (PR #60)

| Fichier | Rôle |
|---------|------|
| `V1__schema_init.sql` (modifié) | Tables `pilotage.dashboard_config` / `pilotage.dashboard_widget` |
| `spotbugs-exclude.xml` (modifié) | Exclusion ciblée `EI_EXPOSE_REP`/`EI_EXPOSE_REP2` sur `DashboardWidget.getDashboardConfig()`/`setDashboardConfig()` (association JPA `@ManyToOne`, pattern déjà utilisé pour `project`/`schedule`/`baseline`/`profile`) |
| `DashboardConfig.java` / `DashboardWidget.java` (nouveaux) | Entités JPA |
| `DashboardConfigRepository.java` (nouveau) | `findByTenantIdAndTeamIdAndUserId` (isolation) |
| `DashboardController.java` (nouveau) | `GET`/`PUT .../dashboard` |
| `DashboardService.java` (nouveau) | Logique métier : rendu widgets, validation save, découplage EN18.9/SPI |
| `DashboardExceptionHandler.java` / `ApiError.java` (nouveaux) | Mapping 400 |
| `InvalidDashboardConfigException.java` (code `VIEW_MODE_REQUIRED`) / `InvalidDashboardWidgetException.java` (codes `WIDGET_TYPE_REQUIRED`, `WIDGET_APPLICATION_REQUIRED`, `WIDGET_APPLICATION_NOT_FOUND`, `WIDGET_DISPOSITION_OUT_OF_BOUNDS`) (nouveaux) | Erreurs de validation 400 |
| `DashboardResponse.java` / `DashboardWidgetResponse.java` / `DashboardIndicatorView.java` / `StrategicMilestoneView.java` (nouveaux) | DTOs de réponse (records, copies défensives) |
| `SaveDashboardRequest.java` / `SaveDashboardWidgetRequest.java` (nouveaux) | DTOs de requête (PUT) |
| `DashboardViewMode.java` (`SYNTHETIC`/`DETAILED`), `DashboardWidgetType.java` (3 valeurs), `IndicatorStatus.java` (`AVAILABLE`/`UNAVAILABLE`), `AlertLevel.java` (`NONE`/`WARNING`/`CRITICAL`) (nouveaux) | Enums |
| `PortfolioIndicatorSource.java` / `PortfolioIndicatorKind.java` (`PROGRESS`/`WEATHER`) / `PortfolioIndicatorSnapshot.java` / `NoOpPortfolioIndicatorSource.java` (nouveaux) | SPI tension |
| 6 fichiers de test (nouveaux) | Voir § Tests |

### Endpoints

| Endpoint | Codes retour |
|----------|--------------|
| `GET /tenants/{tenantId}/teams/{teamId}/users/{userId}/dashboard` | `200` (layout propre à l'utilisateur, ou défaut frais — jamais 404, voir § Décision PO Agent) |
| `PUT /tenants/{tenantId}/teams/{teamId}/users/{userId}/dashboard` | `200` (layout rafraîchi) · `400` (`ApiError` : `VIEW_MODE_REQUIRED` / `WIDGET_TYPE_REQUIRED` / `WIDGET_APPLICATION_REQUIRED` / `WIDGET_APPLICATION_NOT_FOUND` / `WIDGET_DISPOSITION_OUT_OF_BOUNDS`) — rien persisté sur un 400 |

Aucun rôle/gate d'édition ici (contrairement à `WbsEditPolicy` ailleurs) — enregistrer son propre
dashboard n'est pas une permission de type « membre de projet », c'est inhérent à la possession
de la ressource ; la sécurité repose structurellement sur le scoping (`tenant_id`, `team_id`,
`user_id`) de la requête.

### Gap-era — `actorRef`

Pas de contrat `actorRef` ici — contrairement à US22.4.8 (audit trail `task_progress_history`),
cette US ne journalise pas d'auteur ; `tenantId`/`teamId`/`userId` gap-era restent de simples
path variables, remplacées par le principal authentifié une fois `pivot-core-starter`/
`TenantContext` consommable, sans changement de forme attendu.

---

## Cohérence avec les US adjacentes

| US | Relation |
|----|----------|
| EN18.9 (`ApplicationConsolidationService`) | Dépendance directe — réutilisée inchangée pour `PORTFOLIO_STATUS_SUMMARY`/`STRATEGIC_MILESTONES` |
| US23.2.1 (vue portefeuille consolidée, #65, PR parallèle) | Découplage volontaire documenté — les widgets lisent EN18.9 directement, jamais l'agrégat multi-application de US23.2.1 ; aucune dépendance dans un sens ou l'autre |
| US23.2.4 (météo, seuils métier) | Seam SPI `PortfolioIndicatorSource` posé sans logique de seuil — future US23.2.4 consommée une fois livrée, sans changement de contrat attendu ici (seul le no-op est câblé) |
| US23.1.2 (rapports exportables) | Hors périmètre explicite (backlog) |
| Packages `project`/`schedule`/`baseline`/`profile` (exclusion SpotBugs) | Pattern d'exclusion ciblée déjà établi, reconduit pour `DashboardWidget` |

---

## Écarts vs AC initiaux

Les 8 AC/error/security/A11y du backlog sont tous couverts, à une divergence assumée près :

### Security « accès à la configuration d'un autre utilisateur → 404 » — implémentée en 200 uniforme, pas en 404 littéral

Voir § Spec fonctionnelle « Décision PO Agent notable ». Propriété de sécurité testée (isolation
réelle) mais la forme HTTP diverge du libellé littéral de l'AC — signalé explicitement dans le
corps de la PR et le JavaDoc du contrôleur pour arbitrage humain.

### Définition des seuils d'alerte — reportée à US23.2.4 (hors périmètre backlog)

Le backlog exclut lui-même explicitement cette définition de cette US (« Hors périmètre ») ; AC2
est donc couverte comme un seam bout-en-bout (SPI + `AlertLevel` + rendu) plutôt que par un
calcul de seuil réel — cohérent avec le hors-périmètre documenté, pas un écart.

### A11y — conformité RGAA/WCAG effective non testable côté backend

Le contrat API porte systématiquement `AlertLevel` + `alertLabel` texte (jamais de couleur
seule), mais la conformité RGAA 4/WCAG 2.1 AA réelle (annonce lecteur d'écran, contraste, ARIA)
dépend du rendu `pivot-pilotage-ui`, non créé à ce stade.

---

## Tests

### `pivot-pilotage-core`

| Test | Comportement vérifié |
|---|---|
| `DashboardServiceTest` (18 cas) | Rendu (statut summary/milestones/weather, tri par position, tension overlay), validation save (8 cas d'erreur : viewMode manquant, widget type/application manquants, 5 variantes hors-bornes grille — chacun avec `verify(never()).save`), isolation utilisateur, save/replace |
| `DashboardServiceIT` (7 cas, Testcontainers) | `getDashboard_noneConfigured_returnsFreshDefault`, `saveThenGet_layoutIsPersistedAndReloadedOnNextOpen`, `statusSummaryWidget_reflectsRealConsolidationData`, `weatherWidget_rendersFakeSourceTension`, `saveDashboard_widgetTargetingForeignTenantApplication_rejected` (cross-tenant), `getDashboard_differentUserId_neverObservesAnotherUsersRealConfig`, `saveDashboard_rejectedSave_leavesPreviousDashboardUntouched` |
| `DashboardControllerIT` (7 cas) | Contrat HTTP : 200 (résultat service, défaut jamais configuré), 400 (profil vide, viewMode manquant avec corps `ApiError`, widget invalide avec corps `ApiError`), scoping `userId` différent |
| `DashboardSchemaIT` (9 cas, Testcontainers) | Colonnes attendues, NOT NULL, absence de FK sur `user_id`, FK vers `public.tenants`/`public.teams`, `UNIQUE (tenant_id, team_id, user_id)`, CASCADE ON DELETE, CHECK bornes de grille |
| `DashboardDtoTest` (7 cas) | `DashboardIndicatorView.unavailable()`, `PortfolioIndicatorSnapshot` (rejette label vide/level ou label null), `ApiError`, codes des 2 exceptions |
| `DashboardPojoTest` (13 cas) | Constructeurs, `@PrePersist`/`@PreUpdate` (`DashboardConfig` et `DashboardWidget`), `replaceWidgets` (remplacement complet, re-parenting), `getWidgets()` non modifiable |

Selon le corps de la PR : 517 tests, 0 échec — coverage 100 % sur le package `dashboard` (95,3 %
global, seuil `pom.xml` 80 %, seuil CLAUDE.md 85 %). Checkstyle/SpotBugs : 0 violation (exclusion
ciblée ajoutée, voir § Contrat technique). CI réelle (commentaire Gate 4) : 15/15 checks verts.

### `pivot-pilotage-ui`

Non créé à ce stade — rendu des widgets (grille, disposition), ARIA/annonce lecteur d'écran des
alertes, délégués au repo frontend.

---

## Hors périmètre (explicitement exclu)

- Définition des seuils métier déclenchant une alerte (retard, dépassement, surcharge) —
  US23.2.4 ; cette US se limite à l'affichage/personnalisation.
- Partage de tableaux de bord entre utilisateurs — non couvert.
- Création de rapports exportables à partir du tableau de bord — US23.1.2.
- Frontend `pivot-pilotage-ui`.
- 404 littéral sur l'accès à la configuration d'un autre utilisateur — remplacé par une posture
  200 uniforme (voir § Écarts), signalé pour arbitrage mainteneur.
