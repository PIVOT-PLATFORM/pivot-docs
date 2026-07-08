# Audit — ux

**Statut :** À compléter
**Dernière révision :** 2026-07-08
**Profil agent responsable :** Expert UX/UI + Architecte Angular

## Résumé

Score de maturité pas encore calculé (`Statut: À compléter`). Voir aussi la sous-section
dédiée à la performance (Lighthouse) ci-dessous.

## Points d'attention

- [ ] WCAG 2.1 AA — mesuré en CI (`Lighthouse — Accessibilité`) uniquement sur `pivot-ui` et
      `pivot-collaboratif-ui` à ce jour ; `pivot-agilite-ui`/`pivot-pilotage-ui` sont encore au
      stade bootstrap sans page réelle à auditer. Suivre l'activation du check au fil des
      premières vraies features de chaque module.
- [ ] Passe Lighthouse authentifiée — nécessite un vrai backend + une vraie page connectée ;
      plusieurs modules bootstrap n'ont ni l'un ni l'autre pour l'instant (TODO explicite dans
      leurs `TODO-SETUP.md`). Seule la passe publique (page d'accueil du shell) tourne en
      attendant.
- [ ] i18n (Transloco) — `pivot-ui` a une couverture réelle (fr/en complets) ; les modules
      bootstrap n'ont que des clés placeholder (`app.title`, `app.bootstrapNotice`). Pas un
      défaut aujourd'hui (features pas encore développées) mais à re-vérifier une fois les US
      métier livrées — clés manquantes ou chaînes littérales non externalisées.
- [ ] Design system — `pivot-ui` gère ses styles en interne (`src/styles/`) faute de
      `pivot-design-system` publié ; vérifier la cohérence visuelle entre `pivot-ui` et les
      modules `-ui` qui n'ont pour l'instant qu'un reset CSS minimal auto-contenu, en attendant
      la migration vers `@pivot/design-system`.

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
| v3 | 2026-07-08 | — | Contexte et points d'attention initiaux (préparation premier audit formel) |
