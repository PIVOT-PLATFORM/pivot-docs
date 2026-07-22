# Sprint 20 — Agilité — Capacity Planning (v1)

> **Créé le 2026-07-21** — plan de **complétion à 100 % des domaines Agilité & Collaboration**,
> séquencé **S17→S31** (Agilité d'abord, puis Collaboration). Vue d'ensemble :
> [README §Complétion Agilité & Collaboration](./README.md).
>
> **Phase** : phase-3 · E11 Capacity Planning (1er lot, F11.1→F11.4). **Sortie** : événements de
> capacité (création + vue calendrier), membres d'équipe et absences saisies manuellement,
> hiérarchie d'événements (Sprint sous PI), suivi de vélocité et burndown chart.
>
> **Cible** : modulith `pivot-core` (module `fr.pivot.agilite.*`) + `pivot-ui` (ADR-030).
>
> **Dépendances** : E11 s'appuie sur E03 Système de modules + E17 Infrastructure multi-repo + E15
> Équipes transverses (livré S17, FK `public.teams`). Interface avec E22 Roadmap (`EN22.3`,
> calendriers/jours fériés par localité) — hors périmètre de ce lot, à traiter en dette si
> `EN22.3` n'est pas encore livré au moment de l'implémentation. Ce sprint couvre F11.1→F11.4
> (événements, membres/absences manuelles, hiérarchie, vélocité/burndown) ; le moteur de calcul de
> capacité (F11.5→F11.8 + enablers) est livré en S21.
>
> **Statut** : 🔎 en cours (réconcilié 2026-07-22) — **Gate 1 READINESS réalisé sur les 7 items**
> (voir §État réel). Décisions Gate 1 notables : capacité nette **simplifiée et explicitement
> provisoire** pour ce lot (le moteur complet F11.6 reste Sprint 21, voir `US11.1.2`
> §Architecture) ; champ `motif` des absences **supprimé** du stub d'origine (contradiction directe
> avec la section RGPD de l'EPIC, voir `US11.2.2` §Architecture) ; aucun couplage de schéma avec
> `PiCycle` (E50 PI Planning, voir `US11.1.1`/`US11.3.1` §Architecture).

## Items (7)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US11.1.1 | Créer un événement de capacité | M | High | 🔧 Gate 1 fait — implémentation à faire |
| US11.1.2 | Visualiser la capacité de l'équipe sur un calendrier | M | High | 🔧 Gate 1 fait — implémentation à faire, dépend d'US11.1.1/US11.2.2 |
| US11.2.1 | Gérer les membres de l'équipe et leur disponibilité | S | High | 🔧 Gate 1 fait — implémentation à faire, dépend d'US11.1.1 |
| US11.2.2 | Saisir les absences et jours non disponibles | M | High | 🔧 Gate 1 fait — implémentation à faire, dépend d'US11.2.1 |
| US11.3.1 | Créer une hiérarchie d'événements (Sprint sous PI Planning) | M | Medium | 🔧 Gate 1 fait — implémentation à faire, dépend d'US11.1.1 |
| US11.4.1 | Saisir la vélocité réelle d'un sprint | S | High | 🔧 Gate 1 fait — implémentation à faire, dépend d'US11.1.2 |
| US11.4.2 | Visualiser le burndown chart du sprint | M | Medium | 🔧 Gate 1 fait — implémentation à faire, dépend d'US11.4.1 |

## État réel — Gate 1 (2026-07-22)

> **Les 7 stubs ont été réécrits en AC Gate-1-complètes** (Given/When/Then, cas d'erreur,
> sécurité, A11y, notes d'implémentation backend/frontend) — voir chaque fichier US pour le détail.
> Décisions d'architecture notables, documentées dans les fichiers concernés :
>
> - **Capacité nette simplifiée** (`US11.1.2` §Architecture) : `(jours ouvrés × disponibilité
>   moyenne) − absences`, weekends exclus, **aucun jour férié déduit** (US11.6.1/`EN22.3`, S21),
>   aucun facteur de concentration ni ajustement vélocité/maturité (F11.6, S21) — réponse API
>   explicitement marquée `isProvisional: true` pour ne jamais laisser croire à une précision
>   qu'elle n'a pas.
> - **RGPD — champ `motif` des absences supprimé** (`US11.2.2` §Architecture) : le stub d'origine
>   demandait `{ memberId, dateDebut, dateFin, motif }`, en contradiction directe avec la section
>   RGPD de l'EPIC (« jamais les motifs ni données de santé »). Le POC de référence PouetPouet
>   porte un champ `reason` libre — délibérément non repris. Décision mainteneur explicite
>   (2026-07-22).
> - **Aucun couplage avec `PiCycle`** (E50 PI Planning, `pivot-core#259`) : le type d'événement
>   `PI_PLANNING` de ce module (`US11.1.1`) et la hiérarchie PI→Sprint (`US11.3.1`) sont
>   indépendants du modèle `fr.pivot.agilite.pi.PiCycle`/`PiIteration` — même principe de
>   non-couplage déjà appliqué à `US50.1.1`↔`US11.5.1`.
> - **Référence POC** : un module `capacity` réel existe dans PouetPouet
>   (`apps/api/src/modules/capacity/`, `apps/web/src/lib/capacity.ts`) — exploité pour l'UX de
>   listing/formulaire/historique, **mais pas son moteur de calcul complet** (`fte`/`focusFactor`/
>   `hoursPerDay`/`pointsPerPersonDay`), qui correspond au périmètre F11.6 différé. `US11.4.2`
>   (burndown) n'a pas d'équivalent dans le POC — conçu directement à partir de l'AC du stub.
>
> **Couverture** : ce sprint fait partie de la séquence S17→S31 garantissant **aucune US/Enabler des
> domaines Agilité/Collaboration non planifiée**. Items regroupés par feature ; l'ordre d'attaque suit les dépendances.
