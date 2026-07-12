---
title: Cockpits DSI — conseils UX/UI
sidebar_position: 10
description: Modèle de conception des cockpits (consoles de pilotage) adaptés à plus d'une centaine de profils DSI.
---

Ce document cadre la conception des **cockpits** — les consoles de pilotage depuis
lesquelles un DSI administre le déploiement de PIVOT dans son organisation
(activation des domaines, adoption, sécurité, conformité). L'enjeu : servir plus
d'une centaine de profils DSI sans multiplier les écrans.

## Principe fondateur : un système de composition, pas cent cockpits

Cent profils ne veulent pas dire cent maquettes. On conçoit **un système de
composition** : un catalogue canonique de cards (widgets) et des règles qui
assemblent le bon cockpit selon le profil. C'est la transposition à l'UI de la
philosophie « domaines activables » de la plateforme — on maintient ~30 cards de
qualité plutôt que 100 pages qui divergent.

## Réduire les 100+ profils à 5–7 archétypes

Les profils sont des variantes sur quelques axes. On les regroupe selon les
dimensions qui changent réellement l'écran :

- **Taille / complexité** de l'organisation (mono-tenant simple vs multi-entités).
- **Secteur** — régulé (santé, finance, public soumis au RGAA) vs non régulé.
- **Job-to-be-done dominant** — gouvernance & conformité, sécurité, coût, adoption,
  ou exploitation technique.
- **Maturité technique** — profil « ops » (logs, monitoring) vs profil « métier »
  (adoption, ROI).

On obtient 5 à 7 archétypes. Le cockpit par défaut est déterminé par l'archétype
(assigné à l'onboarding ou inféré du contexte tenant), puis affinable par
l'utilisateur.

## Axe de composition : les trois domaines + une couche transverse

Le catalogue s'organise selon les domaines fonctionnels de la plateforme, plus une
couche transverse toujours présente :

| Registre | Cards (exemples) | Visibilité |
| --- | --- | --- |
| Pilotage | Adoption roadmap, santé du portefeuille projets | Si domaine activé |
| Agilité | Vélocité, régularité des standups, capacity | Si domaine activé |
| Collaboratif | Usage whiteboard / sessions live / quiz / formulaires | Si domaine activé |
| Transverse | Sécurité & OIDC, RGPD, RGAA, conformité AGPL, adoption globale, ROI vs SaaS | Toujours |

Une card de domaine n'apparaît que si le domaine est activé pour le tenant : un
cockpit qui affiche des cards « quiz » à une organisation n'ayant activé que le
Collaboratif crée du bruit.

![Modèle de composition du cockpit DSI](diagrams/cockpits-dsi-composition.png)

> Source PlantUML : [`diagrams/cockpits-dsi-composition.puml`](diagrams/cockpits-dsi-composition.puml) — le PNG est généré en CI.

## Architecture en trois couches

1. **Défaut par archétype** — l'utilisateur arrive sur un cockpit déjà pertinent,
   zéro configuration requise.
2. **Personnalisation encadrée** — il réorganise, épingle, masque des cards, choisit
   sa densité, mais dans des garde-fous : certaines cards obligatoires (posture
   sécurité, conformité) ne sont jamais masquables.
3. **Gouvernance de la personnalisation** — un DSI définit le cockpit par défaut de
   ses sous-administrateurs. Sans cette couche, 100 profils deviennent 100
   configurations ingérables au support.

## Règles d'UI

- **Règle des 3 secondes** — le haut de page répond à « est-ce que tout va bien ? ».
  Bandeau de statut (santé instance, incidents, alertes conformité, correctifs de
  sécurité en attente), puis KPI clés, puis drill-down. L'état « OK » doit être aussi
  lisible que l'état « alerte ».
- **Anatomie de card rigoureuse** — titre, valeur principale, tendance, action
  contextuelle, et tous les états : chargement (skeleton), vide, erreur, et *sans
  permission* (masquée ou grisée selon le rôle). Les états vides sont critiques : avec
  100 profils, beaucoup d'écrans de premier lancement seront vides.
- **Modes de densité** (confortable / compact) — les profils DSI aiment la donnée
  dense mais scannable.
- **Actionnabilité protégée** — un cockpit permet d'agir (activer un domaine, inviter
  un utilisateur), mais toute action destructrice (désactivation, suppression) passe
  par une confirmation explicite, jamais en un clic.

## Accessibilité

L'accessibilité n'est pas optionnelle : dans le secteur public français, le RGAA est
une obligation légale. La cible WCAG 2.1 AA doit être vérifiable dans le cockpit
lui-même — contrastes, navigation clavier, focus visible, attributs ARIA sur les
graphes et les cards.

## Implémentation

- Les cards sont des composants de `pivot-design-system` (Angular CDK + SCSS BEM),
  documentés dans Storybook. Les archétypes sont des **compositions** de ces
  composants ; la variance est gouvernée par les design tokens et les variantes, pas
  par du code jetable par profil.
- Dans le workflow ACDD, l'artefact figé en Gate 4 n'est pas « le cockpit de tel
  profil » mais **le contrat du catalogue** : liste des cards, rôles autorisés, états,
  et règles d'assemblage par archétype. Un seul contrat à spécifier et tester,
  décliné en 5–7 compositions.
