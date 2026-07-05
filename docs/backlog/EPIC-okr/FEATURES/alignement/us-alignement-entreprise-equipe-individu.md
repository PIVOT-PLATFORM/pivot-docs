# US27.3.2 — Alignement entreprise → équipe → individu

**En tant que** manager
**Je veux** décliner les OKR **entreprise → équipe → individu**, en **top-down** (cascade) et **bottom-up** (proposition/négociation)
**Afin de** combiner direction stratégique et appropriation par les équipes

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des OKR entreprise, when une équipe crée les siens, then elle peut s'y aligner (top-down) OU proposer des OKR remontants (bottom-up) | ⬜ |
| Given un niveau (entreprise/équipe/individu), when je filtre, then je vois les OKR de ce niveau et leurs contributions | ⬜ |
| Error : given une proposition bottom-up ciblant un OKR entreprise inexistant ou d'un autre tenant, when elle est soumise, then l'API retourne 400/404 sans créer de lien d'alignement | ⬜ |
| Security : la visibilité respecte les périmètres (tenant/équipe) et la confidentialité des OKR individuels (cf. US27.10.2) ; seul un manager/responsable pilotage peut valider une cascade top-down sur son périmètre | ⬜ |
| A11y : le sélecteur de niveau (entreprise/équipe/individu) et la vue filtrée sont utilisables au clavier, avec le niveau courant annoncé aux lecteurs d'écran | ⬜ |

## Hors périmètre
- La construction de l'arbre d'alignement objectif ↔ objectif parent et le rattachement KR → O parent (cf. US27.3.1)
- La visualisation graphique globale (carte d'alignement, dépendances inter-équipes) (cf. US27.3.3)
- Les règles détaillées de confidentialité RGPD des OKR individuels (cf. US27.10.2)

## Notes d'implémentation
- S'appuie sur l'entité `Alignment` (Objective parent) posée par EN27.1 ; cette US porte la sémantique organisationnelle (niveaux entreprise/équipe/individu) au-dessus de ce modèle générique.
- Le mode top-down (cascade) crée l'`Alignment` directement ; le mode bottom-up crée une proposition en attente de validation par le niveau parent avant de matérialiser le lien — statut à modéliser (proposé/validé/refusé).
- Le filtre par niveau doit respecter le même scoping tenant/équipe que le reste du domaine `pilotage` (FK → `public.teams.id`, ADR-008).

---
Item Type: US · Parent: F27.3 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
