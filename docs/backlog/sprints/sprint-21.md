# Sprint 21 — Agilité — Capacity Planning (v2)

> **Créé le 2026-07-21** — plan de **complétion à 100 % des domaines Agilité & Collaboration**,
> séquencé **S17→S31** (Agilité d'abord, puis Collaboration). Vue d'ensemble :
> [README §Complétion Agilité & Collaboration](./README.md).
>
> **Phase** : phase-3 · E11 Capacity Planning (2e lot, F11.5→F11.8 + enablers). **Sortie** : le
> moteur de calcul de capacité complet — cadence SAFe (sprint/incrément/PI), jours ouvrés vs
> ouvrables, facteur de concentration, ajustement vélocité N-1 et maturité agile, capacité nette
> consolidée, import CSV des absences, gouvernance RGPD & éthique.
>
> **Cible** : modulith `pivot-core` (module `fr.pivot.agilite.*`) + `pivot-ui` (ADR-030).
>
> **Dépendances** : suite directe de S20 (F11.1→F11.4 livrés, `pivot-core#261`/`pivot-ui#266`).
> `EN22.3` (E22 Roadmap, calendriers/jours fériés par localité) **n'est pas une dépendance
> temporaire** — E22 Roadmap a été extrait définitivement vers le produit Pilotage distinct
> (recentrage 2026-07-21), cette dépendance ne sera **jamais** levée à l'intérieur de PIVOT.
> `US11.6.1` la remplace par une liste de jours fériés interne minimale (voir §État réel).
> **Correction d'une note obsolète** : ce fichier indiquait qu'E50 PI Planning (S19) « consomme »
> `US11.5.1` — inexact, Gate 1 d'`US50.1.1` (`pivot-docs#299`) a explicitement découplé la cadence
> PI de Capacity Planning ; aucun couplage réel entre les deux modules. `US11.6.6` (alerte visuelle
> de dépassement de capacité) n'a toujours pas de fichier US écrit et n'est pas reprise ici.
>
> **Statut** : 🔎 en cours (réconcilié 2026-07-22) — **Gate 1 READINESS réalisé sur 9 items** (voir
> §État réel). `US11.5.2` **fermée** (redondante avec le socle S20, aucun développement). `EN11.2`
> reste `⬜ bloqué` (dépend d'`EN28.14`, non planifié — même situation que tous les autres
> enablers KPI de ce programme).

## Items (11)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US11.5.1 | Cadence : sprint / incrément / PI (SAFe) | M | High | 🔧 Gate 1 fait — implémentation à faire |
| US11.5.2 | Période de sprint : API préconfigurée ou durée manuelle | L | High | ✅ **fermée** — redondante avec le socle S20, aucun développement (voir §État réel) |
| EN11.1 | Moteur de capacité & connecteurs (période, absences, calendriers) | L | High | 🔧 Gate 1 fait — implémentation à faire, périmètre resserré (voir §État réel) |
| US11.6.1 | Jours ouvrables vs jours ouvrés | L | High | 🔧 Gate 1 fait — implémentation à faire, dépend d'EN11.1 |
| US11.6.2 | Facteur de concentration (% max par jour moyen) | M | High | 🔧 Gate 1 fait — implémentation à faire, dépend d'US11.6.1 |
| US11.6.3 | Ajustement par la vélocité du sprint précédent | L | High | 🔧 Gate 1 fait — implémentation à faire, dépend d'US11.4.1/US11.6.2 |
| US11.6.4 | Ajustement par la maturité agile | M | Medium | 🔧 Gate 1 fait — implémentation à faire, dépend d'US11.6.2/US11.6.3 |
| US11.6.5 | Capacité nette consolidée (membre → sprint → incrément/PI) | L | High | 🔧 Gate 1 fait — implémentation à faire, dépend d'US11.6.1→US11.6.4 |
| US11.7.1 | Import automatique des absences (SI RH / absence) | M | High | 🔧 Gate 1 fait — implémentation à faire, périmètre resserré (voir §État réel) |
| US11.8.1 | RGPD & éthique des données de capacité | M | High | 🔧 Gate 1 fait — implémentation à faire |
| EN11.2 | Exposer les KPI du domaine (producteur KpiRef) | S | Medium | ⬜ **bloqué** — dépend d'EN28.14, non planifié |

## État réel — Gate 1 (2026-07-22)

> **9 items ont été réécrits en AC Gate-1-complètes**, `US11.5.2` fermée, `EN11.2` marquée
> bloquée — voir chaque fichier pour le détail. Décisions d'architecture notables :
>
> - **`EN22.3` définitivement hors de portée, substitué par une liste de jours fériés interne**
>   (`US11.6.1` §Architecture) : E22 Roadmap a été extrait vers le produit Pilotage distinct — pas
>   une dépendance temporaire comme pour `US11.5.1`↔E50, mais une dépendance qui ne sera jamais
>   levée à l'intérieur de PIVOT. Substitut retenu : `CapacityHoliday(tenantId, date, label)`,
>   saisie manuelle par un administrateur tenant, sans la richesse multi-localité de la vision
>   `EN22.3` complète (pas de calendrier par membre/pays).
> - **Connecteurs SI RH/agiles externes non construits** (`US11.5.2` fermée, `US11.7.1`
>   redimensionnée) : aucun accès réel à Jira/Azure DevOps/SAP/Workday/Lucca n'est disponible pour
>   construire et vérifier une intégration OAuth/API réelle. `US11.5.2` (période de sprint auto)
>   est **fermée comme redondante** avec `CapacityEvent.startDate`/`endDate` (S20). `US11.7.1`
>   (absences SI RH) devient un **import CSV générique** — mêmes colonnes RGPD-minimales
>   qu'`US11.2.2` (aucun motif), résultat ligne par ligne, déduplication exacte.
> - **`EN11.1` resserré en conséquence** : le "moteur" (calcul, `US11.6.1`→`US11.6.5`) reste
>   intégral ; les "connecteurs" se réduisent à l'import CSV — taille revue XL → L.
> - **Cadence `US11.5.1` : extension du socle S20, pas de nouveau module** : ajout du type
>   `INCREMENT` (lot de sprints sans itération IP) à côté de `PI_PLANNING` (qui en a une), flag
>   `isIpIteration` sur les enfants `SPRINT` d'un `PI_PLANNING` — exclus de l'agrégation
>   `US11.6.5`. Aucun couplage avec `PiCycle` (E50), même principe qu'`US11.1.1`.
> - **`US11.6.5` étend `CapacityCalculator` (S20)** plutôt que de dupliquer sa logique — nouvelle
>   surcharge `summarize`/`aggregate` avec jours fériés/facteur/maturité/vélocité en paramètres ;
>   `isProvisional` devient `false` une fois tous les paramètres réels renseignés par l'appelant,
>   reste `true` par défaut sinon (signal honnête, pas une limitation du moteur).
> - **`US11.6.4` (maturité agile) sans équivalent direct dans le POC PouetPouet** — le module
>   `capacity` du POC (`apps/web/src/lib/capacity.ts`) n'a pas de barème de maturité ; les valeurs
>   par défaut (60/70/80 % focus, 20/10/5 % marge) viennent de l'EPIC PIVOT lui-même. `US11.6.2`/
>   `US11.6.3` en revanche mirent directement `computeMemberCapacity`/`summarizeHistory` du POC
>   (moyenne de vélocité pondérée par la taille du sprint, prévisionnel).
> - **`US11.8.1` (RGPD & éthique)** : la minimisation technique est déjà livrée depuis `US11.2.2`
>   (S20) et reconduite par `US11.7.1` — cette US formalise le registre de traitement et
>   l'agrégation par défaut, sans rouvrir de contrainte technique déjà posée.
>
> **Couverture** : ce sprint fait partie de la séquence S17→S31 garantissant **aucune US/Enabler des
> domaines Agilité/Collaboration non planifiée**. Items regroupés par feature ; l'ordre d'attaque suit les dépendances.
