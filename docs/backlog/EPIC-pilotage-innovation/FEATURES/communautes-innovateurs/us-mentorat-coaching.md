# US38.12.4 — Mentorat & coaching

**En tant que** porteur d'innovation
**Je veux** être mis en relation avec un **mentor/coach** d'innovation et suivre l'accompagnement
**Afin de** sécuriser la maturation des idées par l'expérience

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un besoin d'accompagnement, when je demande un mentor, then un mentor pertinent est proposé et l'accompagnement (sessions, objectifs) est suivi | ⬜ |
| Error : given aucun mentor disponible correspondant au besoin, when je demande un accompagnement, then je reçois un message explicite (pas de mentor imposé hors sujet) et ma demande reste visible pour un traitement ultérieur | ⬜ |
| Security : la mise en relation mentor/porteur requiert l'acceptation du mentor (opt-in, cf. US38.12.2) ; seuls le mentor, le porteur et le responsable innovation ont accès au suivi de l'accompagnement (objectifs, notes de session) | ⬜ |
| A11y : la demande de mentorat et le suivi des sessions/objectifs sont utilisables au clavier et restitués correctement par lecteur d'écran | ⬜ |

## Hors périmètre
- Recherche de mentors externes à l'organisation (uniquement les profils déjà enregistrés dans Pivot)
- Visioconférence ou outils de session intégrés (l'accompagnement s'appuie sur les modules existants, ex. Session E19, pas un nouvel outil)
- Évaluation formelle du mentor (notation, certification) — hors périmètre de cette US

## Notes d'implémentation
- S'appuie sur les profils d'innovateurs (US38.12.2) pour identifier les mentors disponibles (compétences, opt-in mentorat)
- Le suivi d'accompagnement (sessions, objectifs) doit être rattaché à l'idée/POC concerné pour rester traçable dans le pipeline (US38.3.1)
- La proposition de mentor peut réutiliser le mécanisme de suggestion du matchmaking IA (US38.11.5) sans en dépendre strictement (dégradation possible en mise en relation manuelle)

---
Item Type: US · Parent: F38.12 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Low
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — fonctionnalités innovantes (IA gouvernée, intelligence collective, corporate venturing)
Dépendances: EN38.1 · EN38.2 (moteur IA & graphe)
