---
title: Événements — Collaboratif
sidebar_position: 5
description: Contrats d'événements du domaine collaboratif (whiteboard, session live, quiz, forms) — alimentation de la télémétrie d'usage et des cards d'adoption.
---

Domaine `collaboratif` — Whiteboard (E30), Session live (E19), MeetOps (E12), Mini-jeux (E47), et
Pivot Forms (E42, domaine `forms`). Ces événements sont la **source de la télémétrie d'usage**
(EN51.6) : aujourd'hui le whiteboard ne tient qu'une présence **en mémoire**, non persistée — publier
ces événements est ce qui rend les cards d'adoption possibles. Enveloppe commune :
[README](README.md#enveloppe-pivotevent-rappel-adr-025-2).

> **Minimisation** : les payloads d'usage ne portent que des **compteurs** (`participantCount`), jamais
> le contenu produit par les utilisateurs (contenu du board, réponses de quiz) — cf. cards C7 🟡
> « agrégés, jamais nominatifs ».

## `collaboratif.whiteboard.session.ended` · v1

- **Payload** : `{ sessionRef: string, teamRef?: string, participantCount: number, durationSec: number }`
- **Émis par** : `pivot-collaboratif-core` (E30) à la fermeture d'une session.
- **Consommé par** : télémétrie d'usage (EN51.6).
- **Cards** : *Usage whiteboard / live / quiz* (C7) · *Adoption globale* (Transverse).

## `collaboratif.session.live.ended` · v1

- **Payload** : `{ sessionRef: string, teamRef?: string, participantCount: number }`
- **Émis par** : Session live (E19).
- **Consommé par** : télémétrie.
- **Cards** : *Usage whiteboard / live / quiz* (C7).

## `collaboratif.quiz.completed` · v1

- **Payload** : `{ quizRef: string, teamRef?: string, responseCount: number }`
- **Émis par** : module quiz/session.
- **Consommé par** : télémétrie.
- **Cards** : *Usage whiteboard / live / quiz* (C7).

## `forms.form.submitted` · v1

- **Payload** : `{ formRef: string, submissionRef: string }` — **jamais** le contenu de la réponse si
  le formulaire est classifié sensible (US42.5.4).
- **Émis par** : `pivot-forms-core` (E42) · adaptateur Formbricks (même `type`, ADR-009 §5).
- **Consommé par** : workflows (E29), SMI (E38, F38.15), télémétrie — chacun **indépendamment**, sans
  couplage à Forms ; rejeu garanti à rétablissement du bus (pas de perte silencieuse).
- **Cards** : Adoption forms (C7, futur).
