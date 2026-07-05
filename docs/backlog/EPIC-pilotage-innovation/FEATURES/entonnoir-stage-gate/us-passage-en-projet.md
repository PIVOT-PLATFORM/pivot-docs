# US38.3.3 — Passage d'une innovation en projet

**En tant que** responsable innovation
**Je veux** **convertir** une innovation validée en **projet** du portefeuille (roadmap E22 / portefeuille E23)
**Afin de** assurer la continuité innovation → delivery sans rupture

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une innovation « go » en fin d'entonnoir, when je la convertis, then un projet est créé/relié dans E22/E23 (via bus + deep-link, pas de FK — ADR-006/008) | ⬜ |
| Given le projet issu, when il avance, then son statut remonte à la fiche innovation d'origine | ⬜ |
| Error : given une innovation qui n'a pas reçu de décision de gate « go » (US38.3.2), when je tente de la convertir en projet, then la conversion est refusée avec message explicite | ⬜ |
| Security : seul un rôle habilité (responsable innovation) peut déclencher la conversion ; l'événement bus transporte uniquement les données nécessaires à la création du projet (pas l'historique complet de l'idée), conformément à l'absence de FK inter-modules (ADR-006/008) | ⬜ |
| A11y : l'action de conversion et l'affichage du statut remonté depuis le projet sur la fiche innovation sont accessibles au clavier et annoncés aux lecteurs d'écran (WCAG 2.1 AA) | ⬜ |

## Hors périmètre
- La décision de gate « go » elle-même (US38.3.2) — cette US suppose une décision déjà prononcée et se contente de la déclencher
- La gestion du projet une fois créé dans E22/E23 (planification, suivi détaillé) — hors périmètre de ce module SMI
- La reconversion ou l'annulation d'une conversion déjà effectuée — non demandée ici

## Notes d'implémentation
- Aucune FK directe entre le schéma `pilotage` et E22/E23 : la création du projet se fait via un événement publié sur le bus PIVOT, consommé par E22/E23, avec un deep-link stocké côté innovation pour la navigation (cf. ADR-006 multi-repo, ADR-008 référencé mais non encore rédigé au moment de cette US)
- La remontée de statut (projet → fiche innovation) est asynchrone, via le même bus : prévoir un état transitoire (« conversion en cours ») tant que l'événement de création n'a pas été acquitté par E22/E23
- Le lien innovation ↔ projet doit rester consultable même si l'un des deux repos est temporairement indisponible (dégradation gracieuse du deep-link, pas de couplage synchrone)

---
Item Type: US · Parent: F38.3 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 · E22 · E23
