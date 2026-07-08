# Audit — ux

**Statut :** À compléter
**Dernière révision :** 2026-07-08
**Profil agent responsable :** Expert UX/UI + Architecte Angular

## Résumé

> _À remplir lors du premier audit formel._

## Points d'attention

- [ ] À identifier

## Sous-domaine — Performance (Lighthouse)

**Profil agent responsable :** Expert UX/UI + Architecte Angular

Sous-domaine ajouté car le job CI existant s'appelle explicitement `Lighthouse —
Accessibilité` (voir `pivot-ui/.github/workflows/lighthouse.yml` et ses équivalents dans les
modules `-ui`) — seul le pilier accessibilité de Lighthouse est aujourd'hui suivi ; les piliers
Performance/Best Practices/SEO ne sont ni scorés ni utilisés comme critère de gate.

- [ ] Décider si Performance/Best Practices/SEO doivent devenir des checks suivis (même non
      bloquants au départ) ou rester hors périmètre par choix produit explicite
- [ ] Si suivis : définir des seuils réalistes par repo (le shell `pivot-ui` n'a pas le même
      profil de charge qu'un module bootstrap comme `pivot-pilotage-ui`)
- [ ] Passe authentifiée Lighthouse (`LH_USER_EMAIL`/`LH_USER_PASSWORD`) — actuellement TODO
      sur les modules bootstrap sans page authentifiée réelle (ex. `pivot-pilotage-ui`, voir
      son `TODO-SETUP.md` §5) — à réactiver au fil des features

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---------|------|-------|------------------------|
| v1 | 2026-06-20 | — | Initialisation |
| v2 | 2026-07-08 | — | Ajout profil agent responsable + sous-domaine performance (Lighthouse) |
