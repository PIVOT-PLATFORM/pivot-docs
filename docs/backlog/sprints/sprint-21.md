# Sprint 21 — Agilité — Capacity Planning (v2)

> **Créé le 2026-07-21** — plan de **complétion à 100 % des domaines Agilité & Collaboration**,
> séquencé **S17→S31** (Agilité d'abord, puis Collaboration). Vue d'ensemble :
> [README §Complétion Agilité & Collaboration](./README.md).
>
> **Phase** : phase-3 · E11 Capacity Planning (2e lot, F11.5→F11.8 + enablers). **Sortie** : le
> moteur de calcul de capacité complet — cadence SAFe (sprint/incrément/PI), jours ouvrés vs
> ouvrables, facteur de concentration, ajustement vélocité N-1 et maturité agile, capacité nette
> consolidée, import automatique des absences (connecteur SI RH), gouvernance RGPD & éthique, et
> le moteur/connecteurs + KPI qui les portent.
>
> **Cible** : modulith `pivot-core` (module `fr.pivot.agilite.*`) + `pivot-ui` (ADR-030).
>
> **Dépendances** : suite directe de S20 (F11.1→F11.4 livrés). S'appuie sur `EN22.3` (E22
> Roadmap, calendriers/jours fériés par localité) pour `US11.6.1` — si `EN22.3` n'est pas encore
> livré à ce stade, traiter en dépendance bloquante à lever avant Gate 1 de `US11.6.1`. E50 PI
> Planning (S19) consomme `US11.5.1` (cadence PI SAFe) livré ici — voir note de couplage
> croisé dans `sprint-19.md`. `US11.6.6` (alerte visuelle de dépassement de capacité, mentionnée
> au périmètre E11) n'a pas de fichier US écrit et n'est pas reprise dans ce sprint.
>
> **Statut** : ⬜ planifié — non démarré. **Gate 1 READINESS (PO Agent) à réaliser au démarrage
> du sprint** (DoR — AC Given/When/Then + cas d'erreur + sécurité), même protocole que les sprints précédents.

## Items (11)

| Item | Titre | Size | Priorité | 🤖 Dev |
|------|-------|------|----------|--------|
| US11.5.1 | Cadence : sprint / incrément / PI (SAFe) | M | High | ⬜ |
| US11.5.2 | Période de sprint : API préconfigurée ou durée manuelle | L | High | ⬜ |
| EN11.1 | Moteur de capacité & connecteurs (période, absences, calendriers) | XL | High | ⬜ |
| US11.6.1 | Jours ouvrables vs jours ouvrés | L | High | ⬜ |
| US11.6.2 | Facteur de concentration (% max par jour moyen) | M | High | ⬜ |
| US11.6.3 | Ajustement par la vélocité du sprint précédent | L | High | ⬜ |
| US11.6.4 | Ajustement par la maturité agile | M | Medium | ⬜ |
| US11.6.5 | Capacité nette consolidée (membre → sprint → incrément/PI) | L | High | ⬜ |
| US11.7.1 | Import automatique des absences (SI RH / absence) | XL | High | ⬜ |
| US11.8.1 | RGPD & éthique des données de capacité | M | High | ⬜ |
| EN11.2 | Exposer les KPI du domaine (producteur KpiRef) | S | Medium | ⬜ |

> **Couverture** : ce sprint fait partie de la séquence S17→S31 garantissant **aucune US/Enabler des
> domaines Agilité/Collaboration non planifiée**. Items regroupés par feature ; l'ordre d'attaque suit les dépendances.
