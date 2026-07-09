# US27.7.1 — Conversations & 1:1 liées aux OKR

**En tant que** manager
**Je veux** tenir des **conversations / 1:1** rattachées aux OKR (le « C » de CFR de Doerr)
**Afin de** faire vivre les OKR par le dialogue plutôt que par le seul reporting

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un OKR et un collaborateur, when je prépare un 1:1, then les OKR et leurs check-ins servent de trame ; notes et actions sont capturées | ⬜ |
| Given une conversation, when elle est privée, then elle respecte la confidentialité (cf. US27.10.2) | ⬜ |
| Error : given une tentative de rattacher une conversation à un OKR d'un autre tenant/équipe, when elle est soumise, then l'API retourne 403 | ⬜ |
| Security : given une conversation 1:1, when un tiers hors manager/collaborateur concerné tente d'y accéder, then l'accès est refusé (visibilité strictement manager ↔ collaborateur, sauf export RH encadré) | ⬜ |
| A11y : le formulaire de préparation/capture du 1:1 (notes, actions) est conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le feedback ponctuel et la reconnaissance (kudos) entre pairs, non structurés en 1:1 (cf. US27.7.2)
- Les règles détaillées de confidentialité RGPD des OKR individuels (cf. US27.10.2)
- Les rappels/notifications de check-in (cf. US27.4.3) — le 1:1 consomme les check-ins déjà réalisés, il n'en déclenche pas

## Notes d'implémentation
- Nouvelle entité (conversation/1:1) à ajouter au schéma `pilotage`, distincte de `CheckIn` (EN27.1) : elle référence un ou plusieurs OKR et un collaborateur, avec notes et actions capturées en texte libre.
- La trame de préparation doit récupérer les derniers `CheckIn` (valeur, confiance, commentaire) des OKR du collaborateur pour affichage en lecture seule pendant le 1:1.
- Visibilité strictement bilatérale (manager ↔ collaborateur) par défaut ; pas d'exposition dans les vues d'équipe/transparence par défaut (US27.10.1), car nature intrinsèquement privée.

---
Item Type: US · Parent: F27.7 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Low
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
