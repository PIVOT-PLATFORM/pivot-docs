# US27.7.2 — Feedback & reconnaissance (kudos)

**En tant que** membre de l'équipe projet
**Je veux** donner du **feedback** et de la **reconnaissance** (kudos) autour des OKR (le « F » et « R » de CFR)
**Afin de** renforcer l'engagement et la culture d'amélioration continue

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une contribution à un OKR, when je reconnais un pair (kudos), then la reconnaissance est visible (selon les règles de confidentialité) | ⬜ |
| Given un feedback, when il est donné, then il peut être relié à un OKR/KR et reste factuel et bienveillant (garde-fou éthique) | ⬜ |
| Error : given un kudos ou un feedback ciblant un OKR/KR inexistant ou hors du périmètre visible de l'auteur, when il est soumis, then l'API retourne 404/403 | ⬜ |
| Security : given un OKR individuel marqué confidentiel, when un kudos/feedback lui est associé, then sa visibilité hérite des règles de confidentialité de l'OKR (cf. US27.10.2), pas d'exposition publique automatique | ⬜ |
| A11y : le composant de saisie/affichage des kudos et feedback est conforme WCAG 2.1 AA (contraste, focus visible, alternative textuelle aux icônes) | ⬜ |

## Hors périmètre
- Les conversations 1:1 structurées (cf. US27.7.1) — cette US couvre le feedback/reconnaissance ponctuels, hors trame de 1:1
- La modération de contenu au-delà du garde-fou éthique de base (pas de système de signalement/modération avancée)
- Tout lien avec l'évaluation ou la rémunération (interdit par doctrine, cf. US27.10.1)

## Notes d'implémentation
- Nouvelle entité légère (feedback/kudos) au schéma `pilotage`, référençant optionnellement un `Objective`/`KeyResult` (EN27.1) ; pas de FK obligatoire pour permettre un kudos non rattaché à un OKR précis.
- Le garde-fou « factuel et bienveillant » est une contrainte éditoriale (aide à la saisie / rappel UI), pas un filtre automatique de contenu dans le périmètre de cette US.
- La visibilité doit respecter le même moteur de confidentialité que les OKR individuels (US27.10.2) : un kudos sur un OKR confidentiel ne doit pas fuiter l'information au-delà du périmètre autorisé.

---
Item Type: US · Parent: F27.7 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Low
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
