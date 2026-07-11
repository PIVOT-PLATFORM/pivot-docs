# EN41.1 — Framework d'onboarding in-app

> ⚠️ **Décomposée (2026-07-11)** en EN41.1a/b/c/d — voir les fiches enfants ; ne porte plus d'ACs propres.

**Type d'enabler** : architecture · frontend (shell E16)

**Objectif technique** : Un **framework réutilisable** d'onboarding in-app, dans lequel **chaque module se branche** (catalogue F41.5) sans réinventer la mécanique :

- Moteur de **tours guidés**, **tooltips**, **checklists**, **empty states**, panneau **« quoi de neuf »**.
- **Ciblage** du contenu par **rôle** (taxonomie des rôles), **module**, **étape** et **profil d'organisation** (E40).
- **Contenu versionné** (à jour / obsolète), **i18n FR/EN**, **a11y WCAG 2.1 AA**.
- **Analytics** de complétion/adoption **RGPD-by-design** (agrégation, minimisation, opt-out) — alimente F41.6.
- Intégration au **shell (E16)** et au module **Session (E19)** pour le présentiel/sessions live.

**Justification** : sans socle commun, chaque module recoderait son onboarding → incohérence et coût. Le framework garantit une expérience homogène et mesurable.

**Critères de complétion** :
- [ ] Moteur tours/tooltips/checklists/empty-states/what's-new intégré au shell
- [ ] API d'enregistrement d'un parcours d'onboarding **par module** (branchement F41.5)
- [ ] Ciblage par rôle (taxonomie) / module / étape / profil (E40) ; i18n ; a11y
- [ ] Analytics complétion/adoption RGPD-by-design (F41.6)

---
Item Type: Enabler · Parent: E41 · Module: core · Phase: phase-3 · Size: XL · Priority: High
Stage: Decomposed
Profils: Tous
Justification: Socle commun d'onboarding in-app pour tous les modules
Dépendances: E16 Shell applicatif & UX · E19 Session (présentiel)
