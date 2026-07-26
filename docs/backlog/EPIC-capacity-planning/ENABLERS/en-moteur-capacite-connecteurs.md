# EN11.1 — Moteur de capacité & connecteurs (période, absences, calendriers)

**Type d'enabler** : architecture · intégration

**Gate 1 réalisé le 2026-07-22** — périmètre resserré (décision mainteneur, voir US11.5.2/
US11.6.1/US11.7.1 pour le détail de chaque écart) : la partie **moteur** reste intégrale, la
partie **connecteurs** est réduite à ce qui est réellement livrable dans ce sprint.

**Objectif technique** : Moteur calculant la **capacité nette** par membre → sprint → incrément/PI,
à partir de :
`jours ouvrés (jours ouvrables − weekends − fériés tenant − absences) × quotité × facteur de concentration`,
ajustée par la **vélocité N-1** et la **maturité agile** — voir US11.6.1→US11.6.5 pour le détail
Given/When/Then, portées par `CapacityCalculator` (S20, étendu ce lot).

**Connecteurs — périmètre resserré au Gate 1** :

- **Période de sprint** : ~~API agile préconfigurée (Jira, Azure DevOps…)~~ **fermé, redondant
  avec la saisie manuelle déjà livrée** (S20, `CapacityEvent.startDate`/`endDate`) — voir
  US11.5.2 §Décision Gate 1. Aucun connecteur agile temps réel construit.
- **Absences** : ~~SI RH/absence nommé (SAP, Workday, Lucca…)~~ **import CSV générique** — voir
  US11.7.1 §Architecture. Périodes seules (RGPD), fusionné avec la saisie manuelle via la même
  entité `CapacityAbsence` (US11.2.2), déduplication exacte au import.
- **Calendriers & jours fériés** : ~~réutilise EN22.3 via le bus PIVOT~~ **liste de jours fériés
  interne, minimale, au niveau tenant** — voir US11.6.1 §Architecture. `EN22.3`/E22 Roadmap a été
  extrait vers le produit Pilotage distinct, cette dépendance ne sera jamais levée à l'intérieur
  de PIVOT.

**RGPD-by-design** : minimisation (indisponibilités, pas les motifs — appliquée dans le code
depuis US11.2.2/S20, reconduite par l'import CSV US11.7.1), agrégation équipe par défaut
(US11.8.1), traçabilité, base légale.

**Critères de complétion** :

- [x] Moteur capacité paramétrable (jours ouvrés, focus factor, quotité, marge par maturité,
      vélocité) — US11.6.1→US11.6.5
- [x] ~~Connecteur période sprint (API préconfigurée)~~ Fallback durée manuelle (seul chemin
      retenu) — US11.5.2, déjà livré en S20
- [x] Connecteur absences — **import CSV** (pas SI RH nommé) + fusion avec saisie manuelle,
      RGPD-minimisé — US11.7.1
- [x] ~~Réutilisation calendriers/fériés (EN22.3) via bus PIVOT~~ Liste de jours fériés interne
      minimale (substitut permanent, EN22.3 hors de portée de PIVOT) — US11.6.1
- [x] Recalcul en cascade membre → sprint → incrément/PI — US11.6.5

---
Item Type: Enabler · Parent: E11 · Module: agilite · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Dépendances: aucune (dépendance `EN22.3` levée par substitution, voir US11.6.1)
