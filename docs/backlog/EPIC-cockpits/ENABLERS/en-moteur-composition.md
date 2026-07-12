# EN51.2 — Moteur de composition de cockpit

**Type d'enabler** : architecture / UI

**Objectif technique** : Assembler dynamiquement un cockpit à partir de quatre entrées —
`archétype (JTBD) + rôle de l'utilisateur + statut d'activation du module + périmètre de l'identité +
sensibilité de la card` — et **décider l'état de chaque card**, dont `module-wip` quand la brique
n'est pas prête.

**Justification** : C'est le cœur du principe « un système de composition, pas cent cockpits »
(cf. spec cockpits-dsi.md). Il transforme le catalogue (EN51.3) + le contexte en un cockpit rendu,
et garantit qu'un cockpit reste composable quels que soient les modules livrés.

## Logique de décision (par card)

1. Card non autorisée pour le rôle → `no-permission` (délègue à EN51.5).
2. Module porteur non activé **ou** non encore livré → **`module-wip`**.
3. Source de données prête mais vide → `empty`.
4. Erreur de chargement → `error`.
5. Sinon → `ready`.

Le cockpit par défaut est déterminé par l'**archétype JTBD** (mappé depuis le macro-rôle de
l'utilisateur, cf. bijection), sur un **profil d'organisation par défaut** (EN18.10).

**Critères de complétion** :
- [ ] Service de composition (frontend) : entrée `{archétype, rôle, modules[], identité}` →
      sortie `Card[]` avec état résolu.
- [ ] Lecture du statut module via l'API E03 (`GET /modules`, `GET /modules/{id}/status`).
- [ ] Résolution de l'archétype par défaut depuis le rôle (table de mapping macro-rôle → cockpit,
      dérivée de la bijection — EN51.3).
- [ ] Cards obligatoires (posture sécurité, RGPD, RGAA, AGPL) toujours présentes en interne, jamais
      masquables (garde-fou).
- [ ] Tests : un cockpit reste composable avec 0 module fonctionnel activé (toutes cards `module-wip`
      + cards Socle réelles).

## Notes

- N'introduit **aucune** dépendance dure à un module fonctionnel : un module absent = `module-wip`,
  jamais une erreur de composition.

---
Item Type: Enabler · Parent: E51 · Type: architecture · Module: core · Phase: phase-3
Stage: ⬜ · Priority: Critical
Dépendances: EN51.1 (composant Card), EN51.3 (contrat catalogue), E03 (statut modules)
