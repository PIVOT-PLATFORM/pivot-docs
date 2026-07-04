# E11 — Module Capacity Planning

## Repo cible (architecture multi-repo)
- Backend : **`pivot-agilite-core`** (schéma Flyway `agilite`, FK → `public.teams.id`)
- Frontend : **`pivot-agilite-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase
⏸️ **phase-3** — VERROUILLÉ jusqu'à déclaration "MVP terminé" par le mainteneur

## Objectif

Outil d'aide à la **planification de capacité pour le sprint, l'incrément (lot de sprints) et le PI SAFe**. Il calcule la **capacité nette** d'une équipe sur une période, en tenant compte des absences, des jours réellement ouvrés, d'un facteur de concentration, de la vélocité passée et de la maturité agile — dans le respect strict de la RGPD et de l'éthique.

## Modèle de calcul

> **Capacité nette** = `jours ouvrés × quotité × facteur de concentration`, où
> **jours ouvrés** = jours ouvrables − weekends − jours fériés (localité) − absences ;
> puis **ajustée** par la vélocité du/des sprint(s) précédent(s) et la maturité agile.
> Consolidation en cascade : **membre → sprint → incrément / PI**.

- **Jours ouvrables vs ouvrés** (US11.6.1) : weekends & jours fériés par **pays/localité** exclus (réutilise EN22.3).
- **Facteur de concentration** (US11.6.2) : % max de temps productif par jour moyen (ex. 70 %), paramétrable.
- **Absences** : **saisie manuelle** (US11.2.2) **et/ou import automatique** depuis un SI RH/absence (SAP, Workday, Lucca…) (US11.7.1).
- **Période de sprint** : **récupérée automatiquement** via une API agile préconfigurée (Jira, Azure DevOps…) **ou** durée saisie manuellement (US11.5.2).
- **Vélocité N-1** (US11.6.3) & **maturité agile** (US11.6.4) : ajustent la capacité prévisionnelle et la marge d'incertitude.

## RGPD & éthique (transverse — US11.8.1)

**Minimisation** (seules les périodes d'indisponibilité, jamais les motifs ni données de santé), **agrégation au niveau équipe par défaut**, **pas de détournement en surveillance/notation individuelle**, base légale + registre + droits des personnes.

## Périmètre GitHub (phase-3)

### Features
- **F11.1 — Événements capacité** — US11.1.1 créer événement · US11.1.2 vue calendrier
- **F11.2 — Membres et absences** — US11.2.1 gérer membres · US11.2.2 saisir absences (manuel)
- **F11.3 — Hiérarchie événements** (Sprint sous PI) — US11.3.1
- **F11.4 — Velocity tracking** — US11.4.1 saisir vélocité réelle · US11.4.2 burndown chart
- **F11.5 — Cadence & période** — US11.5.1 sprint / incrément / **PI SAFe** · US11.5.2 période auto (API) ou durée manuelle
- **F11.6 — Calcul de capacité** — US11.6.1 jours ouvrables vs ouvrés · US11.6.2 facteur de concentration · US11.6.3 ajustement vélocité N-1 · US11.6.4 ajustement maturité agile · US11.6.5 capacité nette consolidée
- **F11.7 — Absences (import automatique)** — US11.7.1 connecteur SI RH/absence (SAP, Workday…)
- **F11.8 — RGPD & éthique** — US11.8.1 gouvernance des données de capacité

### Enablers
- **[EN11.1](ENABLERS/en-moteur-capacite-connecteurs.md)** — Moteur de capacité & connecteurs (période sprint, absences SI RH, calendriers/fériés via EN22.3) — **RGPD-by-design**

## Dépendances
- Dépend de : E03 Système de modules · E17 Infrastructure multi-repo · E15 Équipes transverses
- Interface avec : **E22 Roadmap** (calendriers/fériés/absences via EN22.3) · outils agiles (période de sprint, vélocité) via bus PIVOT
- Coordonné avec : E20 Rétrospective (agilité) · E19 Session

## Statut global
⬜ Backlog — Gate 1 PO Agent à effectuer au démarrage du sprint
