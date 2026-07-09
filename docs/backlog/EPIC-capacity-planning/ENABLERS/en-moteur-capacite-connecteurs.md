# EN11.1 — Moteur de capacité & connecteurs (période, absences, calendriers)

**Type d'enabler** : architecture · intégration

**Objectif technique** : Moteur calculant la **capacité nette** par membre → sprint → incrément/PI, à partir de :
`jours ouvrés (jours ouvrables − weekends − fériés localité − absences) × quotité × facteur de concentration`, ajustée par la **vélocité N-1** et la **maturité agile**.

Connecteurs :
- **Période de sprint** : API agile préconfigurée (Jira, Azure DevOps…) → dates de sprint, sinon durée manuelle.
- **Absences** : SI RH/absence (SAP, Workday, Lucca…) — périodes seules (RGPD).
- **Calendriers & jours fériés** : réutilise [EN22.3](pathname:///pivot-docs/backlog/EPIC-roadmap/) via le bus PIVOT (pas de FK inter-modules — ADR-006/008).

**RGPD-by-design** : minimisation (indisponibilités, pas les motifs), agrégation équipe par défaut, traçabilité, base légale.

**Critères de complétion** :
- [ ] Moteur capacité paramétrable (jours ouvrés, focus factor, quotité, marge par maturité, vélocité)
- [ ] Connecteur période sprint (API préconfigurée) + fallback durée
- [ ] Connecteur absences (SI RH) + fusion avec saisie manuelle, RGPD-minimisé
- [ ] Réutilisation calendriers/fériés (EN22.3) via bus PIVOT
- [ ] Recalcul en cascade membre → sprint → incrément/PI

---
Item Type: Enabler · Parent: E11 · Module: agilite · Phase: phase-3 · Size: XL · Priority: High
Stage: ⬜
Dépendances: EN22.3 (calendriers/absences) · bus PIVOT (ADR-008)
