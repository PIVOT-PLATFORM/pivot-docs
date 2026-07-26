# US11.8.1 — RGPD & éthique des données de capacité

**En tant que** DPO / Scrum Master
**Je veux** garantir que les données de disponibilité/absence sont traitées de façon **minimale, transparente et non intrusive**
**Afin de** respecter la RGPD sur tous les sujets et rester éthique (pas de surveillance individuelle)

**Gate 1 réalisé le 2026-07-22** — remplace la version outline précédente.

**Architecture — US transverse de gouvernance, la minimisation technique est déjà livrée (Gate 1
— constat, pas une nouvelle décision)** : la minimisation des données d'absence (pas de motif, pas
de donnée de santé) est **déjà appliquée dans le code** depuis US11.2.2 (S20, `CapacityAbsence`
sans colonne motif, vérifié dans `CreateAbsenceRequest`) et reconduite dans US11.7.1 (import CSV,
même contrat). Cette US ne réintroduit donc **pas** de nouvelle contrainte technique sur ces deux
US — elle formalise le **registre de traitement**, la **documentation des droits des personnes**,
et une **garde applicative explicite contre le détournement en surveillance individuelle**, qui ne
sont pas encore couverts par du code.

## Critères d'acceptation

### Agrégation par défaut (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un appelant consultant la capacité d'une équipe, when il n'est **ni** le membre concerné **ni** créateur/gestionnaire de l'événement (US11.1.1 §Architecture), then il ne voit que les **agrégats d'équipe** (`GET .../events/{id}/summary`, US11.6.5) — jamais le détail nominatif par membre (`GET .../events/{id}/members`, US11.2.1, réservé aux gestionnaires de l'événement) | ⬜ |
| Given les KPI du domaine (EN11.2, quand livré), when ils sont exposés, then leur granularité documentée est **équipe**, jamais individuelle (cohérent avec `EN11.2` §KPI exposés, déjà posé en granularité équipe dans son fichier) | ⬜ |

### Droits des personnes (backend `pivot-core` + documentation)

| Critère | 🤖 Dev |
|---------|--------|
| Given un membre souhaitant exercer un droit d'accès sur ses propres absences, when il consulte `GET .../events/{id}/members/{memberId}/absences` **pour lui-même**, then 200 OK — l'accès à ses propres données n'est jamais restreint, y compris pour un membre non-gestionnaire de l'événement | ⬜ |
| Given une demande de rectification ou d'effacement d'une absence, when elle est traitée, then les endpoints existants (`DELETE .../absences/{absenceId}`, US11.2.2) suffisent — pas de nouvel endpoint dédié, référencé dans le registre de traitement comme mécanisme de rectification/effacement | ⬜ |

### Documentation (registre de traitement)

| Critère | 🤖 Dev |
|---------|--------|
| Given le module Capacity Planning, when le registre de traitement RGPD de PIVOT (`pivot-docs`, emplacement existant du registre — à localiser en implémentation, ne pas créer une nouvelle structure si un registre transverse existe déjà) est mis à jour, then il documente : base légale (intérêt légitime de planification d'équipe), finalité (capacité collective, jamais évaluation individuelle), durée de conservation (alignée sur celle de l'événement de capacité parent), catégories de données (périodes d'indisponibilité uniquement), destinataires (membres de l'équipe et gestionnaires de l'événement) | ⬜ |

### A11y (frontend `pivot-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| A11y : toutes les vues de capacité (`capacity-event-list`, `capacity-event-form`, `capacity-event-detail`, `capacity-burndown-chart`, S20 et ce lot) sont conformes **WCAG 2.1 AA** — audit ciblé de cette US sur l'ensemble du module plutôt qu'un ajout par écran (contraste, navigation clavier, `aria-live` sur les mises à jour de capacité) | ⬜ |

## Hors périmètre

- **Anonymisation/pseudonymisation des données d'absence** — non requise, l'agrégation par
  défaut (voir ci-dessus) suffit au principe d'éthique posé par l'EPIC ; les gestionnaires d'un
  événement voient légitimement le détail nominatif de leur propre équipe (nécessaire pour
  planifier).
- **Export/portabilité des données personnelles** au sens RGPD (droit à la portabilité) — hors
  périmètre de ce lot, mécanisme transverse PIVOT à traiter séparément si un besoin réel émerge.

## Notes d'implémentation

- **Backend** : pas de nouvelle entité. Vérification/durcissement de `CapacityMemberController`
  (US11.2.1) — confirmer que l'endpoint détail nominatif exige bien un rôle gestionnaire
  (créateur/membre de l'équipe avec droits de gestion, pas un simple "membre de l'équipe" en
  lecture large) ; ajuster si l'implémentation S20 était plus permissive que voulu ici. Registre de
  traitement : fichier markdown dans `pivot-docs` (registre transverse existant ou nouvelle entrée
  dédiée E11, à localiser/créer en implémentation).
- **Frontend** : audit A11y ciblé (outils déjà en place dans `pivot-ui` — Lighthouse CI existant,
  voir les autres modules agilité livrés cette session pour le niveau d'exigence attendu) sur
  l'ensemble des écrans `capacity-*` (S20 + ce lot), corrections ponctuelles plutôt qu'une
  refonte.

---
Item Type: US · Parent: F11.8 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: delegue-a-la-protection-des-donnees, scrum-master
Dépendances: EN11.1
