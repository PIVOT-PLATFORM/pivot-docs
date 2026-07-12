# Sprint 10 — Pilotage cœur PPM

> ✅ **Verrou Socle levé (2026-07-10).** Enchaîne Sprint 9 (dépend d'EN22.1). Contenu **inchangé au
> re-tri du 2026-07-10** : aucune dépendance à E40 (profil adaptatif) ni à l'habillage entreprise
> EN18.3-8 — pure valeur PPM. Voir [README §Séquencement](./README.md#sprints-713--plan-phase-3-conditionnel-au-jalon--socle-terminé-).

**Sortie :** release Pilotage v0 utilisable (roadmap + Gantt + portefeuille consolidé), sur profil
par défaut (EN18.10) — l'adaptation par profil (E40) reste en queue idéation.

> **EN22.2 reséquencé depuis Sprint 9 (2026-07-11)** : cet enabler (rendu virtualisé, recalcul
> incrémental, co-édition temps réel + undo/redo du Gantt) dépend du Gantt UI lui-même
> (US22.4.x, ci-dessous) — inexistant tant que ce sprint n'a pas livré. Il ne peut pas être
> implémenté avant. **Chevauchement à trancher au Gate 1** avec `US22.4.10c` (virtualisation du
> rendu déjà présente dans cette US) — éviter un double travail sur ce point précis.

**Gate 1 READINESS passé (2026-07-11)** — **24/24 items Ready** (≥ 70/100 ; 15 items ≥ 90).
ACs DoR complétés (erreur / sécurité 404-403 / A11y, cohérence avec le contrat figé EN22.1) sur
19 fiches. **1 réserve : US22.4.7 (72)** — le fractionnement (split) n'a **aucun porteur dans le
schéma EN22.1** (`pilotage.task` sans segments) → décision **D1** mainteneur (avenant schéma vs
enabler dédié) ; la moitié « chemin critique/marges » de l'US reste, elle, implémentable.
**Le socle S9 (schéma + moteur CPM + projection) permet d'attaquer la couche calcul/données
maintenant ; toute la surface REST/UI reste bloquée par `pivot-core-starter` (non publié).**
8 décisions consolidées (D1-D8) + ordre d'attaque → commentaire de la PR de ce Gate 1.

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| EN22.2 | Performance & collaboration web du Gantt *(reséquencé de Sprint 9, 2026-07-11)* | XL | High | ⬜ |
| US22.4.1a | WBS : modèle arborescent & numérotation *(ex-US22.4.1 XL, décomposée 2026-07-10)* | M | Critical | ✅ mergé (backend [pivot-pilotage-core#43](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/43), frontend [pivot-pilotage-ui#31](https://github.com/PIVOT-PLATFORM/pivot-pilotage-ui/pull/31)) |
| US22.4.1b | WBS : indent/outdent & réordonnancement | M | Critical | ✅ mergé (idem #43/#31 — livré avec US22.4.1a/c) |
| US22.4.1c | WBS : agrégation tâches récapitulatives & A11y | M | Critical | ✅ mergé (idem #43/#31 — livré avec US22.4.1a/b) |
| US22.4.2 | Durées, effort, planification auto vs manuelle | L | Critical | 🟡 backend mergé ([pivot-pilotage-core#49](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/49)) · frontend en cours |
| US22.4.3 | Dépendances typées (FS/SS/FF/SF) + retard/avance | L | Critical | ✅ mergé (backend [pivot-pilotage-core#47](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/47), frontend [pivot-pilotage-ui#28](https://github.com/PIVOT-PLATFORM/pivot-pilotage-ui/pull/28)) |
| US22.4.4 | Contraintes de date & échéances | M | High | ⬜ |
| US22.4.5 | Calendriers ouvrés & exceptions | L | High | ✅ mergé (backend [pivot-pilotage-core#45](https://github.com/PIVOT-PLATFORM/pivot-pilotage-core/pull/45), frontend [pivot-pilotage-ui#30](https://github.com/PIVOT-PLATFORM/pivot-pilotage-ui/pull/30)) |
| US22.4.6 | Jalons & tâches périodiques | M | Medium | ⬜ |
| US22.4.7 | Chemin critique, marges & fractionnement | L | High | ⬜ |
| US22.4.8 | Suivi d'avancement (% réalisé, réel/restant) | L | High | ⬜ |
| US22.4.9 | Baselines multiples & analyse des écarts | L | High | ⬜ |
| US22.4.10a | Déplacement/redimensionnement des barres & lien par glisser *(ex-US22.4.10 XL)* | L | Critical | ⬜ |
| US22.4.10b | Zoom de l'échelle de temps & poignée d'avancement | M | Critical | ⬜ |
| US22.4.10c | Virtualisation du rendu & édition clavier accessible | L | Critical | ⬜ |
| US22.6.1a | Socle multi-vues & vues temporelles (Gantt, Chronologie, Calendrier) *(ex-US22.6.1 XL)* | L | High | ⬜ |
| US22.6.1b | Vues Réseau (PERT) & Tableau/Kanban | L | High | ⬜ |
| US22.6.1c | Vues ressources (Feuille de ressources & Utilisation) | M | High | ⬜ |
| US22.6.2 | Colonnes, filtres, regroupements & tri | L | High | ⬜ |
| US23.1.1 | Tableau de bord portefeuille projets | L | High | ⬜ |
| US23.1.2 | Générer un rapport d'avancement du portefeuille | M | Medium | ⬜ |
| US23.2.1 | Vue portefeuille consolidée | L | Critical | ⬜ |
| US23.2.2 | Tableaux de bord personnalisables | L | Critical | ⬜ |
| US23.2.4 | Météo et indicateurs normalisés | S | High | ⬜ |

> **E23 vague 2 → post-S12** (US23.2.3 revues/comités, US23.2.5 programmes, US23.2.6 plans stratégiques, US23.2.7/23.2.8 what-if & business cases, US23.2.9/23.2.10 livrables & valeur publique). US22.6.3/22.6.4 (mise en forme, exports) en fin de sprint si capacité.
